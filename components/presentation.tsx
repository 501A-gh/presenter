"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Progress } from "./progress";
import { Slide as SlideType } from "@/app/page";
import { ImageSlide, ListSlide, TitleSlide, VideoSlide } from "./slide";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Presentation({ slides }: { slides: SlideType[] }) {
  // const [slides, setSlides] = useState<SlideType[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   const fetchSlides = async () => {
  //     const response = await fetch("/slides.json");
  //     const data = await response.json();
  //     setSlides(data);
  //   };
  //   fetchSlides();
  // }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextSlide();
      else if (event.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    const slide = searchParams.get("slide");
    if (slide) {
      setCurrentSlide(parseInt(slide) - 1);
    }
  }, [searchParams]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      updateURL(currentSlide + 2);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      updateURL(currentSlide);
    }
  };

  const updateURL = (slideNumber: number) => {
    router.push(`?slide=${slideNumber}`);
  };

  if (slides.length === 0) return <div>Loading...</div>;
  const slide = slides[currentSlide];

  return (
    <>
      <AnimatePresence mode="sync">
        <div className="min-h-screen dark:bg-zinc-950 w-full">
          <motion.div
            key={slide.id}
            initial={{
              opacity: 0,
              filter: "blur(12px)",
              y: 10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              filter: "blur(12px)",
              y: 10,
              scale: 0.95,
            }}
            transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.1] }}
            className={cn(
              "flex items-center w-full h-screen mx-auto max-w-[1500px]"
            )}
          >
            {(() => {
              switch (slide.type) {
                case "title":
                  return <TitleSlide slide={slide} />;
                case "list":
                  return <ListSlide slide={slide} />;
                case "image":
                  return <ImageSlide slide={slide} />;
                case "video":
                  return <VideoSlide slide={slide} />;
                default:
                  return null;
              }
            })()}
          </motion.div>
        </div>
      </AnimatePresence>
      {/* bg-zinc-100/90 dark:bg-zinc-900/90 */}
      <motion.div
        className="fixed left-1/2 transform -translate-x-1/2 p-1.5 rounded-t-2xl bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200/90 dark:border-zinc-800/90 flex justify-between items-center gap-2 w-72 backdrop-blur shadow-2xl"
        initial={{
          bottom: -30,
        }}
        whileHover={{
          bottom: 0,
        }}
      >
        <div className="flex items-center justify-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-1 font-medium text-base text-black dark:text-zinc-200 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-90"
          >
            <ChevronLeftIcon size={"1em"} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-1 font-medium text-base text-black dark:text-zinc-200 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-90"
          >
            <ChevronRightIcon size={"1em"} />
          </button>
        </div>
        <div className="flex items-center justify-center flex-1 gap-2">
          <Progress value={100 * ((currentSlide + 1) / slides.length)} />
          <div className="pl-1 pr-2">
            <span className="font-medium tabular-nums text-zinc-800 dark:text-zinc-200 break-keep">
              {currentSlide + 1}/{slides.length}
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

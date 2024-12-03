import { MediaSlide, TextSlide } from "@/app/page";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export function TitleSlide({ slide }: { slide: TextSlide }) {
  const { title, content } = slide;
  return (
    <hgroup className="grid gap-4 w-full">
      <h1 className="text-8xl font-medium text-black dark:text-white">
        {title}
      </h1>
      <h2 className="text-5xl font-medium text-zinc-500">{content}</h2>
    </hgroup>
  );
}

export function ListSlide({ slide }: { slide: TextSlide }) {
  const { title, content } = slide;
  return (
    <div className="grid gap-4 w-full">
      <h1 className="text-5xl font-medium text-zinc-500">{title}</h1>
      <ul className="list-disc ml-12">
        {content.split("\n").map((item, index) => (
          <li
            className="text-black dark:text-white font-medium text-7xl mt-3"
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ImageSlide({ slide }: { slide: MediaSlide }) {
  const { title, content } = slide;

  return (
    <div
      className={cn("grid w-full gap-2", content.length > 1 && "grid-cols-2")}
    >
      {content.map((image, index) => (
        <Image
          key={index}
          className={cn("mx-auto rounded-lg w-full")}
          quality={100}
          src={image}
          alt={title}
          width={600}
          height={400}
        />
      ))}
    </div>
  );
}

export function VideoSlide({ slide }: { slide: MediaSlide }) {
  const { content } = slide;
  return (
    <div
      className={cn(
        content.length > 1 && "grid w-full gap-2 grid-cols-2",
        content.length > 10 && "grid-cols-5 *:h-60"
      )}
    >
      {content.map((video, index) => (
        <div key={index}>
          <video
            controls={false}
            preload="none"
            muted
            autoPlay
            loop
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            className={cn(
              "border rounded-lg border-zinc-200 dark:border-zinc-800",
              content.length === 1
                ? "max-h-screen"
                : "bg-zinc-100 dark:bg-zinc-900 shadow-sm w-full h-full object-cover bg-center overflow-clip"
            )}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}

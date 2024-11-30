import { MediaSlide, TextSlide } from "@/app/page";
import { cn } from "@/lib/utils";
import React from "react";

export function TitleSlide({ slide }: { slide: TextSlide }) {
  const { title, content } = slide;
  return (
    <hgroup className="grid gap-4 w-full">
      <h1 className="text-6xl font-medium text-black dark:text-white">
        {title}
      </h1>
      <h2 className="text-3xl font-medium text-zinc-500">{content}</h2>
    </hgroup>
  );
}

export function ListSlide({ slide }: { slide: TextSlide }) {
  const { title, content } = slide;
  return (
    <div className="grid gap-4 w-full">
      <h1 className="text-3xl font-medium text-zinc-500">{title}</h1>
      <ul className="list-disc ml-12">
        {content.split("\n").map((item, index) => (
          <li
            className="text-black dark:text-white font-medium text-5xl mt-3"
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
  const { title, content, layout } = slide;

  return (
    <div className="w-full grid gap-6">
      {layout !== "only" && (
        <hgroup className={cn("grid gap-2", layout === "page" && "mt-1/2")}>
          <h1 className="text-zinc-900 dark:text-zinc-100 text-2xl font-medium text-center">
            {title}
          </h1>
          {layout === "page" && (
            <h2 className="text-zinc-600 text-center animate-pulse mb-10">
              Scroll to View
            </h2>
          )}
        </hgroup>
      )}
      <div
        className={cn(
          "grid w-full gap-2",
          content.length > 1 && "grid-cols-2",
          layout === "page" && "grid-cols-1"
        )}
      >
        {content.map((image, index) => (
          <img
            key={index}
            className={cn(
              "mx-auto rounded-lg w-full",
              layout !== "only"
                ? "border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm"
                : "drop-shadow-md"
            )}
            // quality={100}
            src={image}
            alt={title}
            width={600}
            height={400}
          />
        ))}
      </div>
    </div>
  );
}

export function VideoSlide({ slide }: { slide: MediaSlide }) {
  const { title, content, layout } = slide;
  return (
    <div className="w-full grid gap-6">
      <hgroup className={cn("grid gap-2", layout === "page" && "mt-1/2")}>
        <h1 className="text-zinc-900 dark:text-zinc-100 text-2xl font-medium text-center">
          {title}
        </h1>
        {layout === "page" && (
          <h2 className="text-zinc-600 text-center animate-pulse mb-10">
            Scroll to View
          </h2>
        )}
      </hgroup>
      <div
        className={cn(
          "grid w-full gap-2",
          content.length > 1 ? "grid-cols-2" : "*:w-full"
        )}
      >
        {content.map((video, index) => (
          <video
            controls={content.length === 1}
            preload="none"
            key={index}
            muted
            autoPlay
            loop={content.length > 1}
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            className={cn(
              "mx-auto rounded-lg w-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm",
              content.length === 1
                ? ""
                : "w-full h-96 object-cover bg-center overflow-clip"
            )}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </div>
  );
}

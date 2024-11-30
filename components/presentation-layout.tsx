"use client";
import { Slide } from "@/app/page";
import React, { useState } from "react";
import Presentation from "./presentation";

export default function PresentationLayout() {
  const [slides, setSlides] = useState<Slide[]>([]);

  return (
    <>
      {slides.length < 1 ? (
        <div className="flex items-center justify-center flex-col gap-6 h-screen">
          <h1 className="text-4xl font-medium text-black dark:text-white">
            Presenter.
          </h1>
          <h2 className="text-base text-zinc-600">
            Select a folder with a main.json and media files.
          </h2>
          <input
            id="custom-input"
            className="hidden"
            type="file"
            ref={(input) => {
              if (input) {
                input.webkitdirectory = true;
              }
            }}
            onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
              const files = event.target.files;
              if (!files) return;

              const filesMap = new Map<string, File>();
              Array.from(files).forEach((file) => {
                filesMap.set(file.webkitRelativePath, file);
              });

              // Find and parse main.json
              const mainJsonFile = Array.from(files).find((file) =>
                file.webkitRelativePath.endsWith("main.json")
              );

              if (!mainJsonFile) {
                alert("main.json not found in the folder!");
                return;
              }

              const mainJson = JSON.parse(await mainJsonFile.text()) as Slide[];

              // Update paths in slides
              const updatedSlides = mainJson.map((slide) => {
                if (slide.type === "image" || slide.type === "video") {
                  return {
                    ...slide,
                    content: slide.content.map((path) => {
                      const file = filesMap.get(path);
                      return file ? URL.createObjectURL(file) : path;
                    }),
                  };
                }
                return slide;
              });

              setSlides(updatedSlides);
            }}
          />
          <label
            htmlFor="custom-input"
            className="block text-sm py-2 px-4 rounded-full font-medium bg-gradient-to-b from-zinc-900 to-zinc-700 dark:from-zinc-300 dark:to-zinc-50 border-b-2 border-zinc-800 dark:border-zinc-400 text-center text-zinc-100 dark:text-zinc-900 cursor-pointer shadow-sm transition-all active:translate-y-0.5"
          >
            Choose file
          </label>
        </div>
      ) : (
        <Presentation slides={slides} />
      )}
    </>
  );
}

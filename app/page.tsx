import PresentationLayout from "@/components/presentation-layout";

export type TextSlide = {
  id: number;
  title: string;
  content: string;
  type: "title" | "list";
};

export type MediaSlide = {
  id: number;
  title: string;
  content: string[];
  type: "image" | "video";
};

export type Slide = TextSlide | MediaSlide;

export default async function Home() {
  return (
    <main>
      <PresentationLayout />
    </main>
  );
}

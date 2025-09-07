export interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
  tags?: string[];
}

export const newsData: News[] = [
  // If you don't want to show news, just make the array empty.
  {
    date: "May 2025",
    title: "Accepted for Google Summer of Code 2025",
    description: "I will contribute to <a href='https://deepmind.google/'>DeepMind</a>. Effort will be towards evaluating scientific reasoning capabilities of Gemini models. <a href='https://alampara.com/gsoc2025/index.html'>Read more about my project</a>.",
    link: "https://summerofcode.withgoogle.com/programs/2025/projects/xshu9ha6",
    imageUrl: "https://developers.google.com/open-source/gsoc/resources/downloads/GSoC-logo-horizontal.svg",
    tags: ["Google Summer of Code", "DeepMind", "AI Research", "Scientific Reasoning"]
  }
];

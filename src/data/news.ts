export interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
}

export const newsData: News[] = [
  // If you don't want to show news, just make the array empty.
  {
    date: "May 2024",
    title: "Accepted for Google Summer of Code 2025",
    description: "I will contribute to DeepMind. Effort will be towards evaluating scientific reasoning capabilities of Gemini models.",
    link: "https://summerofcode.withgoogle.com/programs/2025/projects/xshu9ha6",
  }
];

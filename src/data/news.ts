export interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
  tags?: string[];
}

export const newsData: News[] = [
  {
    date: "February 2026",
    title: "Joined Lila Sciences",
    description: "I joined <a href='https://www.lila.ai/'>Lila Sciences</a> as an AI resident. I would be working from Boston 🎉",
    link: "https://www.lila.ai/",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E0BAQEqlTpUSd_btg/company-logo_200_200/company-logo_200_200/0/1732737531284/lila_sciences_logo?e=2147483647&v=beta&t=tiqomrfCSzfGVsxHH1nYePC3LsdaJytWFBtqu7v6oOw",
    tags: ["Lila Sciences", "AI Research", "Boston"]
  },
  {
    date: "May 2025",
    title: "Accepted for Google Summer of Code 2025",
    description: "I will contribute to <a href='https://deepmind.google/'>DeepMind</a>. Effort will be towards evaluating scientific reasoning capabilities of Gemini models. <a href='https://alampara.com/gsoc2025/index.html'>Read more about my project</a>.",
    link: "https://summerofcode.withgoogle.com/programs/2025/projects/xshu9ha6",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-fWs1oYAZuYCOpcUvw04Gfg0vIfVNdZihIzQ0SwfZRqiviGGdpazkoz5tBg5R45a3y0OD4mMHnsYchO-ORycc0ysD4n-s19takKeSP46lgmJwd0uLzSYIb6SLVfTowFwBTPpkWdUf42U/s320/sun.png",
    tags: ["Google Summer of Code", "DeepMind", "AI Research", "Scientific Reasoning", "LLM-Evaluation"]
  }
];

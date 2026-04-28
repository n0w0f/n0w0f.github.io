export interface BlogPost {
  slug: string;
  title: string;
  date: string;              // ISO "YYYY-MM-DD"
  description: string;
  draft?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "threads-processes-and-parallelism-in-python",
    title: "Threads, processes, and parallelism in Python",
    date: "2026-04-27",
    description:
      "A walk through interpreters, the GIL, threads, and processes — and when each gives you real parallelism.",
  },
  {
    slug: "gsoc-2025",
    title: "Benchmarking algorithmic reasoning in Gemini models",
    date: "2025-09-01",
    description:
      "A GSoC 2025 report: disentangling knowledge, reasoning, and execution in LLMs on scientific tasks, and how performance degrades with algorithmic complexity.",
  },
];

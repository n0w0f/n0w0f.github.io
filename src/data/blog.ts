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
];

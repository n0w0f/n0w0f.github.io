import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { postComponents } from "@/content/blog";

export function generateStaticParams() {
  return blogPosts
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const meta = blogPosts.find((p) => p.slug === slug);
  const entry = postComponents[slug];
  if (!meta || !entry) notFound();
  const { Component } = entry;
  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <div className="max-w-screen-lg mx-auto px-8 py-24">
        <h1 className="font-serif text-4xl text-zinc-900">{meta.title}</h1>
        <Component />
      </div>
    </div>
  );
}

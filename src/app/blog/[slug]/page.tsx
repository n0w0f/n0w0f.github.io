import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { postComponents } from "@/content/blog";
import { PostLayout } from "@/components/blog/post-layout";

export function generateStaticParams() {
  return blogPosts
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const meta = blogPosts.find((p) => p.slug === slug);
  const entry = postComponents[slug];
  if (!meta || !entry) notFound();
  const { Component, tocItems } = entry;
  return (
    <PostLayout meta={meta} tocItems={tocItems}>
      <Component />
    </PostLayout>
  );
}

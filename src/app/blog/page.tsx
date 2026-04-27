import { blogPosts } from "@/data/blog";
import { BlogIndex } from "@/components/blog/blog-index";

export default function BlogIndexPage() {
  return <BlogIndex posts={blogPosts} />;
}

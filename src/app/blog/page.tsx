import { blogPosts } from "@/data/blog";

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <div className="max-w-screen-lg mx-auto px-8 py-24">
        <h1 className="font-serif text-4xl text-zinc-900">Writing</h1>
        <ul className="mt-8 space-y-4">
          {blogPosts.map((p) => (
            <li key={p.slug} className="font-serif text-zinc-700">
              {p.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

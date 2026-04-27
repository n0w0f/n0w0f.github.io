import Link from "next/link";

export const metadata = {
  title: "Moved — Nawaf Alampara",
  description: "This page has moved to the blog.",
  other: {
    "refresh": "0; url=/blog",
  },
};

export default function GsocAlias() {
  return (
    <div className="min-h-screen bg-[#FFFCF8] flex items-center justify-center">
      <div className="mx-auto max-w-screen-sm px-8 py-24 text-center">
        <p className="font-serif italic text-zinc-700">
          This page has moved. Redirecting you to the blog…
        </p>
        <p className="mt-6 font-sans text-xs uppercase tracking-wider text-zinc-500">
          If you aren&apos;t redirected,{" "}
          <Link
            href="/blog"
            className="underline text-zinc-700 hover:text-[color:var(--accent-strong)] transition-colors"
          >
            go to the blog
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

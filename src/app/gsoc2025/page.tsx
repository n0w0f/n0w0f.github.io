"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GsocAlias() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/blog/gsoc-2025");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FFFCF8] flex items-center justify-center">
      <div className="mx-auto max-w-screen-sm px-8 py-24 text-center">
        <p className="font-serif italic text-zinc-700">
          This page has moved. Redirecting you to the post…
        </p>
        <p className="mt-6 font-sans text-xs uppercase tracking-wider text-zinc-500">
          If you aren&apos;t redirected,{" "}
          <Link
            href="/blog/gsoc-2025"
            className="underline text-zinc-700 hover:text-[color:var(--accent-strong)] transition-colors"
          >
            go to the post
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

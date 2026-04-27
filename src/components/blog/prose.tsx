import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
}

export function Prose({ children }: ProseProps) {
  return (
    <div
      className={[
        "font-serif text-[17px] leading-[1.75] text-zinc-800 max-w-[38rem]",
        "[&_p]:my-5",
        "[&_strong]:font-semibold [&_strong]:text-zinc-900",
        "[&_em]:italic",
        "[&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-[color:var(--accent-strong)] [&_a]:transition-colors",
        "[&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-zinc-900 [&_h2]:mt-16 [&_h2]:mb-4 [&_h2]:pt-6 [&_h2]:border-t [&_h2]:border-zinc-200",
        "[&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_h2:first-of-type]:mt-12",
        "[&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-zinc-900 [&_h3]:mt-10 [&_h3]:mb-3",
        "[&_h4]:font-sans [&_h4]:text-xs [&_h4]:uppercase [&_h4]:tracking-wider [&_h4]:text-zinc-500 [&_h4]:mt-8 [&_h4]:mb-2",
        "[&_ul]:my-5 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:marker:text-zinc-400",
        "[&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:marker:text-zinc-400",
        "[&_li]:my-1.5",
        "[&_code:not(pre_code)]:bg-[#F5F1E8] [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-[0.9em] [&_code:not(pre_code)]:text-zinc-800",
        "[&_table]:w-full [&_table]:my-8 [&_table]:border-collapse",
        "[&_th]:text-left [&_th]:py-2.5 [&_th]:px-3 [&_th]:font-sans [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-[color:var(--accent-strong)] [&_th]:border-b [&_th]:border-zinc-300",
        "[&_td]:py-2.5 [&_td]:px-3 [&_td]:border-b [&_td]:border-zinc-200 [&_td]:align-top",
        "[&_blockquote]:my-6 [&_blockquote]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-300 [&_blockquote]:text-zinc-600 [&_blockquote]:italic",
        "[&_hr]:my-12 [&_hr]:border-zinc-200",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

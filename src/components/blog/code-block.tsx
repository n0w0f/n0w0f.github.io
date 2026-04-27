import { codeToHtml } from "shiki";

interface CodeBlockProps {
  children: string;
  lang?: string;
}

export async function CodeBlock({ children, lang = "text" }: CodeBlockProps) {
  const html = await codeToHtml(children.trim(), {
    lang,
    theme: "github-light",
  });

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200/60 bg-[#F5F1E8] px-5 py-4 text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent [&_code]:font-mono">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

import type { ReactNode } from "react";

type Variant = "info" | "warn" | "danger";

interface CalloutProps {
  variant?: Variant;
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  info: "border-l-[color:var(--accent)] bg-amber-50/40",
  warn: "border-l-amber-600 bg-amber-50/60",
  danger: "border-l-rose-500 bg-rose-50/40",
};

export function Callout({ variant = "info", children }: CalloutProps) {
  return (
    <aside
      className={`my-6 border-l-2 ${styles[variant]} px-5 py-4 rounded-r text-zinc-700`}
    >
      {children}
    </aside>
  );
}

"use client";

import { useState, ReactNode, Children } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultCollapsed: boolean;
  visibleItemsWhenCollapsed: number;
}

export function CollapsibleSection({
  title,
  children,
  defaultCollapsed,
  visibleItemsWhenCollapsed,
}: CollapsibleSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const childrenArray = Children.toArray(children);
  const totalItems = childrenArray.length;
  const shouldShowToggle = totalItems > visibleItemsWhenCollapsed;
  const visibleChildren = isCollapsed
    ? childrenArray.slice(0, visibleItemsWhenCollapsed)
    : childrenArray;
  const hiddenCount = totalItems - visibleItemsWhenCollapsed;

  return (
    <section>
      <h2 className="mb-7 border-b border-[color:var(--rule)] pb-4 font-serif text-[28px] font-normal text-zinc-900">
        {title}
      </h2>
      <div className="relative">
        <div className="space-y-9">{visibleChildren}</div>

        {shouldShowToggle && isCollapsed && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[color:var(--background)] to-transparent" />
        )}
      </div>

      {shouldShowToggle && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-8 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-600 hover:text-[color:var(--accent-strong)] transition-colors duration-300 cursor-pointer"
        >
          {isCollapsed ? (
            <>
              Show more ({hiddenCount} more)
              <ChevronDown size={16} />
            </>
          ) : (
            <>
              Show less
              <ChevronUp size={16} />
            </>
          )}
        </button>
      )}
    </section>
  );
}

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

  const handleToggle = () => {
    console.log(`[${title}] Toggling from ${isCollapsed} to ${!isCollapsed}`, {
      totalItems,
      visibleItemsWhenCollapsed,
      shouldShowToggle,
    });
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section>
      <h2 className="font-serif text-l mb-12 tracking-wide uppercase">
        {title}
      </h2>
      <div className="relative">
        <div className="space-y-12">{visibleChildren}</div>

        {shouldShowToggle && isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFFCF8] via-[#FFFCF8]/80 to-transparent pointer-events-none" />
        )}
      </div>

      {shouldShowToggle && (
        <button
          onClick={handleToggle}
          className="mt-8 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-600 hover:text-zinc-900 transition-colors duration-300 cursor-pointer"
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

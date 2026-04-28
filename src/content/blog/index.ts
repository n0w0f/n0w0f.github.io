import type { ComponentType } from "react";
import threadsPost, { tocItems as threadsToc } from "./threads-processes-and-parallelism-in-python";
import gsocPost, { tocItems as gsocToc } from "./gsoc-2025";

export interface TocItem {
  id: string;
  label: string;
}

export interface RegisteredPost {
  Component: ComponentType;
  tocItems: TocItem[];
}

export const postComponents: Record<string, RegisteredPost> = {
  "threads-processes-and-parallelism-in-python": {
    Component: threadsPost,
    tocItems: threadsToc,
  },
  "gsoc-2025": {
    Component: gsocPost,
    tocItems: gsocToc,
  },
};

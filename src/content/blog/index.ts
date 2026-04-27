import type { ComponentType } from "react";
import threadsPost, { tocItems as threadsToc } from "./threads-processes-and-parallelism-in-python";

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
};

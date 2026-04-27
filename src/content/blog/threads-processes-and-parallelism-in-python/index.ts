import type { TocItem } from "../index";
import Post from "./post";

export const tocItems: TocItem[] = [
  { id: "interpreter",           label: "Interpreter" },
  { id: "gil",                   label: "The GIL" },
  { id: "processes-vs-threads",  label: "Processes vs threads" },
  { id: "sequential-vs-parallel",label: "Sequential vs parallel" },
  { id: "pitfalls",              label: "Pitfalls" },
  { id: "when-to-pick",          label: "When to pick what" },
];

export default Post;

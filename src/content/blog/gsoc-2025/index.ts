import type { TocItem } from "../index";
import Post from "./post";

export const tocItems: TocItem[] = [
  { id: "introduction", label: "Introduction" },
  { id: "methodology",  label: "Methodology" },
  { id: "results",      label: "Results" },
  { id: "discussion",   label: "Discussion" },
  { id: "references",   label: "References" },
  { id: "codebase",     label: "Codebase" },
  { id: "tasks",        label: "Tasks" },
];

export default Post;

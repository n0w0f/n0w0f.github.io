"use client";

import { SteppedDiagram } from "@/components/blog/stepped-diagram";

const ACCENT = "var(--accent)";
const STROKE = "#a1a1aa";
const FILL_IDLE = "#fafaf9";
const FILL_SHARED = "#fef3c7";
const FILL_COPIED = "#ffedd5";
const TEXT = "#27272a";
const MUTE = "#71717a";

interface RunnerProps {
  x: number;
  y: number;
  label: string;
  sub?: string;
  tone?: "idle" | "shared" | "copied";
}

function Runner({ x, y, label, sub, tone = "idle" }: RunnerProps) {
  const fill = tone === "shared" ? FILL_SHARED : tone === "copied" ? FILL_COPIED : FILL_IDLE;
  const stroke = tone === "idle" ? STROKE : ACCENT;
  return (
    <g>
      <rect x={x} y={y} width={180} height={80} rx={6} fill={fill} stroke={stroke} strokeWidth={1.2} />
      <text x={x + 90} y={y + 32} textAnchor="middle" fill={TEXT} fontSize={13} fontWeight={600} fontFamily="Georgia, serif">
        {label}
      </text>
      {sub && (
        <text x={x + 90} y={y + 55} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-monospace, Menlo, monospace">
          {sub}
        </text>
      )}
    </g>
  );
}

function SceneOneProcess() {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="One process" className="w-full h-auto">
      <rect x={40} y={30} width={480} height={160} rx={10} fill="none" stroke={STROKE} strokeDasharray="4 4" />
      <text x={280} y={22} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">
        Process A — one address space
      </text>
      <Runner x={60}  y={70} label="Python interpreter" sub="runs main()" />
      <Runner x={320} y={70} label="Heap memory" sub="objects, bindings" tone="shared" />
    </svg>
  );
}

function SceneFork() {
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Forked process" className="w-full h-auto">
      <rect x={20} y={30}  width={240} height={180} rx={10} fill="none" stroke={STROKE} strokeDasharray="4 4" />
      <rect x={300} y={30} width={240} height={180} rx={10} fill="none" stroke={ACCENT} strokeDasharray="4 4" />
      <text x={140} y={22} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">Process A</text>
      <text x={420} y={22} textAnchor="middle" fill={ACCENT} fontSize={11} fontFamily="ui-sans-serif, system-ui">Process B (forked)</text>
      <Runner x={40}  y={60}  label="Interpreter"  sub="original" />
      <Runner x={40}  y={130} label="Heap"         sub="original" tone="shared" />
      <Runner x={320} y={60}  label="Interpreter"  sub="fresh copy" tone="copied" />
      <Runner x={320} y={130} label="Heap"         sub="copy-on-write" tone="copied" />
    </svg>
  );
}

function SceneThreads() {
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Two threads" className="w-full h-auto">
      <rect x={40} y={30} width={480} height={200} rx={10} fill="none" stroke={STROKE} strokeDasharray="4 4" />
      <text x={280} y={22} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">
        Process A — one address space, two threads
      </text>
      <Runner x={60}  y={60}  label="Thread 1" sub="own stack" />
      <Runner x={320} y={60}  label="Thread 2" sub="own stack" />
      <Runner x={190} y={150} label="Shared heap" sub="same objects" tone="shared" />
      <line x1={150} y1={140} x2={260} y2={150} stroke={ACCENT} strokeWidth={1.2} />
      <line x1={410} y1={140} x2={310} y2={150} stroke={ACCENT} strokeWidth={1.2} />
    </svg>
  );
}

const steps = [
  { label: "A single Python process owns one address space.",                render: () => <SceneOneProcess /> },
  { label: "Fork a process: the child gets its own copy of memory — no sharing by default.", render: () => <SceneFork /> },
  { label: "Threads inside one process share the heap — same objects, different stacks.",    render: () => <SceneThreads /> },
];

export function ProcessVsThreadMemory() {
  return <SteppedDiagram title="Processes vs threads in memory" steps={steps} />;
}

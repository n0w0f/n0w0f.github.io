"use client";

import { SteppedDiagram } from "@/components/blog/stepped-diagram";

const ACCENT = "var(--accent)";
const STROKE = "#a1a1aa";
const FILL_HOLD = "#fef3c7";
const FILL_WAIT = "#f4f4f5";
const TEXT = "#27272a";
const MUTE = "#71717a";

type Holder = "A" | "B";

function Scene({ holder }: { holder: Holder }) {
  const aHolds = holder === "A";
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="GIL switching" className="w-full h-auto">
      <rect x={40}  y={40} width={200} height={100} rx={8}
            fill={aHolds ? FILL_HOLD : FILL_WAIT}
            stroke={aHolds ? ACCENT : STROKE}
            strokeWidth={aHolds ? 1.5 : 1} />
      <text x={140} y={75} textAnchor="middle" fill={TEXT} fontSize={13} fontWeight={600} fontFamily="Georgia, serif">
        Thread A
      </text>
      <text x={140} y={100} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">
        {aHolds ? "running" : "waiting"}
      </text>

      <rect x={320} y={40} width={200} height={100} rx={8}
            fill={!aHolds ? FILL_HOLD : FILL_WAIT}
            stroke={!aHolds ? ACCENT : STROKE}
            strokeWidth={!aHolds ? 1.5 : 1} />
      <text x={420} y={75} textAnchor="middle" fill={TEXT} fontSize={13} fontWeight={600} fontFamily="Georgia, serif">
        Thread B
      </text>
      <text x={420} y={100} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui">
        {!aHolds ? "running" : "waiting"}
      </text>

      <circle cx={aHolds ? 140 : 420} cy={175} r={26} fill={FILL_HOLD} stroke={ACCENT} strokeWidth={1.5} />
      <text x={aHolds ? 140 : 420} y={180} textAnchor="middle" fill={TEXT} fontSize={12} fontWeight={700} fontFamily="Georgia, serif">
        GIL
      </text>

      <line x1={140} y1={140} x2={aHolds ? 140 : 420} y2={150} stroke={ACCENT} strokeDasharray={aHolds ? "" : "4 4"} strokeWidth={1} opacity={aHolds ? 1 : 0.4} />
      <line x1={420} y1={140} x2={aHolds ? 140 : 420} y2={150} stroke={ACCENT} strokeDasharray={!aHolds ? "" : "4 4"} strokeWidth={1} opacity={!aHolds ? 1 : 0.4} />

      <text x={280} y={225} textAnchor="middle" fill={MUTE} fontSize={11} fontFamily="ui-sans-serif, system-ui" fontStyle="italic">
        Only one thread holds the GIL at a time.
      </text>
    </svg>
  );
}

const steps = [
  { label: "Thread A holds the GIL and runs bytecode. Thread B waits.",                render: () => <Scene holder="A" /> },
  { label: "At a check interval, the interpreter releases the GIL.",                   render: () => <Scene holder="B" /> },
  { label: "Thread B acquires the GIL and runs. Thread A now waits.",                  render: () => <Scene holder="B" /> },
];

export function GilSwitching() {
  return <SteppedDiagram title="The GIL — one token, two threads" steps={steps} />;
}

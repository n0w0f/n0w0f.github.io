"use client";

import { SteppedDiagram } from "@/components/blog/stepped-diagram";

const ACCENT = "var(--accent)";
const STROKE = "#a1a1aa";      // zinc-400
const FILL_IDLE = "#fafaf9";   // stone-50
const FILL_ACTIVE = "#fef3c7"; // amber-100
const TEXT = "#27272a";        // zinc-800
const MUTE = "#71717a";        // zinc-500

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
}

const boxes: Box[] = [
  { x: 10,  y: 40, w: 160, h: 90, title: "foo.py",      sub: "x = 1 + 2" },
  { x: 230, y: 40, w: 180, h: 90, title: "bytecode",    sub: "LOAD_CONST; ADD" },
  { x: 470, y: 40, w: 200, h: 90, title: "Interpreter", sub: "stack machine" },
  { x: 720, y: 40, w: 90,  h: 90, title: "result",      sub: "x = 3" },
];

const arrowLabels = ["compile", "execute", ""];

function Scene({ active }: { active: number }) {
  return (
    <svg
      viewBox="0 0 820 170"
      role="img"
      aria-label="Python interpreter flow"
      className="w-full h-auto"
    >
      <defs>
        <marker
          id="arr-if"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={ACCENT} />
        </marker>
      </defs>

      {boxes.map((b, i) => {
        const on = i <= active;
        return (
          <g key={i} opacity={on ? 1 : 0.35}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={6}
              fill={i === active ? FILL_ACTIVE : FILL_IDLE}
              stroke={i === active ? ACCENT : STROKE}
              strokeWidth={i === active ? 1.5 : 1}
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + 35}
              textAnchor="middle"
              fill={TEXT}
              fontSize={13}
              fontWeight={600}
              fontFamily="Georgia, serif"
            >
              {b.title}
            </text>
            {b.sub && (
              <text
                x={b.x + b.w / 2}
                y={b.y + 60}
                textAnchor="middle"
                fill={MUTE}
                fontSize={11}
                fontFamily="ui-monospace, Menlo, monospace"
              >
                {b.sub}
              </text>
            )}
          </g>
        );
      })}

      {boxes.slice(0, -1).map((b, i) => {
        const next = boxes[i + 1];
        const show = i < active;
        return (
          <g key={`arr-${i}`} opacity={show ? 1 : 0.2}>
            <line
              x1={b.x + b.w}
              y1={b.y + b.h / 2}
              x2={next.x}
              y2={next.y + next.h / 2}
              stroke={ACCENT}
              strokeWidth={1.5}
              markerEnd="url(#arr-if)"
            />
            {arrowLabels[i] && (
              <text
                x={(b.x + b.w + next.x) / 2}
                y={b.y + b.h / 2 - 8}
                textAnchor="middle"
                fill={MUTE}
                fontSize={10}
                fontFamily="ui-sans-serif, system-ui"
              >
                {arrowLabels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const steps = [
  { label: "Your .py file is source text — a human-readable program.", render: ({ stepIndex }: { stepIndex: number }) => <Scene active={stepIndex} /> },
  { label: "The interpreter compiles it to bytecode — stack-machine instructions.", render: ({ stepIndex }: { stepIndex: number }) => <Scene active={stepIndex} /> },
  { label: "The interpreter executes bytecode one instruction at a time.", render: ({ stepIndex }: { stepIndex: number }) => <Scene active={stepIndex} /> },
  { label: "The result lives in memory — x bound to 3.", render: ({ stepIndex }: { stepIndex: number }) => <Scene active={stepIndex} /> },
];

export function InterpreterFlow() {
  return <SteppedDiagram title="How Python runs your code" steps={steps} />;
}

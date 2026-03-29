"use client";

import { useMemo } from "react";
import { useDemoEvents } from "@/lib/demoEmitter";

type Props = {
  baseCount: number;
  width?: number;
  height?: number;
  className?: string;
};

export function VelocitySparkline({
  baseCount,
  width = 80,
  height = 24,
  className,
}: Props) {
  const { events } = useDemoEvents();
  const liveProposed = events.filter((e) => e.type === "proposed").length;

  const points = useMemo(() => {
    const days = 7;
    const base = Array.from({ length: days }, (_, i) => {
      if (i < 3) return Math.max(0, baseCount - Math.floor(Math.random() * 2));
      if (i < 5) return baseCount;
      return baseCount + Math.floor(Math.random() * 2);
    });
    base[days - 1] = baseCount + liveProposed;
    return base;
  }, [baseCount, liveProposed]);

  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;

  const pad = 2;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const pathData = points
    .map((v, i) => {
      const x = pad + (i / (points.length - 1)) * innerW;
      const y = pad + innerH - ((v - min) / range) * innerH;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const lastX = pad + innerW;
  const lastY = pad + innerH - ((points[points.length - 1]! - min) / range) * innerH;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <path
        d={pathData}
        fill="none"
        stroke="rgb(74, 222, 128)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <circle cx={lastX} cy={lastY} r="2" fill="rgb(74, 222, 128)" opacity="0.9" />
    </svg>
  );
}

"use client";

import { useEffect, useState } from "react";
import { timeAgo } from "@/lib/plainLanguage";

type Props = {
  iso: string;
  className?: string;
};

export function RelativeTime({ iso, className }: Props) {
  const [display, setDisplay] = useState(() => timeAgo(iso));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(timeAgo(iso));
    }, 30_000);
    return () => clearInterval(interval);
  }, [iso]);

  return (
    <span className={className} title={new Date(iso).toLocaleString()}>
      {display}
    </span>
  );
}

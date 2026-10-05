"use client";

import { useEffect, useRef, useState } from "react";
import type { ContactWay as ContactWayData } from "@/lib/content";

export default function ContactWay({ title, value, description, copyLabel, className }: ContactWayData & { className?: string }) {
  const valRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  function done() {
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1400);
  }
  function fallback() {
    const el = valRef.current;
    if (!el) return;
    const r = document.createRange();
    r.selectNodeContents(el);
    const s = getSelection();
    s?.removeAllRanges();
    s?.addRange(r);
  }
  function copy() {
    const t = value.replace(/\s*\(placeholder\)$/, "").trim();
    try {
      navigator.clipboard.writeText(t).then(done, fallback);
    } catch {
      fallback();
    }
  }

  return (
    <div className={className ? `way ${className}` : "way"}>
      <h3>{title}</h3>
      <div className="val" ref={valRef}>{value}</div>
      <p>{description}</p>
      <button className="copy" type="button" onClick={copy}>
        {copied ? "Copied" : copyLabel}
      </button>
    </div>
  );
}

"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { RESOURCE_SECTIONS } from "@/lib/resources";
import ResourceDownload from "./ResourceDownload";

const pages = ({ start, end }: { start: number; end: number }) =>
  start === end ? `p. ${start}` : `pp. ${start}–${end}`;

const DURATION = 380; // matches the .res-panel transition in globals.css, plus a little slack

/* One section open at a time. Headers are real buttons (aria-expanded / aria-controls); arrow keys,
   Home and End move between headers. When a section above the clicked one closes, the page is
   nudged each frame so the clicked header stays where the reader's eye is. */
export default function ResourceLibrary() {
  const [openId, setOpenId] = useState<string | null>(null);
  const headerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function toggle(id: string, i: number) {
    const header = headerRefs.current[i];
    const closingAbove = openId !== null && RESOURCE_SECTIONS.findIndex((s) => s.id === openId) < i;
    const anchor = header?.getBoundingClientRect().top ?? 0;
    setOpenId((cur) => (cur === id ? null : id));
    if (!header || !closingAbove) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const keep = () => window.scrollBy({ top: header.getBoundingClientRect().top - anchor, behavior: "instant" });
    if (reduce) {
      requestAnimationFrame(keep);
      return;
    }
    const t0 = performance.now();
    requestAnimationFrame(function tick(now) {
      keep();
      if (now - t0 < DURATION) requestAnimationFrame(tick);
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = RESOURCE_SECTIONS.length;
    const next = { ArrowDown: (i + 1) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    headerRefs.current[next]?.focus();
  }

  return (
    <div className="res-acc">
      {RESOURCE_SECTIONS.map((s, i) => {
        const open = openId === s.id;
        const buttonId = `res-${s.id}-button`;
        const panelId = `res-${s.id}-panel`;
        return (
          <div className="res-item" data-open={open} key={s.id}>
            <h3 className="res-heading">
              <button
                className="res-toggle"
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                ref={(el) => { headerRefs.current[i] = el; }}
                onClick={() => toggle(s.id, i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="res-num" aria-hidden="true">0{s.order}</span>
                <span className="res-title">
                  <span className="res-name">{s.title}</span>
                  <span className="res-overview">{s.overview}</span>
                </span>
                <span className="res-count">{s.resources.length} tools</span>
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h3>
            <div className="res-panel" id={panelId} role="region" aria-labelledby={buttonId} inert={!open}>
              <div className="res-panel-inner">
                <div className="res-panel-body">
                  <div className="res-section-bar">
                    <p>
                      The whole {s.title} section in one file, from its cover page through{" "}
                      {s.resources[s.resources.length - 1].title}, plus the binder&apos;s credits page.
                    </p>
                    <ResourceDownload file={s.file} name={`the ${s.title} section`} label="Download section PDF" />
                  </div>
                  <ol className="res-list">
                    {s.resources.map((r) => (
                      <li className="res-row" key={r.id}>
                        <div className="res-row-text">
                          <h4>{r.title}</h4>
                          {r.description && <p>{r.description}</p>}
                          <span className="res-meta">Binder {pages(r.printedPages)} · PDF {pages(r.pdfPages)}</span>
                          {r.credit && <p className="res-credit">{r.credit}</p>}
                        </div>
                        <ResourceDownload file={r.file} name={r.title} preview compact />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

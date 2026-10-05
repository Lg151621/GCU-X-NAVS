"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { PHOTOS } from "@/lib/content";

const REPEAT = 1; // each photo shows once
const CARD_ASPECT = 1.5; // width / height
const STRIPS = 10; // segments per card, gives the curved look
const STEP_DEG = 40; // turn between neighbouring cards (9 cards ≈ one full loop)
const LEAN = 0.55; // how far the spiral leans to the right as it rises

function Spiral() {
  const runRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const capTagRef = useRef<HTMLSpanElement>(null);
  const capTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = runRef.current!, stage = stageRef.current!, track = trackRef.current!;
    const capTag = capTagRef.current!, capTitle = capTitleRef.current!;
    const N = PHOTOS.length * REPEAT;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = (STEP_DEG * Math.PI) / 180;
    PHOTOS.forEach(({ src }) => {
      if (src) {
        const image = new window.Image();
        image.src = src;
      }
    });
    let p = 0, target = 0, last = performance.now(), lastCap = -1, gap = 0, R = 0;
    let cards: HTMLDivElement[] = [];
    let raf = 0;
    let rt: ReturnType<typeof setTimeout> | undefined;

    // Cards are built imperatively: their transforms update every animation frame,
    // so bypassing React rendering here keeps the scroll effect smooth.
    function build() {
      track.innerHTML = "";
      cards = [];
      const W = stage.clientWidth, H = stage.clientHeight;
      let cw = Math.min(400, W * 0.28, H * 0.38 * CARD_ASPECT);
      if (W < 600) cw = W * 0.56;
      const ch = cw / CARD_ASPECT;
      R = cw * 1.9;
      const span = cw / R, sa = span / STRIPS, sw = 2 * R * Math.sin(sa / 2) + 3;
      gap = ch * 0.85;
      for (let i = 0; i < N; i++) {
        const ph = PHOTOS[i % PHOTOS.length];
        const card = document.createElement("div");
        card.className = "card";
        cards.push(card);
        const bg = ph.src ? `url("${ph.src}")` : (ph.tint ?? "linear-gradient(150deg,#5b2aa3,#1a0c30)");
        for (let j = 0; j < STRIPS; j++) {
          const s = document.createElement("div");
          s.className = "strip";
          const a = (j + 0.5 - STRIPS / 2) * sa;
          s.style.width = sw + "px";
          s.style.height = ch + "px";
          s.style.backgroundImage = bg;
          s.style.backgroundSize = cw + "px " + ch + "px";
          s.style.backgroundPosition = -j * cw / STRIPS + "px 0";
          s.style.transform = `rotateY(${a}rad) translateZ(${R}px) translate(${-sw / 2}px,${-ch / 2}px)`;
          if (j === 0) {
            s.setAttribute("role", "img");
            s.setAttribute("aria-label", ph.alt);
          }
          card.appendChild(s);
        }
        track.appendChild(card);
      }
    }
    function readScroll() {
      const r = run.getBoundingClientRect(), total = r.height - stage.clientHeight;
      const prog = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      target = prog * (N - 1);
    }
    function render() {
      track.style.transform = `translateZ(${-R * 0.9}px) rotateX(-4deg)`;
      for (let i = 0; i < cards.length; i++) {
        const d = i - p;
        cards[i].style.transform = `translate3d(${-d * gap * LEAN}px,${d * gap}px,0) rotateY(${-d * step}rad)`;
      }
      const c = Math.min(N - 1, Math.max(0, Math.round(p)));
      if (c !== lastCap) {
        lastCap = c;
        const ph = PHOTOS[c % PHOTOS.length];
        capTag.textContent = ph.tag;
        capTitle.textContent = ph.label;
      }
    }
    function tick(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      readScroll();
      const k = reduce ? 1 : 1 - Math.pow(1 - 0.07, dt * 60);
      p += (target - p) * k;
      render();
      raf = requestAnimationFrame(tick);
    }
    function onResize() {
      clearTimeout(rt);
      rt = setTimeout(build, 150);
    }

    window.addEventListener("resize", onResize);
    build();
    readScroll();
    p = target;
    render();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(rt);
      cancelAnimationFrame(raf);
      track.innerHTML = "";
    };
  }, []);

  return (
    <div className="spiral-run" id="spiral-run" ref={runRef}>
      <div className="spiral-stage" id="spiral" ref={stageRef}>
        <div className="spiral" id="spiral-track" ref={trackRef}></div>
        <div className="spiral-cap">
          <span className="label" id="cap-tag" ref={capTagRef}></span>
          <div className="t" id="cap-title" aria-live="polite" ref={capTitleRef}></div>
        </div>
      </div>
    </div>
  );
}

/* The spiral is optional: collapsed by default, revealed on demand. It is only mounted while
   open (or closing), so when collapsed it adds no scroll height, sticky stage or animation loop. */
export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  function toggle() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!open) {
      // Mount the spiral in its collapsed state and lay it out, then open, so the reveal transition runs.
      flushSync(() => setMounted(true));
      void revealRef.current?.offsetHeight;
      setOpen(true);
      return;
    }
    // If the reader is partway down the spiral, bring the control back into view before collapsing.
    const section = sectionRef.current;
    if (section && section.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 72, behavior: "instant" });
    }
    setOpen(false);
    if (reduce) setMounted(false);
  }

  return (
    <section className="gallery" id="gallery" aria-label="Photos of Navigators at GCU" ref={sectionRef}>
      <div className="gallery-intro">
        <span className="label">This is Navs</span>
        <h2>
          Life <em>together.</em>
        </h2>
        <p>See what community, discipleship, and everyday life with Navs looks like.</p>
        <button
          className="btn reveal-btn"
          type="button"
          aria-expanded={open}
          aria-controls="navs-in-action"
          onClick={toggle}
        >
          {open ? "Hide Navs in action" : "View Navs in action"}
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div
        className={open ? "spiral-reveal open" : "spiral-reveal"}
        id="navs-in-action"
        ref={revealRef}
        inert={!open}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && e.propertyName === "grid-template-rows" && !open) setMounted(false);
        }}
      >
        <div className="spiral-reveal-inner">{mounted && <Spiral />}</div>
      </div>
    </section>
  );
}

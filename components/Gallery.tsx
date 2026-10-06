"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { PHOTOS } from "@/lib/content";

/* Desktop: photo-story spreads. Each group is one featured photo with smaller supporting photos
   beside it, alternating sides. Phones: the groups use display:contents, so every photo sits in
   one native horizontal swipe row with scroll snapping. No animation loop either way. */

const GROUP = 3; // featured + two supporting photos per spread
const FEATURED_SIZES = "(max-width: 760px) 84vw, (max-width: 1200px) 66vw, 780px";
const SUPPORT_SIZES = "(max-width: 760px) 84vw, (max-width: 1200px) 34vw, 400px";

function PhotoStory() {
  const gridRef = useRef<HTMLDivElement>(null);
  const photos = PHOTOS.filter((p) => p.src);
  const groups = Array.from({ length: Math.ceil(photos.length / GROUP) }, (_, g) =>
    photos.slice(g * GROUP, g * GROUP + GROUP),
  );

  // Desktop entrance: each spread fades/scales up once as it enters the viewport
  // (CSS limits this to desktop and staggers featured -> supporting photos).
  useEffect(() => {
    const grid = gridRef.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    grid.dataset.animate = ""; // photos only start hidden once JS is running
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    grid.querySelectorAll(".g-story").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="g-grid" ref={gridRef}>
      {groups.map((group, g) => (
        <div className={`g-story${g % 2 ? " flip" : ""}${group.length < GROUP ? " pair" : ""}`} key={group[0].src}>
          {group.map((p, i) => (
            <figure className="g-item" key={p.src}>
              <Image fill src={p.src!} alt={p.alt} sizes={i === 0 ? FEATURED_SIZES : SUPPORT_SIZES} quality={90} />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

/* The photos are optional: collapsed by default, revealed on demand. They are only mounted while
   open (or closing), so the images don't load until someone asks to see them. */
export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  function toggle() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!open) {
      // Mount the photos in their collapsed state and lay them out, then open, so the reveal transition runs.
      flushSync(() => setMounted(true));
      void revealRef.current?.offsetHeight;
      setOpen(true);
      return;
    }
    // If the reader is partway down the photos, bring the control back into view before collapsing.
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
          Life <em>together</em>
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
        <div className="spiral-reveal-inner">{mounted && <PhotoStory />}</div>
      </div>
    </section>
  );
}

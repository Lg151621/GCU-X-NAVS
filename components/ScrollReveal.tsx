"use client";

import { useEffect } from "react";

/* Shared, bidirectional section reveal for every major section below the hero (`main > section`;
   the hero is a div, so it is never touched). Each section is one cohesive block whose look reflects
   whether it is currently in view: it fades/rises in when it enters and fades back out when it leaves,
   in both scroll directions. Timing, easing, offset and reduced-motion handling live in globals.css
   (.rv-section). Only classes change, never React state, so dropdowns, galleries and the staff
   animation keep their state. Renders nothing. */

const TRIGGER = "0px 0px -12% 0px"; // "in view" = past 88% of the viewport height

export default function ScrollReveal() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const section = e.target as HTMLElement;
          section.classList.remove("rv-hidden");
          section.classList.toggle("rv-out", !e.isIntersecting); // animated both ways via .rv-section
        });
      },
      { rootMargin: TRIGGER },
    );

    sections.forEach((section) => {
      section.classList.add("rv-section");
      // Below the fold at load: start hidden instantly so it doesn't visibly fade out first.
      if (section.getBoundingClientRect().top >= window.innerHeight) section.classList.add("rv-hidden");
      io.observe(section);
    });

    return () => {
      io.disconnect();
      sections.forEach((s) => s.classList.remove("rv-section", "rv-out", "rv-hidden"));
    };
  }, []);

  return null;
}

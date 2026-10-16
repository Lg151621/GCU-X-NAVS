"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { staff, staffVerse, type StaffMember } from "@/lib/content";
import SectionHead from "./SectionHead";

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Verse() {
  return (
    <>
      <span className="verse-ref">{staffVerse.ref}</span>
      <p className="verse">
        {staffVerse.lead} <em>{staffVerse.emphasis}</em>
      </p>
    </>
  );
}

type BioProps = {
  p: StaffMember;
  open: boolean;
  onToggle: () => void;
};

function BioAccordion({ p, open, onToggle }: BioProps) {
  const id = useId();
  const buttonId = `${id}-button`;
  const regionId = `${id}-bio`;

  return (
    <div className="staff-bio" data-open={open}>
      <button
        className="bio-toggle"
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={regionId}
        onClick={onToggle}
      >
        <span>{open ? "Close bio" : "Read bio"}<span className="sr-only"> for {p.name}</span></span>
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="bio-reveal" id={regionId} role="region" aria-labelledby={buttonId} aria-hidden={!open} inert={!open}>
        <div className="bio-content">
          <div className="bio-text">
            <p>{p.bio || <span className="ph">Short bio: one or two sentences about them.</span>}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaffBack({ p, open, onToggle }: BioProps) {
  return (
    <>
      <div className="pic">
        <Image
          fill
          src={p.photo}
          alt={p.alt}
          sizes="360px"
          quality={90}
          style={{ objectFit: "cover", objectPosition: p.position }}
        />
      </div>
      <div className="info">
        <span className="role">{p.role}</span>
        <h3>{p.name}</h3>
        <BioAccordion p={p} open={open} onToggle={onToggle} />
      </div>
    </>
  );
}

/* Phone layout: one complete profile per card (portrait, name, role, bio). */
function ProfileCard({ p, open, onToggle }: BioProps) {
  const firstNames = p.name.replace(/\s+\S+$/, ""); // "Cameron & Emma Kessner" -> "Cameron & Emma"
  return (
    <article className="profile" data-bio-open={open}>
      <div className="profile-pic">
        <Image
          fill
          src={p.photo}
          alt={p.alt}
          sizes="(max-width: 760px) 440px, 1px"
          quality={90}
          style={{ objectFit: "cover", objectPosition: p.position }}
        />
      </div>
      <div className="profile-body">
        <h3>{p.name}</h3>
        <span className="role">{p.role}</span>
        <BioAccordion p={p} open={open} onToggle={onToggle} />
        {p.role === "Directors" && (
          <a className="btn profile-contact" href="#connect">Contact {firstNames}</a>
        )}
      </div>
    </article>
  );
}

export default function Staff() {
  const [activeStaffId, setActiveStaffId] = useState<string | null>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const runRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  function toggleBio(id: string) {
    setActiveStaffId((active) => active === id ? null : id);
  }

  // Extend only the desktop scroll stage as a bio grows; portraits and sibling cards stay fixed.
  useEffect(() => {
    const run = runRef.current!;
    const split = splitRef.current!;
    const backs = Array.from(split.querySelectorAll<HTMLElement>(".back"));
    const updateSpace = () => {
      const extra = Math.max(0, ...backs.map((back) => back.offsetHeight - split.offsetHeight));
      run.style.setProperty("--bio-extra", `${extra}px`);
    };
    const observer = new ResizeObserver(updateSpace);
    backs.forEach((back) => observer.observe(back));
    observer.observe(split);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const run = runRef.current!, splitEl = splitRef.current!;
    const stage = splitEl.parentElement!;
    const panels = panelRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const verseEls = Array.from(splitEl.querySelectorAll<HTMLElement>(".verse, .verse-ref"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function target() {
      if (reduceMotion) return 1; // show staff, no animation
      // 0 when the stage first pins, 1 when it releases at the end of .split-run
      const r = run.getBoundingClientRect();
      const pinTop = parseFloat(getComputedStyle(stage).top);
      const total = r.height - stage.offsetHeight;
      return total > 0 ? clamp((pinTop - r.top) / total) : 0;
    }

    function render(p: number) {
      const fade = 1 - clamp((p - 0.16) / 0.1); // 16–26%: verse fades out
      const split = ease(clamp((p - 0.24) / 0.26)); // 24–50%: panels move apart
      verseEls.forEach((el) => (el.style.opacity = fade.toFixed(3)));
      splitEl.classList.toggle("apart", split > 0.02);
      panels.forEach((el, i) => {
        const dir = i - 1; // -1 left, 0 middle, 1 right
        const flip = ease(clamp((p - 0.5 - i * 0.08) / 0.28)); // 50–94%: flips, staggered left to right
        el.style.transform = `translate3d(${dir * split * 24}px,0,0) rotateY(${flip * 180}deg)`;
        const back = el.querySelector<HTMLElement>(".back")!;
        // The reverse face must not receive keyboard focus before its flip finishes.
        back.inert = flip < 0.99;
        back.setAttribute("aria-hidden", String(flip < 0.99));
        const r = split > 0.01 ? `${(split * 14).toFixed(1)}px`
          : i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : "0";
        el.querySelectorAll<HTMLElement>(".face").forEach((f) => (f.style.borderRadius = r));
      });
    }

    // Ease toward the scroll target so it feels smooth.
    let cur = target();
    render(cur);
    let raf = requestAnimationFrame(function tick() {
      cur += (target() - cur) * (reduceMotion ? 1 : 0.12);
      render(cur);
      raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Phone entrance: each profile card fades up once as it enters the viewport.
  useEffect(() => {
    const root = mobileRef.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.dataset.animate = ""; // cards only start hidden once JS is running
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.transitionDelay = `${i * 90}ms`; // small stagger when several enter together
            el.classList.add("in");
            io.unobserve(el); // animate once, no re-triggering
          });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    root.querySelectorAll(".profile").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="staff">
      <SectionHead label="Our staff" title={<>The people who&apos;ll <em>walk with you.</em></>}>
        Our staff are full-time with The Navigators. They spend their weeks meeting with students one-on-one, leading Bible studies, and training student leaders.
      </SectionHead>

      <div className="split-run" ref={runRef}>
        <div className="split-stage">
          <div className="split" ref={splitRef}>
            {staff.map((p, i) => (
              <div className="panel" key={p.name} ref={(el) => { panelRefs.current[i] = el; }}>
                <div className="face front" aria-hidden="true">
                  <div className="front-inner" style={{ left: `-${i * 100}%` }}>
                    <Verse />
                  </div>
                </div>
                <div className="face back" data-bio-open={activeStaffId === p.name} inert aria-hidden="true">
                  <StaffBack p={p} open={activeStaffId === p.name} onToggle={() => toggleBio(p.name)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="split-mobile" ref={mobileRef}>
        <div className="vcard">
          <Verse />
        </div>
        {staff.map((p) => (
          <ProfileCard p={p} key={p.name} open={activeStaffId === p.name} onToggle={() => toggleBio(p.name)} />
        ))}
      </div>
    </section>
  );
}

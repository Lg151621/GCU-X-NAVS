"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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

function StaffBack({ p }: { p: StaffMember }) {
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
        <p>{p.bio || <span className="ph">Short bio: one or two sentences about them.</span>}</p>
      </div>
    </>
  );
}

/* Phone layout: one complete profile per card (portrait, name, role, bio, contact). */
function ProfileCard({ p }: { p: StaffMember }) {
  const firstNames = p.name.replace(/\s+\S+$/, ""); // "Cameron & Emma Kessner" -> "Cameron & Emma"
  return (
    <article className="profile">
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
        <p>{p.bio || <span className="ph">Short bio: one or two sentences about them.</span>}</p>
        <a className="btn profile-contact" href="#connect">Contact {firstNames}</a>
      </div>
    </article>
  );
}

export default function Staff() {
  const mobileRef = useRef<HTMLDivElement>(null);
  const runRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

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
                <div className="face back">
                  <StaffBack p={p} />
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
          <ProfileCard p={p} key={p.name} />
        ))}
      </div>
    </section>
  );
}

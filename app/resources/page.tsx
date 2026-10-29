import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ResourceDownload from "@/components/ResourceDownload";
import ResourceLibrary from "@/components/ResourceLibrary";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHead from "@/components/SectionHead";
import { BINDER, MEETING_PLAN, publishedHref, RESOURCE_SECTIONS } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Discipleship Resources | Navigators at GCU",
  description:
    "Practical, Scripture-centered resources from The Navigators at GCU for walking alongside others, growing in faith, and helping people follow Jesus.",
  alternates: { canonical: "/resources" },
};

const binderPages = BINDER.pdfPages.end - BINDER.pdfPages.start + 1;
const anyPending = [BINDER.file, MEETING_PLAN.file, ...RESOURCE_SECTIONS.flatMap((s) => [s.file, ...s.resources.map((r) => r.file)])]
  .some((f) => !publishedHref(f));

export default function ResourcesPage() {
  const binderHref = publishedHref(BINDER.file);

  return (
    <>
      <Navbar home="/" current="/resources" />
      <main className="wrap" id="top">
        <div className="hero page-hero">
          <Image className="hero-logo" src="/assets/Navigators_Sail_Black.webp" alt="" width={64} height={62} priority />
          <span className="label">Discipleship resources</span>
          <h1>
            Grow in Christ. <em>Help others do the same.</em>
          </h1>
          <p className="page-hero-lead">
            Practical, Scripture-centered resources for walking alongside others, growing in faith, and helping people follow Jesus.
          </p>
          <div className="page-hero-actions">
            <a className="btn primary" href="#library">Explore resources</a>
            {binderHref ? (
              <a className="btn" href={binderHref} download>
                Download complete binder<span className="sr-only">, PDF, {binderPages} pages, {BINDER.size}</span>
              </a>
            ) : (
              <a className="btn pending-btn" href="#binder">Binder · pending permission</a>
            )}
          </div>
        </div>

        <section id="why">
          <SectionHead label="Why these tools" title={<>A binder can&apos;t disciple anyone. <em>People do.</em></>}>
            <i>Growing With Christ</i> is a collection of tools for intentional discipleship. Each one covers a small piece of helping someone follow Jesus. They aren&apos;t a substitute for sharing our lives, opening the Word together, and walking with someone over time.
          </SectionHead>
          <div className="doers">
            <blockquote>
              We were delighted to share with you not only the gospel of God <em>but our lives as well.</em>
            </blockquote>
            <p>
              If a book were all it took to make disciple makers, the world would already be reached. God uses people. Use these tools inside a real discipleship relationship, not in place of one.
              <br />
              <span className="ref">1 Thessalonians 2:8 (NIV)</span>
            </p>
          </div>
        </section>

        <section id="rhythm">
          <SectionHead label="How to use them" title={<>Life. Word. Mission. <em>Prayer.</em></>}>
            The binder&apos;s plan for a discipleship meeting. A tool from the library fits in the Word part.
          </SectionHead>
          <div className="mission rhythm">
            <article>
              <h3><em>Life</em></h3>
              <p>Enter into each other&apos;s lives, so no one feels like a project instead of a person.</p>
            </article>
            <article>
              <h3><em>Word</em></h3>
              <p>Center the time on God&apos;s Word. This is where you review a tool together.</p>
            </article>
            <article>
              <h3><em>Mission</em></h3>
              <p>Talk about where God has each of you, and who He may want you to reach.</p>
            </article>
            <article>
              <h3><em>Prayer</em></h3>
              <p>Pray for each other and the people around you this week.</p>
            </article>
          </div>
          <div className="res-worksheet">
            <div>
              <h3>{MEETING_PLAN.title}</h3>
              <p>The binder&apos;s one-page template for planning each meeting around these four parts.</p>
            </div>
            <ResourceDownload file={MEETING_PLAN.file} name={MEETING_PLAN.title} label="Download worksheet" preview />
          </div>
        </section>

        <section id="library">
          <SectionHead label="Resource library" title={<>Four sections. <em>Use them in any order.</em></>}>
            The binder groups its tools by where someone is in their walk with God, kept here in its original order. It&apos;s often easiest to work through one section before the next, but you can use the tools in any order. Most fit in a single meeting.
          </SectionHead>
          <ResourceLibrary />
          <p className="aside">
            {anyPending
              ? <>Some downloads will be added once the binder&apos;s creators confirm they can be shared publicly. Until then, ask a staff member about using them.</>
              : <>Every PDF keeps the binder&apos;s original pages and ends with its credits page. Share them freely, but please don&apos;t reproduce them for profit.</>}
          </p>
        </section>

        <section id="binder">
          <div className="res-binder">
            <div>
              <span className="label">The complete binder</span>
              <h2><i>{BINDER.title}</i></h2>
              <p className="res-binder-meta">{BINDER.edition} · {binderPages} pages · PDF · {BINDER.size}</p>
              <p>Every tool in one file, with the introduction, the meeting plan, and the original credits.</p>
            </div>
            <ResourceDownload file={BINDER.file} name={`the complete ${BINDER.title} binder`} label="Download complete binder" />
          </div>
          <p className="res-credits">
            <b>Credits.</b> {BINDER.credits} Some tools adapt material from other ministries and authors, and keep their original credit on the page.
          </p>
        </section>

        <section id="walk">
          <SectionHead label="Walk with someone" title={<>Tools work best with someone <em>walking alongside you.</em></>}>
            If you&apos;d like someone to walk through these with you, reach out.
          </SectionHead>
          <Link className="btn primary" href="/#connect">Get connected</Link>
        </section>

        <Footer />
      </main>
      <ScrollReveal />
    </>
  );
}

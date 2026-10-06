"use client";

import Image from "next/image";
import { useState } from "react";

const LINKS = [
  { href: "#who", label: "About" },
  { href: "#week", label: "Our week" },
  { href: "#staff", label: "Staff" },
  { href: "#parents", label: "Parents" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header>
      <nav className="nav" aria-label="Main">
        <a className="brand" href="#top">
          <Image className="logo" src="/assets/Navigators_Sail_Black.webp" alt="The Navigators logo" width={38} height={37} priority />
          <span>
            <b>The Navigators</b>
            <small>Grand Canyon University</small>
          </span>
        </a>
        <button
          className="menu-btn"
          id="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <div className={open ? "links open" : "links"} id="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a className="btn primary" href="#connect" onClick={close}>
            Get connected
          </a>
        </div>
      </nav>
    </header>
  );
}

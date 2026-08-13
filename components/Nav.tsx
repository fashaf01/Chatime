"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#customise", label: "Make It Yours" },
  { href: "#story", label: "Our Story" },
  { href: "#find-us", label: "Find Us" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Passive listener + a cheap boolean flip. No layout reads on scroll.
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet, and restore the exact scroll
  // position on close — `position: fixed` alone would jump the user to the top.
  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, y);
    };
  }, [open]);

  // Escape closes the sheet.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // At the very top the bar floats over the dark plum hero, so every mark in
  // it has to invert. Once the cream page scrolls under it, it flips back.
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-clay/60 bg-cream/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
      style={{ height: "var(--nav-h)" }}
    >
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="shrink-0" aria-label="Chatime Sri Lanka, home">
          <Logo tone={solid ? "plum" : "cream"} />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                solid
                  ? "text-ink/70 hover:bg-sand hover:text-plum"
                  : "text-cream/80 hover:bg-cream/10 hover:text-cream"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#find-us"
            className={`ml-3 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              solid
                ? "bg-plum text-cream hover:bg-grape hover:shadow-lg hover:shadow-plum/25"
                : "bg-cream text-plum hover:bg-white hover:shadow-lg hover:shadow-black/25"
            }`}
          >
            Visit Us
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden ${
            solid ? "text-plum hover:bg-sand" : "text-cream hover:bg-cream/10"
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            <path
              d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {/* mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-clay/60 bg-cream/97 backdrop-blur-xl md:hidden"
      >
        <ul className="mx-auto max-w-7xl px-5 py-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-clay/40 py-3.5 font-display text-lg text-plum"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <a
              href="#find-us"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-plum px-5 py-3.5 text-center text-sm font-semibold text-cream"
            >
              Visit Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

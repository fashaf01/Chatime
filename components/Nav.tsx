"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

/* Five items, deliberately. The published teardown of the Australian site
   flagged a 13-item global header as its worst navigation problem. */
const LINKS = [
  { href: "#drinks", label: "Drinks" },
  { href: "#rewards", label: "Loyal-Tea" },
  { href: "#order", label: "Order" },
  { href: "#find-us", label: "Stores" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the sheet and restore the exact scroll offset after,
  // which `position: fixed` alone would throw away.
  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const { body } = document;
    const prev = { position: body.style.position, top: body.style.top, width: body.style.width };
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${
        scrolled || open ? "bg-paper shadow-[0_2px_20px_rgba(27,16,34,0.08)]" : "bg-paper"
      }`}
      style={{ height: "var(--nav-h)" }}
    >
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="shrink-0" aria-label="Chatime Sri Lanka, home">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2.5 text-[15px] font-bold text-ink/70 transition-colors hover:bg-mist hover:text-grape"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#order"
            className="ml-3 rounded-full bg-magenta px-6 py-3 text-[15px] font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-punch hover:shadow-lg hover:shadow-magenta/35"
          >
            Order now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-12 w-12 items-center justify-center rounded-full text-grape transition-colors hover:bg-mist md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            <path
              d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="bg-paper md:hidden">
        <ul className="mx-auto max-w-7xl px-5 pb-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-lilac py-4 text-xl font-extrabold tracking-tight text-grape"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#order"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-magenta px-5 py-4 text-center font-extrabold text-white"
            >
              Order now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

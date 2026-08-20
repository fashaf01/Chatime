"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { categories, drinks } from "@/lib/drinks";

/* Five items, deliberately. The published teardown of the Australian site
   flagged a 13-item global header as its worst navigation problem. Drinks is
   the only one with a panel, because it is the only one with real depth. */
const LINKS = [
  { href: "#drinks", label: "Drinks", panel: true },
  { href: "#rewards", label: "Loyal-Tea" },
  { href: "#order", label: "Order" },
  { href: "#find-us", label: "Stores" },
];

const NOTICES = [
  "Free delivery on PickMe orders over Rs 3,500",
  "50% off your first order — join Loyal-Tea in store",
  "New: the Ceylon series, brewed on Sri Lankan leaf",
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [notice, setNotice] = useState(0);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotate the notice rather than stacking three bars.
  useEffect(() => {
    const id = window.setInterval(
      () => setNotice((n) => (n + 1) % NOTICES.length),
      5200
    );
    return () => window.clearInterval(id);
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setPanel(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // A short grace period stops the panel snapping shut while the pointer
  // crosses the gap between the trigger and the panel itself.
  const holdPanel = (next: boolean) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (next) setPanel(true);
    else closeTimer.current = window.setTimeout(() => setPanel(false), 140);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    []
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* --------------------------------------------------- announcement */}
      <div
        className="overflow-hidden bg-plum text-white transition-[height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ height: scrolled ? 0 : "var(--bar-h)" }}
      >
        <div className="mx-auto flex h-[var(--bar-h)] max-w-7xl items-center justify-center px-5 sm:px-8">
          <p className="relative flex h-full items-center overflow-hidden text-center text-[12px] font-bold tracking-[0.02em] text-white/75">
            {NOTICES.map((n, i) => (
              <span
                key={n}
                aria-hidden={i !== notice}
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: i === notice ? 1 : 0,
                  transform: i === notice ? "none" : "translateY(100%)",
                }}
              >
                {n}
              </span>
            ))}
            {/* Reserves the width of the longest notice so the bar never jumps. */}
            <span className="invisible whitespace-nowrap">{NOTICES[0]}</span>
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------- navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled || open || panel
            ? "bg-paper shadow-[0_2px_28px_rgba(24,12,32,0.1)]"
            : "bg-paper"
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
            {LINKS.map((l) =>
              l.panel ? (
                <div
                  key={l.href}
                  onMouseEnter={() => holdPanel(true)}
                  onMouseLeave={() => holdPanel(false)}
                >
                  <a
                    href={l.href}
                    onFocus={() => holdPanel(true)}
                    aria-expanded={panel}
                    className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-bold text-ink/70 transition-colors hover:bg-mist hover:text-grape"
                  >
                    {l.label}
                    <svg
                      viewBox="0 0 12 12"
                      className={`h-2.5 w-2.5 transition-transform duration-300 ${panel ? "rotate-180" : ""}`}
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M2 4.5 6 8.5l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-4 py-2.5 text-[15px] font-bold text-ink/70 transition-colors hover:bg-mist hover:text-grape"
                >
                  {l.label}
                </a>
              )
            )}
            <a
              href="#order"
              className="ml-3 rounded-full bg-magenta px-6 py-3 text-[15px] font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-punch hover:shadow-lg hover:shadow-magenta/35"
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
      </div>

      {/* ------------------------------------------------------- drinks panel */}
      <div
        onMouseEnter={() => holdPanel(true)}
        onMouseLeave={() => holdPanel(false)}
        className={`absolute inset-x-0 top-full hidden origin-top border-t border-lilac bg-paper shadow-[0_18px_40px_rgba(24,12,32,0.12)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:block ${
          panel
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[1fr_260px]">
          <ul className="grid grid-cols-3 gap-1.5">
            {categories.map((c) => (
              <li key={c.id}>
                <a
                  href="#menu"
                  onClick={() => setPanel(false)}
                  className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-mist"
                >
                  <span
                    className="mt-0.5 h-9 w-9 shrink-0 rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: c.accent }}
                  />
                  <span>
                    <span className="block text-[14.5px] font-extrabold tracking-tight text-grape">
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-[12px] font-medium leading-snug text-ink/45">
                      {drinks.filter((d) => d.category === c.id).length} drinks
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#customise"
            onClick={() => setPanel(false)}
            className="flex flex-col justify-between rounded-2xl bg-grape p-5 transition-colors hover:bg-violet"
          >
            <span className="h-md text-[17px] text-white">
              Build your own cup
            </span>
            <span className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-extrabold text-white/75">
              Open the builder
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* -------------------------------------------------------- mobile sheet */}
      <div id="mobile-menu" hidden={!open} className="border-t border-lilac bg-paper md:hidden">
        <ul className="mx-auto max-w-7xl px-5 pb-5">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="h-md block border-b border-lilac py-4 text-xl text-grape"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#customise"
              onClick={() => setOpen(false)}
              className="h-md block border-b border-lilac py-4 text-xl text-grape"
            >
              Build your cup
            </a>
          </li>
          <li className="pt-5">
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

import Logo from "./Logo";

const COLUMNS = [
  {
    title: "Drink",
    links: [
      { label: "Full menu", href: "#menu" },
      { label: "Build your cup", href: "#customise" },
      { label: "Ceylon series", href: "#menu" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "#story" },
      { label: "Find a store", href: "#find-us" },
      { label: "Franchise", href: "#franchise" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 10.6a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4Zm8.1-10.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    path: "M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5v-3.2a5.8 5.8 0 1 0 4.9 5.7V9.8a7.3 7.3 0 0 0 4.3 1.4V8a4.3 4.3 0 0 1-3.3-2.2Z",
  },
];

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-plum text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 15% 0%, #7a2d8d 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="cream" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-cream/60 text-pretty">
              Freshly brewed bubble tea in Colombo. Every cup shaken to order,
              on Ceylon leaf.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-cream/50 hover:bg-cream/10 hover:text-cream"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
                    <path d={s.path} fill="currentColor" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-caramel">
                {col.title}
              </h3>
              {/* py-2 on the anchor keeps every footer link a >=32px tap
                  target on phones without opening the list up visually. */}
              <ul className="mt-3 space-y-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="inline-block py-2 text-[14px] text-cream/65 transition-colors hover:text-cream"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-caramel">
              Visit
            </h3>
            <address className="mt-5 text-[14px] not-italic leading-relaxed text-cream/65">
              <p className="mb-2">
                Level 2, Havelock City Mall
                <br />
                40 Lauries Road, Colombo 05
              </p>
              <p>
                <a
                  href="tel:+94760000000"
                  className="inline-block py-2 transition-colors hover:text-cream"
                >
                  +94 76 000 0000
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@chatime.lk"
                  className="inline-block py-2 transition-colors hover:text-cream"
                >
                  hello@chatime.lk
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-8 text-[13px] text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Chatime Sri Lanka. All rights reserved.</p>
          <p>Chatime® is a registered trademark of La Kaffa International Co., Ltd.</p>
        </div>
      </div>
    </footer>
  );
}

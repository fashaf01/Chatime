"use client";

import { useState } from "react";
import DrinkArt from "./DrinkArt";
import { drinks } from "@/lib/drinks";
import { useParallax } from "@/lib/motion";

const CUP = drinks.find((d) => d.id === "wildberry")!;

/**
 * Sign-up band.
 *
 * There is no backend behind this yet, so the form says so plainly on submit
 * rather than pretending a list exists. Wiring it up later means replacing one
 * handler and nothing else.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const cup = useParallax<HTMLDivElement>(0.16);

  return (
    <section className="relative isolate overflow-hidden bg-plum py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="gradient-pan absolute inset-0 bg-[linear-gradient(115deg,#2A0F3D_0%,#5C2D91_45%,#B01560_100%)]" />
        <div className="blob spin-slow absolute -left-24 -top-28 h-80 w-80 bg-white/8" />
        <div className="absolute -right-16 -bottom-10 h-72 w-72 rounded-full bg-mango/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="eyebrow text-punch">Before you go</p>
          <h2 className="h-lg mt-3 text-[clamp(2rem,4.4vw,3.1rem)] text-white text-balance">
            Half price on your first cup.
          </h2>
          <p className="mt-4 max-w-lg text-[16px] font-medium leading-relaxed text-white/65 text-pretty">
            Drop your email and we will send the voucher, plus a heads-up
            whenever a seasonal drink lands. Two emails a month, no more.
          </p>

          <form
            className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSent(false);
              }}
              placeholder="you@example.lk"
              className="flex-1 rounded-full border-2 border-white/15 bg-white/10 px-6 py-4 text-[15px] font-semibold text-white outline-none backdrop-blur-sm transition-colors placeholder:font-medium placeholder:text-white/40 focus:border-punch"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-8 py-4 text-[15px] font-extrabold text-grape transition-all duration-300 hover:-translate-y-0.5 hover:bg-punch hover:text-white"
            >
              Send it
            </button>
          </form>

          <p
            className="mt-4 text-[13px] font-bold text-white/55"
            role="status"
            aria-live="polite"
          >
            {sent
              ? "Thanks — sign-ups are handled at the counter for now, so bring this page in and we will load your points."
              : "Or join in about thirty seconds at the till."}
          </p>
        </div>

        <div ref={cup} className="hidden justify-center lg:flex">
          <DrinkArt
            drink={CUP}
            detail="hero"
            className="h-[320px] w-auto drop-shadow-[0_28px_46px_rgba(10,3,16,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

/**
 * Scroll-in animation wrapper.
 *
 * One IntersectionObserver per element, disconnected the moment it fires, so
 * scrolling stays off the main thread — no scroll listeners, no layout reads.
 * Elements that have already been revealed are never observed again.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  dir = "up",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Which way the element travels in from. */
  dir?: Direction;
  as?: "div" | "section" | "li" | "article" | "header" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Anything already on screen at mount is shown immediately, so a reload
    // partway down the page never leaves blank gaps above the fold.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error -- one ref type across the allowed tag union
      ref={ref}
      data-dir={dir}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

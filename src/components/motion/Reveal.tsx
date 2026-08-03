'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Fragment, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  /** Play on mount instead of waiting to be scrolled into view. */
  immediate?: boolean;
};

/** Scroll-triggered rise-and-fade. The workhorse of the whole site. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  immediate = false,
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' });

  const shown = immediate || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits a line into words and staggers them upward from behind a clip mask.
 * Used for the big display headings.
 *
 * Two traps this avoids:
 *
 * 1. Each word starts translated fully below its own `overflow-hidden` wrapper.
 *    IntersectionObserver clips a target against ancestor overflow, so watching
 *    the word itself reports zero intersection forever — the reveal deadlocks
 *    and the heading stays permanently invisible. The observer therefore watches
 *    the unclipped outer span and the words follow it.
 * 2. Anything above the fold passes `immediate`, so the copy does not depend on
 *    an observer firing at all. A heading that never appears is far worse than
 *    one that animates a beat early.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
  wordClassName,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });
  const words = text.split(' ');

  if (reduced) return <span className={className}>{text}</span>;

  const shown = immediate || inView;

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        // The space is a real text node *between* the wrappers. Inside the
        // clipped span it collapses away and the words run together — and a
        // CSS margin would only fix the look, leaving screen readers and
        // search engines reading "Cupsof Joy".
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${wordClassName ?? ''}`}
              initial={{ y: '105%' }}
              animate={shown ? { y: 0 } : { y: '105%' }}
              transition={{
                duration: 1,
                delay: delay + i * 0.075,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  );
}

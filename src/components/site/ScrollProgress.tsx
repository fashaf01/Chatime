'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin reading-progress bar pinned under the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-purple-800 via-magenta to-leaf"
      style={{ scaleX: width }}
    />
  );
}

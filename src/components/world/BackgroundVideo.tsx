"use client";

import { forwardRef, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* One persistent video layer shared across the entrance, hub, and every topic page —
   it stays mounted on navigation (only its source swaps) so playback keeps advancing
   forward through the whole journey instead of each screen restarting from frame zero.
   Autoplays on the entrance screen, then keeps running forward underneath every
   subsequent screen (see WorldExperience for the per-view play/pause logic).

   `src` is swapped per screen by the parent — entrance/hub use the shared brand loop,
   each topic page gets its own clip. The element is keyed by src so the browser does a
   clean reload instead of silently keeping the old decoded frames around.

   The wrapper also tracks the pointer and gives the video a subtle parallax
   tilt/pan so the background reads as interactive rather than a flat loop —
   it's scaled up slightly so the pan never reveals the video's edges. */
const BackgroundVideo = forwardRef<HTMLVideoElement, { src: string }>(({ src }, ref) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const translateX = useTransform(sx, [-1, 1], [-18, 18]);
  const translateY = useTransform(sy, [-1, 1], [-12, 12]);
  const rotateX = useTransform(sy, [-1, 1], [2.5, -2.5]);
  const rotateY = useTransform(sx, [-1, 1], [-2.5, 2.5]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div ref={wrapRef} className="fixed inset-0 z-0 overflow-hidden" style={{ perspective: 1000 }}>
      <motion.video
        key={src}
        ref={ref}
        className="w-full h-full object-cover object-center"
        style={{
          scale: 1.12,
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </motion.video>
    </div>
  );
});

BackgroundVideo.displayName = "BackgroundVideo";

export default BackgroundVideo;

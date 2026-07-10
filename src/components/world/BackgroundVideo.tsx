"use client";

import { forwardRef, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* One persistent video layer shared across the entrance, hub, and every topic page —
   it never unmounts on navigation, so playback keeps advancing forward through the
   whole journey instead of each screen restarting its own copy from frame zero.
   Starts paused; the entrance screen's "Tap to Explore" click is what starts it,
   after which it just keeps running forward underneath every subsequent screen.

   The wrapper also tracks the pointer and gives the video a subtle parallax
   tilt/pan so the background reads as interactive rather than a flat loop —
   it's scaled up slightly so the pan never reveals the video's edges. */
const BackgroundVideo = forwardRef<HTMLVideoElement>((_props, ref) => {
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
        ref={ref}
        className="w-full h-full object-cover object-center"
        style={{
          scale: 1.12,
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
        }}
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/video5.mp4" type="video/webm" />
        <source src="/videos/video5.mp4" type="video/mp4" />
      </motion.video>
    </div>
  );
});

BackgroundVideo.displayName = "BackgroundVideo";

export default BackgroundVideo;

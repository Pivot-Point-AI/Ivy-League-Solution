"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollMotif from "./ScrollMotif";
import { SOFT_EASE, usePrefersReducedMotion, useIsMobile } from "@/lib/scrollMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scene1Threshold() {
  const containerRef = useRef<HTMLDivElement>(null);
  const intensityRef = useRef(1);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [progress, setProgress] = useState(0);
  const skipToScene = "#scene-3-gap";

  const usePin = !reducedMotion && !isMobile;

  useEffect(() => {
    if (!usePin || !containerRef.current) return;
    const ctx = gsap.context(() => {
      /* Pin distance capped under 1.5vh so the threshold beat never overstays scroll intent. */
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => setProgress(self.progress),
      });
      return () => st.kill();
    }, containerRef);
    return () => ctx.revert();
  }, [usePin]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100svh" }}
    >
      <div className="absolute inset-0">
        {usePin ? (
          <ScrollMotif intensityRef={intensityRef} />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 45%, #3b82f6 0%, #050B3A 65%)" }}
          />
        )}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(100deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.45) 42%,rgba(0,0,0,0.1) 70%)" }}
      />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-[1440px] mx-auto w-full px-5 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: SOFT_EASE }}
          className="text-white font-bold"
          style={{ fontSize: "clamp(32px,5.4vw,72px)", lineHeight: 1.06, letterSpacing: "-1.8px", maxWidth: 900 }}
        >
          Enterprise systems, engineered end-to-end.
        </motion.h1>
      </div>

      <button
        onClick={() => document.querySelector(skipToScene)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })}
        className="absolute top-6 right-6 z-20 text-white/50 hover:text-white/90 transition-colors font-semibold"
        style={{ fontSize: 12, letterSpacing: "1.5px", background: "none", border: "none", cursor: "pointer" }}
      >
        SKIP INTRO →
      </button>

      {usePin && (
        <div className="absolute bottom-10 left-0 right-0 z-10 px-5 sm:px-8">
          <div className="max-w-[1440px] mx-auto h-[2px] rounded-full bg-white/15 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: "linear-gradient(90deg,#3b82f6,#22d3ee)" }} />
          </div>
        </div>
      )}
    </section>
  );
}

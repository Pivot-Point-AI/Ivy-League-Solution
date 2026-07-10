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

export default function Scene4System() {
  const containerRef = useRef<HTMLDivElement>(null);
  const intensityRef = useRef(0.5);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [progress, setProgress] = useState(0);
  const usePin = !reducedMotion && !isMobile;

  useEffect(() => {
    if (!usePin || !containerRef.current) return;
    const ctx = gsap.context(() => {
      /* Same sub-1.5vh cap as scene 1 — the reveal resolves fast so text can land last. */
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          setProgress(self.progress);
          intensityRef.current = 0.9 - self.progress * 0.6;
        },
      });
      return () => st.kill();
    }, containerRef);
    return () => ctx.revert();
  }, [usePin]);

  const resolved = progress > 0.55 || !usePin;

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-black" style={{ height: "100svh" }}>
      <div className="absolute inset-0">
        {usePin ? (
          <ScrollMotif intensityRef={intensityRef} />
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 45%, #2563FF 0%, #050B3A 65%)" }} />
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(100deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.5) 45%,rgba(0,0,0,0.15) 75%)" }} />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-[900px] mx-auto px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: resolved ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="font-semibold uppercase mb-4"
          style={{ fontSize: 12, letterSpacing: "2.5px", color: "#22d3ee" }}
        >
          Introducing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={resolved ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: SOFT_EASE }}
          className="text-white font-bold"
          style={{ fontSize: "clamp(30px,5vw,60px)", lineHeight: 1.05, letterSpacing: "-1.6px" }}
        >
          Ivy League Solutions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={resolved ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: SOFT_EASE }}
          className="mt-6"
          style={{ fontSize: "clamp(14px,1.3vw,17px)", color: "rgba(255,255,255,0.68)", maxWidth: 620 }}
        >
          One partner across software development, AI and machine learning, digital infrastructure, and cybersecurity.
        </motion.p>
      </div>
    </section>
  );
}

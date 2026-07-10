"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INDUSTRIES } from "@/lib/homepageData";
import { SOFT_EASE } from "@/lib/scrollMotion";

/*
 * Reuses the motif visually (same color/gradient language) without mounting a
 * second WebGL canvas — see ScrollMotif.tsx for why only scenes 1 & 4 pay the
 * R3F cost.
 */
export default function Scene2Shift() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % INDUSTRIES.length), 2200);
    return () => clearInterval(t);
  }, []);

  const active = INDUSTRIES[idx];

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ minHeight: "90vh" }}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 65% 40%, ${active.color}55 0%, transparent 55%), radial-gradient(circle at 20% 70%, #6C3CFF33 0%, transparent 50%)`,
          transition: "background 0.8s ease",
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,rgba(4,12,80,0.98) 0%,rgba(7,27,143,0.90) 42%,rgba(20,50,180,0.6) 66%,rgba(80,40,200,0.2) 100%)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8" style={{ minHeight: "90vh" }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: SOFT_EASE }}
          className="text-white font-bold"
          style={{ fontSize: "clamp(28px,4.4vw,56px)", lineHeight: 1.1, letterSpacing: "-1.5px", maxWidth: 780 }}
        >
          Built for{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={active.name}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.4 }}
              style={{ color: active.color, display: "inline-block" }}
            >
              {active.name}
            </motion.span>
          </AnimatePresence>
          .
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: SOFT_EASE }}
          className="mt-5"
          style={{ fontSize: "clamp(14px,1.3vw,17px)", color: "rgba(255,255,255,0.6)", maxWidth: 560 }}
        >
          AI, cloud, and security are no longer separate line items in how enterprises operate.
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TOPICS } from "@/lib/worldTopics";
import { SOFT_EASE } from "@/lib/scrollMotion";
import ScrollIndicator from "./ScrollIndicator";

const SCROLL_THRESHOLD = 60;

const INDUSTRIES = [
  { name: "Fintech", color: "#34d399", icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { name: "Healthcare", color: "#a78bfa", icon: "M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1.5 5.5 3.5C14 6.5 15.5 5 17.5 5 21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z" },
  { name: "Logistics", color: "#60a5fa", icon: "M3 7h11v10H3zM14 10h4l3 3v4h-7zM6.5 20.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 20.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" },
  { name: "Enterprise", color: "#fb923c", icon: "M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 7h.01M15 7h.01" },
  { name: "EdTech", color: "#22d3ee", icon: "M22 10 12 5 2 10l10 5 10-5zM6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" },
  { name: "Government", color: "#c026d3", icon: "M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" },
];

export default function HubView({
  onSelectTopic,
  onAdvance,
}: {
  onSelectTopic: (slug: string) => void;
  onAdvance: () => void;
}) {
  const preview = TOPICS[0];
  const rootRef = useRef<HTMLDivElement>(null);
  const accumulatedRef = useRef(0);
  const advancedRef = useRef(false);

  /* Scrolling down on the hub advances into the Who We Serve section, mirroring the
     scroll-to-navigate behavior used everywhere else — the hub only has one viewport of
     content, so a native scroll would otherwise have nowhere to go. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0 || advancedRef.current) return;
      e.preventDefault();

      accumulatedRef.current += e.deltaY;
      if (accumulatedRef.current < SCROLL_THRESHOLD) return;

      advancedRef.current = true;
      onAdvance();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onAdvance]);

  return (
    <div ref={rootRef} className="relative w-full min-h-[100svh]">
      {/* Background video is the shared, persistent <BackgroundVideo> mounted once in
          WorldExperience — this screen only lays a gradient and copy on top of it. */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(5,8,20,0.95) 0%, rgba(5,8,20,0.75) 40%, rgba(5,8,20,0.35) 70%, rgba(5,8,20,0.1) 100%)" }} />

      <div className="relative z-10 flex flex-col justify-center min-h-[100svh] px-6 sm:px-10 lg:px-16 pt-24 pb-40">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: SOFT_EASE }}
          className="font-semibold uppercase mb-4"
          style={{ fontSize: 12, letterSpacing: "2.5px", color: "#60a5fa" }}
        >
          Ivy League Solutions
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: SOFT_EASE }}
          className="text-white font-bold uppercase"
          style={{ fontSize: "clamp(32px,5.5vw,64px)", lineHeight: 1.05, letterSpacing: "-2px", maxWidth: 900 }}
        >
          Leading the way to systems that just work.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: SOFT_EASE }}
          className="mt-6"
          style={{ fontSize: "clamp(15px,1.3vw,18px)", color: "rgba(255,255,255,0.68)", maxWidth: 560 }}
        >
          We build the software, AI, infrastructure, and security enterprises run on. Explore what we do.
        </motion.p>
      </div>

      <motion.button
        onClick={() => onSelectTopic(preview.slug)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: SOFT_EASE }}
        whileHover={{ scale: 1.03 }}
        className="absolute z-10 rounded-2xl overflow-hidden group w-[120px] h-[80px] sm:w-[220px] sm:h-[140px]"
        style={{ left: 24, bottom: 28, border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer" }}
      >
        <Image src={preview.image} alt={preview.title} fill sizes="(max-width: 640px) 120px, 220px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />
        <span
          className="absolute flex items-center justify-center rounded-full"
          style={{ right: 12, bottom: 12, width: 34, height: 34, background: "rgba(255,255,255,0.9)", color: "#050814" }}
        >
          ▶
        </span>
      </motion.button>

      <div className="absolute z-10 right-6 sm:right-10 lg:right-16 bottom-24 sm:bottom-28 flex flex-col items-end gap-4 max-w-full">
        <div className="text-right">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: SOFT_EASE }}
            className="block text-white font-bold"
            style={{ fontSize: "clamp(16px,1.8vw,22px)", letterSpacing: "-0.5px", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
          >
            Who We Serve
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: SOFT_EASE }}
          className="flex flex-wrap gap-2.5 justify-end"
        >
          {INDUSTRIES.map((industry) => (
            <span
              key={industry.name}
              className="flex items-center gap-2 rounded-full font-semibold"
              style={{
                fontSize: 12.5,
                padding: "6px 14px 6px 6px",
                color: "white",
                background: "rgba(5,8,20,0.45)",
                border: `1px solid ${industry.color}55`,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <span
                className="flex items-center justify-center rounded-full"
                style={{ width: 22, height: 22, background: `linear-gradient(135deg, ${industry.color}, ${industry.color}cc)` }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#050814" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={industry.icon} />
                </svg>
              </span>
              {industry.name}
            </span>
          ))}
        </motion.div>
      </div>

      <ScrollIndicator onClick={onAdvance} />
    </div>
  );
}

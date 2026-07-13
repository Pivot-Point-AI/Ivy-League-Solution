"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TOPICS } from "@/lib/worldTopics";
import { SOFT_EASE } from "@/lib/scrollMotion";

export default function HubView({
  onSelectTopic,
  onOpenAllTopics,
  onHoverStart,
  onHoverEnd,
}: {
  onSelectTopic: (slug: string) => void;
  onOpenAllTopics: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const categories = useMemo(() => Array.from(new Set(TOPICS.flatMap((t) => t.tags))), []);
  const preview = TOPICS[0];

  const topicForCategory = (category: string) => TOPICS.find((t) => t.tags.includes(category)) ?? TOPICS[0];

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden">
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
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: SOFT_EASE }}
        className="absolute z-10 right-4 sm:right-10 lg:right-16 bottom-24 sm:bottom-10 flex flex-col items-end gap-4 max-w-full px-2 sm:px-0"
      >
        <div className="flex items-center gap-2.5">
          <span style={{ width: 22, height: 1.5, background: "linear-gradient(90deg, transparent, #60a5fa)" }} />
          <span
            className="font-bold uppercase"
            style={{ fontSize: 12, letterSpacing: "2.5px", color: "#60a5fa", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
          >
            Select a Topic
          </span>
        </div>

        <div
          className="flex flex-wrap gap-2.5 justify-end p-2.5 rounded-2xl"
          style={{
            background: "rgba(5,8,20,0.45)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 20px 50px -18px rgba(0,0,0,0.75)",
          }}
        >
          {categories.map((c) => {
            const color = topicForCategory(c).from;
            return (
              <motion.button
                key={c}
                onClick={() => onSelectTopic(topicForCategory(c).slug)}
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                whileHover={{ scale: 1.06, y: -2, borderColor: `${color}99`, background: "rgba(255,255,255,0.11)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="group rounded-full font-bold flex items-center gap-2.5"
                style={{
                  fontSize: 13.5,
                  letterSpacing: "0.01em",
                  padding: "7px 20px 7px 7px",
                  color: "white",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  cursor: "pointer",
                }}
              >
                <span
                  className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ width: 26, height: 26, background: `linear-gradient(135deg, ${color}, ${color}cc)`, boxShadow: `0 4px 14px -4px ${color}99` }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#050814" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                  </svg>
                </span>
                {c}
              </motion.button>
            );
          })}
        </div>

        <motion.button
          onClick={onOpenAllTopics}
          whileHover={{ gap: 8 }}
          className="flex items-center gap-1.5 font-semibold"
          style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.02em" }}
        >
          View all topics
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}

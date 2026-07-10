"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TOPICS } from "@/lib/worldTopics";
import { SOFT_EASE } from "@/lib/scrollMotion";

export default function TopicsPanel({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (slug: string) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(5,8,20,0.55)" }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: SOFT_EASE }}
            className="fixed top-0 right-0 z-50 h-full overflow-y-auto"
            style={{ width: "min(96vw, 780px)", background: "#ffffff" }}
          >
            <div className="px-8 sm:px-12 pt-10 pb-14">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-bold" style={{ fontSize: 34, letterSpacing: "-0.8px", color: "#0F172A" }}>
                  All Topics <span style={{ color: "#94A3B8" }}>({TOPICS.length})</span>
                </h2>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 44, height: 44, background: "#F1F5F9", border: "none", cursor: "pointer" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {TOPICS.map((t, i) => (
                  <motion.article
                    key={t.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: SOFT_EASE }}
                    onClick={() => onSelect(t.slug)}
                    className="rounded-2xl overflow-hidden cursor-pointer group"
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative w-full" style={{ height: 190 }}>
                      <Image src={t.image} alt={t.title} fill sizes="380px" className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105" />
                      {/* Drop a file at the topic's `video` path (public/videos/topics/<slug>.mp4) and it plays over the poster automatically */}
                      <video
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={t.video} type="video/mp4" />
                      </video>
                      <div className="absolute left-3 top-3 flex gap-1.5">
                        {t.tags.map((tag) => (
                          <span key={tag} className="rounded-full font-bold flex items-center gap-1" style={{ fontSize: 11, padding: "5px 11px", color: "#0F172A", background: "#ffffff" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="absolute right-3 top-3 rounded-full font-semibold" style={{ fontSize: 11, padding: "5px 11px", color: "#0F172A", background: "rgba(255,255,255,0.85)" }}>
                        {t.readTime}
                      </span>
                    </div>
                    <div className="pt-4 pr-2">
                      <h3 className="font-bold" style={{ fontSize: 20, color: "#0F172A", letterSpacing: "-0.4px", lineHeight: 1.2 }}>{t.title}</h3>
                      <p className="mt-2" style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.55 }}>{t.excerpt}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

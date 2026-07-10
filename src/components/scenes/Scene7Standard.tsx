"use client";

import React from "react";
import { motion } from "framer-motion";
import { STEPS } from "@/lib/homepageData";
import { SOFT_EASE } from "@/lib/scrollMotion";

const CONTRASTS = [
  "A strategy deck isn't a shipped product.",
  "A managed tool isn't a secured one.",
  "A demo isn't a production system.",
];

export default function Scene7Standard() {
  return (
    <section className="relative overflow-hidden bg-[#E8ECFF]" style={{ paddingTop: 110, paddingBottom: 110 }}>
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: SOFT_EASE }}
          className="max-w-[680px] mb-10"
        >
          <p className="font-semibold uppercase mb-2" style={{ fontSize: 12, letterSpacing: "2.5px", background: "linear-gradient(90deg,#0891b2,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>The Standard</p>
          <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3.4vw,42px)", letterSpacing: "-1px" }}>
            Advice is cheap. Execution is the product.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {CONTRASTS.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: SOFT_EASE }}
              className="rounded-2xl bg-white p-6"
              style={{ boxShadow: "0 4px 20px rgba(15,23,42,0.07)" }}
            >
              <p className="font-semibold text-[#0F172A]" style={{ fontSize: 15, lineHeight: 1.5 }}>{c}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: SOFT_EASE }}
          className="mb-8"
        >
          <p className="font-bold text-[#0F172A]" style={{ fontSize: 18 }}>How we deliver on it</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: SOFT_EASE }}
              className="rounded-2xl bg-white p-5"
              style={{ boxShadow: "0 2px 16px rgba(15,23,42,0.06)" }}
            >
              <span className="font-bold text-[11px] uppercase tracking-[2px]" style={{ color: s.from }}>{s.num}</span>
              <p className="font-bold text-[#0F172A] mt-2" style={{ fontSize: 14 }}>{s.title}</p>
              <p className="mt-2 leading-relaxed" style={{ fontSize: 12, color: "#64748B" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

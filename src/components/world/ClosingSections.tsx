"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/homepageData";
import { SOFT_EASE } from "@/lib/scrollMotion";

const REASONS = [
  { title: "Expert Team", desc: "Seasoned engineers across software, AI, infrastructure, and security.", from: "#22d3ee", to: "#3b82f6" },
  { title: "Proven Results", desc: "200+ enterprise projects delivered, zero critical bugs at launch.", from: "#a78bfa", to: "#ec4899" },
  { title: "24/7 Support", desc: "SLA-backed monitoring and incident response after every launch.", from: "#34d399", to: "#22d3ee" },
];

export default function ClosingSections() {
  return (
    <>
      <section className="relative py-24 px-6 sm:px-10 lg:px-14" style={{ background: "#050B3A" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: SOFT_EASE }}
            className="font-semibold uppercase mb-3"
            style={{ fontSize: 12, letterSpacing: "2.5px", color: "#60a5fa" }}
          >
            Why Ivy League
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: SOFT_EASE }}
            className="text-white font-bold uppercase mb-12"
            style={{ fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1.5px", maxWidth: 700 }}
          >
            Built to be your one accountable partner
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: SOFT_EASE }}
                className="rounded-2xl p-7"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="rounded-full mb-5" style={{ width: 44, height: 44, background: `linear-gradient(135deg,${r.from},${r.to})` }} />
                <h3 className="text-white font-bold mb-2" style={{ fontSize: 18 }}>{r.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 sm:px-10 lg:px-14" style={{ background: "#03081f" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: SOFT_EASE }}
            className="font-semibold uppercase mb-3"
            style={{ fontSize: 12, letterSpacing: "2.5px", color: "#22d3ee" }}
          >
            Client Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: SOFT_EASE }}
            className="text-white font-bold uppercase mb-12"
            style={{ fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1.5px" }}
          >
            What our clients say
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: SOFT_EASE }}
                className="rounded-2xl p-6 flex flex-col"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", minHeight: 260 }}
              >
                <p className="leading-relaxed flex-1" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="h-px my-4" style={{ background: "rgba(255,255,255,0.1)" }} />
                <div className="flex items-center gap-3">
                  <Image src={t.photo} alt={t.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover" style={{ border: `2px solid ${t.from}55` }} />
                  <div>
                    <p className="font-semibold text-white" style={{ fontSize: 12.5 }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 px-6 sm:px-10 lg:px-14 text-center" style={{ background: "#050B3A" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: SOFT_EASE }}
          className="font-semibold uppercase mb-4"
          style={{ fontSize: 12, letterSpacing: "2.5px", color: "#60a5fa" }}
        >
          Ready to Elevate Your Business?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: SOFT_EASE }}
          className="text-white font-bold uppercase"
          style={{ fontSize: "clamp(28px,4.5vw,56px)", letterSpacing: "-1.5px" }}
        >
          Get in Touch
        </motion.h2>
        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: SOFT_EASE }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block mt-8 rounded-full font-semibold text-white"
          style={{ padding: "14px 32px", background: "linear-gradient(135deg,#2F6BFF,#2563FF)", fontSize: 15, boxShadow: "0 8px 28px rgba(37,99,255,0.4)" }}
        >
          Contact Us
        </motion.a>
      </section>
    </>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { SOFT_EASE } from "@/lib/scrollMotion";

const VENDORS = [
  { label: "Dev Shop", desc: "builds the product, doesn't touch the model" },
  { label: "AI Vendor", desc: "ships a demo, hands off before production" },
  { label: "MSP", desc: "manages servers, not the software running on them" },
  { label: "Security Firm", desc: "audits after launch, not during design" },
];

export default function Scene3Gap() {
  return (
    <section id="scene-3-gap" className="relative w-full overflow-hidden" style={{ background: "#050B3A", paddingTop: 110, paddingBottom: 110 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,rgba(4,12,80,0.98) 0%,rgba(7,27,143,0.90) 42%,rgba(20,50,180,0.45) 66%,rgba(80,40,200,0.06) 100%)" }} />
      <div className="relative max-w-[980px] mx-auto px-6 sm:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: SOFT_EASE }}
          className="text-white font-bold"
          style={{ fontSize: "clamp(26px,3.4vw,44px)", letterSpacing: "-1px" }}
        >
          Four vendors. Zero accountability.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: SOFT_EASE }}
          className="mt-5"
          style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 640, marginInline: "auto" }}
        >
          Fragmented ownership is why pilots stall and integrations break at the handoff.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {VENDORS.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: SOFT_EASE }}
              className="relative rounded-2xl text-left"
              style={{ padding: "22px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p className="font-bold text-white" style={{ fontSize: 15 }}>{v.label}</p>
              <p className="mt-2" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{v.desc}</p>
              {i < VENDORS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-white/20" style={{ fontSize: 18 }}>/</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

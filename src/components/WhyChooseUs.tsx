"use client";

import React from "react";
import { motion } from "framer-motion";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const FEATURES = [
  {
    title: "Expert Team",
    subtitle: "Seasoned IT professionals",
    from: "#22d3ee",
    to: "#3b82f6",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
      </svg>
    ),
  },
  {
    title: "Proven Results",
    subtitle: "200+ enterprise projects delivered",
    from: "#a78bfa",
    to: "#ec4899",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    subtitle: "SLA-backed 24/7 post-launch support",
    from: "#34d399",
    to: "#22d3ee",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#E8ECFF]" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <FadeUp className="max-w-[640px]">
          <p className="font-semibold uppercase mb-2" style={{ fontSize: 12, letterSpacing: "2.5px", background: "linear-gradient(90deg,#0891b2,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Your Trusted IT Partner
          </p>
          <h2
            className="text-[#0F172A] font-bold"
            style={{ fontSize: "clamp(28px,3.5vw,44px)", marginBottom: 16, letterSpacing: "-1px" }}
          >
            Why Choose Us?
          </h2>
          <p className="leading-relaxed" style={{ fontSize: 15, color: "#64748B", maxWidth: 520 }}>
            A dedicated partner that combines enterprise-grade delivery with the speed and attention of a specialist team.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12">
          {FEATURES.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.1}>
              <div
                className="h-full bg-white"
                style={{
                  borderRadius: 18,
                  boxShadow: "0 4px 20px rgba(15,23,42,0.07)",
                  padding: "26px 24px",
                }}
              >
                <div
                  style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: `linear-gradient(135deg,${f.from},${f.to})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 0 20px ${f.from}66`, marginBottom: 18,
                  }}
                >
                  {f.icon}
                </div>
                <p className="font-bold text-[#0F172A]" style={{ fontSize: 16, marginBottom: 4 }}>{f.title}</p>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{f.subtitle}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

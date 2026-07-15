"use client";

import React from "react";
import Image from "next/image";
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
    <>
      {/* ══════════════════ WHY CHOOSE US — moved to src/components/WhyChooseUs.tsx ══════════════════ */}
      {/*
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: 56,
          paddingBottom: 56,
          background: "linear-gradient(115deg,#050B2E 0%,#0A1440 45%,#0F2E4A 100%)",
        }}
      >
        {/* Decorative circuit-line pattern *\/}
        <svg
          className="absolute inset-0 pointer-events-none hidden md:block"
          width="100%" height="100%"
          style={{ opacity: 0.12 }}
        >
          <defs>
            <pattern id="circuit" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60H40M80 60H120M60 0V40M60 80V120" stroke="#22d3ee" strokeWidth="1" fill="none" />
              <circle cx="60" cy="60" r="3" fill="#22d3ee" />
              <circle cx="40" cy="60" r="2" fill="#a78bfa" />
              <circle cx="80" cy="60" r="2" fill="#a78bfa" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>

        {/* Right photo, blended into the dark background *\/}
        <div className="hidden md:block" style={{ position: "absolute", top: 0, right: 0, height: "100%", width: "48%" }}>
          <Image
            src="/lady2.webp"
            alt="IT support professional assisting a client"
            fill
            sizes="55vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #0A1440 0%, rgba(10,20,64,0.85) 18%, rgba(10,20,64,0.35) 38%, transparent 60%)",
            }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none md:hidden" style={{ background: "rgba(5,11,46,0.4)" }} />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
          <div
            className="relative md:max-w-[54%]"
            style={{
              borderRadius: 24,
              background: "rgba(5,11,46,0.55)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "36px 40px",
            }}
          >
            <FadeUp>
              <p className="font-semibold uppercase" style={{ fontSize: 12, letterSpacing: "2.5px", marginBottom: 8, color: "#22d3ee" }}>
                Your Trusted IT Partner
              </p>
              <h2
                className="text-white font-bold"
                style={{ fontSize: "clamp(24px,2.8vw,34px)", marginBottom: 28, letterSpacing: "-1px" }}
              >
                Why Choose Us?
              </h2>
            </FadeUp>

            {/* Desktop: stacked rows *\/}
            <div className="hidden md:flex flex-col" style={{ gap: 18 }}>
              {FEATURES.map((f, i) => (
                <FadeUp key={f.title} delay={i * 0.1}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,${f.from},${f.to})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 20px ${f.from}66` }}>
                      {f.icon}
                    </div>
                    <div>
                      <p className="font-bold text-white" style={{ fontSize: 15, marginBottom: 2 }}>{f.title}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>{f.subtitle}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Mobile layout *\/}
            <div className="flex flex-col gap-5 md:hidden">
              {FEATURES.map((f) => (
                <FadeUp key={f.title}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,${f.from},${f.to})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 20px ${f.from}66` }}>
                      {f.icon}
                    </div>
                    <div>
                      <p className="font-bold text-white" style={{ fontSize: 14, marginBottom: 2 }}>{f.title}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>{f.subtitle}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Photo at bottom on mobile *\/}
          <div className="md:hidden" style={{ borderRadius: 16, overflow: "hidden", marginTop: 20, position: "relative", height: 200 }}>
            <Image
              src="/lady2.webp"
              alt="IT support professional assisting a client"
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
        </div>
      </section>
      */}

      {/* ══════════════════ GET IN TOUCH ══════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: 48,
          paddingBottom: 48,
          background: "#050814",
        }}
      >
        {/* Overlay — matches the Hero / Our Process gradient treatment */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg,rgba(2,4,12,0.97) 0%,rgba(5,8,20,0.9) 42%,rgba(10,14,28,0.5) 66%,rgba(20,24,36,0.08) 100%)" }}
        />

        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[-60px] w-56 h-56 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,#22d3ee,transparent)" }} />
          <div className="absolute bottom-[10%] right-[-60px] w-72 h-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,#a78bfa,transparent)" }} />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <FadeUp className="flex flex-col items-center">
            <p
              className="font-semibold uppercase"
              style={{ fontSize: 12, letterSpacing: "2.5px", color: "#22d3ee", marginBottom: 10 }}
            >
              Ready to Elevate Your Business?
            </p>
            <h2
              className="text-white font-bold"
              style={{ fontSize: "clamp(26px,3vw,40px)", marginBottom: 28, letterSpacing: "-1px" }}
            >
              Get in Touch
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = "/contact"}
              style={{
                height: 48,
                paddingInline: 30,
                borderRadius: 999,
                fontSize: 14.5,
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(135deg,#22d3ee 0%,#a78bfa 100%)",
                boxShadow: "0 6px 24px rgba(34,211,238,0.35)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Contact Us
            </motion.button>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
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
      {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: 320,
          paddingTop: 40,
          paddingBottom: 40,
          background: "#ffffff",
        }}
      >
        {/* Lady image — hidden on mobile, visible on md+ */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lady2.png"
          alt=""
          className="hidden md:block"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "65%",
            objectFit: "cover",
            objectPosition: "left center",
          }}
        />

        {/* White → transparent overlay — desktop only */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, #ffffff 38%, rgba(255,255,255,0.85) 48%, rgba(255,255,255,0.3) 60%, transparent 75%)",
          }}
        />

        {/* Mobile: plain white bg overlay */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{ background: "#ffffff" }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
          <FadeUp>
            <h2
              className="text-[#0F172A] font-bold"
              style={{ fontSize: 22, marginBottom: 2 }}
            >
              Why Choose Us?
            </h2>
            <p style={{ fontSize: 12, color: "#475569", marginBottom: 28, marginTop: 3 }}>
              Your Trusted IT Partner
            </p>
          </FadeUp>

          {/* Desktop: horizontal row capped at 50% width */}
          {/* Mobile: vertical stack, full width */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "flex-start", width: "50%" }}
          >
            {FEATURES.map((f, i) => (
              <React.Fragment key={f.title}>
                <FadeUp delay={i * 0.12} className="flex-1">
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingInline: 8 }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 10 }}>
                      {f.icon}
                    </div>
                    <p style={{ fontWeight: 700, fontSize: 12, color: "#0F172A", marginBottom: 2 }}>{f.title}</p>
                    <p style={{ fontSize: 10.5, color: "#64748B", lineHeight: 1.4 }}>{f.subtitle}</p>
                  </div>
                </FadeUp>
                {i < FEATURES.length - 1 && (
                  <div style={{ width: 1, height: 56, background: "rgba(15,23,42,0.15)", flexShrink: 0, alignSelf: "flex-start" }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col gap-6 md:hidden">
            {FEATURES.map((f) => (
              <FadeUp key={f.title}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 2 }}>{f.title}</p>
                    <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.4 }}>{f.subtitle}</p>
                  </div>
                </div>
              </FadeUp>
            ))}

            {/* Lady image at bottom on mobile */}
            <div style={{ borderRadius: 16, overflow: "hidden", marginTop: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/lady2.png"
                alt="IT Support Professional"
                style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ GET IN TOUCH ══════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: 64,
          paddingBottom: 64,
          background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)",
        }}
      >
        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 60 }}>
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M0 30C360 60 1080 0 1440 30V0H0V30Z" fill="white" />
          </svg>
        </div>

        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[-60px] w-56 h-56 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,#2563FF,transparent)" }} />
          <div className="absolute bottom-[10%] right-[-60px] w-72 h-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,#6C3CFF,transparent)" }} />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-12">
          <FadeUp>
            <h2
              className="text-white font-bold"
              style={{ fontSize: "clamp(26px,3vw,40px)", marginBottom: 4 }}
            >
              Get in Touch
            </h2>
            <p
              className="font-semibold"
              style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 28 }}
            >
              Ready to Elevate Your Business?
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                height: 46,
                paddingInline: 32,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(135deg,#2F6BFF 0%,#2563FF 100%)",
                boxShadow: "0 6px 20px rgba(37,99,255,0.45)",
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
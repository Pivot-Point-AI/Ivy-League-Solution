"use client";

import { useEffect, useRef, useState } from "react";

const industries = [
  { icon: "🏦", name: "Fintech",         desc: "Credit risk, fraud detection, mobile banking" },
  { icon: "🏥", name: "Healthcare",      desc: "EHR, diagnostics, HIPAA-compliant AI" },
  { icon: "🛒", name: "E-Commerce",      desc: "Custom platforms, PIM, checkout optimization" },
  { icon: "🚚", name: "Logistics",       desc: "Fleet management, warehouse automation" },
  { icon: "🏗️", name: "Real Estate",    desc: "Society ERP, residential management" },
  { icon: "⚖️", name: "Law Enforcement", desc: "Case management, investigation platforms" },
  { icon: "🎓", name: "Academia",        desc: "LMS, personalized learning platforms" },
  { icon: "📡", name: "Telecom",         desc: "Network management, OSS/BSS systems" },
];

function IndCard({ item, index, visible }: { item: typeof industries[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--navy)" : "var(--white)",
        border: `1px solid ${hovered ? "var(--navy)" : "var(--gray-100)"}`,
        borderRadius: 10,
        padding: "24px 20px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease, transform 0.5s ease",
        transitionDelay: `${index * 55}ms`,
        boxShadow: hovered ? "0 8px 32px rgba(11,31,58,0.16)" : "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      {/* gold corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 0, height: 0,
        borderStyle: "solid",
        borderWidth: hovered ? "0 32px 32px 0" : "0 0 0 0",
        borderColor: `transparent rgba(200,169,110,0.25) transparent transparent`,
        transition: "border-width 0.3s ease",
      }} />

      <div style={{
        fontSize: 26, marginBottom: 14,
        display: "block",
        filter: hovered ? "grayscale(0)" : "grayscale(0.1)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.15)" : "scale(1)",
        transformOrigin: "left center",
      }}>
        {item.icon}
      </div>

      <div style={{
        fontSize: 13, fontWeight: 600,
        color: hovered ? "white" : "var(--navy)",
        marginBottom: 6,
        transition: "color 0.25s",
        letterSpacing: "-0.01em",
      }}>
        {item.name}
      </div>

      <div style={{
        fontSize: 11,
        color: hovered ? "rgba(200,169,110,0.8)" : "var(--gray-400)",
        lineHeight: 1.6,
        transition: "color 0.25s",
      }}>
        {item.desc}
      </div>

      {/* bottom line */}
      <div style={{
        position: "absolute", bottom: 0, left: 16, right: 16, height: 1,
        background: "linear-gradient(90deg, var(--accent), rgba(200,169,110,0.2))",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />
    </div>
  );
}

export default function IndustriesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
      {industries.map((item, i) => (
        <IndCard key={item.name} item={item} index={i} visible={visible} />
      ))}
    </div>
  );
}

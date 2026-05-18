"use client";

import { useEffect, useRef, useState } from "react";

const industries = [
  {
    name: "Fintech",
    desc: "Credit risk, fraud detection, mobile banking",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        {/* Coin / chart */}
        <circle cx="32" cy="32" r="22" fill="#1E4480" stroke="#C8A96E" strokeWidth="1.2"/>
        <circle cx="32" cy="32" r="16" fill="#163359" stroke="#C8A96E" strokeWidth="0.8"/>
        <text x="32" y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#C8A96E" fontFamily="serif">$</text>
        <polyline points="12,46 22,34 30,40 42,24 52,28" stroke="#C8A96E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "Healthcare",
    desc: "EHR, diagnostics, HIPAA-compliant AI",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="8" width="16" height="48" rx="3" fill="#1E4480" stroke="#C8A96E" strokeWidth="1"/>
        <rect x="8" y="24" width="48" height="16" rx="3" fill="#1E4480" stroke="#C8A96E" strokeWidth="1"/>
        <rect x="26" y="10" width="12" height="44" rx="2" fill="#163359"/>
        <rect x="10" y="26" width="44" height="12" rx="2" fill="#163359"/>
        <circle cx="32" cy="32" r="5" fill="#C8A96E" opacity="0.3"/>
      </svg>
    ),
  },
  {
    name: "E-Commerce",
    desc: "Custom platforms, PIM, checkout optimization",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        {/* Shopping cart */}
        <path d="M8 12h6l8 28h24l6-20H20" stroke="#C8A96E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="28" cy="48" r="4" fill="#C8A96E" opacity="0.7"/>
        <circle cx="44" cy="48" r="4" fill="#C8A96E" opacity="0.7"/>
        <rect x="22" y="20" width="28" height="16" rx="2" fill="#1E4480" stroke="#C8A96E" strokeWidth="0.8" opacity="0.6"/>
        <line x1="32" y1="20" x2="32" y2="36" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: "Logistics",
    desc: "Fleet management, warehouse automation",
    icon: (
      <svg viewBox="0 0 64 48" fill="none" width="72" height="54" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="14" width="36" height="22" rx="2" fill="#1E4480" stroke="#C8A96E" strokeWidth="1"/>
        <rect x="38" y="20" width="18" height="16" rx="2" fill="#163359" stroke="#C8A96E" strokeWidth="1"/>
        <rect x="40" y="22" width="10" height="7" rx="1" fill="#2A5FAA" opacity="0.7"/>
        <circle cx="12" cy="40" r="5" fill="#0B1F3A" stroke="#C8A96E" strokeWidth="1.5"/>
        <circle cx="12" cy="40" r="2" fill="#C8A96E"/>
        <circle cx="46" cy="40" r="5" fill="#0B1F3A" stroke="#C8A96E" strokeWidth="1.5"/>
        <circle cx="46" cy="40" r="2" fill="#C8A96E"/>
        <line x1="8" y1="23" x2="32" y2="23" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5"/>
        <line x1="8" y1="27" x2="32" y2="27" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: "Real Estate",
    desc: "Society ERP, residential management",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        {/* House isometric */}
        <polygon points="32,6 58,22 58,54 32,54 32,6" fill="#1E4480" stroke="#C8A96E" strokeWidth="0.8"/>
        <polygon points="6,22 32,6 32,54 6,54 6,22" fill="#163359" stroke="#C8A96E" strokeWidth="0.8"/>
        <polygon points="6,22 32,6 58,22 32,38 6,22" fill="#2A5FAA" stroke="#C8A96E" strokeWidth="0.8"/>
        <rect x="26" y="38" width="12" height="16" rx="1" fill="#C8A96E" opacity="0.25"/>
        {[28,34].map((y, i) => (
          <g key={i}>
            <rect x="12" y={y} width="8" height="5" rx="1" fill="#C8A96E" opacity="0.2"/>
            <rect x="44" y={y} width="8" height="5" rx="1" fill="#C8A96E" opacity="0.2"/>
          </g>
        ))}
      </svg>
    ),
  },
  {
    name: "Law Enforcement",
    desc: "Case management, investigation platforms",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        {/* Shield / scales */}
        <path d="M32 6 L54 16 L54 36 C54 48 32 58 32 58 C32 58 10 48 10 36 L10 16 Z" fill="#1E4480" stroke="#C8A96E" strokeWidth="1.2"/>
        <path d="M32 12 L48 20 L48 36 C48 44 32 52 32 52 C32 52 16 44 16 36 L16 20 Z" fill="#163359"/>
        {/* Scales symbol */}
        <line x1="32" y1="20" x2="32" y2="44" stroke="#C8A96E" strokeWidth="1" opacity="0.7"/>
        <line x1="20" y1="26" x2="44" y2="26" stroke="#C8A96E" strokeWidth="1" opacity="0.7"/>
        <circle cx="20" cy="34" r="4" fill="none" stroke="#C8A96E" strokeWidth="0.8" opacity="0.6"/>
        <circle cx="44" cy="34" r="4" fill="none" stroke="#C8A96E" strokeWidth="0.8" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "Academia",
    desc: "LMS, personalized learning platforms",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        {/* Graduation cap */}
        <polygon points="32,10 58,24 32,38 6,24" fill="#1E4480" stroke="#C8A96E" strokeWidth="1"/>
        <polygon points="32,16 52,26 32,36 12,26" fill="#163359"/>
        <line x1="52" y1="24" x2="52" y2="40" stroke="#C8A96E" strokeWidth="1.2" opacity="0.7"/>
        <circle cx="52" cy="41" r="3" fill="#C8A96E" opacity="0.6"/>
        {/* Book */}
        <rect x="18" y="36" width="28" height="18" rx="2" fill="#1E4480" stroke="#C8A96E" strokeWidth="0.8"/>
        <line x1="32" y1="36" x2="32" y2="54" stroke="#C8A96E" strokeWidth="0.8" opacity="0.6"/>
        <line x1="20" y1="42" x2="30" y2="42" stroke="#C8A96E" strokeWidth="0.5" opacity="0.4"/>
        <line x1="20" y1="46" x2="30" y2="46" stroke="#C8A96E" strokeWidth="0.5" opacity="0.4"/>
      </svg>
    ),
  },
  {
    name: "Telecom",
    desc: "Network management, OSS/BSS systems",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        {/* Signal tower */}
        <line x1="32" y1="10" x2="32" y2="54" stroke="#C8A96E" strokeWidth="1.5" opacity="0.8"/>
        <line x1="20" y1="54" x2="44" y2="54" stroke="#C8A96E" strokeWidth="1.5" opacity="0.7"/>
        <line x1="32" y1="10" x2="20" y2="54" stroke="#C8A96E" strokeWidth="0.8" opacity="0.4"/>
        <line x1="32" y1="10" x2="44" y2="54" stroke="#C8A96E" strokeWidth="0.8" opacity="0.4"/>
        {/* Signal arcs */}
        <path d="M 18 20 A 16 16 0 0 1 46 20" stroke="#C8A96E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
        <path d="M 22 28 A 10 10 0 0 1 42 28" stroke="#C8A96E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M 26 35 A 6 6 0 0 1 38 35" stroke="#C8A96E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
        <circle cx="32" cy="10" r="3" fill="#C8A96E" opacity="0.8"/>
      </svg>
    ),
  },
];

function IndCard({ item, index, visible }: { item: typeof industries[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(30,68,128,0.7)" : "rgba(22,51,89,0.55)",
        border: `1px solid ${hovered ? "rgba(200,169,110,0.6)" : "rgba(200,169,110,0.18)"}`,
        borderRadius: 12,
        padding: "20px 18px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        gap: 16,
        backdropFilter: "blur(4px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, opacity 0.55s ease, transform 0.55s ease",
        transitionDelay: `${index * 60}ms`,
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(200,169,110,0.15)"
          : "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Gold corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 0, height: 0,
        borderStyle: "solid",
        borderWidth: hovered ? "0 28px 28px 0" : "0 0 0 0",
        borderColor: "transparent rgba(200,169,110,0.3) transparent transparent",
        transition: "border-width 0.3s ease",
      }} />

      {/* Text left */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 600,
          color: hovered ? "#C8A96E" : "#E8D5A3",
          marginBottom: 6,
          letterSpacing: "-0.01em",
          transition: "color 0.25s",
        }}>
          {item.name}
        </div>
        <div style={{
          fontSize: 11,
          color: "rgba(200,210,230,0.65)",
          lineHeight: 1.6,
        }}>
          {item.desc}
        </div>
      </div>

      {/* Icon right */}
      <div style={{
        flexShrink: 0,
        transform: hovered ? "scale(1.08) translateY(-2px)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        opacity: hovered ? 1 : 0.85,
      }}>
        {item.icon}
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 16, right: 16, height: 1,
        background: "linear-gradient(90deg, rgba(200,169,110,0.8), rgba(200,169,110,0.1))",
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
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}
    >
      {industries.map((item, i) => (
        <IndCard key={item.name} item={item} index={i} visible={visible} />
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Software Development",
    desc: "End-to-end custom software from concept to deployment. Web, mobile, and enterprise applications built to scale.",
    tags: ["React", "Node.js", ".NET", "Python"],
    href: "/services#software",
    size: "normal",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "AI & Machine Learning",
    desc: "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation at enterprise scale.",
    tags: ["LLMs", "MLOps", "Fintech AI", "Health AI"],
    href: "/ai",
    size: "featured",
    featured: true,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Digital Infrastructure",
    desc: "Network services, datacenter solutions, cloud migration and managed IT infrastructure at enterprise scale.",
    tags: ["AWS", "Azure", "Cisco", "Oracle"],
    href: "/services#infrastructure",
    size: "normal",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Cybersecurity & SOC",
    desc: "24/7 threat monitoring, incident response, compliance automation, and security operations center.",
    tags: ["SOC", "Fortinet", "Zero Trust"],
    href: "/services#security",
    size: "normal",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: "ERP Solutions",
    desc: "Customized ERP for finance, logistics, housing, and enterprise operations — built for your exact workflow.",
    tags: ["SAP", "MS NAV", "Custom ERP"],
    href: "/services#erp",
    size: "normal",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
      </svg>
    ),
    title: "UI/UX Design",
    desc: "Human-centered design systems and product experiences that convert, retain, and delight users.",
    tags: ["Figma", "Research", "Design Systems"],
    href: "/services#uiux",
    size: "normal",
  },
];

function ServiceCard({ s, index, visible }: { s: typeof services[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isFeatured = s.size === "featured";

  return (
    <Link
      href={s.href}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        height: "100%",
        padding: isFeatured ? "40px 36px" : "32px 28px",
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        cursor: "pointer",
        background: isFeatured
          ? hovered
            ? "linear-gradient(145deg, #0D1F3C 0%, #132A4E 100%)"
            : "linear-gradient(145deg, #09182E 0%, #0F2240 100%)"
          : hovered
            ? "#F8F9FB"
            : "#FFFFFF",
        border: isFeatured
          ? `1px solid ${hovered ? "rgba(200,169,110,0.4)" : "rgba(200,169,110,0.15)"}`
          : `1px solid ${hovered ? "var(--gray-200)" : "var(--gray-100)"}`,
        boxShadow: isFeatured
          ? hovered
            ? "0 20px 48px rgba(0,0,0,0.22), 0 0 0 1px rgba(200,169,110,0.12)"
            : "0 8px 32px rgba(0,0,0,0.12)"
          : hovered
            ? "0 8px 32px rgba(0,0,0,0.08)"
            : "0 1px 4px rgba(0,0,0,0.03)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${index * 60}ms`,
      }}>

        {/* glow blob for featured */}
        {isFeatured && (
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 240, height: 240, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            transition: "opacity 0.3s",
            opacity: hovered ? 1 : 0.6,
          }} />
        )}

        {/* featured badge */}
        {isFeatured && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            marginBottom: 24,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
            color: "var(--accent)",
            background: "rgba(200,169,110,0.1)",
            border: "1px solid rgba(200,169,110,0.25)",
            padding: "4px 12px", borderRadius: 20,
            textTransform: "uppercase",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            Featured
          </div>
        )}

        {/* icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 14, marginBottom: 22,
          background: isFeatured
            ? hovered ? "rgba(200,169,110,0.18)" : "rgba(200,169,110,0.1)"
            : hovered ? "var(--navy)" : "var(--gray-50)",
          border: isFeatured
            ? "1px solid rgba(200,169,110,0.2)"
            : `1px solid ${hovered ? "var(--navy)" : "var(--gray-100)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isFeatured ? "var(--accent)" : hovered ? "var(--accent)" : "var(--navy-light)",
          transition: "all 0.3s ease",
          flexShrink: 0,
        }}>
          {s.icon}
        </div>

        <div style={{
          fontSize: isFeatured ? 17 : 15,
          fontWeight: 600,
          color: isFeatured ? "#FFFFFF" : "var(--navy)",
          marginBottom: 10,
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}>
          {s.title}
        </div>

        <div style={{
          fontSize: 13,
          color: isFeatured ? "rgba(255,255,255,0.6)" : "var(--gray-600)",
          lineHeight: 1.7,
          marginBottom: 20,
        }}>
          {s.desc}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {s.tags.map((t) => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 500, padding: "3px 10px", borderRadius: 6,
              background: isFeatured
                ? "rgba(200,169,110,0.1)"
                : hovered ? "rgba(200,169,110,0.08)" : "var(--gray-50)",
              color: isFeatured
                ? "var(--accent)"
                : hovered ? "var(--accent-dark)" : "var(--gray-400)",
              border: isFeatured
                ? "1px solid rgba(200,169,110,0.2)"
                : `1px solid ${hovered ? "rgba(200,169,110,0.2)" : "var(--gray-100)"}`,
              transition: "all 0.25s",
              letterSpacing: "0.03em",
            }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 12, fontWeight: 600,
          color: isFeatured ? "var(--accent)" : hovered ? "var(--navy)" : "var(--gray-400)",
          transition: "color 0.25s",
        }}>
          Learn more
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.25s" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesGrid() {
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

  // Layout: row 1 → [Software (1col), AI featured (2col)]; row 2 → [Infra, Cyber, ERP, UI/UX] (2+2 split)
  const [featured] = services.filter((s) => s.size === "featured");
  const normals = services.filter((s) => s.size !== "featured");

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Row 1: Software + AI featured */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        <ServiceCard s={normals[0]} index={0} visible={visible} />
        {featured && <ServiceCard s={featured} index={1} visible={visible} />}
      </div>

      {/* Row 2: remaining 4 in equal columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {normals.slice(1).map((s, i) => (
          <ServiceCard key={s.title} s={s} index={i + 2} visible={visible} />
        ))}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Software Development",
    desc: "End-to-end custom software from concept to deployment. Web, mobile, and enterprise applications built to scale.",
    tags: ["React", "Node.js", ".NET", "Python"],
    href: "/services#software",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Digital Infrastructure",
    desc: "Network services, datacenter solutions, cloud migration, and managed IT infrastructure at enterprise scale.",
    tags: ["AWS", "Azure", "Cisco", "Oracle"],
    href: "/services#infrastructure",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "AI & Machine Learning",
    desc: "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation.",
    tags: ["LLMs", "MLOps", "Fintech AI", "Health AI"],
    href: "/ai",
    featured: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: "ERP Solutions",
    desc: "Customized ERP for finance, logistics, housing, and enterprise operations — built for your exact workflow.",
    tags: ["SAP", "MS NAV", "Custom ERP"],
    href: "/services#erp",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
      </svg>
    ),
    title: "UI/UX Design",
    desc: "Human-centered design systems and product experiences that convert, retain, and delight users.",
    tags: ["Figma", "Research", "Design Systems"],
    href: "/services#uiux",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Cybersecurity & SOC",
    desc: "24/7 threat monitoring, incident response, compliance automation, and security operations center.",
    tags: ["SOC", "Fortinet", "Zero Trust"],
    href: "/services#security",
  },
];

function ServiceCard({ s, index, visible }: { s: typeof services[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={s.href} style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "32px 28px",
          height: "100%",
          position: "relative",
          cursor: "pointer",
          background: hovered ? "#FAFBFC" : "var(--white)",
          borderRight: "1px solid var(--gray-100)",
          borderBottom: "1px solid var(--gray-100)",
          transition: "background 0.2s ease, opacity 0.5s ease, transform 0.5s ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transitionDelay: `${index * 70}ms`,
        }}
      >
        {/* left accent bar */}
        <div style={{
          position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3,
          background: "var(--accent)",
          borderRadius: "0 2px 2px 0",
          transform: hovered ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "center",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }} />

        {/* featured badge */}
        {s.featured && (
          <div style={{
            position: "absolute", top: 16, right: 16,
            fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
            color: "var(--accent)", background: "rgba(200,169,110,0.1)",
            border: "1px solid rgba(200,169,110,0.25)",
            padding: "2px 8px", borderRadius: 3, textTransform: "uppercase",
          }}>
            Featured
          </div>
        )}

        {/* icon */}
        <div style={{
          width: 46, height: 46, borderRadius: 10, marginBottom: 20,
          background: hovered ? "var(--navy)" : "var(--gray-50)",
          border: `1px solid ${hovered ? "var(--navy)" : "var(--gray-100)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hovered ? "var(--accent)" : "var(--navy-light)",
          transition: "all 0.3s ease",
          flexShrink: 0,
        }}>
          {s.icon}
        </div>

        <div style={{
          fontSize: 15, fontWeight: 600,
          color: hovered ? "var(--navy)" : "var(--navy)",
          marginBottom: 10, lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}>
          {s.title}
        </div>

        <div style={{
          fontSize: 12.5, color: "var(--gray-600)",
          lineHeight: 1.7, marginBottom: 18,
        }}>
          {s.desc}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
          {s.tags.map((t) => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 500, padding: "3px 9px", borderRadius: 4,
              background: hovered ? "rgba(200,169,110,0.08)" : "var(--gray-50)",
              color: hovered ? "var(--accent-dark)" : "var(--gray-400)",
              border: `1px solid ${hovered ? "rgba(200,169,110,0.2)" : "var(--gray-100)"}`,
              transition: "all 0.25s",
              letterSpacing: "0.02em",
            }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 12, fontWeight: 500,
          color: hovered ? "var(--navy)" : "var(--gray-400)",
          transition: "color 0.25s",
        }}>
          Learn more
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.25s" }}
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
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      border: "1px solid var(--gray-100)", borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)",
    }}>
      {services.map((s, i) => (
        <ServiceCard key={s.title} s={s} index={i} visible={visible} />
      ))}
    </div>
  );
}

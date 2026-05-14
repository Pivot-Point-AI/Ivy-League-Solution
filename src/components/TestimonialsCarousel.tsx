"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    quote: "Ivy League Solutions transformed our legacy banking infrastructure with remarkable precision. Their AI-powered risk engine cut processing time by 90%.",
    author: "Michael R.",
    role: "CTO, MidWest Capital Partners",
    initials: "MR",
    badge: "Fintech",
    metric: "90% faster",
    metricLabel: "processing time",
  },
  {
    quote: "The ERP solution they built for our housing society handles 10,000+ units seamlessly. Exceptional architecture and post-launch support.",
    author: "Amanda L.",
    role: "Director of Operations",
    initials: "AL",
    badge: "ERP",
    metric: "10,000+",
    metricLabel: "units managed",
  },
  {
    quote: "Their healthcare AI platform reduced our clinical documentation time by 60%. HIPAA compliance was built-in from day one.",
    author: "Dr. Patel",
    role: "Chief Medical Officer",
    initials: "DP",
    badge: "Healthcare",
    metric: "60% less",
    metricLabel: "documentation time",
  },
];

const DURATION = 5000;

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(performance.now());

  const goTo = useCallback((i: number) => {
    if (animating || i === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setProgress(0);
      startRef.current = performance.now();
      setAnimating(false);
    }, 320);
  }, [active, animating]);

  const advance = useCallback(() => {
    goTo((active + 1) % testimonials.length);
  }, [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, DURATION);
    return () => clearInterval(id);
  }, [paused, advance]);

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); return; }
    startRef.current = performance.now();
    const tick = (now: number) => {
      setProgress(Math.min((now - startRef.current) / DURATION, 1));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, paused]);

  const t = testimonials[active];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* quote card */}
      <div style={{
        background: "var(--white)",
        border: "1px solid var(--gray-100)",
        borderRadius: 12,
        padding: "36px 36px 28px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05), 0 8px 40px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 0.32s ease, transform 0.32s ease",
        minHeight: 220,
      }}>
        {/* large decorative quote */}
        <div style={{
          position: "absolute", top: 12, left: 28,
          fontFamily: "var(--font-display)", fontSize: 120,
          color: "rgba(200,169,110,0.08)", lineHeight: 1,
          userSelect: "none", pointerEvents: "none",
          fontWeight: 700,
        }}>
          "
        </div>

        {/* metric callout */}
        <div style={{
          position: "absolute", top: 24, right: 24,
          textAlign: "right",
        }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
            color: "var(--navy)", lineHeight: 1,
          }}>
            {t.metric}
          </div>
          <div style={{ fontSize: 10, color: "var(--gray-400)", marginTop: 2, letterSpacing: "0.04em" }}>
            {t.metricLabel}
          </div>
        </div>

        {/* stars */}
        <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--accent)">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>

        <p style={{
          fontSize: 14, lineHeight: 1.8,
          color: "var(--gray-600)", fontStyle: "italic",
          fontWeight: 300, maxWidth: 440,
          marginBottom: 24,
        }}>
          &ldquo;{t.quote}&rdquo;
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid var(--gray-100)" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "var(--navy)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "var(--accent)",
            flexShrink: 0,
          }}>
            {t.initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{t.author}</div>
            <div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 1 }}>{t.role}</div>
          </div>
          <span style={{
            fontSize: 10, padding: "3px 10px", borderRadius: 4,
            background: "var(--navy)", color: "var(--accent)",
            fontWeight: 600, letterSpacing: "0.06em",
          }}>
            {t.badge}
          </span>
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
        {/* dot indicators with progress */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                height: 3, borderRadius: 2,
                width: i === active ? 32 : 12,
                background: i === active ? "var(--navy)" : "var(--gray-200)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                position: "relative", overflow: "hidden",
              }}
            >
              {i === active && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "var(--accent)",
                  transformOrigin: "left",
                  transform: `scaleX(${progress})`,
                  transition: "transform 0.05s linear",
                  borderRadius: 2,
                }} />
              )}
            </button>
          ))}
        </div>

        {/* arrows */}
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { d: -1, path: "M19 12H5M12 5l-7 7 7 7" },
            { d: 1,  path: "M5 12h14M12 5l7 7-7 7" },
          ].map(({ d, path }) => (
            <button
              key={d}
              onClick={() => goTo((active + testimonials.length + d) % testimonials.length)}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "var(--white)", border: "1px solid var(--gray-100)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--navy)", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.cssText += ";background:var(--navy);border-color:var(--navy);color:white"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.cssText += ";background:var(--white);border-color:var(--gray-100);color:var(--navy)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={path}/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    quote: "Ivy League Solutions transformed our legacy banking infrastructure. Their AI-powered risk engine cut processing time by 90%.",
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

const stats = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    value: "200+", label: "Projects Delivered",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    value: "98%", label: "Client Satisfaction",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    value: "15+", label: "Industries Served",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    value: "Dedicated", label: "Project Manager",
  },
];

const partners = ["Oracle", "Microsoft", "AWS", "Huawei", "Fortinet", "Cisco"];

const DURATION = 5000;

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
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
    }, 280);
  }, [active, animating]);

  const advance = useCallback(() => goTo((active + 1) % testimonials.length), [active, goTo]);

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const t = testimonials[active];

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #07152A 0%, #0B1F3A 60%, #0E2645 100%)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(200,169,110,0.08) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />
      {/* top line */}
      <div style={{
        position: "absolute", top: 0, left: "6%", right: "6%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2, padding: "72px 0 0" }}>

        {/* ── FULL-WIDTH HEADER ── */}
        <div style={{
          textAlign: "center", marginBottom: 56,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <div className="eyebrow" style={{ color: "var(--accent)", justifyContent: "center", marginBottom: 16 }}>
            Let&apos;s Work Together
          </div>
          <h2 className="font-display" style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "white",
            lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0,
          }}>
            Redefining{" "}
            <span style={{ color: "var(--accent)" }}>Enterprise-Grade Solutions,</span>
            {" "}Built on Trust
          </h2>
        </div>

        {/* ── THREE COLUMNS ── */}
        <div className="cta-three-col" style={{
          display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", gap: 24, alignItems: "start",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.65s cubic-bezier(0.4,0,0.2,1) 0.15s",
        }}>

          {/* COL 1: description + 2×2 stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <p style={{
              fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8,
              fontWeight: 300, margin: 0,
            }}>
              Partner with a globally recognized team across fintech, healthcare, ERP, and beyond to achieve real outcomes from proven partnerships.
            </p>
            <div className="cta-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(200,169,110,0.12)",
                    borderRadius: 12, padding: "16px 14px",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `all 0.5s ease ${0.25 + i * 0.08}s`,
                  }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: 8, marginBottom: 10,
                    background: "rgba(200,169,110,0.08)",
                    border: "1px solid rgba(200,169,110,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)",
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1, fontFamily: "var(--font-display)" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: "0.02em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COL 2: testimonial card */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* white card */}
            <div style={{
              background: "white", borderRadius: 16,
              padding: "28px 26px 22px",
              position: "relative", overflow: "hidden",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.28s ease, transform 0.28s ease",
              boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
            }}>
              {/* decorative quote */}
              <div style={{
                position: "absolute", top: 2, left: 18,
                fontSize: 96, color: "rgba(200,169,110,0.07)",
                fontFamily: "var(--font-display)", lineHeight: 1,
                userSelect: "none", pointerEvents: "none", fontWeight: 700,
              }}>"</div>

              {/* metric */}
              <div style={{ position: "absolute", top: 20, right: 20, textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--navy)", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                  {t.metric}
                </div>
                <div style={{ fontSize: 9, color: "var(--gray-400)", marginTop: 2, letterSpacing: "0.04em" }}>
                  {t.metricLabel}
                </div>
              </div>

              {/* stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="var(--accent)">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--gray-600)", fontStyle: "italic", fontWeight: 300, marginBottom: 20, paddingRight: 56 }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ borderTop: "1px solid var(--gray-100)", paddingTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                  background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: "var(--accent)",
                }}>
                  {t.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)" }}>{t.author}</div>
                  <div style={{ fontSize: 10, color: "var(--gray-400)", marginTop: 1 }}>{t.role}</div>
                </div>
                <span style={{
                  fontSize: 9, padding: "3px 9px", borderRadius: 4,
                  background: "var(--navy)", color: "var(--accent)",
                  fontWeight: 700, letterSpacing: "0.06em",
                }}>
                  {t.badge}
                </span>
              </div>
            </div>

            {/* controls row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingLeft: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* avatar stack */}
                <div style={{ display: "flex" }}>
                  {["MR","AL","DP"].map((init, i) => (
                    <div key={init} style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: "rgba(200,169,110,0.15)",
                      border: "2px solid rgba(11,31,58,0.9)",
                      marginLeft: i > 0 ? -8 : 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 7, fontWeight: 700, color: "var(--accent)",
                    }}>{init}</div>
                  ))}
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                    border: "2px solid rgba(11,31,58,0.9)",
                    marginLeft: -8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 7, fontWeight: 700, color: "rgba(255,255,255,0.45)",
                  }}>+3</div>
                </div>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>+3 other testimonials</span>
              </div>

              {/* progress dots + arrows */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      style={{
                        height: 3, borderRadius: 2, padding: 0, border: "none", cursor: "pointer",
                        width: i === active ? 22 : 8,
                        background: i === active ? "rgba(200,169,110,0.5)" : "rgba(255,255,255,0.15)",
                        position: "relative", overflow: "hidden",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {i === active && (
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "var(--accent)",
                          transformOrigin: "left",
                          transform: `scaleX(${progress})`,
                          borderRadius: 2,
                        }} />
                      )}
                    </button>
                  ))}
                </div>
                {[
                  { d: -1, path: "M19 12H5M12 5l-7 7 7 7" },
                  { d: 1,  path: "M5 12h14M12 5l7 7-7 7" },
                ].map(({ d, path }) => (
                  <button
                    key={d}
                    onClick={() => goTo((active + testimonials.length + d) % testimonials.length)}
                    style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.5)", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,169,110,0.18)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={path}/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* COL 3: Project Initiation Hub */}
          <div className="cta-action-panel" style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(200,169,110,0.18)",
            borderRadius: 16, padding: "28px 22px",
            display: "flex", flexDirection: "column", gap: 0,
          }}>
            {/* hub label */}
            <div style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "var(--accent)", marginBottom: 20,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{ width: 16, height: 1, background: "var(--accent)" }} />
              Project Initiation Hub
            </div>

            {/* calendar icon */}
            <div style={{
              width: 52, height: 52, borderRadius: 12, marginBottom: 18,
              background: "rgba(200,169,110,0.1)",
              border: "1px solid rgba(200,169,110,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--accent)",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
              </svg>
            </div>

            <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 6, lineHeight: 1.3 }}>
              Start your project today
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginBottom: 24, lineHeight: 1.6 }}>
              Free consultation. No commitment.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <HubBtn href="/contact" primary>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                Schedule a Consultation →
              </HubBtn>
              <HubBtn href="/solutions" primary={false}>
                View Our Portfolio
              </HubBtn>
            </div>

            {/* trust bullets */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 9 }}>
              {["200+ projects delivered", "98% client satisfaction", "Dedicated project manager"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                  <div style={{
                    width: 15, height: 15, borderRadius: "50%", flexShrink: 0,
                    background: "rgba(200,169,110,0.1)",
                    border: "1px solid rgba(200,169,110,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="7" height="7" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CLIENT PARTNERS STRIP ── */}
        {/* <div style={{
          marginTop: 56, paddingTop: 28, paddingBottom: 28,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.4s",
        }}>
          <div className="cta-partners-row" style={{
            display: "flex", alignItems: "center", gap: 40,
            justifyContent: "space-between", flexWrap: "wrap",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", flexShrink: 0 }}>
              Our client partners
            </div>
            {partners.map((p) => (
              <span key={p} style={{
                fontSize: 13, fontWeight: 500,
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.04em",
                transition: "color 0.2s",
                cursor: "default",
              }}
                onMouseOver={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
              >
                {p}
              </span>
            ))}
          </div>
        </div> */}

      </div>
    </section>
  );
}

function HubBtn({ href, primary, children }: { href: string; primary: boolean; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "11px 14px", borderRadius: 8, fontSize: 11, fontWeight: 700,
        textDecoration: "none", textAlign: "center",
        letterSpacing: "0.04em", textTransform: "uppercase",
        transition: "all 0.2s",
        ...(primary ? {
          background: hovered ? "var(--accent-light)" : "var(--accent)",
          color: "var(--navy)",
          boxShadow: hovered ? "0 6px 20px rgba(200,169,110,0.3)" : "none",
          transform: hovered ? "translateY(-1px)" : "none",
        } : {
          background: "transparent",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)"}`,
          color: hovered ? "white" : "rgba(255,255,255,0.5)",
        }),
      }}
    >
      {children}
    </Link>
  );
}

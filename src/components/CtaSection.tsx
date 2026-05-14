"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 0",
        background: "var(--navy)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle radial backdrop */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,169,110,0.07), transparent)",
        pointerEvents: "none",
      }} />

      {/* top border line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)",
      }} />

      <div
        className="container"
        style={{
          position: "relative", zIndex: 2,
          display: "flex", gap: 80, alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* left — copy */}
        <div style={{
          maxWidth: 520,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.65s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 20 }}>
            Let&apos;s Work Together
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 44, fontWeight: 600, color: "white",
              lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.02em",
            }}
          >
            Ready to Build Something <span style={{ color: "var(--accent)" }}>Enterprise-Grade?</span>
          </h2>
          <p style={{
            fontSize: 14, color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8, fontWeight: 300, maxWidth: 420,
          }}>
            Partner with a team that has delivered 200+ enterprise-grade solutions across 20+ countries. Let&apos;s discuss your goals.
          </p>
        </div>

        {/* right — action panel */}
        <div style={{
          flexShrink: 0, width: 300,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.65s cubic-bezier(0.4,0,0.2,1) 0.15s",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "32px 28px",
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "white", marginBottom: 6 }}>
              Start your project today
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 24, lineHeight: 1.6 }}>
              Free consultation. No commitment.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <CtaButton href="/contact" primary>
                Schedule a Consultation →
              </CtaButton>
              <CtaButton href="/solutions" primary={false}>
                View Our Portfolio
              </CtaButton>
            </div>

            <div style={{
              marginTop: 24, paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              {[
                "200+ projects delivered",
                "98% client satisfaction",
                "Dedicated project manager",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: "rgba(200,169,110,0.15)", border: "1px solid rgba(200,169,110,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="7" height="7" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaButton({ href, primary, children }: { href: string; primary: boolean; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12px 20px", borderRadius: 7, fontSize: 13, fontWeight: 500,
        textDecoration: "none", textAlign: "center", transition: "all 0.22s",
        ...(primary ? {
          background: hovered ? "var(--accent-light)" : "var(--accent)",
          color: "var(--navy)",
          transform: hovered ? "translateY(-1px)" : "none",
          boxShadow: hovered ? "0 6px 20px rgba(200,169,110,0.3)" : "none",
        } : {
          background: "transparent",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)"}`,
          color: hovered ? "white" : "rgba(255,255,255,0.6)",
        }),
      }}
    >
      {children}
    </Link>
  );
}

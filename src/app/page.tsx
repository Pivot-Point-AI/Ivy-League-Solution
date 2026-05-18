import type { Metadata } from "next";
import Link from "next/link";
import StatCards from "@/components/StatCards";
import ServicesGrid from "@/components/ServicesGrid";
import IndustriesGrid from "@/components/IndustriesGrid";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Ivy League Solutions — Custom IT & AI Solutions for Enterprise",
};


export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ paddingTop: 150, paddingBottom: 72 }}>
        <div className="container">
          <div className="hero-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            {/* Left */}
            <div className="hero-inner" style={{ maxWidth: "100%" }}>
              <div className="eyebrow">Trusted Globally</div>
              <h1 className="hero-title font-display">
                Custom Technology<br />Built for <strong style={{ color: "var(--accent)" }}>Enterprise</strong>
              </h1>
              <p className="hero-desc">
                Ivy League Solutions delivers premium custom software, AI systems, and digital
                infrastructure — engineered for enterprises across fintech, healthcare, logistics, and beyond.
              </p>
              <div className="hero-btns">
                <Link href="/contact" className="btn-primary">Start a Project →</Link>
                <Link href="/solutions" className="btn-ghost">View Portfolio</Link>
              </div>
              <div className="hero-partners">
                <div className="hp-label">Technology Partners</div>
                <div className="hp-row">
                  {["Oracle","Microsoft","AWS","Huawei","Fortinet","Cisco","Aruba"].map((p) => (
                    <span key={p} className="hp-item">{p}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — stat cards */}
            <StatCards />
          </div>
        </div>
      </section>

      {/* SERVICES — white bg */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="sh center">
            <div className="eyebrow">What We Build</div>
            <h2 className="font-display">
              Enterprise-Grade <span style={{ color: "var(--accent-dark)" }}>Solutions</span>
            </h2>
            <p style={{ color: "var(--gray-600)" }}>End-to-end technology services tailored for every industry and every scale.</p>
            <div className="rule center" />
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* INDUSTRIES — dark navy bg */}
      <section style={{
        position: "relative",
        padding: "88px 0 96px",
        background: "linear-gradient(160deg, #07152A 0%, #0B1F3A 40%, #0E2645 100%)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `radial-gradient(circle, rgba(200,169,110,0.18) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cellipse cx='500' cy='250' rx='490' ry='240' fill='white'/%3E%3C/svg%3E\")",
          WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cellipse cx='500' cy='250' rx='490' ry='240' fill='white'/%3E%3C/svg%3E\")",
          maskSize: "100% 100%", WebkitMaskSize: "100% 100%", opacity: 0.6,
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(30,68,128,0.35) 0%, transparent 70%)",
          zIndex: 0,
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="sh center" style={{ marginBottom: 48 }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>From the Experts</div>
            <h2 className="font-display" style={{ color: "#ffffff", marginTop: 12 }}>
              Deep Expertise Across Every{" "}
              <span style={{ color: "var(--accent)" }}>Enterprise Vertical</span>
            </h2>
            <div className="rule center" style={{ marginTop: 20 }} />
          </div>
          <IndustriesGrid />
        </div>
      </section>

      {/* WHY US — white section before dark CTA */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="sh center">
            <div className="eyebrow">Why Choose Us</div>
            <h2 className="font-display">
              The Ivy League <span style={{ color: "var(--accent-dark)" }}>Difference</span>
            </h2>
            <p style={{ color: "var(--gray-600)", maxWidth: 520, margin: "0 auto" }}>
              We don&apos;t just build software — we embed with your team, understand your operations, and engineer solutions that actually scale.
            </p>
            <div className="rule center" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 48 }}>
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                title: "Enterprise-Grade Security",
                desc: "Every solution ships with SOC 2, HIPAA, and Zero Trust architecture built in — not bolted on.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                  </svg>
                ),
                title: "AI-First Approach",
                desc: "We integrate intelligence at the core — from predictive analytics to LLM-powered workflows across every vertical.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                title: "Dedicated Teams",
                desc: "You get a named project manager, senior engineers, and a QA lead — not a rotating pool of contractors.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                ),
                title: "Post-Launch Support",
                desc: "24/7 monitoring, SLA-backed incident response, and proactive performance tuning long after go-live.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "28px 24px",
                  borderRadius: 14,
                  border: "1px solid var(--gray-100)",
                  background: "#fff",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                }}
                className="why-card"
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 11, marginBottom: 18,
                  background: "var(--gray-50)", border: "1px solid var(--gray-100)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--navy)",
                }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 10, lineHeight: 1.3 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--gray-600)", lineHeight: 1.7 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + TESTIMONIALS (combined) */}
      <CtaSection />
    </>
  );
}

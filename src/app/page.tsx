import type { Metadata } from "next";
import Link from "next/link";
import StatCards from "@/components/StatCards";
import ServicesGrid from "@/components/ServicesGrid";
import IndustriesGrid from "@/components/IndustriesGrid";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
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

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="sh center">
            <div className="eyebrow">What We Build</div>
            <h2 className="font-display">Enterprise-Grade <span style={{ color: "var(--accent-dark)" }}>Solutions</span></h2>
            <p>End-to-end technology services tailored for every industry and every scale.</p>
            <div className="rule center" />
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section section-alt">
        <div className="container">
          <div className="sh center">
            <div className="eyebrow">Industries We Serve</div>
            <h2 className="font-display">Deep Expertise Across Every <span style={{ color: "var(--accent-dark)" }}>Enterprise Vertical</span></h2>
            <div className="rule center" />
          </div>
          <IndustriesGrid />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div className="sh">
              <div className="eyebrow">Client Voices</div>
              <h2 className="font-display">Built on <span style={{ color: "var(--accent-dark)" }}>Enterprise Trust &amp; Results</span></h2>
              <p>Real outcomes from real partnerships — across fintech, healthcare, ERP, and beyond.</p>
              <div className="rule" />
              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { n: "200+", l: "Projects delivered globally" },
                  { n: "98%",  l: "Client satisfaction rate" },
                  { n: "15+",  l: "Industries served" },
                ].map(({ n, l }) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--navy)", minWidth: 60 }}>{n}</div>
                    <div style={{ fontSize: 12, color: "var(--gray-400)", lineHeight: 1.5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  );
}

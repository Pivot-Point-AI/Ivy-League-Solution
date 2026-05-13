import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ivy League Solutions — Custom IT & AI Solutions for Enterprise",
};

const services = [
  { icon: "⬡", title: "Software Development",   desc: "End-to-end custom software from concept to deployment. Web, mobile, and enterprise applications.", tags: ["React","Node.js",".NET","Python"], href: "/services#software" },
  { icon: "◈", title: "Digital Infrastructure",  desc: "Network services, datacenter solutions, cloud migration, and managed IT infrastructure.", tags: ["AWS","Azure","Cisco","Oracle"], href: "/services#infrastructure" },
  { icon: "✦", title: "AI & Machine Learning",   desc: "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and automation.", tags: ["LLMs","MLOps","Fintech AI","Health AI"], href: "/ai", featured: true },
  { icon: "◇", title: "ERP Solutions",           desc: "Customized ERP for finance, logistics, housing, and enterprise operations.", tags: ["SAP","MS NAV","Custom ERP"], href: "/services#erp" },
  { icon: "△", title: "UI/UX Design",            desc: "Human-centered design systems and product experiences that convert and retain users.", tags: ["Figma","Research","Systems"], href: "/services#uiux" },
  { icon: "○", title: "Cybersecurity & SOC",     desc: "24/7 threat monitoring, incident response, compliance automation, and security operations.", tags: ["SOC","Fortinet","Zero Trust"], href: "/services#security" },
];

const industries = [
  { icon: "🏦", name: "Fintech",        desc: "Credit risk, fraud detection, mobile banking" },
  { icon: "🏥", name: "Healthcare",     desc: "EHR, diagnostics, HIPAA-compliant AI" },
  { icon: "🛒", name: "E-Commerce",     desc: "Custom platforms, PIM, checkout optimization" },
  { icon: "🚚", name: "Logistics",      desc: "Fleet management, warehouse automation" },
  { icon: "🏗️", name: "Real Estate",   desc: "Society ERP, residential management" },
  { icon: "⚖️", name: "Law Enforcement",desc: "Case management, investigation platforms" },
  { icon: "🎓", name: "Academia",       desc: "LMS, personalized learning platforms" },
  { icon: "📡", name: "Telecom",        desc: "Network management, OSS/BSS systems" },
];

const testimonials = [
  { quote: "Ivy League Solutions transformed our legacy banking infrastructure with remarkable precision. Their AI-powered risk engine cut processing time by 90%.", author: "Michael R.", role: "CTO, MidWest Capital Partners", initials: "MR", badge: "Fintech" },
  { quote: "The ERP solution they built for our housing society handles 10,000+ units seamlessly. Exceptional architecture and post-launch support.", author: "Amanda L.", role: "Director of Operations", initials: "AL", badge: "ERP" },
  { quote: "Their healthcare AI platform reduced our clinical documentation time by 60%. HIPAA compliance was built-in from day one.", author: "Dr. Patel", role: "Chief Medical Officer", initials: "DP", badge: "Health" },
];

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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { v: "10+",  l: "Years of Experience",  s: "Since 2015",              icon: "◈" },
                { v: "200+", l: "Projects Delivered",   s: "Across 15+ industries",   icon: "◇" },
                { v: "98%",  l: "Client Satisfaction",  s: "Long-term partnerships",  icon: "△" },
                { v: "50+",  l: "Expert Engineers",     s: "Global talent",            icon: "○" },
              ].map((s) => (
                <div key={s.l} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "22px 20px" }}>
                  <div style={{ fontSize: 18, color: "var(--accent)", marginBottom: 10 }}>{s.icon}</div>
                  <div className="font-display" style={{ fontSize: 32, fontWeight: 600, color: "var(--accent)", lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "white", marginBottom: 3 }}>{s.l}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{s.s}</div>
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1", background: "rgba(200,169,110,0.07)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 10, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 24, color: "var(--accent)" }}>✦</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "white", marginBottom: 3 }}>AI-First Delivery</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>Production-grade AI systems for Fintech, Healthcare & enterprise operations — deployed globally.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="sh center">
            <div className="eyebrow">What We Build</div>
            <h2 className="font-display">Enterprise-Grade <em>Solutions</em></h2>
            <p>End-to-end technology services tailored for every industry and every scale.</p>
            <div className="rule center" />
          </div>
          <div className="svc-grid">
            {services.map((s) => (
              <Link key={s.title} href={s.href} style={{ textDecoration: "none" }}>
                <div className={`svc-card${s.featured ? " svc-featured" : ""}`}>
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-title">{s.title}</div>
                  <div className="svc-desc">{s.desc}</div>
                  <div className="svc-tags">
                    {s.tags.map((t) => <span key={t} className="tag-sm">{t}</span>)}
                  </div>
                  <div className="svc-arrow">Explore →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section section-alt">
        <div className="container">
          <div className="sh center">
            <div className="eyebrow">Industries We Serve</div>
            <h2 className="font-display">Deep Expertise Across <em>Every Vertical</em></h2>
            <div className="rule center" />
          </div>
          <div className="ind-grid">
            {industries.map((i) => (
              <div key={i.name} className="ind-card">
                <span className="ind-icon">{i.icon}</span>
                <div className="ind-name">{i.name}</div>
                <div className="ind-desc">{i.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="sh center">
            <div className="eyebrow">Client Voices</div>
            <h2 className="font-display">Built on <em>Trust & Results</em></h2>
            <div className="rule center" />
          </div>
          <div className="testi-grid">
            {testimonials.map((t) => (
              <div key={t.author} className="testi" style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)" }}>
                <div className="testi-quote" style={{ color: "var(--accent)" }}>"</div>
                <p style={{ color: "var(--gray-600)" }}>{t.quote}</p>
                <div className="testi-sep" style={{ background: "var(--gray-100)" }} />
                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="auth-name" style={{ color: "var(--navy)" }}>{t.author}</div>
                    <div className="auth-role" style={{ color: "var(--gray-400)" }}>{t.role}</div>
                  </div>
                  <span className="auth-badge" style={{ background: "var(--navy)", color: "var(--accent)", border: "none" }}>{t.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-navy">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
            <div className="eyebrow" style={{ color: "var(--accent)", justifyContent: "center" }}>Let&apos;s Work Together</div>
            <h2 className="font-display light" style={{ marginTop: 16, marginBottom: 16 }}>
              Build Something <em>Exceptional</em>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>
              Partner with a team that has delivered 200+ enterprise-grade solutions across 20+ countries and beyond.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">Start a Project →</Link>
              <Link href="/solutions" className="btn-ghost">View Portfolio</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

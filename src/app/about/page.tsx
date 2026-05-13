import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Ivy League Solutions — our story, team, values, and the technology partnerships that power enterprise-grade custom solutions.",
};

const timeline = [
  { year: "2015", title: "Origins", desc: "MeeramTech founded in Dubai, UAE — beginning a tradition of meeting diversified enterprise technology needs across the Middle East." },
  { year: "2018", title: "AppInSnap Launch", desc: "AppInSnap joins the portfolio, specializing in mobile-first solutions and rapid product development across the Middle East." },
  { year: "2020", title: "AI Division", desc: "Launch of AI Brigade — our dedicated machine learning and AI engineering practice for regulated verticals." },
  { year: "2022", title: "Datum Product", desc: "Released Datum, our proprietary spreadsheet intelligence platform — Excel/OpenXML compatible with enterprise-grade security." },
  { year: "2024", title: "Global Launch", desc: "Ivy League Solutions launched to bring our decade of enterprise expertise to global markets under one unified brand." },
  { year: "2025+", title: "Scale & Expand", desc: "Expanding AI capabilities, growing our global presence, and building IvyFlow, IvyShield, and IvyERP product lines." },
];

const values = [
  { icon: "◈", title: "Engineering Precision", desc: "We treat every solution like a product. Architectural decisions are made for the long term — not just the sprint." },
  { icon: "◇", title: "Client Partnership", desc: "Long-standing relationships aren't a goal — they're the outcome of delivering what we promise. Every time." },
  { icon: "△", title: "Multicultural by Design", desc: "Our team spans continents. That cultural breadth lets us engineer for any market, understand any user." },
  { icon: "○", title: "Transparent Delivery", desc: "Weekly reporting, open codebases, and honest timelines. No surprises — just progress." },
];

const techPartners = [
  "Oracle", "Microsoft", "AWS", "Azure", "Huawei", "Fortinet", "Cisco", "Aruba",
  "Veeam", "CrowdStrike", "SAP", "VMware",
];

const leadership = [
  { name: "Farat Iqbal", role: "Founder & Managing Director", bio: "Farat brings 10+ years of enterprise IT consulting experience across the Middle East and South Asia, leading MeeramTech and AppInSnap before launching Ivy League Solutions as a unified global brand.", initials: "FI" },
  { name: "Engineering Team", role: "50+ Engineers Globally", bio: "Distributed engineering talent spanning South Asia, UAE, and the Gulf region — covering software engineering, infrastructure, AI/ML, UI/UX design, and cybersecurity.", initials: "ET" },
];

export default function AboutPage() {
  return (
    <>
      {/* 1 — Hero: navy */}
      <section className="hero" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="hero-inner" style={{ maxWidth: 760 }}>
            <div className="eyebrow">About Ivy League Solutions</div>
            <h1 className="hero-title font-display">
              A Decade of <em>Engineering</em>
              <br />
              Redefined for <em>Enterprise</em>
            </h1>
            <p className="hero-desc" style={{ maxWidth: 640 }}>
              Ivy League Solutions brings together MeeramTech&apos;s enterprise infrastructure expertise
              and AppInSnap&apos;s product agility — unified for global enterprise delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — Mission: white */}
      <section className="section">
        <div className="container">
          <div className="sh">
            <div className="eyebrow">Our Mission</div>
            <h2 className="font-display">We Solve <em>Complex Problems</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
            <div>
              <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.8, marginBottom: 14 }}>
                We offer both customized and off-the-shelf software solutions, helping SMEs and
                corporate-level clients unlock opportunities of tomorrow. We build platforms that
                make it easy and efficient to develop and operate real-time applications.
              </p>
              <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.8 }}>
                From Fintech, Transportation, and Healthcare to Retail and beyond — we build solutions
                across verticals with long-standing relationships with business-leading vendors.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { v: "10+", l: "Years of Experience", sub: "Since 2015" },
                { v: "200+", l: "Projects Delivered", sub: "Global portfolio" },
                { v: "50+", l: "Team Members", sub: "Engineers & designers" },
                { v: "15+", l: "Industries Served", sub: "Deep domain expertise" },
              ].map((s) => (
                <div key={s.l} style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderRadius: 8, padding: 18 }}>
                  <div className="font-display" style={{ fontSize: 30, color: "var(--accent)", marginBottom: 6 }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "var(--gray-800)", marginBottom: 3 }}>{s.l}</div>
                  <div style={{ fontSize: 10, color: "var(--gray-400)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Timeline: off-white (alt) */}
      <section className="section section-alt">
        <div className="container">
          <div className="sh">
            <div className="eyebrow">Our Journey</div>
            <h2 className="font-display">A Timeline of <em>Excellence</em></h2>
            <div className="rule" />
          </div>
          <div className="timeline-v">
            {timeline.map((item) => (
              <div key={item.year} className="tl-item">
                <div className="tl-dot" />
                <div className="tl-year">{item.year}</div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Values: white */}
      <section className="section">
        <div className="container">
          <div className="sh">
            <div className="eyebrow">Our Values</div>
            <h2 className="font-display">The Principles That <em>Guide Us</em></h2>
            <div className="rule" />
          </div>
          <div className="val-grid">
            {values.map((v) => (
              <div key={v.title} className="val-card">
                <div className="val-icon">{v.icon}</div>
                <div className="val-title">{v.title}</div>
                <div className="val-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Leadership: navy */}
      <section className="section section-navy">
        <div className="container">
          <div className="sh">
            <div className="eyebrow" style={{ color: "var(--accent)" }}>Leadership</div>
            <h2 className="font-display light">The Team Behind <em>Ivy League</em></h2>
            <div className="rule" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {leadership.map((l) => (
              <div key={l.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "var(--navy)", flexShrink: 0 }}>{l.initials}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "white", marginBottom: 2 }}>{l.name}</div>
                  <div style={{ fontSize: 10, fontWeight: 500, color: "var(--accent)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 8 }}>{l.role}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{l.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Tech Partners: white */}
      <section className="section">
        <div className="container">
          <div className="sh">
            <div className="eyebrow">Technology Partners</div>
            <h2 className="font-display">Trusted by <em>Leading Vendors</em></h2>
            <div className="rule" />
          </div>
          <div className="partner-chips">
            {techPartners.map((p) => (
              <div key={p} className="pchip">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — CTA: off-white (alt) */}
      <section className="section section-alt">
        <div className="container">
          <div className="cta-block">
            <div>
              <h3 className="font-display">
                Ready to Partner with <em>Ivy League?</em>
              </h3>
              <p>Let&apos;s discuss your technology challenges and explore how our team can drive results.</p>
            </div>
            <div className="cta-btns">
              <Link href="/contact" className="btn-navy">Get in Touch →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

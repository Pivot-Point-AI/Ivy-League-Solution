import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Ivy League Solutions — our story, team, values, and the technology partnerships that power enterprise-grade custom solutions.",
};

const timeline = [
  { year: "2015", title: "Origins", desc: "MeeramTech founded in Dubai, UAE — beginning a tradition of meeting diversified enterprise technology needs." },
  { year: "2018", title: "AppInSnap Launch", desc: "AppInSnap joins the portfolio, specializing in mobile-first solutions and rapid product development across the Middle East." },
  { year: "2020", title: "AI Division", desc: "Launch of AI Brigade — our dedicated machine learning and AI engineering practice for regulated verticals." },
  { year: "2022", title: "Datum Product", desc: "Released Datum, our proprietary spreadsheet intelligence platform — Excel/OpenXML compatible with enterprise-grade security." },
  { year: "2024", title: "North America Launch", desc: "Ivy League Solutions launched to bring our decade of enterprise expertise to the North American market under one unified brand." },
  { year: "2025+", title: "Scale & Expand", desc: "Expanding AI capabilities, growing North American presence, and building IvyFlow, IvyShield, and IvyERP product lines." },
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
  { name: "Farat Iqbal", role: "Founder & Managing Director", bio: "Farat brings 10+ years of enterprise IT consulting experience across the Middle East and South Asia, leading MeeramTech and AppInSnap before launching Ivy League Solutions for the North American market.", initials: "FI" },
  { name: "Engineering Team", role: "50+ Engineers Globally", bio: "Distributed engineering talent spanning Pakistan, UAE, and North America — covering software engineering, infrastructure, AI/ML, UI/UX design, and cybersecurity.", initials: "ET" },
];

export default function AboutPage() {
  return (
    <>
      <section className="hero" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="hero-inner" style={{ maxWidth: 760 }}>
            <div className="eyebrow">About Ivy League Solutions</div>
            <h1 className="hero-title font-display">
              A Decade of <em>Engineering</em>
              <br />
              Redefined for <em>North America</em>
            </h1>
            <p className="hero-desc" style={{ maxWidth: 640 }}>
              Ivy League Solutions brings together MeeramTech&apos;s enterprise infrastructure expertise
              and AppInSnap&apos;s product agility — unified for the North American market.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <div className="sh">
            <div className="eyebrow" style={{ color: "var(--accent)" }}>Our Mission</div>
            <h2 className="font-display light">We Solve <em>Complex Problems</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
            <div>
              <p style={{ fontSize: 14, color: "white", lineHeight: 1.8, marginBottom: 14 }}>
                We offer both customized and off-the-shelf software solutions, helping SMEs and
                corporate-level clients unlock opportunities of tomorrow. We build platforms that
                make it easy and efficient to develop and operate real-time applications.
              </p>
              <p style={{ fontSize: 14, color: "white", lineHeight: 1.8 }}>
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
                <div key={s.l} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: 18 }}>
                  <div className="font-display" style={{ fontSize: 30, color: "var(--accent)", marginBottom: 6 }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "white", marginBottom: 3 }}>{s.l}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="section section-alt">
        <div className="container">
          <div className="sh">
            <div className="eyebrow">Leadership</div>
            <h2 className="font-display">The Team Behind <em>Ivy League</em></h2>
            <div className="rule" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {leadership.map((l) => (
              <div key={l.name} className="lead-card">
                <div className="lead-avatar">{l.initials}</div>
                <div>
                  <div className="lead-name">{l.name}</div>
                  <div className="lead-role">{l.role}</div>
                  <div className="lead-bio">{l.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="section">
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

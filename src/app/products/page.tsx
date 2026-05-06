import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description: "Ivy League Solutions proprietary software products — Datum, IvyFlow, IvyShield, and IvyERP.",
};

const products = [
  {
    name: "Datum",
    tagline: "Spreadsheet Intelligence Platform",
    desc: "A next-generation spreadsheet to collect, visualize, manipulate, secure, export, and manage data and documents. Excel and OpenXML compatible.",
    features: ["Excel & OpenXML compatible","Real-time collaboration","Advanced data visualization","Document management built-in","Enterprise security & audit logs","API-first architecture"],
    status: "Available",
    statusClass: "status-live",
    href: "http://datum.meeramtech.com/",
    flagship: true,
    btnLabel: "Launch Datum →",
    btnClass: "btn-primary",
  },
  {
    name: "IvyFlow",
    tagline: "Workflow Automation Suite",
    desc: "AI-powered workflow automation that eliminates manual processes, integrates disparate systems, and surfaces intelligence across your operational stack.",
    features: ["No-code workflow builder","200+ pre-built connectors","AI-driven decision routing","Real-time dashboards","Enterprise SSO & RBAC","SLA tracking"],
    status: "Coming Soon",
    statusClass: "status-soon",
    href: "/contact",
    flagship: false,
    btnLabel: "Join Waitlist →",
    btnClass: "btn-outline",
  },
  {
    name: "IvyShield",
    tagline: "Cybersecurity Intelligence Platform",
    desc: "Continuous threat monitoring, vulnerability assessment, and compliance automation for North American enterprises.",
    features: ["24/7 threat intelligence","Automated compliance reporting","Zero-trust access management","SIEM integration","Incident response playbooks","SOC 2, HIPAA, PCI-DSS ready"],
    status: "Coming Soon",
    statusClass: "status-soon",
    href: "/contact",
    flagship: false,
    btnLabel: "Join Waitlist →",
    btnClass: "btn-outline",
  },
  {
    name: "IvyERP",
    tagline: "Modular Enterprise Resource Platform",
    desc: "A configurable, industry-specific ERP for North American SMEs and enterprises — with AI-native modules built in from day one.",
    features: ["Finance & accounting","HR & payroll automation","Supply chain & inventory","CRM built-in","AI-powered forecasting","Industry-specific templates"],
    status: "In Development",
    statusClass: "status-soon",
    href: "/contact",
    flagship: false,
    btnLabel: "Join Waitlist →",
    btnClass: "btn-outline",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--navy)", padding: "80px 0 68px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -80, top: -80, width: 520, height: 520, borderRadius: "50%", background: "rgba(200,169,110,0.05)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Our Products</div>
          <h1 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 600, lineHeight: 1.08, color: "white", margin: "0 0 20px" }}>
            Built by Engineers,<br /><em style={{ color: "var(--accent)", fontStyle: "italic" }}>for Enterprise</em>
          </h1>
          <p style={{ fontSize: 15, color: "white", lineHeight: 1.75, maxWidth: 480, fontWeight: 300 }}>
            Proprietary software products designed from years of enterprise implementation experience — solving the problems other tools leave unsolved.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="container">
          <div className="prod-grid">
            {products.map((p) => (
              <div key={p.name} className={`prod-card${p.flagship ? " flagship" : ""}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span className={`prod-status ${p.statusClass}`}>{p.status}</span>
                  {p.flagship && (
                    <span style={{ fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 3, background: "rgba(200,169,110,0.1)", color: "var(--accent-dark)", border: "1px solid rgba(200,169,110,0.2)" }}>Flagship</span>
                  )}
                </div>
                <div className="prod-name font-display">{p.name}</div>
                <div className="prod-tagline">{p.tagline}</div>
                <div className="prod-desc">{p.desc}</div>
                <div className="feat-list" style={{ flex: 1 }}>
                  {p.features.map((f) => (
                    <div key={f} className="feat-item">
                      <div className="feat-dot" />
                      {f}
                    </div>
                  ))}
                </div>
                {p.btnClass === "btn-primary" ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: "center", marginTop: "auto" }}>{p.btnLabel}</a>
                ) : (
                  <Link href={p.href} className="btn-outline" style={{ justifyContent: "center", marginTop: "auto" }}>{p.btnLabel}</Link>
                )}
              </div>
            ))}
          </div>

          {/* Custom Product CTA */}
          <div className="product-cta">
            <h3 className="font-display">Need a Product Built <em style={{ fontStyle: "italic" }}>From Scratch?</em></h3>
            <p>We&apos;ve helped dozens of startups and enterprises take product ideas from concept to market-ready software.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link href="/contact" className="btn-primary">Discuss Your Product →</Link>
              <Link href="/services" className="btn-ghost">View Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

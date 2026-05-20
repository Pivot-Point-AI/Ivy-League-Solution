import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — Ivy League Solutions",
  description: "Ivy League Solutions proprietary software products — Datum, IvyFlow, IvyShield, and IvyERP.",
};

/* ─── Data ─────────────────────────────────────────────── */
const products = [
  {
    name: "Datum",
    tagline: "Spreadsheet Intelligence Platform",
    desc: "A next-generation spreadsheet to collect, visualise, manipulate, secure, export, and manage data and documents. Excel and OpenXML compatible — drop-in replacement, enterprise-grade security.",
    features: [
      "Excel & OpenXML compatible",
      "Real-time collaboration",
      "Advanced data visualisation",
      "Document management built-in",
      "Enterprise security & audit logs",
      "API-first architecture",
    ],
    status: "Live",
    live: true,
    flagship: true,
    href: "http://datum.meeramtech.com/",
    external: true,
    btnLabel: "Launch Datum →",
    icon: "◈",
    accent: "#78EB54",
  },
  {
    name: "IvyFlow",
    tagline: "Workflow Automation Suite",
    desc: "AI-powered workflow automation that eliminates manual processes, integrates disparate systems, and surfaces intelligence across your operational stack — no-code builder included.",
    features: [
      "No-code workflow builder",
      "200+ pre-built connectors",
      "AI-driven decision routing",
      "Real-time dashboards",
      "Enterprise SSO & RBAC",
      "SLA tracking",
    ],
    status: "Coming Soon",
    live: false,
    flagship: false,
    href: "/contact",
    external: false,
    btnLabel: "Join Waitlist →",
    icon: "◇",
    accent: "#78EB54",
  },
  {
    name: "IvyShield",
    tagline: "Cybersecurity Intelligence Platform",
    desc: "Continuous threat monitoring, vulnerability assessment, and compliance automation — purpose-built for enterprise organisations in regulated industries.",
    features: [
      "24/7 threat intelligence",
      "Automated compliance reporting",
      "Zero-trust access management",
      "SIEM integration",
      "Incident response playbooks",
      "SOC 2, HIPAA, PCI-DSS ready",
    ],
    status: "Coming Soon",
    live: false,
    flagship: false,
    href: "/contact",
    external: false,
    btnLabel: "Join Waitlist →",
    icon: "△",
    accent: "#78EB54",
  },
  {
    name: "IvyERP",
    tagline: "Modular Enterprise Resource Platform",
    desc: "A configurable, industry-specific ERP for enterprise SMEs — with AI-native modules for finance, HR, supply chain, and CRM built in from day one.",
    features: [
      "Finance & accounting",
      "HR & payroll automation",
      "Supply chain & inventory",
      "CRM built-in",
      "AI-powered forecasting",
      "Industry-specific templates",
    ],
    status: "In Development",
    live: false,
    flagship: false,
    href: "/contact",
    external: false,
    btnLabel: "Join Waitlist →",
    icon: "⬟",
    accent: "#78EB54",
  },
];

const whyBuild = [
  { icon: "◈", title: "Built from Real Gaps",      desc: "Every product was conceived after years of enterprise implementations — solving the exact problems we kept encountering in the field." },
  { icon: "✦", title: "AI-Native from Day One",    desc: "Not bolted-on AI. Our products are architected with machine learning and automation as foundational layers, not afterthoughts." },
  { icon: "○", title: "Enterprise-Grade Security", desc: "SOC 2, HIPAA, GDPR, and PCI-DSS standards baked into the product architecture — not added as a compliance checkbox." },
  { icon: "△", title: "Interoperable by Design",   desc: "API-first architecture means every product connects to your existing stack — ERP, CRM, HRMS, or custom systems." },
];

/* ─── Page ──────────────────────────────────────────────── */
export default function ProductsPage() {
  const flagship = products.find((p) => p.flagship)!;
  const rest = products.filter((p) => !p.flagship);

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="page-hero" style={{ paddingBottom: "clamp(48px,6vw,96px)" }}>
        {/* Rings */}
        <div style={{ position:"absolute", right:-160, top:-160, width:700, height:700, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.06)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:-50,  top:-50,  width:350, height:350, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)",  pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:-80, bottom:-80, width:360, height:360, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.05)", pointerEvents:"none" }} />

        <div className="page-hero-inner">
          <p className="page-eyebrow">Our Products</p>
          <h1 className="page-h1" style={{ maxWidth: 760 }}>
            Built by Engineers,<br /><em>for Enterprise</em>
          </h1>
          <p className="page-hero-desc" style={{ marginBottom: 40 }}>
            Proprietary software products designed from years of enterprise implementation experience —
            solving the problems other tools leave unsolved, with AI and security baked in from day one.
          </p>
          <div className="page-hero-btns" style={{ marginBottom: 56 }}>
            <a href="http://datum.meeramtech.com/" target="_blank" rel="noopener noreferrer" className="btn-green">Launch Datum →</a>
            <Link href="/contact" className="btn-white-outline">Join a Waitlist</Link>
          </div>

          {/* Product name strip */}
          <div style={{ display:"flex", gap:1, background:"rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden", maxWidth:700 }}>
            {products.map((p) => (
              <div key={p.name} style={{ flex:1, padding:"16px 12px", textAlign:"center", background:"rgba(255,255,255,0.03)" }}>
                <div style={{ fontSize:"clamp(14px,1.04vw,18px)", fontWeight:700, color: p.live ? "var(--rs-green)" : "rgba(255,255,255,0.55)", fontFamily:"var(--rs-font)", marginBottom:4 }}>{p.name}</div>
                <div style={{ fontSize:9, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" as const, color: p.live ? "var(--rs-green)" : "rgba(255,255,255,0.25)", fontFamily:"var(--rs-font)" }}>{p.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. FLAGSHIP PRODUCT (DATUM) ──────────────────── */}
      <section className="page-section page-section-white" style={{ paddingBottom: 0 }}>
        <div className="page-inner">
          <div style={{ marginBottom: 32 }}>
            <p className="page-sh-label">Flagship Product</p>
            <h2 className="page-h2">Meet <em>Datum</em></h2>
          </div>

          <div style={{ background:"#000", border:"1.5px solid rgba(120,235,84,0.25)", borderRadius:24, padding:"clamp(32px,4vw,60px)", position:"relative", overflow:"hidden", display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:48, alignItems:"center" }}>
            {/* Background icon */}
            <div style={{ position:"absolute", right:-20, top:-20, fontSize:240, opacity:0.04, color:"#78EB54", lineHeight:1, pointerEvents:"none", userSelect:"none", fontFamily:"var(--rs-font)" }}>◈</div>
            {/* Rings */}
            <div style={{ position:"absolute", right:-60, bottom:-60, width:280, height:280, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)", pointerEvents:"none" }} />

            {/* Left */}
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" as const, padding:"5px 14px", borderRadius:100, background:"rgba(120,235,84,0.15)", color:"var(--rs-green)", border:"1px solid rgba(120,235,84,0.3)", fontFamily:"var(--rs-font)" }}>Live · Available Now</span>
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, padding:"5px 14px", borderRadius:100, background:"rgba(120,235,84,0.08)", color:"var(--rs-green)", border:"1px solid rgba(120,235,84,0.2)", fontFamily:"var(--rs-font)" }}>Flagship</span>
              </div>
              <div style={{ fontSize:"clamp(40px,4.17vw,72px)", fontWeight:700, color:"#fff", lineHeight:1, marginBottom:6, fontFamily:"var(--rs-font)" }}>{flagship.name}</div>
              <div style={{ fontSize:12, fontWeight:600, color:"var(--rs-green)", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:20, fontFamily:"var(--rs-font)" }}>{flagship.tagline}</div>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.65)", lineHeight:1.8, marginBottom:32, fontFamily:"var(--rs-font)" }}>{flagship.desc}</p>
              <a href={flagship.href} target="_blank" rel="noopener noreferrer" className="btn-green">{flagship.btnLabel}</a>
            </div>

            {/* Right — features */}
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.35)", marginBottom:16, fontFamily:"var(--rs-font)" }}>Key Features</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {flagship.features.map((f) => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderRadius:10, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--rs-green)", flexShrink:0 }} />
                    <span style={{ fontSize:13, color:"rgba(255,255,255,0.75)", fontFamily:"var(--rs-font)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. UPCOMING PRODUCTS ─────────────────────────── */}
      <section className="page-section page-section-white">
        <div className="page-inner">
          <div style={{ marginBottom:40 }}>
            <p className="page-sh-label">Coming Soon</p>
            <h2 className="page-h2">The IvyStack — <em>Products in the Pipeline</em></h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {rest.map((p) => (
              <div key={p.name} style={{ background:"var(--rs-gray)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:20, padding:"clamp(24px,2.5vw,36px)", display:"flex", flexDirection:"column", gap:16, position:"relative", overflow:"hidden" }}>
                {/* BG icon */}
                <div style={{ position:"absolute", right:16, bottom:16, fontSize:80, opacity:0.06, color:"#000", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>{p.icon}</div>

                {/* Status */}
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, padding:"4px 12px", borderRadius:100, background:"rgba(0,0,0,0.06)", color:"rgba(0,0,0,0.4)", border:"1px solid rgba(0,0,0,0.1)", fontFamily:"var(--rs-font)", alignSelf:"flex-start" }}>{p.status}</span>

                <div>
                  <div style={{ fontSize:"clamp(24px,2.1vw,36px)", fontWeight:700, color:"var(--rs-black)", lineHeight:1, marginBottom:4, fontFamily:"var(--rs-font)" }}>{p.name}</div>
                  <div style={{ fontSize:11, fontWeight:600, color:"#3a9e20", letterSpacing:"0.06em", textTransform:"uppercase" as const, fontFamily:"var(--rs-font)" }}>{p.tagline}</div>
                </div>

                <p style={{ fontSize:13, color:"rgba(0,0,0,0.55)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)", flex:1 }}>{p.desc}</p>

                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {p.features.map((f) => (
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"rgba(0,0,0,0.55)", fontFamily:"var(--rs-font)" }}>
                      <span style={{ width:4, height:4, borderRadius:"50%", background:"var(--rs-green)", flexShrink:0 }} />
                      {f}
                    </div>
                  ))}
                </div>

                <Link href={p.href} className="btn-black" style={{ width:"100%", justifyContent:"center" as const, marginTop:4 }}>{p.btnLabel}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY WE BUILD PRODUCTS ─────────────────────── */}
      <section className="page-section page-section-dark">
        <div className="page-inner">
          <div style={{ marginBottom:48 }}>
            <p className="page-sh-label">Our Product Philosophy</p>
            <h2 className="page-h2 page-h2-light">Why We Build <em>Our Own</em></h2>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", maxWidth:560, marginTop:10 }}>
              After 200+ enterprise deployments we saw the same gaps repeatedly. So we built the tools we wished existed.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {whyBuild.map((w) => (
              <div key={w.title} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:24, display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:8, background:"rgba(120,235,84,0.1)", border:"1px solid rgba(120,235,84,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:"var(--rs-green)" }}>{w.icon}</div>
                <div style={{ fontSize:14, fontWeight:600, color:"#fff", fontFamily:"var(--rs-font)" }}>{w.title}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.7, fontFamily:"var(--rs-font)" }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CUSTOM PRODUCT CTA ────────────────────────── */}
      <section className="page-section page-section-gray">
        <div className="page-inner">
          {/* Split layout */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            {/* Left — custom build */}
            <div style={{ background:"#000", border:"1px solid rgba(120,235,84,0.18)", borderRadius:20, padding:"clamp(32px,3.5vw,52px)", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:24 }}>
              <div style={{ position:"absolute", right:-40, bottom:-40, width:200, height:200, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)", pointerEvents:"none" }} />
              <div style={{ position:"relative", zIndex:1 }}>
                <p className="page-eyebrow">Custom Development</p>
                <h3 style={{ fontSize:"clamp(20px,1.875vw,32px)", fontWeight:500, color:"#fff", lineHeight:1.2, margin:"0 0 12px", fontFamily:"var(--rs-font)" }}>
                  Need a Product Built <em style={{ color:"var(--rs-green)", fontStyle:"normal" }}>From Scratch?</em>
                </h3>
                <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)" }}>
                  We&apos;ve helped dozens of startups and enterprises take product ideas from concept to market-ready software.
                </p>
              </div>
              <div style={{ position:"relative", zIndex:1 }}>
                <Link href="/contact" className="btn-green">Discuss Your Product →</Link>
              </div>
            </div>

            {/* Right — join waitlist */}
            <div style={{ background:"var(--rs-gray)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:20, padding:"clamp(32px,3.5vw,52px)", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:24 }}>
              <div>
                <p className="page-sh-label">Product Waitlist</p>
                <h3 style={{ fontSize:"clamp(20px,1.875vw,32px)", fontWeight:500, color:"var(--rs-black)", lineHeight:1.2, margin:"0 0 12px", fontFamily:"var(--rs-font)" }}>
                  Be First When <em style={{ color:"var(--rs-green)", fontStyle:"normal" }}>We Launch</em>
                </h3>
                <p style={{ fontSize:13, color:"rgba(0,0,0,0.5)", lineHeight:1.75, margin:"0 0 20px", fontFamily:"var(--rs-font)" }}>
                  IvyFlow, IvyShield, and IvyERP are in active development. Join the waitlist and get early access, priority onboarding, and launch pricing.
                </p>
                <div style={{ display:"flex", flexWrap:"wrap" as const, gap:6 }}>
                  {["IvyFlow", "IvyShield", "IvyERP"].map((name) => (
                    <span key={name} style={{ fontSize:11, fontWeight:600, padding:"5px 14px", borderRadius:100, background:"rgba(120,235,84,0.1)", color:"#3a9e20", border:"1px solid rgba(120,235,84,0.22)", fontFamily:"var(--rs-font)" }}>{name}</span>
                  ))}
                </div>
              </div>
              <Link href="/contact" className="btn-black" style={{ alignSelf:"flex-start" as const }}>Join the Waitlist →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

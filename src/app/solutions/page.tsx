"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────────────── */
const projects = [
  {
    cat: "Fintech",        num: "01",
    client: "MidWest Capital Partners",
    title: "Neural Credit Risk Engine",
    desc: "Multi-layer neural model trained on 7 years of transaction data. Predicts default risk with 94.2% accuracy — deployed in under 30 days.",
    outcomes: ["94.2% accuracy", "8s processing time", "31% loss reduction"],
    tech: ["Python", "TensorFlow", "AWS", "MLOps"],
    metric: "94.2%", metricLabel: "Accuracy",
    featured: true, icon: "◈",
  },
  {
    cat: "Healthcare",     num: "02",
    client: "Regional Health Network",
    title: "Clinical Documentation AI",
    desc: "HIPAA-compliant ambient documentation using speech AI and LLMs, cutting clinician admin burden by 60% across 3 hospital sites.",
    outcomes: ["60% time reduction", "HIPAA compliant", "28% readmission drop"],
    tech: ["Python", "OpenAI", "FHIR", "Azure"],
    metric: "60%", metricLabel: "Time Saved",
    featured: true, icon: "◇",
  },
  {
    cat: "Infrastructure", num: "03",
    client: "Emaco Facility, UAE",
    title: "Oracle DB Configuration",
    desc: "Enterprise database and SQL services across multiple UAE sites, delivering 99.9% uptime with 50% query optimisation.",
    outcomes: ["99.9% uptime SLA", "50% query optimisation"],
    tech: ["Oracle DB", "SQL", "Linux"],
    metric: "99.9%", metricLabel: "Uptime",
    featured: false, icon: "⊡",
  },
  {
    cat: "ERP",            num: "04",
    client: "Bisha Mining",
    title: "Microsoft NAV ERP",
    desc: "Full NAV ERP deployment, customisation and integration for a large-scale mining operation across multiple sites.",
    outcomes: ["Full NAV deployment", "Custom mining modules"],
    tech: ["Microsoft NAV", "Dynamics 365"],
    metric: "100%", metricLabel: "On-Time",
    featured: false, icon: "⬟",
  },
  {
    cat: "Infrastructure", num: "05",
    client: "Al Nahla Technologies, Oman",
    title: "Huawei iMaster Campus",
    desc: "50-site campus network with 2 core switches, 12 access switches and 36 APs on Huawei iMaster NCE — delivered on schedule.",
    outcomes: ["50-site campus", "36 APs deployed"],
    tech: ["Huawei iMaster", "NCE", "SD-WAN"],
    metric: "50", metricLabel: "Sites",
    featured: false, icon: "⟁",
  },
  {
    cat: "ERP",            num: "06",
    client: "Housing Society Group",
    title: "Residential Society ERP",
    desc: "Complete ERP for digital management of residential complexes — billing, maintenance, and resident portals unified in one platform.",
    outcomes: ["10,000+ units managed", "Real-time billing"],
    tech: ["React", "Node.js", "PostgreSQL"],
    metric: "10K+", metricLabel: "Units",
    featured: false, icon: "◫",
  },
  {
    cat: "E-Commerce",     num: "07",
    client: "Retail Chain",
    title: "Multi-Vendor Platform",
    desc: "Custom multi-vendor e-commerce with real-time inventory management, tripling order volume within 3 months of launch.",
    outcomes: ["3× order volume", "Multi-vendor support"],
    tech: ["Next.js", "Stripe", "MongoDB"],
    metric: "3×", metricLabel: "Orders",
    featured: false, icon: "○",
  },
  {
    cat: "Academia",       num: "08",
    client: "EdTech Institution",
    title: "Personalised LMS Platform",
    desc: "AI-driven learning management system with adaptive testing and real-time analytics — serving 50,000+ active students.",
    outcomes: ["50,000+ students", "40% engagement boost"],
    tech: ["React", "Python", "AI/ML"],
    metric: "50K+", metricLabel: "Students",
    featured: false, icon: "△",
  },
  {
    cat: "Logistics",      num: "09",
    client: "Regional Logistics Group",
    title: "Fleet & Warehouse Platform",
    desc: "End-to-end logistics platform for fleet tracking, warehouse management, and route optimisation using IoT sensors.",
    outcomes: ["30% fuel savings", "Real-time tracking"],
    tech: ["React", "Node.js", "IoT"],
    metric: "30%", metricLabel: "Fuel Saved",
    featured: false, icon: "⬡",
  },
];

const categories = ["All", "Fintech", "Healthcare", "Infrastructure", "ERP", "E-Commerce", "Academia", "Logistics"];

const heroStats = [
  { v: "200+", l: "Projects Delivered"  },
  { v: "15+",  l: "Industries Served"   },
  { v: "10+",  l: "Years Experience"    },
  { v: "98%",  l: "Client Satisfaction" },
];

const industries = [
  "Fintech", "Healthcare", "Infrastructure", "ERP", "E-Commerce",
  "Academia", "Logistics", "Manufacturing", "Real Estate",
  "Telecom", "Law Enforcement", "Energy",
];

/* ─── Page ──────────────────────────────────────────────── */
export default function SolutionsPage() {
  const [active, setActive] = useState("All");

  const filteredAll   = active === "All" ? projects : projects.filter((p) => p.cat === active);
  const featuredList  = projects.filter((p) => p.featured);
  const regularList   = active === "All" ? projects.filter((p) => !p.featured) : filteredAll;
  const showFeatured  = active === "All";

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="page-hero" style={{ paddingBottom:"clamp(48px,6vw,96px)" }}>
        <div style={{ position:"absolute", right:-160, top:-160, width:700, height:700, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.06)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:-50,  top:-50,  width:340, height:340, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)",  pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:-80, bottom:-80, width:380, height:380, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.05)", pointerEvents:"none" }} />

        <div className="page-hero-inner">
          <p className="page-eyebrow">Our Portfolio</p>
          <h1 className="page-h1" style={{ maxWidth:780 }}>
            Delivered Solutions,<br /><em>Proven Results</em>
          </h1>
          <p className="page-hero-desc" style={{ marginBottom:40 }}>
            200+ enterprise deployments spanning 15+ industries across the world —
            every engagement measured by outcomes, not just delivery.
          </p>
          <div className="page-hero-btns" style={{ marginBottom:56 }}>
            <Link href="/contact" className="btn-green">Start a Project →</Link>
            <Link href="/services" className="btn-white-outline">Our Services</Link>
          </div>

          {/* Stats strip */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden", maxWidth:760 }}>
            {heroStats.map((s) => (
              <div key={s.l} style={{ background:"rgba(255,255,255,0.03)", padding:"20px 16px", textAlign:"center" }}>
                <div style={{ fontSize:"clamp(22px,2.5vw,36px)", fontWeight:700, color:"var(--rs-green)", lineHeight:1, marginBottom:6, fontFamily:"var(--rs-font)" }}>{s.v}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", fontFamily:"var(--rs-font)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED CASE STUDIES ─────────────────────── */}
      {showFeatured && (
        <section className="page-section page-section-white" style={{ paddingBottom:0 }}>
          <div className="page-inner">
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
              <div>
                <p className="page-sh-label">Featured Case Studies</p>
                <h2 className="page-h2" style={{ margin:0 }}>High-Impact <em>Flagship Work</em></h2>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {featuredList.map((p, i) => (
                <div key={p.num} style={{ background: i===0 ? "#000" : "var(--rs-gray)", border: i===0 ? "1px solid rgba(120,235,84,0.2)" : "1px solid rgba(0,0,0,0.07)", borderRadius:20, padding:"clamp(28px,3vw,48px)", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", gap:18, minHeight:360 }}>
                  {/* Big background icon */}
                  <div style={{ position:"absolute", right:24, bottom:24, fontSize:120, opacity: i===0 ? 0.05 : 0.06, color: i===0 ? "#78EB54" : "#000", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>{p.icon}</div>
                  {/* Number */}
                  <div style={{ position:"absolute", top:24, right:28, fontSize:11, fontWeight:700, color: i===0 ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)", fontFamily:"var(--rs-font)", letterSpacing:"0.04em" }}>{p.num}</div>

                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, padding:"4px 12px", borderRadius:100, background: i===0 ? "rgba(120,235,84,0.14)" : "rgba(120,235,84,0.1)", color: i===0 ? "var(--rs-green)" : "#3a9e20", border:`1px solid ${i===0 ? "rgba(120,235,84,0.28)" : "rgba(120,235,84,0.2)"}`, fontFamily:"var(--rs-font)", alignSelf:"flex-start" }}>
                    {p.cat}
                  </span>

                  <div>
                    <div style={{ fontSize:10, fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase" as const, color: i===0 ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", marginBottom:8, fontFamily:"var(--rs-font)" }}>{p.client}</div>
                    <h3 style={{ fontSize:"clamp(20px,1.875vw,32px)", fontWeight:600, color: i===0 ? "#fff" : "var(--rs-black)", lineHeight:1.2, margin:0, fontFamily:"var(--rs-font)" }}>{p.title}</h3>
                  </div>

                  <p style={{ fontSize:13, color: i===0 ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)", flex:1 }}>{p.desc}</p>

                  {/* Metric highlight */}
                  <div style={{ display:"flex", alignItems:"center", gap:16, paddingTop:16, borderTop:`1px solid ${i===0 ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}` }}>
                    <div>
                      <div style={{ fontSize:"clamp(24px,2.5vw,40px)", fontWeight:700, color:"var(--rs-green)", lineHeight:1, fontFamily:"var(--rs-font)" }}>{p.metric}</div>
                      <div style={{ fontSize:10, color: i===0 ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", fontFamily:"var(--rs-font)", letterSpacing:"0.06em", textTransform:"uppercase" as const, marginTop:3 }}>{p.metricLabel}</div>
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap" as const, gap:5 }}>
                      {p.outcomes.map((o) => (
                        <span key={o} style={{ fontSize:10, fontWeight:600, padding:"4px 10px", borderRadius:100, background: i===0 ? "rgba(120,235,84,0.1)" : "rgba(120,235,84,0.09)", color:"var(--rs-green)", border:"1px solid rgba(120,235,84,0.2)", fontFamily:"var(--rs-font)" }}>{o}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display:"flex", flexWrap:"wrap" as const, gap:4 }}>
                    {p.tech.map((t) => (
                      <span key={t} style={{ fontSize:10, padding:"2px 8px", borderRadius:4, background: i===0 ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", color: i===0 ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", border:`1px solid ${i===0 ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"}`, fontFamily:"var(--rs-font)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. FILTER + ALL PROJECTS ─────────────────────── */}
      <section className="page-section page-section-white">
        <div className="page-inner">
          {/* Header */}
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
            <div>
              <p className="page-sh-label">{active === "All" ? "All Projects" : active}</p>
              <h2 className="page-h2" style={{ margin:0 }}>
                {active === "All" ? <>{`Every Engagement, `}<em>Every Vertical</em></> : <>{active} <em>Projects</em></>}
              </h2>
            </div>
            <span style={{ fontSize:13, color:"rgba(0,0,0,0.35)", fontFamily:"var(--rs-font)" }}>{filteredAll.length} project{filteredAll.length !== 1 ? "s" : ""}</span>
          </div>

          {/* Filter tabs */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" as const, marginBottom:36 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{ padding:"8px 18px", borderRadius:100, fontSize:13, fontWeight:500, fontFamily:"var(--rs-font)", cursor:"pointer", transition:"all 0.18s", border: active===cat ? "1.5px solid var(--rs-green)" : "1.5px solid rgba(0,0,0,0.1)", background: active===cat ? "var(--rs-green)" : "transparent", color: active===cat ? "#000" : "rgba(0,0,0,0.55)" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {regularList.map((p) => (
              <ProjectCard key={p.num} p={p} />
            ))}
          </div>

          {regularList.length === 0 && (
            <div style={{ textAlign:"center", padding:"80px 0", color:"rgba(0,0,0,0.3)", fontFamily:"var(--rs-font)", fontSize:14 }}>
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── 4. INDUSTRIES ────────────────────────────────── */}
      <section className="page-section page-section-dark">
        <div className="page-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:64, alignItems:"center" }}>
            <div>
              <p className="page-sh-label">Industry Coverage</p>
              <h2 className="page-h2 page-h2-light">15+ Verticals,<br /><em>One Standard</em></h2>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", marginTop:14 }}>
                Every sector has unique compliance, scale, and integration requirements. We&apos;ve built for them all.
              </p>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap" as const, gap:10 }}>
              {industries.map((ind) => (
                <span key={ind} style={{ fontSize:13, fontWeight:500, padding:"10px 20px", borderRadius:100, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", fontFamily:"var(--rs-font)" }}>
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA ───────────────────────────────────────── */}
      <section className="page-section page-section-gray">
        <div className="page-inner">
          <div style={{ background:"#000", borderRadius:24, padding:"clamp(48px,5vw,80px) clamp(32px,4.2vw,64px)", display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", right:-80, bottom:-80, width:320, height:320, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:40,  bottom:40,  width:160, height:160, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", left:-40,  top:-40,    width:200, height:200, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.06)", pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1 }}>
              <p className="page-eyebrow">Ready to Build?</p>
              <h2 style={{ fontSize:"clamp(24px,2.6vw,48px)", fontWeight:500, color:"#fff", lineHeight:1.2, margin:"0 0 12px", fontFamily:"var(--rs-font)" }}>
                Your Project Could Be <em style={{ color:"var(--rs-green)", fontStyle:"normal" }}>Next</em>
              </h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)", maxWidth:480 }}>
                Let&apos;s discuss how we can deliver measurable results for your organisation.
              </p>
            </div>

            <div style={{ display:"flex", flexDirection:"column" as const, gap:12, flexShrink:0, position:"relative", zIndex:1 }}>
              <Link href="/contact" className="btn-green">Start a Conversation →</Link>
              <Link href="/services" className="btn-white-outline" style={{ textAlign:"center" as const }}>Explore Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── ProjectCard ───────────────────────────────────────── */
function ProjectCard({ p }: { p: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background:"#fff", border: hovered ? "1px solid rgba(120,235,84,0.4)" : "1px solid rgba(0,0,0,0.08)", borderRadius:16, padding:24, display:"flex", flexDirection:"column", gap:12, transition:"all 0.2s", boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.09)" : "none", transform: hovered ? "translateY(-3px)" : "translateY(0)", cursor:"default", position:"relative", overflow:"hidden" }}
    >
      {/* Number */}
      <div style={{ position:"absolute", top:18, right:20, fontSize:11, fontWeight:700, color:"rgba(0,0,0,0.1)", fontFamily:"var(--rs-font)", letterSpacing:"0.04em" }}>{p.num}</div>

      {/* Category */}
      <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, padding:"4px 12px", borderRadius:100, background:"rgba(120,235,84,0.09)", color:"#3a9e20", border:"1px solid rgba(120,235,84,0.2)", fontFamily:"var(--rs-font)", alignSelf:"flex-start" }}>
        {p.cat}
      </span>

      {/* Client + Title */}
      <div>
        <div style={{ fontSize:10, fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase" as const, color:"rgba(0,0,0,0.3)", marginBottom:5, fontFamily:"var(--rs-font)" }}>{p.client}</div>
        <h3 style={{ fontSize:"clamp(14px,1.04vw,17px)", fontWeight:600, color:"var(--rs-black)", lineHeight:1.3, margin:0, fontFamily:"var(--rs-font)" }}>{p.title}</h3>
      </div>

      {/* Desc */}
      <p style={{ fontSize:12, color:"rgba(0,0,0,0.5)", lineHeight:1.7, margin:0, fontFamily:"var(--rs-font)", flex:1 }}>{p.desc}</p>

      {/* Metric + outcomes */}
      <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:10, borderTop:"1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ flexShrink:0 }}>
          <div style={{ fontSize:"clamp(18px,1.56vw,24px)", fontWeight:700, color:"var(--rs-green)", lineHeight:1, fontFamily:"var(--rs-font)" }}>{p.metric}</div>
          <div style={{ fontSize:9, color:"rgba(0,0,0,0.3)", fontFamily:"var(--rs-font)", letterSpacing:"0.06em", textTransform:"uppercase" as const, marginTop:2 }}>{p.metricLabel}</div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap" as const, gap:4 }}>
          {p.outcomes.map((o) => (
            <span key={o} style={{ fontSize:9, fontWeight:600, padding:"3px 8px", borderRadius:100, background:"rgba(120,235,84,0.08)", color:"#3a9e20", border:"1px solid rgba(120,235,84,0.16)", fontFamily:"var(--rs-font)" }}>{o}</span>
          ))}
        </div>
      </div>

      {/* Tech */}
      <div style={{ display:"flex", flexWrap:"wrap" as const, gap:4 }}>
        {p.tech.map((t) => (
          <span key={t} style={{ fontSize:9, padding:"2px 7px", borderRadius:4, background:"rgba(0,0,0,0.04)", color:"rgba(0,0,0,0.4)", border:"1px solid rgba(0,0,0,0.07)", fontFamily:"var(--rs-font)" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

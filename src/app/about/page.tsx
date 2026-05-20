import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Ivy League Solutions",
  description: "A decade of enterprise technology expertise — our story, team, values, and the technology partnerships that power world-class delivery.",
};

/* ─── Data ─────────────────────────────────────────────── */
const stats = [
  { v: "10+",  l: "Years of Experience", sub: "Since 2015"              },
  { v: "200+", l: "Projects Delivered",  sub: "Global portfolio"        },
  { v: "250+", l: "Team Members",        sub: "Engineers & designers"   },
  { v: "15+",  l: "Industries Served",   sub: "Deep domain expertise"   },
];

const timeline = [
  { year: "2015", title: "Origins",        desc: "MeeramTech founded in Dubai, UAE — beginning a tradition of meeting diversified enterprise technology needs across the Middle East." },
  { year: "2018", title: "AppInSnap",      desc: "AppInSnap joins the portfolio, specialising in mobile-first solutions and rapid product development across the Middle East." },
  { year: "2020", title: "AI Division",    desc: "Launch of AI Brigade — our dedicated machine learning and AI engineering practice for regulated verticals." },
  { year: "2022", title: "Datum Product",  desc: "Released Datum, our proprietary spreadsheet intelligence platform — Excel/OpenXML compatible with enterprise-grade security." },
  { year: "2024", title: "Global Launch",  desc: "Ivy League Solutions launched to bring our decade of enterprise expertise to global markets under one unified brand." },
  { year: "2025+", title: "Scale & Expand", desc: "Expanding AI capabilities, growing our global presence, and building IvyFlow, IvyShield, and IvyERP product lines." },
];

const values = [
  { icon: "◈", title: "Engineering Precision",   desc: "We treat every solution like a product. Architectural decisions are made for the long term — not just the sprint." },
  { icon: "◇", title: "Client Partnership",      desc: "Long-standing relationships aren't a goal — they're the outcome of delivering what we promise. Every time." },
  { icon: "△", title: "Multicultural by Design", desc: "Our team spans continents. That cultural breadth lets us engineer for any market, understand any user." },
  { icon: "○", title: "Transparent Delivery",    desc: "Weekly reporting, open codebases, and honest timelines. No surprises — just progress." },
];

const leadership = [
  {
    name: "Farat Iqbal",
    role: "Founder & Managing Director",
    bio: "Farat brings 10+ years of enterprise IT consulting experience across the Middle East and South Asia, leading MeeramTech and AppInSnap before launching Ivy League Solutions as a unified global brand.",
    initials: "FI",
    tags: ["Enterprise IT", "10+ Years", "Dubai · South Asia"],
  },
  {
    name: "Engineering Team",
    role: "250+ Engineers Globally",
    bio: "Distributed engineering talent spanning South Asia, UAE, and the Gulf region — covering software engineering, infrastructure, AI/ML, UI/UX design, and cybersecurity.",
    initials: "ET",
    tags: ["Software", "Infrastructure", "AI/ML", "UI/UX", "Cybersecurity"],
  },
];

const techPartners = [
  "Oracle", "Microsoft", "AWS", "Azure", "Huawei",
  "Fortinet", "Cisco", "Aruba", "Veeam", "CrowdStrike", "SAP", "VMware",
];

const pillars = [
  { icon: "◈", title: "Custom & Off-the-shelf", desc: "We offer both fully customised builds and best-in-class off-the-shelf implementations — tailored to your timeline and budget." },
  { icon: "✦", title: "End-to-End Ownership",   desc: "From discovery through deployment and post-launch support, we own the full delivery cycle — one accountable partner." },
  { icon: "△", title: "Cross-Vertical Depth",   desc: "Fintech, Healthcare, Logistics, ERP, Academia — 15+ industries means battle-tested patterns, not first-try guesses." },
  { icon: "○", title: "Global Delivery Network", desc: "250+ engineers across UAE and South Asia delivering follow-the-sun support at enterprise scale and competitive rates." },
];

/* ─── Page ──────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="page-hero" style={{ paddingBottom: "clamp(48px,6vw,96px)" }}>
        {/* Rings */}
        <div style={{ position:"absolute", right:-160, top:-160, width:700, height:700, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.06)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:-50,  top:-50,  width:350, height:350, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)",  pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:-80, bottom:-80, width:380, height:380, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.05)", pointerEvents:"none" }} />

        <div className="page-hero-inner">
          <p className="page-eyebrow">About Ivy League Solutions</p>
          <h1 className="page-h1" style={{ maxWidth: 820 }}>
            A Decade of Engineering,<br />
            <em>Redefined for Enterprise</em>
          </h1>
          <p className="page-hero-desc" style={{ marginBottom: 40 }}>
            Ivy League Solutions brings together MeeramTech&apos;s enterprise infrastructure
            expertise and AppInSnap&apos;s product agility — unified under one global brand
            built to deliver at any scale, in any industry.
          </p>
          <div className="page-hero-btns" style={{ marginBottom: 56 }}>
            <Link href="/contact" className="btn-green">Work With Us →</Link>
            <Link href="/solutions" className="btn-white-outline">View Portfolio</Link>
          </div>

          {/* Stats strip */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden", maxWidth:800 }}>
            {stats.map((s) => (
              <div key={s.l} style={{ background:"rgba(255,255,255,0.03)", padding:"20px 16px", textAlign:"center" }}>
                <div style={{ fontSize:"clamp(22px,2.5vw,36px)", fontWeight:700, color:"var(--rs-green)", lineHeight:1, marginBottom:4, fontFamily:"var(--rs-font)" }}>{s.v}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", fontFamily:"var(--rs-font)", marginBottom:2 }}>{s.l}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", fontFamily:"var(--rs-font)" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. MISSION / WHAT WE DO ──────────────────────── */}
      <section className="page-section page-section-white">
        <div className="page-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
            <div>
              <p className="page-sh-label">Our Mission</p>
              <h2 className="page-h2" style={{ marginBottom:20 }}>We Solve <em>Complex Problems</em></h2>
              <p style={{ fontSize:15, color:"rgba(0,0,0,0.6)", lineHeight:1.85, marginBottom:16, fontFamily:"var(--rs-font)" }}>
                We offer both customised and off-the-shelf software solutions, helping SMEs and
                corporate-level clients unlock the opportunities of tomorrow. We build platforms
                that make it easy and efficient to develop and operate real-time applications.
              </p>
              <p style={{ fontSize:15, color:"rgba(0,0,0,0.6)", lineHeight:1.85, fontFamily:"var(--rs-font)", marginBottom:32 }}>
                From Fintech, Transportation, and Healthcare to Retail and beyond — we deliver
                across verticals with long-standing relationships with business-leading vendors.
              </p>
              <Link href="/contact" className="btn-green">Start a Conversation →</Link>
            </div>

            {/* 4 pillar cards */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {pillars.map((p) => (
                <div key={p.title} style={{ background:"var(--rs-gray)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:14, padding:20 }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:"rgba(120,235,84,0.1)", border:"1px solid rgba(120,235,84,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"#3a9e20", marginBottom:12 }}>{p.icon}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"var(--rs-black)", marginBottom:6, fontFamily:"var(--rs-font)" }}>{p.title}</div>
                  <div style={{ fontSize:12, color:"rgba(0,0,0,0.5)", lineHeight:1.65, fontFamily:"var(--rs-font)" }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. TIMELINE ──────────────────────────────────── */}
      <section className="page-section page-section-dark">
        <div className="page-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.8fr", gap:64, alignItems:"start" }}>
            <div style={{ position:"sticky", top:120 }}>
              <p className="page-sh-label">Our Journey</p>
              <h2 className="page-h2 page-h2-light">A Decade of <em>Excellence</em></h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", marginTop:14 }}>
                From a single consultancy in Dubai to a globally-recognised enterprise technology brand.
              </p>
            </div>

            {/* Timeline steps */}
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {timeline.map((item, i) => (
                <div key={item.year} style={{ display:"grid", gridTemplateColumns:"72px 1fr", gap:20, position:"relative" }}>
                  {/* Year + line */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{ width:56, height:56, borderRadius:12, background: i === timeline.length-1 ? "var(--rs-green)" : "rgba(120,235,84,0.1)", border:"1.5px solid rgba(120,235,84,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, zIndex:1 }}>
                      <span style={{ fontSize:11, fontWeight:700, color: i === timeline.length-1 ? "#000" : "var(--rs-green)", fontFamily:"var(--rs-font)", letterSpacing:"0.02em" }}>{item.year}</span>
                    </div>
                    {i < timeline.length-1 && (
                      <div style={{ width:1, flex:1, background:"rgba(255,255,255,0.08)", marginTop:6 }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ paddingBottom: i < timeline.length-1 ? 32 : 0 }}>
                    <div style={{ fontSize:16, fontWeight:600, color:"#fff", marginBottom:6, fontFamily:"var(--rs-font)" }}>{item.title}</div>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.7, fontFamily:"var(--rs-font)" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. VALUES ────────────────────────────────────── */}
      <section className="page-section page-section-gray">
        <div className="page-inner">
          <div style={{ marginBottom:48 }}>
            <p className="page-sh-label">Our Values</p>
            <h2 className="page-h2">The Principles That <em>Guide Us</em></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {values.map((v, i) => (
              <div key={v.title} style={{ background: i % 2 === 0 ? "#000" : "#fff", border: i % 2 === 0 ? "1px solid rgba(120,235,84,0.18)" : "1px solid rgba(0,0,0,0.08)", borderRadius:16, padding:28, display:"flex", flexDirection:"column", gap:14, minHeight:220 }}>
                <div style={{ width:40, height:40, borderRadius:8, background: i%2===0 ? "rgba(120,235,84,0.12)" : "rgba(120,235,84,0.1)", border: i%2===0 ? "1px solid rgba(120,235,84,0.25)" : "1px solid rgba(120,235,84,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color: i%2===0 ? "var(--rs-green)" : "#3a9e20" }}>
                  {v.icon}
                </div>
                <div style={{ fontSize:15, fontWeight:600, color: i%2===0 ? "#fff" : "var(--rs-black)", fontFamily:"var(--rs-font)" }}>{v.title}</div>
                <div style={{ fontSize:13, color: i%2===0 ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)", lineHeight:1.7, fontFamily:"var(--rs-font)", flex:1 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. LEADERSHIP ────────────────────────────────── */}
      <section className="page-section page-section-white">
        <div className="page-inner">
          <div style={{ marginBottom:48 }}>
            <p className="page-sh-label">Leadership</p>
            <h2 className="page-h2">The Team Behind <em>Ivy League</em></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
            {leadership.map((l) => (
              <div key={l.name} style={{ background:"var(--rs-gray)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:20, padding:"clamp(28px,3vw,40px)", display:"flex", flexDirection:"column", gap:20 }}>
                <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ width:56, height:56, borderRadius:12, background:"var(--rs-green)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#000", flexShrink:0, letterSpacing:"0.02em", fontFamily:"var(--rs-font)" }}>
                    {l.initials}
                  </div>
                  <div>
                    <div style={{ fontSize:18, fontWeight:600, color:"var(--rs-black)", marginBottom:3, fontFamily:"var(--rs-font)" }}>{l.name}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:"var(--rs-green)", letterSpacing:"0.08em", textTransform:"uppercase" as const, fontFamily:"var(--rs-font)" }}>{l.role}</div>
                  </div>
                </div>
                <p style={{ fontSize:14, color:"rgba(0,0,0,0.55)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)" }}>{l.bio}</p>
                <div style={{ display:"flex", flexWrap:"wrap" as const, gap:6 }}>
                  {l.tags.map((tag) => (
                    <span key={tag} style={{ fontSize:11, fontWeight:500, padding:"4px 12px", borderRadius:100, background:"rgba(0,0,0,0.05)", color:"rgba(0,0,0,0.5)", border:"1px solid rgba(0,0,0,0.08)", fontFamily:"var(--rs-font)" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TECH PARTNERS ─────────────────────────────── */}
      <section className="page-section page-section-dark">
        <div className="page-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:64, alignItems:"center" }}>
            <div>
              <p className="page-sh-label">Technology Partners</p>
              <h2 className="page-h2 page-h2-light">Trusted by <em>World-Class</em> Vendors</h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", marginTop:14 }}>
                Our engineers hold active certifications across the most in-demand enterprise platforms.
              </p>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap" as const, gap:10 }}>
              {techPartners.map((p) => (
                <span key={p} style={{ fontSize:13, fontWeight:600, padding:"10px 22px", borderRadius:100, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.75)", fontFamily:"var(--rs-font)", letterSpacing:"0.01em" }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA ───────────────────────────────────────── */}
      <section className="page-section page-section-gray">
        <div className="page-inner">
          <div style={{ background:"#000", borderRadius:24, padding:"clamp(48px,5vw,80px) clamp(32px,4.2vw,64px)", display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"center", position:"relative", overflow:"hidden" }}>
            {/* Rings */}
            <div style={{ position:"absolute", right:-80, bottom:-80, width:320, height:320, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:40,  bottom:40,  width:160, height:160, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", left:-40,  top:-40,    width:200, height:200, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.06)", pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1 }}>
              <p className="page-eyebrow">Let&apos;s Build Together</p>
              <h2 style={{ fontSize:"clamp(24px,2.6vw,48px)", fontWeight:500, color:"#fff", lineHeight:1.2, margin:"0 0 12px", fontFamily:"var(--rs-font)" }}>
                Ready to Partner with <em style={{ color:"var(--rs-green)", fontStyle:"normal" }}>Ivy League?</em>
              </h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)", maxWidth:480 }}>
                Let&apos;s discuss your technology challenges and explore how our team can drive measurable results for your organisation.
              </p>
            </div>

            <div style={{ display:"flex", flexDirection:"column" as const, gap:12, flexShrink:0, position:"relative", zIndex:1 }}>
              <Link href="/contact" className="btn-green">Get in Touch →</Link>
              <Link href="/services" className="btn-white-outline" style={{ textAlign:"center" as const }}>Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

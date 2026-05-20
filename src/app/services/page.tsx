"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────────────── */
const dts = [
  { icon:"⬡", id:"software",      title:"Software Development",   desc:"Web, mobile, and enterprise apps from concept to production — built for scale, security, and long-term maintainability.", tech:["React","Next.js","Node.js","Python",".NET"],           featured:true  },
  { icon:"✦", id:"ai",            title:"AI & Machine Learning",  desc:"Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation at enterprise scale.", tech:["LLMs","MLOps","Fintech AI","Health AI"],            featured:true  },
  { icon:"◈", id:"commerce",      title:"Digital Commerce",       desc:"Custom storefronts, PIM, and payment integrations that scale from startup to enterprise.",                               tech:["Shopify","WooCommerce","Custom","PIM"],             featured:false },
  { icon:"◇", id:"modernize",     title:"App Modernization",      desc:"Legacy to cloud-native migration and re-architecture — zero downtime, full data continuity.",                            tech:["Microservices","Docker","Kubernetes","Cloud-native"],featured:false },
  { icon:"△", id:"uiux",          title:"UI/UX Design",           desc:"Design systems, prototyping, user research and brand identity — from wireframe to pixel-perfect delivery.",              tech:["Figma","Design Systems","Prototyping","Research"],   featured:false },
  { icon:"✦", id:"erp",           title:"ERP Solutions",          desc:"Customised ERP for SMEs and enterprise organisations — Microsoft NAV, SAP, Oracle, and fully custom builds.",            tech:["Microsoft NAV","SAP","Oracle","Custom ERP"],        featured:false },
  { icon:"◎", id:"banking",       title:"Mobile Banking",         desc:"FINTRAC-compliant mobile payment and banking platforms built for regulated financial environments.",                     tech:["React Native","iOS","Android","Payment APIs"],       featured:false },
  { icon:"○", id:"web",           title:"Web & Full Stack",       desc:"End-to-end web development, APIs, and backend services — architected for performance and reliability.",                  tech:["React","Vue","PostgreSQL","MongoDB"],               featured:false },
  { icon:"⬟", id:"health",        title:"Health Solutions",       desc:"HIPAA-compliant healthcare platforms and EHR integrations that improve patient outcomes.",                               tech:["FHIR","HL7","HIPAA","EHR"],                         featured:false },
  { icon:"◫", id:"academia",      title:"Academia Solutions",     desc:"LMS, adaptive testing, and institutional management — built for universities and EdTech startups.",                     tech:["LMS","SCORM","AI Tutoring","Analytics"],            featured:false },
  { icon:"◉", id:"cybersecurity", title:"Cybersecurity & SOC",    desc:"24/7 threat monitoring, penetration testing, compliance automation and incident response.",                              tech:["SOC","Fortinet","Zero Trust","SIEM"],               featured:false },
  { icon:"◐", id:"cloud-dev",     title:"Cloud & DevOps",         desc:"CI/CD pipelines, containerisation, infrastructure-as-code and multi-cloud deployments.",                                tech:["AWS","Docker","Kubernetes","Terraform"],            featured:false },
];

const dis = [
  { icon:"⟁", id:"network",    title:"Network Services",        desc:"Cisco, Aruba, Huawei certified network design, deployment, and managed services across campus, WAN, and SD-WAN.", tech:["Cisco","Aruba","Huawei","SD-WAN"]          },
  { icon:"◻", id:"virtual",    title:"Virtualisation",          desc:"VMware, Hyper-V, and cloud virtualisation solutions — reduce hardware costs while increasing workload agility.",  tech:["VMware","Hyper-V","KVM","Nutanix"]         },
  { icon:"⊡", id:"datacenter", title:"Datacenter Services",     desc:"Onsite, colocation, hyperscale and edge datacenters — designed, built and managed to enterprise SLAs.",         tech:["Co-location","Edge DC","Hyperscale"]       },
  { icon:"⊕", id:"enterprise", title:"Enterprise Applications", desc:"EAI, iPaaS, MuleSoft and Azure Integration — connecting disparate systems into a unified data fabric.",          tech:["EAI","iPaaS","MuleSoft","Azure"]           },
  { icon:"⊗", id:"database",   title:"Database Services",       desc:"Oracle, SQL Server, PostgreSQL — managed services covering design, migration, optimisation, and HA/DR.",        tech:["Oracle","SQL Server","PostgreSQL","MongoDB"]},
  { icon:"⊙", id:"cloud",      title:"Cloud Services",          desc:"Multi-cloud strategy, migration, and managed operations across AWS, Azure, GCP and private cloud.",             tech:["AWS","Azure","GCP","Private Cloud"]        },
  { icon:"⊘", id:"security",   title:"Security Services",       desc:"Fortinet, Zero Trust architecture, vulnerability assessments, and ongoing security posture management.",        tech:["Fortinet","CrowdStrike","Zero Trust","SIEM"]},
  { icon:"⊛", id:"noc",        title:"NOC / SOC",               desc:"24/7 network and security operations — proactive monitoring, rapid incident response, and compliance.",         tech:["24/7 Monitoring","SIEM","SOAR","Threat Intel"]},
  { icon:"⊝", id:"backup",     title:"Backup & DR",             desc:"Veeam, Zerto — meet your RPO/RTO commitments with tested, automated backup and disaster recovery.",            tech:["Veeam","Zerto","Cloud DR","BCP"]           },
];

const stats = [
  { v:"21",   l:"Service Lines"       },
  { v:"200+", l:"Projects Delivered"  },
  { v:"15+",  l:"Industries Served"   },
  { v:"250+", l:"Engineers Globally"  },
];

const partners = ["AWS","Microsoft","Oracle","Cisco","Huawei","Fortinet","VMware","SAP","Aruba","Veeam","CrowdStrike","Azure"];

const engagementSteps = [
  { n:"01", t:"Discovery Call",        d:"30-minute scoping session with a senior consultant. We define scope, constraints, and success criteria before writing a single line of code." },
  { n:"02", t:"Proposal & Team Match", d:"We propose the right service mix, assemble a named team, and present a fixed or T&M engagement model — your choice." },
  { n:"03", t:"Agile Delivery",        d:"2-week sprints with demos, code reviews, and transparent progress tracking. You have full visibility at every stage." },
  { n:"04", t:"Launch & Support",      d:"Production deployment with SLA-backed post-launch support — monitoring, incident response, and ongoing optimisation." },
];

const whyUs = [
  { icon:"◈", title:"Enterprise-First Architecture",  desc:"Every solution is designed for scale, security, and long-term maintainability from day one — not bolted on later.", dark:true  },
  { icon:"◇", title:"Embedded Named Teams",           desc:"You get named engineers, a project manager, and a QA lead who integrate with your team and understand your domain.",   dark:false },
  { icon:"△", title:"Outcome-Based Delivery",         desc:"We measure success by business outcomes — accuracy rates, uptime SLAs, cost reductions — not just delivery dates.",   dark:false },
  { icon:"○", title:"Cross-Vertical Experience",      desc:"15+ industries means we bring proven patterns from Fintech, Healthcare, Logistics, and beyond to every engagement.",    dark:true  },
  { icon:"✦", title:"Full-Stack Capability",          desc:"Software, AI, infrastructure, security and ERP — one accountable partner for the entire technology stack.",             dark:false },
  { icon:"⬟", title:"Global Delivery Network",        desc:"250+ engineers across South Asia, UAE, and the Gulf — follow-the-sun delivery at competitive rates.",                   dark:true  },
];

/* ─── Page ──────────────────────────────────────────────── */
export default function ServicesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const featured = dts.filter((s) => s.featured);
  const regular  = dts.filter((s) => !s.featured);

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="page-hero" style={{ paddingBottom:"clamp(48px,6vw,96px)" }}>
        <div style={{ position:"absolute", right:-160, top:-160, width:720, height:720, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.06)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:-50,  top:-50,  width:360, height:360, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)",  pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:-60, bottom:-60, width:300, height:300, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.05)", pointerEvents:"none" }} />

        <div className="page-hero-inner">
          <p className="page-eyebrow">Our Services</p>
          <h1 className="page-h1" style={{ maxWidth:780 }}>
            Full-Spectrum <em>IT Services</em><br />Built for Enterprise
          </h1>
          <p className="page-hero-desc" style={{ marginBottom:40 }}>
            From digital transformation to infrastructure modernisation — 21 service lines
            covering every layer of the enterprise technology stack.
          </p>
          <div className="page-hero-btns" style={{ marginBottom:56 }}>
            <Link href="/contact" className="btn-green">Request a Consultation →</Link>
            <Link href="/solutions" className="btn-white-outline">See Our Work</Link>
          </div>

          {/* Stats strip */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden", maxWidth:760 }}>
            {stats.map((s) => (
              <div key={s.l} style={{ background:"rgba(255,255,255,0.03)", padding:"20px 16px", textAlign:"center" }}>
                <div style={{ fontSize:"clamp(22px,2.5vw,36px)", fontWeight:700, color:"var(--rs-green)", lineHeight:1, marginBottom:6, fontFamily:"var(--rs-font)" }}>{s.v}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", fontFamily:"var(--rs-font)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. DIGITAL TECHNOLOGICAL SERVICES ────────────── */}
      <section className="page-section page-section-white">
        <div className="page-inner">
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:40, gap:20, flexWrap:"wrap" }}>
            <div>
              <p className="page-sh-label">Digital Technological Services</p>
              <h2 className="page-h2" style={{ margin:0 }}>Software & <em>Digital Innovation</em></h2>
            </div>
            <span style={{ fontSize:13, color:"rgba(0,0,0,0.35)", fontFamily:"var(--rs-font)" }}>12 services</span>
          </div>

          {/* Featured two — bento top row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
            {featured.map((s, i) => (
              <div key={s.id} id={s.id} style={{ background: i===0 ? "#000" : "var(--rs-gray)", border: i===0 ? "1px solid rgba(120,235,84,0.2)" : "1px solid rgba(0,0,0,0.07)", borderRadius:20, padding:"clamp(28px,3vw,44px)", position:"relative", overflow:"hidden", minHeight:280, display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ position:"absolute", right:20, bottom:20, fontSize:110, opacity: i===0 ? 0.05 : 0.06, color: i===0 ? "#78EB54" : "#000", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>{s.icon}</div>
                <div style={{ width:44, height:44, borderRadius:10, background: i===0 ? "rgba(120,235,84,0.12)" : "rgba(0,0,0,0.07)", border: i===0 ? "1px solid rgba(120,235,84,0.25)" : "1px solid rgba(0,0,0,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color: i===0 ? "var(--rs-green)" : "rgba(0,0,0,0.55)" }}>{s.icon}</div>
                <div>
                  <h3 style={{ fontSize:"clamp(20px,1.875vw,30px)", fontWeight:600, color: i===0 ? "#fff" : "var(--rs-black)", margin:"0 0 10px", fontFamily:"var(--rs-font)", lineHeight:1.2 }}>{s.title}</h3>
                  <p style={{ fontSize:13, color: i===0 ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)" }}>{s.desc}</p>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap" as const, gap:5, marginTop:"auto" }}>
                  {s.tech.map((t) => <span key={t} style={{ fontSize:10, padding:"3px 9px", borderRadius:4, background: i===0 ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)", color: i===0 ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)", border:`1px solid ${i===0 ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, fontFamily:"var(--rs-font)" }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Regular grid — 4 cols */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {regular.map((s) => (
              <SmallCard key={s.id} s={s} hovered={hoveredCard===s.id} onEnter={()=>setHoveredCard(s.id)} onLeave={()=>setHoveredCard(null)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DIGITAL INFRASTRUCTURE SERVICES ──────────── */}
      <section className="page-section page-section-gray">
        <div className="page-inner">
          <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:56, alignItems:"start" }}>
            <div style={{ position:"sticky", top:120 }}>
              <p className="page-sh-label">Digital Infrastructure Services</p>
              <h2 className="page-h2">Infrastructure &amp;<br /><em>Operations</em></h2>
              <p style={{ fontSize:13, color:"rgba(0,0,0,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", margin:"14px 0 28px" }}>
                Enterprise-grade infrastructure services backed by global vendor certifications — from network design to 24/7 NOC/SOC.
              </p>
              <Link href="/contact" className="btn-green">Get a Quote →</Link>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              {dis.map((s) => (
                <SmallCard key={s.id} s={s} hovered={hoveredCard===s.id} onEnter={()=>setHoveredCard(s.id)} onLeave={()=>setHoveredCard(null)} bg="#fff" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ENGAGEMENT MODEL ──────────────────────────── */}
      <section className="page-section page-section-dark">
        <div className="page-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.8fr", gap:64, alignItems:"start" }}>
            <div style={{ position:"sticky", top:120 }}>
              <p className="page-sh-label">How We Engage</p>
              <h2 className="page-h2 page-h2-light">From Brief to <em>Live in 4 Steps</em></h2>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", margin:"14px 0 28px" }}>
                A transparent, repeatable delivery model — no surprises, just progress at every milestone.
              </p>
              <Link href="/contact" className="btn-green">Start a Project →</Link>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {engagementSteps.map((step, i) => (
                <div key={step.n} style={{ display:"grid", gridTemplateColumns:"56px 1fr", gap:20, position:"relative" }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{ width:48, height:48, borderRadius:12, background: i===0 ? "var(--rs-green)" : "rgba(120,235,84,0.08)", border:"1.5px solid rgba(120,235,84,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, zIndex:1 }}>
                      <span style={{ fontSize:11, fontWeight:700, color: i===0 ? "#000" : "var(--rs-green)", fontFamily:"var(--rs-font)" }}>{step.n}</span>
                    </div>
                    {i < engagementSteps.length-1 && <div style={{ width:1, flex:1, background:"rgba(255,255,255,0.08)", marginTop:6 }} />}
                  </div>
                  <div style={{ paddingBottom: i < engagementSteps.length-1 ? 28 : 0 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:"#fff", marginBottom:6, fontFamily:"var(--rs-font)" }}>{step.t}</div>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.7, fontFamily:"var(--rs-font)" }}>{step.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHY ILS ───────────────────────────────────── */}
      <section className="page-section page-section-white">
        <div className="page-inner">
          <div style={{ marginBottom:48 }}>
            <p className="page-sh-label">Why Ivy League Solutions</p>
            <h2 className="page-h2">The Difference Is in <em>How We Deliver</em></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {whyUs.map((w) => (
              <div key={w.title} style={{ background: w.dark ? "#000" : "var(--rs-gray)", border: w.dark ? "1px solid rgba(120,235,84,0.15)" : "1px solid rgba(0,0,0,0.07)", borderRadius:16, padding:"clamp(24px,2.5vw,32px)", display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:8, background: w.dark ? "rgba(120,235,84,0.12)" : "rgba(120,235,84,0.1)", border: w.dark ? "1px solid rgba(120,235,84,0.25)" : "1px solid rgba(120,235,84,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color: w.dark ? "var(--rs-green)" : "#3a9e20" }}>{w.icon}</div>
                <div style={{ fontSize:14, fontWeight:600, color: w.dark ? "#fff" : "var(--rs-black)", fontFamily:"var(--rs-font)" }}>{w.title}</div>
                <div style={{ fontSize:13, color: w.dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)", lineHeight:1.7, fontFamily:"var(--rs-font)" }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PARTNERS ──────────────────────────────────── */}
      <section className="page-section page-section-gray">
        <div className="page-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:64, alignItems:"center" }}>
            <div>
              <p className="page-sh-label">Certified Partners</p>
              <h2 className="page-h2">Backed by <em>World-Class</em> Vendors</h2>
              <p style={{ fontSize:13, color:"rgba(0,0,0,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", marginTop:12 }}>
                Active certifications across every major enterprise platform — delivered by engineers who live and breathe these stacks.
              </p>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap" as const, gap:10 }}>
              {partners.map((p) => (
                <span key={p} style={{ fontSize:13, fontWeight:600, padding:"10px 22px", borderRadius:100, background:"#fff", border:"1px solid rgba(0,0,0,0.08)", color:"rgba(0,0,0,0.65)", fontFamily:"var(--rs-font)", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA ───────────────────────────────────────── */}
      <section className="page-section page-section-white">
        <div className="page-inner">
          <div style={{ background:"#000", borderRadius:24, padding:"clamp(48px,5vw,80px) clamp(32px,4.2vw,64px)", display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", right:-80, bottom:-80, width:320, height:320, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:40,  bottom:40,  width:160, height:160, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", left:-40,  top:-40,    width:200, height:200, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.06)", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <p className="page-eyebrow">Let&apos;s Build Together</p>
              <h2 style={{ fontSize:"clamp(24px,2.6vw,48px)", fontWeight:500, color:"#fff", lineHeight:1.2, margin:"0 0 12px", fontFamily:"var(--rs-font)" }}>
                Need a Custom <em style={{ color:"var(--rs-green)", fontStyle:"normal" }}>Service Bundle?</em>
              </h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)", maxWidth:480 }}>
                Tell us your challenge and we&apos;ll assemble the right team and service mix for your organisation.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column" as const, gap:12, flexShrink:0, position:"relative", zIndex:1 }}>
              <Link href="/contact" className="btn-green">Request a Consultation →</Link>
              <Link href="/solutions" className="btn-white-outline" style={{ textAlign:"center" as const }}>View Portfolio</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── SmallCard ─────────────────────────────────────────── */
function SmallCard({
  s, hovered, onEnter, onLeave, bg = "var(--rs-gray)",
}: {
  s: { id: string; icon: string; title: string; desc: string; tech: string[] };
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  bg?: string;
}) {
  return (
    <div
      id={s.id}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background:    hovered ? "#fff" : bg,
        border:        hovered ? "1px solid rgba(120,235,84,0.4)" : "1px solid rgba(0,0,0,0.07)",
        borderRadius:  14,
        padding:       20,
        display:       "flex",
        flexDirection: "column" as const,
        gap:           10,
        transition:    "all 0.2s",
        boxShadow:     hovered ? "0 8px 28px rgba(0,0,0,0.08)" : "none",
        transform:     hovered ? "translateY(-2px)" : "translateY(0)",
        cursor:        "default",
      }}
    >
      <div style={{ width:36, height:36, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0, transition:"all 0.2s", background: hovered ? "rgba(120,235,84,0.12)" : "rgba(0,0,0,0.05)", border: hovered ? "1px solid rgba(120,235,84,0.25)" : "1px solid rgba(0,0,0,0.07)", color: hovered ? "#3a9e20" : "rgba(0,0,0,0.5)" }}>
        {s.icon}
      </div>
      <div style={{ fontSize:13, fontWeight:600, color:"var(--rs-black)", fontFamily:"var(--rs-font)", lineHeight:1.3 }}>{s.title}</div>
      <div style={{ fontSize:11, color:"rgba(0,0,0,0.5)", lineHeight:1.6, fontFamily:"var(--rs-font)", flex:1 }}>{s.desc}</div>
      <div style={{ display:"flex", flexWrap:"wrap" as const, gap:4, paddingTop:6, borderTop:"1px solid rgba(0,0,0,0.05)" }}>
        {s.tech.map((t) => (
          <span key={t} style={{ fontSize:9, padding:"2px 7px", borderRadius:4, background:"rgba(0,0,0,0.04)", color:"rgba(0,0,0,0.4)", border:"1px solid rgba(0,0,0,0.07)", fontFamily:"var(--rs-font)" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

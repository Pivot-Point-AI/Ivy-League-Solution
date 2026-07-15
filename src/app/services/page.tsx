"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SharedNav, SharedFooter } from "@/components/SharedNav";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

/* Consistent SVG icons — same size and stroke style for every card */
const Icon = {
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  brain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0"/><path d="M12 2v4"/><ellipse cx="12" cy="11" rx="7" ry="5"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M8 17v4"/><path d="M16 17v4"/>
    </svg>
  ),
  cart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  refresh: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
    </svg>
  ),
  pen: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  layers: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  smartphone: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  heart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.52 2 2 0 0 1 3.6 1.35h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
    </svg>
  ),
  book: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  cloud: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  ),
  network: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"/><line x1="12" y1="14" x2="12" y2="16"/>
    </svg>
  ),
  server: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  database: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  harddrive: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/>
    </svg>
  ),
};

const SERVICES = [
  { icon: Icon.code,       id: "software",      title: "Software Development",  desc: "Web, mobile, and enterprise apps from concept to production — built for scale, security, and long-term maintainability.", tech: ["React","Next.js","Node.js","Python",".NET"],            cat: "Software & Digital" },
  { icon: Icon.brain,      id: "ai",            title: "AI & Machine Learning", desc: "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation at enterprise scale.", tech: ["LLMs","MLOps","Fintech AI","Health AI"],             cat: "Software & Digital" },
  { icon: Icon.cart,       id: "commerce",      title: "Digital Commerce",      desc: "Custom storefronts, PIM, and payment integrations that scale from startup to enterprise.",                                tech: ["Shopify","WooCommerce","Custom","PIM"],              cat: "Software & Digital" },
  { icon: Icon.refresh,    id: "modernize",     title: "App Modernization",     desc: "Legacy to cloud-native migration and re-architecture — zero downtime, full data continuity.",                             tech: ["Microservices","Docker","Kubernetes","Cloud-native"], cat: "Software & Digital" },
  { icon: Icon.pen,        id: "uiux",          title: "UI/UX Design",          desc: "Design systems, prototyping, user research and brand identity — from wireframe to pixel-perfect delivery.",               tech: ["Figma","Design Systems","Prototyping","Research"],    cat: "Software & Digital" },
  { icon: Icon.layers,     id: "erp",           title: "ERP Solutions",         desc: "Customised ERP for SMEs and enterprise organisations — Microsoft NAV, SAP, Oracle, and fully custom builds.",             tech: ["Microsoft NAV","SAP","Oracle","Custom ERP"],          cat: "Software & Digital" },
  { icon: Icon.smartphone, id: "banking",       title: "Mobile Banking",        desc: "FINTRAC-compliant mobile payment and banking platforms built for regulated financial environments.",                      tech: ["React Native","iOS","Android","Payment APIs"],         cat: "Software & Digital" },
  { icon: Icon.globe,      id: "web",           title: "Web & Full Stack",      desc: "End-to-end web development, APIs, and backend services — architected for performance and reliability.",                   tech: ["React","Vue","PostgreSQL","MongoDB"],                  cat: "Software & Digital" },
  { icon: Icon.heart,      id: "health",        title: "Health Solutions",      desc: "HIPAA-compliant healthcare platforms and EHR integrations that improve patient outcomes.",                                tech: ["FHIR","HL7","HIPAA","EHR"],                           cat: "Software & Digital" },
  { icon: Icon.book,       id: "academia",      title: "Academia Solutions",    desc: "LMS, adaptive testing, and institutional management — built for universities and EdTech startups.",                      tech: ["LMS","SCORM","AI Tutoring","Analytics"],               cat: "Software & Digital" },
  { icon: Icon.shield,     id: "cybersecurity", title: "Cybersecurity & SOC",   desc: "24/7 threat monitoring, penetration testing, compliance automation and incident response.",                               tech: ["SOC","Fortinet","Zero Trust","SIEM"],                  cat: "Infrastructure" },
  { icon: Icon.cloud,      id: "cloud",         title: "Cloud & DevOps",        desc: "CI/CD pipelines, containerisation, infrastructure-as-code and multi-cloud deployments.",                                 tech: ["AWS","Docker","Kubernetes","Terraform"],               cat: "Infrastructure" },
  { icon: Icon.network,    id: "network",       title: "Network Services",      desc: "Certified design, deployment, and managed services across campus, WAN, and SD-WAN architectures.",                       tech: ["Cisco","SD-WAN","WAN","Campus"],                       cat: "Infrastructure" },
  { icon: Icon.server,     id: "datacenter",    title: "Datacenter Services",   desc: "Onsite, colocation, hyperscale, and edge datacenter design, construction, and enterprise SLA management.",               tech: ["Colocation","Edge","Hyperscale","SLA"],                cat: "Infrastructure" },
  { icon: Icon.database,   id: "database",      title: "Database Services",     desc: "Managed services for Oracle, SQL Server, PostgreSQL covering design, migration, optimisation, and HA/DR.",               tech: ["Oracle","SQL Server","PostgreSQL","HA/DR"],            cat: "Infrastructure" },
  { icon: Icon.harddrive,  id: "backup",        title: "Backup & DR",           desc: "Veeam and Zerto solutions ensuring RPO/RTO commitments through tested, automated backup and disaster recovery.",          tech: ["Veeam","Zerto","RPO/RTO","DR"],                        cat: "Infrastructure" },
];

const CATS = ["All", "Software & Digital", "Infrastructure"];

export default function ServicesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? SERVICES : SERVICES.filter(s => s.cat === active);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#050814 0%,#0a0e1f 35%,#0f1b2e 65%,#22d3ee 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#22d3ee,transparent 70%)" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>What We Build</motion.p>
            <motion.h1 {...fade(0.1)} className="text-white font-bold mb-5" style={{ fontSize: "clamp(36px,4vw,58px)", letterSpacing: "-1px", lineHeight: 1.1 }}>
              Enterprise Solutions Across Every Layer of Technology
            </motion.h1>
            <motion.p {...fade(0.2)} className="text-white/70 leading-relaxed mb-8" style={{ fontSize: 16, maxWidth: 540 }}>
              From AI-powered applications to hardened network infrastructure — we engineer technology that performs at enterprise scale.
            </motion.p>
            <motion.div {...fade(0.3)} className="flex flex-wrap gap-3">
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="text-white font-semibold rounded-full" style={{ height: 52, paddingInline: 36, fontSize: 15, background: "linear-gradient(135deg,#22d3ee,#22d3ee)", boxShadow: "0 8px 24px rgba(34,211,238,0.5)", border: "none", cursor: "pointer" }}>Build Your Solution</motion.button>
              </Link>
              <Link href="/contact">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="text-white font-semibold rounded-full" style={{ height: 52, paddingInline: 36, fontSize: 15, background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>Talk to an Expert</motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Highlight cards — fill empty space on the right */}
          <motion.div {...fade(0.25)} className="hidden lg:grid grid-cols-2 gap-5">
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(12px)" }}>
              <p className="text-white font-extrabold" style={{ fontSize: 34 }}>16</p>
              <p className="text-white/60 font-medium mb-4" style={{ fontSize: 13 }}>Service Areas Covered</p>
              <div className="flex flex-wrap gap-2">
                {["Software","AI/ML","Cloud"].map(t => (
                  <span key={t} className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6 mt-8" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(12px)" }}>
              <p className="text-white font-extrabold" style={{ fontSize: 34 }}>24/7</p>
              <p className="text-white/60 font-medium mb-4" style={{ fontSize: 13 }}>Support &amp; Monitoring</p>
              <div className="flex flex-wrap gap-2">
                {["SOC","DevOps","SRE"].map(t => (
                  <span key={t} className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="flex flex-wrap gap-2 mb-12">
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className="px-5 py-2 rounded-full font-semibold text-sm transition-all"
                style={{ background: active === c ? "linear-gradient(135deg,#22d3ee,#22d3ee)" : "#fff", color: active === c ? "#fff" : "#64748B", border: active === c ? "none" : "1.5px solid #E2E8F0", boxShadow: active === c ? "0 4px 16px rgba(34,211,238,0.3)" : "none", cursor: "pointer" }}>
                {c}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((svc, i) => (
              <motion.div key={svc.id} {...fade(i * 0.04)}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(15,23,42,0.12)" }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-7 flex flex-col"
                style={{ boxShadow: "0 2px 16px rgba(15,23,42,0.07)", border: "1px solid #F1F5F9" }}
              >
                {/* Consistent icon container */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0" style={{ background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)" }}>
                  {svc.icon}
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 18 }}>{svc.title}</h3>
                <p className="text-[#64748B] leading-relaxed flex-1 mb-5" style={{ fontSize: 14 }}>{svc.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {svc.tech.map(t => <span key={t} className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: "#EEF2FF", color: "#22d3ee" }}>{t}</span>)}
                </div>
                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-auto">
                  <Link href={`/services/${svc.id}`} className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="w-full font-semibold rounded-full text-white flex items-center justify-center gap-2"
                      style={{ height: 42, fontSize: 13, background: "linear-gradient(135deg,#22d3ee,#2060FF)", border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(34,211,238,0.3)" }}
                    >
                      Learn More
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="font-semibold rounded-full"
                      style={{ height: 42, paddingInline: 18, fontSize: 13, background: "#fff", color: "#22d3ee", border: "1.5px solid #22d3ee", cursor: "pointer" }}
                    >
                      Contact Us
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(135deg,#050814 0%,#0a0e1f 40%,#22d3ee 100%)" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <motion.h2 {...fade()} className="text-white font-bold mb-4" style={{ fontSize: "clamp(28px,3vw,42px)", letterSpacing: "-0.5px" }}>Ready to Build Something Extraordinary?</motion.h2>
          <motion.p {...fade(0.1)} className="text-white/70 mb-8 mx-auto" style={{ fontSize: 16, maxWidth: 460 }}>Let&apos;s scope your project and match you with the right team.</motion.p>
          <motion.div {...fade(0.2)} className="flex justify-center">
            <Link href="/contact"><motion.button whileHover={{ scale: 1.04 }} className="font-semibold rounded-full" style={{ height: 52, paddingInline: 40, fontSize: 15, background: "#fff", color: "#0F172A", border: "none", cursor: "pointer" }}>Start a Project</motion.button></Link>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}

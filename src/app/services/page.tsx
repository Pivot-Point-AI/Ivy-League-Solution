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

const SERVICES = [
  { icon: "⬡", id: "software",      title: "Software Development",  desc: "Web, mobile, and enterprise apps from concept to production — built for scale, security, and long-term maintainability.", tech: ["React","Next.js","Node.js","Python",".NET"],            cat: "Software & Digital" },
  { icon: "✦", id: "ai",            title: "AI & Machine Learning", desc: "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation at enterprise scale.", tech: ["LLMs","MLOps","Fintech AI","Health AI"],             cat: "Software & Digital" },
  { icon: "◈", id: "commerce",      title: "Digital Commerce",      desc: "Custom storefronts, PIM, and payment integrations that scale from startup to enterprise.",                                tech: ["Shopify","WooCommerce","Custom","PIM"],              cat: "Software & Digital" },
  { icon: "◇", id: "modernize",     title: "App Modernization",     desc: "Legacy to cloud-native migration and re-architecture — zero downtime, full data continuity.",                             tech: ["Microservices","Docker","Kubernetes","Cloud-native"], cat: "Software & Digital" },
  { icon: "△", id: "uiux",          title: "UI/UX Design",          desc: "Design systems, prototyping, user research and brand identity — from wireframe to pixel-perfect delivery.",               tech: ["Figma","Design Systems","Prototyping","Research"],    cat: "Software & Digital" },
  { icon: "✦", id: "erp",           title: "ERP Solutions",         desc: "Customised ERP for SMEs and enterprise organisations — Microsoft NAV, SAP, Oracle, and fully custom builds.",             tech: ["Microsoft NAV","SAP","Oracle","Custom ERP"],          cat: "Software & Digital" },
  { icon: "◎", id: "banking",       title: "Mobile Banking",        desc: "FINTRAC-compliant mobile payment and banking platforms built for regulated financial environments.",                      tech: ["React Native","iOS","Android","Payment APIs"],         cat: "Software & Digital" },
  { icon: "○", id: "web",           title: "Web & Full Stack",      desc: "End-to-end web development, APIs, and backend services — architected for performance and reliability.",                   tech: ["React","Vue","PostgreSQL","MongoDB"],                  cat: "Software & Digital" },
  { icon: "⬟", id: "health",        title: "Health Solutions",      desc: "HIPAA-compliant healthcare platforms and EHR integrations that improve patient outcomes.",                                tech: ["FHIR","HL7","HIPAA","EHR"],                           cat: "Software & Digital" },
  { icon: "◫", id: "academia",      title: "Academia Solutions",    desc: "LMS, adaptive testing, and institutional management — built for universities and EdTech startups.",                      tech: ["LMS","SCORM","AI Tutoring","Analytics"],               cat: "Software & Digital" },
  { icon: "◉", id: "cybersecurity", title: "Cybersecurity & SOC",   desc: "24/7 threat monitoring, penetration testing, compliance automation and incident response.",                               tech: ["SOC","Fortinet","Zero Trust","SIEM"],                  cat: "Infrastructure" },
  { icon: "◐", id: "cloud",         title: "Cloud & DevOps",        desc: "CI/CD pipelines, containerisation, infrastructure-as-code and multi-cloud deployments.",                                 tech: ["AWS","Docker","Kubernetes","Terraform"],               cat: "Infrastructure" },
  { icon: "◑", id: "network",       title: "Network Services",      desc: "Certified design, deployment, and managed services across campus, WAN, and SD-WAN architectures.",                       tech: ["Cisco","SD-WAN","WAN","Campus"],                       cat: "Infrastructure" },
  { icon: "▣", id: "datacenter",    title: "Datacenter Services",   desc: "Onsite, colocation, hyperscale, and edge datacenter design, construction, and enterprise SLA management.",               tech: ["Colocation","Edge","Hyperscale","SLA"],                cat: "Infrastructure" },
  { icon: "◬", id: "database",      title: "Database Services",     desc: "Managed services for Oracle, SQL Server, PostgreSQL covering design, migration, optimisation, and HA/DR.",               tech: ["Oracle","SQL Server","PostgreSQL","HA/DR"],            cat: "Infrastructure" },
  { icon: "▲", id: "backup",        title: "Backup & DR",           desc: "Veeam and Zerto solutions ensuring RPO/RTO commitments through tested, automated backup and disaster recovery.",          tech: ["Veeam","Zerto","RPO/RTO","DR"],                        cat: "Infrastructure" },
];

const CATS = ["All", "Software & Digital", "Infrastructure"];

export default function ServicesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? SERVICES : SERVICES.filter(s => s.cat === active);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#60a5fa,transparent 70%)" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>What We Build</motion.p>
          <motion.h1 {...fade(0.1)} className="text-white font-bold mb-5" style={{ fontSize: "clamp(36px,4vw,58px)", letterSpacing: "-1px", lineHeight: 1.1, maxWidth: 680 }}>
            Enterprise Solutions Across Every Layer of Technology
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-white/70 leading-relaxed mb-8" style={{ fontSize: 16, maxWidth: 540 }}>
            From AI-powered applications to hardened network infrastructure — we engineer technology that performs at enterprise scale.
          </motion.p>
          <motion.div {...fade(0.3)} className="flex flex-wrap gap-3">
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="text-white font-semibold rounded-full" style={{ height: 52, paddingInline: 36, fontSize: 15, background: "linear-gradient(135deg,#2F6BFF,#2563FF)", boxShadow: "0 8px 24px rgba(37,99,255,0.5)", border: "none", cursor: "pointer" }}>Build Your Solution</motion.button>
            </Link>
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="text-white font-semibold rounded-full" style={{ height: 52, paddingInline: 36, fontSize: 15, background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>Talk to an Expert</motion.button>
            </Link>
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
                style={{ background: active === c ? "linear-gradient(135deg,#2F6BFF,#2563FF)" : "#fff", color: active === c ? "#fff" : "#64748B", border: active === c ? "none" : "1.5px solid #E2E8F0", boxShadow: active === c ? "0 4px 16px rgba(37,99,255,0.3)" : "none", cursor: "pointer" }}>
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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl" style={{ background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)" }}>{svc.icon}</div>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 18 }}>{svc.title}</h3>
                <p className="text-[#64748B] leading-relaxed flex-1 mb-5" style={{ fontSize: 14 }}>{svc.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {svc.tech.map(t => <span key={t} className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: "#EEF2FF", color: "#2563FF" }}>{t}</span>)}
                </div>
                <Link href="/contact" className="flex items-center gap-1 font-semibold text-sm" style={{ color: "#2563FF" }}>
                  Learn More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 40%,#2563FF 100%)" }}>
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

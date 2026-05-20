"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SharedNav, SharedFooter } from "@/components/SharedNav";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

const PROJECTS = [
  { cat: "Fintech",        num: "01", client: "MidWest Capital Partners",     title: "Neural Credit Risk Engine",       desc: "Multi-layer neural model trained on 7 years of transaction data. Predicts default risk with 94.2% accuracy — deployed in under 30 days.",                        outcomes: ["94.2% accuracy","8s processing time","31% loss reduction"],    tech: ["Python","TensorFlow","AWS","MLOps"],              metric: "94.2%", metricLabel: "Accuracy",   icon: "◈" },
  { cat: "Healthcare",     num: "02", client: "Regional Health Network",       title: "Clinical Documentation AI",       desc: "HIPAA-compliant ambient documentation using speech AI and LLMs, cutting clinician admin burden by 60% across 3 hospital sites.",                            outcomes: ["60% time reduction","HIPAA compliant","28% readmission drop"], tech: ["Python","OpenAI","FHIR","Azure"],                 metric: "60%",   metricLabel: "Time Saved", icon: "◇" },
  { cat: "Infrastructure", num: "03", client: "Emaco Facility, UAE",           title: "Oracle DB Configuration",         desc: "Enterprise database and SQL services across multiple UAE sites, delivering 99.9% uptime with 50% query optimisation.",                                       outcomes: ["99.9% uptime SLA","50% query optimisation"],                  tech: ["Oracle DB","SQL","Linux"],                        metric: "99.9%", metricLabel: "Uptime",     icon: "⊡" },
  { cat: "ERP",            num: "04", client: "Bisha Mining",                  title: "Microsoft NAV ERP",               desc: "Full NAV ERP deployment, customisation and integration for a large-scale mining operation across multiple sites.",                                           outcomes: ["Full NAV deployment","Custom mining modules"],                 tech: ["Microsoft NAV","Dynamics 365"],                  metric: "100%",  metricLabel: "On-Time",    icon: "⬟" },
  { cat: "Infrastructure", num: "05", client: "Al Nahla Technologies, Oman",   title: "Huawei iMaster Campus",           desc: "50-site campus network with 2 core switches, 12 access switches and 36 APs on Huawei iMaster NCE — delivered on schedule.",                                outcomes: ["50-site campus","36 APs deployed"],                            tech: ["Huawei iMaster","NCE","SD-WAN"],                  metric: "50",    metricLabel: "Sites",      icon: "⟁" },
  { cat: "ERP",            num: "06", client: "Housing Society Group",         title: "Residential Society ERP",         desc: "Complete ERP for digital management of residential complexes — billing, maintenance, and resident portals unified in one platform.",                          outcomes: ["10,000+ units managed","Real-time billing"],                   tech: ["React","Node.js","PostgreSQL"],                   metric: "10K+",  metricLabel: "Units",      icon: "◫" },
  { cat: "E-Commerce",     num: "07", client: "Retail Chain",                  title: "Multi-Vendor Platform",           desc: "Custom multi-vendor e-commerce with real-time inventory management, tripling order volume within 3 months of launch.",                                      outcomes: ["3× order volume","Multi-vendor support"],                     tech: ["Next.js","Stripe","MongoDB"],                     metric: "3×",    metricLabel: "Orders",     icon: "○" },
  { cat: "Academia",       num: "08", client: "EdTech Institution",            title: "Personalised LMS Platform",       desc: "AI-driven learning management system with adaptive testing and real-time analytics — serving 50,000+ active students.",                                       outcomes: ["50,000+ students","40% engagement boost"],                    tech: ["React","Node.js","AI","Analytics"],               metric: "50K+",  metricLabel: "Students",   icon: "△" },
];

const CATS = ["All", "Fintech", "Healthcare", "Infrastructure", "ERP", "E-Commerce", "Academia"];

export default function SolutionsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Case Studies</motion.p>
          <motion.h1 {...fade(0.1)} className="text-white font-bold mb-5" style={{ fontSize: "clamp(36px,4vw,58px)", letterSpacing: "-1px", lineHeight: 1.1, maxWidth: 680 }}>
            Real Projects. Measurable Results.
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-white/70 leading-relaxed" style={{ fontSize: 16, maxWidth: 540 }}>
            200+ enterprise projects across fintech, healthcare, infrastructure, and beyond. Here&apos;s what we&apos;ve built.
          </motion.p>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((p, i) => (
              <motion.div key={p.num} {...fade(i * 0.06)} whileHover={{ y: -6, boxShadow: "0 24px 56px rgba(15,23,42,0.12)" }} transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-8 flex flex-col" style={{ boxShadow: "0 4px 20px rgba(15,23,42,0.07)", border: "1px solid #F1F5F9" }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#EEF2FF", color: "#2563FF" }}>{p.cat}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-[#2563FF]" style={{ fontSize: 26 }}>{p.metric}</p>
                    <p className="text-[#94A3B8]" style={{ fontSize: 11 }}>{p.metricLabel}</p>
                  </div>
                </div>
                <p className="text-[#94A3B8] font-medium mb-1" style={{ fontSize: 12 }}>{p.client}</p>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 20 }}>{p.title}</h3>
                <p className="text-[#64748B] leading-relaxed flex-1 mb-5" style={{ fontSize: 14 }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.outcomes.map(o => <span key={o} className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}>{o}</span>)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map(t => <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: "#F8FAFF", color: "#64748B", border: "1px solid #E2E8F0" }}>{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 40%,#2563FF 100%)" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <motion.h2 {...fade()} className="text-white font-bold mb-4" style={{ fontSize: "clamp(28px,3vw,42px)", letterSpacing: "-0.5px" }}>Let&apos;s Build Your Success Story</motion.h2>
          <motion.p {...fade(0.1)} className="text-white/70 mb-8 mx-auto" style={{ fontSize: 16, maxWidth: 460 }}>Join 200+ enterprises that trust Ivy League Solutions to deliver.</motion.p>
          <motion.div {...fade(0.2)} className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact"><motion.button whileHover={{ scale: 1.04 }} className="font-semibold rounded-full" style={{ height: 52, paddingInline: 40, fontSize: 15, background: "#fff", color: "#0F172A", border: "none", cursor: "pointer" }}>Start a Project</motion.button></Link>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}

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

/* Category colour map */
const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  Fintech:        { bg: "#EFF6FF", text: "#2563FF" },
  Healthcare:     { bg: "#F0FDF4", text: "#16A34A" },
  Infrastructure: { bg: "#FFF7ED", text: "#EA580C" },
  ERP:            { bg: "#FAF5FF", text: "#7C3AED" },
  "E-Commerce":   { bg: "#FFF1F2", text: "#E11D48" },
  Academia:       { bg: "#ECFDF5", text: "#059669" },
};

/* Consistent SVG icons per category */
const CAT_ICONS: Record<string, React.ReactElement> = {
  Fintech: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Healthcare: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  Infrastructure: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  ERP: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  "E-Commerce": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  Academia: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
};

const PROJECTS = [
  {
    cat: "Fintech",
    num: "01",
    client: "MidWest Capital Partners",
    title: "Smart Loan Risk System",
    problem: "The bank was relying on outdated manual processes to assess whether borrowers were likely to repay their loans — a slow, error-prone approach costing millions in bad debt each year.",
    solution: "We built an AI-powered credit risk engine that analyses transaction history and customer data in real time, giving loan officers an instant, accurate risk score for every application.",
    outcomes: ["94% prediction accuracy", "Loan decisions in 8 seconds", "31% drop in bad debt"],
    tech: ["Python", "TensorFlow", "AWS", "MLOps"],
    metric: "94%",
    metricLabel: "Prediction Accuracy",
  },
  {
    cat: "Healthcare",
    num: "02",
    client: "Regional Health Network",
    title: "AI-Powered Clinical Notes",
    problem: "Doctors and nurses were spending hours every shift writing up patient notes instead of caring for patients — leading to burnout and mistakes from rushed documentation.",
    solution: "We built a voice-powered documentation tool that listens to patient consultations and automatically generates accurate, structured clinical notes — fully compliant with healthcare privacy laws.",
    outcomes: ["60% less paperwork per clinician", "Used across 3 hospital sites", "28% fewer patient readmissions"],
    tech: ["Python", "OpenAI", "FHIR", "Azure"],
    metric: "60%",
    metricLabel: "Admin Time Saved",
  },
  {
    cat: "Infrastructure",
    num: "03",
    client: "Emaco Facility, UAE",
    title: "Enterprise Database Overhaul",
    problem: "Slow database queries were causing daily operational delays across multiple sites. The team was spending hours on manual fixes that should have been automated.",
    solution: "We redesigned and optimised the company's Oracle database setup across all UAE sites, setting up automated maintenance routines and monitoring to keep everything running smoothly.",
    outcomes: ["99.9% system uptime", "Queries run 50% faster", "Zero unplanned outages in 12 months"],
    tech: ["Oracle DB", "SQL", "Linux"],
    metric: "99.9%",
    metricLabel: "Uptime Achieved",
  },
  {
    cat: "ERP",
    num: "04",
    client: "Bisha Mining",
    title: "Mining Operations Management System",
    problem: "A large mining company was running its operations across multiple sites using disconnected spreadsheets and legacy tools — making it impossible to get a clear picture of costs, stock, or schedules.",
    solution: "We implemented Microsoft NAV, a complete business management platform tailored specifically for mining operations, unifying procurement, inventory, finance, and HR in one place.",
    outcomes: ["All sites connected in one system", "Custom modules for mining workflows", "Delivered on time and within budget"],
    tech: ["Microsoft NAV", "Dynamics 365"],
    metric: "100%",
    metricLabel: "On-Time Delivery",
  },
  {
    cat: "Infrastructure",
    num: "05",
    client: "Al Nahla Technologies, Oman",
    title: "50-Site Campus Network",
    problem: "A growing technology company needed a reliable, centrally managed network across 50 locations in Oman — but their existing setup had no central visibility and suffered regular outages.",
    solution: "We designed and deployed a modern campus network using Huawei equipment, connecting all 50 sites with 36 wireless access points and a central management dashboard giving full visibility in real time.",
    outcomes: ["50 sites connected seamlessly", "36 wireless access points installed", "Central control from a single dashboard"],
    tech: ["Huawei iMaster", "NCE", "SD-WAN"],
    metric: "50",
    metricLabel: "Sites Connected",
  },
  {
    cat: "ERP",
    num: "06",
    client: "Housing Society Group",
    title: "Residential Complex Management Platform",
    problem: "Managing billing, maintenance requests, and communications across thousands of homes in a residential complex was a paperwork nightmare — residents were frustrated and staff were overwhelmed.",
    solution: "We built a complete management platform for the housing group, giving residents an online portal to pay bills and raise requests, while staff get automated workflows, real-time reports, and full oversight.",
    outcomes: ["10,000+ homes managed digitally", "Automated billing and reminders", "Resident satisfaction improved significantly"],
    tech: ["React", "Node.js", "PostgreSQL"],
    metric: "10,000+",
    metricLabel: "Homes Managed",
  },
  {
    cat: "E-Commerce",
    num: "07",
    client: "Multi-Brand Retail Chain",
    title: "Multi-Vendor Online Marketplace",
    problem: "A retail chain wanted to bring multiple brands and suppliers onto a single online marketplace but their existing website couldn't support multiple sellers or manage inventory in real time.",
    solution: "We built a custom multi-vendor marketplace from scratch — allowing each seller to manage their own products, while the retailer gets live inventory tracking, order management, and integrated payments.",
    outcomes: ["Orders tripled within 3 months", "Multiple sellers on one platform", "Live stock levels across all vendors"],
    tech: ["Next.js", "Stripe", "MongoDB"],
    metric: "3×",
    metricLabel: "Order Volume Increase",
  },
  {
    cat: "Academia",
    num: "08",
    client: "EdTech Institution",
    title: "Personalised Learning Platform",
    problem: "An educational institution was struggling to engage students with a generic, one-size-fits-all learning system that couldn't adapt to individual learning speeds or flag students who were falling behind.",
    solution: "We built an AI-driven learning platform that adjusts lesson difficulty for each student, tracks progress in real time, and alerts teachers when a student needs extra support — all in an easy-to-use interface.",
    outcomes: ["50,000+ active students", "40% improvement in student engagement", "Early support for at-risk learners"],
    tech: ["React", "Node.js", "AI", "Analytics"],
    metric: "50,000+",
    metricLabel: "Active Students",
  },
];

const CATS = ["All", "Fintech", "Healthcare", "Infrastructure", "ERP", "E-Commerce", "Academia"];

export default function SolutionsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 90, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.div {...fade(0)} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-blue-300 font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 11 }}>Our Work</p>
              <h1 className="text-white font-bold" style={{ fontSize: "clamp(28px,3.2vw,44px)", letterSpacing: "-0.8px", lineHeight: 1.15 }}>
                Real Projects. Measurable Results.
              </h1>
            </div>
            {/* Inline stats */}
            <div className="flex gap-8 flex-shrink-0">
              {[
                { value: "200+", label: "Projects" },
                { value: "98%",  label: "Satisfaction" },
                { value: "8",    label: "Industries" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-extrabold leading-none" style={{ fontSize: 24 }}>{s.value}</p>
                  <p className="text-white/45 font-medium mt-1" style={{ fontSize: 11 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">

          {/* Category filter */}
          <motion.div {...fade()} className="flex flex-wrap gap-2 mb-12">
            {CATS.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className="px-5 py-2 rounded-full font-semibold text-sm transition-all"
                style={{
                  background: active === c ? "linear-gradient(135deg,#2F6BFF,#2563FF)" : "#fff",
                  color: active === c ? "#fff" : "#64748B",
                  border: active === c ? "none" : "1.5px solid #E2E8F0",
                  boxShadow: active === c ? "0 4px 16px rgba(37,99,255,0.3)" : "none",
                  cursor: "pointer",
                }}>
                {c}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {filtered.map((p, i) => {
              const catColor = CAT_COLORS[p.cat] ?? { bg: "#EEF2FF", text: "#2563FF" };
              const catIcon  = CAT_ICONS[p.cat];
              return (
                <motion.div key={p.num} {...fade(i * 0.06)}
                  whileHover={{ y: -6, boxShadow: "0 24px 56px rgba(15,23,42,0.12)" }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl flex flex-col overflow-hidden"
                  style={{ boxShadow: "0 4px 20px rgba(15,23,42,0.07)", border: "1px solid #F1F5F9" }}
                >
                  {/* Card top bar */}
                  <div className="flex items-center justify-between px-7 pt-6 pb-4" style={{ borderBottom: "1px solid #F1F5F9", minHeight: 84 }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: catColor.bg, color: catColor.text }}>
                        {catIcon}
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: catColor.bg, color: catColor.text }}>
                        {p.cat}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold" style={{ fontSize: 24, color: catColor.text }}>{p.metric}</p>
                      <p className="text-[#94A3B8]" style={{ fontSize: 10.5 }}>{p.metricLabel}</p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-7 py-6 flex flex-col flex-1">
                    <p className="font-medium mb-1" style={{ fontSize: 11.5, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.client}</p>
                    <h3 className="font-bold text-[#0F172A] mb-5" style={{ fontSize: 19 }}>{p.title}</h3>

                    {/* Problem / Solution */}
                    <div className="flex flex-col gap-4 mb-6 flex-1">
                      <div className="rounded-xl p-4" style={{ background: "#FFF8F0", border: "1px solid #FFE4C4" }}>
                        <p className="font-bold mb-1" style={{ fontSize: 11, color: "#EA580C", textTransform: "uppercase", letterSpacing: "0.06em" }}>The Challenge</p>
                        <p className="leading-relaxed" style={{ fontSize: 13.5, color: "#64748B" }}>{p.problem}</p>
                      </div>
                      <div className="rounded-xl p-4" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                        <p className="font-bold mb-1" style={{ fontSize: 11, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.06em" }}>What We Built</p>
                        <p className="leading-relaxed" style={{ fontSize: 13.5, color: "#64748B" }}>{p.solution}</p>
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.outcomes.map(o => (
                        <span key={o} className="flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-full"
                          style={{ background: "#EFF6FF", color: "#2563FF" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {o}
                        </span>
                      ))}
                    </div>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid #F1F5F9" }}>
                      {p.tech.map(t => (
                        <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                          style={{ background: "#F8FAFF", color: "#64748B", border: "1px solid #E2E8F0" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 40%,#2563FF 100%)" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <motion.h2 {...fade()} className="text-white font-bold mb-4" style={{ fontSize: "clamp(28px,3vw,42px)", letterSpacing: "-0.5px" }}>
            Have a Problem We Can Solve?
          </motion.h2>
          <motion.p {...fade(0.1)} className="text-white/70 mb-8 mx-auto" style={{ fontSize: 16, maxWidth: 480 }}>
            Tell us about your challenge. We&apos;ll scope a solution and show you exactly how we&apos;d approach it — no jargon, no obligation.
          </motion.p>
          <motion.div {...fade(0.2)} className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.04 }} className="font-semibold rounded-full"
                style={{ height: 52, paddingInline: 40, fontSize: 15, background: "#fff", color: "#0F172A", border: "none", cursor: "pointer" }}>
                Start a Conversation
              </motion.button>
            </Link>
            <Link href="/services">
              <motion.button whileHover={{ scale: 1.04 }} className="text-white font-semibold rounded-full"
                style={{ height: 52, paddingInline: 40, fontSize: 15, background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>
                Explore Our Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}

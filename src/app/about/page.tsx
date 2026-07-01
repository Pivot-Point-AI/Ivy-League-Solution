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

const STATS = [
  { v: "10+",    l: "Years of Experience", sub: "Since 2015" },
  { v: "200+",   l: "Projects Delivered",  sub: "Global portfolio" },
  { v: "250+",   l: "Team Members",        sub: "Engineers & designers" },
  { v: "Global", l: "Reach",               sub: "Worldwide presence" },
];

const TIMELINE = [
  { year: "2015", title: "Origins",         desc: "Ivy League Solutions founded in Dubai, UAE — beginning a tradition of meeting diversified enterprise technology needs across the Middle East." },
  { year: "2020", title: "AI Division",     desc: "Launched our dedicated machine learning and AI engineering practice for regulated verticals." },
  { year: "2022", title: "Datum Product",   desc: "Released Datum, our proprietary spreadsheet intelligence platform — Excel/OpenXML compatible with enterprise-grade security." },
  { year: "2024", title: "Global Launch",   desc: "Ivy League Solutions launched to bring our decade of enterprise expertise to global markets under one unified brand." },
  { year: "2025+", title: "Scale & Expand", desc: "Expanding AI capabilities, growing our global presence, and building IvyFlow, IvyShield, and IvyERP product lines." },
];

const VALUES = [
  {
    title: "Engineering Precision",
    desc: "We treat every solution like a product. Architectural decisions are made for the long term — not just the sprint.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    title: "Client Partnership",
    desc: "Long-standing relationships aren't a goal — they're the outcome of delivering what we promise. Every time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Multicultural by Design",
    desc: "Our team spans continents. That cultural breadth lets us engineer for any market, understand any user.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: "Transparent Delivery",
    desc: "Weekly reporting, open codebases, and honest timelines. No surprises — just progress.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

/* Tech stack with SVG icons */
const TECH_STACK = [
  {
    name: ".NET Core",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeDasharray="4 2"/>
        <ellipse cx="12" cy="12" rx="10" ry="4"/>
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8 22 16 12 22 2 16 2 8 12 2"/>
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9h6v3"/>
      </svg>
    ),
  },
  {
    name: "SQL / Databases",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
  },
  {
    name: "Java",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 17s-1 1 2 1.5c3.5.5 5.5-.5 5.5-.5M9 13.5s-1 1.5 2 1.5c3.5 0 5.5-1.5 5.5-1.5"/><path d="M11 2s-2 3 1 4.5c2.5 1.5 1 3 1 3M15 20s1.5 1 0 2c-2 .5-6 .5-7 0-1.5-1 0-2 0-2"/>
      </svg>
    ),
  },
  {
    name: "Kotlin & Swift",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  {
    name: "Cloud (AWS / Azure)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
  },
  {
    name: "Open Source",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    name: "Android & iOS",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  {
    name: "Flutter",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 8 14 13 2"/><polygon points="13 22 23 10 18 10 13 22"/><line x1="8" y1="14" x2="18" y2="14"/>
      </svg>
    ),
  },
  {
    name: "AI & Machine Learning",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/>
        <line x1="9" y1="14" x2="9.01" y2="14"/><line x1="15" y1="14" x2="15.01" y2="14"/>
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 2 6 4 6 7v2h6v1H5a2 2 0 0 0-2 2v4c0 2 1.5 3 3 3h2v-2.5c0-1.5 1-2.5 2.5-2.5h3c1.5 0 2.5-1 2.5-2.5V7c0-3-2-5-4-5z"/>
        <path d="M12 22c4 0 6-2 6-5v-2h-6v-1h7a2 2 0 0 0 2-2V8c0-2-1.5-3-3-3h-2v2.5c0 1.5-1 2.5-2.5 2.5h-3C8.5 10 7.5 11 7.5 12.5V17c0 3 2 5 4.5 5z"/>
      </svg>
    ),
  },
  {
    name: "Docker & Kubernetes",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="4" height="4" rx="0.5"/><rect x="7" y="8" width="4" height="4" rx="0.5"/><rect x="12" y="8" width="4" height="4" rx="0.5"/>
        <rect x="7" y="3" width="4" height="4" rx="0.5"/><rect x="12" y="3" width="4" height="4" rx="0.5"/>
        <path d="M18 12a4 4 0 0 1 4 4 4 4 0 0 1-1.5 3.1C20 21 18.5 22 16 22H6a4 4 0 0 1-4-4 4 4 0 0 1 3-3.87"/>
      </svg>
    ),
  },
];

/* Platform badge styles */
const PLATFORM_STYLES: Record<string, { bg: string; text: string; icon: React.ReactElement }> = {
  Mobile: {
    bg: "#FFF1F2", text: "#E11D48",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
  },
  Web: {
    bg: "#EFF6FF", text: "#2563FF",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  ERP: {
    bg: "#FAF5FF", text: "#7C3AED",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  Infrastructure: {
    bg: "#FFF7ED", text: "#EA580C",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      </svg>
    ),
  },
  CRM: {
    bg: "#ECFDF5", text: "#059669",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      </svg>
    ),
  },
};

const MAJOR_PROJECTS = [
  {
    name: "Zindigi",
    sub: "Digital Wallet & Mobile Banking",
    desc: "A fully-featured digital wallet and mobile banking app serving millions of users with payments, transfers, and savings features.",
    platforms: ["Mobile", "Web"],
    tech: ["React Native", "Node.js", "Payment APIs"],
  },
  {
    name: "G-Tag",
    sub: "National E-Toll System",
    desc: "End-to-end electronic toll collection platform deployed across national highways, handling real-time vehicle identification and automated billing.",
    platforms: ["Web", "Infrastructure"],
    tech: ["React", "Oracle DB", "IoT"],
  },
  {
    name: "BankIslami",
    sub: "Internet Banking Platform",
    desc: "A secure, Shariah-compliant internet banking portal giving customers full control over accounts, transfers, and statements online.",
    platforms: ["Web", "Mobile"],
    tech: [".NET Core", "React", "SQL Server"],
  },
  {
    name: "E-Parking",
    sub: "Smart Parking Management",
    desc: "A smart city parking solution with real-time bay availability, mobile reservations, and automated payment — reducing urban congestion.",
    platforms: ["Mobile", "Web"],
    tech: ["Flutter", "Node.js", "Google Maps API"],
  },
  {
    name: "Bisha Mining ERP",
    sub: "Mining Operations Platform",
    desc: "A full Microsoft NAV ERP implementation tailored for large-scale mining operations — covering procurement, inventory, finance, and HR across multiple sites.",
    platforms: ["ERP"],
    tech: ["Microsoft NAV", "Dynamics 365"],
  },
  {
    name: "Residential Society ERP",
    sub: "Housing Complex Management",
    desc: "An integrated management platform for residential developments — unifying billing, maintenance requests, and resident communications for 10,000+ homes.",
    platforms: ["ERP", "Web"],
    tech: ["React", "Node.js", "PostgreSQL"],
  },
  {
    name: "Clinical AI Platform",
    sub: "Healthcare Documentation",
    desc: "HIPAA-compliant AI platform that listens to patient consultations and auto-generates structured clinical notes, reducing admin time by 60% across 3 hospital sites.",
    platforms: ["Web"],
    tech: ["Python", "OpenAI", "FHIR", "Azure"],
  },
  {
    name: "EdTech LMS",
    sub: "Personalised Learning System",
    desc: "An AI-powered learning management system serving 50,000+ students with adaptive content, real-time progress tracking, and early-warning alerts for at-risk learners.",
    platforms: ["Web", "Mobile"],
    tech: ["React", "Node.js", "AI Analytics"],
  },
];

const PROJECT_CATS = ["All", "Mobile", "Web", "ERP", "Infrastructure", "CRM"];

const LEADERSHIP = [
  { name: "Farat Iqbal", role: "Founder & Managing Director", bio: "10+ years of enterprise IT consulting experience across the Middle East and South Asia.", initials: "FI", tags: ["Enterprise IT", "10+ Years", "Dubai · South Asia"] },
  { name: "Engineering Team", role: "250+ Engineers Globally", bio: "Distributed talent across South Asia, UAE, and the Gulf — software, infrastructure, AI/ML, UI/UX, and cybersecurity.", initials: "ET", tags: ["Software", "Infrastructure", "AI/ML", "UI/UX", "Cybersecurity"] },
];

export default function AboutPage() {
  const [activeProject, setActiveProject] = useState("All");

  const filteredProjects = activeProject === "All"
    ? MAJOR_PROJECTS
    : MAJOR_PROJECTS.filter(p => p.platforms.includes(activeProject));

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[-90px] right-[-90px] w-[460px] h-[460px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#a78bfa,transparent 70%)" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div>
            <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Our Story</motion.p>
            <motion.h1 {...fade(0.1)} className="text-white font-bold mb-5" style={{ fontSize: "clamp(36px,4vw,58px)", letterSpacing: "-1px", lineHeight: 1.1 }}>
              A Decade of Enterprise Technology, Built on Trust
            </motion.h1>
            <motion.p {...fade(0.2)} className="text-white/70 leading-relaxed mb-10" style={{ fontSize: 16, maxWidth: 540 }}>
              From Dubai to the world — we&apos;ve spent 10+ years engineering technology that enterprises rely on.
            </motion.p>
            <motion.div {...fade(0.3)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <p className="text-white font-extrabold mb-1" style={{ fontSize: 32 }}>{s.v}</p>
                  <p className="text-white/80 font-semibold" style={{ fontSize: 13 }}>{s.l}</p>
                  <p className="text-white/40" style={{ fontSize: 11, marginTop: 2 }}>{s.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Decorative badge — fills empty space on the right */}
          <motion.div {...fade(0.25)} className="hidden lg:flex flex-col gap-4 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(12px)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563FF,#6C3CFF)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <p className="text-white font-bold" style={{ fontSize: 16 }}>Founded in Dubai, 2015</p>
              <p className="text-white/55 mt-1" style={{ fontSize: 13 }}>Now serving enterprise clients across Fintech, Healthcare, Government, and EdTech worldwide.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>What Drives Us</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div key={i} {...fade(i * 0.08)} whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(15,23,42,0.1)" }} transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-7" style={{ boxShadow: "0 2px 16px rgba(15,23,42,0.07)", border: "1px solid #F1F5F9" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)" }}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 17 }}>{v.title}</h3>
                <p className="text-[#64748B] leading-relaxed" style={{ fontSize: 14 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>Our Journey</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>10 Years in the Making</h2>
          </motion.div>
          <div className="relative pl-8" style={{ borderLeft: "2px solid #E2E8F0" }}>
            {TIMELINE.map((t, i) => (
              <motion.div key={i} {...fade(i * 0.08)} className="relative mb-10 last:mb-0">
                <div className="absolute -left-[13px] top-1.5 w-4 h-4 rounded-full border-2 border-white" style={{ background: "linear-gradient(135deg,#2563FF,#6C3CFF)", boxShadow: "0 0 0 3px rgba(37,99,255,0.2)" }} />
                <div className="bg-white rounded-2xl p-6 ml-4" style={{ boxShadow: "0 2px 16px rgba(15,23,42,0.06)", border: "1px solid #F1F5F9" }}>
                  <span className="text-[#2563FF] font-bold text-sm uppercase tracking-wider">{t.year}</span>
                  <h3 className="font-bold text-[#0F172A] mt-1 mb-2" style={{ fontSize: 18 }}>{t.title}</h3>
                  <p className="text-[#64748B] leading-relaxed" style={{ fontSize: 14 }}>{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>The People</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>Leadership & Team</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {LEADERSHIP.map((l, i) => (
              <motion.div key={i} {...fade(i * 0.1)} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}
                className="rounded-2xl p-8 flex gap-6 h-full" style={{ background: "linear-gradient(145deg,#F0F4FF,#fff)", border: "1.5px solid #E0E7FF", boxShadow: "0 4px 20px rgba(37,99,255,0.06)" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-lg flex-shrink-0 text-white" style={{ background: "linear-gradient(135deg,#2563FF,#6C3CFF)", fontSize: 18 }}>{l.initials}</div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-bold text-[#0F172A] mb-1" style={{ fontSize: 19 }}>{l.name}</h3>
                  <p className="text-[#2563FF] font-semibold mb-3" style={{ fontSize: 13 }}>{l.role}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {l.tags.map(t => <span key={t} className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: "#EEF2FF", color: "#2563FF" }}>{t}</span>)}
                  </div>
                  <p className="text-[#64748B] leading-relaxed mt-auto" style={{ fontSize: 14 }}>{l.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="text-center mb-12">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>Technologies We Use</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(24px,2.5vw,36px)", letterSpacing: "-0.5px" }}>Our Tech Stack</h2>
          </motion.div>
          <motion.div {...fade(0.1)} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {TECH_STACK.map((t, i) => (
              <motion.div key={t.name} {...fade(i * 0.04)}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(37,99,255,0.12)", borderColor: "#2563FF" }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-3 rounded-2xl p-4 bg-white cursor-default"
                style={{ border: "1.5px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15,23,42,0.05)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)", color: "#2563FF" }}>
                  {t.icon}
                </div>
                <span className="text-center font-semibold text-[#475569] leading-tight" style={{ fontSize: 11.5 }}>{t.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Major Projects */}
      <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-10">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>Selected Work</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>Major Projects</h2>
          </motion.div>

          {/* Platform filter */}
          <motion.div {...fade(0.05)} className="flex flex-wrap gap-2 mb-10">
            {PROJECT_CATS.map(c => (
              <button key={c} onClick={() => setActiveProject(c)}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all"
                style={{
                  background: activeProject === c ? "linear-gradient(135deg,#2F6BFF,#2563FF)" : "#fff",
                  color: activeProject === c ? "#fff" : "#64748B",
                  border: activeProject === c ? "none" : "1.5px solid #E2E8F0",
                  boxShadow: activeProject === c ? "0 4px 16px rgba(37,99,255,0.3)" : "none",
                  cursor: "pointer",
                }}>
                {c !== "All" && PLATFORM_STYLES[c] && (
                  <span style={{ color: activeProject === c ? "#fff" : PLATFORM_STYLES[c].text }}>
                    {PLATFORM_STYLES[c].icon}
                  </span>
                )}
                {c}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((p, i) => (
              <motion.div key={p.name} {...fade(i * 0.07)}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(15,23,42,0.1)" }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-6 flex flex-col"
                style={{ border: "1.5px solid #E2E8F0", boxShadow: "0 2px 16px rgba(15,23,42,0.06)" }}
              >
                {/* Platform badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.platforms.map(pl => {
                    const style = PLATFORM_STYLES[pl];
                    if (!style) return null;
                    return (
                      <span key={pl} className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: style.bg, color: style.text }}>
                        {style.icon}
                        {pl}
                      </span>
                    );
                  })}
                </div>
                <h3 className="font-bold text-[#0F172A] mb-1" style={{ fontSize: 16 }}>{p.name}</h3>
                <p className="font-semibold mb-3" style={{ fontSize: 12, color: "#2563FF" }}>{p.sub}</p>
                <p className="text-[#64748B] leading-relaxed flex-1 mb-4" style={{ fontSize: 13 }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: "1px solid #F1F5F9" }}>
                  {p.tech.map(t => (
                    <span key={t} className="text-[10.5px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: "#F8FAFF", color: "#64748B", border: "1px solid #E2E8F0" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 40%,#2563FF 100%)" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <motion.h2 {...fade()} className="text-white font-bold mb-4" style={{ fontSize: "clamp(28px,3vw,42px)", letterSpacing: "-0.5px" }}>Work With a Team That Delivers</motion.h2>
          <motion.p {...fade(0.1)} className="text-white/70 mb-8 mx-auto" style={{ fontSize: 16, maxWidth: 460 }}>200+ projects shipped. 15+ industries served. Let&apos;s build yours.</motion.p>
          <motion.div {...fade(0.2)} className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact"><motion.button whileHover={{ scale: 1.04 }} className="font-semibold rounded-full" style={{ height: 52, paddingInline: 40, fontSize: 15, background: "#fff", color: "#0F172A", border: "none", cursor: "pointer" }}>Start a Conversation</motion.button></Link>
            <Link href="/solutions"><motion.button whileHover={{ scale: 1.04 }} className="font-semibold rounded-full text-white" style={{ height: 52, paddingInline: 40, fontSize: 15, background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>View Our Work</motion.button></Link>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}

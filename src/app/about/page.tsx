"use client";

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
  { v: "10+",  l: "Years of Experience", sub: "Since 2015" },
  { v: "200+", l: "Projects Delivered",  sub: "Global portfolio" },
  { v: "250+", l: "Team Members",        sub: "Engineers & designers" },
  { v: "18+",  l: "Countries Served",    sub: "Global reach" },
];

const TIMELINE = [
  { year: "2015", title: "Origins",         desc: "Ivy League Solutions founded in Dubai, UAE — beginning a tradition of meeting diversified enterprise technology needs across the Middle East." },
  { year: "2020", title: "AI Division",     desc: "Launched our dedicated machine learning and AI engineering practice for regulated verticals." },
  { year: "2022", title: "Datum Product",   desc: "Released Datum, our proprietary spreadsheet intelligence platform — Excel/OpenXML compatible with enterprise-grade security." },
  { year: "2024", title: "Global Launch",   desc: "Ivy League Solutions launched to bring our decade of enterprise expertise to global markets under one unified brand." },
  { year: "2025+", title: "Scale & Expand", desc: "Expanding AI capabilities, growing our global presence, and building IvyFlow, IvyShield, and IvyERP product lines." },
];

const VALUES = [
  { icon: "◈", title: "Engineering Precision",    desc: "We treat every solution like a product. Architectural decisions are made for the long term — not just the sprint." },
  { icon: "◇", title: "Client Partnership",       desc: "Long-standing relationships aren't a goal — they're the outcome of delivering what we promise. Every time." },
  { icon: "△", title: "Multicultural by Design",  desc: "Our team spans continents. That cultural breadth lets us engineer for any market, understand any user." },
  { icon: "○", title: "Transparent Delivery",     desc: "Weekly reporting, open codebases, and honest timelines. No surprises — just progress." },
];

const TECH_STACK = [".NET Core","React","Node.js","Next.js","SQL Databases","Java","Kotlin & Swift","Cloud Solutions","Open-source Technologies","Android, iOS & Flutter","AI"];

const MAJOR_PROJECTS = [
  { icon: "💳", name: "Zindigi", sub: "Digital Wallet" },
  { icon: "🏷️", name: "G-Tag", sub: "E-Toll Plaza System" },
  { icon: "🏦", name: "BankIslami", sub: "Internet Banking" },
  { icon: "🅿️", name: "E-Parking", sub: "Smart Parking System" },
];

const LEADERSHIP = [
  { name: "Farat Iqbal", role: "Founder & Managing Director", bio: "Farat brings 10+ years of enterprise IT consulting experience across the Middle East and South Asia, building and launching Ivy League Solutions as a unified global brand.", initials: "FI", tags: ["Enterprise IT","10+ Years","Dubai · South Asia"] },
  { name: "Engineering Team", role: "250+ Engineers Globally", bio: "Distributed engineering talent spanning South Asia, UAE, and the Gulf region — covering software engineering, infrastructure, AI/ML, UI/UX design, and cybersecurity.", initials: "ET", tags: ["Software","Infrastructure","AI/ML","UI/UX","Cybersecurity"] },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Our Story</motion.p>
          <motion.h1 {...fade(0.1)} className="text-white font-bold mb-5" style={{ fontSize: "clamp(36px,4vw,58px)", letterSpacing: "-1px", lineHeight: 1.1, maxWidth: 680 }}>
            A Decade of Enterprise Technology, Built on Trust
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-white/70 leading-relaxed mb-10" style={{ fontSize: 16, maxWidth: 540 }}>
            From Dubai to the world — we&apos;ve spent 10+ years engineering technology that enterprises rely on.
          </motion.p>
          {/* Stats */}
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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl" style={{ background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)" }}>{v.icon}</div>
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
                className="rounded-2xl p-8 flex gap-6" style={{ background: "linear-gradient(145deg,#F0F4FF,#fff)", border: "1.5px solid #E0E7FF", boxShadow: "0 4px 20px rgba(37,99,255,0.06)" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-lg flex-shrink-0 text-white" style={{ background: "linear-gradient(135deg,#2563FF,#6C3CFF)", fontSize: 18 }}>{l.initials}</div>
                <div>
                  <h3 className="font-bold text-[#0F172A] mb-1" style={{ fontSize: 19 }}>{l.name}</h3>
                  <p className="text-[#2563FF] font-semibold mb-3" style={{ fontSize: 13 }}>{l.role}</p>
                  <p className="text-[#64748B] leading-relaxed mb-4" style={{ fontSize: 14 }}>{l.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {l.tags.map(t => <span key={t} className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: "#EEF2FF", color: "#2563FF" }}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <motion.p {...fade()} className="text-[#2563FF] font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Technologies We Use</motion.p>
          <motion.h2 {...fade(0.1)} className="text-[#0F172A] font-bold mb-10" style={{ fontSize: "clamp(24px,2.5vw,36px)", letterSpacing: "-0.5px" }}>Our Tech Stack</motion.h2>
          <motion.div {...fade(0.2)} className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map(t => (
              <span key={t} className="px-5 py-2.5 rounded-full font-semibold" style={{ background: "#fff", border: "1.5px solid #E2E8F0", color: "#475569", fontSize: 14, boxShadow: "0 2px 8px rgba(15,23,42,0.05)" }}>{t}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Major Projects */}
      <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12 text-center">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>Our Work</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>Major Projects</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {MAJOR_PROJECTS.map((p, i) => (
              <motion.div key={i} {...fade(i * 0.08)} whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(15,23,42,0.1)" }} transition={{ duration: 0.25 }}
                className="rounded-2xl p-7 text-center" style={{ border: "1.5px solid #E2E8F0", boxShadow: "0 2px 16px rgba(15,23,42,0.06)" }}>
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-[#0F172A] mb-1" style={{ fontSize: 17 }}>{p.name}</h3>
                <p className="text-[#64748B]" style={{ fontSize: 13 }}>{p.sub}</p>
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

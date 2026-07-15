"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SharedNav, SharedFooter } from "@/components/SharedNav";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Shield, ShoppingCart, Bot, Landmark, Code2, HeartPulse,
  ChevronRight, Box, Award, Layers, ArrowDown,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

const CAPABILITIES = [
  { id: "cap-fintech",    icon: "◈", tag: "AI in Fintech", headline: "Financial Intelligence", desc: "From real-time fraud detection to autonomous underwriting — AI systems that handle the full complexity of modern financial services.", stat: { v: "88%", l: "of firms report revenue gain" }, items: ["Credit Risk & Underwriting AI","Real-Time Fraud Detection","Regulatory Compliance Automation (AML, KYC)","Portfolio Optimisation Engines"] },
  { id: "cap-healthcare", icon: "◇", tag: "AI in Healthcare", headline: "Clinical & Life Sciences AI", desc: "HIPAA-compliant AI that improves patient outcomes, reduces clinical burden, and unlocks value from complex healthcare data.", stat: { v: "$150B", l: "annual savings potential (US)" }, items: ["Predictive Patient Risk Stratification","Ambient Clinical Documentation","Diagnostic Support Systems","Drug Discovery & Molecular AI"] },
  { id: "cap-bespoke",    icon: "✦", tag: "Bespoke Engineering", headline: "Bespoke AI Engineering", desc: "End-to-end AI product development — from discovery and data strategy through model engineering, MLOps, and production deployment.", stat: { v: "58%", l: "active enterprise deployment rate" }, items: ["AI Strategy & Feasibility Assessment","Data Pipeline Architecture","Custom Model Training & Fine-Tuning","LLM Application Development & RAG"] },
  { id: "cap-automation", icon: "⬟", tag: "Automation & Integration", headline: "Intelligent Process Automation", desc: "AI-powered automation that eliminates manual workflows, integrates disparate systems, and surfaces operational intelligence at scale.", stat: { v: "40%", l: "average reduction in manual processing" }, items: ["Intelligent Document Processing (IDP)","AI Agent & Multi-Agent Orchestration","API Integration & Middleware","RPA + AI Hybrid Workflows"] },
];

const PROCESS = [
  { n: "01", t: "Discovery Sprint",        d: "2-week deep-dive into your data landscape, business goals, and technical constraints. Outputs a pragmatic AI roadmap with clear ROI milestones." },
  { n: "02", t: "Architecture Design",     d: "We design the data pipelines, feature stores, and infrastructure needed to train and serve production AI models at scale." },
  { n: "03", t: "Agile Build Cycles",      d: "Custom model training, fine-tuning, and validation in 2-week sprints — using the right approach for your data and use case." },
  { n: "04", t: "Production Deploy",       d: "Containerised deployment with monitoring, alerting, model drift detection, and automated retraining pipelines — backed by SLAs." },
  { n: "05", t: "Continuous Optimisation", d: "Ongoing model improvement, A/B testing, and performance optimisation with full interpretability reporting for compliance teams." },
];

const RESULTS = [
  { client: "Midwest Capital Partners",    outcome: "94.2% default prediction accuracy",  system: "Neural Credit Risk Engine",             tag: "Fintech",    metric: "94.2%", metricLabel: "Accuracy" },
  { client: "Summit Health Network",       outcome: "28% readmission rate reduction",      system: "Predictive Readmission Intelligence",   tag: "Healthcare", metric: "28%",   metricLabel: "Reduction" },
  { client: "Veritas Payment Technologies",outcome: "97.8% fraud detection rate",          system: "Real-Time Transaction Fraud Detection", tag: "Fintech",    metric: "97.8%", metricLabel: "Detection Rate" },
];

const INDUSTRIES = ["Fintech", "Healthcare", "Retail", "Manufacturing", "Insurance"];

const SERVICES = [
  { icon: HeartPulse,   title: "AI in Healthcare",            targetId: "cap-healthcare" },
  { icon: Code2,        title: "Custom AI Development",       targetId: "cap-bespoke"    },
  { icon: Bot,          title: "Automation & Integrations",   targetId: "cap-automation" },
  { icon: ShoppingCart, title: "AI in Retail",                targetId: "capabilities"   },
  { icon: Landmark,     title: "AI in Fintech",                targetId: "cap-fintech"    },
];

const ORBIT_R = 210;
const ORBIT_RY = ORBIT_R * 0.83; // flattens the orbit into an ellipse

const SIDE_STATS = [
  { icon: Box,    v: "47+",   l: "Systems",  sub: "Deployed",         color: "#00D4FF" },
  { icon: Layers, v: "$340M", l: "Value",    sub: "Delivered",        color: "#9B4DFF" },
  { icon: Award,  v: "10+",   l: "Years",    sub: "Of Experience",    color: "#9B4DFF" },
];

const SPARK_HEIGHTS = [40, 55, 35, 60, 48, 70, 58, 78];

const TRUSTED_LOGOS = ["Zindigi", "G-Tag", "E-Parking", "BankIslami"];

const BOTTOM_STATS = [
  { v: "250+", l: "AI Experts" },
  { v: "99.9%", l: "Uptime" },
  { v: "150+", l: "Enterprise Clients" },
  { v: "24/7", l: "Support" },
];

function OrbitService({ s, angleDeg }: { s: (typeof SERVICES)[number]; angleDeg: number }) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = Math.cos(rad) * ORBIT_R;
  const y = Math.sin(rad) * ORBIT_RY;
  const dist = Math.sqrt(x * x + y * y);
  const lineAngle = (Math.atan2(y, x) * 180) / Math.PI;

  return (
    <>
      {/* connector line — spans the exact distance to the tile, so it always reaches it */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "45%", left: "50%", width: dist, height: 2,
          transformOrigin: "0 50%",
          transform: `translateY(-50%) rotate(${lineAngle}deg)`,
          background: "linear-gradient(to right, rgba(0,212,255,0.9), rgba(155,77,255,0.15))",
          boxShadow: "0 0 8px rgba(0,212,255,0.5)",
        }}
      />
      {/* tile — clicking scrolls down to the matching capability card */}
      <div
        className="absolute"
        style={{ top: "45%", left: "50%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
      >
        <button
          type="button"
          onClick={() => document.getElementById(s.targetId)?.scrollIntoView({ behavior: "smooth", block: "center" })}
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer transition-transform hover:scale-105"
          style={{
            background: "rgba(6,12,30,0.92)", border: "1.5px solid rgba(0,212,255,0.55)",
            backdropFilter: "blur(20px)", boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,212,255,0.10)", border: "1px solid rgba(0,212,255,0.35)" }}>
            <s.icon size={15} color="#00D4FF" />
          </div>
          <span className="text-white font-bold uppercase whitespace-nowrap" style={{ fontSize: 11.5, letterSpacing: "0.3px" }}>{s.title}</span>
        </button>
      </div>
    </>
  );
}

export default function AIPage() {
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % INDUSTRIES.length), 2400);
    return () => clearInterval(id);
  }, []);

  // Drives the slow, continuous revolve of the orbiting service tiles.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(id);
  }, []);
  const hubAngle = (i: number) => -90 + i * 72 + tick * 0.05;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      <style>{`
        @keyframes aiOrbitPulse1 { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; } 100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; } }
        @keyframes aiOrbitPulse2 { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.4; } 100% { transform: translate(-50%,-50%) scale(1.7); opacity: 0; } }
      `}</style>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: 120, paddingBottom: 0, background: "radial-gradient(ellipse at 50% 0%,#0d1230 0%,#070a1c 45%,#04060f 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#9B4DFF,transparent 70%)" }} />
        <div className="absolute top-[10%] right-[-100px] w-[380px] h-[380px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle,#00D4FF,transparent 70%)" }} />

        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          {/* Top badge + headline */}
          <div className="text-center mb-10">
            <motion.span {...fade(0)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] font-semibold tracking-widest uppercase" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.35)", color: "#7dd3fc" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00D4FF" }} />
              Your AI Product Development Brigade
            </motion.span>
            <motion.h1 {...fade(0.1)} className="text-white font-extrabold" style={{ fontSize: "clamp(34px,4.5vw,54px)", letterSpacing: "-1px", lineHeight: 1.1 }}>
              Enterprise AI for{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={INDUSTRIES[wordIndex]}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block font-extrabold"
                  style={{ background: "linear-gradient(135deg,#00D4FF,#9B4DFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {INDUSTRIES[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>
          </div>

          {/* 3-column: stats | orbit graphic | insights */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-6 items-center">
            {/* Left — grouped stats card */}
            <motion.div {...fade(0.15)} className="order-2 lg:order-1 rounded-[22px] overflow-hidden flex lg:flex-col" style={{ background: "linear-gradient(165deg,rgba(10,16,34,0.68),rgba(4,9,22,0.62))", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
              {SIDE_STATS.map((s, i) => (
                <div key={i} className="relative flex items-center gap-3 flex-1 lg:flex-none" style={{ padding: "16px 20px", borderBottom: i < SIDE_STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <span className="absolute left-0 top-[22%] bottom-[22%] w-[2px] rounded-full" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}66` }} />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}1f`, border: `1px solid ${s.color}60` }}>
                    <s.icon size={16} color={s.color} />
                  </div>
                  <div>
                    <p className="text-white font-extrabold" style={{ fontSize: 20, lineHeight: 1.1 }}>{s.v}</p>
                    <p className="uppercase" style={{ fontSize: 9, letterSpacing: "1.5px", color: "rgba(226,232,240,0.7)" }}>{s.l} · {s.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Center orbit graphic */}
            <motion.div {...fade(0.2)} className="relative order-1 lg:order-2 mx-auto" style={{ width: "100%", maxWidth: 620, height: 440 }}>
              {/* decorative rings */}
              {[[0.72, 0.3], [0.56, 0.5], [0.4, 0.55]].map(([size, op], i) => (
                <div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: "45%", left: "50%", width: `${size * 100}%`, height: `${size * 100}%`,
                    border: `1px ${i === 1 ? "dashed" : "solid"} rgba(0,212,255,${0.16 * op})`,
                    transform: `translate(-50%,-50%) rotate(${i * 55}deg) scaleY(0.42)`,
                  }}
                />
              ))}
              <div className="absolute rounded-full pointer-events-none" style={{ top: "45%", left: "50%", width: 380, height: 380, background: "radial-gradient(circle,rgba(0,212,255,0.07) 0%,rgba(155,77,255,0.04) 45%,transparent 70%)", transform: "translate(-50%,-50%)" }} />

              {/* orbiting tiles + connector lines (drawn first so tiles sit above) */}
              {SERVICES.map((s, i) => (
                <OrbitService key={s.title} s={s} angleDeg={hubAngle(i)} />
              ))}

              {/* core orb */}
              <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-full flex items-center justify-center" style={{ top: "45%", left: "50%", background: "radial-gradient(circle at 38% 35%,rgba(0,212,255,0.28),rgba(10,14,30,0.96))", border: "1.5px solid rgba(0,212,255,0.6)", backdropFilter: "blur(24px)", boxShadow: "0 0 40px rgba(0,212,255,0.22), 0 0 80px rgba(155,77,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
                <div className="absolute rounded-full" style={{ left: "50%", top: "50%", width: 110, height: 110, border: "1.5px solid rgba(0,212,255,0.5)", animation: "aiOrbitPulse1 2.4s ease-out infinite" }} />
                <div className="absolute rounded-full" style={{ left: "50%", top: "50%", width: 110, height: 110, border: "1px solid rgba(155,77,255,0.4)", animation: "aiOrbitPulse2 2.4s ease-out infinite 0.8s" }} />
                <Shield size={40} strokeWidth={1.5} color="#00D4FF" style={{ filter: "drop-shadow(0 0 10px rgba(0,212,255,0.7))", position: "relative", zIndex: 1 }} />
              </div>
            </motion.div>

            {/* Right — insights panel */}
            <motion.div {...fade(0.25)} className="rounded-[22px] p-5 order-3" style={{ background: "linear-gradient(165deg,rgba(10,16,34,0.68),rgba(4,9,22,0.62))", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
              <p className="uppercase font-semibold" style={{ fontSize: 9, letterSpacing: "2px", color: "rgba(148,163,184,0.85)" }}>Insights</p>
              <p className="mb-3" style={{ fontSize: 11, color: "rgba(203,213,225,0.8)" }}>Real-time AI Analytics</p>
              <svg width="100%" height="40" viewBox="0 0 160 40" preserveAspectRatio="none" className="mb-3" style={{ overflow: "visible" }}>
                <defs>
                  <linearGradient id="aiSpark" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#9B4DFF" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
                {(() => {
                  const w = 160, h = 40;
                  const pts = SPARK_HEIGHTS.map((v, i) => [(i / (SPARK_HEIGHTS.length - 1)) * w, h - (v / 100) * h]);
                  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
                  const [lastX, lastY] = pts[pts.length - 1];
                  return (
                    <>
                      <path d={path} fill="none" stroke="url(#aiSpark)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx={lastX} cy={lastY} r={4} fill="#00D4FF" />
                    </>
                  );
                })()}
              </svg>
              <p className="text-white font-extrabold" style={{ fontSize: 26 }}>98.7%</p>
              <p className="mb-2" style={{ fontSize: 11, color: "rgba(148,163,184,0.85)" }}>System Accuracy</p>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: "98.7%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#9B4DFF,#00D4FF)" }} />
              </div>
            </motion.div>
          </div>

          {/* Bottom trusted-by bar */}
          <motion.div {...fade(0.3)} className="mt-10 flex flex-wrap items-center justify-between gap-6 py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="uppercase font-semibold" style={{ fontSize: 10, letterSpacing: "1.5px", color: "rgba(0,212,255,0.85)" }}>Trusted by Leading Enterprises</span>
              <div className="flex gap-2 flex-wrap">
                {TRUSTED_LOGOS.map((l) => (
                  <span key={l} className="px-3 py-1.5 rounded-lg font-semibold" style={{ fontSize: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0" }}>{l}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              {BOTTOM_STATS.map((s) => (
                <div key={s.l} className="text-center">
                  <p className="font-extrabold" style={{ fontSize: 16, background: "linear-gradient(135deg,#2DD4BF,#C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.v}</p>
                  <p className="uppercase" style={{ fontSize: 9, letterSpacing: "1px", color: "rgba(226,232,240,0.75)" }}>{s.l}</p>
                </div>
              ))}
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl" style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.16),rgba(155,77,255,0.16))", border: "1.5px solid rgba(0,212,255,0.5)", boxShadow: "0 0 28px rgba(0,212,255,0.18)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-white" style={{ background: "linear-gradient(135deg,#00D4FF,#9B4DFF)", fontSize: 11 }}>AI</div>
                <div>
                  <p className="text-white font-bold" style={{ fontSize: 12 }}>Built for Scale</p>
                  <p style={{ fontSize: 10, color: "rgba(203,213,225,0.75)" }}>Secure. Compliant. Reliable.</p>
                </div>
                <ChevronRight size={16} color="#00D4FF" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12">
            <p className="text-[#22d3ee] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>What We Build</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>AI Capabilities</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CAPABILITIES.map((c, i) => (
              <motion.div key={i} id={c.id} {...fade(i * 0.08)} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}
                className="rounded-2xl p-8 flex flex-col h-full" style={{ background: i % 2 === 0 ? "linear-gradient(145deg,#F0F4FF,#fff)" : "#fff", border: "1.5px solid #E0E7FF", boxShadow: "0 4px 20px rgba(34,211,238,0.06)", scrollMarginTop: 100 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#EEF2FF", color: "#22d3ee" }}>{c.tag}</span>
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 20 }}>{c.headline}</h3>
                <p className="text-[#64748B] leading-relaxed mb-5" style={{ fontSize: 14, minHeight: 66 }}>{c.desc}</p>
                <div className="rounded-xl p-4 mb-5" style={{ background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)" }}>
                  <span className="font-extrabold text-[#22d3ee]" style={{ fontSize: 22 }}>{c.stat.v}</span>
                  <span className="text-[#64748B] ml-2" style={{ fontSize: 13 }}>{c.stat.l}</span>
                </div>
                <ul className="space-y-2 mt-auto">
                  {c.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#475569]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connector — visually ties Capabilities into the Results they produce */}
      <div className="relative z-10" style={{ height: 0 }}>
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ top: -55 }}>
          <div style={{ width: 2, height: 46, background: "linear-gradient(180deg, transparent, #22d3ee)" }} />
          <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36, background: "linear-gradient(135deg,#22d3ee,#a78bfa)", boxShadow: "0 6px 20px rgba(34,211,238,0.35)" }}>
            <ArrowDown size={16} color="#fff" />
          </div>
          <div style={{ width: 2, height: 46, background: "linear-gradient(180deg, #22d3ee, transparent)" }} />
        </div>
      </div>

      {/* Results */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12">
            <p className="text-[#22d3ee] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>Proven Results</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>AI in Production</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {RESULTS.map((r, i) => {
              const outcomeRest = r.outcome.replace(r.metric, "").trim().replace(/^\w/, (c) => c.toUpperCase());
              return (
                <motion.div key={i} {...fade(i * 0.1)} whileHover={{ y: -8, boxShadow: "0 24px 56px rgba(34,211,238,0.14)" }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-white rounded-2xl p-7 pl-8 overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(15,23,42,0.07)", border: "1px solid #F1F5F9" }}>
                  <span className="absolute left-0 top-0 bottom-0" style={{ width: 4, background: "linear-gradient(180deg,#22d3ee,#a78bfa)" }} />
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#EEF2FF", color: "#22d3ee" }}>{r.tag}</span>
                    <div className="text-right">
                      <p className="font-extrabold text-[#22d3ee]" style={{ fontSize: 28 }}>{r.metric}</p>
                      <p className="text-[#94A3B8]" style={{ fontSize: 11 }}>{r.metricLabel}</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 17 }}>{r.system}</h3>
                  <p className="text-[#64748B] mb-3" style={{ fontSize: 14 }}>{outcomeRest}</p>
                  <p className="text-[#94A3B8] font-medium" style={{ fontSize: 12 }}>{r.client}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12">
            <p className="text-[#22d3ee] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>How We Work</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>Our AI Delivery Process</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p, i) => (
              <motion.div key={i} {...fade(i * 0.07)} className="rounded-2xl p-7" style={{ background: "linear-gradient(145deg,#F0F4FF,#fff)", border: "1.5px solid #E0E7FF" }}>
                <p className="font-extrabold text-[#22d3ee] mb-3" style={{ fontSize: 13, letterSpacing: "2px" }}>{p.n}</p>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 17 }}>{p.t}</h3>
                <p className="text-[#64748B] leading-relaxed" style={{ fontSize: 14 }}>{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(135deg,#050814 0%,#0a0e1f 40%,#22d3ee 100%)" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <motion.h2 {...fade()} className="text-white font-bold mb-4" style={{ fontSize: "clamp(28px,3vw,42px)", letterSpacing: "-0.5px" }}>Ready to Deploy AI in Production?</motion.h2>
          <motion.p {...fade(0.1)} className="text-white/70 mb-8 mx-auto" style={{ fontSize: 16, maxWidth: 460 }}>Start with a 2-week discovery sprint. No long contracts, just results.</motion.p>
          <motion.div {...fade(0.2)} className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact"><motion.button whileHover={{ scale: 1.04 }} className="font-semibold rounded-full" style={{ height: 52, paddingInline: 40, fontSize: 15, background: "#fff", color: "#0F172A", border: "none", cursor: "pointer" }}>Start Discovery Sprint</motion.button></Link>
            <Link href="/solutions"><motion.button whileHover={{ scale: 1.04 }} className="font-semibold rounded-full text-white" style={{ height: 52, paddingInline: 40, fontSize: 15, background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>View Case Studies</motion.button></Link>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}

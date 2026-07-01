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

const HERO_STATS = [
  { v: "47+",   l: "AI Systems Deployed" },
  { v: "$340M", l: "Value Delivered" },
  { v: "3.2×",  l: "Avg Productivity Lift" },
  { v: "Global", l: "Reach" },
];

const CAPABILITIES = [
  { icon: "◈", tag: "AI in Fintech", headline: "Financial Intelligence", desc: "From real-time fraud detection to autonomous underwriting — AI systems that handle the full complexity of modern financial services.", stat: { v: "88%", l: "of firms report revenue gain" }, items: ["Credit Risk & Underwriting AI","Real-Time Fraud Detection","Regulatory Compliance Automation (AML, KYC)","Portfolio Optimisation Engines"] },
  { icon: "◇", tag: "AI in Healthcare", headline: "Clinical & Life Sciences AI", desc: "HIPAA-compliant AI that improves patient outcomes, reduces clinical burden, and unlocks value from complex healthcare data.", stat: { v: "$150B", l: "annual savings potential (US)" }, items: ["Predictive Patient Risk Stratification","Ambient Clinical Documentation","Diagnostic Support Systems","Drug Discovery & Molecular AI"] },
  { icon: "✦", tag: "Bespoke Engineering", headline: "Bespoke AI Engineering", desc: "End-to-end AI product development — from discovery and data strategy through model engineering, MLOps, and production deployment.", stat: { v: "58%", l: "active enterprise deployment rate" }, items: ["AI Strategy & Feasibility Assessment","Data Pipeline Architecture","Custom Model Training & Fine-Tuning","LLM Application Development & RAG"] },
  { icon: "⬟", tag: "Automation & Integration", headline: "Intelligent Process Automation", desc: "AI-powered automation that eliminates manual workflows, integrates disparate systems, and surfaces operational intelligence at scale.", stat: { v: "40%", l: "average reduction in manual processing" }, items: ["Intelligent Document Processing (IDP)","AI Agent & Multi-Agent Orchestration","API Integration & Middleware","RPA + AI Hybrid Workflows"] },
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

const COMPLIANCE = ["HIPAA Compliant","SOC 2 Ready","GDPR Aligned","PCI DSS","MLOps Pipelines","Real-time Inference"];

export default function AIPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[-80px] right-[-80px] w-[480px] h-[480px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#a78bfa,transparent 70%)" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Enterprise AI</motion.p>
          <motion.h1 {...fade(0.1)} className="text-white font-bold mb-5" style={{ fontSize: "clamp(36px,4vw,58px)", letterSpacing: "-1px", lineHeight: 1.1, maxWidth: 700 }}>
            AI Built for Industries Where Precision Is Non-Negotiable
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-white/70 leading-relaxed mb-8" style={{ fontSize: 16, maxWidth: 540 }}>
            Production-grade AI systems for Fintech, Healthcare, and beyond — engineered for accuracy, compliance, and scale.
          </motion.p>
          <motion.div {...fade(0.25)} className="flex flex-wrap gap-2 mb-10">
            {COMPLIANCE.map(c => <span key={c} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#e0e7ff" }}>{c}</span>)}
          </motion.div>
          <motion.div {...fade(0.3)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HERO_STATS.map((s, i) => (
              <div key={i} className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <p className="text-white font-extrabold mb-1" style={{ fontSize: 30 }}>{s.v}</p>
                <p className="text-white/60 font-medium" style={{ fontSize: 13 }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>What We Build</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>AI Capabilities</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CAPABILITIES.map((c, i) => (
              <motion.div key={i} {...fade(i * 0.08)} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}
                className="rounded-2xl p-8 flex flex-col h-full" style={{ background: i % 2 === 0 ? "linear-gradient(145deg,#F0F4FF,#fff)" : "#fff", border: "1.5px solid #E0E7FF", boxShadow: "0 4px 20px rgba(37,99,255,0.06)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#EEF2FF", color: "#2563FF" }}>{c.tag}</span>
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 20 }}>{c.headline}</h3>
                <p className="text-[#64748B] leading-relaxed mb-5" style={{ fontSize: 14, minHeight: 66 }}>{c.desc}</p>
                <div className="rounded-xl p-4 mb-5" style={{ background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)" }}>
                  <span className="font-extrabold text-[#2563FF]" style={{ fontSize: 22 }}>{c.stat.v}</span>
                  <span className="text-[#64748B] ml-2" style={{ fontSize: 13 }}>{c.stat.l}</span>
                </div>
                <ul className="space-y-2 mt-auto">
                  {c.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#475569]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563FF] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>Proven Results</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>AI in Production</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {RESULTS.map((r, i) => {
              const outcomeRest = r.outcome.replace(r.metric, "").trim().replace(/^\w/, (c) => c.toUpperCase());
              return (
                <motion.div key={i} {...fade(i * 0.1)} whileHover={{ y: -8, boxShadow: "0 24px 56px rgba(37,99,255,0.14)" }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-white rounded-2xl p-7 pl-8 overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(15,23,42,0.07)", border: "1px solid #F1F5F9" }}>
                  <span className="absolute left-0 top-0 bottom-0" style={{ width: 4, background: "linear-gradient(180deg,#2563FF,#a78bfa)" }} />
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#EEF2FF", color: "#2563FF" }}>{r.tag}</span>
                    <div className="text-right">
                      <p className="font-extrabold text-[#2563FF]" style={{ fontSize: 28 }}>{r.metric}</p>
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
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>How We Work</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>Our AI Delivery Process</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS.map((p, i) => (
              <motion.div key={i} {...fade(i * 0.07)} className="rounded-2xl p-7" style={{ background: "linear-gradient(145deg,#F0F4FF,#fff)", border: "1.5px solid #E0E7FF" }}>
                <p className="font-extrabold text-[#2563FF] mb-3" style={{ fontSize: 13, letterSpacing: "2px" }}>{p.n}</p>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 17 }}>{p.t}</h3>
                <p className="text-[#64748B] leading-relaxed" style={{ fontSize: 14 }}>{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 40%,#2563FF 100%)" }}>
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

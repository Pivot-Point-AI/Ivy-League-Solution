import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Solutions",
  description: "Enterprise AI powered by AI Brigade — production-grade AI systems for Fintech, Healthcare, and mission-critical operations in North America.",
};

const aiCapabilities = [
  {
    area: "AI in Fintech",
    icon: "🏦",
    headline: "Financial Intelligence",
    desc: "From real-time fraud detection to autonomous underwriting — AI systems that handle the complexity of modern financial services.",
    items: [
      "Credit Risk & Underwriting AI",
      "Real-Time Fraud Detection",
      "Regulatory Compliance Automation (AML, KYC)",
      "Portfolio Optimization Engines",
    ],
    stat: "97.8% fraud recall rate",
  },
  {
    area: "AI in Healthcare",
    icon: "🏥",
    headline: "Clinical & Life Sciences AI",
    desc: "HIPAA-compliant AI solutions that improve patient outcomes, reduce clinical burden, and unlock value from healthcare data.",
    items: [
      "Predictive Patient Risk Stratification",
      "Ambient Clinical Documentation",
      "Diagnostic Support Systems",
      "Drug Discovery & Molecular AI",
    ],
    stat: "28% readmission reduction",
  },
  {
    area: "Custom AI Development",
    icon: "⚙️",
    headline: "Bespoke AI Engineering",
    desc: "End-to-end AI product development — from discovery and data strategy through model engineering, MLOps, and production deployment.",
    items: [
      "AI Strategy & Feasibility Assessment",
      "Data Pipeline Architecture",
      "Custom Model Training & Fine-Tuning",
      "LLM Application Development & RAG",
    ],
    stat: "18 AI systems in production",
  },
  {
    area: "Automation & Integrations",
    icon: "🔄",
    headline: "Intelligent Process Automation",
    desc: "AI-powered automation that eliminates manual workflows, integrates disparate systems, and surfaces intelligence across your stack.",
    items: [
      "Intelligent Document Processing (IDP)",
      "AI Agent & Multi-Agent Orchestration",
      "API Integration & Middleware",
      "RPA + AI hybrid workflows",
    ],
    stat: "$50M+ client savings delivered",
  },
];

const compliance = [
  "SOC 2 Compliant",
  "HIPAA Ready",
  "Real-time Inference",
  "MLOps Pipelines",
  "PCI DSS",
  "GDPR Aligned",
];

export default function AIPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-slate-950">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-ivy-950/30 to-gold-950/10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-radial-[circle,rgba(45,106,79,0.12),transparent] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(45,106,79,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="tag tag-gold">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                AI Brigade Division
              </span>
              <span className="tag tag-ivy">Powered by AIBrigade</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-none mb-8">
              Enterprise AI for{" "}
              <span className="italic text-gradient-gold block">
                Finance, Health &
              </span>
              <span className="italic text-gradient-ivy">
                Mission-Critical Ops
              </span>
            </h1>

            <p className="text-xl text-ivy-100/85 max-w-2xl leading-relaxed mb-10">
              Through our partnership with AI Brigade, Ivy League Solutions delivers production-grade AI 
              systems with the precision, interpretability, and regulatory rigor enterprise teams require.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { v: "97.8%", l: "Fraud Detection Recall" },
                { v: "28%", l: "Readmission Reduction" },
                { v: "$50M+", l: "Client Savings" },
                { v: "18", l: "AI Systems in Production" },
              ].map((s) => (
                <div key={s.l} className="glass border border-ivy-800/20 rounded-2xl p-5 text-center">
                  <div className="font-display text-3xl font-bold text-gradient-gold mb-1">{s.v}</div>
                  <div className="text-ivy-100/85 text-xs">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2 mb-10">
              {compliance.map((c) => (
                <span key={c} className="tag tag-ivy text-xs">{c}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-gold px-8 py-4 rounded-2xl text-base font-semibold inline-flex items-center gap-2">
                Schedule AI Consultation
                <span>→</span>
              </Link>
              <a
                href="https://aibrigade.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-8 py-4 rounded-2xl text-base font-semibold"
              >
                Visit AI Brigade ↗
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* AI Capabilities Grid */}
      <section className="py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="tag tag-gold mb-4 inline-flex">What We Deliver</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
              AI Engineered for{" "}
              <span className="italic text-gradient-gold">Real-World Impact</span>
            </h2>
            <p className="text-ivy-100/80 max-w-xl mx-auto">
              We don't build demos. We build production systems that generate measurable ROI from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {aiCapabilities.map((cap) => (
              <div
                key={cap.area}
                className="glass border border-ivy-800/20 rounded-3xl p-10 card-hover group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{cap.icon}</div>
                  <span className="tag tag-gold text-xs">{cap.stat}</span>
                </div>
                <div className="section-tag mb-2">{cap.area}</div>
                <h3 className="font-display text-2xl font-semibold text-white mb-3 group-hover:text-gold-300 transition-colors">
                  {cap.headline}
                </h3>
                <p className="text-ivy-100/80 leading-relaxed mb-6 text-sm">{cap.desc}</p>
                <div className="space-y-2">
                  {cap.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-ivy-100/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-ivy-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMBEDDED AIBRIGADE SHOWCASE */}
      <section className="py-16 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="tag tag-gold mb-4 inline-flex">Live Platform Preview</span>
            <h2 className="font-display text-4xl font-semibold text-white mb-4">
              Meet{" "}
              <span className="italic text-gradient-gold">AI Brigade</span>
            </h2>
            <p className="text-ivy-100/80 max-w-xl mx-auto text-sm">
              Our AI partner platform — live and interactive. Explore the full capabilities that 
              power Ivy League Solutions' AI offerings for North America.
            </p>
          </div>

          {/* Iframe container */}
          <div className="relative rounded-3xl overflow-hidden border border-ivy-700/30 shadow-2xl shadow-black/60">
            {/* Browser chrome */}
            <div className="bg-slate-900 border-b border-ivy-800/30 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 bg-slate-800/80 rounded-lg px-4 py-1.5 text-xs text-ivy-100/80 font-mono">
                aibrigade.vercel.app
              </div>
              <a
                href="https://aibrigade.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold-400 hover:text-gold-300 transition-colors font-mono"
              >
                Open ↗
              </a>
            </div>
            <iframe
              src="https://aibrigade.vercel.app/"
              className="w-full"
              style={{ height: "800px", border: "none" }}
              title="AI Brigade — Enterprise AI for Fintech & Healthcare"
              loading="lazy"
              allow="autoplay; clipboard-read; clipboard-write"
            />
          </div>

          <p className="text-center text-ivy-100/75 text-xs mt-4 font-mono">
            Interactive preview of aibrigade.vercel.app — our AI delivery partner platform
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="tag tag-ivy mb-4 inline-flex">Our AI Process</span>
            <h2 className="font-display text-4xl font-semibold text-white">
              From Idea to{" "}
              <span className="italic text-gradient-gold">Production AI</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-ivy-600/40 to-transparent" />
            <div className="space-y-12">
              {[
                { n: "01", t: "Discovery & Strategy", d: "We assess your data landscape, business goals, and technical constraints to build a pragmatic AI roadmap with clear ROI milestones." },
                { n: "02", t: "Data Engineering", d: "We architect and build the data pipelines, feature stores, and infrastructure needed to train and serve production AI models." },
                { n: "03", t: "Model Development", d: "Custom model training, fine-tuning, and validation — using the right approach for your data, from classical ML to large language models." },
                { n: "04", t: "MLOps & Deployment", d: "Containerized deployment with monitoring, alerting, model drift detection, and automated retraining pipelines." },
                { n: "05", t: "Ongoing Optimization", d: "Continuous model improvement, A/B testing, and performance optimization with full interpretability reporting for compliance teams." },
              ].map((step, i) => (
                <div key={i} className="pl-16 relative">
                  <div className="absolute left-0 top-1 timeline-dot" />
                  <span className="section-tag">{step.n}</span>
                  <h3 className="font-display text-2xl font-semibold text-white mt-1 mb-2">{step.t}</h3>
                  <p className="text-ivy-100/80 leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-slate-900/40 to-slate-950 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="tag tag-gold mb-6 inline-flex">Ready for AI?</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-6">
            Let's Build Your{" "}
            <span className="italic text-gradient-gold">AI System</span>
          </h2>
          <p className="text-ivy-100/80 mb-10">
            From feasibility assessment to production deployment — 
            partner with Ivy League Solutions for enterprise AI that moves the needle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold px-10 py-4 rounded-2xl font-semibold text-base">
              Schedule AI Consultation →
            </Link>
            <a
              href="https://aibrigade.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-10 py-4 rounded-2xl font-semibold text-base"
            >
              Explore AI Brigade ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

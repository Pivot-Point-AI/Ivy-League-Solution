import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Solutions",
  description: "Enterprise AI built for industries where precision is non-negotiable — Fintech, Healthcare, Retail, Manufacturing, and beyond.",
};

const capabilities = [
  {
    area: "Finance",
    tag: "AI in Fintech",
    headline: "Financial Intelligence",
    desc: "From real-time fraud detection to autonomous underwriting — we build AI systems that handle the complexity of modern financial services.",
    sub: "Autonomous Audits & Fraud Detection",
    stat: "88% of firms report revenue gain",
    items: [
      "Credit Risk & Underwriting AI",
      "Real-Time Fraud Detection",
      "Regulatory Compliance Automation (AML, KYC)",
      "Portfolio Optimization Engines",
    ],
  },
  {
    area: "Healthcare",
    tag: "AI in Healthcare",
    headline: "Clinical & Life Sciences AI",
    desc: "HIPAA-compliant AI solutions that improve patient outcomes, reduce clinical burden, and unlock value from healthcare data.",
    sub: "Diagnostics & Drug Discovery",
    stat: "$150B in annual savings (US)",
    items: [
      "Predictive Patient Risk Stratification",
      "Ambient Clinical Documentation",
      "Diagnostic Support Systems",
      "Drug Discovery & Molecular AI",
    ],
  },
  {
    area: "Retail",
    tag: "Custom AI Development",
    headline: "Bespoke AI Engineering",
    desc: "End-to-end AI product development — from discovery and data strategy through model engineering, MLOps, and production deployment.",
    sub: "Agentic Shopping & Personalization",
    stat: "58% active deployment rate",
    items: [
      "AI Strategy & Feasibility Assessment",
      "Data Pipeline Architecture",
      "Custom Model Training & Fine-Tuning",
      "LLM Application Development & RAG",
    ],
  },
  {
    area: "Manufacturing",
    tag: "Automation & Integrations",
    headline: "Intelligent Process Automation",
    desc: "AI-powered automation that eliminates manual workflows, integrates disparate systems, and surfaces intelligence across your operational stack.",
    sub: "Smart Maintenance Prediction",
    stat: "Significant reduction in downtime",
    items: [
      "Intelligent Document Processing (IDP)",
      "AI Agent & Multi-Agent Orchestration",
      "API Integration & Middleware",
      "RPA + AI Hybrid Workflows",
    ],
  },
];

const process = [
  { n: "01", t: "Discovery Sprint", d: "2-week deep-dive into your data landscape, business goals, and technical constraints. Outputs a pragmatic AI roadmap with clear ROI milestones." },
  { n: "02", t: "Architecture Design", d: "We design the data pipelines, feature stores, and infrastructure needed to train and serve production AI models at scale." },
  { n: "03", t: "Agile Build Cycles", d: "Custom model training, fine-tuning, and validation in 2-week sprints — using the right approach for your data and use case." },
  { n: "04", t: "Production Deploy", d: "Containerized deployment with monitoring, alerting, model drift detection, and automated retraining pipelines — backed by SLAs." },
  { n: "05", t: "Continuous Optimisation", d: "Ongoing model improvement, A/B testing, and performance optimization with full interpretability reporting for compliance teams." },
];

const results = [
  { client: "Midwest Capital Partners", outcome: "94.2% default prediction accuracy", system: "Neural Credit Risk Engine", tag: "Fintech" },
  { client: "Summit Health Network", outcome: "28% readmission rate reduction", system: "Predictive Readmission Intelligence", tag: "Healthcare" },
  { client: "Veritas Payment Technologies", outcome: "97.8% fraud detection rate", system: "Real-Time Transaction Fraud Detection", tag: "Fintech" },
];

const compliance = ["HIPAA Compliant", "SOC 2 Ready", "GDPR Aligned", "PCI DSS", "MLOps Pipelines", "Real-time Inference"];

export default function AIPage() {
  return (
    <>
      {/* 1 — Hero: navy */}
      <section className="hero" style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="container">
          <div className="hero-inner" style={{ maxWidth: 780 }}>
            <div className="eyebrow">AI Services</div>
            <h1 className="hero-title font-display">
              AI Built for Industries Where<br /><em>Precision is Non-Negotiable</em>
            </h1>
            <p className="hero-desc" style={{ maxWidth: 600 }}>
              Four practice areas. Hundreds of technical capabilities. One standard: production AI
              that creates measurable value from day one.
            </p>

            <div className="ai-stats-row" style={{ marginBottom: 28 }}>
              {[
                { v: "47+",   l: "AI Systems Deployed" },
                { v: "$340M", l: "Value Delivered" },
                { v: "3.2×",  l: "Avg Productivity Lift" },
                { v: "18",    l: "Countries Served" },
              ].map((s) => (
                <div key={s.l} className="ai-stat">
                  <div className="ai-stat-val font-display">{s.v}</div>
                  <div className="ai-stat-lbl">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="compliance-pills">
              {compliance.map((c) => <span key={c} className="cp">{c}</span>)}
            </div>

            <div className="hero-btns" style={{ marginTop: 32 }}>
              <Link href="/contact" className="btn-primary">Schedule AI Consultation →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Capabilities: white */}
      <section className="section">
        <div className="container">
          <div className="sh center">
            <div className="eyebrow">What We Deliver</div>
            <h2 className="font-display">AI Engineered for <em>Real-World Impact</em></h2>
            <p>We don&apos;t build demos. We build production systems that generate measurable ROI from day one.</p>
            <div className="rule center" />
          </div>
          <div className="ai-caps">
            {capabilities.map((cap) => (
              <div key={cap.tag} style={{ background: "var(--gray-50)", border: "1px solid var(--gray-100)", borderRadius: 10, padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "3px 8px", borderRadius: 3, background: "var(--navy)", color: "var(--accent)" }}>{cap.area}</span>
                  <span style={{ fontSize: 10, color: "var(--gray-400)" }}>{cap.tag}</span>
                </div>
                <h4 className="font-display" style={{ fontSize: 20, fontWeight: 600, color: "var(--navy)", marginBottom: 10 }}>{cap.headline}</h4>
                <p style={{ fontSize: 12, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 14, fontWeight: 300 }}>{cap.desc}</p>
                <div style={{ marginBottom: 16 }}>
                  {cap.items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 11, color: "var(--gray-600)", marginBottom: 5 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, marginTop: 5 }} />
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid var(--gray-100)", paddingTop: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--navy)", marginBottom: 2 }}>{cap.sub}</div>
                  <div style={{ fontSize: 10, color: "var(--accent-dark)", fontWeight: 500 }}>{cap.stat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Client Results: off-white */}
      <section className="section section-alt">
        <div className="container">
          <div className="sh">
            <div className="eyebrow">Proven Outcomes</div>
            <h2 className="font-display">Real Results, <em>Real Clients</em></h2>
            <div className="rule" />
          </div>
          <div className="port-grid">
            {results.map((r) => (
              <div key={r.client} className="port-card">
                <div className="port-client">{r.client}</div>
                <div className="port-title font-display">{r.system}</div>
                <div className="port-desc">{r.outcome}</div>
                <div className="port-outcomes">
                  <span className="tag-navy">{r.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Process: white */}
      <section className="section">
        <div className="container">
          <div className="sh center">
            <div className="eyebrow">Our AI Process</div>
            <h2 className="font-display">From Idea to <em>Production AI</em></h2>
            <div className="rule center" />
          </div>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div className="timeline-v" style={{ paddingLeft: 24 }}>
              {process.map((step) => (
                <div key={step.n} className="tl-item">
                  <div className="tl-dot" />
                  <div className="tl-year">{step.n}</div>
                  <div className="tl-title">{step.t}</div>
                  <div className="tl-desc">{step.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 — CTA: navy */}
      <section className="section section-navy">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
            <div className="eyebrow" style={{ color: "var(--accent)", justifyContent: "center" }}>Ready for AI?</div>
            <h2 className="font-display light" style={{ marginTop: 16, marginBottom: 16 }}>
              Let&apos;s Build Your <em>AI System</em>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>
              From feasibility assessment to production deployment — partner with Ivy League Solutions
              for enterprise AI that moves the needle.
            </p>
            <Link href="/contact" className="btn-primary">Schedule AI Consultation →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

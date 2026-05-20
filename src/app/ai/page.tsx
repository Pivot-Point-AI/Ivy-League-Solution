import type { Metadata } from "next";
import Link from "next/link";
import { SharedNav, SharedFooter } from "@/components/SharedNav";

export const metadata: Metadata = {
  title: "AI Solutions — Ivy League Solutions",
  description: "Enterprise AI built for industries where precision is non-negotiable — Fintech, Healthcare, Retail, Manufacturing, and beyond.",
};

/* ─── Data ─────────────────────────────────────────────── */
const heroStats = [
  { v: "47+",   l: "AI Systems Deployed"   },
  { v: "$340M", l: "Value Delivered"        },
  { v: "3.2×",  l: "Avg Productivity Lift"  },
  { v: "18",    l: "Countries Served"       },
];

const compliance = [
  "HIPAA Compliant", "SOC 2 Ready", "GDPR Aligned",
  "PCI DSS", "MLOps Pipelines", "Real-time Inference",
];

const capabilities = [
  {
    area: "Finance", icon: "◈",
    tag: "AI in Fintech",
    headline: "Financial Intelligence",
    desc: "From real-time fraud detection to autonomous underwriting — AI systems that handle the full complexity of modern financial services.",
    stat: { v: "88%", l: "of firms report revenue gain" },
    items: [
      "Credit Risk & Underwriting AI",
      "Real-Time Fraud Detection",
      "Regulatory Compliance Automation (AML, KYC)",
      "Portfolio Optimisation Engines",
    ],
  },
  {
    area: "Healthcare", icon: "◇",
    tag: "AI in Healthcare",
    headline: "Clinical & Life Sciences AI",
    desc: "HIPAA-compliant AI that improves patient outcomes, reduces clinical burden, and unlocks value from complex healthcare data.",
    stat: { v: "$150B", l: "annual savings potential (US)" },
    items: [
      "Predictive Patient Risk Stratification",
      "Ambient Clinical Documentation",
      "Diagnostic Support Systems",
      "Drug Discovery & Molecular AI",
    ],
  },
  {
    area: "Custom AI", icon: "✦",
    tag: "Bespoke Engineering",
    headline: "Bespoke AI Engineering",
    desc: "End-to-end AI product development — from discovery and data strategy through model engineering, MLOps, and production deployment.",
    stat: { v: "58%", l: "active enterprise deployment rate" },
    items: [
      "AI Strategy & Feasibility Assessment",
      "Data Pipeline Architecture",
      "Custom Model Training & Fine-Tuning",
      "LLM Application Development & RAG",
    ],
  },
  {
    area: "Manufacturing", icon: "⬟",
    tag: "Automation & Integration",
    headline: "Intelligent Process Automation",
    desc: "AI-powered automation that eliminates manual workflows, integrates disparate systems, and surfaces operational intelligence at scale.",
    stat: { v: "40%", l: "average reduction in manual processing" },
    items: [
      "Intelligent Document Processing (IDP)",
      "AI Agent & Multi-Agent Orchestration",
      "API Integration & Middleware",
      "RPA + AI Hybrid Workflows",
    ],
  },
];

const process = [
  { n: "01", t: "Discovery Sprint",        d: "2-week deep-dive into your data landscape, business goals, and technical constraints. Outputs a pragmatic AI roadmap with clear ROI milestones." },
  { n: "02", t: "Architecture Design",     d: "We design the data pipelines, feature stores, and infrastructure needed to train and serve production AI models at scale." },
  { n: "03", t: "Agile Build Cycles",      d: "Custom model training, fine-tuning, and validation in 2-week sprints — using the right approach for your data and use case." },
  { n: "04", t: "Production Deploy",       d: "Containerised deployment with monitoring, alerting, model drift detection, and automated retraining pipelines — backed by SLAs." },
  { n: "05", t: "Continuous Optimisation", d: "Ongoing model improvement, A/B testing, and performance optimisation with full interpretability reporting for compliance teams." },
];

const results = [
  {
    client: "Midwest Capital Partners",
    outcome: "94.2% default prediction accuracy",
    system: "Neural Credit Risk Engine",
    tag: "Fintech",
    metric: "94.2%",
    metricLabel: "Accuracy",
  },
  {
    client: "Summit Health Network",
    outcome: "28% readmission rate reduction",
    system: "Predictive Readmission Intelligence",
    tag: "Healthcare",
    metric: "28%",
    metricLabel: "Reduction",
  },
  {
    client: "Veritas Payment Technologies",
    outcome: "97.8% fraud detection rate",
    system: "Real-Time Transaction Fraud Detection",
    tag: "Fintech",
    metric: "97.8%",
    metricLabel: "Detection Rate",
  },
];

const techStack = [
  { cat: "Models & LLMs",     items: ["GPT-4o", "Claude", "Llama 3", "Mistral", "Custom Fine-Tunes"] },
  { cat: "ML Frameworks",     items: ["TensorFlow", "PyTorch", "scikit-learn", "XGBoost", "Hugging Face"] },
  { cat: "MLOps & Infra",     items: ["MLflow", "Kubeflow", "AWS SageMaker", "Azure ML", "Vertex AI"] },
  { cat: "Data & Pipelines",  items: ["Apache Spark", "Kafka", "Airflow", "dbt", "Snowflake"] },
];

/* ─── Page ──────────────────────────────────────────────── */
export default function AIPage() {
  return (
    <>
      <SharedNav />
      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className="page-hero" style={{ paddingBottom: "clamp(48px,6vw,96px)" }}>
        {/* Decorative rings */}
        <div style={{ position:"absolute", right:-160, top:-160, width:700, height:700, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.06)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:-60,  top:-60,  width:380, height:380, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:-100, bottom:-100, width:400, height:400, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.05)", pointerEvents:"none" }} />

        <div className="page-hero-inner">
          <p className="page-eyebrow">AI Solutions</p>

          <h1 className="page-h1" style={{ maxWidth: 820 }}>
            AI Built for Industries Where<br />
            <em>Precision is Non-Negotiable</em>
          </h1>

          <p className="page-hero-desc" style={{ marginBottom: 32 }}>
            Four practice areas. Hundreds of technical capabilities. One standard — production AI
            that creates measurable value from day one, not a proof of concept.
          </p>

          {/* Compliance pills */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:40 }}>
            {compliance.map((c) => (
              <span key={c} style={{ fontSize:11, fontWeight:500, padding:"5px 14px", borderRadius:100, border:"1px solid rgba(120,235,84,0.25)", color:"var(--rs-green)", background:"rgba(120,235,84,0.06)", fontFamily:"var(--rs-font)" }}>{c}</span>
            ))}
          </div>

          <div className="page-hero-btns" style={{ marginBottom:56 }}>
            <Link href="/contact" className="btn-green">Schedule AI Consultation →</Link>
            <Link href="/solutions" className="btn-white-outline">View Case Studies</Link>
          </div>

          {/* Stats strip */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden", maxWidth:800 }}>
            {heroStats.map((s) => (
              <div key={s.l} style={{ background:"rgba(255,255,255,0.03)", padding:"20px 16px", textAlign:"center" }}>
                <div style={{ fontSize:"clamp(22px,2.5vw,36px)", fontWeight:700, color:"var(--rs-green)", lineHeight:1, marginBottom:6, fontFamily:"var(--rs-font)" }}>{s.v}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", fontFamily:"var(--rs-font)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. CAPABILITY AREAS ─────────────────────────── */}
      <section className="page-section page-section-white">
        <div className="page-inner">
          <div style={{ marginBottom:48 }}>
            <p className="page-sh-label">Practice Areas</p>
            <h2 className="page-h2">AI Engineered for <em>Real-World Impact</em></h2>
            <p style={{ fontSize:14, color:"rgba(0,0,0,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", maxWidth:560, marginTop:8 }}>
              We don&apos;t build demos. We build production systems that generate measurable ROI from day one.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
            {capabilities.map((cap, i) => (
              <div key={cap.tag} style={{
                background:    i % 2 === 0 ? "#000" : "var(--rs-gray)",
                border:        i % 2 === 0 ? "1px solid rgba(120,235,84,0.18)" : "1px solid rgba(0,0,0,0.07)",
                borderRadius:  20,
                padding:       "clamp(28px,3vw,44px)",
                position:      "relative",
                overflow:      "hidden",
                display:       "flex",
                flexDirection: "column",
                gap:           20,
                minHeight:     360,
              }}>
                {/* Background icon */}
                <div style={{ position:"absolute", right:24, bottom:24, fontSize:100, opacity: i%2===0 ? 0.05 : 0.07, color: i%2===0 ? "#78EB54" : "#000", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>
                  {cap.icon}
                </div>

                {/* Header row */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, padding:"4px 12px", borderRadius:100, background: i%2===0 ? "rgba(120,235,84,0.14)" : "rgba(0,0,0,0.08)", color: i%2===0 ? "var(--rs-green)" : "#3a9e20", border:`1px solid ${i%2===0 ? "rgba(120,235,84,0.3)" : "rgba(120,235,84,0.2)"}`, fontFamily:"var(--rs-font)" }}>
                    {cap.area}
                  </span>
                  <span style={{ fontSize:10, color: i%2===0 ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", fontFamily:"var(--rs-font)" }}>{cap.tag}</span>
                </div>

                {/* Title + desc */}
                <div>
                  <h3 style={{ fontSize:"clamp(20px,1.875vw,30px)", fontWeight:600, color: i%2===0 ? "#fff" : "var(--rs-black)", margin:"0 0 10px", fontFamily:"var(--rs-font)", lineHeight:1.2 }}>{cap.headline}</h3>
                  <p style={{ fontSize:13, color: i%2===0 ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)" }}>{cap.desc}</p>
                </div>

                {/* Feature list */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 16px" }}>
                  {cap.items.map((item) => (
                    <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:12, color: i%2===0 ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", fontFamily:"var(--rs-font)", lineHeight:1.5 }}>
                      <span style={{ width:4, height:4, borderRadius:"50%", background:"var(--rs-green)", flexShrink:0, marginTop:5 }} />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Stat footer */}
                <div style={{ marginTop:"auto", paddingTop:16, borderTop:`1px solid ${i%2===0 ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, display:"flex", alignItems:"center", gap:14 }}>
                  <span style={{ fontSize:"clamp(22px,2vw,32px)", fontWeight:700, color:"var(--rs-green)", fontFamily:"var(--rs-font)", lineHeight:1 }}>{cap.stat.v}</span>
                  <span style={{ fontSize:12, color: i%2===0 ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)", fontFamily:"var(--rs-font)", lineHeight:1.4 }}>{cap.stat.l}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROVEN RESULTS ───────────────────────────── */}
      <section className="page-section page-section-dark">
        <div className="page-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:64, alignItems:"start" }}>
            <div style={{ position:"sticky", top:120 }}>
              <p className="page-sh-label">Proven Outcomes</p>
              <h2 className="page-h2 page-h2-light">Real Results,<br /><em>Real Clients</em></h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", marginTop:14, marginBottom:32 }}>
                Every engagement is measured against production-grade benchmarks — not prototype metrics.
              </p>
              <Link href="/solutions" className="btn-green">All Case Studies →</Link>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {results.map((r) => (
                <div key={r.client} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"clamp(20px,2vw,28px)", display:"grid", gridTemplateColumns:"auto 1fr", gap:24, alignItems:"center", transition:"border-color 0.2s" }}>
                  {/* Big metric */}
                  <div style={{ textAlign:"center", minWidth:90 }}>
                    <div style={{ fontSize:"clamp(28px,3vw,44px)", fontWeight:700, color:"var(--rs-green)", lineHeight:1, fontFamily:"var(--rs-font)" }}>{r.metric}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontFamily:"var(--rs-font)", marginTop:4, letterSpacing:"0.06em", textTransform:"uppercase" as const }}>{r.metricLabel}</div>
                  </div>
                  {/* Details */}
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, padding:"3px 10px", borderRadius:100, background:"rgba(120,235,84,0.1)", color:"var(--rs-green)", border:"1px solid rgba(120,235,84,0.22)", fontFamily:"var(--rs-font)" }}>{r.tag}</span>
                      <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", fontFamily:"var(--rs-font)", fontWeight:500, letterSpacing:"0.04em" }}>{r.client}</span>
                    </div>
                    <div style={{ fontSize:"clamp(15px,1.04vw,18px)", fontWeight:600, color:"#fff", marginBottom:6, fontFamily:"var(--rs-font)", lineHeight:1.3 }}>{r.system}</div>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", fontFamily:"var(--rs-font)", lineHeight:1.6 }}>{r.outcome}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. DELIVERY PROCESS ─────────────────────────── */}
      <section className="page-section page-section-gray">
        <div className="page-inner">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:64, alignItems:"start" }}>
            <div style={{ position:"sticky", top:120 }}>
              <p className="page-sh-label">Our AI Process</p>
              <h2 className="page-h2">From Idea to <em>Production AI</em></h2>
              <p style={{ fontSize:14, color:"rgba(0,0,0,0.5)", lineHeight:1.75, fontFamily:"var(--rs-font)", marginTop:14, marginBottom:32 }}>
                A repeatable, enterprise-grade delivery model — from feasibility sprint to live deployment with SLA-backed support.
              </p>
              <Link href="/contact" className="btn-green">Start a Project →</Link>
            </div>

            {/* Process steps */}
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {process.map((step, i) => (
                <div key={step.n} style={{ display:"grid", gridTemplateColumns:"56px 1fr", gap:20, paddingBottom: i < process.length-1 ? 28 : 0, marginBottom: i < process.length-1 ? 0 : 0, position:"relative" }}>
                  {/* Left: number + line */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"#fff", border:"1.5px solid rgba(120,235,84,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, zIndex:1 }}>
                      <span style={{ fontSize:12, fontWeight:700, color:"var(--rs-green)", fontFamily:"var(--rs-font)" }}>{step.n}</span>
                    </div>
                    {i < process.length-1 && (
                      <div style={{ width:1, flex:1, background:"rgba(0,0,0,0.1)", marginTop:6 }} />
                    )}
                  </div>
                  {/* Right: content */}
                  <div style={{ paddingBottom: i < process.length-1 ? 28 : 0 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:"var(--rs-black)", marginBottom:6, fontFamily:"var(--rs-font)" }}>{step.t}</div>
                    <div style={{ fontSize:13, color:"rgba(0,0,0,0.55)", lineHeight:1.7, fontFamily:"var(--rs-font)" }}>{step.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TECH STACK ───────────────────────────────── */}
      <section className="page-section page-section-white">
        <div className="page-inner">
          <div style={{ marginBottom:48 }}>
            <p className="page-sh-label">Technology Stack</p>
            <h2 className="page-h2">Built on the <em>Right Tools</em></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {techStack.map((group) => (
              <div key={group.cat} style={{ background:"var(--rs-gray)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:16, padding:24 }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"var(--rs-green)", marginBottom:16, fontFamily:"var(--rs-font)" }}>{group.cat}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {group.items.map((item) => (
                    <div key={item} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"rgba(0,0,0,0.65)", fontFamily:"var(--rs-font)" }}>
                      <span style={{ width:4, height:4, borderRadius:"50%", background:"var(--rs-green)", flexShrink:0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ──────────────────────────────────────── */}
      <section className="page-section page-section-gray">
        <div className="page-inner">
          <div style={{ background:"#000", borderRadius:24, padding:"clamp(48px,5vw,80px) clamp(32px,4.2vw,64px)", display:"grid", gridTemplateColumns:"1fr auto", gap:40, alignItems:"center", position:"relative", overflow:"hidden" }}>
            {/* Rings */}
            <div style={{ position:"absolute", right:-80, bottom:-80, width:320, height:320, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.1)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:40, bottom:40, width:160, height:160, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.07)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", left:-40, top:-40, width:200, height:200, borderRadius:"50%", border:"1px solid rgba(120,235,84,0.06)", pointerEvents:"none" }} />

            <div style={{ position:"relative", zIndex:1 }}>
              <p className="page-eyebrow">Ready for AI?</p>
              <h2 style={{ fontSize:"clamp(24px,2.6vw,48px)", fontWeight:500, color:"#fff", lineHeight:1.2, margin:"0 0 12px", fontFamily:"var(--rs-font)" }}>
                Let&apos;s Build Your <em style={{ color:"var(--rs-green)", fontStyle:"normal" }}>AI System</em>
              </h2>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, margin:0, fontFamily:"var(--rs-font)", maxWidth:480 }}>
                From feasibility assessment to production deployment — partner with Ivy League Solutions for enterprise AI that moves the needle.
              </p>
            </div>

            <div style={{ display:"flex", flexDirection:"column" as const, gap:12, flexShrink:0, position:"relative", zIndex:1 }}>
              <Link href="/contact" className="btn-green">Schedule AI Consultation →</Link>
              <Link href="/solutions" className="btn-white-outline" style={{ textAlign:"center" as const }}>View Case Studies</Link>
            </div>
          </div>
        </div>
      </section>
      <SharedFooter />
    </>
  );
}

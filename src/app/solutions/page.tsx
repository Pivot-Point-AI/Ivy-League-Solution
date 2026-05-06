import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Portfolio" };

const projects = [
  { cat:"Fintech",        client:"MidWest Capital Partners",    title:"Neural Credit Risk Engine",      desc:"Multi-layer neural model on 7 years of transaction data. 94.2% accuracy.", outcomes:["94.2% accuracy","8s processing","31% loss reduction"],   tech:["Python","TensorFlow","AWS"] },
  { cat:"Healthcare",     client:"Regional Health Network",     title:"Clinical Documentation AI",      desc:"HIPAA-compliant ambient documentation using speech AI and LLMs.",     outcomes:["60% time reduction","HIPAA compliant","28% readmission drop"], tech:["Python","OpenAI","FHIR"] },
  { cat:"Infrastructure", client:"Emaco Facility, UAE",         title:"Oracle DB Configuration",        desc:"Enterprise database and SQL services across multiple UAE sites.",         outcomes:["99.9% uptime SLA","50% query optimization"],               tech:["Oracle DB","SQL","Linux"] },
  { cat:"ERP",            client:"Bisha Mining",                title:"Microsoft NAV ERP",              desc:"Full NAV ERP deployment, customization and integration for mining.",     outcomes:["Full NAV deployment","Custom mining modules"],              tech:["Microsoft NAV","Dynamics"] },
  { cat:"Infrastructure", client:"Al Nahla Technologies, Oman",  title:"Huawei iMaster Campus",          desc:"2 core switches, 12 access switches, 36 APs on Huawei iMaster NCE.",  outcomes:["50-site campus","36 APs deployed"],                         tech:["Huawei iMaster","NCE"] },
  { cat:"ERP",            client:"Housing Society Group",       title:"Residential Society ERP",        desc:"Complete ERP for digital management of residential complexes.",          outcomes:["10,000+ units","Real-time billing"],                        tech:["React","Node.js","PostgreSQL"] },
  { cat:"E-Commerce",     client:"Retail Chain",                title:"Multi-Vendor Platform",          desc:"Custom multi-vendor e-commerce with real-time inventory management.",   outcomes:["3x order volume","Multi-vendor support"],                   tech:["Next.js","Stripe","MongoDB"] },
  { cat:"Academia",       client:"EdTech Institution",          title:"Personalized LMS Platform",      desc:"AI-driven LMS with adaptive testing and real-time analytics.",           outcomes:["50,000+ students","40% engagement boost"],                 tech:["React","Python","AI/ML"] },
  { cat:"Logistics",      client:"Regional Logistics Group",    title:"Fleet & Warehouse Platform",     desc:"Logistics platform for fleet, warehouse, and transportation management.", outcomes:["30% fuel savings","Real-time tracking"],                    tech:["React","Node.js","IoT"] },
];

export default function SolutionsPage() {
  return (
    <>
      <section style={{ background: "var(--navy)", padding: "80px 0 68px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -80, top: -80, width: 520, height: 520, borderRadius: "50%", background: "rgba(200,169,110,0.05)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Our Portfolio</div>
          <h1 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 600, lineHeight: 1.08, color: "white", margin: "0 0 20px" }}>
            Delivered Solutions,<br /><em style={{ color: "var(--accent)", fontStyle: "italic" }}>Proven Results</em>
          </h1>
          <p style={{ fontSize: 15, color: "white", lineHeight: 1.75, maxWidth: 480, fontWeight: 300 }}>
            200+ enterprise deployments spanning 15+ industries and 20+ countries.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="port-grid">
            {projects.map((p, i) => (
              <div key={i} className="port-card">
                <div style={{ marginBottom: 8 }}>
                  <span className="tag-navy">{p.cat}</span>
                </div>
                <div className="port-client">{p.client}</div>
                <div className="port-title font-display">{p.title}</div>
                <div className="port-desc">{p.desc}</div>
                <div className="port-outcomes">
                  {p.outcomes.map((o) => <span key={o} className="outcome-pill">{o}</span>)}
                </div>
                <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap" as const, gap: 4 }}>
                  {p.tech.map((t) => <span key={t} className="tag-sm">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" style={{ paddingTop: 0, paddingBottom: 48 }}>
        <div className="container">
          <div className="cta-block">
            <div>
              <h3 className="font-display">Your Project Could Be <em>Next</em></h3>
              <p>Let&apos;s discuss how we can deliver measurable results for your organization.</p>
            </div>
            <div className="cta-btns">
              <Link href="/contact" className="btn-navy">Start a Conversation →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
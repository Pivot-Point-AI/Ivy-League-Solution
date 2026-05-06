import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Services" };

const dts = [
  { icon: "⬡", id: "software",    title: "Software Development",   desc: "Web, mobile, and enterprise apps from concept to production.", tech: ["React","Next.js","Node.js","Python",".NET"] },
  { icon: "◈", id: "commerce",    title: "Digital Commerce",        desc: "Custom storefronts, PIM, payment integrations that scale.", tech: ["Shopify","WooCommerce","Custom","PIM"] },
  { icon: "◇", id: "modernize",   title: "App Modernization",       desc: "Legacy to cloud-native migration and re-architecture.", tech: ["Microservices","Docker","Kubernetes","Cloud-native"] },
  { icon: "△", id: "uiux",        title: "UI/UX Design",            desc: "Design systems, prototyping, user research and brand identity.", tech: ["Figma","Design Systems","Prototyping","Research"] },
  { icon: "✦", id: "erp",         title: "ERP Solutions",           desc: "Customized ERP for SMEs and enterprise organizations.", tech: ["Microsoft NAV","SAP","Oracle","Custom ERP"] },
  { icon: "◎", id: "banking",     title: "Mobile Banking",          desc: "FINTRAC-compliant mobile payment and banking platforms.", tech: ["React Native","iOS","Android","Payment APIs"] },
  { icon: "○", id: "web",         title: "Web & Full Stack",        desc: "End-to-end web development, APIs, and backend services.", tech: ["React","Vue","PostgreSQL","MongoDB"] },
  { icon: "⬟", id: "health",      title: "Health Solutions",        desc: "HIPAA-compliant healthcare platforms and EHR integrations.", tech: ["FHIR","HL7","HIPAA","EHR"] },
  { icon: "◫", id: "academia",    title: "Academia Solutions",      desc: "LMS, adaptive testing, and institutional management.", tech: ["LMS","SCORM","AI Tutoring","Analytics"] },
];

const dis = [
  { icon: "⟁", id: "network",    title: "Network Services",        desc: "Cisco, Aruba, Huawei certified network infrastructure.", tech: ["Cisco","Aruba","Huawei","SD-WAN"] },
  { icon: "◻", id: "virtual",    title: "Virtualization",          desc: "VMware, Hyper-V, and cloud virtualization solutions.", tech: ["VMware","Hyper-V","KVM","Nutanix"] },
  { icon: "⊡", id: "datacenter", title: "Datacenter Services",     desc: "Onsite, colocation, hyperscale and edge datacenters.", tech: ["Co-location","Edge DC","Hyperscale"] },
  { icon: "⊕", id: "enterprise", title: "Enterprise Applications",  desc: "EAI, iPaaS, MuleSoft and Azure Integration.", tech: ["EAI","iPaaS","MuleSoft","Azure"] },
  { icon: "⊗", id: "database",   title: "Database Services",       desc: "Oracle, SQL Server, PostgreSQL managed services.", tech: ["Oracle","SQL Server","PostgreSQL","MongoDB"] },
  { icon: "⊙", id: "cloud",      title: "Cloud Services",          desc: "Multi-cloud: AWS, Azure, GCP and private cloud.", tech: ["AWS","Azure","GCP","Private Cloud"] },
  { icon: "⊘", id: "security",   title: "Security Services",       desc: "Fortinet, Zero Trust, cybersecurity assessments.", tech: ["Fortinet","CrowdStrike","Zero Trust","SIEM"] },
  { icon: "⊛", id: "noc",        title: "NOC / SOC",               desc: "24/7 threat monitoring and incident response.", tech: ["24/7 Monitoring","SIEM","SOAR","Threat Intel"] },
  { icon: "⊝", id: "backup",     title: "Backup & DR",             desc: "Veeam, Zerto — meet your RPO/RTO commitments.", tech: ["Veeam","Zerto","Cloud DR","BCP"] },
];

export default function ServicesPage() {
  return (
    <>
      <section style={{ background: "var(--navy)", padding: "80px 0 68px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -80, top: -80, width: 520, height: 520, borderRadius: "50%", background: "rgba(200,169,110,0.05)", pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Our Services</div>
          <h1 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 600, lineHeight: 1.08, color: "white", margin: "0 0 20px" }}>
            Full-Spectrum <em style={{ color: "var(--accent)", fontStyle: "italic" }}>IT Services</em>
          </h1>
          <p style={{ fontSize: 15, color: "white", lineHeight: 1.75, maxWidth: 520, fontWeight: 300 }}>
            From digital transformation to infrastructure modernization — enterprise-grade technology services for North American businesses.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Digital Technological Services</div>
            <h2 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--navy)", marginBottom: 8 }}>Software & <em style={{ color: "var(--accent-dark)", fontStyle: "italic" }}>Digital Innovation</em></h2>
            <div className="rule" />
          </div>
          <div className="svc-grid">
            {dts.map((s) => (
              <div key={s.id} id={s.id} className="svc-card" style={{ cursor: "default" }}>
                <div className="svc-icon">{s.icon}</div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-desc">{s.desc}</div>
                <div className="svc-tags">{s.tech.map((t) => <span key={t} className="tag-sm">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Digital Infrastructure Services</div>
            <h2 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--navy)", marginBottom: 8 }}>Infrastructure & <em style={{ color: "var(--accent-dark)", fontStyle: "italic" }}>Operations</em></h2>
            <div className="rule" />
          </div>
          <div className="svc-grid">
            {dis.map((s) => (
              <div key={s.id} id={s.id} className="svc-card" style={{ cursor: "default" }}>
                <div className="svc-icon">{s.icon}</div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-desc">{s.desc}</div>
                <div className="svc-tags">{s.tech.map((t) => <span key={t} className="tag-sm">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-block">
            <div>
              <h3 className="font-display">Need a Custom <em>Service Bundle?</em></h3>
              <p>Tell us your challenge and we&apos;ll assemble the right team and service mix.</p>
            </div>
            <div className="cta-btns">
              <Link href="/contact" className="btn-navy">Request a Consultation →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
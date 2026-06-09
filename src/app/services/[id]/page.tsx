"use client";

import React from "react";
import { motion } from "framer-motion";
import { SharedNav, SharedFooter } from "@/components/SharedNav";
import Link from "next/link";
import { useParams } from "next/navigation";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

const SERVICE_DETAILS: Record<string, {
  title: string;
  tagline: string;
  overview: string;
  highlights: { title: string; desc: string }[];
  tech: string[];
  cat: string;
}> = {
  software: {
    title: "Software Development",
    tagline: "From concept to production — built to scale.",
    overview: "We deliver end-to-end custom software for web, mobile, and enterprise. Our teams work in agile sprints, ensuring full transparency at every milestone — from architecture review through QA sign-off and post-launch support.",
    highlights: [
      { title: "Full-stack Web Apps", desc: "Scalable React and Next.js frontends backed by Node.js, Python or .NET APIs designed for high availability." },
      { title: "Mobile Applications", desc: "Native and cross-platform iOS and Android apps built with React Native, optimised for performance and app store standards." },
      { title: "Enterprise Platforms", desc: "Secure, role-based enterprise systems with SSO, audit trails, and integration-ready APIs for ERP and CRM systems." },
      { title: "API & Integration", desc: "RESTful and GraphQL APIs, third-party integrations, and event-driven microservices architectures." },
    ],
    tech: ["React", "Next.js", "Node.js", "Python", ".NET", "PostgreSQL", "Docker"],
    cat: "Software & Digital",
  },
  ai: {
    title: "AI & Machine Learning",
    tagline: "Production-grade intelligence at enterprise scale.",
    overview: "We build AI systems that actually ship — fraud detection engines, predictive analytics pipelines, LLM-powered products, and intelligent automation. Every model is designed for production reliability, not just demo accuracy.",
    highlights: [
      { title: "LLM & Generative AI", desc: "Custom GPT-4 and Claude integrations, RAG pipelines, and fine-tuned models for domain-specific use cases." },
      { title: "Fraud Detection", desc: "Real-time ML models for transaction risk scoring used by fintech clients processing millions of events daily." },
      { title: "Predictive Analytics", desc: "Time-series forecasting, demand planning, and business intelligence dashboards backed by MLOps pipelines." },
      { title: "AI Automation", desc: "Intelligent document processing, workflow automation, and AI agents that reduce manual operational overhead." },
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "LangChain", "MLflow", "AWS SageMaker", "OpenAI API"],
    cat: "Software & Digital",
  },
  commerce: {
    title: "Digital Commerce",
    tagline: "Storefronts that convert, platforms that scale.",
    overview: "From custom-built e-commerce platforms to headless Shopify and WooCommerce implementations, we build commerce experiences that are fast, secure, and optimised for conversion at any scale.",
    highlights: [
      { title: "Headless Commerce", desc: "Decoupled storefronts using Next.js and Shopify Storefront API for blazing fast, SEO-optimised shopping experiences." },
      { title: "Custom Platforms", desc: "Fully bespoke commerce platforms with custom checkout, subscriptions, multi-currency, and B2B pricing models." },
      { title: "PIM & Catalogue", desc: "Product information management systems with multi-channel syndication, variant management, and bulk import/export." },
      { title: "Payment Integration", desc: "Stripe, PayPal, and bank-grade payment gateway integrations with fraud screening and PCI-DSS compliance." },
    ],
    tech: ["Shopify", "WooCommerce", "Next.js", "Stripe", "Algolia", "PIM Systems"],
    cat: "Software & Digital",
  },
  modernize: {
    title: "App Modernization",
    tagline: "Legacy to cloud-native — zero downtime.",
    overview: "We migrate and re-architect legacy monoliths into modern, cloud-native systems without disrupting operations. Our phased approach ensures data continuity and business continuity at every step of the transformation.",
    highlights: [
      { title: "Legacy Assessment", desc: "Technical debt audit, dependency mapping, and a phased modernisation roadmap aligned to your risk tolerance." },
      { title: "Microservices Migration", desc: "Breaking monoliths into independently deployable services using domain-driven design and event sourcing." },
      { title: "Containerisation", desc: "Docker and Kubernetes deployments with CI/CD pipelines for reliable, repeatable builds and zero-downtime releases." },
      { title: "Cloud Migration", desc: "Lift-and-shift to AWS or Azure with infrastructure-as-code, cost optimisation, and security hardening." },
    ],
    tech: ["Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Kafka", "Microservices"],
    cat: "Software & Digital",
  },
  uiux: {
    title: "UI/UX Design",
    tagline: "Design that users love and stakeholders approve.",
    overview: "We design digital products from the ground up — user research, information architecture, wireframes, interactive prototypes, and pixel-perfect high-fidelity designs. Every decision is grounded in user behaviour data.",
    highlights: [
      { title: "User Research", desc: "Interviews, usability testing, and analytics analysis to surface real user pain points before design begins." },
      { title: "Wireframing & Prototyping", desc: "Low and high-fidelity wireframes and clickable Figma prototypes for stakeholder sign-off before development starts." },
      { title: "Design Systems", desc: "Scalable component libraries in Figma with developer-ready tokens, spacing, typography, and colour guidelines." },
      { title: "Brand & Visual Identity", desc: "Logo design, brand guidelines, and visual language that communicates authority and trust in your market." },
    ],
    tech: ["Figma", "Adobe XD", "Zeroheight", "Hotjar", "UserTesting", "Lottie"],
    cat: "Software & Digital",
  },
  erp: {
    title: "ERP Solutions",
    tagline: "Tailored ERP that fits your business — not the other way around.",
    overview: "We implement, customise, and build ERP systems for SMEs and enterprise organisations. Whether that's Microsoft Dynamics NAV, SAP, Oracle, or a fully custom platform — we own the full lifecycle from requirements to go-live.",
    highlights: [
      { title: "Microsoft Dynamics NAV", desc: "Full NAV/Business Central implementation and customisation for manufacturing, distribution, and service industries." },
      { title: "SAP Implementation", desc: "SAP S/4HANA and SAP Business One deployments with module configuration, data migration, and training." },
      { title: "Oracle ERP", desc: "Oracle Cloud ERP implementation covering finance, procurement, project management, and HR modules." },
      { title: "Custom ERP", desc: "Bespoke ERP platforms built from the ground up when off-the-shelf products cannot meet your business requirements." },
    ],
    tech: ["Microsoft NAV", "SAP S/4HANA", "Oracle Cloud", "Business Central", "Power BI"],
    cat: "Software & Digital",
  },
  banking: {
    title: "Mobile Banking",
    tagline: "Compliant, secure mobile banking built for regulated markets.",
    overview: "We build FINTRAC and PSD2-compliant mobile banking and payment platforms for fintech startups and established financial institutions. Security, compliance, and UX are engineered in from day one.",
    highlights: [
      { title: "Mobile Banking Apps", desc: "iOS and Android banking applications with biometric authentication, real-time notifications, and account management." },
      { title: "Payment Platforms", desc: "P2P transfers, bill payments, and multi-currency wallets built on certified payment rails." },
      { title: "Compliance Engineering", desc: "KYC/AML workflows, FINTRAC reporting, and PSD2 open banking integrations built to regulatory specifications." },
      { title: "Security Architecture", desc: "End-to-end encryption, certificate pinning, fraud detection, and third-party penetration testing." },
    ],
    tech: ["React Native", "iOS", "Android", "Plaid", "Stripe", "Payment APIs", "Biometrics"],
    cat: "Software & Digital",
  },
  web: {
    title: "Web & Full Stack",
    tagline: "End-to-end web engineering for performance and reliability.",
    overview: "We build the full web stack — from responsive frontends to high-throughput APIs and scalable backend services. Every system is designed for performance, observability, and long-term maintainability.",
    highlights: [
      { title: "Frontend Engineering", desc: "React and Vue.js applications with server-side rendering, static generation, and optimised Core Web Vitals scores." },
      { title: "Backend Services", desc: "RESTful and GraphQL APIs, microservices, and worker services built on Node.js, Python, or .NET." },
      { title: "Database Design", desc: "Schema design, query optimisation, and managed PostgreSQL, MongoDB, and Redis setups for production workloads." },
      { title: "Performance & Observability", desc: "APM integration, distributed tracing, structured logging, and alerting so you see problems before your users do." },
    ],
    tech: ["React", "Vue.js", "Node.js", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
    cat: "Software & Digital",
  },
  health: {
    title: "Health Solutions",
    tagline: "HIPAA-compliant platforms that improve patient outcomes.",
    overview: "We engineer healthcare software for providers, payers, and healthtech startups — EHR integrations, clinical decision support, patient portals, and telehealth platforms, all built to HIPAA and HL7/FHIR standards.",
    highlights: [
      { title: "EHR Integration", desc: "Certified HL7 FHIR R4 integrations with Epic, Cerner, and other EHR vendors for seamless clinical data exchange." },
      { title: "Patient Portals", desc: "Secure patient-facing web and mobile applications with appointment booking, results viewing, and secure messaging." },
      { title: "Clinical AI", desc: "NLP-powered clinical documentation, diagnosis support, and predictive risk models for population health management." },
      { title: "Telehealth Platforms", desc: "Video consultation, remote monitoring, and asynchronous care platforms designed for provider and patient usability." },
    ],
    tech: ["FHIR R4", "HL7", "HIPAA", "Epic SDK", "AWS HealthLake", "React Native"],
    cat: "Software & Digital",
  },
  academia: {
    title: "Academia Solutions",
    tagline: "Digital learning platforms built for outcomes at scale.",
    overview: "We build learning management systems, adaptive assessment platforms, and institutional management software for universities, schools, and EdTech companies — with a focus on engagement, accessibility, and measurable outcomes.",
    highlights: [
      { title: "LMS Development", desc: "Custom learning management systems with course authoring, enrolment management, and progress analytics." },
      { title: "Adaptive Assessment", desc: "AI-powered assessment engines that adjust difficulty based on learner performance for better outcomes." },
      { title: "Student Analytics", desc: "Dashboards and early-warning systems that identify at-risk learners and drive intervention before dropout." },
      { title: "Institutional Management", desc: "Timetabling, enrolment, fee management, and faculty tools integrated with existing SIS platforms." },
    ],
    tech: ["LMS", "SCORM", "xAPI", "AI Tutoring", "Canvas LMS", "Moodle", "Analytics"],
    cat: "Software & Digital",
  },
  cybersecurity: {
    title: "Cybersecurity & SOC",
    tagline: "24/7 protection backed by enterprise-grade security operations.",
    overview: "Our Security Operations Centre provides round-the-clock threat monitoring, incident response, and compliance automation. We implement Zero Trust architectures and back everything with SLA-guaranteed response times.",
    highlights: [
      { title: "24/7 SOC Monitoring", desc: "Continuous SIEM-powered threat detection, alert triage, and incident escalation by certified security analysts." },
      { title: "Penetration Testing", desc: "CREST-aligned penetration testing for web, mobile, API, network, and cloud environments with actionable remediation reports." },
      { title: "Zero Trust Architecture", desc: "Identity-first security with micro-segmentation, least-privilege access controls, and continuous verification." },
      { title: "Compliance Automation", desc: "Automated evidence collection and control mapping for ISO 27001, SOC 2, PCI-DSS, and GDPR programmes." },
    ],
    tech: ["SOC", "Fortinet", "Splunk", "SIEM", "Zero Trust", "Pentest", "ISO 27001"],
    cat: "Infrastructure",
  },
  cloud: {
    title: "Cloud & DevOps",
    tagline: "Reliable, automated cloud infrastructure at scale.",
    overview: "We design, build, and operate cloud infrastructure and DevOps pipelines that allow your teams to ship faster and with confidence. From initial cloud migration to mature platform engineering.",
    highlights: [
      { title: "CI/CD Pipelines", desc: "Automated build, test, and deployment pipelines on GitHub Actions, GitLab CI, and Jenkins with quality gates." },
      { title: "Infrastructure as Code", desc: "Terraform and CloudFormation for reproducible, version-controlled infrastructure across AWS, Azure, and GCP." },
      { title: "Container Orchestration", desc: "Kubernetes cluster design, Helm chart management, and GitOps workflows with ArgoCD or Flux." },
      { title: "FinOps & Observability", desc: "Cloud cost optimisation, right-sizing recommendations, and full-stack observability with Datadog or Grafana." },
    ],
    tech: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    cat: "Infrastructure",
  },
  network: {
    title: "Network Services",
    tagline: "Enterprise networks designed, deployed, and managed.",
    overview: "Our certified network engineers design and deploy campus, WAN, and SD-WAN solutions for enterprise organisations. We cover the full lifecycle — from site survey and design through deployment, monitoring, and managed support.",
    highlights: [
      { title: "Campus Networking", desc: "Cisco-certified LAN/WLAN design and deployment for offices, campuses, and multi-site enterprise environments." },
      { title: "SD-WAN", desc: "Software-defined WAN deployments that reduce costs, improve reliability, and give centralised visibility across all sites." },
      { title: "Network Security", desc: "Next-generation firewalls, IDS/IPS, and network access control integrated with your security operations." },
      { title: "Managed Network Services", desc: "Ongoing monitoring, incident management, change management, and SLA-backed support for your network estate." },
    ],
    tech: ["Cisco", "Meraki", "SD-WAN", "Fortinet", "MPLS", "BGP", "OSPF"],
    cat: "Infrastructure",
  },
  datacenter: {
    title: "Datacenter Services",
    tagline: "Design, build, and operate enterprise datacenter infrastructure.",
    overview: "We provide end-to-end datacenter services from facility design and construction through to ongoing operations and managed hosting. Whether onsite, colocation, or hyperscale, we deliver enterprise SLAs at every tier.",
    highlights: [
      { title: "Datacenter Design", desc: "Power, cooling, and connectivity design for Tier III and Tier IV datacenter facilities meeting Uptime Institute standards." },
      { title: "Colocation Services", desc: "Managed colocation with 24/7 remote hands, SLA-backed power and connectivity, and cross-connect provisioning." },
      { title: "Edge Computing", desc: "Micro-datacenter and edge node deployments for low-latency workloads in manufacturing, retail, and public sector." },
      { title: "Hyperscale Migration", desc: "Managed migration of on-premises workloads to AWS, Azure, or Google Cloud hyperscale environments." },
    ],
    tech: ["Colocation", "Edge Computing", "Hyperscale", "Power & Cooling", "Remote Hands"],
    cat: "Infrastructure",
  },
  database: {
    title: "Database Services",
    tagline: "Managed database services built for reliability and performance.",
    overview: "We provide managed database services across Oracle, SQL Server, PostgreSQL, and MySQL — covering design, migration, performance optimisation, HA/DR configuration, and ongoing DBA support.",
    highlights: [
      { title: "Database Design", desc: "Schema design, normalisation, indexing strategy, and capacity planning for new and existing database environments." },
      { title: "Migration Services", desc: "Zero-downtime database migrations across platforms, versions, and cloud environments with full data validation." },
      { title: "Performance Optimisation", desc: "Query tuning, index analysis, execution plan review, and workload management for improved throughput." },
      { title: "HA & Disaster Recovery", desc: "Always-on availability groups, replication configuration, and tested DR plans meeting your RTO and RPO commitments." },
    ],
    tech: ["Oracle", "SQL Server", "PostgreSQL", "MySQL", "Redis", "MongoDB", "HA/DR"],
    cat: "Infrastructure",
  },
  backup: {
    title: "Backup & Disaster Recovery",
    tagline: "Tested, automated backup that meets your RTO and RPO.",
    overview: "We design and manage backup and disaster recovery solutions using Veeam and Zerto — with regular tested failovers and SLA-backed recovery commitments. Your data is protected and your business can recover fast.",
    highlights: [
      { title: "Veeam Backup", desc: "Veeam-certified backup for virtual, physical, and cloud workloads with immutable backups for ransomware protection." },
      { title: "Zerto DR", desc: "Continuous replication and orchestrated failover with near-zero RPO for mission-critical applications." },
      { title: "DR Testing", desc: "Regular scheduled DR tests with documented results, so you know your recovery will work when it matters." },
      { title: "Backup Auditing", desc: "Existing backup environment health-checks, gap analysis, and remediation planning to close coverage gaps." },
    ],
    tech: ["Veeam", "Zerto", "AWS Backup", "Azure Site Recovery", "Immutable Storage"],
    cat: "Infrastructure",
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const svc = SERVICE_DETAILS[id];

  if (!svc) {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif" }}>
        <SharedNav />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <p className="text-[#0F172A] font-bold text-2xl">Service not found</p>
          <Link href="/services" className="text-[#2563FF] font-semibold underline">Back to Services</Link>
        </div>
        <SharedFooter />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.p {...fade(0.05)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>{svc.cat}</motion.p>
          <motion.h1 {...fade(0.1)} className="text-white font-bold mb-3" style={{ fontSize: "clamp(32px,4vw,56px)", letterSpacing: "-1px", lineHeight: 1.1, maxWidth: 720 }}>
            {svc.title}
          </motion.h1>
          <motion.p {...fade(0.15)} className="font-semibold mb-5" style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{svc.tagline}</motion.p>
          <motion.p {...fade(0.2)} className="text-white/60 leading-relaxed mb-8" style={{ fontSize: 15, maxWidth: 580 }}>{svc.overview}</motion.p>
          <motion.div {...fade(0.25)} className="flex flex-wrap gap-3">
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="text-white font-semibold rounded-full"
                style={{ height: 52, paddingInline: 36, fontSize: 15, background: "linear-gradient(135deg,#2F6BFF,#2563FF)", boxShadow: "0 8px 24px rgba(37,99,255,0.5)", border: "none", cursor: "pointer" }}>
                Get Started
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="text-white font-semibold rounded-full"
                style={{ height: 52, paddingInline: 36, fontSize: 15, background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>
                Talk to an Expert
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-12">
            <p className="text-[#2563FF] font-semibold text-[12px] uppercase tracking-[3px] mb-2">What&apos;s Included</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(24px,2.8vw,36px)", letterSpacing: "-0.5px" }}>What We Deliver</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
            {svc.highlights.map((h, i) => (
              <motion.div key={h.title} {...fade(i * 0.06)}
                className="bg-white rounded-2xl p-7"
                style={{ boxShadow: "0 2px 16px rgba(15,23,42,0.07)", border: "1px solid #F1F5F9" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 16 }}>{h.title}</h3>
                <p className="text-[#64748B] leading-relaxed" style={{ fontSize: 14 }}>{h.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Tech stack */}
          <motion.div {...fade(0.1)}>
            <p className="text-[#0F172A] font-bold mb-4" style={{ fontSize: 16 }}>Technologies & Platforms</p>
            <div className="flex flex-wrap gap-2">
              {svc.tech.map(t => (
                <span key={t} className="text-sm font-semibold px-4 py-2 rounded-full" style={{ background: "#EEF2FF", color: "#2563FF" }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ paddingTop: 80, paddingBottom: 80, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 40%,#2563FF 100%)" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <motion.h2 {...fade()} className="text-white font-bold mb-4" style={{ fontSize: "clamp(26px,3vw,40px)", letterSpacing: "-0.5px" }}>
            Ready to Get Started with {svc.title}?
          </motion.h2>
          <motion.p {...fade(0.1)} className="text-white/70 mb-8 mx-auto" style={{ fontSize: 16, maxWidth: 460 }}>
            Let&apos;s scope your project and match you with the right team.
          </motion.p>
          <motion.div {...fade(0.2)} className="flex justify-center gap-3 flex-wrap">
            <Link href="/contact">
              <motion.button whileHover={{ scale: 1.04 }} className="font-semibold rounded-full"
                style={{ height: 52, paddingInline: 40, fontSize: 15, background: "#fff", color: "#0F172A", border: "none", cursor: "pointer" }}>
                Contact Us
              </motion.button>
            </Link>
            <Link href="/services">
              <motion.button whileHover={{ scale: 1.04 }} className="text-white font-semibold rounded-full"
                style={{ height: 52, paddingInline: 40, fontSize: 15, background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>
                View All Services
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}

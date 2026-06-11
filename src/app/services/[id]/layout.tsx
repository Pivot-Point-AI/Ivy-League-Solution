import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const SERVICE_META: Record<string, { title: string; description: string }> = {
  software: { title: "Custom Software Development Services | Ivy League Solutions", description: "End-to-end custom software development for web, mobile, and enterprise — built to scale with React, Next.js, Node.js, Python, and .NET." },
  ai: { title: "AI & Machine Learning Development Services | Ivy League Solutions", description: "Production-grade AI: LLM and generative AI integrations, fraud detection, predictive analytics, and AI-powered automation for US enterprises." },
  commerce: { title: "Digital Commerce & E-Commerce Development | Ivy League Solutions", description: "Headless commerce, custom platforms, PIM, and payment integrations — e-commerce experiences built to convert and scale." },
  modernize: { title: "Application Modernization Services | Ivy League Solutions", description: "Migrate legacy systems to cloud-native architectures with zero downtime — microservices, containerization, and cloud migration." },
  uiux: { title: "UI/UX Design Services | Ivy League Solutions", description: "User research, wireframing, prototyping, and design systems — digital product design grounded in user behavior data." },
  erp: { title: "ERP Implementation & Customization Services | Ivy League Solutions", description: "Microsoft Dynamics NAV, SAP, Oracle, and custom ERP implementation for SMEs and enterprise organizations." },
  banking: { title: "Mobile Banking App Development | Ivy League Solutions", description: "FINTRAC and PSD2-compliant mobile banking and payment platforms with biometric authentication and fraud detection." },
  web: { title: "Web & Full Stack Development Services | Ivy League Solutions", description: "Full-stack web engineering — React and Vue.js frontends, Node.js/Python/.NET backends, and optimized Core Web Vitals." },
  health: { title: "Healthcare Software Development (HIPAA-Compliant) | Ivy League Solutions", description: "HIPAA and HL7/FHIR-compliant healthcare platforms — EHR integration, patient portals, clinical AI, and telehealth." },
  academia: { title: "EdTech & Academia Software Solutions | Ivy League Solutions", description: "Learning management systems, adaptive assessments, and institutional management software for schools and universities." },
  cybersecurity: { title: "Cybersecurity & SOC Services | Ivy League Solutions", description: "24/7 SOC monitoring, penetration testing, Zero Trust architecture, and compliance automation for US enterprises." },
  cloud: { title: "Cloud & DevOps Services | Ivy League Solutions", description: "CI/CD pipelines, infrastructure as code, container orchestration, and FinOps for AWS, Azure, and GCP environments." },
  network: { title: "Enterprise Network Services | Ivy League Solutions", description: "Campus networking, SD-WAN, network security, and managed network services from certified engineers." },
  datacenter: { title: "Datacenter Services | Ivy League Solutions", description: "Datacenter design, colocation, edge computing, and hyperscale migration with enterprise SLAs." },
  database: { title: "Managed Database Services | Ivy League Solutions", description: "Database design, migration, performance optimization, and HA/DR for Oracle, SQL Server, PostgreSQL, and MySQL." },
  backup: { title: "Backup & Disaster Recovery Services | Ivy League Solutions", description: "Veeam and Zerto-based backup and disaster recovery with tested failovers meeting your RTO and RPO." },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const meta = SERVICE_META[id];

  if (!meta) {
    return buildMetadata({
      title: "Service Not Found | Ivy League Solutions",
      description: "The service you're looking for could not be found. Browse our full range of IT services.",
      path: `/services/${id}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/services/${id}`,
  });
}

export default async function ServiceDetailLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meta = SERVICE_META[id];

  if (!meta) return children;

  const url = `${SITE_URL}/services/${id}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: meta.title.replace(" | Ivy League Solutions", ""),
    description: meta.description,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: meta.title.replace(" | Ivy League Solutions", ""), item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}

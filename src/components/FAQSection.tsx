"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const FAQS = [
  {
    q: "What services does Ivy League Solutions provide?",
    a: "We deliver custom software development, AI and machine learning systems, cloud and DevOps infrastructure, cybersecurity and SOC monitoring, ERP implementation, and managed IT services for businesses across the United States.",
  },
  {
    q: "What industries do you work with?",
    a: "We build for fintech and banking, healthcare, academia and EdTech, e-commerce, and general enterprise clients — with domain-specific compliance built in, including HIPAA, FINTRAC, PSD2, and PCI-DSS.",
  },
  {
    q: "How much does a custom software project cost?",
    a: "Cost depends on scope, integrations, and compliance requirements. We scope every engagement individually after an initial consultation — contact us for a free estimate tailored to your project.",
  },
  {
    q: "Where is Ivy League Solutions based?",
    a: "Our headquarters is in Perth Amboy, New Jersey, with additional offices in Dubai, UAE and Islamabad, Pakistan — giving us global delivery with remote and on-site coverage across the United States and beyond.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Every engagement includes SLA-backed post-launch support, and our Security Operations Centre provides 24/7 monitoring for clients who need continuous coverage.",
  },
  {
    q: "How do I get started with Ivy League Solutions?",
    a: "Reach out through our contact page or email contact@ivyleaguesolutions.com. We'll schedule a discovery call to scope your project and match you with the right team.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

function FAQItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <FadeUp delay={delay}>
      <div
        className="bg-white"
        style={{ borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden" }}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between text-left"
          style={{ padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
          aria-expanded={open}
        >
          <span className="font-bold text-[#0F172A]" style={{ fontSize: 15.5 }}>{q}</span>
          <span
            style={{
              flexShrink: 0,
              marginLeft: 16,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#EEF2FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.4" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
        {open && (
          <div style={{ padding: "0 24px 22px" }}>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>{a}</p>
          </div>
        )}
      </div>
    </FadeUp>
  );
}

export default function FAQSection() {
  return (
    <section className="bg-[#F8FAFF]" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[860px] mx-auto px-6 md:px-12">
        <FadeUp className="text-center mb-14">
          <p
            className="font-extrabold uppercase mb-4"
            style={{ fontSize: 15, fontWeight: 800, letterSpacing: "3px", background: "linear-gradient(90deg,#0891b2,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Frequently Asked Questions
          </p>
          <h2 className="text-[#0F172A] font-extrabold" style={{ fontSize: "clamp(34px,4.2vw,48px)", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1.15 }}>
            Got Questions? We&apos;ve Got Answers.
          </h2>
        </FadeUp>

        <div className="flex flex-col gap-4">
          {FAQS.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

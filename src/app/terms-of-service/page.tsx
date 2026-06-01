"use client";

import { motion } from "framer-motion";
import { SharedNav, SharedFooter } from "@/components/SharedNav";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the Ivy League Solutions website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.",
  },
  {
    title: "2. Use of Services",
    body: "Ivy League Solutions grants you a limited, non-exclusive, non-transferable licence to access and use our website and services for your internal business purposes. You may not use our services for any unlawful purpose, to solicit others to perform or participate in any unlawful acts, to violate any international, federal, or state regulations or laws, to infringe upon or violate our intellectual property rights or the rights of others, or to harass, abuse, insult, harm, defame, or discriminate against others.",
  },
  {
    title: "3. Intellectual Property",
    body: "The content on the Ivy League Solutions website, including but not limited to text, graphics, logos, images, and software, is the property of Ivy League Solutions and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from our website without prior written permission from Ivy League Solutions.",
  },
  {
    title: "4. Client Engagements",
    body: "All software development, consulting, and managed services engagements are governed by a separate Statement of Work (SOW) or Master Services Agreement (MSA) executed between Ivy League Solutions and the client. These Terms of Service apply to general website usage and do not supersede or modify the terms of any signed agreement between the parties.",
  },
  {
    title: "5. Confidentiality",
    body: "Any information shared with Ivy League Solutions during the course of a business engagement or inquiry will be treated with strict confidentiality. We will not disclose your confidential information to third parties without your consent, except as required by law. This obligation survives the termination of any service agreement.",
  },
  {
    title: "6. Limitation of Liability",
    body: "In no event shall Ivy League Solutions, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the service.",
  },
  {
    title: "7. Disclaimer of Warranties",
    body: "Our website and services are provided on an 'as is' and 'as available' basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Ivy League Solutions does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.",
  },
  {
    title: "8. Governing Law",
    body: "These Terms of Service shall be governed by and construed in accordance with applicable law, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in the jurisdiction where Ivy League Solutions operates.",
  },
  {
    title: "9. Changes to Terms",
    body: "Ivy League Solutions reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following the posting of revised Terms constitutes your acceptance of the changes. We encourage you to review these Terms periodically.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#60a5fa,transparent 70%)" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Legal</motion.p>
          <motion.h1 {...fade(0.1)} className="text-white font-bold mb-5" style={{ fontSize: "clamp(36px,4vw,58px)", letterSpacing: "-1px", lineHeight: 1.1, maxWidth: 680 }}>
            Terms of Service
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-white/70 leading-relaxed" style={{ fontSize: 16, maxWidth: 540 }}>
            Last updated: June 1, 2026. Please read these terms carefully before using our website or services.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 lg:px-14">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              {...fade(i * 0.05)}
              className="bg-white rounded-2xl mb-5"
              style={{ padding: "32px 36px", border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(15,23,42,0.05)" }}
            >
              <h2 className="font-bold text-[#0F172A] mb-3" style={{ fontSize: 18 }}>{s.title}</h2>
              <p className="leading-relaxed text-[#475569]" style={{ fontSize: 15 }}>{s.body}</p>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div {...fade(0.4)} className="rounded-2xl mt-8 text-center" style={{ background: "linear-gradient(135deg,#071B8F 0%,#2563FF 100%)", padding: "40px 36px" }}>
            <p className="text-white font-bold mb-2" style={{ fontSize: 20 }}>Questions About Our Terms?</p>
            <p className="text-white/70 mb-6" style={{ fontSize: 14 }}>Reach out and our team will be happy to help clarify anything.</p>
            <a href="mailto:contact@ivyleaguesolutions.com">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="text-white font-semibold rounded-full" style={{ height: 48, paddingInline: 32, fontSize: 14, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.35)", cursor: "pointer" }}>
                contact@ivyleaguesolutions.com
              </motion.button>
            </a>
          </motion.div>

          <div className="mt-8 flex items-center gap-4">
            <Link href="/" className="text-[#2563FF] font-semibold text-sm hover:underline">← Back to Home</Link>
            <span className="text-[#CBD5E1]">|</span>
            <Link href="/privacy-policy" className="text-[#2563FF] font-semibold text-sm hover:underline">Privacy Policy →</Link>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}

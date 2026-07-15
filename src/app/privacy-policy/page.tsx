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
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us, such as when you fill out a contact form, request a demo, or communicate with us via email. This may include your name, email address, phone number, company name, and the content of your messages. We also collect certain information automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages visited.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information we collect to respond to your inquiries and provide the services you request, send you technical notices and support messages, communicate with you about products, services, and events, monitor and analyze trends and usage, and improve our website and services. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.",
  },
  {
    title: "3. Cookies and Tracking Technologies",
    body: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.",
  },
  {
    title: "4. Data Security",
    body: "We implement appropriate technical and organisational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, or access. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "5. Third-Party Services",
    body: "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those third parties. We encourage you to read the privacy policies of any third-party sites you visit. We may use third-party service providers to help us operate our website and deliver our services, and they may have access to your personal information only to perform specific tasks on our behalf.",
  },
  {
    title: "6. Data Retention",
    body: "We retain personal information for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymise it.",
  },
  {
    title: "7. Your Rights",
    body: "Depending on your location, you may have the right to access, correct, or delete your personal information, object to or restrict our processing of your data, and request data portability. To exercise any of these rights, please contact us at contact@ivyleaguesolutions.com. We will respond to your request within a reasonable timeframe.",
  },
  {
    title: "8. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date. You are advised to review this Privacy Policy periodically for any changes.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#050814 0%,#0a0e1f 35%,#0f1b2e 65%,#22d3ee 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#22d3ee,transparent 70%)" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Legal</motion.p>
          <motion.h1 {...fade(0.1)} className="text-white font-bold mb-5" style={{ fontSize: "clamp(36px,4vw,58px)", letterSpacing: "-1px", lineHeight: 1.1, maxWidth: 680 }}>
            Privacy Policy
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-white/70 leading-relaxed" style={{ fontSize: 16, maxWidth: 540 }}>
            Last updated: June 1, 2026. We are committed to protecting your personal information and your right to privacy.
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
          <motion.div {...fade(0.4)} className="rounded-2xl mt-8 text-center" style={{ background: "linear-gradient(135deg,#050814 0%,#22d3ee 100%)", padding: "40px 36px" }}>
            <p className="text-white font-bold mb-2" style={{ fontSize: 20 }}>Have Questions?</p>
            <p className="text-white/70 mb-6" style={{ fontSize: 14 }}>We&apos;re happy to clarify anything about how we handle your data.</p>
            <a href="mailto:contact@ivyleaguesolutions.com">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="text-white font-semibold rounded-full" style={{ height: 48, paddingInline: 32, fontSize: 14, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.35)", cursor: "pointer" }}>
                contact@ivyleaguesolutions.com
              </motion.button>
            </a>
          </motion.div>

          <div className="mt-8 flex items-center gap-4">
            <Link href="/" className="text-[#22d3ee] font-semibold text-sm hover:underline">← Back to Home</Link>
            <span className="text-[#CBD5E1]">|</span>
            <Link href="/terms-of-service" className="text-[#22d3ee] font-semibold text-sm hover:underline">Terms of Service →</Link>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}

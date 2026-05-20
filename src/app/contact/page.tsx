"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SharedNav, SharedFooter } from "@/components/SharedNav";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

const SERVICES = ["Software Development","Digital Infrastructure","ERP Solutions","AI / Machine Learning","UI/UX Design","Cybersecurity / NOC/SOC","Cloud Services","Custom Product Development","Other"];
const CONTACT_INFO = [
  { icon: "✉", label: "Email",    value: "contact@ivyleaguesolutions.com", href: "mailto:contact@ivyleaguesolutions.com" },
  { icon: "☎", label: "Phone",    value: "+1 (800) 555-0100",              href: "tel:+18005550100" },
  { icon: "◈", label: "Coverage", value: "Global Delivery",                href: null },
];
const QUICK_LINKS = [
  { label: "View Our Portfolio",   href: "/solutions" },
  { label: "Explore AI Solutions", href: "/ai" },
  { label: "Browse Services",      href: "/services" },
  { label: "About Our Team",       href: "/about" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Failed to send message");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally { setLoading(false); }
  };

  const inputStyle: React.CSSProperties = { width: "100%", height: 52, background: "#F8FAFF", border: "1.5px solid #E2E8F0", borderRadius: 12, paddingInline: 16, fontSize: 14, color: "#0F172A", fontFamily: "'Poppins', sans-serif", outline: "none" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 6 };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Get in Touch</motion.p>
          <motion.h1 {...fade(0.1)} className="text-white font-bold mb-4" style={{ fontSize: "clamp(36px,4vw,58px)", letterSpacing: "-1px", lineHeight: 1.1 }}>
            Let&apos;s Build Something Exceptional
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-white/70" style={{ fontSize: 16, maxWidth: 500 }}>
            Tell us about your project — a senior engineer will reach out within one business day.
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-[#F8FAFF]" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Info */}
            <motion.div {...fade(0.1)} className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(145deg,#071B8F,#0A2BA8,#1E3A9E)", boxShadow: "0 8px 32px rgba(7,27,143,0.25)" }}>
              <h3 className="font-bold mb-2" style={{ fontSize: 20 }}>Contact Information</h3>
              <p className="text-white/60 leading-relaxed mb-7" style={{ fontSize: 14 }}>Whether starting a project or exploring a partnership — we&apos;d love to hear from you.</p>
              <div className="space-y-5 mb-8">
                {CONTACT_INFO.map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", fontSize: 16 }}>{c.icon}</div>
                    <div>
                      <p className="text-white/40 font-medium uppercase tracking-widest" style={{ fontSize: 10 }}>{c.label}</p>
                      {c.href ? <a href={c.href} className="text-white font-medium hover:text-blue-300 transition-colors" style={{ fontSize: 14 }}>{c.value}</a>
                        : <p className="text-white font-medium" style={{ fontSize: 14 }}>{c.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                <p className="text-white/40 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 10 }}>Quick Links</p>
                <div className="flex flex-col gap-2">
                  {QUICK_LINKS.map(l => (
                    <a key={l.href} href={l.href} className="text-white/70 hover:text-white transition-colors flex items-center gap-2 font-medium" style={{ fontSize: 14 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...fade(0.15)} className="lg:col-span-2 bg-white rounded-2xl p-8" style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.08)", border: "1px solid #F1F5F9" }}>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 22 }}>Message Sent!</h3>
                  <p className="text-[#64748B]" style={{ fontSize: 15 }}>We&apos;ll be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-bold text-[#0F172A] mb-7" style={{ fontSize: 22 }}>Send Us a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div><label style={labelStyle}>Full Name *</label><input required name="name" value={form.name} onChange={handleChange} placeholder="John Smith" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Email Address *</label><input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" style={inputStyle} /></div>
                    <div><label style={labelStyle}>Company</label><input name="company" value={form.company} onChange={handleChange} placeholder="Company name" style={inputStyle} /></div>
                    <div>
                      <label style={labelStyle}>Service Needed</label>
                      <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                        <option value="">Select a service</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label style={labelStyle}>Message *</label>
                    <textarea required name="message" value={form.message} onChange={handleChange} placeholder="Describe your project or question..." rows={5} style={{ ...inputStyle, height: "auto", padding: "12px 16px", resize: "vertical" }} />
                  </div>
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full font-semibold rounded-2xl text-white"
                    style={{ height: 54, fontSize: 16, background: loading ? "#94A3B8" : "linear-gradient(135deg,#2F6BFF,#2563FF)", border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 8px 24px rgba(37,99,255,0.35)" }}>
                    {loading ? "Sending..." : "Send Message →"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}

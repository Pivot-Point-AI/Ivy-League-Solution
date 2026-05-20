"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  "Software Development",
  "Digital Infrastructure",
  "ERP Solutions",
  "AI / Machine Learning",
  "UI/UX Design",
  "Cybersecurity / NOC/SOC",
  "Cloud Services",
  "Custom Product Development",
  "Other",
];

const contactInfo = [
  { icon: "✉", label: "Email",    value: "contact@ivyleaguesolutions.com", href: "mailto:contact@ivyleaguesolutions.com" },
  { icon: "☎", label: "Phone",    value: "+1 (800) 555-0100",              href: "tel:+18005550100" },
  { icon: "◈", label: "Coverage", value: "Global Delivery",                href: null },
];

const quickLinks = [
  { label: "View Our Portfolio",    href: "/solutions" },
  { label: "Explore AI Solutions",  href: "/ai" },
  { label: "Browse Services",       href: "/services" },
  { label: "About Our Team",        href: "/about" },
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Failed to send message");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="page-hero">
        <div className="page-hero-circle" />
        <div className="page-hero-inner" style={{ maxWidth: 780 }}>
          <p className="page-eyebrow">Get in Touch</p>
          <h1 className="page-h1">
            Let&apos;s Build Something<br /><em>Exceptional</em>
          </h1>
          <p className="page-hero-desc">
            Tell us about your project and we&apos;ll have a senior engineer or consultant
            reach out within one business day.
          </p>
        </div>
      </section>

      {/* ── 2. Form + Info ── */}
      <section className="page-section page-section-gray">
        <div className="page-inner">
          <div className="contact-layout-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 24, alignItems: "start" }}>

            {/* Info card */}
            <div className="page-info-card">
              <h3>Contact Information</h3>
              <p>
                Whether you&apos;re starting a new project, looking for a technology partner,
                or simply want to explore possibilities — we&apos;d love to hear from you.
              </p>

              <div>
                {contactInfo.map((c) => (
                  <div key={c.label} className="page-info-item">
                    <div className="page-info-icon">{c.icon}</div>
                    <div>
                      <div className="page-info-lbl">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="page-info-val">{c.value}</a>
                      ) : (
                        <div className="page-info-val">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20 }}>
                <div className="page-info-lbl" style={{ marginBottom: 12 }}>Quick Links</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {quickLinks.map((l) => (
                    <Link key={l.label} href={l.href} className="page-info-val">{l.label} →</Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Form card */}
            <div>
              {submitted ? (
                <div className="page-form-card" style={{ textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(120,235,84,0.12)", border: "1px solid rgba(120,235,84,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 22 }}>✓</div>
                  <h3 style={{ textAlign: "center" }}>Message Received!</h3>
                  <p style={{ fontSize: 13, color: "rgba(0,0,0,0.55)", lineHeight: 1.7, marginBottom: 24, fontFamily: "var(--rs-font)" }}>
                    Thank you for reaching out. A senior member of our team will review your
                    inquiry and get back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" }); }}
                    className="btn-black"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="page-form-card">
                  <h3>Start a Conversation</h3>
                  <div className="form-row">
                    <div className="field">
                      <label>Full Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" />
                    </div>
                    <div className="field">
                      <label>Work Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="field">
                    <label>Company Name</label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Acme Corporation" />
                  </div>

                  <div className="form-row">
                    <div className="field">
                      <label>Service Needed *</label>
                      <select name="service" value={form.service} onChange={handleChange} required>
                        <option value="" disabled>Select a service...</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Estimated Budget</label>
                      <select name="budget" value={form.budget} onChange={handleChange}>
                        <option value="" disabled>Select budget range...</option>
                        {["Under $25K","$25K – $75K","$75K – $250K","$250K – $1M","$1M+","Not sure yet"].map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Tell Us About Your Project *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Describe your project, current challenges, and what success looks like..." />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-green"
                    style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>

                  {error && (
                    <p style={{ textAlign: "center", fontSize: 12, color: "#b42318", marginTop: 10, fontFamily: "var(--rs-font)" }}>{error}</p>
                  )}

                  <p style={{ textAlign: "center", fontSize: 11, color: "rgba(0,0,0,0.35)", marginTop: 12, fontFamily: "var(--rs-font)" }}>
                    Your information is kept strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

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
  {
    icon: "✉",
    label: "Email",
    value: "info@ivyleaguesolutions.com",
    href: "mailto:info@ivyleaguesolutions.com",
  },
  {
    icon: "☎",
    label: "Phone",
    value: "+1 (800) 555-0100",
    href: "tel:+18005550100",
  },
  {
    icon: "◈",
    label: "Coverage",
    value: "North America · Global Delivery",
    href: null,
  },
  {
    icon: "⏱",
    label: "Response Time",
    value: "Within 24 business hours",
    href: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <section className="hero" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="hero-inner" style={{ maxWidth: 740 }}>
            <div className="eyebrow">Get in Touch</div>
            <h1 className="hero-title font-display">
              Let&apos;s Build <em>Something</em>
              <br />
              <em>Exceptional</em>
            </h1>
            <p className="hero-desc" style={{ maxWidth: 580, color: "white" }}>
              Tell us about your project and we&apos;ll have a senior engineer or consultant
              reach out within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="contact-layout">
            <div className="info-card">
              <h3>Contact Information</h3>
              <p>
                Whether you&apos;re starting a new project, looking for a technology partner,
                or simply want to explore possibilities — we'd love to hear from you.
              </p>

              <div>
                {contactInfo.map((c) => (
                  <div key={c.label} className="info-item">
                    <div className="info-icon">{c.icon}</div>
                    <div>
                      <div className="info-lbl">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="info-val" style={{ textDecoration: "none" }}>
                          {c.value}
                        </a>
                      ) : (
                        <div className="info-val">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 22, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 18 }}>
                <div className="info-lbl" style={{ marginBottom: 10 }}>Quick Links</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {[
                    { label: "View Our Portfolio", href: "/solutions" },
                    { label: "Explore AI Solutions", href: "http://aibrigade.ai/" },
                    { label: "Browse Services", href: "/services" },
                    { label: "About Our Team", href: "/about" },
                  ].map((l) => (
                    <Link key={l.label} href={l.href} className="info-val" style={{ textDecoration: "none" }}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="form-card" style={{ textAlign: "center" }}>
                  <h3>Message Received!</h3>
                  <p style={{ fontSize: 13, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 20 }}>
                    Thank you for reaching out. A senior member of our team will review your
                    inquiry and get back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" }); }}
                    className="btn-outline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-card">
                  <h3>Start a Conversation</h3>
                  <div className="form-row">
                    <div className="field">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="field">
                      <label>Work Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Corporation"
                    />
                  </div>

                  <div className="form-row">
                    <div className="field">
                      <label>Service Needed *</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label>Estimated Budget</label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select budget range...</option>
                        {["Under $25K", "$25K – $75K", "$75K – $250K", "$250K – $1M", "$1M+", "Not sure yet"].map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Tell Us About Your Project *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe your project, current challenges, and what success looks like..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>

                  <p style={{ textAlign: "center", fontSize: 11, color: "var(--gray-400)", marginTop: 10 }}>
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

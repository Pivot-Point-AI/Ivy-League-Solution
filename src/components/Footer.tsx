"use client";

import Link from "next/link";
import Image from "next/image";

const cols = {
  Services: [
    { label: "Software Development", href: "/services#software" },
    { label: "Digital Infrastructure", href: "/services#infrastructure" },
    { label: "ERP Solutions",         href: "/services#erp" },
    { label: "AI Solutions",          href: "/ai" },
    { label: "Cloud Services",        href: "/services#cloud" },
    { label: "Cybersecurity",         href: "/services#security" },
  ],
  Solutions: [
    { label: "Fintech",         href: "/solutions#fintech" },
    { label: "Healthcare",      href: "/solutions#healthcare" },
    { label: "E-Commerce",      href: "/solutions#ecommerce" },
    { label: "Logistics",       href: "/solutions#logistics" },
    { label: "Real Estate ERP", href: "/solutions#erp" },
    { label: "Academia",        href: "/solutions#academia" },
  ],
  Company: [
    { label: "About Us",        href: "/about" },
    { label: "Our Products",    href: "/products" },
    { label: "AI Division",     href: "/ai" },
    { label: "Contact Us",      href: "/contact" },
    { label: "Privacy Policy",  href: "/privacy" },
  ],
};

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#07152A"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(180deg, #07152A 0%, #09182E 100%)", borderTop: "1px solid rgba(200,169,110,0.12)" }}>
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: 8, overflow: "hidden" }}>
                <Image src="/image.png" alt="Ivy League Solutions" width={72} height={72} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Link>

            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 260, margin: "0 0 20px", fontWeight: 300 }}>
              Premium custom IT products, enterprise software, and AI-powered solutions engineered for modern businesses.
            </p>

            {/* contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              <a href="mailto:contact@ivyleaguesolutions.com" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                contact@ivyleaguesolutions.com
              </a>
              <a href="tel:+18005550100" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.43 2 2 0 0 1 3.62 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
                </svg>
                +1 (800) 555-0100
              </a>
            </div>

            {/* socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(200,169,110,0.12)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,110,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "var(--accent)", marginBottom: 20,
              }}>
                {title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{
                      fontSize: 13, color: "rgba(255,255,255,0.55)",
                      textDecoration: "none", transition: "color 0.2s",
                      display: "flex", alignItems: "center", gap: 8,
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.7 }}>
                      <path d="M2 5h6M6 3l2 2-2 2"/>
                    </svg>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="footer-bottom-bar">
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0 }}>
            © {new Date().getFullYear()} by League Solutions, Inc. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>AI systems operational</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

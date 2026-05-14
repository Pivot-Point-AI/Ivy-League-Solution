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
    { label: "Fintech",        href: "/solutions#fintech" },
    { label: "Healthcare",     href: "/solutions#healthcare" },
    { label: "E-Commerce",     href: "/solutions#ecommerce" },
    { label: "Logistics",      href: "/solutions#logistics" },
    { label: "Real Estate ERP",href: "/solutions#erp" },
    { label: "Academia",       href: "/solutions#academia" },
  ],
  Company: [
    { label: "About Us",       href: "/about" },
    { label: "Our Products",   href: "/products" },
    { label: "AI Division",    href: "/ai" },
    { label: "Contact Us",     href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", width: "fit-content" }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, overflow: "hidden" }}>
                <Image src="/logo.png" alt="Ivy League Solutions" width={34} height={34} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "white", lineHeight: 1.2 }}>Ivy League Solutions</div>
                <div style={{ fontSize: 9, fontWeight: 500, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}> </div>
              </div>
            </Link>
            <p>Premium custom IT products, enterprise software, and AI-powered solutions engineered for  n businesses.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              {[
                { label: "info@ivyleaguesolutions.com", href: "mailto:info@ivyleaguesolutions.com" },
                { label: "+1 (800) 555-0100",          href: "tel:+18005550100" },
              ].map((c) => (
                <a key={c.label} href={c.href} className="footer-meta-link" style={{ fontSize: 12, textDecoration: "none", transition: "color 0.2s" }}>
                  {c.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <div className="footer-heading">{title}</div>
              <div className="footer-links">
                {links.map((l) => (
                  <Link key={l.href} href={l.href}>{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ivy League Solutions, Inc. All rights reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "white" }}>All systems operational</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy" className="footer-meta-link" style={{ fontSize: 11, textDecoration: "none" }}>Privacy</Link>
            <Link href="/terms"   className="footer-meta-link" style={{ fontSize: 11, textDecoration: "none" }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

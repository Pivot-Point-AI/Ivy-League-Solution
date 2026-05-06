"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",                  label: "Home"     },
  { href: "/services",          label: "Services" },
  { href: "/solutions",         label: "Portfolio"},
  { href: "/products",          label: "Products" },
  { href: "http://aibrigade.ai/", label: "AI", external: true },
  { href: "/about",             label: "About"    },
  { href: "/contact",           label: "Contact"  },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(11,31,58,0.97)" : "#0B1F3A",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 6,
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--navy)",
            }}>
              IL
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "white", lineHeight: 1.2 }}>
                Ivy League Solutions
              </div>
              <div style={{ fontSize: 9, fontWeight: 500, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", lineHeight: 1 }}>
                North America
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 2 }} className="hidden md:flex">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 5,
                    fontSize: 12,
                    fontWeight: 400,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? "nav-link-active" : ""}`}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 5,
                    fontSize: 12,
                    fontWeight: 400,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <Link href="/contact" className="btn-primary hidden md:inline-flex" style={{ fontSize: 12, padding: "7px 18px" }}>
            Get Started
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
            aria-label="Toggle menu"
          >
            <span style={{ display: "block", width: 20, height: 1.5, background: "white", borderRadius: 1, transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: "white", borderRadius: 1, transition: "all 0.3s", opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 20, height: 1.5, background: "white", borderRadius: 1, transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        className="md:hidden"
      >
        <div onClick={() => setMobileOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(11,31,58,0.85)", backdropFilter: "blur(8px)" }} />
        <div
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 280,
            background: "#0B1F3A",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            padding: "80px 24px 40px",
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
            display: "flex", flexDirection: "column",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link-mobile"
                  style={{
                    padding: "12px 16px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 400,
                    textDecoration: "none",
                    background: "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link-mobile ${pathname === link.href ? "nav-link-mobile-active" : ""}`}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: pathname === link.href ? 500 : 400,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <Link href="/contact" className="btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}

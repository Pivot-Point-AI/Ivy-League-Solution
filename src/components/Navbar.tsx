"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/services",  label: "Roles"      },
  { href: "/contact",   label: "Pricing"    },
  { href: "/about",     label: "Blog"       },
  { href: "/ai",        label: "Resources"  },
  { href: "/contact",   label: "Contact"    },
];

const RS = {
  green:     "#78EB54",
  darkGreen: "#273F2B",
  font:      "'DM Sans', 'Inter', system-ui, sans-serif",
};

export default function Navbar() {
  const pathname    = usePathname();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav style={{
        position:   "fixed",
        top:        0,
        left:       0,
        right:      0,
        zIndex:     50,
        height:     100,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        boxShadow:  scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s, box-shadow 0.3s",
        fontFamily: RS.font,
      }}>
        <div style={{
          maxWidth:      1700,
          margin:        "0 auto",
          padding:       "0 clamp(20px, 11.5vw, 220px)",
          height:        "100%",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"space-between",
          gap:           24,
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="Ivy League Solutions"
              width={132}
              height={48}
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="rs-nav-links" style={{
            display:    "flex",
            alignItems: "center",
            gap:        "clamp(12px, 2.2vw, 42px)",
            flex:       1,
            justifyContent: "center",
          }}>
            {navLinks.map((link) => (
              <NavLink key={link.href + link.label} href={link.href} label={link.label} active={pathname === link.href} scrolled={scrolled} />
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="rs-nav-cta" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            {/* Search button */}
            <Link href="/contact" style={{
              display:        "inline-flex",
              alignItems:     "center",
              justifyContent: "center",
              width:          92,
              height:         56,
              background:     RS.darkGreen,
              borderRadius:   28,
              textDecoration: "none",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </Link>

            {/* Hire Talent button */}
            <Link href="/contact" style={{
              display:        "inline-flex",
              alignItems:     "center",
              justifyContent: "center",
              width:          175,
              height:         56,
              background:     RS.green,
              borderRadius:   28,
              fontSize:       16,
              fontWeight:     500,
              color:          RS.darkGreen,
              textDecoration: "none",
              whiteSpace:     "nowrap",
              fontFamily:     RS.font,
              transition:     "filter 0.18s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.92)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
            >
              Hire Talent
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="rs-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
            style={{
              display:        "none",
              flexDirection:  "column",
              gap:            5,
              background:     "none",
              border:         "none",
              cursor:         "pointer",
              padding:        8,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display:    "block",
                width:      mobileOpen && i === 1 ? 0 : 24,
                height:     2,
                background: "#000",
                borderRadius: 2,
                transition: "all 0.3s",
                transform:  mobileOpen
                  ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                  : i === 2 ? "rotate(-45deg) translate(5px,-5px)"
                  : "none"
                  : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} pathname={pathname} onClose={() => setMobileOpen(false)} />

      <style>{`
        @media (max-width: 900px) {
          .rs-nav-links { display: none !important; }
          .rs-nav-cta   { display: none !important; }
          .rs-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({ href, label, active, scrolled }: { href: string; label: string; active: boolean; scrolled: boolean }) {
  const [hov, setHov] = useState(false);
  /* Figma: all nav links always color:#000000 */
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize:       16,
        fontWeight:     500,
        color:          hov || active ? "#000000" : scrolled ? "#000000" : "#000000",
        opacity:        hov || active ? 1 : 0.85,
        textDecoration: "none",
        whiteSpace:     "nowrap",
        fontFamily:     "'DM Sans','Inter',system-ui,sans-serif",
        transition:     "opacity 0.18s",
      }}
    >
      {label}
    </Link>
  );
}

function MobileDrawer({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: open ? "auto" : "none" }}>
      <div onClick={onClose} style={{
        position:   "absolute",
        inset:      0,
        background: "rgba(0,0,0,0.4)",
        opacity:    open ? 1 : 0,
        transition: "opacity 0.3s",
      }} />
      <div style={{
        position:   "absolute",
        top:        0,
        right:      0,
        bottom:     0,
        width:      300,
        background: "#FFFFFF",
        display:    "flex",
        flexDirection: "column",
        transform:  open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        boxShadow:  "-8px 0 32px rgba(0,0,0,0.12)",
      }}>
        <div style={{
          padding:       "20px 24px",
          borderBottom:  "1px solid #f0f0f0",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"space-between",
        }}>
          <Image src="/logo.png" alt="Ivy League Solutions" width={100} height={36} style={{ objectFit: "contain" }} />
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#f5f5f5", border: "none",
            fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map((link) => (
            <Link key={link.href + link.label} href={link.href} style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              padding:        "14px 16px",
              borderRadius:   10,
              fontSize:       16,
              fontWeight:     pathname === link.href ? 600 : 400,
              color:          pathname === link.href ? "#000" : "rgba(0,0,0,0.7)",
              background:     pathname === link.href ? "#f5f5f5" : "transparent",
              textDecoration: "none",
              fontFamily:     "'DM Sans','Inter',system-ui,sans-serif",
            }}>
              {link.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          ))}
        </nav>
        <div style={{ padding: "16px 24px 32px" }}>
          <Link href="/contact" style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            background:     "#78EB54",
            color:          "#273F2B",
            padding:        "16px 24px",
            borderRadius:   28,
            fontSize:       16,
            fontWeight:     600,
            textDecoration: "none",
            fontFamily:     "'DM Sans','Inter',system-ui,sans-serif",
          }}>
            Hire Talent
          </Link>
        </div>
      </div>
    </div>
  );
}

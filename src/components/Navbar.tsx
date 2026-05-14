"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",          label: "Home"      },
  { href: "/services",  label: "Services"  },
  { href: "/ai",        label: "AI"        },
  { href: "/solutions", label: "Portfolio" },
  { href: "/about",     label: "About"     },
  { href: "/contact",   label: "Contact"   },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoverIdx,   setHoverIdx]   = useState<number | null>(null);
  const [pill,       setPill]       = useState({ left: 0, width: 0, opacity: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef   = useRef<HTMLDivElement>(null);

  // scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // move the pill to hovered (or active) link
  useEffect(() => {
    const idx = hoverIdx !== null ? hoverIdx : navLinks.findIndex(l => l.href === pathname);
    const el  = linkRefs.current[idx];
    const nav = navRef.current;
    if (!el || !nav) { if (hoverIdx === null) setPill(p => ({ ...p, opacity: 0 })); return; }
    const elRect  = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    setPill({ left: elRect.left - navRect.left, width: elRect.width, opacity: 1 });
  }, [hoverIdx, pathname]);

  const activeIdx = navLinks.findIndex(l => l.href === pathname);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(9,26,50,0.98)" : "rgba(11,31,58,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid ${scrolled ? "rgba(200,169,110,0.14)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: scrolled ? "0 1px 0 rgba(200,169,110,0.08), 0 8px 32px rgba(0,0,0,0.28)" : "none",
        transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
      }}>
        <div className="container" style={{ height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* ── Logo ── */}
          <Logo />

          {/* ── Desktop links ── */}
          <div
            ref={navRef}
            onMouseLeave={() => setHoverIdx(null)}
            style={{ position: "relative", display: "flex", alignItems: "center", gap: 0 }}
            className="hidden md:flex"
          >
            {/* sliding pill */}
            <div style={{
              position: "absolute",
              top: "50%", transform: "translateY(-50%)",
              left: pill.left, width: pill.width, height: 32,
              borderRadius: 7,
              background: hoverIdx !== null
                ? "rgba(255,255,255,0.07)"
                : "rgba(200,169,110,0.1)",
              border: hoverIdx !== null
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(200,169,110,0.2)",
              transition: "left 0.22s cubic-bezier(0.4,0,0.2,1), width 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.18s, background 0.18s, border-color 0.18s",
              opacity: pill.opacity,
              pointerEvents: "none",
            }} />

            {navLinks.map((link, i) => {
              const isActive = i === activeIdx;
              return (
                <a
                  key={link.href}
                  ref={el => { linkRefs.current[i] = el; }}
                  href={link.href}
                  onMouseEnter={() => setHoverIdx(i)}
                  style={{
                    position: "relative",
                    display: "inline-flex", alignItems: "center",
                    padding: "6px 15px",
                    fontSize: 13.5,
                    fontWeight: isActive ? 500 : 400,
                    color: isActive
                      ? "var(--accent)"
                      : hoverIdx === i ? "white" : "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    letterSpacing: "0.005em",
                    transition: "color 0.18s",
                    whiteSpace: "nowrap",
                    zIndex: 1,
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* ── CTA ── */}
          <div className="hidden md:flex">
            <NavCta />
          </div>

          {/* ── Mobile toggle ── */}
          <Hamburger open={mobileOpen} onClick={() => setMobileOpen(o => !o)} />
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <MobileDrawer open={mobileOpen} pathname={pathname} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* ─── Logo ─────────────────────────────────── */
function Logo() {
  const [h, setH] = useState(false);
  return (
    <Link href="/" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        overflow: "hidden",
        transition: "all 0.25s",
        boxShadow: h ? "0 0 0 4px rgba(200,169,110,0.22)" : "0 2px 10px rgba(200,169,110,0.28)",
        transform: h ? "scale(1.07)" : "scale(1)",
      }}>
        <Image src="/logo.png" alt="Ivy League Solutions" width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "white", letterSpacing: "0.01em", lineHeight: 1.2, transition: "color 0.2s" }}>
          Ivy League Solutions
        </div>
        <div style={{ fontSize: 8.5, fontWeight: 500, color: h ? "var(--accent)" : "rgba(200,169,110,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2, transition: "color 0.25s" }}>
          Enterprise Technology
        </div>
      </div>
    </Link>
  );
}

/* ─── CTA button ────────────────────────────── */
function NavCta() {
  const [h, setH] = useState(false);
  return (
    <Link href="/contact"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "8px 18px", borderRadius: 7,
        fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em",
        textDecoration: "none", color: "var(--navy)",
        background: h ? "var(--accent-light)" : "var(--accent)",
        boxShadow: h ? "0 4px 20px rgba(200,169,110,0.38)" : "0 2px 8px rgba(200,169,110,0.22)",
        transform: h ? "translateY(-1px)" : "none",
        transition: "all 0.22s",
      }}>
      Get Started
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: h ? "translateX(2px)" : "none", transition: "transform 0.22s" }}>
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </Link>
  );
}

/* ─── Hamburger ─────────────────────────────── */
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex md:hidden"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5, justifyContent: "center", alignItems: "center" }}
      aria-label="Menu">
      {[
        { t: open ? "rotate(45deg) translate(5px,5px)" : "none", w: 22 },
        { t: "none", w: open ? 0 : 16, o: open ? 0 : 1 },
        { t: open ? "rotate(-45deg) translate(5px,-5px)" : "none", w: 22 },
      ].map((bar, i) => (
        <span key={i} style={{
          display: "block", height: 1.5, borderRadius: 2,
          background: "rgba(255,255,255,0.85)",
          width: bar.w, opacity: bar.o ?? 1,
          transform: bar.t,
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        }} />
      ))}
    </button>
  );
}

/* ─── Mobile drawer ─────────────────────────── */
function MobileDrawer({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  return (
    <div className="md:hidden" style={{
      position: "fixed", inset: 0, zIndex: 40,
      pointerEvents: open ? "auto" : "none",
    }}>
      {/* backdrop */}
      <div onClick={onClose} style={{
        position: "absolute", inset: 0,
        background: "rgba(4,12,26,0.75)",
        backdropFilter: "blur(8px)",
        opacity: open ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* panel */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: 290,
        background: "linear-gradient(160deg, #0d2444 0%, #0B1F3A 100%)",
        borderLeft: "1px solid rgba(200,169,110,0.1)",
        display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "-12px 0 48px rgba(0,0,0,0.35)",
      }}>
        {/* panel header */}
        <div style={{
          padding: "20px 22px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(200,169,110,0.7)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Menu
          </span>
          <button onClick={onClose} style={{
            width: 26, height: 26, borderRadius: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)",
            fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        {/* links */}
        <nav style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 14px", borderRadius: 9,
                  fontSize: 14, fontWeight: isActive ? 500 : 400,
                  textDecoration: "none",
                  color: isActive ? "var(--accent)" : "rgba(255,255,255,0.7)",
                  background: isActive ? "rgba(200,169,110,0.09)" : "transparent",
                  borderLeft: `2px solid ${isActive ? "var(--accent)" : "transparent"}`,
                  transition: "all 0.18s",
                  animationDelay: `${i * 35}ms`,
                }}>
                {link.label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isActive ? "var(--accent)" : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            );
          })}
        </nav>

        {/* bottom CTA */}
        <div style={{ padding: "16px 20px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/contact" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "var(--accent)", color: "var(--navy)",
            padding: "13px 20px", borderRadius: 9,
            fontSize: 13, fontWeight: 600, textDecoration: "none",
            letterSpacing: "0.02em",
            boxShadow: "0 4px 16px rgba(200,169,110,0.25)",
          }}>
            Get Started
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

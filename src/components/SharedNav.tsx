"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import TopicsPanel from "./world/TopicsPanel";

const NAV_LINKS = [
  // { label: "Home",       href: "/"          },
  { label: "Services",   href: "/services"  },
  { label: "Portfolio",  href: "/solutions" },
  { label: "AI Solutions", href: "/ai"      },
  { label: "About",      href: "/about"     },
  { label: "Careers",    href: "/careers"   },
  { label: "Contact",    href: "/contact"   },
];

export function SharedNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
    <header
      className="fixed left-0 right-0 top-0 z-50"
      style={{
        background: scrolled || open
          ? "rgba(5,8,20,0.92)"
          : "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 70%, transparent 100%)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.4)" : "none",
        backdropFilter: scrolled || open ? "blur(12px)" : "none",
        transition: "background 0.15s ease-out, box-shadow 0.15s ease-out",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-5">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-dark.webp"
            alt="Ivy League Solutions"
            width={64}
            height={74}
            priority
            className="object-contain h-16 sm:h-[74px] w-auto"
          />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="text-white hover:text-[#22d3ee] transition-colors font-semibold"
                style={{ fontSize: 14.5, textShadow: "0 1px 4px rgba(0,0,0,0.5)", color: isActive ? "#22d3ee" : undefined }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile burger */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex md:hidden items-center justify-center rounded-full shrink-0"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{ width: 44, height: 44, background: open ? "#22d3ee" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(10px)", cursor: "pointer" }}
        >
          {open ? <X className="w-5 h-5" color="#050814" /> : <Menu className="w-5 h-5" color="white" />}
        </motion.button>

        {/* Desktop menu toggle (matches homepage's circular nav button) */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="hidden md:flex items-center justify-center rounded-full"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{ width: 44, height: 44, background: open ? "#22d3ee" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(10px)", cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={open ? "#050814" : "white"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </motion.button>
      </div>

    </header>

    <TopicsPanel
      open={open}
      onClose={() => setOpen(false)}
      onSelect={(slug) => {
        setOpen(false);
        router.push(`/?topic=${slug}`);
      }}
    />
    </>
  );
}

export function SharedFooter() {
  return (
    <footer style={{ background: "#050814", paddingTop: 48, paddingBottom: 48 }}>
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo-dark.webp"
              alt="Ivy League Solutions"
              width={188}
              height={72}
              style={{ height: 72, width: "auto" }}
              className="object-contain"
            />
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium hover:text-[#22d3ee] transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { href: "#", icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              { href: "#", icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> },
              { href: "#", icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            ].map(({ href, icon }, i) => (
              <a key={i} href={href}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-[#22d3ee] transition-colors"
                style={{ background: "rgba(255,255,255,0.08)" }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
          <div className="flex flex-wrap items-center gap-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <a href="mailto:contact@ivyleaguesolutions.com" className="hover:text-[#22d3ee] transition-colors">contact@ivyleaguesolutions.com</a>
            <span className="mx-3">|</span>
            <a href="https://wa.me/18453002429" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#22d3ee] transition-colors">
              <Phone size={13} />
              +1 845 300 2429
            </a>
            <span className="mx-3">|</span>
            <a href="/privacy-policy" className="hover:text-[#22d3ee] transition-colors">Privacy Policy</a>
            <span className="mx-3">|</span>
            <a href="/terms-of-service" className="hover:text-[#22d3ee] transition-colors">Terms of Service</a>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Ivy League Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}

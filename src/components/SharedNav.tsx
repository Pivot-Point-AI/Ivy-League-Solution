"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",       href: "/"          },
  { label: "Services",   href: "/services"  },
  { label: "Portfolio",  href: "/solutions" },
  { label: "AI Solutions", href: "/ai"      },
  { label: "About",      href: "/about"     },
  { label: "Contact",    href: "/contact"   },
];

export function SharedNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: 88,
        background: scrolled ? "#071B5A" : "transparent",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-dark.webp"
            alt="Ivy League Solutions"
            style={{ height: 48, width: "auto" }}
            className="object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="relative text-[15px] font-medium transition-colors"
                style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.75)" }}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg,#2563FF,#6C3CFF)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: email + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-white/70">
            <Phone className="w-3.5 h-3.5" />
            <span className="text-[13px] font-medium">contact@ivyleaguesolutions.com</span>
          </div>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-white font-semibold text-[14px] rounded-full px-7"
              style={{
                height: 48,
                background: "linear-gradient(135deg,#2F6BFF 0%,#2563FF 100%)",
                boxShadow: "0 8px 24px rgba(37,99,255,0.35)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Get a Quote
            </motion.button>
          </Link>
        </div>

        {/* Mobile burger */}
        <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#071B5A] border-t border-white/10 px-6 pb-5">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block py-2.5 text-sm font-medium text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}>
            <button className="mt-3 w-full text-white font-semibold py-3 rounded-full text-sm"
              style={{ background: "linear-gradient(135deg,#2F6BFF 0%,#2563FF 100%)", border: "none", cursor: "pointer" }}>
              Get a Quote
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

export function SharedFooter() {
  return (
    <footer style={{ background: "#061548", paddingTop: 48, paddingBottom: 48 }}>
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Logo */}
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dark.webp"
              alt="Ivy League Solutions"
              style={{ height: 44, width: "auto" }}
              className="object-contain"
            />
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium hover:text-white transition-colors"
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
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.08)" }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
          <div className="flex flex-wrap items-center gap-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>contact@ivyleaguesolutions.com</span>
            <span className="mx-3">|</span>
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <span className="mx-3">|</span>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Ivy League Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}

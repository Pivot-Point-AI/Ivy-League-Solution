"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MessageSquare,
  BarChart2,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/Contact";
/* ─── Fade-up animation wrapper ─── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
/* ─── MAIN PAGE ─── */
export default function IvyLeagueSolutionsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* ══════════════════════════════════════════ HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 96,
          background: scrolled ? "#071B5A" : "transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-14 h-full flex items-center justify-between">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-dark.webp" alt="Ivy League Solutions" className="object-contain flex-shrink-0" style={{ height: 52, width: "auto" }} />

          {/* Nav links — centered */}
          <nav className="hidden lg:flex items-center" style={{ gap: 42 }}>
            {[
              { label: "Services",     href: "/services"  },
              { label: "Portfolio",    href: "/solutions" },
              { label: "AI Solutions", href: "/ai"        },
              { label: "About",        href: "/about"     },
              { label: "Contact",      href: "/contact"   },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-white/85 hover:text-white text-[16px] font-medium transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: phone + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-2 text-white/80">
              <Phone className="w-4 h-4" />
              <span className="text-[15px] font-medium">contact@ivyleaguesolutions.com</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-white font-semibold text-[16px] rounded-full px-8 transition-all"
              style={{
                height: 56,
                background: "linear-gradient(135deg,#2F6BFF 0%,#2563FF 100%)",
                boxShadow: "0 10px 30px rgba(37,99,255,0.35)",
              }}
            >
              Get a Quote
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#071B5A]/95 backdrop-blur-md border-t border-white/10 px-6 pb-5">
            {[
              { label: "Home",         href: "/"          },
              { label: "Services",     href: "/services"  },
              { label: "Portfolio",    href: "/solutions" },
              { label: "AI Solutions", href: "/ai"        },
              { label: "About",        href: "/about"     },
              { label: "Contact",      href: "/contact"   },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="block text-white/80 hover:text-white py-2.5 text-sm font-medium">
                {label}
              </Link>
            ))}
            <button className="mt-3 w-full text-white font-semibold py-3 rounded-full text-sm"
              style={{ background: "linear-gradient(135deg,#2F6BFF 0%,#2563FF 100%)" }}>
              Get a Quote
            </button>
          </div>
        )}
      </header>

<HeroSection />
 <WhyChooseUs />

      {/* ══════════════════════════════════════════ FOOTER */}
      <footer
        className="relative"
        style={{ background: "#061548", paddingTop: 48, paddingBottom: 48 }}
      >
        <div className="max-w-[1280px] mx-auto px-12">
          {/* Top row: logo + nav + social */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-6"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            {/* Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-dark.webp" alt="Ivy League Solutions" className="h-14 w-auto object-contain" />

            {/* Nav links */}
            <nav className="flex flex-wrap gap-8">
              {[
                { label: "Home",         href: "/"          },
                { label: "Services",     href: "/services"  },
                { label: "Portfolio",    href: "/solutions" },
                { label: "AI Solutions", href: "/ai"        },
                { label: "About",        href: "/about"     },
                { label: "Contact",      href: "/contact"   },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="hover:text-white text-sm font-medium transition-colors"
                  style={{ color: "rgba(255,255,255,0.65)" }}>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Social */}
            <div className="flex gap-3">
              {[Facebook, MessageSquare, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <Icon className="w-3.5 h-3.5 text-white/70" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
            <div className="flex flex-wrap items-center gap-1 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Phone className="w-3.5 h-3.5" />
              <span>contact@ivyleaguesolutions.com</span>
              <span className="mx-3">|</span>
              <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
              <span className="mx-3">|</span>
              <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              © {new Date().getFullYear()} Ivy League Solutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

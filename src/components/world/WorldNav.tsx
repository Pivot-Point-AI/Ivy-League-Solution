"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/solutions" },
  { label: "AI Solutions", href: "/ai" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function WorldNav({
  showBack,
  onBack,
  onToggleTopics,
  topicsOpen,
  onLogoClick,
}: {
  showBack: boolean;
  onBack: () => void;
  onToggleTopics: () => void;
  topicsOpen: boolean;
  onLogoClick: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-5"
      style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 70%, transparent 100%)" }}
    >
      <div className="flex items-center gap-3 ml-1 sm:ml-4">
        {showBack && (
          <motion.button
            onClick={onBack}
            aria-label="Go back"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center justify-center rounded-full shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22d3ee]"
            style={{ width: 44, height: 44, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(10px)", cursor: "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        )}
        <button onClick={onLogoClick} aria-label="Go to entrance" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Image src="/logo-dark.webp" alt="Ivy League Solutions" width={64} height={74} className="object-contain h-16 sm:h-[74px] w-auto" />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-7">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white hover:text-[#22d3ee] transition-colors font-semibold"
            style={{ fontSize: 14.5, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <motion.button
          onClick={onToggleTopics}
          aria-label={topicsOpen ? "Close topics menu" : "Open topics menu"}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="hidden md:flex items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22d3ee]"
          style={{ width: 44, height: 44, background: topicsOpen ? "#22d3ee" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(10px)", cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={topicsOpen ? "#050814" : "white"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {topicsOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </motion.button>

        <motion.button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex md:hidden items-center justify-center rounded-full shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22d3ee]"
          style={{ width: 44, height: 44, background: mobileOpen ? "#22d3ee" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(10px)", cursor: "pointer" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={mobileOpen ? "#050814" : "white"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 flex flex-col px-6 py-4 gap-4"
            style={{ background: "rgba(5,8,20,0.96)", backdropFilter: "blur(12px)" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white hover:text-[#22d3ee] transition-colors font-semibold"
                style={{ fontSize: 16 }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onToggleTopics();
              }}
              className="text-left text-[#22d3ee] font-semibold pt-2 border-t border-white/10"
              style={{ fontSize: 16, background: "none", border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
            >
              Browse Topics
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

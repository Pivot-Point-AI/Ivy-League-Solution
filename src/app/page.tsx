"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/Contact";
import { SharedNav, SharedFooter } from "@/components/SharedNav";

export default function IvyLeagueSolutionsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const onPageMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-white relative"
      style={{ fontFamily: "'Poppins', sans-serif" }}
      onMouseMove={onPageMouseMove}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] origin-left"
        style={{ scaleX, height: 3, background: "linear-gradient(90deg,#2563FF,#6C3CFF)", transformOrigin: "0%" }}
      />

      {/* Page-wide cursor glow */}
      <div
        className="pointer-events-none fixed z-[90]"
        style={{
          left: cursor.x - 200,
          top: cursor.y - 200,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(37,99,255,0.07) 0%,transparent 70%)",
          transition: "left 0.12s ease-out, top 0.12s ease-out",
        }}
      />

      <SharedNav />
      <HeroSection />
      <WhyChooseUs />
      <SharedFooter />

      {/* Floating back-to-top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "linear-gradient(135deg,#2F6BFF,#2563FF)", border: "none", cursor: "pointer" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.25 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </motion.button>
    </div>
  );
}

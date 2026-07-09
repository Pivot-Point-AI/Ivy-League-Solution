"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const SLIDE_DURATION = 6000; // ms

const SLIDES = [
  {
    label: "Strategy & Consulting",
    heading: "Re-Invent your business with technology",
    desc: "We partner with you to map a clear technology roadmap, align stakeholders, and turn ambitious goals into a phased plan your teams can actually execute. From discovery workshops to a prioritized rollout, we make sure every investment ties back to measurable business outcomes.",
    tags: ["Roadmapping", "Stakeholder alignment", "Phased delivery"],
    img: "/addo-hero/strategy-advisory.webp",
    href: "/services",
    from: "#22d3ee",
    to: "#3b82f6",
  },
  {
    label: "AI & Machine Learning",
    heading: "Reimagine with Generative AI",
    desc: "From fraud detection to intelligent automation, we build production-grade AI and LLM systems that deliver measurable impact across your business. Our teams handle everything from model selection to responsible deployment, so you see results without the risk.",
    tags: ["LLM systems", "Predictive analytics", "Responsible AI"],
    img: "/addo-hero/ai-generative-ai.webp",
    href: "/services",
    from: "#a78bfa",
    to: "#ec4899",
  },
  {
    label: "Digital Infrastructure",
    heading: "Open the door to smarter decisions with cloud engineering",
    desc: "Migrate, modernize, and scale with confidence on AWS, Azure, and Oracle — backed by managed infrastructure that keeps pace with your growth. We design resilient architectures that cut costs while giving your teams room to innovate faster.",
    tags: ["Cloud migration", "Cost optimization", "Managed infra"],
    img: "/addo-hero/cloud-services.webp",
    href: "/services",
    from: "#60a5fa",
    to: "#22d3ee",
  },
  {
    label: "Cybersecurity & SOC",
    heading: "Protect what matters with Zero Trust security",
    desc: "24/7 threat monitoring, incident response, and compliance automation built on Zero Trust architecture — so your business stays resilient. Our SOC team catches threats before they escalate, keeping you audit-ready year round.",
    tags: ["24/7 monitoring", "Incident response", "Compliance automation"],
    img: "/addo-hero/data-engineering.webp",
    href: "/services",
    from: "#fb923c",
    to: "#f43f5e",
  },
  {
    label: "Software Development",
    heading: "Innovate with an agile, product-driven culture",
    desc: "Cross-functional teams ship in two-week sprints with full transparency, turning your product vision into working software fast. From wireframe to launch, you get working demos and a direct line to the engineers building your product.",
    tags: ["Agile sprints", "Full transparency", "Rapid delivery"],
    img: "/addo-hero/product-engineering.webp",
    href: "/services",
    from: "#34d399",
    to: "#22d3ee",
  },
];

export default function AddoHero() {
  const [active, setActive] = useState(0);
  const n = SLIDES.length;

  const advance = useCallback(() => {
    setActive((a) => (a + 1) % n);
  }, [n]);

  useEffect(() => {
    const t = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(t);
  }, [advance]);

  const slide = SLIDES[active];

  return (
    <section className="relative w-full overflow-hidden bg-black flex flex-col min-h-[640px] md:min-h-[100svh]">
      {/* Background image crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.img}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <Image
            src={slide.img}
            alt={slide.label}
            fill
            priority={active === 0}
            className="object-cover object-[70%_center] md:object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark uniform overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0) 32%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.25) 0%,rgba(0,0,0,0) 14%)" }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-start max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-8 xl:px-14"
        style={{ paddingTop: "clamp(96px,16vh,200px)" }}
      >
        <div className="max-w-[720px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p
                className="text-white/90 font-semibold uppercase mb-3.5"
                style={{ fontSize: 13, letterSpacing: "2.5px" }}
              >
                {slide.label}
              </p>
              <h1
                className="text-white font-bold"
                style={{ fontSize: "clamp(32px,4.4vw,56px)", lineHeight: 1.08, letterSpacing: "-1.5px" }}
              >
                {slide.heading}
              </h1>

              <p
                className="text-white/75 mt-4 sm:mt-5 leading-relaxed"
                style={{ fontSize: "clamp(13.5px,1.4vw,15.5px)", maxWidth: 640 }}
              >
                {slide.desc}
              </p>

              <div className="hidden sm:flex flex-wrap gap-2 mt-4">
                {slide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full font-medium"
                    style={{
                      fontSize: 12,
                      paddingInline: 12,
                      paddingBlock: 5,
                      color: "rgba(255,255,255,0.85)",
                      background: "rgba(255,255,255,0.08)",
                      border: `1px solid ${slide.from}55`,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.a
                href={slide.href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 sm:mt-7 inline-flex items-center gap-2.5 rounded-full font-semibold text-white"
                style={{
                  height: 46,
                  paddingInline: 22,
                  fontSize: 14,
                  border: "1.5px solid transparent",
                  backgroundImage: `linear-gradient(#000,#000), linear-gradient(90deg,${slide.from},${slide.to})`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                Learn More
                <span aria-hidden>→</span>
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom tab navigation with progress bar */}
      <div className="relative z-10 pt-10 sm:pt-16" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-8 xl:px-14 pb-5 sm:pb-6">
          {/* Progress track — each segment tinted with its own slide's accent color */}
          <div className="w-full h-[2px] mb-3 sm:mb-4 flex gap-1 sm:gap-1.5">
            {SLIDES.map((s, i) => (
              <div key={s.label} className="relative flex-1 h-full rounded-full overflow-hidden bg-white/20">
                {i < active && (
                  <div className="absolute inset-0" style={{ background: `linear-gradient(90deg,${s.from},${s.to})` }} />
                )}
                {i === active && (
                  <motion.div
                    key={active}
                    className="absolute inset-y-0 left-0 origin-left"
                    style={{ background: `linear-gradient(90deg,${s.from},${s.to})` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-2.5 sm:gap-y-3">
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.label}
                  onClick={() => setActive(i)}
                  className={`text-left cursor-pointer ${isActive ? "" : "hidden sm:block"}`}
                >
                  <span
                    className="block font-bold"
                    style={{ fontSize: "clamp(12.5px,1.1vw,14px)", color: isActive ? s.from : "rgba(255,255,255,0.7)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="block font-semibold mt-1"
                    style={{ fontSize: "clamp(12.5px,1.1vw,14px)", color: isActive ? "#fff" : "rgba(255,255,255,0.62)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ══ Count-up ══ */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const inc = target / (1800 / 16);
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══ Rotating word ══ */
const WORDS = ["Fintech", "Healthcare", "Logistics", "Enterprise", "EdTech", "Government"];
function TypingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span key={i}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
        transition={{ duration: 0.45 }}
        style={{ color: "#60a5fa", display: "inline-block" }}
      >
        {WORDS[i]}
      </motion.span>
    </AnimatePresence>
  );
}

/* ══ Magnetic button ══ */
function MagneticButton({ children, style, className, onClick }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ ...style, x: sx, y: sy }}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

/* ══ Particle field ══ */
function Particles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 12 + 8,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.4 + 0.1,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -40, 0], opacity: [p.opacity, p.opacity * 2, p.opacity], scale: [1, 1.4, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ══ 3-D tilt card ══ */
function TiltHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 20 });
  const sry = useSpring(ry, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(srx, v => `${v}deg`);
  const rotateY = useTransform(sry, v => `${v}deg`);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width  - 0.5;
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;
    ry.set(nx * 6);
    rx.set(-ny * 4);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { target: 200, suffix: "+", label: "Projects Delivered",   icon: "🚀" },
  { target: 98,  suffix: "%", label: "Client Satisfaction",  icon: "⭐" },
  { target: 15,  suffix: "+", label: "Industries Served",    icon: "🌐" },
  { target: 90,  suffix: "%", label: "Faster Processing",    icon: "⚡" },
];

const SERVICES = [
  { title: "Software Development", description: "End-to-end custom software from concept to deployment. Web, mobile, and enterprise applications built to scale with React, Node.js, .NET, and Python.", img: "/softwaredevelopment.png", filled: true },
  { title: "AI & Machine Learning", description: "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation at enterprise scale across fintech and healthcare.", img: "/Managed IT Services.png", filled: false },
  { title: "Digital Infrastructure", description: "Network services, datacenter solutions, cloud migration and managed IT infrastructure at enterprise scale on AWS, Azure, Cisco, and Oracle.", img: "/cloudsolution.png", filled: true },
  { title: "Cybersecurity & SOC", description: "24/7 threat monitoring, incident response, compliance automation, and security operations center with Zero Trust architecture built in.", img: "/cybersecurity.png", filled: false },
];

/* ══ How We Deliver ══ */
const STEPS = [
  {
    num: "01",
    title: "Understand Your Goals",
    desc: "We take time to understand your business domain, technical requirements, and enterprise objectives before writing a single line of code.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Dedicated Team Assembly",
    desc: "You get a named project manager, senior engineers, and a QA lead — purpose-built for your project and vertical.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Agile Development",
    desc: "We build in iterative sprints with full transparency — demos, reviews, and course corrections at every milestone.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Post-Launch Support",
    desc: "24/7 monitoring, SLA-backed incident response, and proactive performance tuning long after go-live.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

function HowWeDeliver() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % STEPS.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="text-[#2563FF] font-semibold text-[12px] uppercase tracking-[3px] mb-2">Our Process</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3.2vw,42px)", letterSpacing: "-0.5px" }}>
              How Ivy League Delivers
            </h2>
          </div>
          <motion.button
            whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 font-semibold text-[#2563FF]"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14 }}
          >
            See More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* 4 step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={s.num}
                onClick={() => setActive(i)}
                className="relative rounded-2xl p-7 cursor-pointer overflow-hidden flex flex-col"
                style={{ minHeight: 260 }}
                animate={{
                  background: isActive
                    ? "linear-gradient(145deg,#071B8F,#2563FF)"
                    : "#F8FAFF",
                  boxShadow: isActive
                    ? "0 20px 50px rgba(37,99,255,0.25)"
                    : "0 2px 16px rgba(15,23,42,0.06)",
                  y: isActive ? -6 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: isActive ? -6 : -3 }}
              >
                {/* Watermark number */}
                <div
                  className="absolute select-none font-extrabold pointer-events-none"
                  style={{
                    fontSize: 100,
                    lineHeight: 1,
                    right: -8,
                    bottom: -12,
                    color: isActive ? "rgba(255,255,255,0.06)" : "rgba(37,99,255,0.05)",
                  }}
                >
                  {s.num}
                </div>

                {/* Progress bar */}
                {isActive && (
                  <motion.div
                    className="absolute top-0 left-0 h-[3px] rounded-t-2xl"
                    style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.8, ease: "linear" }}
                    key={active}
                  />
                )}

                {/* Icon */}
                <motion.div
                  className="flex items-center justify-center rounded-xl mb-5 flex-shrink-0"
                  animate={{
                    background: isActive ? "rgba(255,255,255,0.15)" : "linear-gradient(135deg,#EEF2FF,#E0E7FF)",
                    color: isActive ? "#fff" : "#2563FF",
                  }}
                  style={{ width: 52, height: 52 }}
                  transition={{ duration: 0.3 }}
                >
                  {s.icon}
                </motion.div>

                {/* Step number label */}
                <span
                  className="font-bold text-[11px] uppercase tracking-[2px] mb-2"
                  style={{ color: isActive ? "rgba(255,255,255,0.5)" : "#94A3B8" }}
                >
                  Step {s.num}
                </span>

                {/* Title */}
                <h3
                  className="font-bold mb-3 leading-snug"
                  style={{
                    fontSize: 17,
                    color: isActive ? "#fff" : "#0F172A",
                  }}
                >
                  {s.title}
                </h3>

                {/* Description — always visible */}
                <p
                  className="leading-relaxed flex-1"
                  style={{
                    fontSize: 13.5,
                    color: isActive ? "rgba(255,255,255,0.7)" : "#64748B",
                  }}
                >
                  {s.desc}
                </p>

                {/* Arrow indicator */}
                <motion.div
                  className="mt-5 self-start flex items-center gap-1 font-semibold text-[13px]"
                  animate={{ color: isActive ? "rgba(255,255,255,0.8)" : "#2563FF" }}
                >
                  Learn More
                  <motion.svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ x: isActive ? 3 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </motion.svg>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Step indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {STEPS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{
                width: active === i ? 32 : 8,
                background: active === i ? "#2563FF" : "#CBD5E1",
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 8, borderRadius: 99, border: "none", cursor: "pointer" }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ══ Testimonials ══ */
const TESTIMONIALS = [
  {
    quote: "Ivy League Solutions transformed our legacy banking infrastructure. Their AI-powered risk engine cut processing time by 90% and the dedicated team embedded seamlessly with our engineers from day one.",
    name: "Chief Technology Officer",
    company: "Enterprise Fintech Client",
    industry: "Fintech",
    stat: "90% faster processing",
  },
  {
    quote: "The cybersecurity team deployed a Zero Trust architecture across our entire hospital network in under 8 weeks. Compliance automation alone saved us hundreds of hours per quarter.",
    name: "VP of IT & Operations",
    company: "Healthcare Enterprise",
    industry: "Healthcare",
    stat: "8-week deployment",
  },
  {
    quote: "From discovery to launch, every sprint had full transparency. The project manager was reachable around the clock and the QA lead caught issues before they ever reached production.",
    name: "Director of Engineering",
    company: "Logistics Platform",
    industry: "Logistics",
    stat: "Zero critical bugs at launch",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="bg-[#F8FAFF] overflow-hidden"
      style={{ paddingTop: 100, paddingBottom: 100 }}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-[#2563FF] font-semibold text-[12px] uppercase tracking-[3px] mb-2">Client Stories</p>
          <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3.2vw,42px)", letterSpacing: "-0.5px" }}>
            What Our Customers Say About Us
          </h2>
        </motion.div>

        {/* 3-card grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {TESTIMONIALS.map((item, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                className="relative rounded-2xl p-8 flex flex-col cursor-pointer overflow-hidden"
                animate={{
                  background: isActive
                    ? "linear-gradient(145deg,#071B8F 0%,#1E40AF 60%,#2563FF 100%)"
                    : "#ffffff",
                  boxShadow: isActive
                    ? "0 24px 64px rgba(37,99,255,0.28)"
                    : "0 2px 20px rgba(15,23,42,0.07)",
                  y: isActive ? -8 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ border: isActive ? "none" : "1px solid #E2E8F0", minHeight: 320 }}
              >
                {/* Progress bar on active */}
                {isActive && (
                  <motion.div
                    className="absolute top-0 left-0 h-1 rounded-t-2xl"
                    style={{ background: "linear-gradient(90deg,#60a5fa,#a78bfa)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.5, ease: "linear" }}
                    key={`bar-${active}`}
                  />
                )}

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24"
                      fill={isActive ? "#FCD34D" : "#FCD34D"} stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="leading-relaxed flex-1 mb-6"
                  style={{
                    fontSize: 14.5,
                    color: isActive ? "rgba(255,255,255,0.85)" : "#475569",
                    lineHeight: 1.75,
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="h-px mb-5" style={{ background: isActive ? "rgba(255,255,255,0.12)" : "#E2E8F0" }} />

                {/* Author row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                      style={{
                        background: isActive ? "rgba(255,255,255,0.15)" : "linear-gradient(135deg,#2563FF,#6C3CFF)",
                        color: "#fff",
                      }}
                    >
                      {item.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-[13px]" style={{ color: isActive ? "#fff" : "#0F172A" }}>{item.name}</p>
                      <p className="text-[12px]" style={{ color: isActive ? "rgba(255,255,255,0.5)" : "#94A3B8" }}>{item.company}</p>
                    </div>
                  </div>

                  {/* Stat */}
                  <span
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.12)" : "#EFF6FF",
                      color: isActive ? "#93c5fd" : "#2563FF",
                    }}
                  >
                    {item.stat}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                animate={{ width: active === i ? 32 : 8, background: active === i ? "#2563FF" : "#CBD5E1" }}
                transition={{ duration: 0.3 }}
                style={{ height: 8, borderRadius: 99, border: "none", cursor: "pointer" }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[
              { dir: -1, path: "M15 18l-6-6 6-6" },
              { dir:  1, path: "M9 18l6-6-6-6" },
            ].map(({ dir, path }) => (
              <motion.button
                key={dir}
                onClick={() => setActive(a => (a + dir + TESTIMONIALS.length) % TESTIMONIALS.length)}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "#fff", border: "1.5px solid #E2E8F0", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,23,42,0.06)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={path}/>
                </svg>
              </motion.button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const [mouse, setMouse] = useState({ x: -400, y: -400 });
  const heroRef = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const onMouseLeave = useCallback(() => {
    setMouse({ x: -400, y: -400 });
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════ HERO */}
      <section
        ref={heroRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative overflow-hidden"
        style={{ minHeight: 920 }}
      >
        {/* BG image — slow Ken Burns zoom */}
        <motion.img
          src="/landingpage.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0, transformOrigin: "60% 50%" }}
          animate={{ scale: [1, 1.06], x: [0, -12] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(105deg,rgba(4,12,80,0.94) 0%,rgba(7,27,143,0.82) 40%,rgba(20,50,180,0.40) 65%,rgba(80,40,200,0.04) 100%)" }} />

        {/* Mouse glow */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            zIndex: 2, borderRadius: "50%",
            width: 500, height: 500,
            left: mouse.x - 250, top: mouse.y - 250,
            background: "radial-gradient(circle,rgba(96,130,255,0.22) 0%,transparent 70%)",
            filter: "blur(30px)",
          }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />

        {/* Particles */}
        <Particles />

        {/* Animated floating squares */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
          {[
            { top: "14%", left: "7%",     s: 56, r: 15,  d: 6  },
            { top: "60%", left: "3%",     s: 38, r: -20, d: 8  },
            { top: "22%", right: "25%",   s: 48, r: 10,  d: 7  },
            { bottom: "20%", right: "12%",s: 34, r: 30,  d: 9  },
            { top: "45%", left: "48%",    s: 26, r: 45,  d: 5  },
            { top: "78%", right: "35%",   s: 20, r: -10, d: 11 },
          ].map((sq, i) => (
            <motion.div key={i}
              className="absolute border border-white/10 rounded-xl"
              style={{
                top: (sq as { top?: string }).top, left: (sq as { left?: string }).left,
                right: (sq as { right?: string }).right, bottom: (sq as { bottom?: string }).bottom,
                width: sq.s, height: sq.s, background: "rgba(255,255,255,0.04)",
              }}
              animate={{ rotate: [sq.r, sq.r + 360], y: [0, -14, 0] }}
              transition={{ rotate: { duration: sq.d * 2.5, repeat: Infinity, ease: "linear" }, y: { duration: sq.d / 1.5, repeat: Infinity, ease: "easeInOut" } }}
            />
          ))}
          {/* Pulsing rings */}
          {[1, 2, 3].map(i => (
            <motion.div key={i}
              className="absolute rounded-full border border-blue-400/10"
              style={{ top: "50%", left: "74%", width: i * 150, height: i * 150, marginLeft: -(i * 75), marginTop: -(i * 75) }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 3 + i * 0.8, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-center"
          style={{ minHeight: 920, paddingTop: 96, zIndex: 3 }}>

          <TiltHero>
            <div className="w-full lg:w-[52%] flex flex-col justify-center py-16 lg:py-0">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="inline-flex items-center gap-2 mb-6 w-fit"
                style={{ background: "rgba(96,130,255,0.15)", border: "1px solid rgba(96,130,255,0.35)", borderRadius: 999, paddingInline: 16, paddingBlock: 8 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-blue-400"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-blue-300 font-semibold text-[11px] uppercase tracking-widest">
                  Enterprise Software & AI Delivery
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="text-white font-extrabold"
                style={{ fontSize: "clamp(30px,4vw,56px)", letterSpacing: "-1.5px", lineHeight: 1.08, maxWidth: 620 }}
              >
                Trusted globally for{" "}
                <span style={{ background: "linear-gradient(135deg,#60a5fa 0%,#a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  custom technology
                </span>
                ,{" "}built for{" "}
                <span style={{ display: "inline-block", minWidth: 140 }}><TypingWord /></span>
              </motion.h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="text-white/65 mt-5 leading-relaxed"
                style={{ fontSize: 15.5, maxWidth: 460 }}
              >
                Premium custom software, AI systems, and digital infrastructure
                engineered for fintech, healthcare, and logistics.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                <MagneticButton
                  className="text-white font-semibold rounded-full relative overflow-hidden"
                  style={{ height: 56, paddingInline: 40, fontSize: 15, background: "linear-gradient(135deg,#2F6BFF,#2060FF)", boxShadow: "0 10px 32px rgba(37,99,255,0.55)", border: "none", cursor: "pointer" }}
                >
                  <motion.span className="absolute inset-0 rounded-full bg-white/10"
                    initial={{ x: "-110%", skewX: -12 }}
                    whileHover={{ x: "110%", skewX: -12 }}
                    transition={{ duration: 0.5 }}
                  />
                  Get Started →
                </MagneticButton>

                <MagneticButton
                  className="font-semibold rounded-full text-white relative overflow-hidden"
                  style={{ height: 56, paddingInline: 40, fontSize: 15, background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer" }}
                >
                  View Our Work
                </MagneticButton>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.58 }}
                className="mt-10"
              >
                <p className="text-white/30 text-[10px] font-semibold uppercase tracking-[3px] mb-5">
                  Redefining Enterprise-Grade Solutions, Built on Trust
                </p>
                <div className="flex flex-wrap">
                  {STATS.map((s, i) => (
                    <motion.div key={s.label}
                      className="flex flex-col cursor-default"
                      style={{
                        paddingRight: 28, paddingLeft: i === 0 ? 0 : 28,
                        borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
                      }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 280 }}
                    >
                      <span className="text-white font-extrabold leading-none" style={{ fontSize: 30, fontVariantNumeric: "tabular-nums" }}>
                        <CountUp target={s.target} suffix={s.suffix} />
                      </span>
                      <span className="text-white/40 mt-1" style={{ fontSize: 10.5 }}>{s.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </TiltHero>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 90, zIndex: 4 }}>
          <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M0 45C240 90 480 0 720 45C960 90 1200 0 1440 45V90H0V45Z" fill="rgba(220,225,255,0.3)" />
            <path d="M0 55C200 10 400 90 720 55C1000 20 1200 90 1440 55V90H0V55Z" fill="rgba(225,230,255,0.6)" />
            <path d="M0 70C360 30 720 90 1080 50C1200 38 1380 75 1440 70V90H0V70Z" fill="#E8ECFF" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════ SERVICES — 2nd */}
      <section className="relative overflow-hidden"
        style={{ paddingTop: 20, paddingBottom: 100, background: "linear-gradient(160deg,#F0F2FF 0%,#EBEEff 40%,#E8ECFF 100%)" }}>
        <div className="absolute top-0 right-0 w-[420px] h-[320px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right,rgba(99,102,241,0.12),transparent 70%)" }} />

        <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="mb-10">
              <h2 className="text-[#0F172A] font-extrabold" style={{ fontSize: "clamp(28px,3.5vw,42px)", letterSpacing: "-0.5px" }}>Our Services</h2>
              <p className="text-[#475569] font-medium mt-1" style={{ fontSize: 15 }}>What We Offer</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: "0 28px 60px rgba(15,23,42,0.15)" }}
                  transition={{ duration: 0.25 }}
                  className="bg-white flex flex-col h-full group"
                  style={{ borderRadius: 20, boxShadow: "0 4px 20px rgba(15,23,42,0.07)", padding: "28px 24px 24px" }}
                >
                  <div className="w-full flex items-center justify-center" style={{ minHeight: 150 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={svc.img} alt={svc.title} className="object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{ maxWidth: "100%", maxHeight: 150, width: "auto", height: "auto" }} />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mt-4 text-center" style={{ fontSize: 17 }}>{svc.title}</h3>
                  <p className="text-[#64748B] mt-2 flex-1 leading-relaxed text-center" style={{ fontSize: 13 }}>{svc.description}</p>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="mt-6 font-semibold transition-all duration-200"
                    style={{
                      height: 48, width: "100%", borderRadius: 999, fontSize: 14, cursor: "pointer",
                      ...(svc.filled
                        ? { background: "linear-gradient(135deg,#2F6BFF,#2060FF)", color: "#fff", border: "none", boxShadow: "0 6px 18px rgba(37,99,255,0.35)" }
                        : { background: "#fff", color: "#334155", border: "1.5px solid #CBD5E1" }),
                    }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ TESTIMONIALS — 3rd */}
      <Testimonials />

      {/* ══════════════════════════════════════════ HOW WE DELIVER — 4th */}
      <HowWeDeliver />
    </>
  );
}

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Package, Users, Globe2, Zap } from "lucide-react";

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

/* ══ Industry data ══ */
const INDUSTRIES = [
  { name: "Fintech",    color: "#34d399", desc: "AI-powered risk engines, payment platforms, and compliance automation built for the speed of modern finance." },
  { name: "Healthcare", color: "#60a5fa", desc: "HIPAA-compliant systems, clinical AI, and patient data platforms engineered for care delivery at scale." },
  { name: "Logistics",  color: "#fbbf24", desc: "Real-time tracking, route optimisation, and warehouse automation that keep supply chains moving." },
  { name: "Enterprise", color: "#a78bfa", desc: "Scalable internal platforms, ERP integrations, and enterprise AI that modernise operations end-to-end." },
  { name: "EdTech",     color: "#f0abfc", desc: "Adaptive learning platforms, LMS systems, and student analytics tools built for outcomes at scale." },
  { name: "Government", color: "#fb923c", desc: "Secure citizen portals, compliance-first infrastructure, and digital-transformation projects for public sector." },
];

/* ══ Rotating word — auto-cycles, but can be overridden ══ */
function TypingWord({ active, color }: { active: string; color: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span key={active}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
        transition={{ duration: 0.4 }}
        style={{ color, display: "inline-block" }}
      >
        {active}
      </motion.span>
    </AnimatePresence>
  );
}

/* ══ Canvas particle network ══ */
function ParticleNetwork({ mouseRef }: { mouseRef: React.MutableRefObject<{x:number;y:number}> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const explodeRef = useRef<{x:number;y:number;vx:number;vy:number;life:number;opacity:number}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w; canvas.height = h;

    const resize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener("resize", resize);

    // Particles
    const COUNT = 55;
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    // Click handler — explosion
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        explodeRef.current.push({ x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, opacity: 1 });
      }
    };
    canvas.addEventListener("click", onClick);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      // Move & draw particles
      for (const p of pts) {
        // Drift toward cursor slightly
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 1;
        if (dist < 180) { p.vx += dx / dist * 0.015; p.vy += dy / dist * 0.015; }
        // Repel when very close
        if (dist < 60) { p.vx -= dx / dist * 0.08; p.vy -= dy / dist * 0.08; }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.fill();
      }

      // Connect nearby particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(120,160,255,${(1 - d/130) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Connect particles near cursor
      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(99,160,255,${(1 - d/100) * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Explosion particles
      explodeRef.current = explodeRef.current.filter(ep => ep.life > 0);
      for (const ep of explodeRef.current) {
        ep.x += ep.vx; ep.y += ep.vy;
        ep.vx *= 0.93; ep.vy *= 0.93;
        ep.life -= 0.025;
        ctx.beginPath();
        ctx.arc(ep.x, ep.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,160,255,${ep.life})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onClick);
    };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 2 }}
    />
  );
}

/* ══ 3-D tilt service card ══ */
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(srx, v => `${v}deg`);
  const rotateY = useTransform(sry, v => `${v}deg`);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;
    ry.set(nx * 14);
    rx.set(-ny * 10);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}>
      {children}
    </motion.div>
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
  { target: 200, suffix: "+", label: "Projects Delivered", sub: "Across industries",            icon: Package, isGlobal: false },
  { target: 98,  suffix: "%", label: "Client Satisfaction", sub: "Long-term partnerships",       icon: Users,   isGlobal: false },
  { target: 0,   suffix: "",  label: "Presence",            sub: "Serving clients worldwide",    icon: Globe2,  isGlobal: true },
  { target: 90,  suffix: "%", label: "Faster Processing",   sub: "Through intelligent automation", icon: Zap,   isGlobal: false },
];

const TRUSTED_LOGOS = [
  { name: "AWS",        abbr: "AWS" },
  { name: "Azure",      abbr: "AZ"  },
  { name: "Oracle",     abbr: "ORC" },
  { name: "Cisco",      abbr: "CSC" },
  { name: "Fortinet",   abbr: "FTN" },
];

const SERVICES = [
  { title: "Software Development", description: "End-to-end custom software from concept to deployment. Web, mobile, and enterprise applications built to scale with React, Node.js, .NET, and Python.", img: "/softwaredevelopment.webp", filled: true, from: "#34d399", to: "#22d3ee" },
  { title: "AI & Machine Learning", description: "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation at enterprise scale across fintech and healthcare.", img: "/Managed IT Services.png", filled: true, from: "#a78bfa", to: "#ec4899" },
  { title: "Digital Infrastructure", description: "Network services, datacenter solutions, cloud migration and managed IT infrastructure at enterprise scale on AWS, Azure, Cisco, and Oracle.", img: "/cloudsolution.webp", filled: true, from: "#60a5fa", to: "#22d3ee" },
  { title: "Cybersecurity & SOC", description: "24/7 threat monitoring, incident response, compliance automation, and security operations center with Zero Trust architecture built in.", img: "/cybersecurity.webp", filled: true, from: "#fb923c", to: "#f43f5e" },
];

/* ══ How We Deliver ══ */
const STEPS = [
  {
    num: "01",
    from: "#22d3ee",
    to: "#3b82f6",
    title: "Requirements Gathering",
    desc: "We sit down with your stakeholders to map out goals, user needs, and technical constraints — turning your vision into a clear, agreed-upon project brief before any work begins.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    num: "02",
    from: "#a78bfa",
    to: "#ec4899",
    title: "UX / UI Design",
    desc: "Our designers craft wireframes, prototypes, and high-fidelity mockups. You review and approve every screen before a single line of code is written — no surprises later.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
      </svg>
    ),
  },
  {
    num: "03",
    from: "#60a5fa",
    to: "#22d3ee",
    title: "Agile Development",
    desc: "We build in two-week sprints with full transparency — working demos, live progress boards, and regular check-ins so you stay in control at every milestone.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: "04",
    from: "#fb923c",
    to: "#f43f5e",
    title: "QA & Testing",
    desc: "Dedicated QA engineers run functional, performance, and security tests across all environments. We don't ship until the product meets your acceptance criteria — zero critical bugs at launch.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    num: "05",
    from: "#34d399",
    to: "#22d3ee",
    title: "Post-Launch Support",
    desc: "24/7 monitoring, SLA-backed incident response, and proactive performance tuning keep your product healthy long after go-live — so you can focus on growing your business.",
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
    <section className="relative overflow-hidden" style={{ paddingTop: 100, paddingBottom: 100, background: "#050B3A" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,rgba(4,12,80,0.98) 0%,rgba(7,27,143,0.90) 42%,rgba(20,50,180,0.45) 66%,rgba(80,40,200,0.06) 100%)" }} />
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-14 flex-wrap gap-4"
        >
          <div>
            <p className="font-semibold uppercase mb-2" style={{ fontSize: 12, letterSpacing: "2.5px", color: "#60a5fa" }}>Our Process</p>
            <h2 className="text-white font-bold" style={{ fontSize: "clamp(28px,3.2vw,42px)", letterSpacing: "-1px" }}>
              How Ivy League Delivers
            </h2>
          </div>
          <motion.button
            whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = "/services"}
            className="flex items-center gap-2 font-semibold"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#22d3ee" }}
          >
            See More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* 4 step cards */}
        <div
          className="flex gap-5 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {STEPS.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={s.num}
                onClick={() => setActive(i)}
                className="relative rounded-2xl p-7 cursor-pointer overflow-hidden flex flex-col flex-shrink-0 w-full sm:w-[260px] lg:w-[clamp(220px,20vw,280px)]"
                style={{ minHeight: 280, scrollSnapAlign: "start", border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
                animate={{
                  background: isActive
                    ? `linear-gradient(145deg,${s.from},${s.to})`
                    : "rgba(255,255,255,0.045)",
                  boxShadow: isActive
                    ? `0 20px 50px ${s.from}40`
                    : "0 4px 24px rgba(0,0,0,0.25)",
                  y: isActive ? -6 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: isActive ? -6 : -3 }}
              >
                {/* Watermark number */}
                <div
                  className="absolute select-none font-extrabold pointer-events-none"
                  style={{
                    fontSize: 90,
                    lineHeight: 1,
                    right: 12,
                    bottom: -6,
                    color: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  {s.num}
                </div>

                {/* Progress bar */}
                {isActive && (
                  <motion.div
                    className="absolute top-0 left-0 h-[3px] rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg,${s.from},${s.to})` }}
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
                    background: isActive ? "rgba(255,255,255,0.15)" : `${s.from}1a`,
                    color: isActive ? "#fff" : s.from,
                  }}
                  style={{ width: 52, height: 52 }}
                  transition={{ duration: 0.3 }}
                >
                  {s.icon}
                </motion.div>

                {/* Step number label */}
                <span
                  className="font-bold text-[11px] uppercase tracking-[2px] mb-2"
                  style={{ color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.4)" }}
                >
                  Step {s.num}
                </span>

                {/* Title */}
                <h3
                  className="font-bold mb-3 leading-snug text-white"
                  style={{ fontSize: 17 }}
                >
                  {s.title}
                </h3>

                {/* Description — always visible */}
                <p
                  className="leading-relaxed flex-1"
                  style={{
                    fontSize: 13.5,
                    color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.55)",
                  }}
                >
                  {s.desc}
                </p>

                {/* Arrow indicator */}
                <motion.div
                  className="mt-5 self-start flex items-center gap-1 font-semibold text-[13px] cursor-pointer"
                  animate={{ color: isActive ? "rgba(255,255,255,0.8)" : s.from }}
                  onClick={(e) => { e.stopPropagation(); window.location.href = "/services"; }}
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
          {STEPS.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{
                width: active === i ? 32 : 8,
                background: active === i ? s.from : "rgba(255,255,255,0.2)",
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
    name: "James Thornton",
    role: "Chief Technology Officer",
    company: "NovaPay Financial",
    industry: "Fintech",
    stat: "90% faster processing",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    from: "#22d3ee",
    to: "#3b82f6",
  },
  {
    quote: "The cybersecurity team deployed a Zero Trust architecture across our entire hospital network in under 8 weeks. Compliance automation alone saved us hundreds of hours per quarter.",
    name: "Dr. Sarah Mitchell",
    role: "VP of IT & Operations",
    company: "MedCore Health Systems",
    industry: "Healthcare",
    stat: "8-week deployment",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    from: "#a78bfa",
    to: "#ec4899",
  },
  {
    quote: "From discovery to launch, every sprint had full transparency. The project manager was reachable around the clock and the QA lead caught issues before they ever reached production.",
    name: "Marcus Webb",
    role: "Director of Engineering",
    company: "SwiftRoute Logistics",
    industry: "Logistics",
    stat: "Zero critical bugs at launch",
    photo: "https://randomuser.me/api/portraits/men/65.jpg",
    from: "#fb923c",
    to: "#f43f5e",
  },
  {
    quote: "We needed a partner who could move at startup speed but deliver enterprise-grade quality. Ivy League hit every milestone on time and the platform they built handles millions of transactions daily.",
    name: "Priya Sharma",
    role: "Head of Product",
    company: "Crestline Commerce",
    industry: "Enterprise",
    stat: "Millions of daily transactions",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    from: "#34d399",
    to: "#22d3ee",
  },
];

const GAP = 24;

function TestimonialCard({ item, isActive, width }: { item: typeof TESTIMONIALS[0]; isActive: boolean; width: number }) {
  return (
    <motion.div
      className="relative rounded-2xl p-7 flex flex-col overflow-hidden flex-shrink-0"
      animate={{
        background: isActive
          ? `linear-gradient(145deg,#071B2E 0%,#0F172A 55%,${item.to} 140%)`
          : "#ffffff",
        boxShadow: isActive
          ? `0 24px 64px ${item.from}40`
          : "0 2px 20px rgba(15,23,42,0.07)",
        scale: isActive ? 1 : 0.97,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ border: isActive ? "none" : "1px solid #E2E8F0", minHeight: 320, width }}
    >
      {isActive && (
        <motion.div
          className="absolute top-0 left-0 h-1 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg,${item.from},${item.to})` }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "linear" }}
          key={`bar-${item.name}`}
        />
      )}
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, s) => (
          <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#FCD34D" stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <p className="leading-relaxed flex-1 mb-6" style={{ fontSize: 14.5, color: isActive ? "rgba(255,255,255,0.85)" : "#475569", lineHeight: 1.75 }}>
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="h-px mb-5" style={{ background: isActive ? "rgba(255,255,255,0.12)" : "#E2E8F0" }} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image src={item.photo} alt={item.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            style={{ border: isActive ? "2px solid rgba(255,255,255,0.25)" : "2px solid #E2E8F0" }} />
          <div>
            <p className="font-semibold text-[13px]" style={{ color: isActive ? "#fff" : "#0F172A" }}>{item.name}</p>
            <p className="text-[12px]" style={{ color: isActive ? "rgba(255,255,255,0.5)" : "#94A3B8" }}>{item.role} · {item.company}</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
          style={{ background: isActive ? "rgba(255,255,255,0.12)" : `${item.from}18`, color: isActive ? "#fff" : item.from }}>
          {item.stat}
        </span>
      </div>
    </motion.div>
  );
}

function Testimonials() {
  const n = TESTIMONIALS.length;
  // Start at offset n so we can go left without hitting 0
  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);

  // Measure container so exactly `visible` cards always fit — no partial cropped card
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setTrackWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const visible = trackWidth >= 1024 ? 3 : trackWidth >= 640 ? 2 : 1;
  const cardWidth = trackWidth > 0 ? (trackWidth - GAP * (visible - 1)) / visible : 380;
  const CARD_W = cardWidth + GAP;

  // Clones: [...original, ...original, ...original] — middle set is "real"
  const cloned = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  const dotActive = index % n;

  const advance = useCallback((dir: 1 | -1) => {
    setAnimate(true);
    setIndex(i => i + dir);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const t = setInterval(() => advance(1), 4500);
    return () => clearInterval(t);
  }, [advance]);

  // When we reach the clone boundary, silently reset to the middle copy
  const handleAnimationComplete = useCallback(() => {
    if (index >= n * 2) {
      setAnimate(false);
      setIndex(n);
    } else if (index < n) {
      setAnimate(false);
      setIndex(n * 2 - 1);
    }
  }, [index, n]);

  return (
    <section className="bg-[#E8ECFF] overflow-hidden" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
          <p className="font-semibold uppercase mb-2" style={{ fontSize: 12, letterSpacing: "2.5px", background: "linear-gradient(90deg,#0891b2,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Client Stories</p>
          <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3.2vw,42px)", letterSpacing: "-1px" }}>
            What Our Customers Say About Us
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative overflow-hidden" style={{ paddingTop: 8, paddingBottom: 8, margin: "-8px 0" }}>
          <motion.div
            className="flex"
            style={{ gap: GAP, width: cloned.length * CARD_W - GAP }}
            animate={{ x: -(index * CARD_W) }}
            transition={animate ? { type: "spring", stiffness: 200, damping: 30 } : { duration: 0 }}
            onAnimationComplete={handleAnimationComplete}
          >
            {trackWidth > 0 && cloned.map((item, i) => (
              <TestimonialCard
                key={i}
                item={item}
                isActive={i % n === dotActive}
                width={cardWidth}
              />
            ))}
          </motion.div>
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-2">
            {TESTIMONIALS.map((t, i) => (
              <motion.button
                key={i}
                onClick={() => { setAnimate(true); setIndex(n + i); }}
                animate={{ width: dotActive === i ? 32 : 8, background: dotActive === i ? t.from : "#CBD5E1" }}
                transition={{ duration: 0.3 }}
                style={{ height: 8, borderRadius: 99, border: "none", cursor: "pointer" }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {[
              { dir: -1 as const, path: "M15 18l-6-6 6-6" },
              { dir:  1 as const, path: "M9 18l6-6-6-6" },
            ].map(({ dir, path }) => (
              <motion.button
                key={dir}
                onClick={() => advance(dir)}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "#fff", border: "1.5px solid #E2E8F0", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,23,42,0.06)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

/* ══ Word-by-word text reveal ══ */
function RevealText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ══ Spotlight card — cursor-aware glow ══ */
function SpotlightCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setPos(p => ({ ...p, opacity: 0 }))}
      className={`relative ${className ?? ""}`} style={style}>
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-300"
        style={{ borderRadius: "inherit" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(37,99,255,0.10), transparent 80%)`,
            opacity: pos.opacity,
          }}
        />
      </div>
      {children}
    </div>
  );
}

/* ══ Ripple button ══ */
function RippleButton({ children, style, className, onClick }: { children: React.ReactNode; style?: React.CSSProperties; className?: string; onClick?: () => void }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const onDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [...prev, { x: e.clientX - r.left, y: e.clientY - r.top, id }]);
    setTimeout(() => setRipples(prev => prev.filter(rp => rp.id !== id)), 600);
  };
  return (
    <motion.button onMouseDown={onDown} onClick={onClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      {ripples.map(rp => (
        <motion.span key={rp.id} className="absolute rounded-full pointer-events-none"
          style={{ left: rp.x - 60, top: rp.y - 60, width: 120, height: 120, background: "rgba(255,255,255,0.25)" }}
          initial={{ scale: 0, opacity: 1 }} animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      {children}
    </motion.button>
  );
}

/* ══ Custom morphing cursor ══ */
function CustomCursor() {
  const [pos, setPos]     = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClick(true);
    const up   = () => setClick(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);

    // Detect hoverable elements
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const btn = el.closest("button,a,[data-cursor]");
      if (btn) {
        setHover(true);
        setLabel((btn as HTMLElement).dataset.cursor || "");
      } else { setHover(false); setLabel(""); }
    };
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        animate={{
          x: pos.x - (hover ? 24 : 20),
          y: pos.y - (hover ? 24 : 20),
          width:  hover ? 48 : 40,
          height: hover ? 48 : 40,
          background: hover ? "rgba(37,99,255,0.12)" : "transparent",
          borderColor: hover ? "#2563FF" : "rgba(255,255,255,0.6)",
          scale: click ? 0.75 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.5 }}
        style={{ border: "1.5px solid", mixBlendMode: "difference" }}
      >
        {label && <span style={{ fontSize: 9, fontWeight: 700, color: "#2563FF", letterSpacing: 1, textTransform: "uppercase" }}>{label}</span>}
      </motion.div>
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full bg-white"
        animate={{ x: pos.x - 3, y: pos.y - 3, scale: click ? 1.8 : hover ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 28, mass: 0.2 }}
        style={{ width: 6, height: 6 }}
      />
    </>
  );
}

/* ══ Infinite marquee strip ══ */
const MARQUEE_ITEMS = [
  "React", "Next.js", "Node.js", "Python", ".NET", "AWS", "Azure", "Docker",
  "Kubernetes", "Oracle", "TensorFlow", "PostgreSQL", "Cisco", "Fortinet",
  "Veeam", "SAP", "Huawei", "MLOps", "Zero Trust", "GraphQL",
];

/* ══ Bouncy text — per-character hover animation ══ */
function BouncyText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={style}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: ch === " " ? "inline" : "inline-block", cursor: "default" }}
          whileHover={ch !== " " ? { y: -10, scale: 1.25, color: "#60a5fa", transition: { type: "spring", stiffness: 500, damping: 12 } } : {}}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ══ Smooth count-up stat ══ */
function StatBoxItem({ target, suffix, label, sub, icon: Icon, isGlobal }: { target: number; suffix: string; label: string; sub: string; icon: React.ComponentType<{ size?: number; className?: string }>; isGlobal?: boolean }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || isGlobal) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, isGlobal]);

  return (
    <div ref={ref} className="flex items-center gap-3.5 cursor-default">
      <div className="flex items-center justify-center rounded-full shrink-0" style={{ width: 44, height: 44, background: "rgba(96,120,255,0.16)", border: "1px solid rgba(120,140,255,0.25)" }}>
        <Icon size={19} className="text-blue-300" />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold leading-none text-white tabular-nums" style={{ fontSize: "clamp(20px,2vw,26px)" }}>
          {isGlobal ? "Global" : `${val}${suffix}`}
        </span>
        <span className="text-white/80 mt-1.5 font-semibold" style={{ fontSize: 13 }}>{label}</span>
        <span className="text-white/40 mt-0.5" style={{ fontSize: 11.5 }}>{sub}</span>
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-10"
      style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(10,16,60,0.35)", backdropFilter: "blur(10px)", padding: "28px 32px" }}
    >
      {STATS.map((s) => (
        <StatBoxItem key={s.label} target={s.target} suffix={s.suffix} label={s.label} sub={s.sub} icon={s.icon} isGlobal={s.isGlobal} />
      ))}
    </motion.div>
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
  const [industryIdx, setIndustryIdx] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const mouseRef = useRef({ x: -400, y: -400 });
  const heroRef = useRef<HTMLElement>(null);

  const activeIndustry = INDUSTRIES[industryIdx];

  // Auto-cycle unless user picked manually
  useEffect(() => {
    if (userPicked) return;
    const t = setInterval(() => setIndustryIdx(i => (i + 1) % INDUSTRIES.length), 2800);
    return () => clearInterval(t);
  }, [userPicked]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left, y = e.clientY - r.top;
    mouseRef.current = { x, y };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: -400, y: -400 };
  }, []);

  const heroSection = (
      <section
        ref={heroRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative overflow-hidden"
        style={{ paddingTop: 100, paddingBottom: 100, background: "#050B3A" }}
      >
        {/* Illustration — right-side background, same treatment as the old full hero */}
        <Image
          src="/landing2.webp"
          alt="Enterprise software development and IT consulting team collaborating at Ivy League Solutions"
          fill
          sizes="58vw"
          className="hidden md:block object-contain object-right"
          style={{ zIndex: 0 }}
        />

        {/* Dark overlay — matches the other dark sections on the page */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(105deg,rgba(4,12,80,0.98) 0%,rgba(7,27,143,0.90) 42%,rgba(20,50,180,0.45) 66%,rgba(80,40,200,0.06) 100%)" }} />

        {/* Canvas particle network */}
        <ParticleNetwork mouseRef={mouseRef} />

        <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14" style={{ zIndex: 2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="font-semibold uppercase mb-3"
                style={{ fontSize: 12, letterSpacing: "2.5px", color: "#60a5fa" }}
              >
                Who We Serve
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}
                className="text-white font-bold"
                style={{ fontSize: "clamp(28px,3.5vw,42px)", letterSpacing: "-1px", lineHeight: 1.15 }}
              >
                Built for{" "}
                <span style={{ display: "inline-block", minWidth: "7ch" }}>
                  <TypingWord active={activeIndustry.name} color={activeIndustry.color} />
                </span>
              </motion.h2>

              {/* Industry selector pills */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-2 mt-6"
              >
                {INDUSTRIES.map((ind, i) => {
                  const isActive = industryIdx === i;
                  return (
                    <motion.button
                      key={ind.name}
                      onClick={() => { setIndustryIdx(i); setUserPicked(true); }}
                      whileHover={{ scale: 1.06, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        background: isActive ? `${ind.color}22` : "rgba(255,255,255,0.06)",
                        borderColor: isActive ? ind.color : "rgba(255,255,255,0.15)",
                        color: isActive ? ind.color : "rgba(255,255,255,0.5)",
                      }}
                      transition={{ duration: 0.25 }}
                      style={{ borderRadius: 999, paddingInline: 13, paddingBlock: 6, fontSize: 12, fontWeight: 600, border: "1px solid", cursor: "pointer", backdropFilter: "blur(8px)", letterSpacing: "0.02em" }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pill-dot"
                          className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                          style={{ background: ind.color, verticalAlign: "middle" }}
                        />
                      )}
                      {ind.name}
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Dynamic sub-description */}
              <div className="mt-4 overflow-hidden" style={{ minHeight: 48 }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={industryIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="leading-relaxed"
                    style={{ fontSize: "clamp(13px,1.2vw,15px)", maxWidth: 480, color: "rgba(255,255,255,0.58)" }}
                  >
                    {activeIndustry.desc}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-7"
              >
                <RippleButton
                  className="text-white font-semibold rounded-full inline-flex items-center justify-center gap-2.5"
                  style={{ height: 48, paddingInline: 28, fontSize: 14, background: "linear-gradient(135deg,#2F6BFF,#2060FF)", boxShadow: "0 8px 28px rgba(37,99,255,0.4)", border: "none", cursor: "pointer" }}
                  onClick={() => window.location.href = "/contact"}
                >
                  Get Started
                  <span>→</span>
                </RippleButton>
              </motion.div>

              {/* Trusted by strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 flex items-center gap-4 flex-wrap"
              >
                <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", whiteSpace: "nowrap" }}>Trusted by</span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {TRUSTED_LOGOS.map((logo, i) => (
                    <motion.div
                      key={logo.name}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.12)", borderColor: "rgba(96,165,250,0.45)" }}
                      className="rounded-lg px-3 py-1.5 flex items-center"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", cursor: "default" }}
                    >
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>{logo.abbr}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column — kept empty so the left copy sits over the background illustration */}
            <div className="hidden lg:block" aria-hidden />
          </div>
        </div>
      </section>
  );

  return (
    <>
      {/* ══════════════════════════════════════════ SERVICES — 1st (disabled, see WorldExperience's story-bridge section) */}
      {false && (
      <section className="relative overflow-hidden"
        style={{ paddingTop: 100, paddingBottom: 100, background: "linear-gradient(160deg,#F0F2FF 0%,#EBEEff 40%,#E8ECFF 100%)" }}>
        <div className="absolute top-0 right-0 w-[420px] h-[320px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right,rgba(99,102,241,0.12),transparent 70%)" }} />

        <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="mb-10">
              <p className="font-semibold uppercase" style={{ fontSize: 12, letterSpacing: "2.5px", background: "linear-gradient(90deg,#0891b2,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>What We Offer</p>
              <RevealText text="Our Services" className="text-[#0F172A] font-extrabold block mt-2" style={{ fontSize: "clamp(28px,3.5vw,42px)", letterSpacing: "-1px" }} />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.08}>
                <TiltCard
                  className="bg-white flex flex-col h-full group cursor-pointer relative overflow-hidden"
                  style={{ borderRadius: 20, boxShadow: "0 4px 20px rgba(15,23,42,0.07)", padding: "28px 24px 24px" }}
                >
                  <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: `linear-gradient(90deg,${svc.from},${svc.to})` }} />
                  <SpotlightCard className="flex flex-col h-full" style={{ borderRadius: 16 }}>
                  <div className="flex flex-col h-full">
                  <div className="w-full flex items-center justify-center relative overflow-hidden" style={{ minHeight: 150 }}>
                    <Image src={svc.img} alt={svc.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-contain p-4 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1" />
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center rounded-xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{ background: `linear-gradient(135deg,${svc.from}12,${svc.to}12)` }}
                    />
                  </div>
                  <h3 className="font-bold text-[#0F172A] mt-4 text-center" style={{ fontSize: 17 }}>{svc.title}</h3>
                  <p className="text-[#64748B] mt-2 flex-1 leading-relaxed text-center" style={{ fontSize: 13 }}>{svc.description}</p>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => window.location.href = "/services"}
                    className="mt-6 font-semibold transition-all duration-200"
                    style={{
                      height: 48, width: "100%", borderRadius: 999, fontSize: 14, cursor: "pointer",
                      background: "linear-gradient(135deg,#0891b2,#7c3aed)", color: "#fff", border: "none", boxShadow: "0 6px 18px rgba(124,58,237,0.35)",
                    }}
                  >
                    Learn More
                  </motion.button>
                  </div>
                  </SpotlightCard>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ══════════════════════════════════════════ HERO — shown after Services */}
      {heroSection}

      {/* ══════════════════════════════════════════ TESTIMONIALS — 3rd */}
      <Testimonials />

      {/* ══════════════════════════════════════════ HOW WE DELIVER — 4th */}
      <HowWeDeliver />
    </>
  );
}

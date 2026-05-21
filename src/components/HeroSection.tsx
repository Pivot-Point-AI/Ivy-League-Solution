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
  { target: 200, suffix: "+", label: "Projects Delivered",   icon: "🚀" },
  { target: 98,  suffix: "%", label: "Client Satisfaction",  icon: "⭐" },
  { target: 15,  suffix: "+", label: "Industries Served",    icon: "🌐" },
  { target: 90,  suffix: "%", label: "Faster Processing",    icon: "⚡" },
];

const SERVICES = [
  { title: "Software Development", description: "End-to-end custom software from concept to deployment. Web, mobile, and enterprise applications built to scale with React, Node.js, .NET, and Python.", img: "/softwaredevelopment.webp", filled: true },
  { title: "AI & Machine Learning", description: "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation at enterprise scale across fintech and healthcare.", img: "/Managed IT Services.png", filled: false },
  { title: "Digital Infrastructure", description: "Network services, datacenter solutions, cloud migration and managed IT infrastructure at enterprise scale on AWS, Azure, Cisco, and Oracle.", img: "/cloudsolution.webp", filled: true },
  { title: "Cybersecurity & SOC", description: "24/7 threat monitoring, incident response, compliance automation, and security operations center with Zero Trust architecture built in.", img: "/cybersecurity.webp", filled: false },
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

        {/* Draggable carousel */}
        <div className="relative overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -(TESTIMONIALS.length - 1) * 420, right: 0 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
            animate={{ x: -(active * 420) }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) setActive(a => Math.min(a + 1, TESTIMONIALS.length - 1));
              if (info.offset.x > 80)  setActive(a => Math.max(a - 1, 0));
            }}
            style={{ width: TESTIMONIALS.length * 420 }}
          >
          {TESTIMONIALS.map((item, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                className="relative rounded-2xl p-8 flex flex-col overflow-hidden flex-shrink-0"
                animate={{
                  background: isActive
                    ? "linear-gradient(145deg,#071B8F 0%,#1E40AF 60%,#2563FF 100%)"
                    : "#ffffff",
                  boxShadow: isActive
                    ? "0 24px 64px rgba(37,99,255,0.28)"
                    : "0 2px 20px rgba(15,23,42,0.07)",
                  scale: isActive ? 1 : 0.97,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ border: isActive ? "none" : "1px solid #E2E8F0", minHeight: 320, width: 400 }}
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
          </motion.div>
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
      className={`relative overflow-hidden ${className ?? ""}`} style={style}>
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(37,99,255,0.10), transparent 80%)`,
          opacity: pos.opacity,
        }}
      />
      {children}
    </div>
  );
}

/* ══ Text scramble hook ══ */
function useScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  useEffect(() => {
    if (!trigger) { setDisplay(text); return; }
    let iter = 0;
    const t = setInterval(() => {
      setDisplay(text.split("").map((c, i) =>
        i < iter ? c : c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
      ).join(""));
      if (iter >= text.length) clearInterval(t);
      iter += 1.5;
    }, 28);
    return () => clearInterval(t);
  }, [trigger, text]);
  return display;
}

/* ══ Ripple button ══ */
function RippleButton({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const onDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [...prev, { x: e.clientX - r.left, y: e.clientY - r.top, id }]);
    setTimeout(() => setRipples(prev => prev.filter(rp => rp.id !== id)), 600);
  };
  return (
    <motion.button onMouseDown={onDown} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
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

function Marquee() {
  return (
    <div className="relative overflow-hidden py-4" style={{ background: "rgba(7,27,90,0.95)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-white/40 font-semibold uppercase tracking-widest" style={{ fontSize: 11 }}>
            <span className="w-1 h-1 rounded-full bg-blue-500/60 flex-shrink-0" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ══ Sparkle trail ══ */
function SparkleTrail() {
  const [sparks, setSparks] = useState<{id:number;x:number;y:number;size:number;color:string;angle:number}[]>([]);
  useEffect(() => {
    let last = Date.now();
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < 40) return; // throttle
      last = now;
      const colors = ["#60a5fa","#a78bfa","#f0abfc","#34d399","#fbbf24"];
      const id = now + Math.random();
      setSparks(s => [...s.slice(-18), {
        id, x: e.clientX, y: e.clientY,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * 360,
      }]);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {sparks.map(s => (
        <motion.div key={s.id} className="absolute"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size, marginLeft: -s.size/2, marginTop: -s.size/2 }}
          initial={{ scale: 1, opacity: 0.9, rotate: s.angle }}
          animate={{ scale: 0, opacity: 0, y: -24, rotate: s.angle + 180 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          onAnimationComplete={() => setSparks(prev => prev.filter(p => p.id !== s.id))}
        >
          <svg viewBox="0 0 10 10" style={{ width: "100%", height: "100%" }}>
            <path d="M5 0 L5.8 3.5 L9.5 5 L5.8 6.5 L5 10 L4.2 6.5 L0.5 5 L4.2 3.5Z" fill={s.color} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ══ Bouncy headline — each letter reacts independently ══ */
function BouncyText({ text, style, className }: { text: string; style?: React.CSSProperties; className?: string }) {
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

/* ══ Slot-machine stat ══ */
function SlotStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [val, setVal] = useState(0);
  const [rolling, setRolling] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    setRolling(true);
    let cur = 0;
    const steps = 28;
    let step = 0;
    const t = setInterval(() => {
      step++;
      if (step >= steps) { setVal(target); setRolling(false); clearInterval(t); return; }
      // Ease-out: fast then slow
      const progress = 1 - Math.pow(1 - step / steps, 3);
      cur = Math.round(target * progress);
      setVal(cur);
    }, 40);
    return () => clearInterval(t);
  }, [inView, target]);

  return (
    <motion.div ref={ref} className="flex flex-col cursor-default"
      whileHover={{ scale: 1.12 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="font-extrabold leading-none text-white tabular-nums" style={{ fontSize: 32 }}>
        {rolling ? (
          <AnimatePresence mode="popLayout">
            <motion.span key={val}
              initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.1 }}
              style={{ display: "inline-block" }}
            >
              {val}
            </motion.span>
          </AnimatePresence>
        ) : val}{suffix}
      </span>
      <span className="text-white/40 mt-1" style={{ fontSize: 10.5 }}>{label}</span>
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
  const [mouse, setMouse] = useState({ x: -400, y: -400 });
  const [normMouse, setNormMouse] = useState({ x: 0.5, y: 0.5 });
  const [scramble, setScramble] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number|null>(null);
  const mouseRef = useRef({ x: -400, y: -400 });
  const heroRef = useRef<HTMLElement>(null);

  const headingText = "Trusted globally for custom technology";
  const scrambledHeading = useScramble(headingText, scramble);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });
  const layer1x = useTransform(smx, [0,1], ["-2%","2%"]);
  const layer1y = useTransform(smy, [0,1], ["-2%","2%"]);
  const layer2x = useTransform(smx, [0,1], ["-5%","5%"]);
  const layer2y = useTransform(smy, [0,1], ["-5%","5%"]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const nx = x / r.width, ny = y / r.height;
    setMouse({ x, y });
    setNormMouse({ x: nx, y: ny });
    mouseRef.current = { x, y };
    mx.set(nx); my.set(ny);
  }, [mx, my]);

  const onMouseLeave = useCallback(() => {
    setMouse({ x: -400, y: -400 });
    mouseRef.current = { x: -400, y: -400 };
    mx.set(0.5); my.set(0.5);
  }, [mx, my]);

  return (
    <>
      <CustomCursor />
      <SparkleTrail />
      {/* ══════════════════════════════════════════ HERO */}
      <section
        ref={heroRef}
        onMouseMove={onMouseMove}
        style={{ cursor: "none",minHeight: 920 }}
        onMouseLeave={onMouseLeave}
        className="relative overflow-hidden"
      >
        {/* BG image — slow Ken Burns zoom */}
        <motion.img
          src="/landingpage.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0, transformOrigin: "60% 50%" }}
          animate={{ scale: [1, 1.06], x: [0, -12] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(105deg,rgba(4,12,80,0.94) 0%,rgba(7,27,143,0.82) 40%,rgba(20,50,180,0.40) 65%,rgba(80,40,200,0.04) 100%)" }} />

        {/* Dynamic colour bloom — shifts with mouse */}
        <div className="absolute pointer-events-none" style={{ zIndex: 2, left: mouse.x - 300, top: mouse.y - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle,rgba(${Math.round(37+normMouse.x*60)},${Math.round(99+normMouse.y*40)},255,0.18) 0%,transparent 70%)`, filter: "blur(40px)", transition: "left 0.15s,top 0.15s" }} />

        {/* Canvas particle network — click anywhere to explode */}
        <ParticleNetwork mouseRef={mouseRef} />

        {/* Parallax floating shapes — two depth layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
          <motion.div className="absolute inset-0" style={{ x: layer1x, y: layer1y }}>
            {[{top:"14%",left:"7%",s:56,r:15,d:6},{top:"60%",left:"3%",s:38,r:-20,d:8},{top:"78%",right:"35%",s:20,r:-10,d:11}].map((sq,i)=>(
              <motion.div key={i} className="absolute border border-white/10 rounded-xl"
                style={{top:(sq as {top?:string}).top,left:(sq as {left?:string}).left,right:(sq as {right?:string}).right,width:sq.s,height:sq.s,background:"rgba(255,255,255,0.04)"}}
                animate={{rotate:[sq.r,sq.r+360],y:[0,-12,0]}}
                transition={{rotate:{duration:sq.d*2.5,repeat:Infinity,ease:"linear"},y:{duration:sq.d/1.5,repeat:Infinity,ease:"easeInOut"}}}
              />
            ))}
          </motion.div>
          <motion.div className="absolute inset-0" style={{ x: layer2x, y: layer2y }}>
            {[{top:"22%",right:"25%",s:48,r:10,d:7},{bottom:"20%",right:"12%",s:34,r:30,d:9},{top:"45%",left:"48%",s:26,r:45,d:5}].map((sq,i)=>(
              <motion.div key={i} className="absolute border border-white/15 rounded-xl"
                style={{top:(sq as {top?:string}).top,left:(sq as {left?:string}).left,right:(sq as {right?:string}).right,bottom:(sq as {bottom?:string}).bottom,width:sq.s,height:sq.s,background:"rgba(255,255,255,0.06)"}}
                animate={{rotate:[sq.r,sq.r-360],y:[0,-18,0]}}
                transition={{rotate:{duration:sq.d*3,repeat:Infinity,ease:"linear"},y:{duration:sq.d/1.2,repeat:Infinity,ease:"easeInOut"}}}
              />
            ))}
          </motion.div>
          {[1,2,3].map(i=>(
            <motion.div key={i} className="absolute rounded-full border border-blue-400/10"
              style={{top:"50%",left:"74%",width:i*150,height:i*150,marginLeft:-(i*75),marginTop:-(i*75)}}
              animate={{scale:[1,1.2,1],opacity:[0.25,0,0.25]}}
              transition={{duration:3+i*0.8,repeat:Infinity,delay:i*0.9,ease:"easeInOut"}}
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

              {/* Headline — hover to scramble chars */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.14 }}
                className="text-white font-extrabold cursor-default select-none"
                style={{ fontSize: "clamp(30px,4vw,96px)", letterSpacing: "-1.5px", lineHeight: 1.08, maxWidth: 620 }}
                onMouseEnter={() => setScramble(true)}
                onMouseLeave={() => setScramble(false)}
              >
                {/* Scramble on hover — bouncy letters underneath */}
                {scramble
                  ? <span className="font-mono" style={{ letterSpacing: "-0.5px" }}>{scrambledHeading}</span>
                  : <BouncyText text={headingText} />
                }
                {","}{" "}built for{" "}
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
                <RippleButton
                  className="text-white font-semibold rounded-full"
                  style={{ height: 56, paddingInline: 40, fontSize: 15, background: "linear-gradient(135deg,#2F6BFF,#2060FF)", boxShadow: "0 10px 32px rgba(37,99,255,0.55)", border: "none", cursor: "pointer" }}
                >
                  Get Started →
                </RippleButton>

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
                    <div key={s.label} style={{ paddingRight: 28, paddingLeft: i === 0 ? 0 : 28, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                      <SlotStat target={s.target} suffix={s.suffix} label={s.label} />
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </TiltHero>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-white/40 font-medium uppercase tracking-[3px]" style={{ fontSize: 9 }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 90, zIndex: 4 }}>
          <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M0 45C240 90 480 0 720 45C960 90 1200 0 1440 45V90H0V45Z" fill="rgba(220,225,255,0.3)" />
            <path d="M0 55C200 10 400 90 720 55C1000 20 1200 90 1440 55V90H0V55Z" fill="rgba(225,230,255,0.6)" />
            <path d="M0 70C360 30 720 90 1080 50C1200 38 1380 75 1440 70V90H0V70Z" fill="#E8ECFF" />
          </svg>
        </div>
      </section>

      {/* Tech marquee strip */}
      {/* <Marquee /> */}

      {/* ══════════════════════════════════════════ SERVICES — 2nd */}
      <section className="relative overflow-hidden"
        style={{ paddingTop: 20, paddingBottom: 100, background: "linear-gradient(160deg,#F0F2FF 0%,#EBEEff 40%,#E8ECFF 100%)" }}>
        <div className="absolute top-0 right-0 w-[420px] h-[320px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right,rgba(99,102,241,0.12),transparent 70%)" }} />

        <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <FadeUp>
            <div className="mb-10">
              <RevealText text="Our Services" className="text-[#0F172A] font-extrabold block" style={{ fontSize: "clamp(28px,3.5vw,42px)", letterSpacing: "-0.5px" }} />
              <p className="text-[#475569] font-medium mt-1" style={{ fontSize: 15 }}>What We Offer</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.08}>
                <TiltCard
                  className="bg-white flex flex-col h-full group cursor-pointer"
                  style={{ borderRadius: 20, boxShadow: "0 4px 20px rgba(15,23,42,0.07)", padding: "28px 24px 24px" }}
                >
                  <SpotlightCard className="flex flex-col h-full" style={{ borderRadius: 16 }}>
                  <div className="flex flex-col h-full">
                  <div className="w-full flex items-center justify-center relative overflow-hidden" style={{ minHeight: 150 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={svc.img} alt={svc.title} className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                      style={{ maxWidth: "100%", maxHeight: 150, width: "auto", height: "auto" }} />
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center rounded-xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{ background: "linear-gradient(135deg,rgba(37,99,255,0.06),rgba(108,60,255,0.06))" }}
                    />
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
                  </div>
                  </SpotlightCard>
                </TiltCard>
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

"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const stats = [
  { value: 10,  suffix: "+", label: "Years of Experience", sub: "Since 2015",             icon: "◈", color: "#C8A96E" },
  { value: 200, suffix: "+", label: "Projects Delivered",  sub: "Across 15+ industries",  icon: "◇", color: "#C8A96E" },
  { value: 98,  suffix: "%", label: "Client Satisfaction", sub: "Long-term partnerships", icon: "△", color: "#C8A96E" },
  { value: 50,  suffix: "+", label: "Expert Engineers",    sub: "Global talent",           icon: "○", color: "#C8A96E" },
];

function useCountUp(target: number, duration = 2000, start = false, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    let timeout: ReturnType<typeof setTimeout>;
    timeout = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [start, target, duration, delay]);
  return count;
}

type Particle = { id: number; x: number; y: number; vx: number; vy: number; life: number; size: number };

function StatCard({
  value, suffix, label, sub, icon, animate, index,
}: (typeof stats)[0] & { animate: boolean; index: number }) {
  const count = useCountUp(value, 2000, animate, index * 150);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clicked, setClicked] = useState(false);
  const particleId = useRef(0);
  const rafRef = useRef<number>(0);

  const spawnParticles = useCallback((cx: number, cy: number, count: number) => {
    const newP: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3;
      return {
        id: particleId.current++,
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: 2 + Math.random() * 3,
      };
    });
    setParticles(prev => [...prev, ...newP]);
  }, []);

  // particle animation loop
  useEffect(() => {
    if (particles.length === 0) return;
    const tick = () => {
      setParticles(prev => {
        const next = prev
          .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.08, life: p.life - 0.03 }))
          .filter(p => p.life > 0);
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [particles.length > 0]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: y * 14, y: -x * 14 });

    // occasionally spawn trail particles
    if (Math.random() < 0.3) {
      spawnParticles(e.clientX - rect.left, e.clientY - rect.top, 1);
    }
  }, [spawnParticles]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true);
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) spawnParticles(e.clientX - rect.left, e.clientY - rect.top, 6);
  }, [spawnParticles]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) spawnParticles(e.clientX - rect.left, e.clientY - rect.top, 18);
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  }, [spawnParticles]);

  const glowSize = hovered ? "0 0 0 1px rgba(200,169,110,0.5), 0 8px 32px rgba(200,169,110,0.2), 0 0 60px rgba(200,169,110,0.08)" : "none";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(255,255,255,0.05) 100%)"
          : "rgba(255,255,255,0.04)",
        border: "1px solid " + (hovered ? "rgba(200,169,110,0.45)" : "rgba(255,255,255,0.08)"),
        borderRadius: 12,
        padding: "24px 22px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? -6 : 0}px) scale(${clicked ? 0.97 : hovered ? 1.03 : 1})`,
        transition: hovered ? "transform 0.08s ease, box-shadow 0.3s ease, background 0.3s ease, border 0.3s ease" : "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: glowSize,
        willChange: "transform",
        userSelect: "none",
      }}
    >
      {/* animated gradient sweep */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(105deg, transparent 40%, rgba(200,169,110,0.08) 50%, transparent 60%)",
        backgroundSize: "200% 100%",
        animation: hovered ? "shimmerSweep 1.4s linear infinite" : "none",
        pointerEvents: "none",
      }} />

      {/* top glow bar */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: 2,
        background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.8), transparent)",
        borderRadius: "0 0 4px 4px",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        filter: "blur(1px)",
      }} />

      {/* corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 40, height: 40,
        background: "radial-gradient(circle at top right, rgba(200,169,110,0.2), transparent 70%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }} />

      {/* particles canvas */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
        {particles.map(p => (
          <circle
            key={p.id}
            cx={p.x} cy={p.y} r={p.size * p.life}
            fill={`rgba(200,169,110,${p.life * 0.9})`}
          />
        ))}
      </svg>

      {/* icon with pulsing ring */}
      <div style={{ position: "relative", display: "inline-block", marginBottom: 12 }}>
        <div style={{
          position: "absolute", inset: -6,
          borderRadius: "50%",
          border: "1px solid rgba(200,169,110,0.4)",
          animation: hovered ? "pulseRing 1.2s ease-out infinite" : "none",
          pointerEvents: "none",
        }} />
        <div style={{
          fontSize: 20, color: "var(--accent)",
          transform: hovered ? "scale(1.3) rotate(15deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          display: "inline-block",
          filter: hovered ? "drop-shadow(0 0 6px rgba(200,169,110,0.8))" : "none",
        }}>
          {icon}
        </div>
      </div>

      {/* number */}
      <div className="font-display" style={{
        fontSize: 36, fontWeight: 700, color: "var(--accent)", lineHeight: 1, marginBottom: 6,
        textShadow: hovered ? "0 0 20px rgba(200,169,110,0.5)" : "none",
        transition: "text-shadow 0.3s ease",
      }}>
        {count}{suffix}
      </div>

      {/* label */}
      <div style={{ fontSize: 12, fontWeight: 600, color: hovered ? "white" : "rgba(255,255,255,0.85)", marginBottom: 4, transition: "color 0.2s" }}>
        {label}
      </div>

      {/* sub */}
      <div style={{ fontSize: 10, color: hovered ? "rgba(200,169,110,0.7)" : "rgba(255,255,255,0.3)", transition: "color 0.3s", letterSpacing: "0.05em" }}>
        {sub}
      </div>

      {/* progress bar */}
      <div style={{ marginTop: 14, height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: animate ? "100%" : "0%",
          background: "linear-gradient(90deg, rgba(200,169,110,0.4), rgba(200,169,110,0.9))",
          borderRadius: 4,
          transition: `width 2s cubic-bezier(0.4,0,0.2,1) ${index * 150}ms`,
          boxShadow: "0 0 6px rgba(200,169,110,0.5)",
        }} />
      </div>

      <style>{`
        @keyframes shimmerSweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function StatCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {stats.map((s, i) => (
        <StatCard key={s.label} {...s} animate={animate} index={i} />
      ))}

      {/* AI-First banner */}
      <div style={{
        gridColumn: "1 / -1",
        background: "linear-gradient(135deg, rgba(200,169,110,0.09), rgba(200,169,110,0.04))",
        border: "1px solid rgba(200,169,110,0.18)",
        borderRadius: 12,
        padding: "18px 22px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 0% 50%, rgba(200,169,110,0.08), transparent 60%)",
          pointerEvents: "none",
        }} />
        <div style={{ fontSize: 26, color: "var(--accent)", animation: "spin 8s linear infinite", display: "inline-block" }}>✦</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "white", marginBottom: 3 }}>AI-First Delivery</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
            Production-grade AI systems for Fintech, Healthcare & enterprise operations — deployed globally.
          </div>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

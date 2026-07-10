"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { STATS, TESTIMONIALS, TRUSTED_LOGOS } from "@/lib/homepageData";
import { SOFT_EASE } from "@/lib/scrollMotion";

function StatItem({ target, suffix, label, sub, icon: Icon, isGlobal }: { target: number; suffix: string; label: string; sub: string; icon: React.ComponentType<{ size?: number; className?: string }>; isGlobal?: boolean }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || isGlobal) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, isGlobal]);

  return (
    <div ref={ref} className="flex items-center gap-3.5">
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

export default function Scene6Record() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#050B3A", paddingTop: 110, paddingBottom: 110 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,rgba(4,12,80,0.98) 0%,rgba(7,27,143,0.90) 42%,rgba(20,50,180,0.45) 66%,rgba(80,40,200,0.06) 100%)" }} />
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: SOFT_EASE }}
          className="max-w-[640px] mb-14"
        >
          <p className="font-semibold uppercase mb-2" style={{ fontSize: 12, letterSpacing: "2.5px", color: "#22d3ee" }}>The Record</p>
          <h2 className="text-white font-bold" style={{ fontSize: "clamp(28px,3.4vw,44px)", letterSpacing: "-1px" }}>
            People who trusted us with the hard parts.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: SOFT_EASE }}
          className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
          style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(10,16,60,0.35)", padding: "28px 32px" }}
        >
          {STATS.map((s) => (
            <StatItem key={s.label} target={s.target} suffix={s.suffix} label={s.label} sub={s.sub} icon={s.icon} isGlobal={s.isGlobal} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: SOFT_EASE }}
              className="relative rounded-2xl p-6 flex flex-col"
              style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.1)", minHeight: 260 }}
            >
              <p className="leading-relaxed flex-1" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="h-px my-4" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="flex items-center gap-3">
                <Image src={t.photo} alt={t.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover" style={{ border: "2px solid rgba(255,255,255,0.15)" }} />
                <div>
                  <p className="font-semibold text-white" style={{ fontSize: 12.5 }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-5 flex-wrap justify-center"
        >
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>Working alongside</span>
          {TRUSTED_LOGOS.map((logo) => (
            <div key={logo.name} className="rounded-lg px-3 py-1.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>{logo.abbr}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

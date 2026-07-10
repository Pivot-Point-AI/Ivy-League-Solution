"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ══ Story beats — each drives one scroll-pinned chapter ══ */
const BEATS = [
  {
    label: "Strategy & Consulting",
    heading: "Re-invent your business with technology",
    desc: "We map a clear technology roadmap, align stakeholders, and turn ambitious goals into a phased plan your teams can actually execute.",
    color: "#3b82f6",
    color2: "#22d3ee",
  },
  {
    label: "AI & Machine Learning",
    heading: "Reimagine with Generative AI",
    desc: "Production-grade AI and LLM systems — from fraud detection to intelligent automation — that deliver measurable impact across your business.",
    color: "#a78bfa",
    color2: "#ec4899",
  },
  {
    label: "Digital Infrastructure",
    heading: "Smarter decisions with cloud engineering",
    desc: "Migrate, modernize, and scale with confidence on AWS, Azure, and Oracle, backed by managed infrastructure that keeps pace with growth.",
    color: "#60a5fa",
    color2: "#22d3ee",
  },
  {
    label: "Cybersecurity & SOC",
    heading: "Protect what matters with Zero Trust",
    desc: "24/7 threat monitoring, incident response, and compliance automation built on Zero Trust architecture, so your business stays resilient.",
    color: "#fb923c",
    color2: "#f43f5e",
  },
  {
    label: "Software Development",
    heading: "Ship with an agile, product-driven culture",
    desc: "Cross-functional teams ship in two-week sprints with full transparency, turning your product vision into working software fast.",
    color: "#34d399",
    color2: "#22d3ee",
  },
];

/* ══ Animated distorted blob that morphs color/shape per scroll progress ══ */
function MorphingBlob({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);
  const colorA = useMemo(() => new THREE.Color(), []);
  const colorB = useMemo(() => new THREE.Color(), []);
  const mixed = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const p = progressRef.current * (BEATS.length - 1);
    const idx = Math.min(BEATS.length - 2, Math.floor(p));
    const t = p - idx;
    const cur = BEATS[idx];
    const next = BEATS[idx + 1] ?? cur;

    colorA.set(cur.color);
    colorB.set(next.color);
    mixed.copy(colorA).lerp(colorB, t);

    if (matRef.current) {
      matRef.current.color = mixed;
      matRef.current.distort = 0.35 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    }

    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.22;
    const scale = 1.6 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          ref={matRef}
          roughness={0.15}
          metalness={0.6}
          speed={2}
          distort={0.35}
          envMapIntensity={0.8}
        />
      </mesh>
    </Float>
  );
}

function Scene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#6c3cff" />
      <MorphingBlob progressRef={progressRef} />
      <Environment preset="city" />
    </>
  );
}

export default function ScrollyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(BEATS.length - 1) * 100}%`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          setProgress(self.progress);
          const idx = Math.min(BEATS.length - 1, Math.round(self.progress * (BEATS.length - 1)));
          setActiveIdx(idx);
        },
      });
      return () => st.kill();
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const beat = BEATS[activeIdx];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100svh" }}
    >
      {/* WebGL scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.8]}>
          <Scene progressRef={progressRef} />
        </Canvas>
      </div>

      {/* Dark gradient overlay for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(100deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.45) 42%,rgba(0,0,0,0.1) 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-8 xl:px-14">
        <div className="max-w-[640px]">
          <span
            className="inline-block font-semibold uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              fontSize: 11.5,
              letterSpacing: "2.2px",
              color: beat.color,
              border: `1px solid ${beat.color}55`,
              background: `${beat.color}12`,
              transition: "color .4s, border-color .4s, background .4s",
            }}
          >
            {beat.label}
          </span>
          <h1
            key={activeIdx}
            className="text-white font-bold"
            style={{
              fontSize: "clamp(30px,4.6vw,58px)",
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
              animation: "scrollyHeroFade 0.5s ease",
            }}
          >
            {beat.heading}
          </h1>
          <p
            key={`d-${activeIdx}`}
            className="mt-5 leading-relaxed"
            style={{
              fontSize: "clamp(14px,1.2vw,16px)",
              color: "rgba(255,255,255,0.68)",
              maxWidth: 480,
              animation: "scrollyHeroFade 0.6s ease",
            }}
          >
            {beat.desc}
          </p>
        </div>
      </div>

      {/* Progress rail */}
      <div className="absolute bottom-8 left-0 right-0 z-10 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1440px] mx-auto flex items-center gap-4">
          <div className="flex-1 h-[2px] rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg,${beat.color},${beat.color2})`,
                transition: "background .4s",
              }}
            />
          </div>
          <span className="text-white/50 font-semibold" style={{ fontSize: 12, letterSpacing: "1px" }}>
            {String(activeIdx + 1).padStart(2, "0")} / {String(BEATS.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Scroll cue on the first beat */}
      {activeIdx === 0 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40" style={{ fontSize: 11 }}>
          <span className="uppercase" style={{ letterSpacing: "2px" }}>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      )}

      <style jsx global>{`
        @keyframes scrollyHeroFade {
          from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
}

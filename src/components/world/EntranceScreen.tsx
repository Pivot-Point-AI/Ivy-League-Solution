"use client";

import { motion } from "framer-motion";
import { SOFT_EASE } from "@/lib/scrollMotion";

export default function EntranceScreen({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center">
      {/* Background video is the shared, persistent <BackgroundVideo> mounted once in
          WorldExperience — this screen only lays gradients and copy on top of it. */}


      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ maxWidth: 900 }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: SOFT_EASE }}
          className="uppercase font-extrabold mb-4"
          style={{ fontSize: 20, letterSpacing: "4px", color: "#ffffff", textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}
        >
          Welcome to
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.35, ease: SOFT_EASE }}
          className="text-white font-bold whitespace-normal sm:whitespace-nowrap"
          style={{
            fontSize: "clamp(28px,8vw,68px)",
            letterSpacing: "-2px",
            lineHeight: 1.08,
            textShadow: "0 4px 24px rgba(0,0,0,0.75)",
            perspective: 800,
          }}
        >
          <motion.span
            initial={{ opacity: 0, rotateX: 0, rotateY: 0, scale: 1 }}
            animate={{ opacity: 1 }}
            whileHover={{
              rotateX: 12,
              rotateY: -14,
              scale: 1.05,
              transition: { type: "spring", stiffness: 220, damping: 14 },
            }}
            transition={{ opacity: { duration: 0.6, delay: 0.6 } }}
            style={{
              display: "inline-block",
              background: "linear-gradient(180deg,#f4d99b 0%,#d4af6a 45%,#b8863f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transformStyle: "preserve-3d",
              cursor: "default",
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.6))",
              textShadow: `
                0 1px 0 rgba(255,255,255,0.35),
                0 3px 10px rgba(180,140,60,0.55),
                0 8px 20px rgba(0,0,0,0.5)
              `,
            }}
          >
            Ivy League
          </motion.span>{" "}
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotateX: -8,
              rotateY: 10,
              transition: { type: "spring", stiffness: 220, damping: 14 },
            }}
            style={{ display: "inline-block", transformStyle: "preserve-3d", cursor: "default" }}
          >
            Solutions
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: SOFT_EASE }}
          className="mt-7 font-semibold"
          style={{ fontSize: "clamp(16px,1.4vw,19px)", color: "#ffffff", lineHeight: 1.6, maxWidth: 560, textShadow: "0 2px 14px rgba(0,0,0,0.75)" }}
        >
          Software, AI, infrastructure, and security engineered as one system for enterprises that can&apos;t afford to get it wrong.
        </motion.p>

        <motion.button
          onClick={onExplore}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: SOFT_EASE }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 flex items-center gap-4 rounded-full font-bold text-black"
          style={{
            padding: "10px 10px 10px 24px",
            background: "rgba(235,235,238,0.88)",
            border: "1px solid rgba(255,255,255,0.5)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            cursor: "pointer",
            fontSize: 17,
          }}
        >
          Tap to Explore
          <span
            className="flex items-center justify-center"
            style={{ width: 44, height: 44, borderRadius: 12, background: "#22d3ee" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#050814" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1.5 px-6 text-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5">
          {["Privacy Rights & Requests", "Legal", "Data Policy", "Code of Conduct", "Suppliers", "Your Privacy Choices"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-white/55 hover:text-white transition-colors font-medium"
              style={{ fontSize: 12 }}
            >
              {label}
            </a>
          ))}
        </div>
        <span className="text-white/35 font-medium mt-1" style={{ fontSize: 11.5 }}>
          © 2026 Ivy League Solutions. All Rights Reserved
        </span>
      </motion.div>
    </div>
  );
}

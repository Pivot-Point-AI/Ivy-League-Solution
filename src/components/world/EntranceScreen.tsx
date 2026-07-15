"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SOFT_EASE } from "@/lib/scrollMotion";
import ScrollIndicator from "./ScrollIndicator";

const SCROLL_THRESHOLD = 60;

export default function EntranceScreen({ onExplore }: { onExplore: () => void }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const accumulatedRef = useRef(0);
  const advancedRef = useRef(false);

  /* Scrolling down on the entrance screen advances straight into the hub, mirroring
     the scroll-to-navigate behavior used between topic pages further into the site. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0 || advancedRef.current) return;
      e.preventDefault();

      accumulatedRef.current += e.deltaY;
      if (accumulatedRef.current < SCROLL_THRESHOLD) return;

      advancedRef.current = true;
      onExplore();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onExplore]);

  return (
    <div ref={rootRef} className="relative w-full min-h-[100svh] flex items-center justify-center">
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
          className="mt-7 font-bold"
          style={{
            fontSize: "clamp(16px,1.4vw,19px)",
            color: "#ffffff",
            lineHeight: 1.75,
            maxWidth: 620,
            textShadow: "0 2px 14px rgba(0,0,0,0.85)",
          }}
        >
          Software, AI, infrastructure, and security engineered as one system for enterprises that can&apos;t afford to get it wrong.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68, ease: SOFT_EASE }}
          className="inline-flex items-center gap-2.5 mt-7 rounded-full"
          style={{ padding: "10px 22px", background: "rgba(2,5,16,0.55)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(10px)", boxShadow: "0 8px 24px -10px rgba(0,0,0,0.6)" }}
        >
          <span className="flex items-center justify-center rounded-full" style={{ width: 8, height: 8, background: "#22d3ee", boxShadow: "0 0 10px #22d3ee" }} />
          <span className="uppercase font-bold" style={{ fontSize: 13, letterSpacing: "1.2px", color: "#ffffff", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
            Trusted by 50+ enterprises
          </span>
          <span className="hidden sm:inline" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>•</span>
          <span className="hidden sm:inline font-semibold" style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
            200+ projects delivered
          </span>
        </motion.div>

        <motion.button
          onClick={onExplore}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: SOFT_EASE }}
          whileHover={{ scale: 1.025, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 flex items-center gap-5 rounded-full font-bold"
          style={{
            padding: "8px 8px 8px 28px",
            color: "#0B1220",
            background: "linear-gradient(180deg,#ffffff 0%,#eef0f5 100%)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 14px 34px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            cursor: "pointer",
            fontSize: 16.5,
            letterSpacing: "-0.2px",
          }}
        >
          Explore Enterprise Solutions
          <span
            className="flex items-center justify-center"
            style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg,#1c2333,#0B1220)", boxShadow: "0 6px 16px -4px rgba(0,0,0,0.5)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f4d99b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </motion.button>

        <motion.button
          onClick={() => setDemoOpen(true)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: SOFT_EASE }}
          whileHover={{ gap: 8 }}
          className="mt-5 flex items-center gap-2 font-semibold"
          style={{
            fontSize: 14,
            color: "#ffffff",
            letterSpacing: "0.01em",
            paddingBottom: 2,
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "1px solid rgba(255,255,255,0.35)",
            textShadow: "0 1px 10px rgba(0,0,0,0.85)",
            background: "none",
            cursor: "pointer",
          }}
        >
          Or book a 15-minute demo
          <motion.svg
            width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </motion.svg>
        </motion.button>
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      <ScrollIndicator onClick={onExplore} />

      <div
        className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none"
        style={{ height: 140, background: "linear-gradient(180deg, transparent 0%, rgba(2,5,16,0.55) 55%, rgba(2,5,16,0.8) 100%)" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-2 px-6 text-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5">
          {[
            { label: "About", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms of Service", href: "/terms-of-service" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white hover:text-[#22d3ee] transition-colors font-semibold"
              style={{ fontSize: 12.5, textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
            >
              {label}
            </a>
          ))}
        </div>
        <span className="text-white/70 font-semibold mt-1" style={{ fontSize: 12, textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>
          © 2026 Ivy League Solutions. All Rights Reserved
        </span>
      </motion.div>
    </div>
  );
}

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const setField = (k: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          service: "Demo Request",
          message: `Role: ${form.role || "N/A"}\n\nRequested a 15-minute demo from the site entrance.`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(2,5,16,0.7)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: SOFT_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ maxWidth: 420, background: "#0a0e1f", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div style={{ height: 3, background: "linear-gradient(90deg,#22d3ee,#7c3aed)" }} />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute flex items-center justify-center rounded-full"
              style={{ top: 14, right: 14, width: 30, height: 30, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.75)", cursor: "pointer", fontSize: 15, lineHeight: 1 }}
            >
              ✕
            </button>
            <div className="p-7">

              {status === "success" ? (
                <div className="text-center py-6">
                  <p className="text-white font-bold" style={{ fontSize: 19 }}>Thanks — you&apos;re booked in.</p>
                  <p className="mt-2" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                    A representative will reach out within 2 business days to schedule your 15-minute demo.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 font-semibold rounded-full"
                    style={{ fontSize: 13.5, padding: "10px 22px", color: "#050814", background: "#22d3ee", border: "none", cursor: "pointer" }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-white font-bold" style={{ fontSize: 19 }}>Book a 15-minute demo</p>
                  <p className="mt-1.5" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)" }}>
                    Tell us a bit about you and we&apos;ll set up time with a solutions engineer.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
                    <input
                      required
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setField("name")(e.target.value)}
                      className="outline-none"
                      style={{ fontSize: 14, padding: "11px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff" }}
                    />
                    <input
                      required
                      type="email"
                      placeholder="Work email"
                      value={form.email}
                      onChange={(e) => setField("email")(e.target.value)}
                      className="outline-none"
                      style={{ fontSize: 14, padding: "11px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff" }}
                    />
                    <input
                      required
                      placeholder="Company"
                      value={form.company}
                      onChange={(e) => setField("company")(e.target.value)}
                      className="outline-none"
                      style={{ fontSize: 14, padding: "11px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff" }}
                    />
                    <input
                      placeholder="Role (optional)"
                      value={form.role}
                      onChange={(e) => setField("role")(e.target.value)}
                      className="outline-none"
                      style={{ fontSize: 14, padding: "11px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff" }}
                    />

                    {status === "error" && (
                      <p style={{ fontSize: 12.5, color: "#f87171" }}>Something went wrong — please try again.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-2 font-semibold rounded-full"
                      style={{ fontSize: 14.5, padding: "12px 22px", color: "#050814", background: "#22d3ee", border: "none", cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}
                    >
                      {status === "loading" ? "Booking…" : "Book my demo"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

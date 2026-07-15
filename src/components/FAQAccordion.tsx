"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export type FAQItem = { q: string; a: string };

const THEMES = {
  light: {
    card: "#ffffff",
    cardBorder: "#EEF1F6",
    cardBorderOpen: "#22d3ee",
    shadow: "0 2px 16px rgba(15,23,42,0.06)",
    shadowHover: "0 16px 40px rgba(15,23,42,0.10)",
    question: "#0F172A",
    answer: "#64748B",
    iconBg: "#EEF2FF",
    iconBgOpen: "#22d3ee",
    iconStroke: "#22d3ee",
    iconStrokeOpen: "#ffffff",
    divider: "#F1F5F9",
  },
  gray: {
    card: "#ffffff",
    cardBorder: "#EEF1F6",
    cardBorderOpen: "#22d3ee",
    shadow: "0 2px 14px rgba(15,23,42,0.05)",
    shadowHover: "0 16px 40px rgba(15,23,42,0.09)",
    question: "#0F172A",
    answer: "#64748B",
    iconBg: "#EEF2FF",
    iconBgOpen: "#22d3ee",
    iconStroke: "#22d3ee",
    iconStrokeOpen: "#ffffff",
    divider: "#F1F5F9",
  },
  dark: {
    card: "rgba(255,255,255,0.035)",
    cardBorder: "rgba(255,255,255,0.09)",
    cardBorderOpen: "#22d3ee",
    shadow: "0 2px 16px rgba(0,0,0,0.2)",
    shadowHover: "0 16px 40px rgba(0,0,0,0.35)",
    question: "#ffffff",
    answer: "rgba(255,255,255,0.58)",
    iconBg: "rgba(34,211,238,0.14)",
    iconBgOpen: "#22d3ee",
    iconStroke: "#22d3ee",
    iconStrokeOpen: "#050814",
    divider: "rgba(255,255,255,0.08)",
  },
} as const;

function AccordionItem({
  q,
  a,
  delay,
  theme,
}: {
  q: string;
  a: string;
  delay: number;
  theme: (typeof THEMES)[keyof typeof THEMES];
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: theme.card,
        borderRadius: 18,
        border: `1.5px solid ${open ? theme.cardBorderOpen : theme.cardBorder}`,
        overflow: "hidden",
        boxShadow: open || hover ? theme.shadowHover : theme.shadow,
        transform: hover && !open ? "translateY(-2px)" : "translateY(0)",
        transition: "border-color 0.25s ease, box-shadow 0.3s ease, transform 0.25s ease",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left"
        style={{ padding: "24px 28px", background: "none", border: "none", cursor: "pointer", gap: 20 }}
        aria-expanded={open}
      >
        <span
          className="font-bold"
          style={{ fontSize: 16, color: theme.question, lineHeight: 1.45, letterSpacing: "-0.1px" }}
        >
          {q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: open ? theme.iconBgOpen : theme.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: open ? "0 4px 14px rgba(34,211,238,0.4)" : "none",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? theme.iconStrokeOpen : theme.iconStroke}
            strokeWidth="2.6"
            strokeLinecap="round"
            style={{ transform: open ? "rotate(135deg)" : "rotate(0deg)", transition: "transform 0.3s ease, stroke 0.3s ease" }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.32s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 28px 26px", borderTop: `1px solid ${theme.divider}`, marginTop: -1 }}>
            <p style={{ paddingTop: 18, fontSize: 14.5, color: theme.answer, lineHeight: 1.75, margin: 0, maxWidth: 640 }}>
              {a}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQAccordion({
  items,
  variant = "light",
}: {
  items: FAQItem[];
  variant?: keyof typeof THEMES;
}) {
  const theme = THEMES[variant];
  return (
    <div className="flex flex-col gap-4">
      {items.map((f, i) => (
        <AccordionItem key={f.q} q={f.q} a={f.a} delay={i * 0.05} theme={theme} />
      ))}
    </div>
  );
}

export function FAQSectionBlock({
  eyebrow = "FAQ",
  title,
  subtitle,
  items,
  variant = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  items: FAQItem[];
  variant?: keyof typeof THEMES;
}) {
  const isDark = variant === "dark";
  return (
    <>
      <div className="text-center mb-14">
        <p
          className="font-extrabold uppercase mb-4"
          style={{
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "3px",
            background: "linear-gradient(90deg,#0891b2,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {eyebrow}
        </p>
        <h2
          className="font-extrabold"
          style={{
            fontSize: "clamp(34px,4.2vw,48px)",
            fontWeight: 800,
            letterSpacing: "-1.2px",
            lineHeight: 1.15,
            color: isDark ? "#ffffff" : "#0F172A",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mx-auto mt-4"
            style={{
              fontSize: 15.5,
              lineHeight: 1.6,
              maxWidth: 540,
              color: isDark ? "rgba(255,255,255,0.55)" : "#64748B",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <FAQAccordion items={items} variant={variant} />
    </>
  );
}

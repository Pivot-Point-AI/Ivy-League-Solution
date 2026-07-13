"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Topic } from "@/lib/worldTopics";
import { SOFT_EASE } from "@/lib/scrollMotion";

const SWIPE_THRESHOLD = 60;

export default function TopicPage({
  topic,
  direction,
  isFirst,
  isLast,
  onNext,
  onPrev,
  videoRef,
}: {
  topic: Topic;
  direction: number;
  isFirst: boolean;
  isLast: boolean;
  onNext: () => void;
  onPrev: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const accumulatedRef = useRef(0);
  const busyRef = useRef(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const touchStartX = useRef(0);

  /* Autoplays and keeps running on arrival — scrolling still nudges currentTime forward
     (see the wheel handler below) on top of the free-running loop. */
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [videoRef, topic.slug]);

  /* Leftover trackpad/mouse-wheel momentum from the gesture that navigated here keeps
     firing wheel events for a bit after mount — without this grace window that momentum
     gets read as a fresh scroll and immediately advances again. busyRef starts true and
     only releases once the incoming scroll has had time to decay. */
  useEffect(() => {
    const t = setTimeout(() => (busyRef.current = false), 500);
    return () => clearTimeout(t);
  }, [topic.slug]);

  /* React's onWheel is registered as a passive listener, so preventDefault() inside it
     is silently ignored and the page scrolls regardless — a native, non-passive listener
     is required to actually intercept the scroll and drive the topic switcher instead.
     Every event in-bounds is captured (not just ones past SWIPE_THRESHOLD) and its delta
     accumulated, otherwise small trackpad ticks under the threshold leak through as real
     page scroll before ever triggering a topic change. */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      if (delta > 0 && isLast) return;
      if (delta < 0 && isFirst) return;

      e.preventDefault();
      if (busyRef.current) return;

      accumulatedRef.current += delta;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => (accumulatedRef.current = 0), 250);

      if (Math.abs(accumulatedRef.current) < SWIPE_THRESHOLD) return;
      busyRef.current = true;
      accumulatedRef.current = 0;

      /* Each scroll that actually triggers a change jumps the shared video forward
         (or back) by a flat 4 seconds, wrapping around the clip's duration instead of
         clamping — clamping meant short clips ran out of runway after a couple of
         scrolls and every scroll after that landed on the same capped end frame. */
      const v = videoRef.current;
      if (v && v.duration) {
        v.currentTime = ((v.currentTime + (delta > 0 ? 4 : -4)) % v.duration + v.duration) % v.duration;
      }

      if (delta > 0) onNext();
      else onPrev();
      window.setTimeout(() => (busyRef.current = false), 250);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isFirst, isLast, onNext, onPrev, videoRef]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -SWIPE_THRESHOLD && !isLast) onNext();
    else if (dx > SWIPE_THRESHOLD && !isFirst) onPrev();
  };

  return (
    <motion.div
      key={topic.slug}
      custom={direction}
      initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
      transition={{ duration: 0.45, ease: SOFT_EASE }}
      className="relative w-full min-h-[100svh]"
    >
      <div
        ref={headerRef}
        className="relative w-full"
        style={{ height: "100svh" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background video is the shared, persistent <BackgroundVideo> mounted once in
            WorldExperience — it never unmounts here, so scrolling between topics keeps
            it advancing forward instead of restarting on every mount. */}
        <Image src={topic.image} alt={topic.title} fill sizes="100vw" className="object-cover opacity-0" priority />
        {/* Layered scrim: a left-to-right darken so the text block always sits on a dark
            base regardless of what's playing behind it, plus the usual top/bottom fade —
            strong enough to keep text readable over a moving video, not just a static image. */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.22) 68%, rgba(0,0,0,0.05) 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 28%, transparent 55%, rgba(0,0,0,0.7) 100%)` }} />
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-14 pointer-events-none">
          <div className="flex gap-2 mb-5">
            {topic.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full font-bold uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  padding: "6px 14px",
                  color: "#ffffff",
                  background: `${topic.from}55`,
                  border: `1.5px solid ${topic.from}`,
                  backdropFilter: "blur(6px)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: SOFT_EASE }}
            className="text-white font-bold"
            style={{
              fontSize: "clamp(32px,5.5vw,64px)",
              letterSpacing: "-2px",
              lineHeight: 1.04,
              textTransform: "uppercase",
              maxWidth: 900,
              textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 8px 30px rgba(0,0,0,0.75)",
            }}
          >
            {topic.title}
          </motion.h1>

          <div className="flex flex-col mt-5 gap-3" style={{ maxWidth: 640 }}>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: SOFT_EASE }}
              className="font-medium"
              style={{ fontSize: "clamp(18px,1.8vw,24px)", color: "#ffffff", textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 6px 20px rgba(0,0,0,0.7)" }}
            >
              {topic.headline}
            </motion.p>

            {topic.body[0] && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: SOFT_EASE }}
                style={{ fontSize: "clamp(15px,1.3vw,18px)", color: "rgba(255,255,255,0.92)", lineHeight: 1.65, textShadow: "0 2px 5px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.65)" }}
              >
                {topic.body[0]}
              </motion.p>
            )}
          </div>

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: SOFT_EASE }}
            className="mt-10 text-white uppercase font-semibold flex items-center gap-2.5"
            style={{ fontSize: 12.5, letterSpacing: "2.5px", textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 4px 14px rgba(0,0,0,0.6)" }}
          >
            Scroll to Explore
            {isLast ? (
              <motion.svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </motion.svg>
            ) : (
              <motion.svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            )}
          </motion.span>
        </div>
      </div>

      {/* On the last topic, the per-topic detail sections are replaced by a short
          narrative bridge — it keeps the cinematic, dark storytelling tone going for one
          more beat instead of cutting straight from the full-bleed video hero into the
          site's plain white closing sections (WhyChooseUs/Contact/Footer, rendered after
          this component). */}
      {isLast ? (
        <div className="relative overflow-hidden">
          <Image src="/eg.webp" alt="" fill sizes="100vw" className="object-cover" priority aria-hidden />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(238,240,255,0.97) 0%, rgba(238,240,255,0.9) 42%, rgba(238,240,255,0.35) 68%, rgba(238,240,255,0.08) 100%)" }} />

          <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32">
            <div className="max-w-[560px]">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: SOFT_EASE }}
                className="inline-flex items-center gap-1.5 rounded-full font-bold uppercase"
                style={{ fontSize: 11.5, letterSpacing: "0.05em", padding: "7px 16px", color: topic.from, background: `${topic.from}14`, border: `1px solid ${topic.from}33` }}
              >
                ✦ The story so far
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: SOFT_EASE }}
                className="text-[#0F172A] font-bold mt-5"
                style={{ fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-1.5px", lineHeight: 1.15, maxWidth: 560 }}
              >
                Six disciplines. One accountable team.{" "}
                <span
                  style={{
                    background: `linear-gradient(90deg, ${topic.from}, ${topic.to})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Every system already built.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.22, ease: SOFT_EASE }}
                className="mt-5"
                style={{ fontSize: "clamp(14.5px,1.2vw,17px)", color: "#64748B", maxWidth: 480, lineHeight: 1.6 }}
              >
                Here&apos;s what it looks like when we put it into practice.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.32, ease: SOFT_EASE }}
                className="flex flex-wrap items-center gap-4 mt-9"
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 font-semibold text-white rounded-full"
                  style={{ fontSize: 14.5, padding: "13px 24px", background: `linear-gradient(135deg, ${topic.from}, ${topic.to})`, boxShadow: `0 10px 28px -10px ${topic.from}99` }}
                >
                  Schedule a 15-Minute Consult
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </motion.a>
                <a
                  href="/about"
                  className="font-semibold underline underline-offset-4"
                  style={{ fontSize: 13.5, color: "#64748B" }}
                >
                  View our approach
                </a>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.42, ease: SOFT_EASE }}
                className="mt-12 uppercase font-semibold flex items-center gap-2.5"
                style={{ fontSize: 11.5, letterSpacing: "2.5px", color: "#94A3B8" }}
              >
                <motion.svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </motion.svg>
                Scroll to explore
              </motion.span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative py-16 px-6 sm:px-10 lg:px-14" style={{ background: "#050B3A" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: SOFT_EASE }}
              className="max-w-[420px] rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p className="font-extrabold text-white" style={{ fontSize: "clamp(30px,4vw,44px)" }}>
                {topic.stat.value}
              </p>
              <p className="mt-2 font-semibold" style={{ fontSize: 14, color: topic.from }}>{topic.stat.label}</p>
              <p className="mt-1" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>{topic.stat.sub}</p>
            </motion.div>
          </div>

          <div className="relative max-w-[860px] mx-auto px-6 sm:px-10 py-20">
            {topic.body.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: SOFT_EASE }}
                className="leading-relaxed"
                style={{ fontSize: "clamp(15px,1.3vw,18px)", color: "rgba(255,255,255,0.65)", marginBottom: 24 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

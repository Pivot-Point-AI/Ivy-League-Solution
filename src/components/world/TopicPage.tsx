"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Topic, TOPICS } from "@/lib/worldTopics";
import { STATS } from "@/lib/homepageData";
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
  const stat = STATS[TOPICS.findIndex((t) => t.slug === topic.slug) % STATS.length];
  const headerRef = useRef<HTMLDivElement>(null);
  const accumulatedRef = useRef(0);
  const busyRef = useRef(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const touchStartX = useRef(0);

  /* Paused by default on arrival — scrolling is what scrubs it forward (see the wheel
     handler below), it doesn't free-run on its own. */
  useEffect(() => {
    videoRef.current?.pause();
  }, [videoRef]);

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
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 30%, rgba(0,0,0,0.6) 100%)` }} />
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
                  background: `${topic.from}40`,
                  border: `1.5px solid ${topic.from}`,
                  backdropFilter: "blur(6px)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
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
            style={{ fontSize: "clamp(32px,5.5vw,64px)", letterSpacing: "-2px", lineHeight: 1.04, textTransform: "uppercase", maxWidth: 900 }}
          >
            {topic.title}
          </motion.h1>

          <div className="flex flex-col mt-5 gap-3" style={{ maxWidth: 640 }}>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: SOFT_EASE }}
              className="font-medium"
              style={{ fontSize: "clamp(18px,1.8vw,24px)", color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            >
              {topic.headline}
            </motion.p>

            {topic.body[0] && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: SOFT_EASE }}
                style={{ fontSize: "clamp(15px,1.3vw,18px)", color: "rgba(255,255,255,0.88)", lineHeight: 1.65, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
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
            style={{ fontSize: 12.5, letterSpacing: "2.5px" }}
          >
            Scroll to Explore
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.span>
        </div>
      </div>

      {/* Vertical reveal and body copy are skipped on the last topic — its own supporting
          detail isn't needed since scrolling past the header should reach the closing
          sections (WhyChooseUs/Contact/Footer, rendered after this component) right away,
          not be padded out with more per-topic content first. */}
      {!isLast && (
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
                {stat.isGlobal ? "Global" : `${stat.target}${stat.suffix}`}
              </p>
              <p className="mt-2 font-semibold" style={{ fontSize: 14, color: topic.from }}>{stat.label}</p>
              <p className="mt-1" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>{stat.sub}</p>
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

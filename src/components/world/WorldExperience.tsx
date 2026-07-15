"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import EntranceScreen from "./EntranceScreen";
import BackgroundVideo from "./BackgroundVideo";
import WorldNav from "./WorldNav";
import TopicsPanel from "./TopicsPanel";
import TopicPage from "./TopicPage";
import HubView from "./HubView";
import ScrollIndicator from "./ScrollIndicator";
import LandingPage from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import GetInTouch from "@/components/Contact";
import { SharedFooter } from "@/components/SharedNav";
import { TOPICS } from "@/lib/worldTopics";

type View = "entrance" | "hub" | string;

export default function WorldExperience() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<View>("entrance");
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Deep-links from other pages' nav ("/?topic=<slug>") jump straight into that topic
     instead of always starting at the entrance screen. */
  useEffect(() => {
    const requested = searchParams.get("topic");
    if (requested && TOPICS.some((t) => t.slug === requested)) {
      setView(requested);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeIndex = TOPICS.findIndex((t) => t.slug === view);
  const activeTopic = activeIndex >= 0 ? TOPICS[activeIndex] : undefined;

  /* "The Record" and "The Standard" are proof/approach pages, not service offerings —
     they shouldn't be counted or labeled as part of "What We Do" alongside the four
     actual services (tagged "Business"). */
  const serviceTopics = TOPICS.filter((t) => t.tags.includes("Business"));
  const sectionLabel = !activeTopic
    ? ""
    : activeTopic.tags.includes("Business")
    ? "What We Do"
    : activeTopic.tags.includes("Proof")
    ? "Track Record"
    : activeTopic.tags.includes("Approach")
    ? "The Method"
    : "";
  const sectionIndex = activeTopic?.tags.includes("Business") ? serviceTopics.findIndex((t) => t.slug === activeTopic.slug) : 0;
  const sectionTotal = activeTopic?.tags.includes("Business") ? serviceTopics.length : 0;

  const goTo = (slug: string, dir: number) => {
    setDirection(dir);
    setView(slug);
  };

  /* Autoplays on every screen — entrance, hub, and every topic page — so the background
     video is always running. Topic pages additionally nudge currentTime forward on each
     scroll tick (see TopicPage) on top of the free-running loop. */
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [view]);

  const videoSrc = activeTopic ? activeTopic.video : "/videos/videos.mp4";

  return (
    <div className="relative w-full bg-black">
      <BackgroundVideo ref={videoRef} src={videoSrc} />
      {view === "entrance" ? (
        <EntranceScreen
          onExplore={() => {
            const v = videoRef.current;
            if (v) v.currentTime += 2;
            v?.play().catch(() => {});
            setView("hub");
          }}
        />
      ) : (
        <>
          <WorldNav
            onToggleTopics={() => setTopicsOpen((o) => !o)}
            topicsOpen={topicsOpen}
            onLogoClick={() => setView("entrance")}
          />

          <TopicsPanel
            open={topicsOpen}
            onClose={() => setTopicsOpen(false)}
            onSelect={(slug) => {
              goTo(slug, 1);
              setTopicsOpen(false);
            }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            {view === "hub" ? (
              <HubView
                key="hub"
                onSelectTopic={(slug) => goTo(slug, 1)}
                onAdvance={() => goTo(TOPICS[0].slug, 1)}
              />
            ) : activeTopic ? (
              <TopicPage
                key={activeTopic.slug}
                topic={activeTopic}
                sectionLabel={sectionLabel}
                sectionIndex={sectionIndex}
                sectionTotal={sectionTotal}
                direction={direction}
                isFirst={false}
                isLast={activeIndex === TOPICS.length - 1}
                onNext={() => activeIndex < TOPICS.length - 1 && goTo(TOPICS[activeIndex + 1].slug, 1)}
                onPrev={() => (activeIndex > 0 ? goTo(TOPICS[activeIndex - 1].slug, -1) : goTo("hub", -1))}
                videoRef={videoRef}
              />
            ) : null}
          </AnimatePresence>

          {/* Rendered here rather than inside TopicPage's own animated wrapper — that
              wrapper's Framer Motion `x` transform creates a new CSS containing block,
              which would turn this "fixed" indicator into one positioned relative to the
              (much taller) sliding page instead of the viewport. */}
          {activeTopic && !topicsOpen && (
            <ScrollIndicator
              onClick={activeIndex < TOPICS.length - 1 ? () => goTo(TOPICS[activeIndex + 1].slug, 1) : undefined}
              dir={activeIndex === TOPICS.length - 1 ? "down" : "right"}
            />
          )}

          {/* Only appended after the very last topic — scrolling past its own content
              continues into the site's standard closing sections instead of stopping. */}
          {activeTopic && activeIndex === TOPICS.length - 1 && !topicsOpen && (
            <div className="relative bg-white">
              <LandingPage />
              <WhyChooseUs />
              <GetInTouch />
              <SharedFooter />
            </div>
          )}
        </>
      )}
    </div>
  );
}

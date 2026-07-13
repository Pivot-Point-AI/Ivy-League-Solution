"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import EntranceScreen from "./EntranceScreen";
import BackgroundVideo from "./BackgroundVideo";
import WorldNav from "./WorldNav";
import TopicsPanel from "./TopicsPanel";
import TopicPage from "./TopicPage";
import HubView from "./HubView";
import LandingPage from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import GetInTouch from "@/components/Contact";
import { SharedFooter } from "@/components/SharedNav";
import { TOPICS } from "@/lib/worldTopics";

type View = "entrance" | "hub" | string;

export default function WorldExperience() {
  const [view, setView] = useState<View>("entrance");
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeIndex = TOPICS.findIndex((t) => t.slug === view);
  const activeTopic = activeIndex >= 0 ? TOPICS[activeIndex] : undefined;

  const goTo = (slug: string, dir: number) => {
    setDirection(dir);
    setView(slug);
  };

  /* Autoplays on the entrance screen and on every topic page so their videos are always
     running. The hub is the one screen that stays paused by default and only plays on
     hover (see hoverPlay/hoverPause below) — topic pages additionally nudge currentTime
     forward on each scroll tick (see TopicPage) on top of the free-running loop. */
  useEffect(() => {
    if (view === "hub") videoRef.current?.pause();
    else videoRef.current?.play().catch(() => {});
  }, [view]);

  const hoverPlay = () => videoRef.current?.play().catch(() => {});
  const hoverPause = () => videoRef.current?.pause();

  const isSingleScreen = view === "entrance" || view === "hub";
  const videoSrc = activeTopic ? activeTopic.video : "/videos/videos.mp4";

  return (
    <div className={`relative w-full bg-black ${isSingleScreen ? "h-[100svh] overflow-hidden" : ""}`}>
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
            showBack={!!activeTopic}
            onBack={() => setView("hub")}
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
            {activeTopic ? (
              <TopicPage
                key={activeTopic.slug}
                topic={activeTopic}
                direction={direction}
                isFirst={activeIndex === 0}
                isLast={activeIndex === TOPICS.length - 1}
                onNext={() => activeIndex < TOPICS.length - 1 && goTo(TOPICS[activeIndex + 1].slug, 1)}
                onPrev={() => activeIndex > 0 && goTo(TOPICS[activeIndex - 1].slug, -1)}
                videoRef={videoRef}
              />
            ) : (
              <HubView
                key="hub"
                onSelectTopic={(slug) => goTo(slug, 1)}
                onOpenAllTopics={() => setTopicsOpen(true)}
                onHoverStart={hoverPlay}
                onHoverEnd={hoverPause}
              />
            )}
          </AnimatePresence>

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

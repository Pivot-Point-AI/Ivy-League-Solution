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

  /* Autoplays on the entrance screen so the video is already moving when visitors land.
     Everywhere else it's paused by default — the hub only plays it on hover, and topic
     pages leave it paused too, but nudge currentTime forward on each scroll tick (see
     TopicPage) so scrolling scrubs the same never-unmounted video ahead instead of it
     free-running or restarting. */
  useEffect(() => {
    if (view === "entrance") videoRef.current?.play().catch(() => {});
    else videoRef.current?.pause();
  }, [view]);

  const hoverPlay = () => videoRef.current?.play().catch(() => {});
  const hoverPause = () => videoRef.current?.pause();

  const isSingleScreen = view === "entrance" || view === "hub";

  return (
    <div className={`relative w-full bg-black ${isSingleScreen ? "h-[100svh] overflow-hidden" : ""}`}>
      <BackgroundVideo ref={videoRef} />
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

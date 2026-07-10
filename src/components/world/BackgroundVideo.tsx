"use client";

import { forwardRef } from "react";

/* One persistent video layer shared across the entrance, hub, and every topic page —
   it never unmounts on navigation, so playback keeps advancing forward through the
   whole journey instead of each screen restarting its own copy from frame zero.
   Starts paused; the entrance screen's "Tap to Explore" click is what starts it,
   after which it just keeps running forward underneath every subsequent screen. */
const BackgroundVideo = forwardRef<HTMLVideoElement>((_props, ref) => {
  return (
    <video
      ref={ref}
      className="fixed inset-0 w-full h-full object-cover object-center z-0"
      muted
      loop
      playsInline
      preload="auto"
    >
       <source src="/videos/video5.mp4" type="video/webm" />
      <source src="/videos/video5.mp4" type="video/mp4" />
   </video>
  );
});

BackgroundVideo.displayName = "BackgroundVideo";

export default BackgroundVideo;

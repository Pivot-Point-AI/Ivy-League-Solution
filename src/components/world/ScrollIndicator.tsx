"use client";

import { motion } from "framer-motion";

/* Single fixed-position scroll cue reused on every full-viewport screen — entrance, hub,
   who-we-serve, and every topic page — so it always sits in the exact same spot instead
   of each screen positioning/styling its own version. */
export default function ScrollIndicator({
  onClick,
  dir = "right",
}: {
  onClick?: () => void;
  dir?: "right" | "down";
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="fixed z-20 right-6 sm:right-10 lg:right-16 bottom-10"
    >
      <button
        onClick={onClick}
        className="flex items-center gap-2.5 uppercase font-semibold"
        style={{
          fontSize: 12.5,
          letterSpacing: "2.5px",
          color: "#ffffff",
          background: "none",
          border: "none",
          cursor: onClick ? "pointer" : "default",
          textShadow: "0 1px 8px rgba(0,0,0,0.6)",
        }}
      >
        Scroll to Explore
        {dir === "down" ? (
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
            <path d="M5 12h14M13 6l6 6-6 6" />
          </motion.svg>
        )}
      </button>
    </motion.div>
  );
}

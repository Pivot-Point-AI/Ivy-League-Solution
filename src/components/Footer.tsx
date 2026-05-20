"use client";

import Link from "next/link";

const font = "'Aeonik','DM Sans','Inter',system-ui,sans-serif";

const footerLinks = [
  { label: "Portfolio",    href: "/solutions" },
  { label: "Services",     href: "/services"  },
  { label: "AI Solutions", href: "/ai"        },
  { label: "Products",     href: "/products"  },
];

export default function Footer() {
  return (
    <footer style={{ position:"relative", background:"#050505", overflow:"hidden", minHeight:"clamp(440px,47.3vw,908px)" }}>

      {/* ── GREEN GLOWS (replicate AI background image) ────────────────
          Reference: two organic green light arcs —
          one large orb top-center-left, one sweeping arc top-right.
      ── */}

      {/* Glow 1 — large circular halo, upper-left/center */}
      <div style={{
        position:   "absolute",
        left:       "10%",
        top:        "-20%",
        width:      "600px",
        height:     "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,10,0.55) 0%, rgba(20,140,5,0.25) 30%, transparent 65%)",
        filter:     "blur(40px)",
        zIndex:     1,
        pointerEvents: "none",
      }} />

      {/* Glow 2 — secondary soft halo behind glow 1 */}
      <div style={{
        position:   "absolute",
        left:       "5%",
        top:        "-10%",
        width:      "800px",
        height:     "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(20,160,5,0.2) 0%, transparent 55%)",
        filter:     "blur(80px)",
        zIndex:     1,
        pointerEvents: "none",
      }} />

      {/* Glow 3 — right sweep arc */}
      <div style={{
        position:   "absolute",
        right:      "-5%",
        top:        "-15%",
        width:      "700px",
        height:     "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,185,8,0.4) 0%, rgba(15,120,4,0.15) 35%, transparent 60%)",
        filter:     "blur(50px)",
        zIndex:     1,
        pointerEvents: "none",
      }} />

      {/* Glow 4 — thin bright arc outline left (the circle ring visible in reference) */}
      <div style={{
        position:     "absolute",
        left:         "8%",
        top:          "-5%",
        width:        "480px",
        height:       "480px",
        borderRadius: "50%",
        border:       "1.5px solid rgba(80,220,40,0.45)",
        boxShadow:    "0 0 40px 8px rgba(60,200,20,0.35), inset 0 0 40px 8px rgba(60,200,20,0.12)",
        filter:       "blur(2px)",
        zIndex:       2,
        pointerEvents:"none",
      }} />

      {/* Glow 5 — thin bright arc outline right */}
      <div style={{
        position:     "absolute",
        right:        "-4%",
        top:          "-8%",
        width:        "420px",
        height:       "420px",
        borderRadius: "50%",
        border:       "1.5px solid rgba(80,220,40,0.35)",
        boxShadow:    "0 0 30px 6px rgba(60,200,20,0.28), inset 0 0 30px 6px rgba(60,200,20,0.08)",
        filter:       "blur(2px)",
        zIndex:       2,
        pointerEvents:"none",
      }} />

      {/* ── Dark rotated overlay (Vector 194) — deepens the blacks ── */}
      <div style={{
        position:  "absolute",
        left:      "-423.96px",
        top:       "-185.65px",
        width:     "2409px",
        height:    "1177px",
        background:"rgba(0,0,0,0.88)",
        filter:    "blur(75px)",
        transform: "rotate(17.72deg)",
        zIndex:    3,
        pointerEvents:"none",
      }} />

      {/* ── Vertical stripe columns (Rectangle 10–20) ── */}
      {Array.from({ length: 11 }).map((_, i) => (
        <div key={i} style={{
          position:   "absolute",
          top:        0,
          bottom:     0,
          left:       `${(i / 11) * 100}%`,
          width:      `${100 / 11}%`,
          background: "linear-gradient(270deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)",
          zIndex:     4,
          pointerEvents:"none",
        }} />
      ))}

      {/* ── Bottom blur (Vector 195) ── */}
      <div style={{
        position:   "absolute",
        bottom:     0,
        left:       "50%",
        transform:  "translateX(-50%)",
        width:      "110%",
        height:     "clamp(180px,31.1vw,599px)",
        background: "#000",
        filter:     "blur(150px)",
        zIndex:     5,
        pointerEvents:"none",
      }} />

      {/* ── Content ── */}
      <div style={{ position:"relative", zIndex:6, height:"clamp(440px,47.3vw,908px)", maxWidth:1920, margin:"0 auto" }}>

        {/* Left — question text  top: 382/908 */}
        <p style={{
          position:   "absolute",
          left:       "clamp(20px,5.65vw,108.5px)",
          top:        "clamp(160px,19.9vw,382px)",
          width:      "clamp(240px,36.98vw,710px)",
          margin:     0,
          fontSize:   "clamp(14px,1.67vw,32px)",
          fontWeight: 500,
          color:      "#fff",
          lineHeight: "1.125",
          fontFamily: font,
        }}>
          Do you have any questions? Drop us an email and we&apos;ll get right back to you...
        </p>

        {/* Left — email  top: 478/908 */}
        <a href="mailto:contact@ivyleaguesolutions.com" style={{
          position:       "absolute",
          left:           "clamp(20px,5.65vw,108.5px)",
          top:            "clamp(200px,24.9vw,478px)",
          fontSize:       "clamp(14px,1.67vw,32px)",
          fontWeight:     500,
          color:          "#fff",
          fontFamily:     font,
          lineHeight:     "1.125",
          textDecoration: "none",
        }}>
          contact@ivyleaguesolutions.com
        </a>

        {/* Right — nav links  top: 382/908, right: 138.5/1920 */}
        <div style={{
          position:      "absolute",
          right:         "clamp(20px,7.21vw,138.5px)",
          top:           "clamp(160px,19.9vw,382px)",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "flex-end",
          gap:           "clamp(8px,2.08vw,40px)",
        }}>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontSize:"clamp(13px,1.46vw,28px)", fontWeight:400, color:"#fff", fontFamily:font, lineHeight:"1.21", textDecoration:"none", opacity:0.85, transition:"opacity 0.18s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* "Built for Growth"  top: 558/908 */}
        <div style={{
          position:      "absolute",
          bottom:        0,
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         "100%",
          textAlign:     "center",
          fontSize:      "clamp(40px,14.17vw,272px)",
          fontWeight:    500,
          color:         "#fff",
          fontFamily:    font,
          lineHeight:    "1.2",
          letterSpacing: "-0.05em",
          whiteSpace:    "nowrap",
          userSelect:    "none",
          pointerEvents: "none",
        }}>
          Built for Growth
        </div>

      </div>
    </footer>
  );
}

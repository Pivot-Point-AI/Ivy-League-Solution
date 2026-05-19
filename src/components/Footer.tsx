"use client";

import Link from "next/link";

const RS = {
  green: "#78EB54",
  font:  "'DM Sans','Inter',system-ui,sans-serif",
};

/* Figma footer nav: Solution / Talent / Pricing / Resources */
const footerLinks = [
  { label: "Solution",   href: "/solutions" },
  { label: "Talent",     href: "/services"  },
  { label: "Pricing",    href: "/contact"   },
  { label: "Resources",  href: "/about"     },
];

export default function Footer() {
  return (
<footer style={{
  position:   "relative",
  background: "#000",
  overflow:   "hidden",
  minHeight:  "clamp(400px,47.3vw,908px)",
}}>

  {/* Background image */}
  <div style={{
    position:   "absolute",
    inset:      0,
    background: "url('/ChatGPT Image Jan 21, 2026, 12_55_13 PM.png') center/cover no-repeat",
    zIndex:     0,
  }} />

  {/* Dark overlay — rotated blurred rectangle */}
  <div style={{
    position:  "absolute",
    inset:     "-20%",
    background:"rgba(0,0,0,0.93)",
    filter:    "blur(75px)",
    transform: "rotate(17.72deg)",
    zIndex:    1,
  }} />

  {/* Vertical stripe columns */}
  {Array.from({ length: 11 }).map((_, i) => (
    <div key={i} style={{
      position:   "absolute",
      top:        0,
      bottom:     0,
      left:       `${(i / 11) * 100}%`,
      width:      `${100 / 11}%`,
      background: "linear-gradient(270deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.05) 100%)",
      zIndex:     2,
    }} />
  ))}

  {/* Bottom blur */}
  <div style={{
    position:   "absolute",
    bottom:     0,
    left:       "50%",
    transform:  "translateX(-50%)",
    width:      "110%",
    height:     "clamp(200px,31.1vw,599px)",
    background: "#000",
    filter:     "blur(150px)",
    zIndex:     3,
  }} />

  {/* Content */}
  <div style={{
    position: "relative",
    zIndex:   4,
    height:   "clamp(400px,47.3vw,908px)",
    maxWidth: 1920,
    margin:   "0 auto",
  }}>

    {/* Left — question + email */}
    <div style={{
      position: "absolute",
      left:     "clamp(20px,5.6vw,108px)",
      top:      "clamp(180px,19.9vw,382px)",
    }}>
      <p style={{
        fontSize:     "clamp(16px,1.67vw,32px)",
        fontWeight:   500,
        color:        "#fff",
        lineHeight:   "1.125",
        fontFamily:   RS.font,
        maxWidth:     "clamp(280px,36.9vw,710px)",
        marginBottom: "clamp(12px,2vw,24px)",
      }}>
        Do you have any questions? Drop us an email and we'll get right back to you...
      </p>
      <a href="mailto:info@repstack.co" style={{
        fontSize:       "clamp(16px,1.67vw,32px)",
        fontWeight:     500,
        color:          "#fff"  ,
        fontFamily:     RS.font,
        lineHeight:     "1.125",
        textDecoration: "none",
      }}>
        info@repstack.co
      </a>
    </div>

    {/* Right — nav links */}
    <div style={{
      position:  "absolute",
      right:     "clamp(20px,7.2vw,138px)",
      top:       "clamp(180px,19.9vw,382px)",
      display:   "flex",
      flexDirection:"column",
      alignItems:"flex-end",
      gap:       "clamp(6px,2vw,10px)",
    }}>
      {["Solution", "Talent", "Pricing", "Resources"].map((item) => (
        <a key={item} href={`/${item.toLowerCase()}`} style={{
          fontSize:       "clamp(14px,1.46vw,28px)",
          fontWeight:     400,
          color:          "#fff"  ,
          fontFamily:     RS.font,
          lineHeight:     "1.21",
          textDecoration: "none",
        }}>
          {item}
        </a>
      ))}
    </div>

    {/* Big "Built for Growth" text */}
    <div style={{
      position:      "absolute",
      bottom:        0,
      left:          "50%",
      transform:     "translateX(-50%)",
      width:         "100%",
      textAlign:     "center",
      fontSize:      "clamp(48px,14.2vw,272px)",
      fontWeight:    500,
      color:         "#fff",
      fontFamily:    RS.font,
      lineHeight:    "1.2",
      letterSpacing: "-0.05em",
      whiteSpace:    "nowrap",
      userSelect:    "none",
    }}>
      Built for Growth
    </div>

  </div>
</footer>
  );
}

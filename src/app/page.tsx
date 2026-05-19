import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ivy League Solutions — Enterprise Software, AI & Digital Infrastructure",
};

const RS = {
  green:     "#78EB54",
  darkGreen: "#273F2B",
  black:     "#000000",
  white:     "#FFFFFF",
  gray:      "#F3F4F6",
  font:      "'Aeonik','DM Sans','Inter',system-ui,sans-serif",
};
const profileImages = [
  "/Ellipse 263.png",
  "/Ellipse 264.png",
  "/Ellipse 265.png",
  "/Ellipse 266.png",
  "/Ellipse 267.png",
  "/Ellipse 268.png",
  "/Ellipse 269.png",
"/Ellipse 270.png",
];
const GreenBtn = ({
  href, children, width = 196,
}: { href: string; children: React.ReactNode; width?: number }) => (
  <Link href={href} style={{
    display:        "inline-flex",
    alignItems:     "center",
    justifyContent: "center",
    width:          width,
    height:         56,
    background:     RS.green,
    borderRadius:   28,
    fontSize:       16,
    fontWeight:     500,
    color:          RS.black,
    textDecoration: "none",
    whiteSpace:     "nowrap",
    fontFamily:     RS.font,
  }}>
    {children}
  </Link>
);

export default function HomePage() {
  return (
    <div style={{ fontFamily: RS.font, overflowX: "hidden" }}>

      {/* ─── 1. HERO ───
          Figma canvas: 1920×1080px. bg:#FFFFFF.
          vw = px/1920*100  vh = px/1080*100
          Navbar is position:fixed above — hero fills 100vh from y=0. ── */}
      <section style={{
        position:   "relative",
        width:      "100vw",
        height:     "100vh",
        minHeight:  700,
        background: "#FFFFFF",
        overflow:   "hidden",
      }}>

        {/* ── image 764 (main bg): 2353×1324px centred, top: calc(50%−662px−0.31px)
               bleeds ±216px horizontally — use cover so it fills edge-to-edge ── */}
        <div style={{
          position:           "absolute",
          inset:              0,
          backgroundImage:    "url('/hero-bg.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center center",
        }} />

        {/* ── Rectangle 3: dark gradient from bottom, Figma h:973px = 90.09vh ── */}
        <div style={{
          position:      "absolute",
          left:          0,
          right:         0,
          bottom:        0,
          height:        "90.09vh",
          background:    "linear-gradient(24.44deg,rgba(0,0,0,0.6) 21.79%,rgba(0,0,0,0) 65.7%)",
          pointerEvents: "none",
        }} />

        {/* ── Rectangle 1: white blur strip at top, Figma h:106px = 9.81vh ── */}
        <div style={{
          position:      "absolute",
          left:          0,
          right:         0,
          top:           0,
          height:        "9.81vh",
          background:    "linear-gradient(118.01deg,rgba(255,255,255,0.8) 32.64%,rgba(255,255,255,0) 67.74%)",
          filter:        "blur(33.5px)",
          pointerEvents: "none",
        }} />

        {/* ── Frame 1618872285 (green stats card)
               Figma: left:220 top:564 w:335 h:416  → 11.46vw 52.22vh 17.45vw 38.52vh ── */}
        <div className="hero-card-mobile" style={{
          position:     "absolute",
          left:         "11.46vw",
          top:          "52.22vh",
          width:        "17.45vw",
          height:       "38.52vh",
          minWidth:     170,
          minHeight:    230,
          background:   RS.green,
          borderRadius: 12,
          overflow:     "hidden",
        }}>
          {/* "Businesses choose…"  Figma: left:20 top:26 w:295 h:96 fs:22 lh:24 */}
          <p style={{
            position:   "absolute",
            left:       "5.97%",
            top:        "6.25%",
            width:      "88.06%",
            fontSize:   "clamp(11px,1.15vw,22px)",
            fontWeight: 400,
            lineHeight: "clamp(16px,2.22vh,24px)",
            color:      RS.black,
            fontFamily: RS.font,
            margin:     0,
          }}>
            Trusted globally for custom technology, built for enterprise — from fintech to healthcare.
          </p>

          {/* "120+"  Figma: left:20 top:255 w:204 fs:100 lh:24 */}
          <p style={{

            position:   "absolute",
            left:       "5.97%",
            top:        "51.3%",  
            width:      "60.9%",
            fontSize:   "clamp(36px,9.26vh,100px)",
            fontWeight: 400,
            lineHeight: 1,
            color:      RS.black,
            fontFamily: RS.font,
            margin:     0,
          }}>
            120+
          </p>

          {/* "Companies hired through…"  Figma: left:20 top:340 w:295 h:48 fs:22 lh:24 */}
          <p style={{
            position:   "absolute",
            left:       "5.97%",
            top:        "81.73%",
            width:      "88.06%",
            fontSize:   "clamp(11px,1.15vw,22px)",
            fontWeight: 400,
            lineHeight: "clamp(16px,2.22vh,24px)",
            color:      RS.black,
            fontFamily: RS.font,
            margin:     0,
          }}>
            Companies hired through Ivy League Solutions
          </p>
        </div>

        {/* ── "world-class remote teams"
               Figma: left:609 top:564 w:665 h:288 fs:96 lh:100% ls:-1px uppercase #FFF ── */}
        <h1 className="hero-h1-mobile" style={{
          position:      "absolute",
          left:          "31.72vw",
          top:           "52.22vh",
          width:         "34.64vw",
          height:        "26.67vh",
          display:       "flex",
          alignItems:    "center",
          fontSize:      "clamp(28px,5vw,96px)",
          fontWeight:    400,
          lineHeight:    "100%",
          letterSpacing: "-1px",
          textTransform: "uppercase",
          color:         RS.white,
          fontFamily:    RS.font,
          margin:        0,
        }}>
          Enterprise Software & AI Delivery
        </h1>

        {/* ── Subtitle
               Figma: left:1218 top:806 w:482 h:96 fs:22 lh:32 text-align:justify #FFF ── */}
        <p className="hero-sub-mobile" style={{
          position:   "absolute",
          left:       "63.44vw",
          top:        "74.63vh",
          width:      "clamp(200px,25.1vw,482px)",
          margin:     0,
          fontSize:   "clamp(12px,1.15vw,22px)",
          fontWeight: 400,
          lineHeight: "clamp(20px,2.96vh,32px)",
          textAlign:  "justify",
          color:      RS.white,
          fontFamily: RS.font,
        }}>
          Ivy League Solutions delivers premium custom software, AI systems, and digital infrastructure — engineered for enterprises across fintech, healthcare, logistics, and beyond.
        </p>

        {/* ── "Book a free consultant" CTA
               Figma: left:1472 top:calc(50%−28+412)=924px w:228 h:56 r:28 bg:#FFF color:#000 ── */}
        <Link href="/contact" style={{
          position:       "absolute",
          left:           "76.67vw",
          top:            "89.56vh",
          width:          "clamp(160px,11.88vw,228px)",
          height:         "clamp(44px,5.19vh,56px)",
          background:     RS.white,
          borderRadius:   28,
          display:        "inline-flex",
          alignItems:     "center",
          justifyContent: "center",
          fontSize:       "clamp(13px,0.83vw,16px)",
          fontWeight:     500,
          lineHeight:     "24px",
          color:          RS.black,
          textDecoration: "none",
          fontFamily:     RS.font,
          whiteSpace:     "nowrap",
        }}>
          Start a Project →
        </Link>
      </section>

      {/* ─── 2. WHAT WE DO ───
          Figma: 1920×1080 section, bg:#FFF
          Content group: left:128 width:1606.48 height:614.53 top:calc(50%-614.53/2)
          → section is full-viewport-height, content vertically centred
          Left col: SERVICES→h2 gap=23px, h2→desc gap=32px, desc→btn gap=30px
          Cards: col-gap=78.9px  row-gap=70.57px  icon→title=39.3px  title→desc=23.13px
      ── */}
      <section style={{
        background:     RS.white,
        minHeight:      "100vh",
        display:        "flex",
        alignItems:     "center",
        paddingLeft:    "clamp(20px,6.67vw,128px)",
        paddingRight:   "clamp(20px,6.67vw,128px)",
        paddingTop:     "clamp(48px,6vh,80px)",
        paddingBottom:  "clamp(48px,6vh,80px)",
        boxSizing:      "border-box",
      }}>
        {/*
          Content group: width 1606.48px at 1920 → max-width 1607
          Left col: 560px | gap: 145.3px (7.57vw) | right: 901.1px (2×411.1 + 78.9)
        */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "minmax(200px,560px) 1fr",
          gap:                 "clamp(40px,7.57vw,145px)",
          alignItems:          "start",
          maxWidth:            1607,
          width:               "100%",
          margin:              "0 auto",
        }}>

          {/* ── Left column ── */}
          <div>
            {/* SERVICES — 20px/24px weight:400 */}
            <p style={{
              fontSize:     20,
              fontWeight:   400,
              lineHeight:   "24px",
              color:        RS.black,
              margin:       0,
              fontFamily:   RS.font,
            }}>SERVICES</p>

            {/* What we do — 60px/72px weight:400; top gap from SERVICES = 279.74-(232.74+24)=23px */}
            <h2 style={{
              fontSize:     "clamp(30px,3.125vw,60px)",
              fontWeight:   400,
              lineHeight:   "clamp(42px,6.67vh,72px)",
              color:        RS.black,
              margin:       "23px 0 0",
              fontFamily:   RS.font,
            }}>
              What we do
            </h2>

            {/* desc — 24px/40px weight:400; top gap = 383.74-(279.74+72)=32px */}
            <p style={{
              fontSize:     "clamp(14px,1.25vw,24px)",
              fontWeight:   400,
              lineHeight:   "clamp(28px,3.7vh,40px)",
              color:        RS.black,
              maxWidth:     560,
              margin:       "32px 0 0",
              fontFamily:   RS.font,
            }}>
              End-to-end technology services tailored for every industry and every scale — from custom software to AI, infrastructure, and beyond.
            </p>

            {/* CTA — w:196 h:56 radius:28; top gap from desc bottom = 533.83-(383.74+120)=30.09px */}
            <div style={{ marginTop: 30 }}>
              <GreenBtn href="/contact">Get In Touch</GreenBtn>
            </div>
          </div>

          {/* ── Right: 2×2 service cards ──
              col-gap = 1323.38-(833.38+411.1) = 78.9px  → 4.1vw
              row-gap = 589.83-(261.83+257.43) = 70.57px → 6.53vh
          */}
          <div style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap:           "clamp(20px,4.1vw,79px)",
            rowGap:              "clamp(36px,6.53vh,71px)",
          }}>
            {[
              {
                icon: (
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <rect x="4" y="6" width="30" height="22" rx="3" stroke="#000" strokeWidth="1.5" fill="none"/>
                    <line x1="10" y1="14" x2="28" y2="14" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="10" y1="19" x2="22" y2="19" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="14" y1="32" x2="24" y2="32" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="19" y1="28" x2="19" y2="32" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: "SOFTWARE DEVELOPMENT",
                desc:  "End-to-end custom software from concept to deployment. Web, mobile, and enterprise applications built to scale with React, Node.js, .NET, and Python.",
              },
              {
                icon: (
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <circle cx="19" cy="19" r="7" stroke="#000" strokeWidth="1.5" fill="none"/>
                    <path d="M19 4 L19 10 M19 28 L19 34 M4 19 L10 19 M28 19 L34 19" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 9 L13 13 M25 25 L29 29 M9 29 L13 25 M25 13 L29 9" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: "AI & MACHINE LEARNING",
                desc:  "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation at enterprise scale across fintech and healthcare.",
              },
              {
                icon: (
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <rect x="3" y="8" width="14" height="10" rx="2" stroke="#000" strokeWidth="1.5" fill="none"/>
                    <rect x="21" y="8" width="14" height="10" rx="2" stroke="#000" strokeWidth="1.5" fill="none"/>
                    <rect x="12" y="22" width="14" height="10" rx="2" stroke="#000" strokeWidth="1.5" fill="none"/>
                    <line x1="10" y1="18" x2="10" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="28" y1="18" x2="28" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="10" y1="24" x2="28" y2="24" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="19" y1="24" x2="19" y2="22" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ),
                title: "DIGITAL INFRASTRUCTURE",
                desc:  "Network services, datacenter solutions, cloud migration and managed IT infrastructure at enterprise scale on AWS, Azure, Cisco, and Oracle.",
              },
              {
                icon: (
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <path d="M19 5 L6 11 L6 20 C6 27 12 33 19 35 C26 33 32 27 32 20 L32 11 Z" stroke="#000" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                    <path d="M13 19 L17 23 L25 15" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "CYBERSECURITY & SOC",
                desc:  "24/7 threat monitoring, incident response, compliance automation, and security operations center with Zero Trust architecture built in.",
              },
            ].map((s) => (
              <div key={s.title}>
                {/* Icon frame — 38×38 per Figma; margin-bottom = icon_top→title_top - icon_height = 77.3-38 = 39.3px */}
                <div style={{
                  width:         38,
                  height:        38,
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                  marginBottom:  "clamp(20px,3.64vh,39px)",
                }}>
                  {s.icon}
                </div>

                {/* Title — 24px/29px weight:500; margin-bottom = title_bottom→desc_top = 52.13-29 = 23.13px */}
                <h3 style={{
                  fontSize:      "clamp(13px,1.25vw,24px)",
                  fontWeight:    500,
                  lineHeight:    "29px",
                  color:         RS.black,
                  margin:        "0 0 clamp(12px,2.14vh,23px)",
                  fontFamily:    RS.font,
                  letterSpacing: 0,
                }}>
                  {s.title}
                </h3>

                {/* Description — 24px/32px weight:400 */}
                <p style={{
                  fontSize:   "clamp(13px,1.25vw,24px)",
                  fontWeight: 400,
                  lineHeight: "clamp(22px,2.96vh,32px)",
                  color:      RS.black,
                  margin:     0,
                  fontFamily: RS.font,
                }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. EXCELLENCE STATS ───
          Figma: 1920×808px. Title top:142.5px, stats top:534.5px.
          Title: 100px/116px weight:500 letter-spacing:-0.02em
          Numbers: #78EB54 weight:700 100px/86px
          Labels:  #000 weight:400 22px/20px
      ── */}
      <section style={{
        position:  "relative",
        background: RS.white,
        overflow:  "hidden",
        minHeight: "clamp(480px,42.08vw,808px)",
        display:   "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"center",
        padding:   "clamp(60px,7.42vw,142px) clamp(20px,6.67vw,128px) clamp(60px,7.69vw,147px)",
        boxSizing: "border-box",
      }}>

        {/* World-map background — Component 127, rotated 180°, #F2F2F2 */}
        <div style={{
          position:  "absolute",
          inset:     0,
          display:   "flex",
          alignItems:"center",
          justifyContent:"center",
          pointerEvents:"none",
          zIndex:    0,
        }}>
          <svg
            viewBox="0 0 2036 980"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{ transform:"rotate(180deg)", opacity:1 }}
            fill="#F2F2F2"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simplified world-map continents */}
            {/* North America */}
            <path d="M197 113 Q220 90 260 85 Q290 80 320 95 Q350 108 370 130 Q400 160 410 190 Q430 230 420 260 Q410 290 390 310 Q370 340 350 360 Q330 390 310 410 Q280 440 260 460 Q240 485 230 510 Q220 535 215 555 Q205 580 195 600 L190 590 Q185 565 190 540 Q195 515 200 490 Q205 460 210 435 Q215 405 210 380 Q205 350 195 325 Q180 295 170 265 Q160 235 165 210 Q170 180 185 155 Z"/>
            {/* Greenland */}
            <path d="M370 22 Q400 18 430 25 Q455 35 460 55 Q465 75 445 88 Q425 98 400 92 Q375 85 362 68 Q352 50 370 22 Z"/>
            {/* South America */}
            <path d="M310 500 Q330 490 355 495 Q380 500 400 520 Q425 545 430 575 Q435 610 425 645 Q415 680 400 710 Q385 740 365 760 Q340 775 320 770 Q295 760 280 740 Q260 715 255 685 Q250 650 260 620 Q270 585 280 555 Q290 528 310 500 Z"/>
            {/* Europe */}
            <path d="M900 65 Q920 55 945 60 Q970 68 985 85 Q995 105 988 125 Q980 145 960 155 Q940 162 918 155 Q895 145 885 125 Q878 105 888 85 Z"/>
            <path d="M940 155 Q960 150 978 162 Q995 178 990 198 Q982 218 960 225 Q938 228 922 215 Q908 198 915 178 Q924 160 940 155 Z"/>
            {/* Africa */}
            <path d="M950 250 Q975 235 1005 240 Q1035 248 1055 270 Q1075 295 1080 325 Q1085 360 1075 395 Q1063 430 1045 460 Q1025 492 1000 515 Q972 535 945 530 Q918 522 900 498 Q882 472 878 440 Q875 405 882 372 Q892 335 910 305 Q928 275 950 250 Z"/>
            {/* Asia */}
            <path d="M1100 85 Q1150 70 1210 75 Q1270 82 1320 100 Q1380 122 1420 150 Q1460 180 1475 215 Q1488 250 1475 280 Q1462 308 1435 325 Q1405 340 1370 338 Q1330 334 1290 318 Q1245 298 1210 270 Q1170 238 1148 200 Q1125 162 1110 130 Q1098 105 1100 85 Z"/>
            {/* Southeast Asia */}
            <path d="M1480 280 Q1505 270 1530 278 Q1552 288 1560 308 Q1565 328 1552 345 Q1538 360 1515 362 Q1492 360 1480 342 Q1468 322 1475 303 Z"/>
            {/* Japan */}
            <path d="M1580 155 Q1595 148 1610 155 Q1622 165 1618 180 Q1612 193 1598 196 Q1584 196 1577 183 Q1570 168 1580 155 Z"/>
            {/* Australia */}
            <path d="M1540 540 Q1575 525 1615 530 Q1655 538 1680 562 Q1705 588 1708 620 Q1710 652 1695 680 Q1678 705 1650 718 Q1620 728 1590 720 Q1558 710 1538 686 Q1518 660 1518 628 Q1518 596 1535 570 Z"/>
            {/* British Isles */}
            <path d="M858 95 Q868 88 880 92 Q890 100 887 112 Q882 122 870 124 Q858 122 854 110 Q851 99 858 95 Z"/>
          </svg>
        </div>

        {/* Title */}
        <h2 style={{
          position:      "relative",
          zIndex:        1,
          fontSize:      "clamp(40px,5.21vw,100px)",
          fontWeight:    500,
          lineHeight:    "clamp(48px,6.04vw,116px)",
          letterSpacing: "-0.02em",
          textAlign:     "center",
          color:         RS.black,
          fontFamily:    RS.font,
          margin:        0,
          marginBottom:  "clamp(36px,8.33vw,160px)",
          
          maxWidth:      "clamp(80px,63.7vw,747px)",
        }}>
          Redefining Enterprise-Grade Solutions, Built on Trust

        </h2>

        {/* Stats row */}
        <div style={{
          position:            "relative",
          zIndex:              1,
          display:             "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          width:               "100%",
          maxWidth:            "clamp(600px,75.36vw,1447px)",
          textAlign:           "center",
        }}>
          {[
            { num:"200+", label:"Projects Delivered"    },
            { num:"98%",  label:"Client Satisfaction"   },
            { num:"15+",  label:"Industries Served"     },
            { num:"90%",  label:"Faster Processing Time"},
          ].map((s) => (
            <div key={s.label}>
              <div style={{
                fontSize:   "clamp(36px,5.21vw,100px)",
                fontWeight: 700,
                lineHeight: "clamp(32px,4.48vw,86px)",
                color:      RS.green,
                fontFamily: RS.font,
                marginBottom:"clamp(8px,0.56vw,12px)",
              }}>
                {s.num}
              </div>
              <div style={{
                fontSize:   "clamp(13px,1.15vw,22px)",
                fontWeight: 400,
                lineHeight: "clamp(16px,1.04vw,20px)",
                color:      RS.black,
                fontFamily: RS.font,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. HOW IT WORKS ─── */}
      {/* Figma: top=172px → 15.93vh */}
      <section style={{ background: RS.gray, padding: "clamp(60px,15.93vh,172px) clamp(20px,6.67vw,128px)" }}>
        <div style={{ maxWidth:1480, margin:"0 auto" }}>
          {/* Row 1: big dark card + top-right white card */}
          <div style={{
            display:             "grid",
            gridTemplateColumns: "2fr 1fr",
            gap:                 "clamp(12px,1.8vw,35px)",
            marginBottom:        "clamp(12px,1.8vw,35px)",
          }}>
            {/* Dark "How It Works" card */}
            <div style={{
              background:   RS.black,
              borderRadius: 22,
              padding:      "48px 56px",
              boxShadow:    "0 13px 100px rgba(199,199,199,0.25)",
              minHeight:    348,
              display:      "flex",
              flexDirection:"column",
              justifyContent:"space-between",
            }}>
              <div>
                <h2 style={{ fontSize:"clamp(28px,2.5vw,48px)", fontWeight:700, color:RS.white, lineHeight:"64px", marginBottom:0, fontFamily:RS.font }}>
                  How Ivy League Delivers
                </h2>
              </div>
              <div>
                <Link href="/contact" style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  gap:            12,
                  width:          204,
                  height:         72,
                  background:     RS.green,
                  borderRadius:   36,
                  fontSize:       15.5,
                  fontWeight:     700,
                  color:          RS.black,
                  textDecoration: "none",
                  letterSpacing:  "1.28px",
                  fontFamily:     RS.font,
                }}>
                  See More
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* White card: Understand Your Needs */}
            <HowCard
              icon={<svg width="60" height="59" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
              title="Understand Your Goals"
              desc="We take time to understand your business domain, technical requirements, and enterprise objectives before writing a single line of code."
            />
          </div>

          {/* Row 2: three white cards */}
          <div style={{
            display:             "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap:                 "clamp(12px,1.8vw,35px)",
          }}>
            <HowCard
              icon={<svg width="72" height="71" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              title="Dedicated Team Assembly"
              desc="You get a named project manager, senior engineers, and a QA lead — purpose-built for your project and vertical."
            />
            <HowCard
              icon={<svg width="59" height="59" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
              title="Agile Development"
              desc="We build in iterative sprints with full transparency — demos, reviews, and course corrections at every milestone."
            />
            <HowCard
              icon={<svg width="59" height="59" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>}
              title="Post-Launch Support"
              desc="24/7 monitoring, SLA-backed incident response, and proactive performance tuning long after go-live."
            />
          </div>
        </div>
      </section>

      {/* ─── 5. MARKETING AGENCIES ─── */}
      <section style={{
        position:           "relative",
        height:             "100vh",
        minHeight:          640,
        overflow:           "hidden",
        backgroundImage:    "url('/marketing-bg.png'), linear-gradient(160deg,#1a2f1c 0%,#0e1f0f 50%,#243826 100%)",
        backgroundSize:     "cover, cover",
        backgroundPosition: "center, center",
      }}>
        {/* Semi-transparent right panel */}
        <div style={{
          position:   "absolute",
          right:      0,
          top:        0,
          bottom:     0,
          width:      "calc(clamp(180px,15.4vw,296px))",
          background: "rgba(255,255,255,0.1)",
        }} />

        {/* Arrow button right */}
        <Link href="/services" style={{
          position:       "absolute",
          right:          "clamp(10px,7.5vw,144px)",
          top:            "50%",
          transform:      "translateY(-50%)",
          width:          111,
          height:         56,
          background:     RS.green,
          borderRadius:   28,
          display:        "inline-flex",
          alignItems:     "center",
          justifyContent: "center",
          textDecoration: "none",
        }}>
          <svg width="25" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </Link>

        {/* Career Paths button */}
        <div style={{
          position: "absolute",
          left:     "clamp(20px,8.4vw,162px)",
          top:      "calc(50% - 160px)",
        }}>
          <GreenBtn href="/services" width={196}>Our Services</GreenBtn>
        </div>

        {/* Text overlay */}
        <div style={{
          position: "absolute",
          left:     "clamp(20px,8.4vw,162px)",
          bottom:   "clamp(40px,8.5vh,92px)",
        }}>
          <p style={{ fontSize:"clamp(14px,1.15vw,22px)", fontWeight:500, color:RS.white, marginBottom:8, fontFamily:RS.font, letterSpacing:0 }}>
            DEEP EXPERTISE ACROSS
          </p>
          <h2 style={{ fontSize:"clamp(28px,3.1vw,60px)", fontWeight:500, color:RS.white, lineHeight:"72px", margin:0, fontFamily:RS.font }}>
            EVERY ENTERPRISE VERTICAL
          </h2>
        </div>
      </section>

      {/* ─── 6. EMPLOYER OF RECORD ───
          Figma: 1920×1080px. bg:#F3F4F6 (Rectangle 6 fills entire section).
          Frame 1618872476: left:132px top:102px w:1656px h:877px
          Left col (section-absolute):
            SERVICES  left:134px top:200px  20px/24px weight:400 #000
            Title     left:134px top:247px  60px/72px weight:400 #000  w:689px
            Body      left:134px top:332px  24px/40px weight:400 #000  w:689px
            Button    left:130px top:calc(50%-28-10.54)=501px  196×56 green r:28
          Right col (frame-relative → section: left=132+1008=1140px, top=102+202.63=304.63px):
            4 sticky-cards: w:782px h:157px gap:16.3px bg:#FFF border:1px rgba(0,0,0,.08) r:4.07
            Icon box: 32.53×32.53 bg:#000 r:4.07 at card-left:33px card-top:33.53px
            Title: left:81.8px(33+32.53+16.27) top:33.53px  23px/32px weight:700 #0C0E0F
            Desc:  left:33.53px top:78.25px  16.3px/23px weight:400 #0C0E0F
          All px → vw: ÷1920×100
      ── */}
    <section style={{
  position:   "relative",
  height:     "clamp(540px,56.25vw,1080px)",
  background: "#F3F4F6",
  overflow:   "hidden",
}}>

  {/* SERVICES label — Figma: left:134.07px top:200.37px */}
  <p style={{
    position:   "absolute",
    left:       "clamp(60px,6.98vw,134px)",
    top:        "clamp(100px,10.44vw,200px)",
    margin:     0,
    fontSize:   "clamp(13px,1.04vw,20px)",
    fontWeight: 400,
    lineHeight: "24px",
    color:      RS.black,
    fontFamily: RS.font,
  }}>
    SERVICES
  </p>

  {/* Title — Figma: left:134.07px top:247.37px w:689px fs:60px lh:72px */}
  <h2 style={{
    position:   "absolute",
    left:       "clamp(60px,6.98vw,134px)",
    top:        "clamp(124px,12.88vw,247px)",
    width:      "clamp(240px,35.89vw,689px)",
    margin:     0,
    fontSize:   "clamp(28px,3.125vw,60px)",
    fontWeight: 400,
    lineHeight: "clamp(36px,3.75vw,72px)",
    color:      RS.black,
    fontFamily: RS.font,
  }}>
    AI-First Delivery
  </h2>

  {/* Body — Figma: left:134px top:331.63px w:689px fs:24px lh:40px h:120px */}
  <p style={{
    position:   "absolute",
    left:       "clamp(60px,6.98vw,134px)",
    top:        "clamp(172px,17.27vw,332px)",
    width:      "clamp(240px,35.89vw,689px)",
    margin:     0,
    fontSize:   "clamp(14px,1.25vw,24px)",
    fontWeight: 400,
    lineHeight: "clamp(22px,2.08vw,40px)",
    color:      RS.black,
    fontFamily: RS.font,
  }}>
    Production-grade AI systems for Fintech, Healthcare, and enterprise operations — deployed globally with MLOps, LLMs, and intelligent automation at the core of every solution.
  </p>

  {/* Button — Figma: left:130px top:calc(50% - 56px/2 - 10.54px) w:196px h:56px r:28px bg:#78EB54 */}
  <Link href="/contact" style={{
    position:       "absolute",
    left:           "clamp(50px,6.77vw,130px)",
    top:            "calc(50% - 28px - 10.54px)",
    width:          "clamp(140px,10.21vw,196px)",
    height:         56,
    background:     RS.green,
    borderRadius:   28,
    display:        "inline-flex",
    alignItems:     "center",
    justifyContent: "center",
    fontSize:       "clamp(13px,0.83vw,16px)",
    fontWeight:     500,
    lineHeight:     "24px",
    color:          RS.black,
    textDecoration: "none",
    fontFamily:     RS.font,
    whiteSpace:     "nowrap",
  }}>
    Learn More
  </Link>

  {/* Cards column
      Figma outer frame: left:132px top:102px
      Inner cards frame: left:1008px top:202.63px → absolute: left:1140px top:304.63px
      w:782px h:677px gap:16.3px */}
  <div style={{
    position:      "absolute",
    left:          "clamp(200px,54.375vw,1070px)",
    top:           "clamp(100px,10.87vw,204.63px)",
    width:         "clamp(280px,40.73vw,782px)",
    display:       "flex",
    flexDirection: "column",
    gap:           16.3,
  }}>
    {([
      {
        fontSize: 23.2563,
        title: "Fraud Detection & Risk AI",
        desc:  "Real-time ML models that identify fraud patterns, assess credit risk, and automate compliance decisions at scale for fintech and banking platforms.",
        // 1 vertical bar: left:46.85% right:46.85% → x≈11.43 w≈1.54
        icon: (
          <svg width="24.39" height="24.39" viewBox="0 0 24.39 24.39">
            <rect x="11.43" y="6.86" width="1.54" height="10.67" fill="#fff"/>
          </svg>
        ),
        bodyLeft: 33,     // Figma card 1 body: left:33px
        bodyTop:  78,     // Figma card 1 body: top:78px
      },
      {
        fontSize: 22.6844,
        title: "Predictive Analytics",
        desc:  "Data pipelines and analytics platforms that surface business intelligence, demand forecasting, and operational insights across your enterprise.",
        // 2 vertical bars: left:34.35%→x=8.38, left:59.35%→x=14.48
        icon: (
          <svg width="24.39" height="24.39" viewBox="0 0 24.39 24.39">
            <rect x="8.38"  y="6.86" width="1.53" height="10.67" fill="#fff"/>
            <rect x="14.48" y="6.86" width="1.53" height="10.67" fill="#fff"/>
          </svg>
        ),
        bodyLeft: 33.53,
        bodyTop:  78.25,
      },
      {
        fontSize: 23.2563,
        title: "LLM-Powered Workflows",
        desc:  "Custom large language model integrations and intelligent automation that streamline operations, document processing, and customer interactions.",
        // 3 vertical bars: x=5.33, x=11.43, x=17.53
        icon: (
          <svg width="24.39" height="24.39" viewBox="0 0 24.39 24.39">
            <rect x="5.33"  y="6.86" width="1.53" height="10.67" fill="#fff"/>
            <rect x="11.43" y="6.86" width="1.54" height="10.67" fill="#fff"/>
            <rect x="17.53" y="6.86" width="1.53" height="10.67" fill="#fff"/>
          </svg>
        ),
        bodyLeft: 33.53,
        bodyTop:  78.25,
      },
      {
        fontSize: 23.6375,
        title: "MLOps & Model Deployment",
        desc:  "End-to-end MLOps pipelines — model training, versioning, monitoring, and continuous delivery to keep your AI systems production-ready.",
        // 3 vectors: left:21.85%→x=5.33 w=1.53, left:47.31%→x=11.54 w=4.36, left:59.81%→x=14.59 w=4.36
        icon: (
          <svg width="24.39" height="24.39" viewBox="0 0 24.39 24.39">
            <rect x="5.33"  y="6.86" width="1.53" height="10.67" fill="#fff"/>
            <rect x="11.54" y="6.86" width="4.36" height="10.67" fill="#fff"/>
            <rect x="14.59" y="6.86" width="4.36" height="10.67" fill="#fff"/>
          </svg>
        ),
        bodyLeft: 33.53,
        bodyTop:  78.25,
      },
    ] as { fontSize:number; title:string; desc:string; icon:React.ReactNode; bodyLeft:number; bodyTop:number }[]).map((item) => (
      <div key={item.title} style={{
        position:     "relative",
        width:        "100%",
        height:       157,
        background:   RS.white,
        border:       "1px solid rgba(0,0,0,0.08)",
        borderRadius: 4.07,
        boxSizing:    "border-box",
        flexShrink:   0,
        overflow:     "visible",
      }}>
        {/* Icon-wrapper — Figma: left:-15.28px top:33.53px h:32.53px gap:16.27px */}
        <div style={{
          position:      "absolute",
          left:          -15.28,
          top:           33.53,
          height:        32.53,
          display:       "flex",
          flexDirection: "row",
          alignItems:    "center",
          gap:           16.27,
        }}>
          {/* Icon box: 32.53×32.53 bg:#000 r:4.07px */}
          <div style={{
            width:          32.53,
            height:         32.53,
            background:     RS.black,
            borderRadius:   4.07,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
            padding:        "4.06px 4.07px 4.08px",
            boxSizing:      "border-box",
          }}>
            {item.icon}
          </div>

          {/* Heading 3 — fontSize per card, fw:700 lh:32px color:#0C0E0F */}
          <div style={{
            fontSize:   item.fontSize,
            fontWeight: 700,
            lineHeight: "32px",
            color:      "#0C0E0F",
            fontFamily: RS.font,
            whiteSpace: "nowrap",
          }}>
            {item.title}
          </div>
        </div>

        {/* p.body-small — per-card left/top, right:33.5px, fs:16.3px lh:23px */}
        <p style={{
          position:   "absolute",
          left:       item.bodyLeft,
          right:      33.5,
          top:        item.bodyTop,
          margin:     0,
          fontSize:   16.3,
          fontWeight: 400,
          lineHeight: "23px",
          color:      "#0C0E0F",
          fontFamily: RS.font,
        }}>
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</section>

      {/* ─── 7. OUR CLIENTS ─── */}
      {/*
        Pixel-perfect Figma 1920x1080 black section.
        Concentric rings: 597/997/1556px dia centred (opacity 0.35/0.20/0.14).
        Collaborations pill: top 87px = 4.53vw. OUR CLIENTS: top 217px = 11.31vw.
        Circle row centred at 50%+15px. Gap=46px=2.396vw. Book A Call: bottom 68px.
        Circle sizes L to R: 80 90 120 180 [270 centre] 180 120 90 80 px.
      */}
      <section style={{
        position: "relative",
        background: "#000000",
        overflow: "hidden",
        height: "clamp(600px,56.25vw,1080px)",
      }}>
        {/* 3 concentric rings centred */}
        {([
          { d:597,  op:0.35 },
          { d:997,  op:0.20 },
          { d:1556, op:0.14 },
        ] as { d:number; op:number }[]).map(({ d, op }) => (
          <div key={d} style={{
            position:     "absolute",
            left:         "50%",
            top:          "50%",
            transform:    "translate(-50%,-50%)",
            width:        `clamp(${Math.round(d*0.32)}px,${(d/19.2).toFixed(2)}vw,${d}px)`,
            aspectRatio:  "1/1",
            borderRadius: "50%",
            border:       `1px solid rgba(255,255,255,${op})`,
            pointerEvents:"none",
            zIndex:       0,
          }} />
        ))}

        {/* Collaborations pill — Figma: h:97px top:87px */}
        <div style={{
          position:       "absolute",
          zIndex:         2,
          left:           "50%",
          top:            "clamp(32px,4.53vw,87px)",
          transform:      "translateX(-50%)",
          display:        "inline-flex",
          alignItems:     "center",
          justifyContent: "center",
          height:         "clamp(40px,5.05vw,97px)",
          padding:        "0 clamp(16px,2.08vw,40px)",
          borderRadius:   100,
          border:         "1px solid rgba(255,255,255,0.1)",
          background:     "rgba(255,255,255,0.1)",
          fontSize:       "clamp(13px,1.04vw,20px)",
          fontWeight:     400,
          color:          "#FFFFFF",
          fontFamily:     RS.font,
          whiteSpace:     "nowrap",
        }}>
          Collaborations
        </div>

        {/* OUR CLIENTS — Figma: top:217.16px fs:53.75px fw:700 uppercase */}
        <h2 style={{
          position:      "absolute",
          zIndex:        2,
          left:          "50%",
          top:           "clamp(110px,11.31vw,217px)",
          transform:     "translateX(-50%)",
          fontSize:      "clamp(22px,2.799vw,53.75px)",
          fontWeight:    700,
          lineHeight:    "1.34",
          color:         "#FFFFFF",
          textTransform: "uppercase",
          margin:        0,
          fontFamily:    RS.font,
          whiteSpace:    "nowrap",
        }}>
          OUR CLIENTS
        </h2>

        {/* Circle row — absolute centred, shifted down +15px from vertical mid */}
        <div style={{
          position:       "absolute",
          zIndex:         1,
          left:           0,
          right:          0,
          top:            "50%",
          transform:      "translateY(calc(-50% + clamp(4px,0.78vw,15px)))",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          gap:            "clamp(5px,2.396vw,46px)",
          padding:        "0 clamp(8px,1vw,20px)",
          overflowX:      "auto",
          scrollbarWidth: "none",
        } as React.CSSProperties}>

          {/* 80px left — indigo quad (A4BCFD/6172F3/3538CD) */}
          <ClientCircle size={80}>
            <svg viewBox="0 0 40 40" fill="none" width="56%" height="56%">
              <rect x="2"  y="2"  width="16" height="16" rx="2" fill="#A4BCFD"/>
              <rect x="22" y="2"  width="16" height="16" rx="2" fill="#6172F3"/>
              <rect x="2"  y="22" width="16" height="16" rx="2" fill="#6172F3"/>
              <rect x="22" y="22" width="16" height="16" rx="2" fill="#3538CD"/>
            </svg>
          </ClientCircle>

          {/* 90px left — orange sunburst (FF4405) */}
          <ClientCircle size={90}>
            <svg viewBox="0 0 48 48" fill="none" width="52%" height="52%">
              {[0,45,90,135,180,225,270,315].map(a => (
                <rect key={a} x="21.5" y="3" width="5" height="11" rx="2.5" fill="#FF4405"
                  transform={`rotate(${a} 24 24)`}/>
              ))}
              <circle cx="24" cy="24" r="8" fill="#FF4405"/>
            </svg>
          </ClientCircle>

          {/* 120px left — Airtable-style (FCB400 + 18BFFF) */}
          <ClientCircle size={120}>
            <svg viewBox="0 0 60 60" fill="none" width="54%" height="54%">
              <rect x="2"  y="6"  width="34" height="24" rx="4" fill="#FCB400"/>
              <rect x="24" y="30" width="34" height="24" rx="4" fill="#18BFFF"/>
              <rect x="2"  y="36" width="18" height="18" rx="3" fill="#FCB400" opacity="0.75"/>
            </svg>
          </ClientCircle>

          {/* 180px left — indigo constellation (A4BCFD/6172F3/3538CD) */}
          <ClientCircle size={180}>
            <svg viewBox="0 0 80 80" fill="none" width="52%" height="52%">
              <circle cx="40" cy="40" r="28" stroke="#3538CD" strokeWidth="3.5" fill="none"/>
              <circle cx="40" cy="14" r="7"  fill="#A4BCFD"/>
              <circle cx="40" cy="66" r="7"  fill="#A4BCFD"/>
              <circle cx="14" cy="40" r="7"  fill="#6172F3"/>
              <circle cx="66" cy="40" r="7"  fill="#6172F3"/>
              <circle cx="21" cy="21" r="5"  fill="#3538CD"/>
              <circle cx="59" cy="59" r="5"  fill="#3538CD"/>
              <rect   x="37"  y="37" width="6" height="6" rx="1.5" fill="#3538CD"/>
            </svg>
          </ClientCircle>

          {/* 270px centre — ILS logo */}
          <div style={{
            width:          "clamp(90px,14.06vw,270px)",
            aspectRatio:    "1/1",
            borderRadius:   "50%",
            background:     "#181818",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
            zIndex:         2,
          }}>
            <img
              src="/image 777.png"
              alt="ILS"
              style={{ width:"61%", height:"61%", objectFit:"contain" }}
            />
          </div>

          {/* 180px right — two-tone overlap (F38744 orange + 2E90FA blue) */}
          <ClientCircle size={180}>
            <svg viewBox="0 0 80 80" fill="none" width="52%" height="52%">
              <circle cx="27" cy="40" r="19" fill="#F38744"/>
              <circle cx="53" cy="40" r="19" fill="#2E90FA" opacity="0.88"/>
            </svg>
          </ClientCircle>

          {/* 120px right — teal triangle (2A9D8F) */}
          <ClientCircle size={120}>
            <svg viewBox="0 0 60 60" fill="none" width="54%" height="54%">
              <path d="M6 54 L30 6 L54 54 Z" stroke="#2A9D8F" strokeWidth="4" strokeLinejoin="round" fill="none"/>
              <circle cx="30" cy="36" r="10" fill="#2A9D8F"/>
            </svg>
          </ClientCircle>

          {/* 90px right — rotated pill pair (2E90FA + EFD515) */}
          <ClientCircle size={90}>
            <svg viewBox="0 0 48 48" fill="none" width="52%" height="52%">
              <rect x="6"  y="8"  width="36" height="14" rx="7" fill="#2E90FA" transform="rotate(-12 24 24)"/>
              <rect x="6"  y="26" width="36" height="14" rx="7" fill="#EFD515" transform="rotate(-12 24 24)"/>
            </svg>
          </ClientCircle>

          {/* 80px right — coral target rings (F07167) */}
          <ClientCircle size={80}>
            <svg viewBox="0 0 40 40" fill="none" width="56%" height="56%">
              <circle cx="20" cy="20" r="15" stroke="#F07167" strokeWidth="2.5" fill="none"/>
              <circle cx="20" cy="20" r="9"  stroke="#F07167" strokeWidth="2.5" fill="none"/>
              <circle cx="20" cy="20" r="3"  fill="#F07167"/>
            </svg>
          </ClientCircle>
        </div>

        {/* Book A Call — Figma: w:196 h:56 r:28, bottom:68px */}
        <div style={{
          position:  "absolute",
          zIndex:    2,
          left:      "50%",
          bottom:    "clamp(28px,3.54vw,68px)",
          transform: "translateX(-50%)",
        }}>
          <GreenBtn href="/contact" width={196}>Book A Call</GreenBtn>
        </div>
      </section>

      {/* ─── 8. TESTIMONIALS ─── */}
      {/*
        Figma 1920×1080 white section.
        Quote card: 879×358px, border-radius:60px, bg:#F3F4F6, centred.
        Profile images absolutely positioned (scattered): Figma positions scaled to %.
          Left:  Ellipse 263 (125px @8.4%,20%), Ellipse 268 (216px @10.6%,43%), Ellipse 266 (74px @3.7%,40%), Ellipse 267 (123px @2%,63%)
          Right: Ellipse 270 (146px @85.6%,20%), Ellipse 269 (295px @82.7%,53%)
      */}
      <section style={{
        position:   "relative",
        background: RS.white,
        overflow:   "hidden",
        minHeight:  "clamp(480px,56.25vw,1080px)",
        display:    "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent:"center",
        padding:    "clamp(60px,9.3vh,100px) 0",
      }}>
        {/* Heading */}
        <h2 style={{
          position:    "relative",
          zIndex:      1,
          fontSize:    "clamp(22px,2.5vw,48px)",
          fontWeight:  400,
          color:       RS.black,
          textAlign:   "center",
          marginBottom:"clamp(24px,4vh,48px)",
          fontFamily:  RS.font,
          padding:     "0 clamp(16px,2vw,40px)",
        }}>
          What our customer says <em>About Us</em>
        </h2>

        {/* Scattered profile images — absolute, z:0 */}
        {/* Left side */}
    {/* Left side */}
{/* Left side */}
{/* Left side */}
<ProfileDot size={125} left="8.4vw"  top="19.95vh" src={profileImages[0]} />
<ProfileDot size={74}  left="3.7vw"  top="39.86vh" src={profileImages[1]} />
<ProfileDot size={216} left="10.6vw" top="43.01vh" src={profileImages[2]} />
<ProfileDot size={123} left="2vw"    top="63.01vh" src={profileImages[3]} />

{/* Right side — matched to screenshot */}
<ProfileDot size={125} left="83.2vw" top="19.95vh"     src={profileImages[4]} />
<ProfileDot size={74}  left="91.5vw" top="39.86vh"    src={profileImages[5]} />
<ProfileDot size={216} left="80vw"   top="43.01vh"    src={profileImages[6]} />
<ProfileDot size={123} left="90vw"   top="67.01vh"    src={profileImages[7]} />
        {/* Quote card — Figma: 879×358px, radius 60, bg #F3F4F6 */}
        <div style={{
          position:     "relative",
          zIndex:       1,
          background:   RS.gray,
          borderRadius: 60,
          width:        "clamp(280px,45.78vw,879px)",
          padding:      "clamp(24px,2.9vh,56px) clamp(24px,3.13vw,60px)",
        }}>
          {/* Opening inverted comma — Figma: left:576 in section = 30% from left of section */}
          <div style={{
            fontSize:   "clamp(40px,3.6vw,69px)",
            lineHeight: 1,
            color:      RS.black,
            fontFamily: "Georgia,serif",
            marginBottom: "clamp(8px,1vh,16px)",
            opacity:    0.85,
          }}>
            &ldquo;&ldquo;
          </div>

          {/* Testimonial text — Figma: font:30px, line-height:42px, text-align:center */}
          <p style={{
            fontSize:   "clamp(14px,1.56vw,30px)",
            fontWeight: 400,
            lineHeight: "clamp(22px,2.19vw,42px)",
            color:      RS.black,
            textAlign:  "center",
            fontFamily: RS.font,
            margin:     0,
          }}>
            Ivy League Solutions transformed our legacy banking infrastructure. Their AI-powered risk engine cut processing time by 90% and the dedicated team embedded seamlessly with our engineers from day one.
          </p>

          {/* Closing inverted comma — rotated 180°, right-aligned */}
          <div style={{
            fontSize:   "clamp(40px,3.6vw,69px)",
            lineHeight: 1,
            color:      RS.black,
            fontFamily: "Georgia,serif",
            textAlign:  "right",
            marginTop:  "clamp(8px,1vh,16px)",
            transform:  "rotate(180deg)",
            opacity:    0.85,
          }}>
            &ldquo;&ldquo;
          </div>
        </div>
      </section>

      {/* ─── 9. WHY US ─── */}
      {/* Figma: content top=calc(50%-711/2) on 1080px = 184.5px → 17.08vh */}
 <section style={{
  background: RS.black,
  padding:    "clamp(60px,17.08vh,184px) clamp(20px,6.67vw,128px)",
  position:   "relative",
  overflow:   "hidden",
}}>
  <div style={{
    maxWidth:            1480,
    margin:              "0 auto",
    display:             "grid",
    gridTemplateColumns: "minmax(260px,600px) 1fr",
    gap:                 "clamp(40px,5vw,100px)",
    alignItems:          "center",
  }}>

    {/* ── LEFT ── */}
    <div style={{ position:"relative" }}>

      {/* Grid lines */}
      <div style={{ position:"absolute", top:0, left:0, right:0,    height:4, background:"#151515" }} />
      <div style={{ position:"absolute", top:0, bottom:0, right:0,  width:4,  background:"#151515" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:"40%", height:4, background:"#151515" }} />

      {/* Rectangle 7 — team photo */}
      <div style={{
        width:        "clamp(200px,19vw,367px)",
        height:       "clamp(180px,17.7vw,341px)",
        borderRadius: 4,
        overflow:     "hidden",
        marginBottom: 32,
      }}>
        <img
          src="/Rectangle 7.png"
          alt="Team"
          style={{ width:"100%", height:"100%", objectFit:"cover" }}
        />
      </div>

      {/* 14+ stat */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:4 }}>
        <span style={{ fontSize:"clamp(80px,8.5vw,163px)", fontWeight:400, color:RS.white, lineHeight:1, fontFamily:RS.font }}>14</span>
        <span style={{ fontSize:"clamp(24px,2.5vw,48px)", color:RS.white, marginTop:8, fontFamily:RS.font }}>+</span>
      </div>
      <p style={{ fontSize:20, color:RS.white, letterSpacing:"0.05em", fontFamily:RS.font, marginTop:8 }}>
        YEARS IN ENTERPRISE TECH
      </p>
    </div>

    {/* ── RIGHT ── */}
    <div style={{ position:"relative" }}>

      <p style={{ fontSize:20, fontWeight:400, color:RS.white, marginBottom:16, fontFamily:RS.font }}>
        WHY CHOOSE US
      </p>
      <h2 style={{
        fontSize:     "clamp(28px,3.1vw,60px)",
        fontWeight:   500,
        color:        RS.white,
        lineHeight:   "1.2",
        marginBottom: 24,
        fontFamily:   RS.font,
        maxWidth:     798,
      }}>
        THE IVY LEAGUE DIFFERENCE — WE EMBED, ENGINEER, AND SCALE WITH YOU
      </h2>
      <p style={{
        fontSize:     "clamp(14px,1.25vw,24px)",
        color:        "rgba(255,255,255,0.8)",
        lineHeight:   "32px",
        marginBottom: 40,
        fontFamily:   RS.font,
        maxWidth:     583,
      }}>
        We don't just build software — we embed with your team, understand your operations, and engineer solutions with enterprise-grade security, AI-first architecture, and dedicated support that actually scales.
      </p>
      <GreenBtn href="/contact">Start a Project</GreenBtn>

      {/* Rectangle 8 — cafe woman image */}
      <div style={{
        position:     "absolute",
        right:        "clamp(-80px,-4vw,-20px)",
        bottom:       "clamp(-120px,-8vh,-60px)",
        width:        "clamp(140px,13.7vw,263px)",
        height:       "clamp(200px,20.9vw,401px)",
        borderRadius: 4,
        overflow:     "visible",
      }}>
        <div style={{ width:"100%", height:"100%", borderRadius:4, overflow:"hidden" }}>
          <img
            src="/Rectangle 8.png"
            alt="Professional"
            style={{ width:"100%", height:"100%", objectFit:"cover" }}
          />
        </div>

        {/* White circle badge */}
        <div style={{
          position:       "absolute",
          bottom:         "clamp(30px,3vh,60px)",
          left:           "clamp(-52px,-3vw,-40px)",
          width:          "clamp(60px,5.4vw,104px)",
          height:         "clamp(60px,5.4vw,104px)",
          borderRadius:   "50%",
          background:     RS.white,
          boxShadow:      "0px 0px 4px rgba(163,163,163,0.25)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
        }}>
          <img
            src="/image 762.png"
            alt=""
            style={{ width:"clamp(28px,2.2vw,43px)", height:"clamp(31px,2.4vw,47px)", objectFit:"contain" }}
          />
        </div>
      </div>

    </div>
  </div>
</section>
{/* ── CTA / Blog Carousel Section ── */}
<section style={{
  position:   "relative",
  background: RS.white,
  overflow:   "hidden",
  height:     "clamp(380px,39.7vw,762px)",
  display:    "flex",
  flexDirection: "column",
  justifyContent: "center",
}}>

  {/* Auto-scrolling strip */}
  <div style={{ overflow: "hidden", marginBottom: "clamp(24px,3vh,48px)" }}>
    <div style={{
      display:   "flex",
      gap:       "clamp(6px,0.8vw,16px)",
      animation: "ctaScroll 30s linear infinite",
      width:     "max-content",
    }}>
      {[...Array(2)].flatMap(() => [
         "/cta.png",
        "/cta2.png",
        "/cta3.png",
        "/cta4.png",
      ]).map((src, i) => (
        <div key={i} style={{
          flexShrink:   0,
          width:        "clamp(180px,27.3vw,524px)",
          height:       "clamp(100px,15.3vw,294px)",
          borderRadius: 6,
          overflow:     "hidden",
          background:   "#e5e7eb",
        }}>
          <img
            src={src}
            alt=""
            style={{ width:"100%", height:"100%", objectFit:"cover" }}
          />
        </div>
      ))}
    </div>
  </div>

  {/* Text */}
  <div style={{ textAlign:"center", padding:"0 clamp(16px,2vw,40px)" }}>
    <p style={{
      fontSize:      "clamp(28px,2.9vw,56px)",
      fontWeight:    400,
      color:         RS.black,
      letterSpacing: "-0.025em",
      lineHeight:    "1.18",
      fontFamily:    RS.font,
      marginBottom:  8,
    }}>
      Enterprise Solutions
    </p>
<p style={{
  fontSize:   "clamp(16px,1.56vw,30px)",
  fontWeight: 400,
  color:      RS.black,
  lineHeight: "clamp(24px,2.19vw,42px)",
  fontFamily: RS.font,
  width:      "clamp(280px,31.1vw,597px)",
  margin:     "0 auto",
  textAlign:  "center",
}}>
  Partner with a globally recognized team across fintech, healthcare, ERP, and beyond to achieve real outcomes.
</p>
  </div>

</section>

<style>{`
  @keyframes ctaScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
`}</style>

{/* Keyframe for scroll animation */}
<style>{`
  @keyframes ctaScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
`}</style>


      {/* ─── 10. CHOOSE YOUR PATH ─── */}
   {/* ── CTA Section ── */}
<section style={{
  position:   "relative",
  background: RS.white,
  overflow:   "hidden",
  minHeight:  "clamp(500px,52.4vw,1006px)",
  display:    "grid",
  gridTemplateColumns: "minmax(260px,535px) 1fr",
  gap:        "clamp(40px,5vw,100px)",
  padding:    "clamp(40px,9.7vw,187px) clamp(20px,7.3vw,140px)",
  alignItems: "center",
}}>

  {/* ── LEFT ── */}
  <div>
    <h2 style={{
      fontSize:     "clamp(48px,6.25vw,120px)",
      fontWeight:   700,
      color:        RS.black,
      lineHeight:   "1.13",
      fontFamily:   RS.font,
      marginBottom: "clamp(24px,3.7vw,72px)",
    }}>
      Choose your path now
    </h2>
    <p style={{
      fontSize:   "clamp(14px,1.25vw,24px)",
      fontWeight: 400,
      color:      RS.black,
      lineHeight: "1.5",
      fontFamily: RS.font,
      maxWidth:   360,
    }}>
      Whether you need enterprise software, AI systems, or digital infrastructure — we deliver at scale with a dedicated team and guaranteed outcomes.
    </p>
  </div>

  {/* ── RIGHT — accordion-style link list ── */}
  <div style={{ maxWidth: 645 }}>
    {[
      { label: "Start a Project",            href: "/contact"   },
      { label: "View Our Portfolio",         href: "/portfolio" },
      { label: "Book a Discovery Call",      href: "/contact"   },
      { label: "Explore Our AI Capabilities", href: "/services" },
      { label: "Talk to Us",                 href: "/contact"   },
    ].map(({ label, href }, i, arr) => (
      <a
        key={i}
        href={href}
        style={{
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          padding:         "clamp(20px,2.6vw,40px) 0",
          borderTop:       "1px solid #000",
          borderBottom:    i === arr.length - 1 ? "1px solid #000" : "none",
          textDecoration:  "none",
          color:           RS.black,
          fontFamily:      RS.font,
          fontSize:        "clamp(20px,2.08vw,40px)",
          fontWeight:      700,
          lineHeight:      "1.05",
          cursor:          "pointer",
        }}
      >
        {label}
        {/* Arrow — 38px horizontal line with arrowhead */}
        <svg
          width="clamp(24px,1.97vw,38px)"
          height="12"
          viewBox="0 0 38 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, marginLeft: 16 }}
        >
          <line x1="0" y1="6" x2="32" y2="6" stroke="#000" strokeWidth="3.4"/>
          <path d="M26 1L32 6L26 11" stroke="#000" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </a>
    ))}
  </div>

</section>

      <style>{`.path-link:hover { color: #555 !important; }`}</style>
    </div>
  );
}

function ProfileDot({ size, left, top, src }: { size: number; left: string; top: string; src: string }) {
  const s = `clamp(${Math.round(size * 0.35)}px,${(size / 19.2).toFixed(1)}vw,${size}px)`;
  return (
    <div style={{
      position:     "absolute",
      width:        s,
      height:       s,
      left,
      top,
      borderRadius: "50%",
      background:   "linear-gradient(135deg,#d1d5db 0%,#9ca3af 100%)",
      zIndex:       0,
      overflow:     "hidden",
    }}>
      <img
        src={src}
        alt=""
        style={{
          width:     "100%",
          height:    "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

function ClientCircle({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <div style={{
      width:          `clamp(${Math.round(size*0.32)}px,${(size/19.2).toFixed(2)}vw,${size}px)`,
      aspectRatio:    "1/1",
      borderRadius:   "50%",
      background:     "#181818",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      flexShrink:     0,
    }}>
      {children}
    </div>
  );
}

function HowCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={{
      background:    "#FFFFFF",
      borderRadius:  22,
      padding:       "48px 40px",
      boxShadow:     "0 13px 100px rgba(199,199,199,0.25)",
      minHeight:     280,
    }}>
      <div style={{
        width:          78,
        height:         81,
        background:     "#FFFFFF",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        marginBottom:   24,
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize:24, fontWeight:700, color:"#000", marginBottom:16, lineHeight:"40px", letterSpacing:"-0.32px", fontFamily:"'DM Sans','Inter',system-ui,sans-serif" }}>
        {title}
      </h3>
      <p style={{ fontSize:16.5, fontWeight:400, color:"#000", lineHeight:"28px", maxWidth:280, fontFamily:"'DM Sans','Inter',system-ui,sans-serif" }}>
        {desc}
      </p>
    </div>
  );
}

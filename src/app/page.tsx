import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ivy League Solutions — Enterprise Software, AI & Digital Infrastructure",
};


const GreenBtn = ({
  href, children, width = 196,
}: { href: string; children: React.ReactNode; width?: number }) => (
  <Link href={href} className={styles.greenBtn} style={{ width }}>
    {children}
  </Link>
);

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">

      {/* ─── 1. HERO ─── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg} />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroWhiteStrip} />

        {/* green stats card */}
        <div className={styles.heroStatsCard}>
          <p className={`${styles.heroStatsText} ${styles.heroStatsTextTop}`}>
            Trusted globally for custom technology, built for enterprise — from fintech to healthcare.
          </p>
          <p className={`${styles.heroStatsText} ${styles.heroStatsNum}`}>120+</p>
          <p className={`${styles.heroStatsText} ${styles.heroStatsTextBottom}`}>
            Companies hired through Ivy League Solutions
          </p>
        </div>

        <h1 className={styles.heroH1}>
          Enterprise Software & AI Delivery
        </h1>

        <p className={styles.heroSubtitle}>
          Ivy League Solutions delivers premium custom software, AI systems, and digital infrastructure — engineered for enterprises across fintech, healthcare, logistics, and beyond.
        </p>

        <Link href="/contact" className={styles.heroCtaLink}>
          Start a Project →
        </Link>
      </section>

      {/* ─── 2. WHAT WE DO ─── */}
      <section className={styles.whatWeDoSection}>
        <div className={styles.whatWeDoInner}>

          {/* Left column */}
          <div>
            <p className={styles.whatWeDoLabel}>SERVICES</p>
            <h2 className={styles.whatWeDoH2}>What we do</h2>
            <p className={styles.whatWeDoDesc}>
              End-to-end technology services tailored for every industry and every scale — from custom software to AI, infrastructure, and beyond.
            </p>
            <div style={{ marginTop: 30 }}>
              <GreenBtn href="/contact">Get In Touch</GreenBtn>
            </div>
          </div>

          {/* Right: 2×2 service cards */}
          <div className={styles.serviceCardsGrid}>
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
                <div className={styles.serviceCardIconWrap}>{s.icon}</div>
                <h3 className={styles.serviceCardTitle}>{s.title}</h3>
                <p className={styles.serviceCardDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. EXCELLENCE STATS ─── */}
      <section className={styles.statsSection}>
        <div className={styles.statsMapBg}>
          <svg
            viewBox="0 0 2036 980"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{ transform:"rotate(180deg)", opacity:1 }}
            fill="#F2F2F2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M197 113 Q220 90 260 85 Q290 80 320 95 Q350 108 370 130 Q400 160 410 190 Q430 230 420 260 Q410 290 390 310 Q370 340 350 360 Q330 390 310 410 Q280 440 260 460 Q240 485 230 510 Q220 535 215 555 Q205 580 195 600 L190 590 Q185 565 190 540 Q195 515 200 490 Q205 460 210 435 Q215 405 210 380 Q205 350 195 325 Q180 295 170 265 Q160 235 165 210 Q170 180 185 155 Z"/>
            <path d="M370 22 Q400 18 430 25 Q455 35 460 55 Q465 75 445 88 Q425 98 400 92 Q375 85 362 68 Q352 50 370 22 Z"/>
            <path d="M310 500 Q330 490 355 495 Q380 500 400 520 Q425 545 430 575 Q435 610 425 645 Q415 680 400 710 Q385 740 365 760 Q340 775 320 770 Q295 760 280 740 Q260 715 255 685 Q250 650 260 620 Q270 585 280 555 Q290 528 310 500 Z"/>
            <path d="M900 65 Q920 55 945 60 Q970 68 985 85 Q995 105 988 125 Q980 145 960 155 Q940 162 918 155 Q895 145 885 125 Q878 105 888 85 Z"/>
            <path d="M940 155 Q960 150 978 162 Q995 178 990 198 Q982 218 960 225 Q938 228 922 215 Q908 198 915 178 Q924 160 940 155 Z"/>
            <path d="M950 250 Q975 235 1005 240 Q1035 248 1055 270 Q1075 295 1080 325 Q1085 360 1075 395 Q1063 430 1045 460 Q1025 492 1000 515 Q972 535 945 530 Q918 522 900 498 Q882 472 878 440 Q875 405 882 372 Q892 335 910 305 Q928 275 950 250 Z"/>
            <path d="M1100 85 Q1150 70 1210 75 Q1270 82 1320 100 Q1380 122 1420 150 Q1460 180 1475 215 Q1488 250 1475 280 Q1462 308 1435 325 Q1405 340 1370 338 Q1330 334 1290 318 Q1245 298 1210 270 Q1170 238 1148 200 Q1125 162 1110 130 Q1098 105 1100 85 Z"/>
            <path d="M1480 280 Q1505 270 1530 278 Q1552 288 1560 308 Q1565 328 1552 345 Q1538 360 1515 362 Q1492 360 1480 342 Q1468 322 1475 303 Z"/>
            <path d="M1580 155 Q1595 148 1610 155 Q1622 165 1618 180 Q1612 193 1598 196 Q1584 196 1577 183 Q1570 168 1580 155 Z"/>
            <path d="M1540 540 Q1575 525 1615 530 Q1655 538 1680 562 Q1705 588 1708 620 Q1710 652 1695 680 Q1678 705 1650 718 Q1620 728 1590 720 Q1558 710 1538 686 Q1518 660 1518 628 Q1518 596 1535 570 Z"/>
            <path d="M858 95 Q868 88 880 92 Q890 100 887 112 Q882 122 870 124 Q858 122 854 110 Q851 99 858 95 Z"/>
          </svg>
        </div>

        <h2 className={styles.statsTitle}>
          Redefining Enterprise-Grade Solutions, Built on Trust
        </h2>

        <div className={styles.statsRow}>
          {[
            { num:"200+", label:"Projects Delivered"    },
            { num:"98%",  label:"Client Satisfaction"   },
            { num:"15+",  label:"Industries Served"     },
            { num:"90%",  label:"Faster Processing Time"},
          ].map((s) => (
            <div key={s.label}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. HOW IT WORKS ─── */}
      <section className={styles.howSection}>
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>
          {/* Row 1 */}
          <div className={styles.howRow1}>
            <div className={styles.howDarkCard}>
              <div>
                <h2 className={styles.howDarkCardTitle}>How Ivy League Delivers</h2>
              </div>
              <div>
                <Link href="/contact" className={styles.howDarkCardCta}>
                  See More
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </Link>
              </div>
            </div>

            <HowCard
              styles={styles}
              icon={<svg width="60" height="59" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
              title="Understand Your Goals"
              desc="We take time to understand your business domain, technical requirements, and enterprise objectives before writing a single line of code."
            />
          </div>

          {/* Row 2 */}
          <div className={styles.howRow2}>
            <HowCard
              styles={styles}
              icon={<svg width="72" height="71" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              title="Dedicated Team Assembly"
              desc="You get a named project manager, senior engineers, and a QA lead — purpose-built for your project and vertical."
            />
            <HowCard
              styles={styles}
              icon={<svg width="59" height="59" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
              title="Agile Development"
              desc="We build in iterative sprints with full transparency — demos, reviews, and course corrections at every milestone."
            />
            <HowCard
              styles={styles}
              icon={<svg width="59" height="59" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>}
              title="Post-Launch Support"
              desc="24/7 monitoring, SLA-backed incident response, and proactive performance tuning long after go-live."
            />
          </div>
        </div>
      </section>

      {/* ─── 5. MARKETING AGENCIES ─── */}
      <section className={styles.marketingSection}>
        <div className={styles.marketingRightPanel} />

        <Link href="/services" className={styles.marketingArrowBtn}>
          <svg width="25" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </Link>

        <div className={styles.marketingServicesBtn}>
          <GreenBtn href="/services" width={196}>Our Services</GreenBtn>
        </div>

        <div className={styles.marketingTextOverlay}>
          <p className={styles.marketingLabel}>DEEP EXPERTISE ACROSS</p>
          <h2 className={styles.marketingH2}>EVERY ENTERPRISE VERTICAL</h2>
        </div>
      </section>

      {/* ─── 6. AI-FIRST DELIVERY ─── */}
      <section className={styles.aiSection}>
        <p className={styles.aiLabel}>SERVICES</p>
        <h2 className={styles.aiTitle}>AI-First Delivery</h2>
        <p className={styles.aiBody}>
          Production-grade AI systems for Fintech, Healthcare, and enterprise operations — deployed globally with MLOps, LLMs, and intelligent automation at the core of every solution.
        </p>
        <Link href="/contact" className={styles.aiLearnMore}>Learn More</Link>

        <div className={styles.aiCardsCol}>
          {([
            {
              fontSize: 23.2563,
              title: "Fraud Detection & Risk AI",
              desc:  "Real-time ML models that identify fraud patterns, assess credit risk, and automate compliance decisions at scale for fintech and banking platforms.",
              icon: (
                <svg width="24.39" height="24.39" viewBox="0 0 24.39 24.39">
                  <rect x="11.43" y="6.86" width="1.54" height="10.67" fill="#fff"/>
                </svg>
              ),
              bodyLeft: 33,
              bodyTop:  78,
            },
            {
              fontSize: 22.6844,
              title: "Predictive Analytics",
              desc:  "Data pipelines and analytics platforms that surface business intelligence, demand forecasting, and operational insights across your enterprise.",
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
            <div key={item.title} className={styles.aiCard}>
              <div className={styles.aiCardIconWrap}>
                <div className={styles.aiCardIconBox}>{item.icon}</div>
                <div className={styles.aiCardIconTitle} style={{ fontSize: item.fontSize }}>
                  {item.title}
                </div>
              </div>
              <p className={styles.aiCardBody} style={{ left: item.bodyLeft, top: item.bodyTop }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 7. OUR CLIENTS ─── */}
      <section className={styles.clientsSection}>
        {([
          { d:597,  op:0.35 },
          { d:997,  op:0.20 },
          { d:1556, op:0.14 },
        ] as { d:number; op:number }[]).map(({ d, op }) => (
          <div key={d} className={styles.clientsRing} style={{
            width:  `clamp(${Math.round(d*0.32)}px,${(d/19.2).toFixed(2)}vw,${d}px)`,
            border: `1px solid rgba(255,255,255,${op})`,
          }} />
        ))}

        <div className={styles.collaborationsPill}>Collaborations</div>

        <h2 className={styles.clientsH2}>OUR CLIENTS</h2>

        <div className={styles.clientsCircleRow}>
          <ClientCircle size={80} styles={styles}>
            <svg viewBox="0 0 40 40" fill="none" width="56%" height="56%">
              <rect x="2"  y="2"  width="16" height="16" rx="2" fill="#A4BCFD"/>
              <rect x="22" y="2"  width="16" height="16" rx="2" fill="#6172F3"/>
              <rect x="2"  y="22" width="16" height="16" rx="2" fill="#6172F3"/>
              <rect x="22" y="22" width="16" height="16" rx="2" fill="#3538CD"/>
            </svg>
          </ClientCircle>

          <ClientCircle size={90} styles={styles}>
            <svg viewBox="0 0 48 48" fill="none" width="52%" height="52%">
              {[0,45,90,135,180,225,270,315].map(a => (
                <rect key={a} x="21.5" y="3" width="5" height="11" rx="2.5" fill="#FF4405" transform={`rotate(${a} 24 24)`}/>
              ))}
              <circle cx="24" cy="24" r="8" fill="#FF4405"/>
            </svg>
          </ClientCircle>

          <ClientCircle size={120} styles={styles}>
            <svg viewBox="0 0 60 60" fill="none" width="54%" height="54%">
              <rect x="2"  y="6"  width="34" height="24" rx="4" fill="#FCB400"/>
              <rect x="24" y="30" width="34" height="24" rx="4" fill="#18BFFF"/>
              <rect x="2"  y="36" width="18" height="18" rx="3" fill="#FCB400" opacity="0.75"/>
            </svg>
          </ClientCircle>

          <ClientCircle size={180} styles={styles}>
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

          {/* ILS logo centre */}
          <div className={styles.clientCenterCircle}>
            <img src="/image 777.png" alt="ILS" style={{ width:"61%", height:"61%", objectFit:"contain" }} />
          </div>

          <ClientCircle size={180} styles={styles}>
            <svg viewBox="0 0 80 80" fill="none" width="52%" height="52%">
              <circle cx="27" cy="40" r="19" fill="#F38744"/>
              <circle cx="53" cy="40" r="19" fill="#2E90FA" opacity="0.88"/>
            </svg>
          </ClientCircle>

          <ClientCircle size={120} styles={styles}>
            <svg viewBox="0 0 60 60" fill="none" width="54%" height="54%">
              <path d="M6 54 L30 6 L54 54 Z" stroke="#2A9D8F" strokeWidth="4" strokeLinejoin="round" fill="none"/>
              <circle cx="30" cy="36" r="10" fill="#2A9D8F"/>
            </svg>
          </ClientCircle>

          <ClientCircle size={90} styles={styles}>
            <svg viewBox="0 0 48 48" fill="none" width="52%" height="52%">
              <rect x="6"  y="8"  width="36" height="14" rx="7" fill="#2E90FA" transform="rotate(-12 24 24)"/>
              <rect x="6"  y="26" width="36" height="14" rx="7" fill="#EFD515" transform="rotate(-12 24 24)"/>
            </svg>
          </ClientCircle>

          <ClientCircle size={80} styles={styles}>
            <svg viewBox="0 0 40 40" fill="none" width="56%" height="56%">
              <circle cx="20" cy="20" r="15" stroke="#F07167" strokeWidth="2.5" fill="none"/>
              <circle cx="20" cy="20" r="9"  stroke="#F07167" strokeWidth="2.5" fill="none"/>
              <circle cx="20" cy="20" r="3"  fill="#F07167"/>
            </svg>
          </ClientCircle>
        </div>

        <div className={styles.clientsBookCall}>
          <GreenBtn href="/contact" width={196}>Book A Call</GreenBtn>
        </div>
      </section>

      {/* ─── 8. TESTIMONIALS ─── */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.testimonialsH2}>
          What our customer says <em>About Us</em>
        </h2>

        {/* Scattered profile images */}
        {[
          { size:125, left:"8.4vw",  top:"19.95vh", src:"/Ellipse 263.png" },
          { size:74,  left:"3.7vw",  top:"39.86vh", src:"/Ellipse 264.png" },
          { size:216, left:"10.6vw", top:"43.01vh", src:"/Ellipse 265.png" },
          { size:123, left:"2vw",    top:"63.01vh", src:"/Ellipse 266.png" },
          { size:125, left:"83.2vw", top:"19.95vh", src:"/Ellipse 267.png" },
          { size:74,  left:"91.5vw", top:"39.86vh", src:"/Ellipse 268.png" },
          { size:216, left:"80vw",   top:"43.01vh", src:"/Ellipse 269.png" },
          { size:123, left:"90vw",   top:"67.01vh", src:"/Ellipse 270.png" },
        ].map((dot) => (
          <ProfileDot key={dot.src} styles={styles} size={dot.size} left={dot.left} top={dot.top} src={dot.src} />
        ))}

        <div className={styles.quoteCard}>
          <div className={styles.quoteOpenMark}>&ldquo;&ldquo;</div>
          <p className={styles.quoteText}>
            Ivy League Solutions transformed our legacy banking infrastructure. Their AI-powered risk engine cut processing time by 90% and the dedicated team embedded seamlessly with our engineers from day one.
          </p>
          <div className={styles.quoteCloseMark}>&ldquo;&ldquo;</div>
        </div>
      </section>

      {/* ─── 9. WHY US ─── */}
      <section className={styles.whyUsSection}>
        <div className={styles.whyUsInner}>

          {/* LEFT */}
          <div className={styles.whyUsLeft}>
            <div className={styles.whyUsLineTop} />
            <div className={styles.whyUsLineRight} />
            <div className={styles.whyUsLineBottom} />

            <div className={styles.whyUsPhotoWrap}>
              <img src="/Rectangle 7.png" alt="Team" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>

            <div className={styles.whyUsStatRow}>
              <span className={styles.whyUsStatNum}>14</span>
              <span className={styles.whyUsStatPlus}>+</span>
            </div>
            <p className={styles.whyUsStatLabel}>YEARS IN ENTERPRISE TECH</p>
          </div>

          {/* RIGHT */}
          <div className={styles.whyUsRight}>
            <p className={styles.whyUsEyebrow}>WHY CHOOSE US</p>
            <h2 className={styles.whyUsH2}>
              THE IVY LEAGUE DIFFERENCE — WE EMBED, ENGINEER, AND SCALE WITH YOU
            </h2>
            <p className={styles.whyUsBody}>
              We don&apos;t just build software — we embed with your team, understand your operations, and engineer solutions with enterprise-grade security, AI-first architecture, and dedicated support that actually scales.
            </p>
            <GreenBtn href="/contact">Start a Project</GreenBtn>

            <div className={styles.whyUsDecorWrap}>
              <div className={styles.whyUsDecorInner}>
                <img src="/Rectangle 8.png" alt="Professional" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div className={styles.whyUsBadge}>
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
      <section className={styles.ctaCarouselSection}>
        <div className={styles.ctaCarouselTrack}>
          <div className={styles.ctaCarouselInner}>
            {[...Array(2)].flatMap(() => ["/cta.png", "/cta2.png", "/cta3.png", "/cta4.png"]).map((src, i) => (
              <div key={i} className={styles.ctaCarouselItem}>
                <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ctaCarouselText}>
          <p className={styles.ctaCarouselHeading}>Enterprise Solutions</p>
          <p className={styles.ctaCarouselSubtext}>
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

      {/* ─── 10. CHOOSE YOUR PATH ─── */}
      <section className={styles.choosePathSection}>
        <div>
          <h2 className={styles.choosePathH2}>Choose your path now</h2>
          <p className={styles.choosePathDesc}>
            Whether you need enterprise software, AI systems, or digital infrastructure — we deliver at scale with a dedicated team and guaranteed outcomes.
          </p>
        </div>

        <div className={styles.choosePathList}>
          {[
            { label: "Start a Project",             href: "/contact"   },
            { label: "View Our Portfolio",          href: "/portfolio" },
            { label: "Book a Discovery Call",       href: "/contact"   },
            { label: "Explore Our AI Capabilities", href: "/services"  },
            { label: "Talk to Us",                  href: "/contact"   },
          ].map(({ label, href }, i, arr) => (
            <a
              key={i}
              href={href}
              className={`${styles.choosePathItem} ${i === arr.length - 1 ? styles.choosePathItemLast : ""}`}
            >
              {label}
              <svg
                width="clamp(24px,1.97vw,38px)"
                height="12"
                viewBox="0 0 38 12"
                fill="none"
                className={styles.choosePathArrow}
              >
                <line x1="0" y1="6" x2="32" y2="6" stroke="#000" strokeWidth="3.4"/>
                <path d="M26 1L32 6L26 11" stroke="#000" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── Sub-components ── */

type StylesType = Record<string, string>;

function ProfileDot({ size, left, top, src, styles }: { size: number; left: string; top: string; src: string; styles: StylesType }) {
  const s = `clamp(${Math.round(size * 0.35)}px,${(size / 19.2).toFixed(1)}vw,${size}px)`;
  return (
    <div className={styles.profileDot} style={{ width: s, height: s, left, top }}>
      <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
    </div>
  );
}

function ClientCircle({ size, children, styles }: { size: number; children: React.ReactNode; styles: StylesType }) {
  return (
    <div
      className={styles.clientCircle}
      style={{ width: `clamp(${Math.round(size*0.32)}px,${(size/19.2).toFixed(2)}vw,${size}px)` }}
    >
      {children}
    </div>
  );
}

function HowCard({ icon, title, desc, styles }: { icon: React.ReactNode; title: string; desc: string; styles: StylesType }) {
  return (
    <div className={styles.howCard}>
      <div className={styles.howCardIconWrap}>{icon}</div>
      <h3 className={styles.howCardTitle}>{title}</h3>
      <p className={styles.howCardDesc}>{desc}</p>
    </div>
  );
}

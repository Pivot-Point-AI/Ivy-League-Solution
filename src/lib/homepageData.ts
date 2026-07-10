import { Package, Users, Globe2, Zap } from "lucide-react";

export const INDUSTRIES = [
  { name: "Fintech",    color: "#34d399", desc: "AI-powered risk engines, payment platforms, and compliance automation built for the speed of modern finance." },
  { name: "Healthcare", color: "#60a5fa", desc: "HIPAA-compliant systems, clinical AI, and patient data platforms engineered for care delivery at scale." },
  { name: "Logistics",  color: "#fbbf24", desc: "Real-time tracking, route optimisation, and warehouse automation that keep supply chains moving." },
  { name: "Enterprise", color: "#a78bfa", desc: "Scalable internal platforms, ERP integrations, and enterprise AI that modernise operations end-to-end." },
  { name: "EdTech",     color: "#f0abfc", desc: "Adaptive learning platforms, LMS systems, and student analytics tools built for outcomes at scale." },
  { name: "Government", color: "#fb923c", desc: "Secure citizen portals, compliance-first infrastructure, and digital-transformation projects for public sector." },
];

export const STATS = [
  { target: 200, suffix: "+", label: "Projects Delivered", sub: "Across industries",            icon: Package, isGlobal: false },
  { target: 98,  suffix: "%", label: "Client Satisfaction", sub: "Long-term partnerships",       icon: Users,   isGlobal: false },
  { target: 0,   suffix: "",  label: "Presence",            sub: "Serving clients worldwide",    icon: Globe2,  isGlobal: true },
  { target: 90,  suffix: "%", label: "Faster Processing",   sub: "Through intelligent automation", icon: Zap,   isGlobal: false },
];

export const TRUSTED_LOGOS = [
  { name: "AWS",        abbr: "AWS" },
  { name: "Azure",      abbr: "AZ"  },
  { name: "Oracle",     abbr: "ORC" },
  { name: "Cisco",      abbr: "CSC" },
  { name: "Fortinet",   abbr: "FTN" },
];

export const SERVICES = [
  { title: "Software Development", description: "End-to-end custom software from concept to deployment. Web, mobile, and enterprise applications built to scale with React, Node.js, .NET, and Python.", img: "/softwaredevelopment.webp", filled: true, from: "#34d399", to: "#22d3ee" },
  { title: "AI & Machine Learning", description: "Production-grade AI systems — fraud detection, predictive analytics, LLMs, and intelligent automation at enterprise scale across fintech and healthcare.", img: "/Managed IT Services.png", filled: true, from: "#a78bfa", to: "#ec4899" },
  { title: "Digital Infrastructure", description: "Network services, datacenter solutions, cloud migration and managed IT infrastructure at enterprise scale on AWS, Azure, Cisco, and Oracle.", img: "/cloudsolution.webp", filled: true, from: "#60a5fa", to: "#22d3ee" },
  { title: "Cybersecurity & SOC", description: "24/7 threat monitoring, incident response, compliance automation, and security operations center with Zero Trust architecture built in.", img: "/cybersecurity.webp", filled: true, from: "#fb923c", to: "#f43f5e" },
];

export const STEPS = [
  {
    num: "01", from: "#22d3ee", to: "#3b82f6",
    title: "Requirements Gathering",
    desc: "We sit down with your stakeholders to map out goals, user needs, and technical constraints — turning your vision into a clear, agreed-upon project brief before any work begins.",
  },
  {
    num: "02", from: "#a78bfa", to: "#ec4899",
    title: "UX / UI Design",
    desc: "Our designers craft wireframes, prototypes, and high-fidelity mockups. You review and approve every screen before a single line of code is written — no surprises later.",
  },
  {
    num: "03", from: "#60a5fa", to: "#22d3ee",
    title: "Agile Development",
    desc: "We build in two-week sprints with full transparency — working demos, live progress boards, and regular check-ins so you stay in control at every milestone.",
  },
  {
    num: "04", from: "#fb923c", to: "#f43f5e",
    title: "QA & Testing",
    desc: "Dedicated QA engineers run functional, performance, and security tests across all environments. We don't ship until the product meets your acceptance criteria — zero critical bugs at launch.",
  },
  {
    num: "05", from: "#34d399", to: "#22d3ee",
    title: "Post-Launch Support",
    desc: "24/7 monitoring, SLA-backed incident response, and proactive performance tuning keep your product healthy long after go-live — so you can focus on growing your business.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "Ivy League Solutions transformed our legacy banking infrastructure. Their AI-powered risk engine cut processing time by 90% and the dedicated team embedded seamlessly with our engineers from day one.",
    name: "James Thornton", role: "Chief Technology Officer", company: "NovaPay Financial", industry: "Fintech",
    stat: "90% faster processing", photo: "https://randomuser.me/api/portraits/men/32.jpg", from: "#22d3ee", to: "#3b82f6",
  },
  {
    quote: "The cybersecurity team deployed a Zero Trust architecture across our entire hospital network in under 8 weeks. Compliance automation alone saved us hundreds of hours per quarter.",
    name: "Dr. Sarah Mitchell", role: "VP of IT & Operations", company: "MedCore Health Systems", industry: "Healthcare",
    stat: "8-week deployment", photo: "https://randomuser.me/api/portraits/women/44.jpg", from: "#a78bfa", to: "#ec4899",
  },
  {
    quote: "From discovery to launch, every sprint had full transparency. The project manager was reachable around the clock and the QA lead caught issues before they ever reached production.",
    name: "Marcus Webb", role: "Director of Engineering", company: "SwiftRoute Logistics", industry: "Logistics",
    stat: "Zero critical bugs at launch", photo: "https://randomuser.me/api/portraits/men/65.jpg", from: "#fb923c", to: "#f43f5e",
  },
  {
    quote: "We needed a partner who could move at startup speed but deliver enterprise-grade quality. Ivy League hit every milestone on time and the platform they built handles millions of transactions daily.",
    name: "Priya Sharma", role: "Head of Product", company: "Crestline Commerce", industry: "Enterprise",
    stat: "Millions of daily transactions", photo: "https://randomuser.me/api/portraits/women/68.jpg", from: "#34d399", to: "#22d3ee",
  },
];

export const BEATS = [
  { label: "Strategy & Consulting", color: "#3b82f6", color2: "#22d3ee" },
  { label: "AI & Machine Learning", color: "#a78bfa", color2: "#ec4899" },
  { label: "Digital Infrastructure", color: "#60a5fa", color2: "#22d3ee" },
  { label: "Cybersecurity & SOC", color: "#fb923c", color2: "#f43f5e" },
  { label: "Software Development", color: "#34d399", color2: "#22d3ee" },
];

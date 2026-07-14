export type Topic = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  image: string;
  video: string;
  from: string;
  to: string;
  headline: string;
  body: string[];
  stat: { value: string; label: string; sub: string };
};

export const TOPICS: Topic[] = [
  {
    slug: "software-development",
    title: "Software Development",
    excerpt: "End-to-end custom software from concept to deployment.",
    tags: ["Business", "Build"],
    readTime: "3 min read",
    image: "/softwaredevelopment.webp",
    video: "/videos/video9.mp4",
    from: "#34d399",
    to: "#22d3ee",
    headline: "Software built to carry the business, not just the demo.",
    body: [
      "Web, mobile, and enterprise applications built to scale with React, Node.js, .NET, and Python.",
      "Two-week sprints, full transparency, and a QA bar that means zero critical bugs at launch.",
    ],
    stat: { value: "200+", label: "Projects Delivered", sub: "Across industries" },
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    excerpt: "Production-grade AI systems for fraud detection, prediction, and automation.",
    tags: ["Business", "AI"],
    readTime: "3 min read",
    image: "/Managed IT Services.png",
   video: "/videos/video5.mp4",
    from: "#a78bfa",
    to: "#ec4899",
    headline: "AI that ships to production, not just to a slide deck.",
    body: [
      "Fraud detection, predictive analytics, LLMs, and intelligent automation deployed at enterprise scale.",
      "Built alongside the teams who own the outcome — fintech, healthcare, and beyond.",
    ],
    stat: { value: "90%", label: "Faster Processing", sub: "Through intelligent automation" },
  },
  {
    slug: "digital-infrastructure",
    title: "Digital Infrastructure",
    excerpt: "Cloud migration and managed infrastructure at enterprise scale.",
    tags: ["Business", "Cloud"],
    readTime: "2 min read",
    image: "/cloudsolution.webp",
    video: "/videos/digital.mp4",
    from: "#60a5fa",
    to: "#22d3ee",
    headline: "Infrastructure that scales ahead of demand, not behind it.",
    body: [
      "Network services, datacenter solutions, and cloud migration on AWS, Azure, Cisco, and Oracle.",
      "Managed IT infrastructure engineered to grow with the business, not slow it down.",
    ],
    stat: { value: "Global", label: "Presence", sub: "Serving clients worldwide" },
  },
  {
    slug: "cybersecurity-soc",
    title: "Cybersecurity & SOC",
    excerpt: "24/7 threat monitoring and Zero Trust architecture.",
    tags: ["Business", "Security"],
    readTime: "2 min read",
    image: "/cybersecurity.webp",
    video: "/videos/cyer2.mp4",
    from: "#fb923c",
    to: "#f43f5e",
    headline: "Security built in at design time, not bolted on after launch.",
    body: [
      "24/7 threat monitoring, incident response, and compliance automation.",
      "Zero Trust architecture deployed across full networks in as little as eight weeks.",
    ],
    stat: { value: "98%", label: "Client Satisfaction", sub: "Long-term partnerships" },
  },
  {
    slug: "the-record",
    title: "The Record",
    excerpt: "Outcomes from the enterprises who trusted us with the hard parts.",
    tags: ["Proof"],
    readTime: "3 min read",
    image: "/landing2.webp",
    video: "/videos/records.mp4",
    from: "#22d3ee",
    to: "#3b82f6",
    headline: "200+ projects delivered. Zero critical bugs at launch.",
    body: [
      "A Zero Trust rollout across an entire hospital network in eight weeks.",
      "A risk engine that cut a bank's processing time by 90%.",
    ],
    stat: { value: "8 wks", label: "Hospital Rollout", sub: "Full Zero Trust deployment" },
  },



  
  {
    slug: "the-standard",
    title: "The Standard",
    excerpt: "Why one accountable team beats four disconnected vendors.",
    tags: ["Approach"],
    readTime: "2 min read",
    image: "/lady2.webp",
    video: "/videos/standard3.mp4",
    from: "#c026d3",
    to: "#3b82f6",
    headline: "Advice is cheap. Execution is the product.",
    body: [
      "A strategy deck isn't a shipped product. A managed tool isn't a secured one.",
      "One team, accountable from requirements through post-launch support.",
    ],
    stat: { value: "1", label: "Accountable Team", sub: "Requirements through support" },
  },
];

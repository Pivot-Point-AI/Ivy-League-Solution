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
    excerpt: "We build the websites, apps, and internal tools your business runs on.",
    tags: ["Business", "Build"],
    readTime: "3 min read",
    image: "/softwaredevelopment.webp",
    video: "/videos/video9.mp4",
    from: "#34d399",
    to: "#22d3ee",
    headline: "Software built to actually run your business — not just look good in a demo.",
    body: [
      "Whether it's a website, a mobile app, or the internal tool your team uses every day, we design and build it to hold up under real, everyday use — not just work for a one-time demo.",
      "We work in short, two-week check-in cycles so you always know what's being built and can course-correct early. Everything is tested thoroughly before it reaches your customers.",
    ],
    stat: { value: "200+", label: "Projects Delivered", sub: "Across industries" },
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    excerpt: "AI that catches fraud, predicts problems, and automates the busywork — working in your day-to-day systems.",
    tags: ["Business", "AI"],
    readTime: "3 min read",
    image: "/Managed IT Services.png",
   video: "/videos/video5.mp4",
    from: "#a78bfa",
    to: "#ec4899",
    headline: "AI that goes live in your business — not just in a slideshow.",
    body: [
      "We build AI that does real work: spotting fraudulent transactions, predicting what's likely to happen next, and automating the repetitive tasks that slow your team down.",
      "It's built with the people who'll actually use it — teams in banking, healthcare, and other industries — so it fits how they really work, not just how it looks on paper.",
    ],
    stat: { value: "90%", label: "Faster Processing", sub: "Through intelligent automation" },
  },
  {
    slug: "digital-infrastructure",
    title: "Digital Infrastructure",
    excerpt: "We move your systems to the cloud and keep them running smoothly, so growth never slows you down.",
    tags: ["Business", "Cloud"],
    readTime: "2 min read",
    image: "/cloudsolution.webp",
    video: "/videos/digital.mp4",
    from: "#60a5fa",
    to: "#22d3ee",
    headline: "Systems that keep up with your growth, instead of slowing it down.",
    body: [
      "We handle your networks, servers, and cloud setup — including moving everything over to platforms like Amazon, Microsoft, and Oracle's cloud services — with little to no disruption to your day-to-day operations.",
      "Once it's set up, we manage it for you, so as your business grows, your systems grow with it instead of holding you back.",
    ],
    stat: { value: "Global", label: "Presence", sub: "Serving clients worldwide" },
  },
  {
    slug: "cybersecurity-soc",
    title: "Cybersecurity & SOC",
    excerpt: "Round-the-clock monitoring to catch threats early and keep your business protected.",
    tags: ["Business", "Security"],
    readTime: "2 min read",
    image: "/cybersecurity.webp",
    video: "/videos/cyer2.mp4",
    from: "#fb923c",
    to: "#f43f5e",
    headline: "Security that's part of the plan from day one, not an afterthought.",
    body: [
      "Our team watches your systems around the clock, catches threats early, responds fast when something happens, and keeps you ready for compliance audits automatically.",
      "We can lock down an entire company's network — verifying every user and device before granting access — in as little as eight weeks.",
    ],
    stat: { value: "98%", label: "Client Satisfaction", sub: "Long-term partnerships" },
  },
  {
    slug: "the-record",
    title: "The Record",
    excerpt: "Real results from real companies who trusted us with the hard problems.",
    tags: ["Proof"],
    readTime: "3 min read",
    image: "/landing2.webp",
    video: "/videos/records.mp4",
    from: "#22d3ee",
    to: "#3b82f6",
    headline: "200+ projects delivered. No major bugs at launch.",
    body: [
      "We secured an entire hospital's computer network in just eight weeks, with no disruption to patient care.",
      "We built a system for a bank that automatically flags risky transactions, cutting the time it takes to process them by 90%.",
    ],
    stat: { value: "8 wks", label: "Hospital Rollout", sub: "Full Zero Trust deployment" },
  },



  
  {
    slug: "the-standard",
    title: "The Standard",
    excerpt: "One team you can call, from planning through the day it goes live and beyond.",
    tags: ["Approach"],
    readTime: "2 min read",
    image: "/lady2.webp",
    video: "/videos/standard3.mp4",
    from: "#c026d3",
    to: "#3b82f6",
    headline: "A good plan means nothing until it's actually working for you.",
    body: [
      "Plenty of firms will hand you a strategy document and call it done. We don't stop until it's actually built, running, and doing what it's supposed to do.",
      "You get one team responsible for the whole thing — from the first conversation about what you need, through launch, and for support afterward. No passing you between vendors, no finger-pointing.",
    ],
    stat: { value: "1", label: "Accountable Team", sub: "Requirements through support" },
  },
];

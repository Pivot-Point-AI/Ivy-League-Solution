import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us — Ivy League Solutions | US IT Consulting Experts",
  description:
    "Learn about Ivy League Solutions — a US-based IT consulting firm with 200+ enterprise deployments in software, cloud, AI, and cybersecurity.",
  path: "/about",
  keywords: ["IT consulting company USA", "about Ivy League Solutions", "enterprise software company"],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

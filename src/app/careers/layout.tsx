import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers at Ivy League Solutions | Join Our US Team",
  description:
    "Explore career opportunities at Ivy League Solutions. Join a team building custom software, AI, and IT solutions for clients across the United States.",
  path: "/careers",
  keywords: ["Ivy League Solutions careers", "IT jobs USA", "software developer jobs"],
});

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

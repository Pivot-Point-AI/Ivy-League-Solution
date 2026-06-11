import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us — Ivy League Solutions | Get a Free Quote",
  description:
    "Get in touch with Ivy League Solutions for custom software, IT, cloud, and AI solutions. Request a free quote and consultation for your US business today.",
  path: "/contact",
  keywords: ["contact Ivy League Solutions", "request a quote IT services", "software development consultation"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "IT Services — Software, AI, Cloud & Cybersecurity | Ivy League",
  description:
    "Comprehensive IT services for US businesses: custom software development, AI/ML, cloud & DevOps, cybersecurity, ERP, and managed network services.",
  path: "/services",
  keywords: ["IT services company USA", "software development services", "managed IT services", "cybersecurity services"],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

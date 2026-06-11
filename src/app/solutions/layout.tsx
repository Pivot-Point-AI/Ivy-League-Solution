import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "IT Solutions for US Businesses | Ivy League Solutions",
  description:
    "Explore Ivy League Solutions' enterprise IT solutions — cloud infrastructure, cybersecurity, ERP, AI, and digital transformation for US businesses.",
  path: "/solutions",
  keywords: ["enterprise IT solutions USA", "digital transformation services", "cloud and cybersecurity solutions"],
});

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

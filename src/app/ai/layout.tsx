import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI & Machine Learning Solutions | Ivy League Solutions",
  description:
    "Production-grade AI solutions for US businesses — LLM integrations, fraud detection, predictive analytics, and intelligent automation built to scale.",
  path: "/ai",
  keywords: ["AI development company USA", "machine learning solutions", "LLM integration services", "AI automation"],
});

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

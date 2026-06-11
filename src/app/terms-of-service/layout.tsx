import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service | Ivy League Solutions",
  description:
    "Review the terms of service governing your use of Ivy League Solutions' website, products, and IT and software development services.",
  path: "/terms-of-service",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

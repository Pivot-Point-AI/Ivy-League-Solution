import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Ivy League Solutions",
  description:
    "Read the Ivy League Solutions privacy policy to understand how we collect, use, and protect your personal information across our website and services.",
  path: "/privacy-policy",
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

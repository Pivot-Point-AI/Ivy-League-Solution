import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const SERVICE_IDS = [
  "software", "ai", "commerce", "modernize", "uiux", "erp", "banking", "web",
  "health", "academia", "cybersecurity", "cloud", "network", "datacenter", "database", "backup",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "", "/about", "/ai", "/careers", "/contact", "/products", "/services", "/solutions",
    "/privacy-policy", "/terms-of-service",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_IDS.map((id) => ({
    url: `${SITE_URL}/services/${id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}

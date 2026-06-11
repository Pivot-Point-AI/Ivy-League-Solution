import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Ivy League Solutions",
    default: "Ivy League Solutions — Custom IT, Software & AI Solutions",
  },
  description:
    "Ivy League Solutions delivers custom software, enterprise IT, cloud, cybersecurity, and AI solutions for businesses across the United States.",
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: { "en-US": SITE_URL },
  },
  openGraph: {
    title: "Ivy League Solutions — Custom IT, Software & AI Solutions",
    description:
      "Custom software, enterprise IT, cloud, cybersecurity, and AI solutions for businesses across the United States.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivy League Solutions — Custom IT, Software & AI Solutions",
    description:
      "Custom software, enterprise IT, cloud, cybersecurity, and AI solutions for businesses across the United States.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Ivy League Solutions delivers custom software development, enterprise IT, cloud, cybersecurity, and AI-powered solutions for businesses across the United States.",
  email: "contact@ivyleaguesolutions.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

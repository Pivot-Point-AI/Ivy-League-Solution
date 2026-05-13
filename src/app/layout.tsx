import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { template: "%s | Ivy League Solutions", default: "Ivy League Solutions — Custom IT & AI Solutions for  " },
  description: "Ivy League Solutions delivers premium custom IT products, enterprise software, and AI-powered solutions for the  n market.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Navbar />
        <main style={{ paddingTop: 60 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

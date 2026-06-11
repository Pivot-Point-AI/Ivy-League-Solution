import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "aibrigade.vercel.app" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery is now first-party and served from /public/brand, so no
    // remote patterns are needed. Add one here if a DAM or CDN is introduced.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

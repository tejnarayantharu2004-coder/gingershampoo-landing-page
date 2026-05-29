import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    domains: ["ik.imagekit.io", "images.unsplash.com", "plus.unsplash.com"],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com"
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com"
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net"
      }
    ]
  }
};

export default nextConfig;

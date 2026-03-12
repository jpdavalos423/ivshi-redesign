import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
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
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      },
      {
        source: "/favicon/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }]
      }
    ];
  }
};

export default nextConfig;

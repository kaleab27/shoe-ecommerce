import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This doesn't work in Next.js
      },
    ],
  }
};

export default nextConfig;

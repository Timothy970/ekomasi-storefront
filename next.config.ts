import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://assets.example.com/account123/**'),
      new URL('https://picsum.photos/**')
    ],
    domains: ['picsum.photos'],
  },
  output: "standalone",
};

export default nextConfig;

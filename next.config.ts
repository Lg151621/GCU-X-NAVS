import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { qualities: [75, 90] },
  // Pin the project root so a lockfile in a parent folder isn't mistaken for the workspace root.
  turbopack: { root: __dirname },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nasa.gov",
      },
    ],
  },
};

export default nextConfig;

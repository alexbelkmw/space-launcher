import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "thespacedevs-dev.nyc3.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages hosts this project under /wikiclubtech-nitin.
  // Override NEXT_PUBLIC_BASE_PATH when deploying somewhere else.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/wikiclubtech-nitin",
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      "i.ibb.co",
      "picsum.photos",
      "api.qrserver.com"
    ],
  },
};

export default nextConfig;

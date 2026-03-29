import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/platform/projects/:id/studio",
        destination: "/platform/projects/:id/build",
        permanent: false,
      },
      {
        source: "/platform/projects/:id/agent",
        destination: "/platform/projects/:id/build",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

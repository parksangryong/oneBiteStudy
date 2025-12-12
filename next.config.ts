import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

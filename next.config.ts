import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Remove typescript config as ignoreDuringBuilds is not a valid option
  /* config options here */
};

export default nextConfig;
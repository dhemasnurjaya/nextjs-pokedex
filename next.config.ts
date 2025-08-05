import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/**"
      ),
    ],
  },
  output: "standalone",
};

export default nextConfig;

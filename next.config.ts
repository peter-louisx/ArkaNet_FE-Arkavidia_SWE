import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
       
        protocol: "https",
        hostname: "karirlab-prod-bucket.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
        search: "",
      }
    ],
  },
};

export default nextConfig;

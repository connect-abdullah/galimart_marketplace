/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Avoid Vercel "Image Optimization" quota on free tier; load originals directly.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

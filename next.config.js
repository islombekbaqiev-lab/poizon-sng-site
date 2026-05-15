/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-img.thepoizon.ru",
        pathname: "/pro-img/cut-img/**",
      },
      {
        protocol: "https",
        hostname: "proxy.b2baisolutions.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [320, 480, 640, 750, 828, 1080],
    imageSizes: [64, 128, 256, 384],
  },
}

module.exports = nextConfig

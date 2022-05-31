/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE,
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com","tailwindui.com"],
  },
};

module.exports = nextConfig;

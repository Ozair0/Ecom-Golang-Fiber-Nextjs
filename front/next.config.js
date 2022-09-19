/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE,
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.NEXT_PUBLIC_BASE_API,
    appMode: process.env.NODE_ENV,
  },
};

module.exports = nextConfig;

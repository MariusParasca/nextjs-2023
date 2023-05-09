/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true, serverComponentsExternalPackages: ['mongoose'] },
  reactStrictMode: true,
};

module.exports = nextConfig;

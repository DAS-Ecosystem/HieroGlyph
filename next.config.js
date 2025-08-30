/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable Server Actions for "use server" in action files
    serverActions: true,
    serverActionsBodySizeLimit: '4mb', // optional, adjust if needed
  },
  swcMinify: true, // optional but recommended for faster builds
};

module.exports = nextConfig;

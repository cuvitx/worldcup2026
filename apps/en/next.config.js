/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/data", "@repo/api", "@repo/ai"],
};

export default nextConfig;

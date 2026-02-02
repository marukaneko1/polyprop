/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@polyprop/ui', '@polyprop/types'],
  images: {
    unoptimized: true,
  },
}

export default nextConfig

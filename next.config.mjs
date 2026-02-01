/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // If deploying to GitHub Pages with a project path (e.g., /polyprop)
  // Uncomment the line below and set your repo name:
  // basePath: '/polyprop',
  // trailingSlash: true,
}

export default nextConfig

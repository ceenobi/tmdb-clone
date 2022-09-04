/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org', 'r4.wallpaperflare.com'],
  },
}

module.exports = nextConfig

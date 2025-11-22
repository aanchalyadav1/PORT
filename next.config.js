/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.res.cloudinary.com' },
      { protocol: 'https', hostname: '**.githubusercontent.com' }
    ]
  }
}

module.exports = nextConfig

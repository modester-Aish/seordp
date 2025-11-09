/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.seordp.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'app.faditools.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.wordpress.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.wp.com',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  staticPageGenerationTimeout: 120,
}

module.exports = nextConfig

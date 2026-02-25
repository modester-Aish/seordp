/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
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
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        pathname: '/**',
      },
    ],
  },
  // output: 'standalone', // disabled: causes build-time chunk errors (404/500/products)
  staticPageGenerationTimeout: 120,
}

module.exports = nextConfig

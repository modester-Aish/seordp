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
  async redirects() {
    return [
      // WordPress slug → app tools list (single SEO tools = complete tools list)
      { source: '/single-seo-tools', destination: '/single-tools-list', permanent: true },
      // Long WordPress landing page → homepage pricing section
      { source: '/cheapest-group-buy-seo-tools-provide-100-premium-tools', destination: '/#pricing', permanent: true },
      { source: '/shop-2', destination: '/products', permanent: true },
      { source: '/refund_returns-2', destination: '/return-and-refund-policy', permanent: true },
    ]
  },
}

module.exports = nextConfig

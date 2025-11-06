import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import HeaderServer from '@/components/HeaderServer'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SEORDP - Modern SEO & Web Development Tools',
    template: '%s | SEORDP',
  },
  description: 'Discover powerful SEO tools, web development resources, and premium products. Built with Next.js and WordPress for optimal performance.',
  keywords: ['seo', 'web development', 'tools', 'resources', 'wordpress', 'nextjs', 'ecommerce', 'rdp'],
  authors: [{ name: 'SEORDP' }],
  creator: 'SEORDP',
  publisher: 'SEORDP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'SEORDP - Modern SEO & Web Development Tools',
    description: 'Discover powerful SEO tools, web development resources, and premium products.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'SEORDP',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEORDP - Modern SEO & Web Development Tools',
    description: 'Discover powerful SEO tools, web development resources, and premium products.',
    creator: '@seordp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <HeaderServer />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

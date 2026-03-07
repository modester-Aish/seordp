import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import HeaderServer from '@/components/HeaderServer'
import Footer from '@/components/Footer'
import FloatingChat from '@/components/FloatingChat'
import BackToTop from '@/components/BackToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SEORDP – Group Buy SEO Tools',
    template: '%s',
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
  metadataBase: new URL('https://seordp.net'),
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/png', sizes: '64x64' },
      { url: '/icon', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/icon',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Modern SEO & Web Development Tools',
    description: 'Discover powerful SEO tools, web development resources, and premium products.',
    url: 'https://seordp.net',
    siteName: 'SEORDP',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://seordp.net/icon', width: 512, height: 512, alt: 'SEORDP' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern SEO & Web Development Tools',
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
  verification: {
    google: '7COb5S87UR-31vp9SChMAtLqfx88VrJJuFzcCzXhUq0',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Suspense fallback={null}>
          <div className="flex min-h-screen flex-col">
            <HeaderServer />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingChat />
            <BackToTop />
          </div>
        </Suspense>
      </body>
    </html>
  )
}

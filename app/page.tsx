import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { generateCanonicalUrl } from '@/lib/canonical';
import { WhyChooseSection, PopularToolsSection, TestimonialsSection, HowToOrderSection } from '@/components/AnimatedSections';
import InteractivePricingCards from '@/components/InteractivePricingCards';
import Typewriter from '@/components/Typewriter';
import FAQSection from '@/components/FAQSection';
import ModernHero from '@/components/ModernHero';
import FeatureSections from '@/components/FeatureSections';

export const metadata: Metadata = {
  title: 'Best Group Buy SEO Tools 2025 - Ahrefs, SEMrush, Moz Pro at 90% OFF | SEORDP',
  description: 'Access 50+ premium SEO tools at 90% discount. Get Ahrefs, SEMrush, Moz Pro, ChatGPT Plus, Canva Pro & more. Join 45,000+ users. Instant setup, 24/7 support from $4.99/month.',
  keywords: 'group buy seo tools, cheap seo tools, ahrefs group buy, semrush group buy, moz pro group buy, best seo tools 2025, affordable seo tools, premium seo tools, seo tools discount, chatgpt plus group buy, canva pro group buy, seo group buy service, shared seo tools, bulk seo tools, seo tools subscription, digital marketing tools, keyword research tools, backlink analysis tools, competitor analysis tools, seo software group buy',
  authors: [{ name: 'SEORDP Team' }],
  creator: 'SEORDP',
  publisher: 'SEORDP',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: { canonical: generateCanonicalUrl('/') },
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
  openGraph: {
    title: 'Best Group Buy SEO Tools 2025 - 50+ Premium Tools at 90% OFF | SEORDP',
    description: 'Get shared access to 50+ premium SEO tools at 90% discount. Join 45,000+ users. Instant setup, 99% uptime. Starting $4.99/month.',
    url: 'https://seordp.net',
    siteName: 'SEORDP',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Group Buy SEO Tools 2025 - 50+ Premium Tools at 90% OFF | SEORDP',
    description: 'Get shared access to 50+ premium SEO tools at 90% discount. Join 45,000+ users. Instant setup, 99% uptime. Starting $4.99/month.',
    creator: '@seordp',
    site: '@seordp',
  },
};

export const revalidate = 21600; // 6 hours

export default async function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Modern Dribbble-Inspired Hero Section */}
      <ModernHero />

      {/* Why Choose SEORDP Section */}
      <WhyChooseSection />

      {/* Popular Tools Section */}
      <PopularToolsSection />

      {/* Feature Sections - Add Your Data Here */}
      <FeatureSections />

      {/* Interactive Pricing Cards Section */}
      <InteractivePricingCards />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* How to Place an Order Section */}
      <HowToOrderSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SEORDP",
            "url": "https://seordp.net",
            "description": "Premium SEO tools and RDP services provider offering access to 50+ tools including Ahrefs, SEMrush at discounted rates.",
            "foundingDate": "2024",
            "sameAs": [
              "https://twitter.com/seordp"
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SEORDP",
            "url": "https://seordp.net",
            "description": "Access premium SEO tools and RDP services at affordable prices",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://seordp.net/products?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Premium SEO Tools Access",
            "description": "Group buy access to premium SEO and digital marketing tools including Ahrefs, SEMrush, Moz Pro, and 50+ other tools",
            "provider": {
              "@type": "Organization",
              "name": "SEORDP"
            },
            "serviceType": "Digital Marketing Tools",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "SEO Tools Packages",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEO Tools Package"
                  },
                  "price": "4.99",
                  "priceCurrency": "USD"
                }
              ]
            }
          })
        }}
        />
      </div>
  );
}

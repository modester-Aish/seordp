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
  title: 'Best Group Buy SEO Tools 2025 - Ahref$, SEMru$h, Moz Pro at 90% OFF | SEORDP',
  description: 'Access 50+ premium SEO tools at 90% discount. Get Ahref$, SEMru$h, Moz Pro, ChatGPT Plus, Canva Pro & more. Join 45,000+ users. Instant setup, 24/7 support from $4.99/month.',
  keywords: 'group buy seo tools, cheap seo tools, ahref$ group buy, semru$h group buy, moz pro group buy, best seo tools 2025, affordable seo tools, premium seo tools, seo tools discount, chatgpt plus group buy, canva pro group buy, seo group buy service, shared seo tools, bulk seo tools, seo tools subscription, digital marketing tools, keyword research tools, backlink analysis tools, competitor analysis tools, seo software group buy',
  authors: [{ name: 'SEORDP Team' }],
  creator: 'SEORDP',
  publisher: 'SEORDP',
  metadataBase: new URL('https://seordp.net'),
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
    title: 'Best Group Buy SEO Tools 2025 - Ahref$, SEMru$h, Moz Pro at 90% OFF | SEORDP',
    description: 'Access 50+ premium SEO tools at 90% discount. Get Ahref$, SEMru$h, Moz Pro, ChatGPT Plus, Canva Pro & more. Join 45,000+ users. Instant setup, 24/7 support.',
    url: 'https://seordp.net',
    siteName: 'SEORDP',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Group Buy SEO Tools 2025 - Ahref$, SEMru$h, Moz Pro at 90% OFF | SEORDP',
    description: 'Access 50+ premium SEO tools at 90% discount. Get Ahref$, SEMru$h, Moz Pro, ChatGPT Plus, Canva Pro & more. Join 45,000+ users. Instant setup, 24/7 support.',
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

      {/* Interactive Pricing Cards Section */}
      <InteractivePricingCards />

      {/* Feature Sections - Content Articles */}
      <FeatureSections />

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
            "description": "Premium SEO tools and RDP services provider offering access to 50+ tools including Ahref$, SEMru$h at discounted rates.",
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
            "description": "Group buy access to premium SEO and digital marketing tools including Ahref$, SEMru$h, Moz Pro, and 50+ other tools",
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

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What Is an SEO Group Buy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SEO group buy allows users to share the cost of SEO tool subscriptions, providing access to premium tools like Ahref$, Moz, and SEMru$h at a lower price."
                }
              },
              {
                "@type": "Question",
                "name": "How Does an SEO Group Buy Work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "When you join SEO group buy, you pool resources with other users to share the cost of SEO tools. This gives you access to high-quality tools like Ahref$ and Semru$h for less."
                }
              },
              {
                "@type": "Question",
                "name": "Are Tools Regularly Updated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, SEO group buy tools such as Semru$h and Ahref$ are regularly updated to ensure you have access to the latest features and data."
                }
              },
              {
                "@type": "Question",
                "name": "Can I Use the Tools for Client Projects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you can use the tools for both your own projects and your clients' projects, as long as you comply with our terms."
                }
              },
              {
                "@type": "Question",
                "name": "How Secure is My Data?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We take your privacy seriously. SEO tools group buy at seordp.net are secured with the latest encryption and data protection measures to ensure your information stays safe."
                }
              }
            ]
          })
        }}
      />

      {/* SiteNavigation Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": "Main Navigation",
            "url": "https://seordp.net",
            "hasPart": [
              {
                "@type": "SiteNavigationElement",
                "name": "Home",
                "url": "https://seordp.net"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Tools Shop",
                "url": "https://seordp.net/single-tools-list"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Pricing Plans",
                "url": "https://seordp.net/pages"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Products",
                "url": "https://seordp.net/products"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Blog",
                "url": "https://seordp.net/blog"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "About Us",
                "url": "https://seordp.net/about-us"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Contact Us",
                "url": "https://seordp.net/contact-us"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Privacy Policy",
                "url": "https://seordp.net/privacy-policy-3"
              },
              {
                "@type": "SiteNavigationElement",
                "name": "Terms of Service",
                "url": "https://seordp.net/terms-of-service"
              }
            ]
          })
        }}
      />
      </div>
  );
}

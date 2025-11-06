import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { generateCanonicalUrl } from '@/lib/canonical';
import { loadHomepageProducts, loadHomepageCategories } from '@/lib/homepage-products';
import CategorySection from '@/components/CategorySection';
import { WhyChooseSection, PopularToolsSection, TestimonialsSection, HowToOrderSection } from '@/components/AnimatedSections';
import InteractivePricingCards from '@/components/InteractivePricingCards';
import Typewriter from '@/components/Typewriter';
import FAQSection from '@/components/FAQSection';
import ModernHero from '@/components/ModernHero';

export const metadata: Metadata = {
  title: 'Premium Software & Services at Affordable Prices | SEORDP',
  description: 'Access professional-grade software and premium services from $4.99/month. Reliable platform with instant activation and 24/7 support.',
  keywords: 'affordable software, premium services subscription, professional tools, digital solutions, software marketplace, business tools 2025, cost-effective software, professional subscriptions, online services platform, software deals, subscription services, budget-friendly tools, premium access, digital services subscription, business software 2025, affordable professional tools, shared software access, premium platform subscription, professional services discount',
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
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
  // Fetch categories and products for the homepage
  let categories: Array<{ id: number; name: string; slug: string; count: number }> = [];
  let products: any[] = [];
  
  try {
    const [homepageProducts, homepageCategories] = await Promise.all([
      loadHomepageProducts(),
      loadHomepageCategories()
    ]);
    
    // Process categories
    if (homepageCategories && homepageCategories.length > 0) {
      categories = homepageCategories.map(cat => ({
        id: cat.id,
        name: cat.name === 'Uncategorized' ? 'All Plan' : cat.name,
        slug: cat.slug,
        count: cat.count || 0
      }));
      
      // Move "All Plan" to the beginning
      const allPlanIndex = categories.findIndex(cat => cat.name === 'All Plan');
      if (allPlanIndex > -1) {
        const allPlanCategory = categories.splice(allPlanIndex, 1)[0];
        categories.unshift(allPlanCategory);
      }
    }
    
    // Products
    if (homepageProducts && homepageProducts.length > 0) {
      products = homepageProducts;
    }
  } catch (error) {
    console.error('Error loading homepage data:', error);
  }
  
  // Fallback data
  if (categories.length === 0) {
    categories = [
      { id: 6, name: 'All Plan', slug: 'uncategorized', count: 1200 },
      { id: 1, name: 'SEO Tools', slug: 'seo-tools', count: 2100 },
      { id: 2, name: 'Marketing Tools', slug: 'marketing-tools', count: 1560 },
      { id: 3, name: 'Analytics Tools', slug: 'analytics-tools', count: 890 },
      { id: 4, name: 'Content Tools', slug: 'content-tools', count: 1200 },
      { id: 5, name: 'RDP Services', slug: 'rdp-services', count: 450 }
    ];
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Modern Dribbble-Inspired Hero Section */}
      <ModernHero />

      {/* Why Choose SEORDP Section */}
      <WhyChooseSection />

      {/* Product Categories Section */}
      {categories.length > 0 && <CategorySection categories={categories} products={products} />}

      {/* Popular Tools Section */}
      <PopularToolsSection />

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
            "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
            "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            "description": "Access premium SEO tools and RDP services at affordable prices",
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/products?search={search_term_string}`,
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

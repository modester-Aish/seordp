import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTools } from '@/lib/tools-data';
import { generateCanonicalUrl } from '@/lib/canonical';
import { getToolProductRedirect } from '@/lib/tool-product-redirects';
import { ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Complete Tools List - All SEO, AI, Design & Marketing Tools | SEORDP',
  description: 'Browse complete list of 50+ premium tools available in our group buy service. Get instant access to Ahrefs, SEMrush, Moz Pro, ChatGPT Plus, Canva Pro & more at 90% discount.',
  keywords: 'complete tools list, all seo tools, group buy tools list, seo tools catalog, premium tools directory, all available tools, tools inventory, seo software list',
  alternates: {
    canonical: generateCanonicalUrl('/single-tools-list'),
  },
  openGraph: {
    title: 'Complete Tools List - All Premium SEO & Marketing Tools | SEORDP',
    description: 'Browse complete list of 50+ premium tools available in our group buy service.',
    url: 'https://seordp.net/single-tools-list',
    type: 'website',
  },
};

export const revalidate = 3600; // Revalidate every hour

// Get tool link - use static redirect mapping from tool-product-redirects.ts
function getToolLink(toolId: string, toolSlug?: string): string {
  if (toolSlug) {
    // Check static redirect mapping first (instant, no API call)
    const productSlug = getToolProductRedirect(toolSlug);
    if (productSlug) {
      // Static redirect exists - use product slug directly (actual product link)
      return `/${productSlug}`;
    }
    // No redirect - use tool slug
    return `/${toolSlug}`;
  }
  // Final fallback: use tool id
  return `/${toolId}`;
}

export default async function SingleToolsListPage() {
  const tools = getAllTools();

  // Group tools by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    const category = tool.category || 'Other Tools';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  const categories = Object.keys(toolsByCategory).sort();

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="section-padding relative overflow-hidden">
        {/* Matrix Background */}
        <div className="absolute inset-0 matrix-container opacity-5">
          <div className="matrix-grid"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
              Complete Tools List
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Browse our complete catalog of <span className="text-teal-400 font-bold">{tools.length}+ premium tools</span> available through our group buy service
            </p>
          </div>

          {/* Tools by Category */}
          <div className="space-y-12">
            {categories.map((category, categoryIndex) => (
              <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-teal-500 to-purple-600 rounded-full"></span>
                    {category}
                    <span className="text-base text-slate-400 font-normal">
                      ({toolsByCategory[category].length} tools)
                    </span>
                  </h2>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {toolsByCategory[category].map((tool) => (
                    <div
                      key={tool.id}
                      className="card-gradient group relative overflow-hidden h-full flex flex-col rounded-xl border border-slate-700 hover:border-teal-500 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20"
                    >
                      {/* Tool Image */}
                      <Link href={getToolLink(tool.id, tool.slug)} className="relative w-full h-40 overflow-hidden bg-slate-800">
                        {tool.image ? (
                          <Image
                            src={tool.image}
                            alt={tool.name}
                            fill
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 flex items-center justify-center">
                            <span className="text-4xl">🔧</span>
                          </div>
                        )}
                      </Link>

                      {/* Tool Info */}
                      <div className="p-5 flex flex-col flex-1">
                        <Link href={getToolLink(tool.id, tool.slug)}>
                          <h3 className="text-lg font-bold text-white mb-2 transition-colors group-hover:text-teal-400 line-clamp-2 min-h-[3rem]">
                            {tool.name}
                          </h3>
                        </Link>

                        {tool.description && (
                          <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1">
                            {tool.description}
                          </p>
                        )}

                        {/* Pricing */}
                        <div className="mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-teal-400">
                              {tool.price}
                            </span>
                            {tool.originalPrice && (
                              <span className="text-sm text-slate-500 line-through">
                                {tool.originalPrice}
                              </span>
                            )}
                          </div>
                          {tool.originalPrice && (
                            <div className="text-xs text-green-400 mt-1">
                              Save {Math.round(((parseFloat(tool.originalPrice.replace('$', '')) - parseFloat(tool.price.replace('$', ''))) / parseFloat(tool.originalPrice.replace('$', ''))) * 100)}%
                            </div>
                          )}
                        </div>

                        {/* Buy Now Button */}
                        <Link
                          href={tool.productId
                            ? `https://members.seotoolsgroupbuy.us/cart/index/product/id/${tool.productId}/c/?`
                            : 'https://members.seotoolsgroupbuy.us/signup'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 btn-primary"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="mt-16 text-center p-8 card-gradient rounded-2xl border border-teal-500/20 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-white mb-4">
              Get Access to All {tools.length}+ Tools
            </h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              Join our group buy service and get instant access to all these premium tools at 90% discount. 
              Starting from just $4.99/month with 24/7 support and instant setup.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold transition-all duration-300 hero-btn-primary"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


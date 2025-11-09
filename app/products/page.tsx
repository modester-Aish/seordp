import { Metadata } from 'next';
import ProductsClient from './ProductsClient';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';
import ProductCard from '@/components/ProductCard';
import { generateCanonicalUrl } from '@/lib/canonical';

export const metadata: Metadata = {
  title: 'Group Buy SEO Tools - Ahrefs, SEMrush, Moz Pro, ChatGPT Plus | SEORDP',
  description: 'Buy premium SEO tools at 90% discount. Get Ahrefs Group Buy, SEMrush, Moz Pro, ChatGPT Plus, Canva Pro & 50+ tools from $4.99/month. Instant access, 24/7 support.',
  keywords: 'group buy seo tools, ahrefs group buy, semrush group buy, moz pro group buy, chatgpt plus group buy, cheap seo tools, premium seo tools discount, seo tools subscription, shared seo tools access, bulk seo tools, affordable seo software',
  openGraph: {
    title: 'Buy Premium Group Buy SEO Tools at 90% OFF - Ahrefs, SEMrush, Moz Pro',
    description: 'Get instant access to 50+ premium SEO tools. Group buy Ahrefs, SEMrush, ChatGPT Plus & more at 90% discount. Starting $4.99/month.',
    url: 'https://seordp.net/products',
    type: 'website',
  },
  alternates: {
    canonical: generateCanonicalUrl('/products'),
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
  const { data: productsData, error } = await fetchAllProductsComplete();

  // Move "AI Content Labs Group Buy" to the end
  let products = productsData;
  if (products && products.length > 0) {
    const aiContentLabsIndex = products.findIndex(p => 
      p.name.toLowerCase().includes('ai content labs')
    );
    
    if (aiContentLabsIndex !== -1) {
      const aiContentLabs = products[aiContentLabsIndex];
      products = [
        ...products.slice(0, aiContentLabsIndex),
        ...products.slice(aiContentLabsIndex + 1),
        aiContentLabs
      ];
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
        <div className="card-gradient p-8 text-center max-w-md">
          <h2 className="mb-2 text-2xl font-bold text-white">Error Loading Products</h2>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
        <div className="card-gradient p-8 text-center max-w-md">
          <h2 className="mb-2 text-2xl font-bold text-white">No Products Found</h2>
          <p className="text-slate-400">Check back later for new products!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Matrix Background */}
      <div className="absolute inset-0 matrix-container opacity-10">
        <div className="matrix-grid"></div>
      </div>

      {/* Hero Section - Small & Clean */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
              <span className="text-teal-400 font-bold text-sm">🛍️ SHOP</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Premium <span className="text-teal-400">Group Buy SEO Tools</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Access Ahrefs, SEMrush, Moz Pro, ChatGPT Plus & 50+ premium tools at 90% discount. Instant activation, 24/7 support, 99% uptime guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Products with Search */}
      <ProductsClient products={products} />
    </div>
  );
}


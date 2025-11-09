import { Metadata } from 'next';
import ProductsClient from './ProductsClient';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore our collection of premium web development tools and resources.',
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
              Browse Our <span className="text-teal-400">Products</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Discover premium software and services at competitive prices
            </p>
          </div>
        </div>
      </section>

      {/* Products with Search */}
      <ProductsClient products={products} />
    </div>
  );
}


'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { WooCommerceProduct } from '@/types/wordpress';

interface ProductsClientProps {
  products: WooCommerceProduct[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const name = product.name.toLowerCase();
    const description = product.short_description?.toLowerCase() || '';
    const categories = product.categories?.map(cat => cat.name.toLowerCase()).join(' ') || '';
    
    return name.includes(query) || description.includes(query) || categories.includes(query);
  });

  return (
    <div className="pb-16 relative z-10">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search products by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Search Results Count */}
          {searchQuery && (
            <div className="mt-3 text-center text-sm text-slate-400">
              Found <span className="font-bold text-teal-400">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
              {searchQuery && (
                <span> for &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;</span>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="card-gradient p-12 max-w-md mx-auto rounded-2xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-3">No Products Found</h3>
              <p className="text-slate-400 mb-6">
                No products match your search &ldquo;<span className="text-white font-semibold">{searchQuery}</span>&rdquo;
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


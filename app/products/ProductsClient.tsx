'use client';

import { useState } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { WooCommerceProduct } from '@/types/wordpress';

interface ProductsClientProps {
  products: WooCommerceProduct[];
}

const PRODUCTS_PER_PAGE = 20; // 4 per row x 5 rows

export default function ProductsClient({ products }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const name = product.name.toLowerCase();
    const description = product.short_description?.toLowerCase() || '';
    const categories = product.categories?.map(cat => cat.name.toLowerCase()).join(' ') || '';
    
    return name.includes(query) || description.includes(query) || categories.includes(query);
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

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
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-slate-800 border-2 border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Search Results Count & Pagination Info */}
          <div className="mt-3 text-center text-sm text-slate-400">
            {searchQuery ? (
              <>
                Found <span className="font-bold text-teal-400">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                <span> for &ldquo;<span className="text-white">{searchQuery}</span>&rdquo;</span>
              </>
            ) : (
              <>
                Showing <span className="font-bold text-teal-400">{startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}</span> of <span className="font-bold text-teal-400">{filteredProducts.length}</span> products
              </>
            )}
          </div>
        </div>

        {/* Products Grid - 4 columns */}
        {currentProducts.length > 0 ? (
          <>
            <div className="products-grid">
              {currentProducts.map((product, index) => (
                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-800 text-white hover:bg-teal-500 hover:scale-105'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first 3, last 3, and pages around current
                    const showPage = 
                      page <= 3 || 
                      page > totalPages - 3 || 
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    if (!showPage) {
                      // Show ellipsis
                      if (page === 4 && currentPage > 5) {
                        return <span key={page} className="px-2 text-slate-500">...</span>;
                      }
                      if (page === totalPages - 3 && currentPage < totalPages - 4) {
                        return <span key={page} className="px-2 text-slate-500">...</span>;
                      }
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-teal-500 text-white scale-110'
                            : 'bg-slate-800 text-white hover:bg-slate-700 hover:scale-105'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-800 text-white hover:bg-teal-500 hover:scale-105'
                  }`}
                >
                  Next
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="card-gradient p-12 max-w-md mx-auto rounded-2xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-3">No Products Found</h3>
              <p className="text-slate-400 mb-6">
                No products match your search &ldquo;<span className="text-white font-semibold">{searchQuery}</span>&rdquo;
              </p>
              <button
                onClick={() => handleSearchChange('')}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}


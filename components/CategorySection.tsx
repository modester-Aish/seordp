'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  image?: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price?: string;
  on_sale: boolean;
  images: Array<{ src: string; alt: string }>;
  categories: Array<{ id: number; name: string; slug: string }>;
}

interface CategorySectionProps {
  categories: Category[];
  products?: Product[];
}

export default function CategorySection({ categories, products = [] }: CategorySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories.length > 0 ? categories[0].slug : '');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Filter WordPress products by selected category
  const displayProducts = products.filter(product => {
    // Show all products for first category
    if (selectedCategory === categories[0]?.slug) {
      return true;
    }
    
    // Filter by category slug
    return product.categories?.some((cat: any) => cat.slug === selectedCategory);
  }).slice(0, 8); // Show maximum 8 products

  // Debug - Detailed
  console.log('📊 Category Debug:');
  console.log('  Categories:', categories.map(c => ({ name: c.name, slug: c.slug })));
  console.log('  Selected:', selectedCategory);
  console.log('  Total Products:', products.length);
  console.log('  Filtered Products:', displayProducts.length);
  
  // Show which products have which categories
  if (displayProducts.length === 0 && products.length > 0) {
    console.log('  ⚠️ No products in this category!');
    console.log('  Available products categories:', 
      products.slice(0, 3).map(p => ({
        name: p.name,
        categories: p.categories?.map(c => c.slug)
      }))
    );
  }

  // Category icons
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('ai')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg';
    if (name.includes('seo')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg';
    if (name.includes('marketing')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlechrome.svg';
    if (name.includes('analytics')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googleanalytics.svg';
    if (name.includes('content')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googledocs.svg';
    if (name.includes('rdp')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/windows.svg';
    if (name.includes('design')) return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg';
    return 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlechrome.svg';
  };

  const getCategoryEmoji = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('ai')) return '🤖';
    if (name.includes('seo')) return '🔍';
    if (name.includes('marketing')) return '📊';
    if (name.includes('analytics')) return '📈';
    if (name.includes('content')) return '📝';
    if (name.includes('rdp')) return '💻';
    if (name.includes('design')) return '🎨';
    return '⚙️';
  };

  return (
    <section className="section-padding bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 matrix-container opacity-10">
        <div className="matrix-grid"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-responsive-4xl font-bold text-white mb-4">
            Explore Our Products
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Discover amazing products across various categories. Find exactly what you&apos;re looking for.
          </p>
        </div>

        {/* Categories Tabs - Dark Theme */}
        <div className="mb-16">
          <div className="mx-auto flex max-w-[1200px] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-lg">
            <div role="tablist" className="relative grid h-16 sm:h-20" style={{ gridTemplateColumns: `repeat(${Math.min(categories.length, 6)}, minmax(0, 1fr))` }}>
              {categories.slice(0, 6).map((category, index) => (
                <div
                  key={category.id}
                  role="tab"
                  aria-selected={selectedCategory === category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`group/tab relative cursor-pointer transition-all duration-300 ${
                    selectedCategory === category.slug ? 'active bg-slate-700' : 'hover:bg-slate-700/50'
                  }`}
                  onMouseEnter={() => setHoveredCategory(category.slug)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  aria-label={`${category.name} Services`}
                >
                  <div className="relative z-[1] flex h-full flex-col items-center justify-center gap-1 px-2 md:flex-row md:gap-2">
                    <div className="shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-slate-900 rounded-lg p-1 shadow-sm">
                      <img 
                        src={getCategoryIcon(category.name)} 
                        alt={category.name}
                        className="w-full h-full object-contain"
                        style={{ filter: 'brightness(0) saturate(100%) invert(56%) sepia(89%) saturate(422%) hue-rotate(126deg) brightness(95%) contrast(101%)' }}
                        loading="eager"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='70' font-size='70'>${getCategoryEmoji(category.name)}</text></svg>`;
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <div className={`whitespace-nowrap text-xs font-medium transition-colors ${
                        selectedCategory === category.slug ? 'text-teal-400 font-bold' : 'text-slate-300'
                      }`}>
                        {category.name.length > 12 ? category.name.substring(0, 12) + '...' : category.name}
                      </div>
                      <div className="hidden md:block">
                        <div className="inline-flex items-center gap-1 rounded-full border border-slate-600 bg-slate-900 px-2 py-0.5 shadow-sm">
                          <span className="text-teal-400 text-xs">⭐</span>
                          <span className="text-xs text-slate-300">{category.count}+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {selectedCategory === category.slug && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid - Dark Theme */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {displayProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="group card-gradient h-[420px] flex flex-col overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <>
                        <img
                          src={product.images[0].src}
                          alt={product.images[0].alt || product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        {product.on_sale && (
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white animate-bounce-gentle"
                               style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                            SALE!
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center border-2 border-dashed border-teal-500/30">
                        <span className="text-4xl">📦</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-teal-400 transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex justify-center items-center mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                        <span className="text-sm text-slate-400 ml-2">(4.9)</span>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-center mb-4 mt-auto">
                      {product.on_sale && product.sale_price ? (
                        <>
                          <span className="text-2xl font-bold text-teal-400">${product.sale_price}</span>
                          <span className="text-slate-500 line-through ml-2 text-sm">${product.regular_price}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-teal-400">${product.price}</span>
                      )}
                      <div className="text-sm text-slate-500">/month</div>
                    </div>
                    
                    {/* Button */}
                    <Link 
                      href={`/${product.slug}`} 
                      className="block w-full btn-primary py-3 text-center font-bold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="card-gradient p-12 text-center rounded-2xl border-2 border-amber-500/20">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No Products in <span className="text-teal-400">
                  {categories.find(c => c.slug === selectedCategory)?.name || 'This Category'}
                </span>
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                We don&apos;t have any products in this category yet. Please check other categories or browse all our available products.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setSelectedCategory(categories[0]?.slug || '')}
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  View All Products
                </button>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all duration-300"
                >
                  Browse Full Catalog
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* View All Products Button */}
        {displayProducts.length > 0 && (
          <div className="text-center mt-12 animate-fade-in-up">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 hero-btn-primary px-8 py-4 shadow-xl"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}


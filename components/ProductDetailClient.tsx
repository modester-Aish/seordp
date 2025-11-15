'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WooCommerceProduct } from '@/types/wordpress';
import ProductCard from './ProductCard';
import { getProductCheckoutUrl, getProductButtonText } from '@/lib/woocommerce-api';
import { getBuyNowUrl } from '@/lib/product-ids';

interface ProductDetailClientProps {
  product: WooCommerceProduct;
  relatedProducts?: WooCommerceProduct[];
}

export default function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isClient, setIsClient] = useState(false);

  // Generate random purchase count on client-side only after hydration
  useEffect(() => {
    setIsClient(true);
    setPurchaseCount(Math.floor(Math.random() * 70) + 30);
  }, []);

  const images = product.images || [];
  const mainImage = images[selectedImage]?.src || '/images/placeholder.jpg';
  const price = product.on_sale && product.sale_price ? product.sale_price : product.price;
  const regularPrice = product.regular_price;
  const isOnSale = product.on_sale && product.sale_price;
  const inStock = product.stock_status === 'instock';
  
  // Calculate savings
  const savings = regularPrice && price ? (parseFloat(regularPrice) - parseFloat(price)).toFixed(2) : '0';
  const savingsPercent = regularPrice && price ? Math.round(((parseFloat(regularPrice) - parseFloat(regularPrice)) / parseFloat(regularPrice)) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0 matrix-container opacity-5">
        <div className="matrix-grid"></div>
      </div>

      <div className="py-8 relative z-10">
        <div className="container mx-auto px-4">
          {/* Main Product Section */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              
              {/* Left Column - Product Image */}
              <div className="animate-fade-in-up">
                <div className="card-gradient p-6 rounded-2xl">
                  {/* Sale Badge */}
                  {isOnSale && (
                    <div className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-bold text-white animate-bounce-gentle"
                         style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                      🔥 SALE! Save ${savings}
                    </div>
                  )}

                  {/* Main Image - Clickable for Zoom */}
                  <div 
                    className="relative aspect-square bg-slate-800 rounded-xl overflow-hidden mb-6 cursor-pointer hover:opacity-90 transition-opacity group"
                    onClick={() => setIsImageZoomed(true)}
                  >
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                    {/* Zoom Hint */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-bold">🔍 Click to Zoom</span>
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {images.length > 1 && (
                    <div className="grid grid-cols-5 gap-2">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === index 
                              ? 'border-teal-500 ring-2 ring-teal-500/50' 
                              : 'border-slate-700 hover:border-teal-500/50'
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt || `${product.name} ${index + 1}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {/* Buy Now Badge */}
                <div className="inline-flex items-center px-3 py-1.5 bg-teal-500/20 border border-teal-500/50 text-teal-400 text-xs font-bold rounded-full">
                  🛒 Buy Now
                </div>

                {/* Product Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {product.name}
                </h1>

                {/* Pricing Section */}
                <div className="p-4 card-gradient rounded-xl border-2 border-teal-500/20">
                  {isOnSale ? (
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-black text-teal-400">
                          ${parseFloat(price).toFixed(2)}
                        </span>
                        <span className="text-lg text-slate-500 line-through">
                          ${parseFloat(regularPrice || '0').toFixed(2)}
                        </span>
                      </div>
                      <div className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                        💰 Save ${savings} ({savingsPercent}% OFF)
                      </div>
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-teal-400">
                      ${parseFloat(price).toFixed(2)}
                    </div>
                  )}
                  <p className="text-slate-400 text-sm mt-1">/month</p>
                </div>

                {/* Key Features - Compact */}
                <div className="space-y-2">
                  {[
                    { icon: '💰', title: '24 Hours Refund Policy', desc: 'Full refund within 24 hours.' },
                    { icon: '➡️', title: 'Direct Access', desc: 'Browser-based, no installation.' },
                    { icon: '🔥', title: 'Instant Activation', desc: 'Immediate access after payment.' },
                    { icon: '🔒', title: 'Data Privacy', desc: 'Your data remains confidential.' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                      <span className="text-lg flex-shrink-0">{feature.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white text-sm mb-0.5">{feature.title}</h3>
                        <p className="text-slate-400 text-xs">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="space-y-3">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-3">
                    <label className="font-semibold text-white text-sm">Quantity:</label>
                    <div className="flex items-center border-2 border-slate-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 bg-slate-800 text-teal-400 hover:bg-slate-700 font-bold text-sm"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-14 text-center bg-slate-800 text-white border-0 focus:ring-0 text-sm"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 bg-slate-800 text-teal-400 hover:bg-slate-700 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  {inStock ? (
                    <a
                      href={product.external_url && product.external_url.trim() 
                        ? product.external_url 
                        : getBuyNowUrl(product.name, product.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl font-bold text-base transition-all duration-300 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-purple-600 text-white hover:scale-105 shadow-xl block text-center"
                    >
                      🛒 {getProductButtonText(product, 'Buy Now')}
                    </a>
                  ) : (
                  <button
                      disabled
                      className="w-full py-3 rounded-xl font-bold text-base transition-all duration-300 bg-slate-700 text-slate-400 cursor-not-allowed"
                  >
                      ❌ Out of Stock
                  </button>
                  )}

                  {/* Stock Status */}
                  <div className={`text-center text-xs font-semibold ${
                    inStock ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {inStock ? '✅ In Stock' : '❌ Currently Unavailable'}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Purchases Banner - Only show after client hydration */}
            {isClient && (
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-center py-3 px-6 rounded-xl mb-8 shadow-lg animate-fade-in-up">
              <span className="font-bold">🔥 {purchaseCount} people purchased this in last 24 hours</span>
            </div>
            )}

            {/* Product Description */}
            {product.description && (
              <div className="card-gradient p-8 rounded-2xl mb-8 animate-fade-in-up">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">📝</span>
                  Product Details
                </h2>
                <div 
                  className="prose prose-lg prose-invert max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
                    prose-li:text-slate-300 prose-li:mb-2
                    prose-strong:text-white prose-strong:font-bold
                    prose-a:text-teal-400 prose-a:no-underline hover:prose-a:text-teal-300
                    prose-ul:my-4 prose-ol:my-4
                    prose-code:text-teal-400 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    prose-pre:bg-slate-800 prose-pre:text-slate-300
                    prose-img:rounded-lg prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Product Attributes */}
            {product.attributes && product.attributes.length > 0 && (
              <div className="card-gradient p-8 rounded-2xl mb-8 animate-fade-in-up">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">⚙️</span>
                  Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.attributes.map((attribute) => (
                    <div key={attribute.id} className="space-y-3">
                      <h3 className="font-bold text-teal-400 text-lg">{attribute.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {attribute.options.map((option, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm font-medium bg-slate-800 text-white border border-slate-700"
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-fade-in-up">
              {product.categories && product.categories.length > 0 && (
                <div className="card-gradient p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4">📂 Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href="/products"
                        className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg text-sm font-semibold hover:bg-teal-500/30 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {product.tags && product.tags.length > 0 && (
                <div className="card-gradient p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-4">🏷️ Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Related Products */}
            {relatedProducts && relatedProducts.length > 0 && (
              <div className="mt-16 animate-fade-in-up">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black text-white mb-4">
                    You Might Also Like
                  </h2>
                  <p className="text-slate-400">Check out these similar products</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.slice(0, 4).map((relatedProduct, index) => (
                    <div 
                      key={relatedProduct.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard product={relatedProduct} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isImageZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" 
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh] p-4">
            <div className="relative w-full h-full">
              <Image
                src={mainImage}
                alt={product.name}
                width={1200}
                height={1200}
                className="object-contain max-h-[85vh] rounded-lg"
              />
            </div>
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Product Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": (product.short_description || product.description || '').replace(/<[^>]*>/g, ''),
            "image": mainImage,
            "sku": product.sku || product.id.toString(),
            "offers": {
              "@type": "Offer",
              "url": `https://seordp.net/${product.slug}`,
              "priceCurrency": "USD",
              "price": price,
              "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            "aggregateRating": product.average_rating ? {
              "@type": "AggregateRating",
              "ratingValue": product.average_rating,
              "reviewCount": product.rating_count || 1
            } : undefined,
            "brand": {
              "@type": "Brand",
              "name": "SEORDP"
            }
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://seordp.net"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://seordp.net/products"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": product.name,
                "item": `https://seordp.net/${product.slug}`
              }
            ]
          })
        }}
      />
    </div>
  );
}


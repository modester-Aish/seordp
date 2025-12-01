'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, Check, ArrowLeft, ExternalLink } from 'lucide-react';
import { Tool } from '@/lib/tools-data';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';
import { matchToolToProduct } from '@/lib/tool-product-matcher';
import { WooCommerceProduct } from '@/types/wordpress';
import { getToolProductRedirect } from '@/lib/tool-product-redirects';

interface ToolDetailClientProps {
  tool: Tool;
  relatedTools?: Tool[];
}

export default function ToolDetailClient({ tool, relatedTools = [] }: ToolDetailClientProps) {
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [matchedProductSlug, setMatchedProductSlug] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    setPurchaseCount(Math.floor(Math.random() * 70) + 30);
    
    // Fetch products and match with tool
    const loadProductMatch = async () => {
      try {
        // First check static redirect mapping
        const staticRedirect = getToolProductRedirect(tool.slug);
        if (staticRedirect) {
          setMatchedProductSlug(staticRedirect);
          return;
        }
        
        // Fallback: Dynamic matching via API
        const { data: products } = await fetchAllProductsComplete();
        if (products && products.length > 0) {
          const matchedProduct = matchToolToProduct(tool, products);
          if (matchedProduct && matchedProduct.status === 'publish') {
            setMatchedProductSlug(matchedProduct.slug);
          }
        }
      } catch (error) {
        console.error('Error loading product match for tool:', error);
      }
    };
    
    loadProductMatch();
  }, [tool]);

  const price = parseFloat(tool.price.replace('$', ''));
  const originalPrice = parseFloat(tool.originalPrice.replace('$', ''));
  const savings = (originalPrice - price).toFixed(2);
  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="min-h-screen bg-slate-900" suppressHydrationWarning>
      {/* Background */}
      <div className="absolute inset-0 matrix-container opacity-5">
        <div className="matrix-grid"></div>
      </div>

      <div className="py-8 relative z-10">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Main Tool Section */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              
              {/* Left Column - Tool Image */}
              <div className="animate-fade-in-up">
                <div className="card-gradient p-6 rounded-2xl">
                  {/* Sale Badge */}
                  <div className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-bold text-white animate-bounce-gentle"
                       style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                    🔥 SAVE {discountPercent}%! Only {tool.price}
                  </div>

                  {/* Main Image */}
                  <div className="relative aspect-square bg-white rounded-xl overflow-hidden mb-6 flex items-center justify-center p-8">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      width={300}
                      height={300}
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-teal-400">{purchaseCount}+</div>
                      <div className="text-xs text-slate-400">Users</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-teal-400">99.9%</div>
                      <div className="text-xs text-slate-400">Uptime</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-teal-400">24/7</div>
                      <div className="text-xs text-slate-400">Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Tool Info */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {/* Category */}
                {tool.category && (
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-sm font-semibold">
                      {tool.category}
                    </span>
                  </div>
                )}

                {/* Tool Name */}
                <h1 className="text-5xl font-bold text-white mb-4">{tool.name}</h1>

                {/* View Product Details Page Button - Prominent placement */}
                {matchedProductSlug && (
                  <Link
                    href={`/${matchedProductSlug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-teal-600 text-white hover:scale-105 shadow-lg mb-4"
                  >
                    <ExternalLink className="h-5 w-5" />
                    View Product Details Page
                  </Link>
                )}

                {/* Rating */}
                <div className="mb-6 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">
                    5.0 ({purchaseCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl text-slate-500 line-through">
                      {tool.originalPrice}
                    </span>
                    <span className="text-5xl font-bold text-white">
                      {tool.price}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-bold text-white"
                          style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                      Save ${savings}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">per month • Cancel anytime</p>
                </div>

                {/* Description */}
                <p className="text-lg text-slate-300 mb-8">{tool.description}</p>

                {/* Features */}
                {tool.features && tool.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Key Features:</h3>
                    <ul className="space-y-3">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-slate-300">
                          <Check className="h-5 w-5 text-teal-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-white mb-2">Quantity:</label>
                  <div className="flex items-center gap-3 w-fit border border-slate-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 bg-slate-800 text-teal-400 hover:bg-slate-700 font-bold"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 text-white font-semibold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 bg-slate-800 text-teal-400 hover:bg-slate-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Buy Now Button */}
                <a
                  href={tool.productId 
                    ? `https://members.seotoolsgroupbuy.us/cart/index/product/id/${tool.productId}/c/?` 
                    : 'https://members.seotoolsgroupbuy.us/signup'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-purple-600 text-white hover:scale-105 shadow-xl block text-center mb-6"
                >
                  <ShoppingCart className="h-5 w-5 inline-block mr-2" />
                  Buy Now
                </a>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-6">
                  <Check className="h-5 w-5 text-teal-400" />
                  <span className="font-semibold text-teal-400">In Stock</span>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>⚡</span>
                    <span>Instant activation after payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔒</span>
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💯</span>
                    <span>99% uptime guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔄</span>
                    <span>Cancel anytime, no questions asked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


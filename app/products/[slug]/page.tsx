import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Star, Check, X } from 'lucide-react';
import {
  fetchAllProducts,
  fetchProductBySlug,
  getFormattedPrice,
  isProductOnSale,
  getProductMainImage,
  getDiscountPercentage,
  isInStock,
  getStockStatusText,
  getProductCheckoutUrl,
  getProductButtonText,
} from '@/lib/woocommerce-api';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const { data: products } = await fetchAllProducts(1, 100);
  
  if (!products) return [];

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: product } = await fetchProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const imageUrl = getProductMainImage(product);
  const price = getFormattedPrice(product);

  return {
    title: product.name,
    description: product.short_description.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.short_description.replace(/<[^>]*>/g, ''),
      type: 'website',
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.short_description.replace(/<[^>]*>/g, ''),
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { data: product, error } = await fetchProductBySlug(params.slug);

  if (error || !product) {
    notFound();
  }

  const imageUrl = getProductMainImage(product);
  const formattedPrice = getFormattedPrice(product);
  const onSale = isProductOnSale(product);
  const discountPercentage = getDiscountPercentage(product);
  const inStock = isInStock(product);
  const stockStatus = getStockStatusText(product);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="section-padding relative overflow-hidden">
        {/* Matrix Background */}
        <div className="absolute inset-0 matrix-container opacity-5">
          <div className="matrix-grid"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Product Images */}
            <div className="animate-fade-in-up">
              <div className="sticky top-24">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-800 border border-slate-700">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {onSale && discountPercentage && (
                    <div className="absolute left-4 top-4 rounded-full px-4 py-2 text-sm font-bold text-white animate-bounce-gentle"
                         style={{
                           background: 'linear-gradient(135deg, #ef4444, #f87171)',
                         }}>
                      -{discountPercentage}% OFF
                    </div>
                  )}
                </div>

                {/* Additional Images */}
                {product.images && product.images.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {product.images.slice(0, 4).map((image, index) => (
                      <div
                        key={image.id}
                        className="relative aspect-square overflow-hidden rounded-lg bg-slate-800 border border-slate-700 hover:border-teal-600 transition-colors cursor-pointer"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt || `${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 25vw, 12.5vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="mb-4 text-responsive-4xl font-bold tracking-tight text-white">
                {product.name}
              </h1>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(parseFloat(product.average_rating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-400">
                {product.average_rating} ({product.rating_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {onSale && product.regular_price && (
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-2xl text-slate-500 line-through">
                    ${parseFloat(product.regular_price).toFixed(2)}
                  </span>
                  <span className="rounded-full px-3 py-1 text-sm font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg, #ef4444, #f87171)',
                        }}>
                    Save {discountPercentage}%
                  </span>
                </div>
              )}
              <div className="text-5xl font-bold text-white">
                {formattedPrice}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                {inStock ? (
                  <Check className="h-5 w-5 text-teal-400" />
                ) : (
                  <X className="h-5 w-5 text-red-400" />
                )}
                <span
                  className={`font-semibold ${
                    inStock ? 'text-teal-400' : 'text-red-400'
                  }`}
                >
                  {stockStatus}
                </span>
              </div>
            </div>

            {/* Short Description */}
            {product.short_description && (
              <div
                className="prose prose-invert mb-6 max-w-none prose-p:text-slate-300"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Add to Cart Button */}
            {inStock ? (
              <a
                href={getProductCheckoutUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-8 flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-300 hero-btn-primary"
              >
                <ShoppingCart className="h-5 w-5" />
                {getProductButtonText(product, 'Add to Cart')}
              </a>
            ) : (
              <button
                className="mb-8 flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-300 cursor-not-allowed bg-slate-700 text-slate-400"
                disabled
              >
                <ShoppingCart className="h-5 w-5" />
                Out of Stock
              </button>
            )}

            {/* Categories */}
            {product.categories && product.categories.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="rounded-full bg-slate-700 border border-slate-600 px-3 py-1 text-sm text-slate-300 hover:border-teal-600 transition-colors"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full px-3 py-1 text-sm text-white"
                      style={{
                        background: 'linear-gradient(135deg, rgba(9, 121, 105, 0.3), rgba(13, 148, 136, 0.3))',
                        border: '1px solid rgba(9, 121, 105, 0.5)',
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Full Description */}
            {product.description && (
              <div className="border-t border-slate-700 pt-8">
                <h2 className="mb-4 text-2xl font-bold text-white">
                  Description
                </h2>
                <div
                  className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-li:text-slate-300"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}


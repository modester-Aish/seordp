import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { WooCommerceProduct } from '@/types/wordpress';
import {
  getFormattedPrice,
  isProductOnSale,
  getProductMainImage,
  getDiscountPercentage,
  isInStock,
} from '@/lib/woocommerce-api';

interface ProductCardProps {
  product: WooCommerceProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getProductMainImage(product);
  const formattedPrice = getFormattedPrice(product);
  const onSale = isProductOnSale(product);
  const discountPercentage = getDiscountPercentage(product);
  const inStock = isInStock(product);

  return (
    <article className="card-gradient group relative overflow-hidden h-full flex flex-col">
      {onSale && discountPercentage && (
        <div className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold text-white animate-bounce-gentle"
             style={{
               background: 'linear-gradient(135deg, #ef4444, #f87171)',
             }}>
          -{discountPercentage}% OFF
        </div>
      )}

      {!inStock && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-slate-700 px-3 py-1 text-xs font-bold text-white">
          Out of Stock
        </div>
      )}

      <Link href={`/${product.slug}`}>
        <div className="relative w-full h-48 overflow-hidden bg-slate-700">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/${product.slug}`}>
          <h3 className="mb-2 text-lg font-bold text-white transition-colors line-clamp-2 min-h-[3.5rem] group-hover:text-teal-400">
            {product.name}
          </h3>
        </Link>

        {product.short_description && (
          <p
            className="mb-3 text-sm text-slate-400 line-clamp-2 min-h-[2.5rem]"
            dangerouslySetInnerHTML={{
              __html: product.short_description,
            }}
          />
        )}

        <div className="mb-4 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(parseFloat(product.average_rating))
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-400">
            ({product.rating_count})
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            {onSale && product.regular_price && (
              <span className="text-sm text-slate-500 line-through">
                ${parseFloat(product.regular_price).toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-bold text-white">
              {formattedPrice}
            </span>
          </div>

          {inStock ? (
            <a
              href="https://members.seotoolsgroupbuy.us/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 btn-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Buy Now
            </a>
          ) : (
            <button
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 bg-slate-700 text-slate-400 cursor-not-allowed"
              disabled
            >
              <ShoppingCart className="h-4 w-4" />
              Sold Out
            </button>
          )}
        </div>
      </div>
    </article>
  );
}


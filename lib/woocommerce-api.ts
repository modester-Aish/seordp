/**
 * WooCommerce helpers and types – safe to use in client and server.
 * For fetching product data (server-only), use @/lib/woocommerce-api-server.
 */
import { WooCommerceProduct } from '@/types/wordpress';
import { toLocalUploadUrl } from '@/lib/content-parser';

const EXCLUDED_DUPLICATE_SLUGS = [
  'combo-mega-pack-tools',
  'combo-seo-tools-ecom-plan',
];

export function isExcludedDuplicate(slug: string): boolean {
  return EXCLUDED_DUPLICATE_SLUGS.includes(slug);
}

export function getProductPrice(product: WooCommerceProduct): string {
  if (product.on_sale && product.sale_price) {
    return product.sale_price;
  }
  return product.regular_price || product.price;
}

export function getFormattedPrice(product: WooCommerceProduct): string {
  const price = getProductPrice(product);
  return `$${parseFloat(price).toFixed(2)}`;
}

export function isProductOnSale(product: WooCommerceProduct): boolean {
  return product.on_sale && !!product.sale_price;
}

export function getProductImageUrl(
  product: WooCommerceProduct,
  index: number = 0
): string | null {
  if (product.images && product.images.length > index) {
    const url = product.images[index].src;
    return toLocalUploadUrl(url) ?? url;
  }
  return null;
}

export function getProductMainImage(product: WooCommerceProduct): string | null {
  return getProductImageUrl(product, 0);
}

export function isInStock(product: WooCommerceProduct): boolean {
  return product.stock_status === 'instock';
}

export function getStockStatusText(product: WooCommerceProduct): string {
  switch (product.stock_status) {
    case 'instock':
      return 'In Stock';
    case 'outofstock':
      return 'Out of Stock';
    case 'onbackorder':
      return 'On Backorder';
    default:
      return 'Unknown';
  }
}

export function getDiscountPercentage(product: WooCommerceProduct): number | null {
  if (product.on_sale && product.regular_price && product.sale_price) {
    const regular = parseFloat(product.regular_price);
    const sale = parseFloat(product.sale_price);
    return Math.round(((regular - sale) / regular) * 100);
  }
  return null;
}

export function getPlainDescription(product: WooCommerceProduct): string {
  return product.description.replace(/<[^>]*>/g, '');
}

export function getPlainShortDescription(product: WooCommerceProduct): string {
  return product.short_description.replace(/<[^>]*>/g, '');
}

export function getProductCheckoutUrl(_product: WooCommerceProduct): string {
  return 'https://members.buyseo.org/signup';
}

export function getProductButtonText(
  product: WooCommerceProduct,
  defaultText: string = 'Buy Now'
): string {
  return product.button_text && product.button_text.trim()
    ? product.button_text
    : defaultText;
}

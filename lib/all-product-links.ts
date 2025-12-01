/**
 * All Product Links - Generated from WooCommerce
 * This file contains all actual product slugs/links used in the application
 * 
 * Generated automatically - DO NOT EDIT MANUALLY
 * Run: npm run generate-product-links (when script is created)
 */

export interface ProductLink {
  slug: string;
  name: string;
  id: number;
  price: string;
  permalink: string;
}

/**
 * All product links will be stored here
 * This is populated by fetching from WooCommerce API
 */
export let ALL_PRODUCT_LINKS: ProductLink[] = [];

/**
 * Get all product links - fetches from WooCommerce if not cached
 */
export async function getAllProductLinks(): Promise<ProductLink[]> {
  // If already loaded, return cached
  if (ALL_PRODUCT_LINKS.length > 0) {
    return ALL_PRODUCT_LINKS;
  }

  try {
    const { fetchAllProductsComplete } = await import('./woocommerce-api');
    const { data: products, error } = await fetchAllProductsComplete();
    
    if (error || !products) {
      console.error('Error fetching products:', error);
      return [];
    }

    // Extract all product links
    ALL_PRODUCT_LINKS = products
      .filter(p => p.status === 'publish')
      .map(p => ({
        slug: p.slug,
        name: p.name,
        id: p.id,
        price: p.price,
        permalink: p.permalink || `/${p.slug}`,
      }))
      .sort((a, b) => a.slug.localeCompare(b.slug));

    return ALL_PRODUCT_LINKS;
  } catch (error) {
    console.error('Error in getAllProductLinks:', error);
    return [];
  }
}

/**
 * Get product link by slug
 */
export function getProductLink(slug: string): ProductLink | undefined {
  return ALL_PRODUCT_LINKS.find(p => p.slug === slug);
}

/**
 * Search products by name or slug
 */
export function searchProductLinks(query: string): ProductLink[] {
  const lowerQuery = query.toLowerCase();
  return ALL_PRODUCT_LINKS.filter(p =>
    p.slug.toLowerCase().includes(lowerQuery) ||
    p.name.toLowerCase().includes(lowerQuery)
  );
}


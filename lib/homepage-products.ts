/**
 * Homepage Data Loader
 * 
 * Homepage ke liye ultra-lightweight loader
 * - Products: 13.68 KB (sirf 12 products!)
 * - Categories: 0.77 KB (sirf essential fields!)
 * Total: ~15 KB (instead of 7.7 MB - 99.8% choti!)
 */

import { fetchAllProducts, fetchProductCategories } from './woocommerce-api';

export interface HomepageProduct {
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

export interface HomepageProductsData {
  products: HomepageProduct[];
  totalProducts: number;
  lastUpdated: string;
  note: string;
}

export interface HomepageCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface HomepageCategoriesData {
  categories: HomepageCategory[];
  totalCategories: number;
  lastUpdated: string;
  note: string;
}

/**
 * Load homepage products (ultra-lightweight - only 12 products!)
 */
export async function loadHomepageProducts(): Promise<HomepageProduct[]> {
  try {
    // Try to load from static JSON file first (ultra-fast!)
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch('/data/homepage-products.json');
        if (response.ok) {
          const data: HomepageProductsData = await response.json();
          console.log(`📦 Homepage: Loaded ${data.totalProducts} products (${(JSON.stringify(data).length / 1024).toFixed(2)} KB)`);
          return data.products;
        }
      } catch (error) {
        console.log('Static file not found, using WordPress API');
      }
    }
    
    // Fallback to WordPress API
    const { data: products, error } = await fetchAllProducts(1, 12);
    
    if (error || !products) {
      console.log('Using fallback products data');
      return [];
    }

    return products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      images: product.images || [],
      categories: product.categories || []
    }));
  } catch (error) {
    console.error('Error loading homepage products:', error);
    return [];
  }
}

/**
 * Load homepage categories (ultra-lightweight - only essential fields!)
 */
export async function loadHomepageCategories(): Promise<HomepageCategory[]> {
  try {
    // Try to load from static JSON file first (ultra-fast!)
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch('/data/homepage-categories.json');
        if (response.ok) {
          const data: HomepageCategoriesData = await response.json();
          console.log(`📂 Homepage: Loaded ${data.totalCategories} categories (${(JSON.stringify(data).length / 1024).toFixed(2)} KB)`);
          return data.categories;
        }
      } catch (error) {
        console.log('Static file not found, using WordPress API');
      }
    }
    
    // Fallback to WordPress API
    const { data: categories, error } = await fetchProductCategories();
    
    if (error || !categories) {
      console.log('Using fallback categories data');
      return getFallbackCategories();
    }

    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat.count || 0
    }));
  } catch (error) {
    console.error('Error loading homepage categories:', error);
    return getFallbackCategories();
  }
}

/**
 * Load category-specific products from dedicated static files (ULTRA-FAST!)
 * This replaces the slow API calls in CategorySection
 * Each category has its own optimized file with 12+ products!
 */
export async function loadCategoryProducts(categorySlug: string, limit: number = 12): Promise<HomepageProduct[]> {
  try {
    // If "All Plan" (uncategorized), use homepage products
    if (categorySlug === 'all-plan' || categorySlug === 'uncategorized') {
      const allProducts = await loadHomepageProducts();
      console.log(`📦 Category "${categorySlug}": Loaded ${Math.min(limit, allProducts.length)} products (homepage static)`);
      return allProducts.slice(0, limit);
    }
    
    // Load category-specific file
    const categoryFileName = `category-${categorySlug}.json`;
    
    // In browser (client-side)
    if (typeof window !== 'undefined') {
      const response = await fetch(`/data/${categoryFileName}`);
      if (!response.ok) {
        console.warn(`⚠️ Category file not found: ${categoryFileName}`);
        return [];
      }
      const data = await response.json();
      console.log(`📦 Category "${categorySlug}": Loaded ${data.totalProducts} products (${(JSON.stringify(data).length / 1024).toFixed(2)} KB)`);
      return data.products.slice(0, limit);
    }
    
    // On server (SSR/SSG) - Not available in browser environment
    return [];
  } catch (error) {
    console.error('❌ Error loading category products:', error);
    return [];
  }
}

function getFallbackCategories(): HomepageCategory[] {
  return [
    { id: 6, name: 'All Plan', slug: 'uncategorized', count: 1200 },
    { id: 1, name: 'SEO Tools', slug: 'seo-tools', count: 2100 },
    { id: 2, name: 'Marketing Tools', slug: 'marketing-tools', count: 1560 },
    { id: 3, name: 'Analytics Tools', slug: 'analytics-tools', count: 890 },
    { id: 4, name: 'Content Tools', slug: 'content-tools', count: 1200 },
    { id: 5, name: 'RDP Services', slug: 'rdp-services', count: 450 }
  ];
}


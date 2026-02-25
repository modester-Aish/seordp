/**
 * Server-only WooCommerce data layer.
 * Reads from local JSON snapshot (public/data). Do not import from client components.
 */
import {
  WooCommerceProduct,
  WooCommerceCategory,
  WordPressApiResponse,
  WordPressSingleResponse,
} from '@/types/wordpress';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { isExcludedDuplicate } from '@/lib/woocommerce-api';

export { isExcludedDuplicate };

const handleApiError = (error: unknown): string => {
  if (error instanceof Error) return `Request Error: ${error.message}`;
  return 'An unknown error occurred';
};

async function loadJsonFile<T>(fileName: string): Promise<T> {
  const filePath = join(process.cwd(), 'public', 'data', fileName);
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

let cachedProducts: WooCommerceProduct[] | null = null;
let cachedCategories: WooCommerceCategory[] | null = null;

async function getAllProductsLocal(): Promise<WooCommerceProduct[]> {
  if (!cachedProducts) {
    cachedProducts = await loadJsonFile<WooCommerceProduct[]>('wc-products.json');
  }
  return cachedProducts;
}

async function getAllProductCategoriesLocal(): Promise<WooCommerceCategory[]> {
  if (!cachedCategories) {
    cachedCategories = await loadJsonFile<WooCommerceCategory[]>('wc-product-categories.json');
  }
  return cachedCategories;
}

export async function fetchAllProducts(
  page: number = 1,
  perPage: number = 10,
  category?: string,
  featured?: boolean,
  onSale?: boolean
): Promise<WordPressApiResponse<WooCommerceProduct>> {
  try {
    let products = await getAllProductsLocal();
    products = products.filter((p) => !isExcludedDuplicate(p.slug));
    if (category) {
      products = products.filter((p) =>
        p.categories?.some((cat) => String(cat.id) === String(category))
      );
    }
    if (featured !== undefined) {
      products = products.filter((p) => !!p.featured === !!featured);
    }
    if (onSale !== undefined) {
      products = products.filter((p) => !!p.on_sale === !!onSale);
    }
    const total = products.length;
    const totalPages = perPage > 0 ? Math.max(1, Math.ceil(total / perPage)) : 1;
    const start = (page - 1) * perPage;
    const data = perPage > 0 ? products.slice(start, start + perPage) : products;
    return { data, error: null, total, totalPages };
  } catch (error) {
    console.error('Error reading local products snapshot:', error);
    return { data: null, error: handleApiError(error) };
  }
}

export async function fetchProductBySlug(
  slug: string
): Promise<WordPressSingleResponse<WooCommerceProduct>> {
  try {
    if (isExcludedDuplicate(slug)) {
      return { data: null, error: 'Product not found (duplicate excluded)' };
    }
    const products = await getAllProductsLocal();
    const product = products.find((p) => p.slug === slug && !isExcludedDuplicate(p.slug));
    if (!product) return { data: null, error: 'Product not found' };
    return { data: product, error: null };
  } catch (error) {
    console.error(`Error finding product with slug ${slug} in local snapshot:`, error);
    return { data: null, error: handleApiError(error) };
  }
}

export async function fetchProductById(
  id: number
): Promise<WordPressSingleResponse<WooCommerceProduct>> {
  try {
    const products = await getAllProductsLocal();
    const product = products.find((p) => p.id === id);
    if (!product || isExcludedDuplicate(product.slug)) {
      return { data: null, error: 'Product not found' };
    }
    return { data: product, error: null };
  } catch (error) {
    console.error(`Error finding product with ID ${id} in local snapshot:`, error);
    return { data: null, error: handleApiError(error) };
  }
}

export async function fetchProductCategories(): Promise<
  WordPressApiResponse<WooCommerceCategory>
> {
  try {
    const categories = await getAllProductCategoriesLocal();
    return { data: categories, error: null };
  } catch (error) {
    console.error('Error reading local product categories snapshot:', error);
    return { data: null, error: handleApiError(error) };
  }
}

export async function fetchFeaturedProducts(
  perPage: number = 4
): Promise<WordPressApiResponse<WooCommerceProduct>> {
  return fetchAllProducts(1, perPage, undefined, true);
}

export async function fetchSaleProducts(
  perPage: number = 4
): Promise<WordPressApiResponse<WooCommerceProduct>> {
  return fetchAllProducts(1, perPage, undefined, undefined, true);
}

export async function fetchAllProductsComplete(): Promise<
  WordPressApiResponse<WooCommerceProduct>
> {
  try {
    const allProducts = await getAllProductsLocal();
    const filteredProducts = allProducts.filter((p) => !isExcludedDuplicate(p.slug));
    return {
      data: filteredProducts,
      error: null,
      total: allProducts.length,
      totalPages: 1,
    };
  } catch (error) {
    console.error('Error reading all local products:', error);
    return { data: null, error: handleApiError(error) };
  }
}

export async function searchProducts(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<WordPressApiResponse<WooCommerceProduct>> {
  try {
    const allProducts = await getAllProductsLocal();
    const lowered = query.toLowerCase();
    const matched = allProducts
      .filter((product) => {
        const name = product.name?.toLowerCase() || '';
        const description = product.description?.toLowerCase() || '';
        const shortDescription = product.short_description?.toLowerCase() || '';
        return (
          name.includes(lowered) ||
          description.includes(lowered) ||
          shortDescription.includes(lowered)
        );
      })
      .filter((p) => !isExcludedDuplicate(p.slug));
    const total = matched.length;
    const totalPages = perPage > 0 ? Math.max(1, Math.ceil(total / perPage)) : 1;
    const start = (page - 1) * perPage;
    const data = perPage > 0 ? matched.slice(start, start + perPage) : matched;
    return { data, error: null, total, totalPages };
  } catch (error) {
    console.error(`Error searching products locally with query "${query}":`, error);
    return { data: null, error: handleApiError(error) };
  }
}

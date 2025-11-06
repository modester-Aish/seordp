import axios from 'axios';
import {
  WooCommerceProduct,
  WooCommerceCategory,
  WordPressApiResponse,
  WordPressSingleResponse,
} from '@/types/wordpress';

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com';
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';
const WC_API_URL = `${WORDPRESS_BASE_URL}/wp-json/wc/v3`;

// Helper function to handle API errors
const handleApiError = (error: any): string => {
  if (error.response) {
    return `WooCommerce API Error: ${error.response.status} - ${error.response.statusText}`;
  } else if (error.request) {
    return 'No response received from WooCommerce API';
  } else {
    return `Request Error: ${error.message}`;
  }
};

// Create axios instance with auth
const wcAxios = axios.create({
  baseURL: WC_API_URL,
  auth: {
    username: WC_CONSUMER_KEY,
    password: WC_CONSUMER_SECRET,
  },
});

// Fetch all products with optional filters
export async function fetchAllProducts(
  page: number = 1,
  perPage: number = 10,
  category?: string,
  featured?: boolean,
  onSale?: boolean
): Promise<WordPressApiResponse<WooCommerceProduct>> {
  try {
    const params: any = {
      page,
      per_page: perPage,
    };

    if (category) {
      params.category = category;
    }

    if (featured !== undefined) {
      params.featured = featured;
    }

    if (onSale !== undefined) {
      params.on_sale = onSale;
    }

    const response = await wcAxios.get<WooCommerceProduct[]>('/products', {
      params,
    });

    return {
      data: response.data,
      error: null,
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
    };
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch a single product by slug
export async function fetchProductBySlug(
  slug: string
): Promise<WordPressSingleResponse<WooCommerceProduct>> {
  try {
    const response = await wcAxios.get<WooCommerceProduct[]>('/products', {
      params: {
        slug,
      },
    });

    if (response.data.length === 0) {
      return {
        data: null,
        error: 'Product not found',
      };
    }

    return {
      data: response.data[0],
      error: null,
    };
  } catch (error: any) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch a single product by ID
export async function fetchProductById(
  id: number
): Promise<WordPressSingleResponse<WooCommerceProduct>> {
  try {
    const response = await wcAxios.get<WooCommerceProduct>(`/products/${id}`);

    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch all product categories
export async function fetchProductCategories(): Promise<WordPressApiResponse<WooCommerceCategory>> {
  try {
    const response = await wcAxios.get<WooCommerceCategory[]>('/products/categories', {
      params: {
        per_page: 100,
      },
    });

    return {
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    console.error('Error fetching product categories:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch featured products
export async function fetchFeaturedProducts(
  perPage: number = 4
): Promise<WordPressApiResponse<WooCommerceProduct>> {
  return fetchAllProducts(1, perPage, undefined, true);
}

// Fetch products on sale
export async function fetchSaleProducts(
  perPage: number = 4
): Promise<WordPressApiResponse<WooCommerceProduct>> {
  return fetchAllProducts(1, perPage, undefined, undefined, true);
}

// Helper function to get product price
export function getProductPrice(product: WooCommerceProduct): string {
  if (product.on_sale && product.sale_price) {
    return product.sale_price;
  }
  return product.regular_price || product.price;
}

// Helper function to get formatted price
export function getFormattedPrice(product: WooCommerceProduct): string {
  const price = getProductPrice(product);
  return `$${parseFloat(price).toFixed(2)}`;
}

// Helper function to check if product is on sale
export function isProductOnSale(product: WooCommerceProduct): boolean {
  return product.on_sale && !!product.sale_price;
}

// Helper function to get product image URL
export function getProductImageUrl(
  product: WooCommerceProduct,
  index: number = 0
): string | null {
  if (product.images && product.images.length > index) {
    return product.images[index].src;
  }
  return null;
}

// Helper function to get product main image
export function getProductMainImage(product: WooCommerceProduct): string {
  return getProductImageUrl(product, 0) || '/placeholder-product.jpg';
}

// Helper function to check if product is in stock
export function isInStock(product: WooCommerceProduct): boolean {
  return product.stock_status === 'instock';
}

// Helper function to get stock status text
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

// Helper function to get discount percentage
export function getDiscountPercentage(product: WooCommerceProduct): number | null {
  if (product.on_sale && product.regular_price && product.sale_price) {
    const regular = parseFloat(product.regular_price);
    const sale = parseFloat(product.sale_price);
    return Math.round(((regular - sale) / regular) * 100);
  }
  return null;
}

// Helper function to get plain text description
export function getPlainDescription(product: WooCommerceProduct): string {
  return product.description.replace(/<[^>]*>/g, '');
}

// Helper function to get plain text short description
export function getPlainShortDescription(product: WooCommerceProduct): string {
  return product.short_description.replace(/<[^>]*>/g, '');
}

// Search products
export async function searchProducts(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<WordPressApiResponse<WooCommerceProduct>> {
  try {
    const response = await wcAxios.get<WooCommerceProduct[]>('/products', {
      params: {
        search: query,
        page,
        per_page: perPage,
      },
    });

    return {
      data: response.data,
      error: null,
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
    };
  } catch (error: any) {
    console.error(`Error searching products with query "${query}":`, error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}


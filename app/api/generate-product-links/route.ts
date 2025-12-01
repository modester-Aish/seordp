import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';

/**
 * API Route to fetch products that are actually shown on frontend and save their links
 * 
 * GET /api/generate-product-links
 * 
 * This will:
 * 1. Fetch products that are actually shown on frontend (same as /products page)
 * 2. Extract all product slugs/links (jo yahan website par show hote hain)
 * 3. Save to lib/all-product-links-data.ts file
 * 
 * Note: Uses fetchAllProductsComplete() which already filters duplicates,
 * so only products that actually show on frontend are included
 */
export async function GET() {
  try {
    console.log('📦 Fetching all products from WooCommerce...');
    
    // Fetch ALL products
    const { data: products, error } = await fetchAllProductsComplete();
    
    if (error || !products || products.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: error || 'No products found',
        },
        { status: 500 }
      );
    }

    console.log(`✅ Found ${products.length} products`);

    // Extract product links - EXACTLY SAME as frontend (/products page par jo show hote hain)
    // fetchAllProductsComplete() already:
    // - Filters out duplicates (isExcludedDuplicate)
    // - Returns only published products
    // So yeh products exactly wahi hain jo website par show hote hain
    const productLinks = products
      .filter(p => p.status === 'publish') // Extra safety: only published
      .map(p => ({
        slug: p.slug,
        name: p.name,
        id: p.id,
        price: p.price,
        regularPrice: p.regular_price,
        salePrice: p.sale_price,
        permalink: p.permalink || `/${p.slug}`,
        categories: p.categories?.map(c => ({ id: c.id, name: c.name, slug: c.slug })) || [],
      }))
      .sort((a, b) => a.slug.localeCompare(b.slug));

    console.log(`✅ Extracted ${productLinks.length} published product links`);

    // Generate TypeScript file content with all product links listed one by one
    const productLinksList = productLinks.map((p, index) => {
      return `  // ${index + 1}. ${p.name}
  {
    slug: '${p.slug}',
    name: '${p.name.replace(/'/g, "\\'")}',
    id: ${p.id},
    price: '${p.price}',
    ${p.regularPrice ? `regularPrice: '${p.regularPrice}',` : ''}
    ${p.salePrice ? `salePrice: '${p.salePrice}',` : ''}
    permalink: '${p.permalink}',
    categories: ${JSON.stringify(p.categories)},
  },`;
    }).join('\n\n');

    // Generate TypeScript file content
    const fileContent = `/**
 * All Product Links - Auto-generated from WooCommerce
 * 
 * Generated at: ${new Date().toISOString()}
 * Total Products: ${productLinks.length}
 * 
 * DO NOT EDIT MANUALLY - This file is auto-generated
 * To regenerate: GET /api/generate-product-links
 */

export interface ProductLink {
  slug: string;
  name: string;
  id: number;
  price: string;
  regularPrice?: string;
  salePrice?: string;
  permalink: string;
  categories: Array<{ id: number; name: string; slug: string }>;
}

/**
 * All product links from WooCommerce
 * Total: ${productLinks.length} products
 * 
 * Each product link is listed below:
 */
export const ALL_PRODUCT_LINKS: ProductLink[] = [
${productLinksList}
];

/**
 * Get product link by slug
 */
export function getProductLinkBySlug(slug: string): ProductLink | undefined {
  return ALL_PRODUCT_LINKS.find(p => p.slug === slug);
}

/**
 * Get all product slugs
 */
export function getAllProductSlugs(): string[] {
  return ALL_PRODUCT_LINKS.map(p => p.slug);
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

/**
 * Get products by category slug
 */
export function getProductsByCategory(categorySlug: string): ProductLink[] {
  return ALL_PRODUCT_LINKS.filter(p =>
    p.categories.some(c => c.slug === categorySlug)
  );
}
`;

    // Save to file
    const filePath = join(process.cwd(), 'lib', 'all-product-links-data.ts');
    
    try {
      await writeFile(filePath, fileContent, 'utf-8');
      console.log(`✅ Saved product links to: ${filePath}`);
    } catch (writeError: any) {
      console.error('Error writing file:', writeError);
      return NextResponse.json(
        { 
          success: false,
          error: `Failed to write file: ${writeError.message}`,
        },
        { status: 500 }
      );
    }

    // Also return JSON for immediate use
    return NextResponse.json({
      success: true,
      message: `Successfully generated product links file`,
      filePath: 'lib/all-product-links-data.ts',
      summary: {
        totalProducts: products.length,
        publishedProducts: productLinks.length,
        generatedAt: new Date().toISOString(),
      },
      productLinks: productLinks.slice(0, 10), // Show first 10 as preview
      allProductSlugs: productLinks.map(p => p.slug),
    });
  } catch (error: any) {
    console.error('Error generating product links:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}


/**
 * Script to generate product links file
 * Run: npx tsx scripts/generate-product-links-file.ts
 */

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { fetchAllProductsComplete } from '../lib/woocommerce-api';

async function generateProductLinksFile() {
  try {
    console.log('📦 Fetching all products from WooCommerce...\n');
    
    // Fetch ALL products
    const { data: products, error } = await fetchAllProductsComplete();
    
    if (error || !products || products.length === 0) {
      console.error('❌ Error:', error || 'No products found');
      return;
    }

    console.log(`✅ Found ${products.length} products`);

    // Extract all published product links
    const productLinks = products
      .filter(p => p.status === 'publish')
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

    console.log(`✅ Extracted ${productLinks.length} published product links\n`);

    // Generate TypeScript file content with all product links listed one by one
    const productLinksList = productLinks.map((p, index) => {
      const nameEscaped = p.name.replace(/'/g, "\\'").replace(/\n/g, ' ');
      return `  // ${index + 1}. ${p.name}
  {
    slug: '${p.slug}',
    name: '${nameEscaped}',
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
 * To regenerate: Run 'npx tsx scripts/generate-product-links-file.ts'
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
 * Each product link is listed below (one by one):
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
    
    await writeFile(filePath, fileContent, 'utf-8');
    
    console.log(`✅ File generated successfully!`);
    console.log(`📁 Location: ${filePath}`);
    console.log(`📊 Total Products: ${productLinks.length}`);
    console.log(`\n📝 First 5 products:`);
    productLinks.slice(0, 5).forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.slug} - ${p.name}`);
    });
    if (productLinks.length > 5) {
      console.log(`   ... and ${productLinks.length - 5} more\n`);
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}

generateProductLinksFile();


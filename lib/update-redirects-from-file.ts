/**
 * Update Tool Redirects FROM all-product-links-data.ts FILE
 * Direct file update - no API calls needed!
 */

import { ALL_PRODUCT_LINKS } from './all-product-links-data';
import { getAllTools } from './tools-data';
import { matchToolToProduct } from './tool-product-matcher';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { WooCommerceProduct } from '@/types/wordpress';

export async function updateRedirectsFromFile(): Promise<{
  success: boolean;
  matchedTools: number;
  totalProducts: number;
  mapping: Record<string, string>;
  error?: string;
}> {
  try {
    console.log('📦 Reading products from all-product-links-data.ts...');
    
    // Convert ProductLink[] to WooCommerceProduct[] format for matcher
    const products: WooCommerceProduct[] = ALL_PRODUCT_LINKS.map(link => ({
      id: link.id,
      name: link.name,
      slug: link.slug,
      permalink: link.permalink,
      status: 'publish', // All in file are published
      price: link.price,
      regular_price: link.regularPrice || link.price,
      sale_price: link.salePrice,
      on_sale: !!link.salePrice,
      description: '',
      short_description: '',
      categories: link.categories.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      })),
    } as WooCommerceProduct));

    console.log(`✅ Found ${products.length} products in file`);

    // Get all tools
    const tools = getAllTools();
    console.log(`✅ Found ${tools.length} tools`);

    // Match tools with products
    const toolToProductMapping: Record<string, string> = {};
    const matchesByCategory: Record<string, Array<{ tool: string; product: string }>> = {};
    
    console.log('\n🔍 Matching tools with products...\n');
    
    for (const tool of tools) {
      const matchedProduct = matchToolToProduct(tool, products);
      
      if (matchedProduct && matchedProduct.status === 'publish') {
        toolToProductMapping[tool.slug] = matchedProduct.slug;
        
        const category = tool.category || 'Other Tools';
        if (!matchesByCategory[category]) {
          matchesByCategory[category] = [];
        }
        matchesByCategory[category].push({
          tool: tool.slug,
          product: matchedProduct.slug,
        });
        
        console.log(`✅ ${tool.slug} → ${matchedProduct.slug}`);
      } else {
        console.log(`❌ ${tool.slug} → No match`);
      }
    }
    
    // Generate file content
    const redirectMapEntries = Object.entries(matchesByCategory)
      .map(([category, matches]) => {
        const categoryComments = matches.map(m => `  '${m.tool}': '${m.product}',`).join('\n');
        return `  // ${category}\n${categoryComments}`;
      })
      .join('\n\n');
    
    const fileContent = `/**
 * Static Tool-to-Product Redirect Mapping
 * Auto-generated from all-product-links-data.ts (jo frontend par show hote hain)
 * 
 * Generated at: ${new Date().toISOString()}
 * Total Tools Matched: ${Object.keys(toolToProductMapping).length}
 * 
 * This provides instant redirects without API calls for known tool->product matches
 */

export interface ToolProductRedirect {
  toolSlug: string;
  productSlug: string;
}

/**
 * Known tool-to-product redirect mappings
 * Auto-generated - matches tools with actual product slugs from frontend
 */
export const TOOL_PRODUCT_REDIRECTS: Record<string, string> = {
${redirectMapEntries}
};

/**
 * Check if a tool slug should redirect to a product slug
 */
export function getToolProductRedirect(toolSlug: string): string | null {
  return TOOL_PRODUCT_REDIRECTS[toolSlug] || null;
}

/**
 * Get all known tool slugs that redirect to products
 */
export function getAllRedirectToolSlugs(): string[] {
  return Object.keys(TOOL_PRODUCT_REDIRECTS);
}
`;

    // Update file
    const filePath = join(process.cwd(), 'lib', 'tool-product-redirects.ts');
    await writeFile(filePath, fileContent, 'utf-8');
    
    console.log(`\n✅ File updated: ${filePath}`);
    console.log(`📊 Matched ${Object.keys(toolToProductMapping).length} tools`);
    
    return {
      success: true,
      matchedTools: Object.keys(toolToProductMapping).length,
      totalProducts: products.length,
      mapping: toolToProductMapping,
    };
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    return {
      success: false,
      matchedTools: 0,
      totalProducts: 0,
      mapping: {},
      error: error.message,
    };
  }
}


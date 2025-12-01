import { NextResponse } from 'next/server';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';
import { getAllTools } from '@/lib/tools-data';
import { matchToolToProduct } from '@/lib/tool-product-matcher';

/**
 * API Route to:
 * 1. Get all product SLUGS only (jo frontend par show hote hain)
 * 2. Match tools with product slugs
 * 3. Return mapping of tool slugs -> product slugs
 * 
 * GET /api/match-tools-with-products
 */
export async function GET() {
  try {
    console.log('📦 Fetching products (jo frontend par show hote hain)...');
    
    // Fetch products - exactly same as frontend
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

    // Extract ONLY product slugs (jo frontend par show hote hain)
    const productSlugs = products
      .filter(p => p.status === 'publish')
      .map(p => p.slug)
      .sort();

    console.log(`✅ Found ${productSlugs.length} product slugs (frontend visible)`);

    // Get all tools
    const tools = getAllTools();
    
    // Match each tool with products and get product SLUG
    const toolToProductMapping: Record<string, string> = {};
    const matchedTools: Array<{ toolSlug: string; toolName: string; productSlug: string; productName: string }> = [];
    const unmatchedTools: Array<{ toolSlug: string; toolName: string }> = [];
    
    for (const tool of tools) {
      const matchedProduct = matchToolToProduct(tool, products);
      
      if (matchedProduct && matchedProduct.status === 'publish') {
        toolToProductMapping[tool.slug] = matchedProduct.slug;
        matchedTools.push({
          toolSlug: tool.slug,
          toolName: tool.name,
          productSlug: matchedProduct.slug,
          productName: matchedProduct.name,
        });
      } else {
        unmatchedTools.push({
          toolSlug: tool.slug,
          toolName: tool.name,
        });
      }
    }
    
    // Format for tool-product-redirects.ts file
    const redirectMapFormatted = Object.entries(toolToProductMapping)
      .map(([tool, product]) => `  '${tool}': '${product}',`)
      .join('\n');
    
    return NextResponse.json({
      success: true,
      summary: {
        totalProductSlugs: productSlugs.length,
        totalTools: tools.length,
        matchedTools: matchedTools.length,
        unmatchedTools: unmatchedTools.length,
      },
      // All product slugs (jo frontend par show hote hain)
      allProductSlugs: productSlugs,
      // Tool to Product mapping (toolSlug -> productSlug)
      toolToProductMapping: toolToProductMapping,
      // Ready to copy to tool-product-redirects.ts
      redirectMapFormatted: redirectMapFormatted,
      // Matched tools details
      matchedTools: matchedTools,
      // Unmatched tools
      unmatchedTools: unmatchedTools,
    });
  } catch (error: any) {
    console.error('Error matching tools with products:', error);
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


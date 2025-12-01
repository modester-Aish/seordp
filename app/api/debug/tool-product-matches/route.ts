import { NextResponse } from 'next/server';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';
import { getAllTools } from '@/lib/tools-data';
import { matchToolToProduct } from '@/lib/tool-product-matcher';

/**
 * API Route to:
 * 1. Fetch ALL product slugs from WooCommerce (actual links)
 * 2. Match tools with products based on ACTUAL product slugs
 * 3. Return redirect map with correct product slugs
 * 
 * Use this to verify and update tool-product-redirects.ts
 */
export async function GET() {
  try {
    // Step 1: Fetch ALL products from WooCommerce (actual product links)
    console.log('📦 Fetching all products from WooCommerce...');
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

    // Step 2: Get all product slugs (actual links used in ProductCard)
    const allProductSlugs = products
      .filter(p => p.status === 'publish')
      .map(p => ({
        slug: p.slug, // Actual product slug used in ProductCard href={`/${product.slug}`}
        name: p.name,
        id: p.id,
      }))
      .sort((a, b) => a.slug.localeCompare(b.slug));

    console.log(`✅ Found ${allProductSlugs.length} published products`);

    // Step 3: Get all tools
    const tools = getAllTools();
    
    // Step 4: Match each tool with products (using actual product slugs)
    const matches: Array<{
      toolId: string;
      toolSlug: string;
      toolName: string;
      matchedProductSlug: string | null;
      matchedProductName: string | null;
      allPossibleMatches: Array<{ slug: string; name: string }>;
    }> = [];
    
    for (const tool of tools) {
      // Find all products that could match this tool
      const possibleMatches = products.filter(p => {
        const toolSlugNorm = tool.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
        const productSlugNorm = p.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
        const toolNameNorm = tool.name.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\$/g, 's');
        const productNameNorm = p.name.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\$/g, 's');
        
        return (
          productSlugNorm.includes(toolSlugNorm) ||
          toolSlugNorm.includes(productSlugNorm) ||
          productNameNorm.includes(toolNameNorm) ||
          toolNameNorm.includes(productNameNorm)
        );
      });
      
      // Use improved matching function to find best match
      const bestMatch = matchToolToProduct(tool, products);
      
      matches.push({
        toolId: tool.id,
        toolSlug: tool.slug,
        toolName: tool.name,
        matchedProductSlug: bestMatch ? bestMatch.slug : null,
        matchedProductName: bestMatch ? bestMatch.name : null,
        allPossibleMatches: possibleMatches
          .filter(p => p.status === 'publish')
          .map(p => ({ slug: p.slug, name: p.name }))
          .slice(0, 5), // Show top 5 possible matches
      });
    }
    
    // Step 5: Generate redirect map (ready to copy to tool-product-redirects.ts)
    const redirectMap: Record<string, string> = {};
    matches.forEach(match => {
      if (match.matchedProductSlug) {
        redirectMap[match.toolSlug] = match.matchedProductSlug;
      }
    });
    
    return NextResponse.json({
      success: true,
      summary: {
        totalProducts: allProductSlugs.length,
        totalTools: tools.length,
        matchedTools: matches.filter(m => m.matchedProductSlug).length,
        unmatchedTools: matches.filter(m => !m.matchedProductSlug).length,
      },
      // All actual product slugs (from WooCommerce, used in ProductCard links)
      allProductSlugs: allProductSlugs,
      // Tool-to-Product matches
      toolProductMatches: matches,
      // Ready-to-use redirect map
      redirectMap: redirectMap,
      // Format for easy copying to tool-product-redirects.ts
      redirectMapFormatted: Object.entries(redirectMap)
        .map(([tool, product]) => `  '${tool}': '${product}',`)
        .join('\n'),
    });
  } catch (error: any) {
    console.error('Error in tool-product-matches API:', error);
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


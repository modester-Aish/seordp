import { NextResponse } from 'next/server';
import { updateToolRedirectsDirect } from '@/lib/update-tool-redirects-direct';

/**
 * API Route to automatically update tool redirects
 * 
 * GET /api/update-tool-redirects
 * 
 * This will:
 * 1. Fetch product slugs (jo frontend par show hote hain)
 * 2. Match tools with product slugs
 * 3. Automatically update tool-product-redirects.ts file
 */
export async function GET() {
  try {
    const result = await updateToolRedirectsDirect();
    
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: result.error || 'Failed to update redirects',
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: '✅ Tool redirects updated successfully!',
      filePath: 'lib/tool-product-redirects.ts',
      summary: {
        totalProductSlugs: result.totalProductSlugs,
        matchedTools: result.matchedTools,
      },
      // Tool to Product mapping
      toolToProductMapping: result.mapping,
      // All mappings as array for easy viewing
      mappings: Object.entries(result.mapping).map(([tool, product]) => ({
        tool,
        product,
      })),
    });
  } catch (error: any) {
    console.error('Error updating tool redirects:', error);
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


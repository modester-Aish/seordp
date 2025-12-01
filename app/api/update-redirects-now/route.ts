/**
 * DIRECT UPDATE API - File se read karke update karega
 * GET /api/update-redirects-now
 */

import { NextResponse } from 'next/server';
import { updateToolRedirectsDirect } from '@/lib/update-tool-redirects-direct';

export async function GET() {
  try {
    console.log('🚀 Starting direct update from file...');
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
      message: '✅ File updated successfully!',
      filePath: 'lib/tool-product-redirects.ts',
      summary: {
        totalProducts: result.totalProductSlugs,
        matchedTools: result.matchedTools,
      },
      mappings: Object.entries(result.mapping).map(([tool, product]) => ({
        tool,
        product,
      })),
    });
  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}


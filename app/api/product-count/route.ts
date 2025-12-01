import { NextResponse } from 'next/server';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';

/**
 * Simple API route to get product count
 * GET /api/product-count
 */
export async function GET() {
  try {
    const { data: products, error, total } = await fetchAllProductsComplete();
    
    if (error || !products) {
      return NextResponse.json(
        { 
          success: false,
          error: error || 'No products found',
        },
        { status: 500 }
      );
    }

    const publishedProducts = products.filter(p => p.status === 'publish');
    
    return NextResponse.json({
      success: true,
      count: {
        total: products.length,
        published: publishedProducts.length,
        draft: products.length - publishedProducts.length,
      },
      message: `Total Published Product Links: ${publishedProducts.length}`,
      productSlugsCount: publishedProducts.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}


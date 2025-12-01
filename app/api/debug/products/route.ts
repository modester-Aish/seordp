import { NextResponse } from 'next/server';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';

export async function GET() {
  try {
    const { data: products, error } = await fetchAllProductsComplete();
    
    if (error || !products) {
      return NextResponse.json(
        { error: error || 'No products found' },
        { status: 500 }
      );
    }

    // Get all product slugs sorted
    const productSlugs = products
      .filter(p => p.status === 'publish')
      .map(p => ({
        slug: p.slug,
        name: p.name,
        id: p.id,
      }))
      .sort((a, b) => a.slug.localeCompare(b.slug));

    return NextResponse.json({
      total: productSlugs.length,
      products: productSlugs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


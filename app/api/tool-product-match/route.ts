import { NextRequest, NextResponse } from 'next/server';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api-server';
import { getToolBySlug } from '@/lib/tools-data';
import { matchToolToProduct } from '@/lib/tool-product-matcher';
import { getToolProductRedirect } from '@/lib/tool-product-redirects';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug?.trim()) {
    return NextResponse.json({ matchedProductSlug: null }, { status: 200 });
  }

  try {
    const staticRedirect = getToolProductRedirect(slug);
    if (staticRedirect) {
      return NextResponse.json({ matchedProductSlug: staticRedirect });
    }

    const tool = getToolBySlug(slug);
    if (!tool) {
      return NextResponse.json({ matchedProductSlug: null });
    }

    const { data: products } = await fetchAllProductsComplete();
    if (!products?.length) {
      return NextResponse.json({ matchedProductSlug: null });
    }

    const matched = matchToolToProduct(tool, products);
    const matchedProductSlug =
      matched && matched.status === 'publish' ? matched.slug : null;
    return NextResponse.json({ matchedProductSlug });
  } catch (error) {
    console.error('Error in tool-product-match API:', error);
    return NextResponse.json({ matchedProductSlug: null });
  }
}

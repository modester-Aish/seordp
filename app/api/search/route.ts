import { NextRequest, NextResponse } from 'next/server';
import { fetchAllPostsComplete } from '@/lib/wordpress-api';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';
import { getAllTools } from '@/lib/tools-data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      return NextResponse.json({ results: [] });
    }

    const searchQuery = query.toLowerCase();
    const results: Array<{
      type: 'post' | 'product' | 'tool';
      title: string;
      slug: string;
      url: string;
      description?: string;
    }> = [];

    // Search WordPress posts
    const { data: posts } = await fetchAllPostsComplete();
    if (posts) {
      posts
        .filter((post) => post.status === 'publish')
        .forEach((post) => {
          const title = post.title.rendered.replace(/<[^>]*>/g, '');
          const content = post.content.rendered.replace(/<[^>]*>/g, '');
          if (
            title.toLowerCase().includes(searchQuery) ||
            content.toLowerCase().includes(searchQuery)
          ) {
            results.push({
              type: 'post',
              title,
              slug: post.slug,
              url: `/blog/${post.slug}`,
              description: content.substring(0, 150) + '...',
            });
          }
        });
    }

    // Search WooCommerce products
    const { data: products } = await fetchAllProductsComplete();
    if (products) {
      products
        .filter((product) => product.status === 'publish')
        .forEach((product) => {
          const name = product.name;
          const description = product.short_description || product.description || '';
          if (
            name.toLowerCase().includes(searchQuery) ||
            description.toLowerCase().includes(searchQuery)
          ) {
            results.push({
              type: 'product',
              title: name,
              slug: product.slug,
              url: `/products/${product.slug}`,
              description: description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
            });
          }
        });
    }

    // Search static tools
    const tools = getAllTools();
    tools.forEach((tool) => {
      if (
        tool.name.toLowerCase().includes(searchQuery) ||
        (tool.description && tool.description.toLowerCase().includes(searchQuery))
      ) {
        results.push({
          type: 'tool',
          title: tool.name,
          slug: tool.slug,
          url: `/${tool.slug}`,
          description: tool.description?.substring(0, 150) + '...',
        });
      }
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}


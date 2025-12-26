import { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllPagesComplete, fetchAllPostsComplete } from '@/lib/wordpress-api';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';
import { getAllTools } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'HTML Sitemap - SEORDP',
  description: 'Complete sitemap of all pages, blog posts, products, and tools on SEORDP.',
  robots: {
    index: true,
    follow: true,
  },
};

export default async function SitemapPage() {
  // Fetch all content
  const [pagesResult, postsResult, productsResult] = await Promise.all([
    fetchAllPagesComplete(),
    fetchAllPostsComplete(),
    fetchAllProductsComplete(),
  ]);

  const pages = pagesResult.data || [];
  const posts = postsResult.data || [];
  const products = productsResult.data || [];
  const tools = getAllTools();

  // Filter published content
  const publishedPages = pages.filter((p) => p.status === 'publish');
  const publishedPosts = posts.filter((p) => p.status === 'publish');
  const publishedProducts = products.filter((p) => p.status === 'publish');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">HTML Sitemap</h1>
          <p className="text-gray-600 mb-8">
            Find all pages, blog posts, products, and tools on SEORDP.
          </p>

          {/* Main Pages */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">
              Main Pages
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/single-tools-list"
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Tools List
                </Link>
              </li>
            </ul>
          </section>

          {/* WordPress Pages */}
          {publishedPages.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">
                Pages ({publishedPages.length})
              </h2>
              <ul className="space-y-2 columns-1 md:columns-2 lg:columns-3 gap-4">
                {publishedPages.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={`/${page.slug}`}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      {page.title.rendered.replace(/<[^>]*>/g, '')}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Blog Posts */}
          {publishedPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">
                Blog Posts ({publishedPosts.length})
              </h2>
              <ul className="space-y-2 columns-1 md:columns-2 lg:columns-3 gap-4">
                {publishedPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      {post.title.rendered.replace(/<[^>]*>/g, '')}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Products */}
          {publishedProducts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">
                Products ({publishedProducts.length})
              </h2>
              <ul className="space-y-2 columns-1 md:columns-2 lg:columns-3 gap-4">
                {publishedProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tools */}
          {tools.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">
                Tools ({tools.length})
              </h2>
              <ul className="space-y-2 columns-1 md:columns-2 lg:columns-3 gap-4">
                {tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.slug}`}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>
              Last updated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="mt-2">
              <Link
                href="/sitemap.xml"
                className="text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                View XML Sitemap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


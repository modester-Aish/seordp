import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProductBySlug, fetchAllProducts } from '@/lib/woocommerce-api';
import { 
  fetchPostBySlug, 
  fetchPageBySlug, 
  fetchAllPostsComplete,
  getTitle, 
  getContent,
  getExcerpt, 
  getFeaturedImageUrl,
  getAuthorName,
  formatDate,
  getReadingTime,
} from '@/lib/wordpress-api';
import { 
  cleanWordPressContent,
  extractHeadings,
  addHeadingIds,
  removeFirstHeading,
} from '@/lib/content-parser';
import { generateCanonicalUrl } from '@/lib/canonical';
import { cleanPageTitle } from '@/lib/html-utils';
import { Calendar, Clock, ArrowLeft, List, BookOpen } from 'lucide-react';
import Footer from '@/components/Footer';
import ProductDetailClient from '@/components/ProductDetailClient';
import ToolDetailClient from '@/components/ToolDetailClient';
import { getToolBySlug, getAllTools } from '@/lib/tools-data';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';
import { matchToolToProduct, getToolProductSlug } from '@/lib/tool-product-matcher';
import { getToolProductRedirect } from '@/lib/tool-product-redirects';

// Force dynamic rendering to avoid build timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes (better caching for faster loads)

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  
  // Validate slug first
  if (!slug || slug.trim() === '') {
    return {
      title: 'Page Not Found | SEORDP',
    };
  }
  
  try {
    // Try static tool first
    const tool = getToolBySlug(slug);
    if (tool) {
      // FIRST: Check static redirect map (instant, accurate for known tools)
      const staticRedirect = getToolProductRedirect(tool.slug);
      if (staticRedirect) {
        try {
          const { data: product } = await fetchProductBySlug(staticRedirect);
          if (product && product.status === 'publish') {
            // Use static redirect product (accurate)
            const cleanDescription = (product.short_description || product.description || tool.description || '')
              .replace(/<[^>]*>/g, '')
              .substring(0, 160);
            
            return {
              title: `${product.name} - Group Buy SEO Tool at ${product.price} | SEORDP`,
              description: cleanDescription || `${tool.description}. Get instant access to ${product.name} at ${product.price}.`,
              keywords: `${product.name} group buy, ${product.name} cheap, ${product.name} discount, buy ${product.name}, seo tools, group buy tools`,
              openGraph: {
                title: `${product.name} - Premium Group Buy Access`,
                description: cleanDescription || tool.description,
                type: 'website',
                url: `https://seordp.net/${staticRedirect}`,
              },
              alternates: {
                canonical: generateCanonicalUrl(`/${staticRedirect}`),
              },
            };
          }
        } catch (error) {
          // Product doesn't exist - fall through to dynamic matching
        }
      }
      
      // SECOND: Use DYNAMIC matching as fallback (for tools not in static map)
      let matchedProduct = null;
      try {
        const { data: allProducts } = await fetchAllProductsComplete();
        if (allProducts && allProducts.length > 0) {
          matchedProduct = matchToolToProduct(tool, allProducts);
          if (matchedProduct && matchedProduct.status === 'publish') {
            // Tool matches a product - use product slug for canonical
            const cleanDescription = (matchedProduct.short_description || matchedProduct.description || tool.description || '')
              .replace(/<[^>]*>/g, '')
              .substring(0, 160);
            
            return {
              title: `${matchedProduct.name} - Group Buy SEO Tool at ${matchedProduct.price} | SEORDP`,
              description: cleanDescription || `${tool.description}. Get instant access to ${matchedProduct.name} at ${matchedProduct.price}.`,
              keywords: `${matchedProduct.name} group buy, ${matchedProduct.name} cheap, ${matchedProduct.name} discount, buy ${matchedProduct.name}, seo tools, group buy tools`,
              openGraph: {
                title: `${matchedProduct.name} - Premium Group Buy Access`,
                description: cleanDescription || tool.description,
                type: 'website',
                url: `https://seordp.net/${matchedProduct.slug}`,
              },
              alternates: {
                canonical: generateCanonicalUrl(`/${matchedProduct.slug}`),
              },
            };
          }
        }
      } catch (error) {
        // Continue with tool metadata if product fetch fails
      }
      
      // No matching product - return tool metadata (TOOL DETAIL PAGE)
      return {
        title: `${tool.name} - Group Buy SEO Tool at ${tool.price} | SEORDP`,
        description: `${tool.description}. Get instant access to ${tool.name} at ${tool.price}. 24/7 support, 99% uptime guarantee.`,
        keywords: `${tool.name} group buy, ${tool.name} cheap, ${tool.name} discount, buy ${tool.name}, seo tools, group buy tools`,
        openGraph: {
          title: `${tool.name} - Premium Group Buy Access`,
          description: tool.description,
          type: 'website',
          url: `https://seordp.net/${tool.slug}`,
        },
        alternates: {
          canonical: generateCanonicalUrl(`/${tool.slug}`),
        },
      };
    }
    
    // Try product second (with timeout protection)
    try {
      const { data: product } = await fetchProductBySlug(slug);
      if (product && product.status === 'publish') {
        const cleanDescription = (product.short_description || product.description || '')
          .replace(/<[^>]*>/g, '')
          .substring(0, 160);
        
        return {
          title: `${product.name} - Group Buy SEO Tool at ${product.price} | SEORDP`,
          description: cleanDescription || `Buy ${product.name} at ${product.price}. Instant access to premium SEO tool. 24/7 support, 99% uptime guarantee. Group buy SEO tools at 90% discount.`,
          keywords: `${product.name} group buy, ${product.name} cheap, ${product.name} discount, buy ${product.name}, seo tools, group buy seo tools`,
          openGraph: {
            title: `${product.name} - Premium Group Buy Access`,
            description: cleanDescription || `Get instant access to ${product.name} at 90% discount. Only ${product.price}`,
            type: 'website',
            url: `https://seordp.net/${slug}`,
          },
          alternates: {
            canonical: generateCanonicalUrl(`/${slug}`),
          },
        };
      }
    } catch (error) {
      // Silently continue if product fetch fails
    }
    
    // Try blog post (with timeout protection)
    try {
      const { data: post } = await fetchPostBySlug(slug);
      if (post && post.status === 'publish') {
        return {
          title: `${getTitle(post)} | SEORDP`,
          description: getExcerpt(post),
          alternates: {
            canonical: generateCanonicalUrl(`/${slug}`),
          },
        };
      }
    } catch (error) {
      // Silently continue if post fetch fails
    }
    
    // Try page (with timeout protection)
    try {
      const { data: page } = await fetchPageBySlug(slug);
      if (page && page.status === 'publish') {
        return {
          title: `${getTitle(page)} | SEORDP`,
          description: getExcerpt(page),
          alternates: {
            canonical: generateCanonicalUrl(`/${slug}`),
          },
        };
      }
    } catch (error) {
      // Silently continue if page fetch fails
    }
  } catch (error) {
    // Fallback metadata if all checks fail
  }
  
  return {
    title: 'Page Not Found | SEORDP',
  };
}

export default async function UnifiedPage({ params }: PageProps) {
  const { slug } = params;
  
  // Validate slug first
  if (!slug || slug.trim() === '') {
    notFound();
  }
  
  // Try static tool first - if tool exists, redirect to product OR show 404
  const tool = getToolBySlug(slug);
  
  // If tool exists, check if it has a matching product - if yes, REDIRECT to product slug
  // If no match found, show 404 (NO TOOL DETAIL PAGES)
  if (tool) {
    // FIRST: Check static redirect map (instant, accurate for known tools)
    const staticRedirect = getToolProductRedirect(tool.slug);
    if (staticRedirect) {
      // Verify product exists before redirecting
      try {
        const { data: product } = await fetchProductBySlug(staticRedirect);
        if (product && product.status === 'publish') {
          redirect(`/${staticRedirect}`); // Use static redirect (accurate)
          return; // Exit early
        }
      } catch (error) {
        // Product doesn't exist - fall through to dynamic matching
      }
    }
    
    // SECOND: Use DYNAMIC matching as fallback (for tools not in static map)
    try {
      const { data: allProducts } = await fetchAllProductsComplete();
      if (allProducts && allProducts.length > 0) {
        const matchedProduct = matchToolToProduct(tool, allProducts);
        if (matchedProduct && matchedProduct.status === 'publish') {
          // Tool has a matching product - REDIRECT to product slug (URL bar will show product slug)
          redirect(`/${matchedProduct.slug}`);
          return; // Exit early
        }
      }
    } catch (error) {
      // If product fetch fails, show 404
    }
    
      // No matching product found - show TOOL DETAIL PAGE for unmatched tools
      // Get related tools from same category
      try {
        const allTools = getAllTools();
        const relatedTools = allTools.filter(t => 
          t.id !== tool.id && 
          t.category === tool.category
        ).slice(0, 8);
        
        return <ToolDetailClient tool={tool} relatedTools={relatedTools} />;
      } catch (error) {
        // If related tools fetch fails, still render the tool
        return <ToolDetailClient tool={tool} relatedTools={[]} />;
      }
  }
  
  // Try to fetch as product second (with error handling)
  // First try exact slug match
  try {
    const { data: product, error: productError } = await fetchProductBySlug(slug);
    if (product && product.status === 'publish') {
      // Product found - render product page directly (no redirect)
      // Tool links already redirect to product slugs, so product page is the canonical URL
      
      // Fetch related products from same category
      try {
        const { data: allProducts } = await fetchAllProducts(1, 8);
        const relatedProducts = allProducts?.filter(p => 
          p.id !== product.id && 
          p.categories?.some(cat => product.categories?.some(pCat => pCat.id === cat.id))
        ) || [];
        
        return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
      } catch (error) {
        // If related products fetch fails, still render the product
        return <ProductDetailClient product={product} relatedProducts={[]} />;
      }
    }
  } catch (error) {
    // Continue to next check if product fetch fails
  }
  
  // If exact slug match failed, try keyword matching with all products
  try {
    const { data: allProducts } = await fetchAllProductsComplete();
    if (allProducts && allProducts.length > 0) {
      // Normalize slug for matching
      const slugNormalized = slug.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\$/g, 's');
      
      // Try to find a product that matches the slug by keywords
      for (const product of allProducts) {
        if (product.status !== 'publish') continue;
        
        const productNameNormalized = product.name.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\$/g, 's');
        const productSlugNormalized = product.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Check if slug matches product slug or name
        if (
          slugNormalized === productSlugNormalized ||
          slugNormalized === productNameNormalized ||
          slugNormalized.includes(productSlugNormalized) ||
          productSlugNormalized.includes(slugNormalized) ||
          slugNormalized.includes(productNameNormalized) ||
          productNameNormalized.includes(slugNormalized)
        ) {
          // Found a matching product - check if it matches a tool first
          const minLength = Math.min(slugNormalized.length, productNameNormalized.length);
          if (minLength >= 3) {
            // Product found - render product page directly
            // Tool links already redirect to product slugs, so product page is the canonical URL
            try {
              const { data: allProductsForRelated } = await fetchAllProducts(1, 8);
              const relatedProducts = allProductsForRelated?.filter(p => 
                p.id !== product.id && 
                p.categories?.some(cat => product.categories?.some(pCat => pCat.id === cat.id))
              ) || [];
              
              return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
            } catch (error) {
              return <ProductDetailClient product={product} relatedProducts={[]} />;
            }
          }
        }
      }
    }
  } catch (error) {
    // Continue if keyword matching fails
  }
  
  // Try as blog post (with error handling)
  try {
    const { data: post, error: postError } = await fetchPostBySlug(slug);
    if (post && post.status === 'publish') {
      return <BlogPostView post={post} />;
    }
  } catch (error) {
    // Continue to next check if post fetch fails
  }
  
  // Try as page (with error handling)
  try {
    const { data: page, error: pageError } = await fetchPageBySlug(slug);
    if (page && page.status === 'publish') {
      return <PageView page={page} />;
    }
  } catch (error) {
    // Continue to notFound if all checks fail
  }
  
  // Nothing found
  notFound();
}

// Product View Component - Removed (using ProductDetailClient instead)

// Blog Post View Component
async function BlogPostView({ post }: { post: any }) {
  const title = getTitle(post);
  let content = getContent(post);
  const imageUrl = getFeaturedImageUrl(post);
  const authorName = getAuthorName(post);
  const formattedDate = formatDate(post.date);
  const readingTime = getReadingTime(content);
  const excerpt = getExcerpt(post);

  // Clean content first
  content = cleanWordPressContent(content);
  
  // Remove first heading from content (duplicate title)
  content = removeFirstHeading(content);
  
  // Add IDs to headings for TOC navigation
  content = addHeadingIds(content);
  
  // Extract headings AFTER adding IDs (so IDs match)
  let headings = extractHeadings(content);
  
  // Remove first heading from TOC if it was a duplicate title (H1-H3)
  if (headings.length > 0 && headings[0].level <= 3) {
    const firstHeadingText = headings[0].text.toLowerCase().trim();
    const titleText = title.toLowerCase().trim();
    if (firstHeadingText === titleText || firstHeadingText.includes(titleText) || titleText.includes(firstHeadingText)) {
      headings = headings.slice(1);
    }
  }

  // Fetch related posts (exclude current post)
  const { data: allPosts } = await fetchAllPostsComplete();
  const relatedPosts = allPosts
    ?.filter((p) => p.id !== post.id)
    .slice(0, 6) || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 overflow-hidden">
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            {/* Left Side - Title and Meta */}
            <div className="text-white">
              {/* Blog Post Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-sm font-semibold">Blog Post</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formattedDate}</span>
                </div>
                <span className="text-white/50">•</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{readingTime} min read</span>
                </div>
              </div>

              {/* Breadcrumbs */}
              <nav className="text-sm text-white/80">
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">{title.length > 30 ? title.substring(0, 30) + '...' : title}</span>
              </nav>
            </div>

            {/* Right Side - Featured Image */}
            {imageUrl && (
              <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Left Sidebar - Table of Contents */}
            <aside className="lg:col-span-3 order-1 lg:order-none">
              <div className="sticky top-24 bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <List className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-gray-900">Table of Contents</h2>
                </div>
                
                {headings.length > 0 ? (
                  <nav className="space-y-2 max-h-[600px] overflow-y-auto">
                    {headings.map((heading, index) => {
                      const indentClass = {
                        1: '',
                        2: 'ml-2',
                        3: 'ml-4',
                        4: 'ml-6',
                        5: 'ml-8',
                        6: 'ml-10',
                      }[heading.level] || '';

                      const weightClass = {
                        1: 'font-bold text-gray-900',
                        2: 'font-semibold text-gray-800',
                        3: 'font-medium text-gray-700',
                        4: 'font-normal text-gray-600',
                        5: 'font-normal text-gray-500',
                        6: 'font-normal text-gray-500',
                      }[heading.level] || 'font-normal text-gray-600';

                      return (
                        <a
                          key={`${heading.id}-${index}`}
                          href={`#${heading.id}`}
                          className={`block text-sm ${indentClass} ${weightClass} hover:text-emerald-600 transition-colors py-1 break-words`}
                        >
                          {heading.text}
                        </a>
                      );
                    })}
                  </nav>
                ) : (
                  <div className="text-sm text-gray-500 italic">
                    <p>No headings found in this post.</p>
                  </div>
                )}
              </div>
            </aside>

            {/* Center Column - Main Content */}
            <article className="lg:col-span-6 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              {/* Excerpt Box */}
              {excerpt && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 md:p-8 italic text-lg text-gray-700 rounded-r-lg">
                  {excerpt}
                </div>
              )}

              {/* Main Content */}
              <div className="p-8 md:p-10 lg:p-12">
                <div
                  className="blog-content prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </article>

            {/* Right Sidebar - Related Posts */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-gray-900">Related Posts</h2>
                </div>
                
                {relatedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => {
                      const relatedTitle = getTitle(relatedPost);
                      const relatedImageUrl = getFeaturedImageUrl(relatedPost);
                      const relatedDate = formatDate(relatedPost.date);
                      const relatedReadingTime = getReadingTime(getContent(relatedPost));

                      return (
                        <Link
                          key={relatedPost.id}
                          href={`/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="space-y-2">
                            {relatedImageUrl && (
                              <div className="relative h-32 rounded-lg overflow-hidden">
                                <Image
                                  src={relatedImageUrl}
                                  alt={relatedTitle}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  sizes="(max-width: 1024px) 100vw, 25vw"
                                />
                              </div>
                            )}
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                              {relatedTitle}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{relatedDate}</span>
                              <span>•</span>
                              <span>{relatedReadingTime} min</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No related posts found</p>
                )}
              </div>
            </aside>
          </div>

          {/* Back to Blog Button */}
          <div className="flex justify-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive CSS Styling for Blog Content */}
      <style dangerouslySetInnerHTML={{ __html: `
        html {
          scroll-behavior: smooth;
        }

        .blog-content {
          color: #1f2937;
          font-size: 1.125rem;
          line-height: 1.8;
        }

        .blog-content h1 {
          font-size: 2.25rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
          line-height: 1.2;
        }

        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #111827;
          line-height: 1.3;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #10b981;
        }

        @media (min-width: 1024px) {
          .blog-content h2 {
            font-size: 2.25rem;
          }
        }

        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #1f2937;
          line-height: 1.4;
        }

        @media (min-width: 1024px) {
          .blog-content h3 {
            font-size: 1.875rem;
          }
        }

        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .blog-content h5 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #4b5563;
        }

        .blog-content h6 {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #6b7280;
        }

        .blog-content p {
          margin-bottom: 1.25rem;
          color: #1f2937;
          font-size: 1.125rem;
          line-height: 1.8;
        }

        .blog-content a {
          color: #059669;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .blog-content a:hover {
          color: #047857;
        }

        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }

        .blog-content ul {
          list-style-type: disc;
        }

        .blog-content ol {
          list-style-type: decimal;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
        }

        .blog-content img {
          border-radius: 0.5rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
          max-width: 100%;
          height: auto;
        }

        .blog-content blockquote {
          border-left: 4px solid #10b981;
          background-color: #f0fdf4;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #374151;
        }

        .blog-content code {
          background-color: #1f2937;
          color: #10b981;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: 'Courier New', monospace;
        }

        .blog-content pre {
          background-color: #1f2937;
          color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .blog-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .blog-content th {
          background-color: #10b981;
          color: white;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
        }

        .blog-content td {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .blog-content tr:hover {
          background-color: #f9fafb;
        }

        @media (max-width: 1024px) {
          .blog-content {
            font-size: 1rem;
          }

          .blog-content h1 {
            font-size: 1.875rem;
          }

          .blog-content h2 {
            font-size: 1.5rem;
          }

          .blog-content h3 {
            font-size: 1.25rem;
          }
        }
      `}} />

      <Footer />
    </>
  );
}

// Page View Component
function PageView({ page }: { page: any }) {
  const title = getTitle(page);
  const cleanTitle = cleanPageTitle(title);
  const featuredImage = getFeaturedImage(page);
  const cleanContent = cleanWordPressContent(page.content?.rendered || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-x-hidden">
      {/* Hero Section with Featured Image */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        {/* Background Image */}
        {featuredImage ? (
          <div className="absolute inset-0">
            <Image
              src={featuredImage}
              alt={cleanTitle}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-900/70 via-teal-800/80 to-teal-900/90"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl"></div>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-4">
                <span className="text-white font-bold text-sm">📄 Page Details</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">
                {cleanTitle}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[280px,1fr] gap-8">
              {/* Table of Contents - Sticky */}
              <aside className="lg:sticky lg:top-24 h-fit">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">Contents</h3>
                  </div>
                  <nav className="space-y-2 text-sm">
                    <a href="#content" className="flex items-center gap-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-all py-2 px-3 rounded-lg font-medium">
                      <span className="text-teal-500">→</span> Page Content
                    </a>
                    <a href="#" className="flex items-center gap-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-all py-2 px-3 rounded-lg font-medium">
                      <span className="text-teal-500">→</span> Learn More
                    </a>
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <article id="content" className="overflow-x-hidden">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200">
                  <div
                    className="overflow-x-hidden max-w-none
                      [&_div]:max-w-full [&_div]:overflow-x-auto
                      [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg
                      [&_table]:w-full [&_table]:overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProductBySlug, fetchAllProducts } from '@/lib/woocommerce-api';
import { fetchPostBySlug, fetchPageBySlug, getTitle, getExcerpt, getFeaturedImage } from '@/lib/wordpress-api';
import { cleanWordPressContent } from '@/lib/content-parser';
import { generateCanonicalUrl } from '@/lib/canonical';
import { cleanPageTitle } from '@/lib/html-utils';
import ProductDetailClient from '@/components/ProductDetailClient';
import { getToolBySlug } from '@/lib/tools-data';
import ToolDetailClient from '@/components/ToolDetailClient';
import { fetchAllProductsComplete } from '@/lib/woocommerce-api';
import { matchToolToProduct, getToolProductSlug } from '@/lib/tool-product-matcher';

// Force dynamic rendering to avoid build timeouts
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds (1 minute)

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
      // Check if tool has matching product - but still use tool slug for canonical
      let matchedProduct = null;
      try {
        const { data: allProducts } = await fetchAllProductsComplete();
        if (allProducts && allProducts.length > 0) {
          matchedProduct = matchToolToProduct(tool, allProducts);
        }
      } catch (error) {
        // Continue with tool metadata if product fetch fails
      }
      
      const discountPercent = Math.round(((parseFloat(tool.originalPrice.replace('$', '')) - parseFloat(tool.price.replace('$', ''))) / parseFloat(tool.originalPrice.replace('$', ''))) * 100);
      
      // Always use tool slug for canonical URL (even if product matches)
      return {
        title: `${tool.name} - Group Buy at ${tool.price} | SEORDP`,
        description: `${tool.description}. Get instant access to ${tool.name} at ${tool.price} (${tool.originalPrice} original price). Save ${discountPercent}% with group buy access.`,
        keywords: `${tool.name} group buy, ${tool.name} cheap, ${tool.name} discount, buy ${tool.name}, seo tools, group buy tools`,
        openGraph: {
          title: `${tool.name} - Premium Group Buy Access`,
          description: tool.description,
          type: 'website',
          url: `https://seordp.net/${slug}`, // Keep tool slug in URL
        },
        alternates: {
          canonical: generateCanonicalUrl(`/${slug}`), // Always use tool slug for canonical
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
  
  // Try static tool first
  const tool = getToolBySlug(slug);
  
  // If tool exists, check if it has a matching product - if yes, show product page instead
  if (tool) {
    // Only check for matching product if we need to - otherwise show tool page directly
    try {
      const { data: allProducts } = await fetchAllProductsComplete();
      if (allProducts && allProducts.length > 0) {
        const matchedProduct = matchToolToProduct(tool, allProducts);
        if (matchedProduct && matchedProduct.status === 'publish') {
          // Tool has a matching product - show product page instead
          try {
            const { data: allProductsForRelated } = await fetchAllProducts(1, 8);
            const relatedProducts = allProductsForRelated?.filter(p => 
              p.id !== matchedProduct.id && 
              p.categories?.some(cat => matchedProduct.categories?.some(pCat => pCat.id === cat.id))
            ) || [];
            
            return <ProductDetailClient product={matchedProduct} relatedProducts={relatedProducts} />;
          } catch (error) {
            return <ProductDetailClient product={matchedProduct} relatedProducts={[]} />;
          }
        }
      }
    } catch (error) {
      // If product fetch fails, continue with tool page - don't break for existing tools
    }
    
    // No matching product found OR product fetch failed - show original tool detail page
    return <ToolDetailClient tool={tool} />;
  }
  
  // Try to fetch as product second (with error handling)
  // First try exact slug match
  try {
    const { data: product, error: productError } = await fetchProductBySlug(slug);
    if (product && product.status === 'publish') {
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
          // Found a matching product - show it
          const minLength = Math.min(slugNormalized.length, productNameNormalized.length);
          if (minLength >= 3) {
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
function BlogPostView({ post }: { post: any }) {
  const featuredImage = getFeaturedImage(post);
  const title = getTitle(post);

  return <BlogDetailClient post={post} featuredImage={featuredImage} title={title} />;
}

// Blog Detail Client Component (imported below)
function BlogDetailClient({ post, featuredImage, title }: { post: any; featuredImage: string | null; title: string }) {
  const cleanTitle = cleanPageTitle(title);
  
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      {/* Hero Section with Featured Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
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
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
            <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-500/30 mb-4">
                <span className="text-teal-400 font-bold text-sm">📰 BLOG POST</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                {cleanTitle}
              </h1>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[300px,1fr] gap-8">
              {/* Table of Contents - Sticky */}
              <aside className="lg:sticky lg:top-24 h-fit">
                <div className="card-gradient p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-white">Contents</h3>
                  </div>
                  <nav className="space-y-2 text-sm">
                    <a href="#content" className="block text-slate-400 hover:text-teal-400 transition-colors py-1">
                      → Article Content
                    </a>
                    <a href="#" className="block text-slate-400 hover:text-teal-400 transition-colors py-1">
                      → Read More
                    </a>
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <article id="content" className="overflow-x-hidden">
                <div
                  className="overflow-x-hidden max-w-none
                    [&_div]:max-w-full [&_div]:overflow-x-auto
                    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg
                    [&_table]:w-full [&_table]:overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: cleanWordPressContent(post.content?.rendered || '') }}
                />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
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


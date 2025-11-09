import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProductBySlug, fetchAllProducts } from '@/lib/woocommerce-api';
import { fetchPostBySlug, fetchPageBySlug, getTitle, getExcerpt, getFeaturedImage } from '@/lib/wordpress-api';
import { cleanWordPressContent } from '@/lib/content-parser';
import ProductDetailClient from '@/components/ProductDetailClient';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  
  // Try product first
  const { data: product } = await fetchProductBySlug(slug);
  if (product) {
    return {
      title: product.name,
      description: product.short_description || product.description || `Buy ${product.name} at ${product.price}`,
    };
  }
  
  // Try blog post
  const { data: post } = await fetchPostBySlug(slug);
  if (post) {
    return {
      title: getTitle(post),
      description: getExcerpt(post),
    };
  }
  
  // Try page
  const { data: page } = await fetchPageBySlug(slug);
  if (page) {
    return {
      title: getTitle(page),
      description: getExcerpt(page),
    };
  }
  
  return {
    title: 'Not Found',
  };
}

export default async function UnifiedPage({ params }: PageProps) {
  const { slug } = params;
  
  // Try to fetch as product first
  const { data: product, error: productError } = await fetchProductBySlug(slug);
  if (product) {
    // Fetch related products from same category
    const { data: allProducts } = await fetchAllProducts(1, 8);
    const relatedProducts = allProducts?.filter(p => 
      p.id !== product.id && 
      p.categories?.some(cat => product.categories?.some(pCat => pCat.id === cat.id))
    ) || [];
    
    return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
  }
  
  // Try as blog post
  const { data: post, error: postError } = await fetchPostBySlug(slug);
  if (post) {
    return <BlogPostView post={post} />;
  }
  
  // Try as page
  const { data: page, error: pageError } = await fetchPageBySlug(slug);
  if (page) {
    return <PageView page={page} />;
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
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Featured Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        {featuredImage ? (
          <div className="absolute inset-0">
            <Image
              src={featuredImage}
              alt={title}
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
                {title}
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
              <article id="content">
                <div
                  className="card-gradient p-8 md:p-12 rounded-2xl prose prose-lg prose-invert max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                    prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                    prose-li:text-slate-300 prose-li:mb-2
                    prose-strong:text-white prose-strong:font-bold
                    prose-a:text-teal-400 prose-a:no-underline hover:prose-a:text-teal-300 hover:prose-a:underline
                    prose-ul:my-6 prose-ol:my-6 prose-ul:list-disc prose-ol:list-decimal
                    prose-code:text-teal-400 prose-code:bg-slate-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                    prose-pre:bg-slate-800 prose-pre:text-slate-300 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                    prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-400
                    prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
                    prose-table:border-collapse prose-table:w-full
                    prose-th:bg-slate-800 prose-th:text-white prose-th:font-bold prose-th:p-3
                    prose-td:border prose-td:border-slate-700 prose-td:p-3 prose-td:text-slate-300"
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
  const featuredImage = getFeaturedImage(page);
  const cleanContent = cleanWordPressContent(page.content?.rendered || '');

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Featured Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        {featuredImage ? (
          <div className="absolute inset-0">
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30 mb-4">
                <span className="text-purple-400 font-bold text-sm">📄 INFO</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                {title}
              </h1>
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
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-white">Contents</h3>
                  </div>
                  <nav className="space-y-2 text-sm">
                    <a href="#content" className="block text-slate-400 hover:text-purple-400 transition-colors py-1">
                      → Page Content
                    </a>
                    <a href="#" className="block text-slate-400 hover:text-purple-400 transition-colors py-1">
                      → Learn More
                    </a>
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <article id="content">
                <div
                  className="card-gradient p-8 md:p-12 rounded-2xl prose prose-lg prose-invert max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                    prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                    prose-li:text-slate-300 prose-li:mb-2
                    prose-strong:text-white prose-strong:font-bold
                    prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 hover:prose-a:underline
                    prose-ul:my-6 prose-ol:my-6 prose-ul:list-disc prose-ol:list-decimal
                    prose-code:text-purple-400 prose-code:bg-slate-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                    prose-pre:bg-slate-800 prose-pre:text-slate-300 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                    prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-400
                    prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
                    prose-table:border-collapse prose-table:w-full
                    prose-th:bg-slate-800 prose-th:text-white prose-th:font-bold prose-th:p-3
                    prose-td:border prose-td:border-slate-700 prose-td:p-3 prose-td:text-slate-300"
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


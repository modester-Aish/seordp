import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, List, BookOpen } from 'lucide-react';
import {
  fetchAllPostsComplete,
  fetchPostBySlug,
  getTitle,
  getContent,
  getFeaturedImageUrl,
  getAuthorName,
  formatDate,
  getReadingTime,
  getExcerpt,
} from '@/lib/wordpress-api';
import { generateCanonicalUrl } from '@/lib/canonical';
import { 
  cleanWordPressContent, 
  extractHeadings, 
  addHeadingIds,
  removeFirstHeading,
  HeadingItem 
} from '@/lib/content-parser';
import Footer from '@/components/Footer';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const { data: posts } = await fetchAllPostsComplete();
  
  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: post } = await fetchPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = getTitle(post);
  const excerpt = getExcerpt(post);
  const imageUrl = getFeaturedImageUrl(post);

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      type: 'article',
      url: `https://seordp.net/blog/${params.slug}`,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: generateCanonicalUrl(`/blog/${params.slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { data: post, error } = await fetchPostBySlug(params.slug);

  if (error || !post) {
    notFound();
  }

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
  // This ensures TOC doesn't show the main title again
  if (headings.length > 0 && headings[0].level <= 3) {
    // Check if first heading text matches title (similar)
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
                          href={`/blog/${relatedPost.slug}`}
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

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import {
  fetchAllPosts,
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

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const { data: posts } = await fetchAllPosts(1, 100);
  
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
      url: `https://seordp.net/${params.slug}`,
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
      canonical: generateCanonicalUrl(`/${params.slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { data: post, error } = await fetchPostBySlug(params.slug);

  if (error || !post) {
    notFound();
  }

  const title = getTitle(post);
  const content = getContent(post);
  const imageUrl = getFeaturedImageUrl(post);
  const authorName = getAuthorName(post);
  const formattedDate = formatDate(post.date);
  const readingTime = getReadingTime(content);

  return (
    <article className="min-h-screen bg-slate-900">
      <div className="section-padding relative overflow-hidden">
        {/* Matrix Background */}
        <div className="absolute inset-0 matrix-container opacity-5">
          <div className="matrix-grid"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mx-auto mb-12 max-w-4xl">
            <h1 className="mb-6 text-responsive-4xl font-bold tracking-tight text-white animate-fade-in-up">
              {title}
            </h1>

            <div className="mb-8 flex flex-wrap items-center gap-4 text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {imageUrl && (
              <div className="relative aspect-video overflow-hidden rounded-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="mx-auto max-w-4xl">
            <div className="card-gradient p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div
                className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-a:text-teal-400 prose-a:no-underline hover:prose-a:text-teal-300 hover:prose-a:underline prose-img:rounded-lg prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-code:text-teal-400"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>

          {/* Share & Navigation */}
          <div className="mx-auto mt-12 max-w-4xl border-t border-slate-800 pt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


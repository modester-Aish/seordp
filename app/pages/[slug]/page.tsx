import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  fetchAllPages,
  fetchPageBySlug,
  getTitle,
  getContent,
} from '@/lib/wordpress-api';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const { data: pages } = await fetchAllPages(1, 100);
  
  if (!pages) return [];

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: page } = await fetchPageBySlug(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const title = getTitle(page);

  return {
    title,
    description: page.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
    openGraph: {
      title,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function WordPressPage({ params }: PageProps) {
  const { data: page, error } = await fetchPageBySlug(params.slug);

  if (error || !page) {
    notFound();
  }

  const title = getTitle(page);
  const content = getContent(page);

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
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Page Header */}
          <header className="mx-auto mb-12 max-w-4xl text-center">
            <h1 className="text-responsive-4xl font-bold tracking-tight text-white animate-fade-in-up">
              {title}
            </h1>
          </header>

          {/* Page Content */}
          <div className="mx-auto max-w-4xl">
            <div className="card-gradient p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div
                className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-a:text-teal-400 prose-a:no-underline hover:prose-a:text-teal-300 hover:prose-a:underline prose-img:rounded-lg prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-code:text-teal-400"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}


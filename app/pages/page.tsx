import { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllPagesComplete } from '@/lib/wordpress-api';
import { generateCanonicalUrl } from '@/lib/canonical';
import { cleanPageTitle } from '@/lib/html-utils';
import { getSeoMeta } from '@/lib/seo-from-csv';

/** Returns which data is missing for a page (title, content, excerpt). */
function getMissingData(page: { title?: { rendered?: string }; content?: { rendered?: string }; excerpt?: { rendered?: string } }): string[] {
  const missing: string[] = [];
  const title = (page.title?.rendered ?? '').trim();
  const content = (page.content?.rendered ?? '').trim();
  const excerpt = (page.excerpt?.rendered ?? '').trim();
  if (!title) missing.push('title');
  if (!content || content.length < 20) missing.push('content');
  if (!excerpt) missing.push('excerpt');
  return missing;
}

function getPagesMetadata(): Metadata {
  const csv = getSeoMeta('Pages');
  const title = csv?.meta_title ?? 'SEO Tools Pricing, Plans & Information';
  const description = csv?.meta_description ?? 'Explore group buy SEO tools pricing plans, packages, and detailed information. Compare Ahrefs, SEMrush, Moz Pro plans. Find the best SEO tools subscription for your needs.';
  return {
    title,
    description,
    keywords: 'seo tools pricing, group buy plans, ahrefs pricing, semrush pricing, seo tools packages, seo subscription plans, affordable seo tools',
    openGraph: {
      title,
      description,
      url: 'https://seordp.net/pages',
    },
    alternates: {
      canonical: generateCanonicalUrl('/pages'),
    },
  };
}

export const metadata: Metadata = getPagesMetadata();

export const revalidate = 60; // Revalidate every 60 seconds (1 minute)

const EXCLUDED_PAGE_SLUGS = ['shop-2', 'refund_returns-2'];

export default async function PagesListingPage() {
  const { data: rawPages, error } = await fetchAllPagesComplete();
  const pages = (rawPages || []).filter((p) => !EXCLUDED_PAGE_SLUGS.includes(p.slug));

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
        <div className="card-gradient p-8 text-center max-w-md">
          <h2 className="mb-2 text-2xl font-bold text-white">Error Loading Pages</h2>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!pages || pages.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
        <div className="card-gradient p-8 text-center max-w-md">
          <h2 className="mb-2 text-2xl font-bold text-white">No Pages Found</h2>
          <p className="text-slate-400">Check back later for new pages!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Matrix Background */}
      <div className="absolute inset-0 matrix-container opacity-10">
        <div className="matrix-grid"></div>
      </div>

      {/* Hero Section - Small */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <span className="text-purple-400 font-bold text-sm">📄 EXPLORE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Important <span className="text-purple-400">Information</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Browse through our essential resources and helpful content
            </p>
          </div>
        </div>
      </section>

      <div className="pb-16 relative z-10">
        <div className="container mx-auto px-4">
          {/* Pages Grid - Split Card Design */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {pages.map((page, index) => {
              const excerpt = page.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 120) || 'Explore this resource to learn more about our services and offerings.';
              
              return (
                <Link
                  key={page.id}
                  href={`/${page.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 animate-fade-in-up flex h-[200px]"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Left Section - Title */}
                  <div className="w-2/5 p-6 flex flex-col justify-center bg-slate-50">
                    <h2 className="text-base font-bold text-slate-900 line-clamp-3 group-hover:text-teal-600 transition-colors">
                      {cleanPageTitle(page.title.rendered)}
                    </h2>
                  </div>

                  {/* Right Section - Colored with Description */}
                  <div className="w-3/5 bg-teal-500 p-6 flex flex-col justify-center relative">
                    {/* Bookmark Icon */}
                    <div className="absolute top-4 right-4">
                      <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                      </svg>
                    </div>

                    {/* Excerpt/Description */}
                    <p className="text-white text-sm leading-relaxed line-clamp-4 pr-8">
                      {excerpt}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* See All Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-300">
              See all pages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


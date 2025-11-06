import { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllPages } from '@/lib/wordpress-api';

export const metadata: Metadata = {
  title: 'Pages',
  description: 'Browse all pages and information about SEORDP.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function PagesListingPage() {
  const { data: pages, error } = await fetchAllPages(1, 100);

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
          {/* Pages Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {pages.map((page, index) => (
              <Link
                key={page.id}
                href={`/${page.slug}`}
                className="group relative card-gradient p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    📄
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-2xl font-black text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {page.title.rendered.replace(/<[^>]*>/g, '')}
                  </h2>
                  {page.excerpt?.rendered && (
                    <p 
                      className="text-slate-400 text-sm line-clamp-2"
                      dangerouslySetInnerHTML={{ 
                        __html: page.excerpt.rendered 
                      }}
                    />
                  )}
                </div>

                {/* Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


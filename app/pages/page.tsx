import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllPagesComplete, getFeaturedImage } from '@/lib/wordpress-api';

export const metadata: Metadata = {
  title: 'Pages',
  description: 'Browse all pages and information about SEORDP.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function PagesListingPage() {
  const { data: pages, error } = await fetchAllPagesComplete();

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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {pages.map((page, index) => {
              const featuredImage = getFeaturedImage(page);
              
              // Color scheme for each card
              const colors = [
                { border: 'border-purple-500/30', hover: 'hover:border-purple-500', text: 'group-hover:text-purple-400', bg: 'from-purple-500/5 to-pink-500/5' },
                { border: 'border-teal-500/30', hover: 'hover:border-teal-500', text: 'group-hover:text-teal-400', bg: 'from-teal-500/5 to-cyan-500/5' },
                { border: 'border-orange-500/30', hover: 'hover:border-orange-500', text: 'group-hover:text-orange-400', bg: 'from-orange-500/5 to-amber-500/5' },
                { border: 'border-blue-500/30', hover: 'hover:border-blue-500', text: 'group-hover:text-blue-400', bg: 'from-blue-500/5 to-indigo-500/5' },
              ];
              
              const color = colors[index % colors.length];
              
              return (
                <Link
                  key={page.id}
                  href={`/${page.slug}`}
                  className={`group relative bg-slate-800/50 border-2 ${color.border} ${color.hover} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up flex flex-col h-full`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Featured Image - Only if exists */}
                  {featuredImage && (
                    <div className="relative w-full h-48 overflow-hidden bg-slate-800">
                      <Image
                        src={featuredImage}
                        alt={page.title.rendered.replace(/<[^>]*>/g, '')}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className={`p-6 flex-1 flex flex-col ${!featuredImage ? `bg-gradient-to-br ${color.bg}` : ''}`}>
                    <h2 className={`text-lg font-bold text-white mb-3 ${color.text} transition-colors line-clamp-2`}>
                      {page.title.rendered.replace(/<[^>]*>/g, '')}
                    </h2>
                    
                    {page.excerpt?.rendered && (
                      <p 
                        className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1"
                        dangerouslySetInnerHTML={{ 
                          __html: page.excerpt.rendered 
                        }}
                      />
                    )}

                    {/* Read More Button */}
                    <div className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold ${color.text} transition-all`}>
                      <span>Read More</span>
                      <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}


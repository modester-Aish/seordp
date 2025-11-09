import { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllPosts } from '@/lib/wordpress-api';
import { generateCanonicalUrl } from '@/lib/canonical';

export const metadata: Metadata = {
  title: 'SEO Blog - Tips, Tutorials & Best Practices for Group Buy Tools | SEORDP',
  description: 'Learn SEO strategies, group buy tools tutorials, Ahrefs tips, SEMrush guides, and digital marketing insights. Expert blog for SEO professionals and agencies.',
  keywords: 'seo blog, seo tips, ahrefs tutorial, semrush guide, group buy seo tools blog, digital marketing tips, seo best practices, seo strategies 2025',
  openGraph: {
    title: 'SEO Blog & Tutorials - Master Group Buy SEO Tools',
    description: 'Expert SEO tips, group buy tools tutorials, and digital marketing strategies. Learn from industry professionals.',
    url: 'https://seordp.net/blog',
  },
  alternates: {
    canonical: generateCanonicalUrl('/blog'),
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const { data: posts, error } = await fetchAllPosts(1, 12);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
        <div className="card-gradient p-8 text-center max-w-md">
          <h2 className="mb-2 text-2xl font-bold text-white">Error Loading Posts</h2>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16">
        <div className="card-gradient p-8 text-center max-w-md">
          <h2 className="mb-2 text-2xl font-bold text-white">No Posts Found</h2>
          <p className="text-slate-400">Check back later for new content!</p>
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

      {/* Hero Section - Small & Clean */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
              <span className="text-teal-400 font-bold text-sm">📰 BLOG</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="text-teal-400">SEO Blog</span> & Tutorials
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Master group buy SEO tools with expert tips, Ahrefs tutorials, SEMrush guides, and proven digital marketing strategies
            </p>
          </div>
        </div>
      </section>

      <div className="pb-16 relative z-10">
        <div className="container mx-auto px-4">
          {/* Posts Grid - Split Card Design */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {posts.map((post, index) => {
              const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 120) || 'Read this article to learn more about SEO tools and digital marketing strategies.';
              
              return (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 animate-fade-in-up flex h-[200px]"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Left Section - Title */}
                  <div className="w-2/5 p-6 flex flex-col justify-center bg-slate-50">
                    <h2 className="text-base font-bold text-slate-900 line-clamp-3 group-hover:text-teal-600 transition-colors">
                      {post.title.rendered.replace(/<[^>]*>/g, '')}
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
              See all articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


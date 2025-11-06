import { Metadata } from 'next';
import { fetchAllPosts } from '@/lib/wordpress-api';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles, tutorials, and insights from our team.',
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
              Latest <span className="text-teal-400">Articles</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Stay updated with tips, guides, and industry insights
            </p>
          </div>
        </div>
      </section>

      <div className="pb-16 relative z-10">
        <div className="container mx-auto px-4">
          {/* Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


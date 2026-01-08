'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

interface SearchResult {
  type: 'post' | 'product' | 'tool' | 'page';
  title: string;
  slug: string;
  url: string;
  description?: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Search failed');
        }
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'post':
        return 'Blog Post';
      case 'product':
        return 'Product';
      case 'tool':
        return 'Tool';
      default:
        return 'Page';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'post':
        return 'bg-blue-100 text-blue-800';
      case 'product':
        return 'bg-emerald-100 text-emerald-800';
      case 'tool':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search</h1>

          {/* Search Input */}
          <div className="relative mb-8">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for products, blog posts, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Results */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-gray-600">Searching...</p>
            </div>
          )}

          {!isLoading && hasSearched && (
            <>
              {results.length > 0 ? (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Found {results.length} result{results.length !== 1 ? 's' : ''}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <Link
                        key={`${result.type}-${result.slug}-${index}`}
                        href={result.url}
                        className="block p-6 bg-gray-50 hover:bg-emerald-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded ${getTypeColor(
                                  result.type
                                )}`}
                              >
                                {getTypeLabel(result.type)}
                              </span>
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                {result.title}
                              </h3>
                            </div>
                            {result.description && (
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {result.description}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">{result.url}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-2">No results found</p>
                  <p className="text-sm text-gray-500">
                    Try different keywords or check your spelling
                  </p>
                </div>
              )}
            </>
          )}

          {!hasSearched && !isLoading && (
            <div className="text-center py-12 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Start typing to search...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


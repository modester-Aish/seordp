import {
  WordPressPost,
  WordPressPage,
  WordPressApiResponse,
  WordPressSingleResponse,
  WordPressCategory,
  WordPressTag,
} from '@/types/wordpress';

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com';
const WP_API_URL = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`;

// Cache configuration - data revalidate every 1 hour
const CACHE_REVALIDATE = 3600; // 1 hour in seconds

// Helper function to handle API errors
const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return `Request Error: ${error.message}`;
  }
  return 'An unknown error occurred';
};

// Fetch all posts with optional filters
export async function fetchAllPosts(
  page: number = 1,
  perPage: number = 10,
  categories?: string,
  tags?: string
): Promise<WordPressApiResponse<WordPressPost>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      _embed: 'true',
    });

    if (categories) {
      params.append('categories', categories);
    }

    if (tags) {
      params.append('tags', tags);
    }

    const response = await fetch(`${WP_API_URL}/posts?${params.toString()}`, {
      next: { 
        revalidate: CACHE_REVALIDATE,
        tags: ['posts'] 
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WordPressPost[] = await response.json();
    const total = parseInt(response.headers.get('x-wp-total') || '0');
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '0');

    return {
      data,
      error: null,
      total,
      totalPages,
    };
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch a single post by slug
export async function fetchPostBySlug(
  slug: string
): Promise<WordPressSingleResponse<WordPressPost>> {
  try {
    const params = new URLSearchParams({
      slug,
      _embed: 'true',
    });

    const response = await fetch(`${WP_API_URL}/posts?${params.toString()}`, {
      next: { 
        revalidate: CACHE_REVALIDATE,
        tags: ['posts', `post-${slug}`] 
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WordPressPost[] = await response.json();

    if (data.length === 0) {
      return {
        data: null,
        error: 'Post not found',
      };
    }

    return {
      data: data[0],
      error: null,
    };
  } catch (error: any) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch all pages
export async function fetchAllPages(
  page: number = 1,
  perPage: number = 100
): Promise<WordPressApiResponse<WordPressPage>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      _embed: 'true',
    });

    const response = await fetch(`${WP_API_URL}/pages?${params.toString()}`, {
      next: { 
        revalidate: CACHE_REVALIDATE,
        tags: ['pages'] 
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WordPressPage[] = await response.json();
    const total = parseInt(response.headers.get('x-wp-total') || '0');
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '0');

    return {
      data,
      error: null,
      total,
      totalPages,
    };
  } catch (error: any) {
    console.error('Error fetching pages:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch ALL pages from WordPress (handles pagination automatically)
export async function fetchAllPagesComplete(): Promise<WordPressApiResponse<WordPressPage>> {
  try {
    let allPages: WordPressPage[] = [];
    let totalPages = 1;

    // Fetch first page to get total pages
    const params1 = new URLSearchParams({
      page: '1',
      per_page: '100',
      _embed: 'true',
    });

    const firstResponse = await fetch(`${WP_API_URL}/pages?${params1.toString()}`, {
      next: { 
        revalidate: CACHE_REVALIDATE,
        tags: ['pages', 'all-pages'] 
      }
    });

    if (!firstResponse.ok) {
      throw new Error(`HTTP error! status: ${firstResponse.status}`);
    }

    allPages = await firstResponse.json();
    totalPages = parseInt(firstResponse.headers.get('x-wp-totalpages') || '1');
    const total = parseInt(firstResponse.headers.get('x-wp-total') || '0');

    console.log(`📄 Fetching ${total} pages from ${totalPages} pages...`);

    // Fetch remaining pages if there are more
    if (totalPages > 1) {
      const pagePromises = [];
      for (let page = 2; page <= totalPages; page++) {
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: '100',
          _embed: 'true',
        });

        pagePromises.push(
          fetch(`${WP_API_URL}/pages?${params.toString()}`, {
            next: { 
              revalidate: CACHE_REVALIDATE,
              tags: ['pages', 'all-pages'] 
            }
          }).then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP error! status: ${res.status}`)))
        );
      }

      const responses = await Promise.all(pagePromises);
      responses.forEach(data => {
        allPages = [...allPages, ...data];
      });
    }

    console.log(`✅ Successfully loaded ${allPages.length} pages!`);

    return {
      data: allPages,
      error: null,
      total: allPages.length,
      totalPages: 1, // All pages in one response now
    };
  } catch (error: any) {
    console.error('Error fetching all pages:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch a single page by slug
export async function fetchPageBySlug(
  slug: string
): Promise<WordPressSingleResponse<WordPressPage>> {
  try {
    const params = new URLSearchParams({
      slug,
      _embed: 'true',
    });

    const response = await fetch(`${WP_API_URL}/pages?${params.toString()}`, {
      next: { 
        revalidate: CACHE_REVALIDATE,
        tags: ['pages', `page-${slug}`] 
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WordPressPage[] = await response.json();

    if (data.length === 0) {
      return {
        data: null,
        error: 'Page not found',
      };
    }

    return {
      data: data[0],
      error: null,
    };
  } catch (error: any) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch all categories
export async function fetchAllCategories(): Promise<WordPressApiResponse<WordPressCategory>> {
  try {
    const params = new URLSearchParams({
      per_page: '100',
    });

    const response = await fetch(`${WP_API_URL}/categories?${params.toString()}`, {
      next: { 
        revalidate: CACHE_REVALIDATE,
        tags: ['categories'] 
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WordPressCategory[] = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch all tags
export async function fetchAllTags(): Promise<WordPressApiResponse<WordPressTag>> {
  try {
    const params = new URLSearchParams({
      per_page: '100',
    });

    const response = await fetch(`${WP_API_URL}/tags?${params.toString()}`, {
      next: { 
        revalidate: CACHE_REVALIDATE,
        tags: ['tags'] 
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WordPressTag[] = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error: any) {
    console.error('Error fetching tags:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Helper function to get plain text title
export function getTitle(post: WordPressPost | WordPressPage): string {
  return post.title.rendered.replace(/<[^>]*>/g, '');
}

// Helper function to get plain text content
export function getContent(post: WordPressPost | WordPressPage): string {
  return post.content.rendered;
}

// Helper function to get plain text excerpt
export function getExcerpt(post: WordPressPost | WordPressPage): string {
  // For posts, use excerpt field
  if ('excerpt' in post && post.excerpt) {
    const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '');
    return excerpt.length > 160 ? excerpt.substring(0, 160) + '...' : excerpt;
  }
  
  // For pages, extract from content
  const content = post.content.rendered.replace(/<[^>]*>/g, '').trim();
  return content.length > 160 ? content.substring(0, 160) + '...' : content;
}

// Helper function to get featured image URL
export function getFeaturedImageUrl(
  post: WordPressPost | WordPressPage,
  size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'
): string | null {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

// Alias for getFeaturedImageUrl
export function getFeaturedImage(
  post: WordPressPost | WordPressPage,
  size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'
): string | null {
  return getFeaturedImageUrl(post, size);
}

// Helper function to get author name
export function getAuthorName(post: WordPressPost): string {
  if (post._embedded && post._embedded.author && post._embedded.author[0]) {
    return post._embedded.author[0].name;
  }
  return 'Unknown Author';
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Helper function to get reading time
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const plainText = content.replace(/<[^>]*>/g, '');
  const words = plainText.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}


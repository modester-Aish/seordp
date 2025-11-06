import axios from 'axios';
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

// Helper function to handle API errors
const handleApiError = (error: any): string => {
  if (error.response) {
    return `API Error: ${error.response.status} - ${error.response.statusText}`;
  } else if (error.request) {
    return 'No response received from WordPress API';
  } else {
    return `Request Error: ${error.message}`;
  }
};

// Fetch all posts with optional filters
export async function fetchAllPosts(
  page: number = 1,
  perPage: number = 10,
  categories?: string,
  tags?: string
): Promise<WordPressApiResponse<WordPressPost>> {
  try {
    const params: any = {
      page,
      per_page: perPage,
      _embed: true,
    };

    if (categories) {
      params.categories = categories;
    }

    if (tags) {
      params.tags = tags;
    }

    const response = await axios.get<WordPressPost[]>(`${WP_API_URL}/posts`, {
      params,
    });

    return {
      data: response.data,
      error: null,
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
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
    const response = await axios.get<WordPressPost[]>(`${WP_API_URL}/posts`, {
      params: {
        slug,
        _embed: true,
      },
    });

    if (response.data.length === 0) {
      return {
        data: null,
        error: 'Post not found',
      };
    }

    return {
      data: response.data[0],
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
    const response = await axios.get<WordPressPage[]>(`${WP_API_URL}/pages`, {
      params: {
        page,
        per_page: perPage,
        _embed: true,
      },
    });

    return {
      data: response.data,
      error: null,
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
    };
  } catch (error: any) {
    console.error('Error fetching pages:', error);
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
    const response = await axios.get<WordPressPage[]>(`${WP_API_URL}/pages`, {
      params: {
        slug,
        _embed: true,
      },
    });

    if (response.data.length === 0) {
      return {
        data: null,
        error: 'Page not found',
      };
    }

    return {
      data: response.data[0],
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
    const response = await axios.get<WordPressCategory[]>(`${WP_API_URL}/categories`, {
      params: {
        per_page: 100,
      },
    });

    return {
      data: response.data,
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
    const response = await axios.get<WordPressTag[]>(`${WP_API_URL}/tags`, {
      params: {
        per_page: 100,
      },
    });

    return {
      data: response.data,
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


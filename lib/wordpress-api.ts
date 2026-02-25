import {
  WordPressPost,
  WordPressPage,
  WordPressApiResponse,
  WordPressSingleResponse,
  WordPressCategory,
  WordPressTag,
} from '@/types/wordpress';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Helper: load JSON from public/data (snapshot exported by scripts/export-wordpress-snapshot.js)
async function loadJsonFile<T>(fileName: string): Promise<T> {
  const filePath = join(process.cwd(), 'public', 'data', fileName);
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

// In‑memory caches so we only hit the filesystem once per process
let cachedPosts: WordPressPost[] | null = null;
let cachedPages: WordPressPage[] | null = null;
let cachedCategories: WordPressCategory[] | null = null;
let cachedTags: WordPressTag[] | null = null;

async function getAllPosts(): Promise<WordPressPost[]> {
  if (!cachedPosts) {
    cachedPosts = await loadJsonFile<WordPressPost[]>('wp-posts.json');
  }
  return cachedPosts;
}

async function getAllPages(): Promise<WordPressPage[]> {
  if (!cachedPages) {
    cachedPages = await loadJsonFile<WordPressPage[]>('wp-pages.json');
  }
  return cachedPages;
}

async function getAllCategoriesLocal(): Promise<WordPressCategory[]> {
  if (!cachedCategories) {
    cachedCategories = await loadJsonFile<WordPressCategory[]>('wp-categories.json');
  }
  return cachedCategories;
}

async function getAllTagsLocal(): Promise<WordPressTag[]> {
  if (!cachedTags) {
    cachedTags = await loadJsonFile<WordPressTag[]>('wp-tags.json');
  }
  return cachedTags;
}

// Helper function to handle API‑style errors
const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return `Request Error: ${error.message}`;
  }
  return 'An unknown error occurred';
};

// Fetch all posts with optional filters from local snapshot
export async function fetchAllPosts(
  page: number = 1,
  perPage: number = 10,
  categories?: string,
  tags?: string
): Promise<WordPressApiResponse<WordPressPost>> {
  try {
    let allPosts = await getAllPosts();

    // Filter by category IDs (comma‑separated list, like WordPress API)
    if (categories) {
      const categoryIds = categories
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !Number.isNaN(id));

      if (categoryIds.length > 0) {
        allPosts = allPosts.filter((post: any) =>
          Array.isArray(post.categories) &&
          categoryIds.some((id) => post.categories.includes(id))
        );
      }
    }

    // Filter by tag IDs (comma‑separated)
    if (tags) {
      const tagIds = tags
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !Number.isNaN(id));

      if (tagIds.length > 0) {
        allPosts = allPosts.filter((post: any) =>
          Array.isArray(post.tags) && tagIds.some((id) => post.tags.includes(id))
        );
      }
    }

    const total = allPosts.length;
    const totalPages = perPage > 0 ? Math.max(1, Math.ceil(total / perPage)) : 1;
    const start = (page - 1) * perPage;
    const data = perPage > 0 ? allPosts.slice(start, start + perPage) : allPosts;

    return {
      data,
      error: null,
      total,
      totalPages,
    };
  } catch (error: any) {
    console.error('Error reading local posts snapshot:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch ALL posts from local snapshot
export async function fetchAllPostsComplete(): Promise<WordPressApiResponse<WordPressPost>> {
  try {
    const allPosts = await getAllPosts();

    return {
      data: allPosts,
      error: null,
      total: allPosts.length,
      totalPages: 1,
    };
  } catch (error: any) {
    console.error('Error reading all local posts:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch a single post by slug from local snapshot
export async function fetchPostBySlug(
  slug: string
): Promise<WordPressSingleResponse<WordPressPost>> {
  try {
    const allPosts = await getAllPosts();
    const post = allPosts.find((p) => p.slug === slug);

    if (!post) {
      return {
        data: null,
        error: 'Post not found',
      };
    }

    return {
      data: post,
      error: null,
    };
  } catch (error: any) {
    console.error(`Error finding post with slug ${slug} in local snapshot:`, error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch all pages from local snapshot with simple pagination
export async function fetchAllPages(
  page: number = 1,
  perPage: number = 100
): Promise<WordPressApiResponse<WordPressPage>> {
  try {
    const allPages = await getAllPages();
    const total = allPages.length;
    const totalPages = perPage > 0 ? Math.max(1, Math.ceil(total / perPage)) : 1;
    const start = (page - 1) * perPage;
    const data = perPage > 0 ? allPages.slice(start, start + perPage) : allPages;

    return {
      data,
      error: null,
      total,
      totalPages,
    };
  } catch (error: any) {
    console.error('Error reading local pages snapshot:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch ALL pages from local snapshot
export async function fetchAllPagesComplete(): Promise<WordPressApiResponse<WordPressPage>> {
  try {
    const allPages = await getAllPages();

    return {
      data: allPages,
      error: null,
      total: allPages.length,
      totalPages: 1,
    };
  } catch (error: any) {
    console.error('Error reading all local pages:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch a single page by slug from local snapshot
export async function fetchPageBySlug(
  slug: string
): Promise<WordPressSingleResponse<WordPressPage>> {
  try {
    const allPages = await getAllPages();
    const page = allPages.find((p) => p.slug === slug);

    if (!page) {
      return {
        data: null,
        error: 'Page not found',
      };
    }

    return {
      data: page,
      error: null,
    };
  } catch (error: any) {
    console.error(`Error finding page with slug ${slug} in local snapshot:`, error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch all categories from local snapshot
export async function fetchAllCategories(): Promise<WordPressApiResponse<WordPressCategory>> {
  try {
    const categories = await getAllCategoriesLocal();
    return {
      data: categories,
      error: null,
    };
  } catch (error: any) {
    console.error('Error reading local categories snapshot:', error);
    return {
      data: null,
      error: handleApiError(error),
    };
  }
}

// Fetch all tags from local snapshot
export async function fetchAllTags(): Promise<WordPressApiResponse<WordPressTag>> {
  try {
    const tags = await getAllTagsLocal();
    return {
      data: tags,
      error: null,
    };
  } catch (error: any) {
    console.error('Error reading local tags snapshot:', error);
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


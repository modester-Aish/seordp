import { MetadataRoute } from 'next'
import { fetchAllPagesComplete } from '@/lib/wordpress-api'
import { fetchAllProductsComplete } from '@/lib/woocommerce-api'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://seordp.net'

// Fetch all posts with pagination
async function fetchAllPostsComplete() {
  const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com'
  const WP_API_URL = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`
  
  try {
    let allPosts: any[] = []
    let totalPages = 1
    let currentPage = 1

    // Fetch first page to get total pages
    const firstResponse = await fetch(`${WP_API_URL}/posts?page=1&per_page=100`, {
      next: { revalidate: 3600 }
    })

    if (!firstResponse.ok) {
      throw new Error(`HTTP error! status: ${firstResponse.status}`)
    }

    allPosts = await firstResponse.json()
    totalPages = parseInt(firstResponse.headers.get('x-wp-totalpages') || '1')

    // Fetch remaining pages if there are more
    if (totalPages > 1) {
      const pagePromises = []
      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(
          fetch(`${WP_API_URL}/posts?page=${page}&per_page=100`, {
            next: { revalidate: 3600 }
          }).then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP error! status: ${res.status}`)))
        )
      }

      const responses = await Promise.all(pagePromises)
      responses.forEach(data => {
        allPosts = [...allPosts, ...data]
      })
    }

    return allPosts
  } catch (error) {
    console.error('Error fetching all posts for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pages`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Fetch WordPress pages
  const { data: pages } = await fetchAllPagesComplete()
  const pageEntries: MetadataRoute.Sitemap = (pages || []).map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date(page.modified),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Fetch WordPress posts
  const posts = await fetchAllPostsComplete()
  const postEntries: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fetch WooCommerce products
  const { data: products } = await fetchAllProductsComplete()
  const productEntries: MetadataRoute.Sitemap = (products || []).map((product) => ({
    url: `${SITE_URL}/${product.slug}`,
    lastModified: new Date(product.date_modified || product.date_created),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Combine all entries
  return [...staticPages, ...pageEntries, ...postEntries, ...productEntries]
}


import { NextResponse } from 'next/server';
import { fetchAllPostsComplete } from '@/lib/wordpress-api';

const SITE_URL = 'https://seordp.net';

export async function GET() {
  try {
    const { data: posts } = await fetchAllPostsComplete();
    
    const publishedPosts = (posts || []).filter((post) => post.status === 'publish');

    const rssItems = publishedPosts
      .slice(0, 20) // Latest 20 posts
      .map((post) => {
        const title = post.title.rendered.replace(/<[^>]*>/g, '');
        const content = post.content.rendered.replace(/<[^>]*>/g, '').substring(0, 500);
        const pubDate = new Date(post.date).toUTCString();
        const link = `${SITE_URL}/blog/${post.slug}`;

        return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${content}...]]></description>
    </item>`;
      })
      .join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>SEORDP Blog</title>
    <link>${SITE_URL}</link>
    <description>Latest SEO tools, tips, and resources from SEORDP</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}


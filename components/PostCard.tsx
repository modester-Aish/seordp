import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { WordPressPost } from '@/types/wordpress';
import {
  getTitle,
  getExcerpt,
  getFeaturedImageUrl,
  getAuthorName,
  formatDate,
  getReadingTime,
  getContent,
} from '@/lib/wordpress-api';

interface PostCardProps {
  post: WordPressPost;
}

export default function PostCard({ post }: PostCardProps) {
  const title = getTitle(post);
  const excerpt = getExcerpt(post);
  const imageUrl = getFeaturedImageUrl(post);
  const authorName = getAuthorName(post);
  const formattedDate = formatDate(post.date);
  const readingTime = getReadingTime(getContent(post));

  return (
    <article className="card-gradient group overflow-hidden">
      <Link href={`/${post.slug}`}>
        <div className="relative aspect-video overflow-hidden bg-slate-700">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-600 to-teal-800">
              <span className="text-6xl font-bold text-white">
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{authorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <Link href={`/${post.slug}`}>
          <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-teal-400">
            {title}
          </h2>
        </Link>

        <p className="mb-4 text-slate-300 line-clamp-3">{excerpt}</p>

        <Link
          href={`/${post.slug}`}
          className="inline-flex items-center text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
        >
          Read More
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}


import { fetchAllPages } from '@/lib/wordpress-api';
import Header from './Header';

export default async function HeaderServer() {
  // Fetch WordPress pages for dropdown
  const { data: pages } = await fetchAllPages();
  const filteredPages = pages?.slice(0, 6) || []; // Limit to 6 pages

  return <Header pages={filteredPages} />;
}


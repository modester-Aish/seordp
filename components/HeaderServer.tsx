import { fetchAllPagesComplete } from '@/lib/wordpress-api';
import Header from './Header';

const EXCLUDED_PAGE_SLUGS = ['shop-2', 'refund_returns-2'];

export default async function HeaderServer() {
  const { data: rawPages } = await fetchAllPagesComplete();
  const pages = (rawPages || []).filter((p) => !EXCLUDED_PAGE_SLUGS.includes(p.slug));

  return <Header pages={pages} />;
}


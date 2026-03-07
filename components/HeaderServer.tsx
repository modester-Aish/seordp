import { fetchAllPagesComplete } from '@/lib/wordpress-api';
import Header from './Header';

const EXCLUDED_PAGE_SLUGS = ['shop-2', 'refund_returns-2', 'single-seo-tools', 'cheapest-group-buy-seo-tools-provide-100-premium-tools'];

export default async function HeaderServer() {
  const { data: rawPages } = await fetchAllPagesComplete();
  const pages = (rawPages || []).filter((p) => !EXCLUDED_PAGE_SLUGS.includes(p.slug));

  return <Header pages={pages} />;
}


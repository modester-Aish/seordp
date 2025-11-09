import { fetchAllPagesComplete } from '@/lib/wordpress-api';
import Header from './Header';

export default async function HeaderServer() {
  // Fetch ALL WordPress pages for dropdown
  const { data: pages } = await fetchAllPagesComplete();

  return <Header pages={pages || []} />;
}


import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="card-gradient p-8 text-center max-w-md">
        <h1 className="text-6xl font-bold text-teal-400 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-white mb-2">Page not found</h2>
        <p className="text-slate-400 mb-6">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

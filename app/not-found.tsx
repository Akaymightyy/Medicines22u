import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-4 text-center">
      <div className="text-6xl mb-6">💊</div>
      <h1 className="text-5xl font-display font-bold text-slate-900 dark:text-white mb-3">404</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">Page not found</p>
      <p className="text-slate-500 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Go Back Home
      </Link>
    </div>
  );
}

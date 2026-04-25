'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, Heart, User } from 'lucide-react';
import { useCart } from '@/lib/store';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=Pain Relief', label: 'Pain Relief' },
  { href: '/shop?category=Skincare', label: 'Skincare' },
  { href: '/shop?category=Vitamins', label: 'Vitamins' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQ.trim())}`);
      setSearchQ('');
      setSearchFocused(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-strong shadow-sm'
            : 'bg-transparent'
        }`}
      >
        {/* Top bar */}
        <div className={`transition-all duration-300 overflow-hidden ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
          <div className="bg-primary-600 dark:bg-primary-700 text-white">
            <div className="container-max flex items-center justify-center px-4 py-1.5 text-xs font-medium tracking-wide">
              Free delivery on orders over £25 — Use code <span className="font-bold mx-1">WELCOME10</span> for 10% off your first order
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm shadow-primary-600/25">
                <span className="text-lg font-black leading-none">M</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Medicine<span className="text-primary-600">2uuu</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg ${
                    pathname === link.href
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div layoutId="nav-indicator" className="absolute inset-0 rounded-lg bg-primary-50 dark:bg-primary-900/20 -z-10" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden sm:block relative">
                <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-all duration-200 ${
                  searchFocused
                    ? 'w-64 border-primary-400 bg-white shadow-sm shadow-primary-500/10 dark:bg-slate-800'
                    : 'w-48 border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'
                }`}>
                  <Search size={15} className="text-slate-400 flex-shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search medicines..."
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-white dark:placeholder:text-slate-500"
                    aria-label="Search medicines"
                  />
                  <kbd className="hidden md:inline-flex items-center rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-600 dark:bg-slate-700">⌘K</kbd>
                </div>
              </form>

              <ThemeToggle />

              <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" aria-label="Wishlist">
                <Heart size={16} />
              </button>

              <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" aria-label="Account">
                <User size={16} />
              </button>

              {/* Cart */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                aria-label={`Cart with ${totalItems} items`}
              >
                <ShoppingCart size={16} />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile menu toggle */}
              <button onClick={() => setMobileOpen(true)} className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300" aria-label="Open menu">
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 400, damping: 35 }} className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-white dark:bg-slate-950 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <span className="text-lg font-bold text-slate-900 dark:text-white">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close menu"><X size={20} /></button>
              </div>
              <div className="px-5 py-3">
                <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800">
                  <Search size={15} className="text-slate-400" />
                  <input type="text" placeholder="Search medicines..." value={searchQ} onChange={e => setSearchQ(e.target.value)} className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-white" aria-label="Search medicines" />
                </form>
              </div>
              <nav className="flex-1 px-3 py-2">
                {links.map(link => (
                  <Link key={link.href} href={link.href} className={`flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors ${pathname === link.href ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-[68px]' : 'h-[104px]'}`} />
    </>
  );
}

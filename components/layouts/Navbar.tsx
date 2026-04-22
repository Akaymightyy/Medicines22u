'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingCart, Menu, X, Sun, Moon, ChevronDown,
  Phone, Heart, User, Package
} from 'lucide-react';
import { useCartStore, useThemeStore } from '@/lib/store';

const navLinks = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'All Products', href: '/shop' },
      { label: 'Vitamins & Supplements', href: '/shop?category=vitamins' },
      { label: 'Pain Relief', href: '/shop?category=pain-relief' },
      { label: 'Skincare', href: '/shop?category=skincare' },
      { label: 'Cold & Flu', href: '/shop?category=cold-flu' },
    ],
  },
  { label: 'Prescriptions', href: '#' },
  { label: 'Health Advice', href: '#' },
  { label: 'Brands', href: '#' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems, toggleCart } = useCartStore();
  const { isDark, toggle } = useThemeStore();
  const count = totalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-700 dark:bg-brand-900 text-white text-xs py-2 px-4 text-center">
        <span className="flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <Phone size={11} /> 0800-PHARMA (24/7 Support)
          </span>
          <span className="hidden sm:block">•</span>
          <span className="hidden sm:block">Free delivery on orders over £30</span>
          <span className="hidden md:block">•</span>
          <span className="hidden md:block">✓ GPhC Registered Pharmacy</span>
        </span>
      </div>

      {/* Main navbar */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-medium py-2'
            : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm py-3'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-brand transition-transform group-hover:scale-105">
                <span className="text-white font-bold text-sm">Rx</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl text-brand-700 dark:text-brand-400">Pharma</span>
                <span className="font-display text-xl text-slate-800 dark:text-white">Plus</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950 transition-all duration-200"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  {link.children && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 pt-2 w-52"
                        >
                          <div className="glass rounded-2xl shadow-large p-2 border border-white/50 dark:border-slate-700">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/50 rounded-xl transition-all duration-150"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-xl text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition-all"
                aria-label="Search"
              >
                <Search size={18} />
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex p-2 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-all"
                aria-label="Wishlist"
              >
                <Heart size={18} />
              </motion.button>

              {/* Account */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex p-2 rounded-xl text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 transition-all"
                aria-label="Account"
              >
                <User size={18} />
              </motion.button>

              {/* Dark mode */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggle}
                className="p-2 rounded-xl text-slate-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-brand"
                aria-label="Cart"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:block text-sm font-semibold">Cart</span>
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile menu */}
              <button
                className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pb-3 pt-1">
                  <div className="relative">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for medicines, vitamins, skincare..."
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-slate-100 dark:border-slate-800"
            >
              <nav className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-950 hover:text-brand-600 font-medium transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                  <Link href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <User size={16} /> Account
                  </Link>
                  <Link href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <Package size={16} /> Orders
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

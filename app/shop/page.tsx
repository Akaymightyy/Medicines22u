'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Search, Grid3x3, LayoutList } from 'lucide-react';
import { ProductCard, ProductCardSkeleton } from '@/components/ui/ProductCard';
import { Footer } from '@/components/layout/Footer';
import { products, categories } from '@/lib/data';

const sortOptions = [
  { value: 'popular',    label: 'Most Popular' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'newest',     label: 'Newest First' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(100);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory) list = list.filter((p) => p.category === selectedCategory);
    if (searchQuery) list = list.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    list = list.filter((p) => p.price <= maxPrice);
    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [selectedCategory, sortBy, maxPrice, searchQuery]);

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Page header */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-800 text-white py-12 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-brand-200 text-sm mb-1">Browse our range</p>
            <h1 className="text-3xl md:text-4xl font-display mb-2">All Products</h1>
            <p className="text-brand-100 text-sm">{filtered.length} products available</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                filtersOpen
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-brand-400'
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>

            {/* View mode */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl ml-auto">
              {(['grid', 'list'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === mode
                      ? 'bg-white dark:bg-slate-700 shadow-sm text-brand-600'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {mode === 'grid' ? <Grid3x3 size={15} /> : <LayoutList size={15} />}
                </button>
              ))}
            </div>
          </div>

          {/* Active filters */}
          <AnimatePresence>
            {(selectedCategory || searchQuery) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="flex items-center gap-2 flex-wrap pb-2">
                  <span className="text-xs text-slate-500">Active filters:</span>
                  {selectedCategory && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 text-xs font-medium">
                      {categories.find(c => c.id === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory('')}><X size={12} /></button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 text-xs font-medium">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                    </span>
                  )}
                  <button
                    onClick={() => { setSelectedCategory(''); setSearchQuery(''); setMaxPrice(100); }}
                    className="text-xs text-rose-500 hover:text-rose-600 font-medium ml-1"
                  >
                    Clear all
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-6">
            {/* Sidebar filters */}
            <AnimatePresence>
              {filtersOpen && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="hidden md:block flex-shrink-0 overflow-hidden"
                >
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 space-y-6">
                    {/* Categories */}
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white mb-3 text-sm">Category</h3>
                      <div className="space-y-1">
                        <button
                          onClick={() => setSelectedCategory('')}
                          className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                            selectedCategory === ''
                              ? 'bg-brand-600 text-white'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                          }`}
                        >
                          All Products
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between transition-all ${
                              selectedCategory === cat.id
                                ? 'bg-brand-600 text-white'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span> {cat.name}
                            </span>
                            <span className="text-xs opacity-70">{cat.count}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price range */}
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white mb-3 text-sm flex justify-between">
                        Max Price <span className="text-brand-600">£{maxPrice}</span>
                      </h3>
                      <input
                        type="range"
                        min={5}
                        max={100}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-brand-600"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>£5</span><span>£100</span>
                      </div>
                    </div>

                    {/* In stock only */}
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white mb-3 text-sm">Availability</h3>
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600 dark:text-slate-300">
                        <input type="checkbox" className="rounded accent-brand-600" defaultChecked />
                        In Stock Only
                      </label>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Product grid */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-4xl mb-3">🔍</p>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">No products found</h3>
                  <p className="text-slate-500 text-sm">Try adjusting your filters or search term</p>
                </div>
              ) : (
                <motion.div
                  key={`${selectedCategory}-${sortBy}-${maxPrice}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`grid gap-4 ${
                    viewMode === 'grid'
                      ? 'grid-cols-2 md:grid-cols-3'
                      : 'grid-cols-1'
                  }`}
                >
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" /></div>}>
      <ShopContent />
    </Suspense>
  );
}

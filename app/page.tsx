'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [search, selectedCategory, sortBy, priceRange]);

  const activeFilterCount = [selectedCategory, priceRange[0] > 0 || priceRange[1] < 50].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 50]);
    setSearch('');
  };

  return (
    <div className="section-padding !pt-4">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            {selectedCategory || 'All Products'}
          </motion.h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{filtered.length} products found</p>
        </div>

        <div className="flex gap-8">
          {/* Filters sidebar - desktop */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Search */}
              <div>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="input-field" aria-label="Filter search" />
              </div>

              {/* Categories */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Category</h3>
                <div className="space-y-1.5">
                  <button onClick={() => setSelectedCategory('')} className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${!selectedCategory ? 'bg-primary-50 font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}`}>
                    All Categories
                  </button>
                  {categories.map(c => (
                    <button key={c.id} onClick={() => setSelectedCategory(c.name)} className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${selectedCategory === c.name ? 'bg-primary-50 font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'}`}>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input type="number" min={0} max={50} value={priceRange[0]} onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])} className="input-field !py-2 text-center" placeholder="Min" aria-label="Min price" />
                  <span className="text-slate-400">—</span>
                  <input type="number" min={0} max={50} value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])} className="input-field !py-2 text-center" placeholder="Max" aria-label="Max price" />
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                  <X size={14} /> Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <button onClick={() => setFiltersOpen(true)} className="lg:hidden btn-secondary !py-2 !px-4 text-xs">
                <SlidersHorizontal size={14} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              <div className="relative ml-auto">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field !py-2 !pr-8 appearance-none cursor-pointer text-xs" aria-label="Sort products">
                  <option value="popularity">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Product grid */}
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div key={`${search}-${selectedCategory}-${sortBy}-${priceRange.join('-')}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
                    <SlidersHorizontal size={40} className="text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white">No products found</p>
                  <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or search terms</p>
                  <button onClick={clearFilters} className="btn-primary mt-5 !py-2 !px-5 text-sm">Clear Filters</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 400, damping: 35 }} className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 dark:bg-slate-950 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close filters"><X size={20} /></button>
              </div>

              <div className="space-y-6">
                <div>
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="input-field" aria-label="Filter search" />
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setSelectedCategory('')} className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${!selectedCategory ? 'bg-primary-600 text-white' : 'bg-slate-100 text

'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';

export default function PopularProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const popular = products.filter(p => p.tags.includes('bestseller') || p.tags.includes('popular') || p.rating >= 4.7).slice(0, 8);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Popular Products</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Most loved by our customers</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scroll('left')} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700" aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700" aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="mt-8 flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {popular.map((p, i) => (
            <div key={p.id} className="w-[260px] flex-shrink-0 sm:w-[280px]">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Shield, Truck, Clock } from 'lucide-react';

export default function Hero() {
  const [q, setQ] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/shop?search=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-28">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-accent-50/50 dark:from-primary-950/40 dark:via-slate-950 dark:to-accent-950/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-primary-200/20 to-transparent dark:from-primary-800/10 blur-3xl" />
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
            <Shield size={14} />
            GPhC Licensed Online Pharmacy
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
        >
          Your Health,{' '}
          <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
            Delivered
          </span>{' '}
          to Your Door
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg"
        >
          Browse thousands of medicines, vitamins, and health essentials. Order online with confidence from a fully regulated UK pharmacy.
        </motion.p>

        {/* Search bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSearch}
          className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 transition-shadow focus-within:shadow-xl focus-within:shadow-primary-500/10 focus-within:border-primary-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/50 dark:focus-within:border-primary-600"
        >
          <Search size={20} className="ml-5 flex-shrink-0 text-slate-400" />
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search for medicines, vitamins, skincare..."
            className="flex-1 bg-transparent px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-white dark:placeholder:text-slate-500"
            aria-label="Search products"
          />
          <button type="submit" className="flex items-center gap-2 bg-primary-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-700 sm:px-8">
            Search <ArrowRight size={16} className="hidden sm:block" />
          </button>
        </motion.form>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400"
        >
          <span className="flex items-center gap-1.5"><Truck size={15} className="text-primary-500" /> Free delivery over £25</span>
          <span className="hidden sm:block w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <span className="flex items-center gap-1.5"><Clock size={15} className="text-primary-500" /> Next-day delivery available</span>
          <span className="hidden sm:block w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <span className="flex items-center gap-1.5"><Shield size={15} className="text-primary-500" /> 100% genuine products</span>
        </motion.div>
      </div>
    </section>
  );
}

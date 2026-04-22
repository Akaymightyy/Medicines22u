'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles, Shield, Clock, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const floatingPills = [
  { label: 'Vitamins', emoji: '🌿', delay: 0,    x: '10%',  y: '20%' },
  { label: 'Skincare', emoji: '🧴', delay: 0.5,  x: '82%',  y: '15%' },
  { label: 'Pain Relief', emoji: '💊', delay: 1, x: '75%',  y: '70%' },
  { label: 'Wellness',    emoji: '💚', delay: 1.5, x: '5%', y: '75%' },
];

export function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/shop?search=${encodeURIComponent(query)}`);
    else router.push('/shop');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-mesh">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-brand-300/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-sage-200/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating category pills */}
      {floatingPills.map((pill, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + pill.delay, duration: 0.5 }}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-2 glass rounded-2xl shadow-soft text-sm font-medium text-slate-700 animate-float"
          style={{ left: pill.x, top: pill.y, animationDelay: `${pill.delay}s` }}
        >
          <span>{pill.emoji}</span>
          {pill.label}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-6"
          >
            <Sparkles size={14} className="text-brand-500" />
            GPhC Registered · Next-Day Delivery Available
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] text-slate-900 dark:text-white mb-6"
          >
            Your Health,{' '}
            <span className="italic text-brand-600">Delivered</span>
            <br />
            <span className="text-slate-500 dark:text-slate-400 text-4xl md:text-5xl lg:text-6xl">
              to Your Door
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto"
          >
            Over 5,000 medicines, vitamins, and wellness products from licensed pharmacists, delivered fast.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.45 }}
          >
            <form onSubmit={handleSearch} className="relative flex items-center max-w-xl mx-auto mb-6">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for medicines, vitamins..."
                  className="w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent shadow-soft text-base transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="ml-3 btn-primary py-4 px-6 text-base"
              >
                Search
              </motion.button>
            </form>

            <div className="flex items-center justify-center gap-2 flex-wrap text-sm text-slate-500">
              <span>Popular:</span>
              {['Vitamin D', 'Omega-3', 'Ibuprofen', 'SPF Cream'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setQuery(tag); }}
                  className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-400 hover:text-brand-600 transition-all text-xs font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { icon: <Shield size={20} className="text-brand-500" />, value: '100%', label: 'Licensed' },
              { icon: <Clock size={20} className="text-brand-500" />, value: 'Next Day', label: 'Delivery' },
              { icon: <Star size={20} className="text-amber-400 fill-amber-400" />, value: '4.9★', label: '12k Reviews' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-4 glass rounded-2xl">
                {stat.icon}
                <span className="text-lg font-bold text-slate-800 dark:text-white">{stat.value}</span>
                <span className="text-xs text-slate-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

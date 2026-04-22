'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Star, Zap } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { products, categories } from '@/lib/data';

const tabs = [
  { id: 'popular', label: 'Most Popular', icon: <Flame size={14} /> },
  { id: 'new',     label: 'New Arrivals', icon: <Zap size={14} /> },
  { id: 'rated',   label: 'Top Rated',    icon: <Star size={14} /> },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('popular');

  const filtered = products
    .filter((p) => {
      if (activeTab === 'new') return p.badge === 'New';
      if (activeTab === 'rated') return p.rating >= 4.7;
      return true;
    })
    .slice(0, 8);

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-brand-600 font-semibold text-sm mb-1">Our Products</p>
            <h2 className="text-3xl md:text-4xl font-display text-slate-900 dark:text-white">
              Premium Health Products
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-600 rounded-xl"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.icon} {tab.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/shop" className="btn-primary inline-flex">
            View All Products <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

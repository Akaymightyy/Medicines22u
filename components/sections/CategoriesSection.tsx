'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/data';

export function CategoriesSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-brand-600 font-semibold text-sm mb-1">Browse by Category</p>
            <h2 className="text-3xl md:text-4xl font-display text-slate-900 dark:text-white">
              What are you looking for?
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            View all <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={`/shop?category=${cat.id}`}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative overflow-hidden p-5 rounded-3xl ${cat.bg} dark:bg-slate-800 border border-white dark:border-slate-700 shadow-card hover:shadow-medium transition-all duration-300 cursor-pointer`}
                >
                  {/* Gradient accent */}
                  <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${cat.color} opacity-15 group-hover:opacity-25 transition-opacity`} />

                  <div className="relative">
                    <div className="text-3xl mb-3">{cat.icon}</div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-0.5">{cat.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{cat.count} products</p>

                    <div className="flex items-center gap-1 mt-3 text-brand-600 dark:text-brand-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop now <ArrowRight size={12} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link href="/shop" className="btn-secondary text-sm">
            View all categories
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart, useToast } from '@/lib/store';

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { addToast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    addToast(`${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 28 }}
    >
      <Link href={`/product/${product.id}`} className="card-hover group block overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800">
          <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />

          {/* Tags */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            {discount > 0 && (
              <span className="rounded-lg bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">-{discount}%</span>
            )}
            {product.tags.includes('bestseller') && (
              <span className="rounded-lg bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">Bestseller</span>
            )}
          </div>

          {/* Quick add */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={`absolute bottom-2.5 right-2.5 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-all duration-200 ${
              added
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-slate-700 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary-600 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-primary-600 dark:hover:text-white'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          </motion.button>
        </div>

        {/* Info */}
        <div className="pt-3.5 pb-1">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">{product.category}</p>
          <h3 className="mt-1 text-sm font-semibold leading-snug text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">{product.brand}</p>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className={i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'} />
              ))}
            </div>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900 dark:text-white">£{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">£{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
          }

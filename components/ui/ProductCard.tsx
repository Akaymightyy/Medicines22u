'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { Product, useCartStore } from '@/lib/store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product);
    toast.success(
      <div className="flex items-center gap-2">
        <span className="text-sm">
          <strong>{product.name}</strong> added to cart
        </span>
      </div>,
      { duration: 2500 }
    );
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link href={`/product/${product.id}`}>
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-card hover:shadow-large transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700">
          {/* Image */}
          <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold text-white ${
                  product.badge === 'Sale' ? 'bg-rose-500' :
                  product.badge === 'New' ? 'bg-brand-500' :
                  product.badge === 'Best Seller' ? 'bg-amber-500' :
                  product.badge === 'Premium' ? 'bg-purple-500' :
                  'bg-brand-600'
                }`}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-rose-100 text-rose-600">
                  -{discount}%
                </span>
              )}
            </div>

            {!product.inStock && (
              <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 flex items-center justify-center">
                <span className="px-3 py-1 rounded-xl bg-slate-800 text-white text-xs font-semibold">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Quick actions (appear on hover) */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                className={`w-8 h-8 rounded-xl shadow-soft flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'bg-rose-500 text-white'
                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500'
                }`}
              >
                <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 shadow-soft flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-600 cursor-pointer"
              >
                <Eye size={14} />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs font-medium text-brand-600 dark:text-brand-400 mb-0.5">{product.brand}</p>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {product.rating} ({product.reviews.toLocaleString()})
              </span>
            </div>

            {/* Price & Cart */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  £{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    £{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  product.inStock
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={13} />
                <span>Add</span>
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700">
      <div className="h-48 skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 skeleton rounded-lg w-1/3" />
        <div className="h-4 skeleton rounded-lg w-4/5" />
        <div className="h-3 skeleton rounded-lg w-2/5" />
        <div className="flex justify-between items-center">
          <div className="h-6 skeleton rounded-lg w-1/4" />
          <div className="h-8 skeleton rounded-xl w-16" />
        </div>
      </div>
    </div>
  );
}

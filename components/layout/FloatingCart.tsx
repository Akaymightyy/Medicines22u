'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export function FloatingCart() {
  const { totalItems, toggleCart } = useCartStore();
  const count = totalItems();

  // Only show on mobile scroll or when there are items
  if (count === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-30 md:hidden w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-brand flex items-center justify-center"
      aria-label="Open cart"
    >
      <ShoppingCart size={22} />
      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center">
        {count}
      </span>
    </motion.button>
  );
}

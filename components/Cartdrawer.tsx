'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart, useToast } from '@/lib/store';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { addToast } = useToast();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-slate-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-primary-600" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Cart</h2>
                <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                  {totalItems}
                </span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                    <ShoppingBag size={40} className="text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white">Your cart is empty</p>
                  <p className="mt-1 text-sm text-slate-500">Add items to get started</p>
                  <button onClick={() => setIsCartOpen(false)} className="btn-primary mt-6">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-800/50"
                      >
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{item.name}</p>
                            <p className="text-sm font-bold text-primary-600">£{item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700" aria-label="Decrease quantity">
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold text-slate-900 dark:text-white">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700" aria-label="Increase quantity">
                                <Plus size={12} />
                              </button>
                            </div>
                            <button onClick={() => { removeItem(item.id); addToast('Item removed from cart', 'info'); }} className="text-xs font-medium text-slate-400 transition-colors hover:text-red-500" aria-label="Remove item">
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 px-6 py-5 dark:border-slate-800">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">Subtotal</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.2, color: '#0d9488' }}
                    animate={{ scale: 1, color: 'inherit' }}
                    className="text-lg font-bold text-slate-900 dark:text-white"
                  >
                    £{totalPrice.toFixed(2)}
                  </motion.span>
                </div>
                <p className="mb-4 text-xs text-slate-400">Delivery calculated at checkout</p>
                <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="btn-primary w-full justify-center">
                  Checkout <ArrowRight size={16} />
                </Link>
                <button onClick={() => setIsCartOpen(false)} className="btn-secondary mt-2 w-full justify-center">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

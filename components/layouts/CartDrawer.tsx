'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingCart, Minus, Plus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const total = totalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                  <ShoppingCart size={18} className="text-brand-600" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 dark:text-white">Your Cart</h2>
                  <p className="text-xs text-slate-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                      <ShoppingCart size={32} className="text-slate-400" />
                    </div>
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Your cart is empty</h3>
                    <p className="text-sm text-slate-500">Add some products to get started</p>
                    <button
                      onClick={toggleCart}
                      className="mt-4 btn-primary text-sm"
                    >
                      Continue Shopping
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 group"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-brand-600 font-medium">{item.brand}</p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{item.name}</p>
                        <p className="text-sm font-bold text-brand-600 mt-0.5">£{item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 bg-white dark:bg-slate-700 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-slate-800 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-xs text-slate-500 ml-auto">
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-400 transition-all self-start"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {/* Free delivery progress */}
                {total < 30 && (
                  <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/50">
                    <p className="text-xs text-brand-700 dark:text-brand-300 mb-2">
                      Add <strong>£{(30 - total).toFixed(2)}</strong> more for free delivery!
                    </p>
                    <div className="h-1.5 bg-brand-200 dark:bg-brand-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-brand-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((total / 30) * 100, 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Delivery</span>
                    <span className={total >= 30 ? 'text-green-600 font-medium' : ''}>
                      {total >= 30 ? 'FREE' : '£2.99'}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-800 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.2, color: '#2aacaf' }}
                      animate={{ scale: 1, color: 'inherit' }}
                      transition={{ duration: 0.3 }}
                    >
                      £{(total + (total >= 30 ? 0 : 2.99)).toFixed(2)}
                    </motion.span>
                  </div>
                </div>

                {/* CTAs */}
                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="btn-primary w-full justify-center text-sm py-3.5"
                >
                  Checkout <ArrowRight size={16} />
                </Link>
                <Link
                  href="/cart"
                  onClick={toggleCart}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  View Cart
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck size={12} className="text-green-500" />
                  Secure checkout · SSL encrypted
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

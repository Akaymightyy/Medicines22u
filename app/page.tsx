'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Minus, Plus, Trash2, ArrowRight,
  ShieldCheck, Truck, Tag, ChevronLeft
} from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Footer } from '@/components/layout/Footer';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();
  const delivery = subtotal >= 30 ? 0 : 2.99;
  const total = subtotal + delivery;

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/shop" className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 transition-colors">
              <ChevronLeft size={16} /> Continue Shopping
            </Link>
            <h1 className="text-2xl md:text-3xl font-display text-slate-900 dark:text-white">
              Your Cart
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 text-sm font-semibold">
              {items.length}
            </span>
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-24 h-24 rounded-4xl bg-white dark:bg-slate-800 shadow-soft flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={40} className="text-slate-300 dark:text-slate-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Your cart is empty</h2>
              <p className="text-slate-500 mb-6">Add some products and come back!</p>
              <Link href="/shop" className="btn-primary">Browse Products</Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items */}
              <div className="lg:col-span-2 space-y-3">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-card group border border-slate-100 dark:border-slate-700">
                        <Link href={`/product/${item.id}`} className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">{item.brand}</p>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-semibold text-slate-800 dark:text-white text-sm hover:text-brand-600 transition-colors truncate">{item.name}</h3>
                          </Link>
                          <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">£{item.price.toFixed(2)}</p>

                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-all"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-7 text-center text-sm font-bold text-slate-800 dark:text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-all"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <motion.span
                              key={item.price * item.quantity}
                              initial={{ scale: 1.15, color: '#2aacaf' }}
                              animate={{ scale: 1, color: 'inherit' }}
                              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                              £{(item.price * item.quantity).toFixed(2)}
                            </motion.span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 h-fit rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-400 transition-all self-start mt-1"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-500 transition-colors mt-2"
                >
                  Clear cart
                </button>
              </div>

              {/* Order summary */}
              <div className="space-y-4">
                {/* Coupon */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-100 dark:border-slate-700 shadow-card">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <Tag size={16} className="text-brand-500" /> Discount Code
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                    <button className="px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-100 dark:border-slate-700 shadow-card">
                  <h3 className="font-bold text-slate-800 dark:text-white mb-4">Order Summary</h3>

                  {subtotal < 30 && (
                    <div className="mb-4 p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/30">
                      <p className="text-xs text-brand-700 dark:text-brand-300 mb-2">
                        Add <strong>£{(30 - subtotal).toFixed(2)}</strong> more for free delivery
                      </p>
                      <div className="h-1.5 bg-brand-200 dark:bg-brand-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-brand-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((subtotal / 30) * 100, 100)}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Truck size={13} /> Delivery</span>
                      <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>
                        {delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-2" />
                    <div className="flex justify-between font-bold text-base text-slate-900 dark:text-white">
                      <span>Total</span>
                      <motion.span key={total} initial={{ scale: 1.1, color: '#2aacaf' }} animate={{ scale: 1, color: 'inherit' }} transition={{ duration: 0.3 }}>
                        £{total.toFixed(2)}
                      </motion.span>
                    </div>
                  </div>

                  <Link href="/checkout" className="btn-primary w-full justify-center mb-3">
                    Proceed to Checkout <ArrowRight size={16} />
                  </Link>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                    <ShieldCheck size={12} className="text-green-500" />
                    Secure SSL encrypted checkout
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-3 opacity-50">
                    {['VISA', 'MC', 'AMEX', 'PayPal'].map((card) => (
                      <span key={card} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                        {card}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Heart, Star, Shield, Truck, RotateCcw,
  ChevronLeft, Plus, Minus, CheckCircle2, Info, Share2
} from 'lucide-react';
import { products } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { ProductCard } from '@/components/ui/ProductCard';
import { Footer } from '@/components/layout/Footer';
import toast from 'react-hot-toast';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCartStore();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    toast.success(`${product.name} added to cart!`);
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'directions',  label: 'Directions' },
    { id: 'reviews',     label: `Reviews (${product.reviews.toLocaleString()})` },
  ];

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-600 transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-slate-800 dark:text-white truncate max-w-xs">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-square rounded-4xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 shadow-large group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.badge && (
                  <span className={`absolute top-5 left-5 px-3 py-1.5 rounded-xl text-sm font-bold text-white shadow-soft ${
                    product.badge === 'Sale' ? 'bg-rose-500' :
                    product.badge === 'New' ? 'bg-brand-500' :
                    'bg-amber-500'
                  }`}>
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-2xl glass flex items-center justify-center transition-all hover:scale-110"
                >
                  <Heart size={18} className={wishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600'} />
                </button>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-5"
            >
              <div>
                <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm mb-1">{product.brand}</p>
                <h1 className="text-3xl md:text-4xl font-display text-slate-900 dark:text-white leading-tight mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'} />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {product.rating} · {product.reviews.toLocaleString()} reviews
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">£{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-slate-400 line-through">£{product.originalPrice.toFixed(2)}</span>
                    <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-600 text-sm font-bold">
                      Save £{(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{product.description}</p>

              {/* Stock indicator */}
              <div className={`flex items-center gap-2 text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-rose-500'}`}>
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500 animate-pulse' : 'bg-rose-500'}`} />
                {product.inStock ? 'In Stock — Ready to ship' : 'Currently Out of Stock'}
              </div>

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-slate-800 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-base transition-all ${
                    added
                      ? 'bg-green-500 text-white'
                      : product.inStock
                      ? 'btn-primary'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                        <CheckCircle2 size={18} /> Added!
                      </motion.span>
                    ) : (
                      <motion.span key="add" className="flex items-center gap-2">
                        <ShoppingCart size={18} /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="w-12 h-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:border-rose-300 transition-all"
                >
                  <Heart size={18} className={wishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-500'} />
                </button>
              </div>

              {/* Delivery info */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Truck size={16} />, text: 'Next day delivery' },
                  { icon: <Shield size={16} />, text: 'Pharmacy verified' },
                  { icon: <RotateCcw size={16} />, text: 'Easy returns' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center text-xs text-slate-600 dark:text-slate-300">
                    <span className="text-brand-500">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mb-16">
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id ? 'text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeProductTab" className="absolute inset-0 bg-brand-600 rounded-xl" />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="prose dark:prose-invert max-w-none"
              >
                {activeTab === 'description' && (
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{product.description}</p>
                    <ul className="mt-4 space-y-2">
                      {['Premium quality ingredients', 'Third-party lab tested', 'No artificial additives', 'GPhC approved supplier'].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'directions' && (
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6">
                    <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl mb-4">
                      <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700 dark:text-amber-300">Always read the label. Do not exceed the recommended dose.</p>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">Take as directed by your healthcare professional or as indicated on the label. Store in a cool, dry place away from direct sunlight. Keep out of reach of children.</p>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah M.', rating: 5, text: 'Excellent product, really noticed a difference within 2 weeks!', date: '2 days ago' },
                      { name: 'James P.', rating: 4, text: 'Great quality and fast delivery. Will definitely reorder.', date: '1 week ago' },
                      { name: 'Emma L.', rating: 5, text: 'Best price I\'ve found online. Packaging was excellent too.', date: '2 weeks ago' },
                    ].map((review, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                              {review.name[0]}
                            </div>
                            <span className="font-semibold text-sm text-slate-800 dark:text-white">{review.name}</span>
                          </div>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{review.text}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-display text-slate-900 dark:text-white mb-6">You might also like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

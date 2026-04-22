'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, CheckCircle2, Package,
  MapPin, CreditCard, ShieldCheck, Lock, Truck
} from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Footer } from '@/components/layout/Footer';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, label: 'Delivery',  icon: <MapPin size={16} /> },
  { id: 2, label: 'Payment',   icon: <CreditCard size={16} /> },
  { id: 3, label: 'Review',    icon: <Package size={16} /> },
];

function InputField({ label, placeholder, type = 'text', required = true }: {
  label: string; placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-sm"
      />
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { items, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();
  const delivery = subtotal >= 30 ? 0 : 2.99;
  const total = subtotal + delivery;
  const router = useRouter();

  const handlePlaceOrder = () => {
    clearCart();
    toast.success('Order placed! Check your email for confirmation.', { duration: 4000 });
    setTimeout(() => router.push('/'), 1500);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/cart" className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 transition-colors">
              <ChevronLeft size={16} /> Back to Cart
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span className="text-white font-bold text-xs">Rx</span>
              </div>
              <span className="font-display text-lg"><span className="text-brand-600">Pharma</span>Plus</span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center mb-10">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => step > s.id && setStep(s.id)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <motion.div
                    animate={{
                      background: step >= s.id
                        ? 'linear-gradient(135deg, #1e8a8d, #2aacaf)'
                        : '#e2e8f0',
                    }}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                      step >= s.id ? 'text-white shadow-brand' : 'text-slate-400'
                    } ${step > s.id ? 'cursor-pointer hover:scale-105' : ''}`}
                  >
                    {step > s.id ? <CheckCircle2 size={18} /> : s.icon}
                  </motion.div>
                  <span className={`text-xs font-medium ${step >= s.id ? 'text-brand-600' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex items-center pb-5 mx-2">
                    <motion.div
                      animate={{ background: step > s.id ? '#2aacaf' : '#e2e8f0' }}
                      className="w-16 md:w-24 h-0.5 rounded-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form area */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-700"
                  >
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                      <MapPin size={20} className="text-brand-500" /> Delivery Address
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="First Name" placeholder="John" />
                      <InputField label="Last Name" placeholder="Smith" />
                      <div className="col-span-2">
                        <InputField label="Email Address" placeholder="john@example.com" type="email" />
                      </div>
                      <div className="col-span-2">
                        <InputField label="Phone Number" placeholder="+44 7700 000000" type="tel" />
                      </div>
                      <div className="col-span-2">
                        <InputField label="Address Line 1" placeholder="123 High Street" />
                      </div>
                      <div className="col-span-2">
                        <InputField label="Address Line 2" placeholder="Flat 4B" required={false} />
                      </div>
                      <InputField label="City" placeholder="London" />
                      <InputField label="Postcode" placeholder="SW1A 1AA" />
                    </div>

                    {/* Delivery options */}
                    <div className="mt-6">
                      <h3 className="font-semibold text-slate-800 dark:text-white mb-3 text-sm">Delivery Method</h3>
                      <div className="space-y-2">
                        {[
                          { label: 'Standard Delivery', sub: '3-5 working days', price: subtotal >= 30 ? 'FREE' : '£2.99', selected: true },
                          { label: 'Next-Day Delivery', sub: 'Order by 4pm', price: '£4.99', selected: false },
                          { label: 'Named Day', sub: 'Choose your day', price: '£6.99', selected: false },
                        ].map((opt, i) => (
                          <label key={i} className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                            opt.selected
                              ? 'border-brand-400 bg-brand-50 dark:bg-brand-950/30'
                              : 'border-slate-200 dark:border-slate-700 hover:border-brand-200'
                          }`}>
                            <input type="radio" name="delivery" defaultChecked={opt.selected} className="accent-brand-600" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-800 dark:text-white">{opt.label}</p>
                              <p className="text-xs text-slate-500">{opt.sub}</p>
                            </div>
                            <span className={`text-sm font-bold ${opt.price === 'FREE' ? 'text-green-600' : 'text-slate-700 dark:text-slate-300'}`}>
                              {opt.price}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setStep(2)}
                      className="btn-primary w-full justify-center mt-6 py-4"
                    >
                      Continue to Payment <ChevronRight size={18} />
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-700"
                  >
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                      <CreditCard size={20} className="text-brand-500" /> Payment Details
                    </h2>

                    <div className="flex items-center gap-2 p-3 rounded-2xl bg-green-50 dark:bg-green-950/30 mb-5">
                      <Lock size={14} className="text-green-600" />
                      <span className="text-xs text-green-700 dark:text-green-300 font-medium">Your payment is secured with 256-bit SSL encryption</span>
                    </div>

                    <div className="space-y-4">
                      <InputField label="Cardholder Name" placeholder="John Smith" />
                      <InputField label="Card Number" placeholder="1234 5678 9012 3456" />
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="Expiry Date" placeholder="MM / YY" />
                        <InputField label="CVV" placeholder="123" />
                      </div>
                    </div>

                    {/* Payment methods */}
                    <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-xs text-slate-500 mb-3 font-medium">Or pay with</p>
                      <div className="flex gap-2">
                        {['PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
                          <button
                            key={method}
                            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-brand-400 hover:text-brand-600 transition-all"
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-brand-400 transition-all text-sm"
                      >
                        Back
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setStep(3)}
                        className="flex-1 btn-primary justify-center py-4"
                      >
                        Review Order <ChevronRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-card border border-slate-100 dark:border-slate-700"
                  >
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                      <Package size={20} className="text-brand-500" /> Review Your Order
                    </h2>

                    <div className="space-y-3 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900">
                          <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0 overflow-hidden relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-brand-600 font-medium">{item.brand}</p>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{item.name}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">£{(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-xs text-slate-400">× {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 space-y-2 text-sm mb-6">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1"><Truck size={12} /> Delivery</span>
                        <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>{delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}</span>
                      </div>
                      <div className="h-px bg-slate-200 dark:bg-slate-700" />
                      <div className="flex justify-between font-bold text-base text-slate-900 dark:text-white">
                        <span>Total</span><span>£{total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-brand-400 transition-all text-sm">
                        Back
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handlePlaceOrder}
                        className="flex-1 btn-primary justify-center py-4 text-base"
                      >
                        Place Order · £{total.toFixed(2)}
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-slate-500">
                      <ShieldCheck size={12} className="text-green-500" />
                      SSL secured · GPhC registered · Money-back guarantee
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order summary sidebar */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-card border border-slate-100 dark:border-slate-700 h-fit sticky top-24">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{items.reduce((s, i) => s + i.quantity, 0)} items</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>
                    {delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}
                  </span>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-700" />
                <div className="flex justify-between font-bold text-base text-slate-900 dark:text-white">
                  <span>Total</span><span>£{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                {[
                  { icon: <ShieldCheck size={12} className="text-green-500" />, text: 'GPhC Registered' },
                  { icon: <Lock size={12} className="text-brand-500" />, text: 'SSL Encrypted' },
                  { icon: <Truck size={12} className="text-brand-500" />, text: 'Next-day available' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">{item.icon}{item.text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

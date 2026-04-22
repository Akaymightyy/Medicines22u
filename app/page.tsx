"use client";

import { useState } from "react"; import { motion } from "framer-motion"; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card";

const PRODUCTS = [ { id: 1, name: "Paracetamol 500mg", price: 2000, desc: "Pain relief medicine" }, { id: 2, name: "Vitamin C Tablets", price: 3500, desc: "Boost immunity daily" }, { id: 3, name: "Cough Syrup", price: 4500, desc: "Fast relief for cough" }, { id: 4, name: "First Aid Kit", price: 12000, desc: "Emergency essentials pack" }, { id: 5, name: "Antibiotic Capsules", price: 8000, desc: "Prescription support medicine" }, { id: 6, name: "Pain Relief Gel", price: 5000, desc: "External muscle relief" }, ];

export default function Home() { const [cart, setCart] = useState([]);

const addToCart = (product) => { setCart((prev) => { const existing = prev.find((item) => item.id === product.id);

if (existing) {
    return prev.map((item) =>
      item.id === product.id
        ? { ...item, qty: item.qty + 1 }
        : item
    );
  }

  return [...prev, { ...product, qty: 1 }];
});

};

const removeFromCart = (id) => { setCart((prev) => prev .map((item) => item.id === id ? { ...item, qty: item.qty - 1 } : item ) .filter((item) => item.qty > 0) ); };

const total = cart.reduce( (sum, item) => sum + item.price * item.qty, 0 );

const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

return ( <div className="min-h-screen bg-background text-foreground">

{/* HEADER */}
  <header className="flex justify-between items-center px-6 py-4 border-b bg-white/70 backdrop-blur">
    <h1 className="font-bold text-xl">Medicines22U</h1>
    <div className="text-sm font-medium">
      Cart: {totalItems} items | ₦{total}
    </div>
  </header>

  {/* HERO */}
  <section className="text-center py-16 px-6">
    <h2 className="text-4xl font-display font-bold">
      Your Online Pharmacy Store
    </h2>
    <p className="text-muted-foreground mt-3">
      Buy medicines, supplements and health essentials instantly
    </p>
  </section>

  {/* PRODUCTS */}
  <section className="px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
    {PRODUCTS.map((product) => (
      <motion.div key={product.id} whileHover={{ y: -6 }}>
        <Card className="rounded-2xl shadow-soft border border-border">
          <CardContent className="p-5">
            <div className="h-32 bg-gradient-to-br from-brand-100 to-sage-100 rounded-xl mb-4" />

            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">
              {product.desc}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-brand-600">
                ₦{product.price}
              </span>

              <Button size="sm" onClick={() => addToCart(product)}>
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </section>

  {/* CART */}
  <section className="px-6 py-12 max-w-3xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

    {cart.length === 0 ? (
      <p className="text-muted-foreground">Cart is empty</p>
    ) : (
      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded-xl"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                ₦{item.price} x {item.qty}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeFromCart(item.id)}
              >
                -
              </Button>

              <span className="w-6 text-center">{item.qty}</span>

              <Button
                size="sm"
                onClick={() => addToCart(item)}
              >
                +
              </Button>
            </div>
          </div>
        ))}

        <div className="text-right font-bold mt-4">
          Total: ₦{total}
        </div>

        <Button className="w-full mt-4 bg-brand-600 hover:bg-brand-700">
          Checkout
        </Button>
      </div>
    )}
  </section>

  {/* FOOTER */}
  <footer className="text-center py-10 text-sm text-muted-foreground">
    © {new Date().getFullYear()} Medicines22U
  </footer>
</div>

); }

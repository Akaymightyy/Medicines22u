import { motion } from "framer-motion"; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card";

export default function Home() { return ( <div className="min-h-screen bg-background text-foreground"> {/* HERO */} <section className="relative overflow-hidden px-6 pt-20 pb-24"> <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-white to-sage-100 opacity-70" />

<motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative max-w-5xl mx-auto text-center"
    >
      <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight">
        Modern Healthcare,
        <span className="text-brand-600"> Delivered Faster</span>
      </h1>

      <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
        A premium pharmacy experience built for speed, trust, and comfort.
        Order medicines, wellness products, and essentials with confidence.
      </p>

      <div className="mt-8 flex gap-4 justify-center">
        <Button className="px-6 py-6 text-lg bg-brand-600 hover:bg-brand-700">
          Shop Medicines
        </Button>
        <Button variant="outline" className="px-6 py-6 text-lg">
          Learn More
        </Button>
      </div>
    </motion.div>

    {/* floating shapes */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-brand-200 rounded-full blur-3xl opacity-60 animate-float" />
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-sage-200 rounded-full blur-3xl opacity-60 animate-float-slow" />
  </section>

  {/* TRUST BAR */}
  <section className="py-10 border-y bg-white/60 backdrop-blur">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">
      {[
        "Fast Delivery",
        "Verified Pharmacy",
        "Secure Payments",
        "24/7 Support",
      ].map((item, i) => (
        <div key={i} className="font-medium text-sm text-muted-foreground">
          {item}
        </div>
      ))}
    </div>
  </section>

  {/* PRODUCTS */}
  <section className="px-6 py-20 max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-display font-semibold">
        Featured Products
      </h2>
      <p className="text-muted-foreground mt-2">
        Carefully selected essentials for your wellbeing
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <motion.div
          key={item}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="rounded-2xl shadow-soft border border-border">
            <CardContent className="p-6">
              <div className="h-40 bg-gradient-to-br from-brand-100 to-sage-100 rounded-xl mb-4" />
              <h3 className="font-semibold text-lg">Product Name</h3>
              <p className="text-sm text-muted-foreground">
                High quality medical essential for daily use
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-brand-600">₦5,000</span>
                <Button size="sm">Add</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </section>

  {/* CTA */}
  <section className="px-6 py-24 bg-gradient-to-br from-brand-600 to-sage-700 text-white text-center">
    <h2 className="text-4xl font-display font-bold">
      Your Health, Our Priority
    </h2>
    <p className="mt-4 text-white/80 max-w-xl mx-auto">
      Join thousands of users who trust us for safe and fast medical
      delivery.
    </p>
    <Button className="mt-8 bg-white text-brand-700 hover:bg-white/90">
      Get Started
    </Button>
  </section>

  {/* FOOTER */}
  <footer className="py-10 text-center text-sm text-muted-foreground">
    © {new Date().getFullYear()} Medicines22U. All rights reserved.
  </footer>
</div>

); }

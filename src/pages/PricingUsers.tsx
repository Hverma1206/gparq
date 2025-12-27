import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Car, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const PricingUsers = () => {
  const plans = [
    {
      name: "Pay As You Go",
      description: "Perfect for occasional parking",
      price: "Variable",
      priceNote: "Pay per booking",
      features: [
        "No subscription required",
        "Search unlimited spaces",
        "Hourly/daily bookings",
        "Digital QR/OTP entry",
        "Basic support"
      ],
      cta: "Start Free",
      highlighted: false
    },
    {
      name: "Parq Plus",
      description: "For regular commuters",
      price: "₹199",
      priceNote: "per month",
      features: [
        "Everything in Pay As You Go",
        "5% off all bookings",
        "Priority booking access",
        "Extended cancellation window",
        "Priority support"
      ],
      cta: "Get Parq Plus",
      highlighted: true
    },
    {
      name: "Parq Pro",
      description: "For power users",
      price: "₹499",
      priceNote: "per month",
      features: [
        "Everything in Parq Plus",
        "15% off all bookings",
        "Free cancellations",
        "Reserved spots at partner locations",
        "Dedicated account manager"
      ],
      cta: "Go Pro",
      highlighted: false
    }
  ];

  const addons = [
    { name: "EV Charging", price: "Market rate", desc: "Pay per kWh at charging spots" },
    { name: "Car Wash", price: "From ₹199", desc: "Exterior wash during parking" },
    { name: "Full Detailing", price: "From ₹999", desc: "Interior + exterior cleaning" },
    { name: "Overstay", price: "1.5x rate", desc: "Charged per hour beyond booking" }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Pricing for Drivers
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Simple, <span className="text-gradient">transparent</span> pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Pay only for what you use. No hidden fees, ever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toggle */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <Link to="/pricing/users">
              <Button variant="default" size="lg">
                <Car className="w-4 h-4 mr-2" />
                For Drivers
              </Button>
            </Link>
            <Link to="/pricing/hosts">
              <Button variant="outline" size="lg">
                <Building2 className="w-4 h-4 mr-2" />
                For Hosts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-3xl border ${
                  plan.highlighted 
                    ? 'bg-gradient-card border-primary/50 shadow-lg shadow-primary/10' 
                    : 'bg-card border-border'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {plan.priceNote}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.highlighted ? "hero" : "outline"} 
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Add-on Services
            </h2>
            <p className="text-muted-foreground">
              Optional services available at select locations
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {addons.map((addon, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border">
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {addon.name}
                </h3>
                <p className="text-primary font-medium mb-2">{addon.price}</p>
                <p className="text-sm text-muted-foreground">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Questions about pricing?
            </h2>
            <Link to="/faqs">
              <Button variant="outline">
                View FAQs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PricingUsers;

import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, QrCode, Car, CreditCard, Clock, Shield, CheckCircle, ArrowRight, Smartphone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorksUsers = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Search for Parking",
      description: "Open the Parq app or website. Enter your destination, browse the map, or use GPS to find nearby verified parking spots.",
      details: [
        "Filter by price, EV charging, covered parking",
        "See real-time availability",
        "Compare ratings and reviews",
        "View photos and amenities"
      ]
    },
    {
      step: "02",
      icon: Clock,
      title: "Select Time & Book",
      description: "Choose your parking duration - hourly, daily, or monthly. Select add-on services like car wash or EV charging.",
      details: [
        "Flexible time selection",
        "Advance booking available",
        "Add car wash, EV charging",
        "Apply promo codes"
      ]
    },
    {
      step: "03",
      icon: CreditCard,
      title: "Pay Securely",
      description: "Pay instantly via UPI, cards, net banking, or Parq Wallet. Get a digital parking pass on your phone.",
      details: [
        "Multiple payment options",
        "Secure transactions",
        "Instant confirmation",
        "Digital receipt"
      ]
    },
    {
      step: "04",
      icon: QrCode,
      title: "Entry via QR/OTP",
      description: "Arrive at the parking spot. Scan the QR code or show your OTP to the guard for instant entry. No tickets needed.",
      details: [
        "Contactless entry",
        "No physical tickets",
        "Auto time tracking",
        "Guard assistance available"
      ]
    },
    {
      step: "05",
      icon: Car,
      title: "Park & Go",
      description: "Park your vehicle safely. When leaving, scan out or notify via app. Overstay? Auto-billing handles it.",
      details: [
        "CCTV monitored spaces",
        "Insurance coverage",
        "Overstay notifications",
        "Easy exit process"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              How It Works
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Parking made <span className="text-gradient">simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From search to exit — your complete guide to stress-free parking with Parq.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/search">
                <Button variant="hero">
                  Find Parking Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="heroOutline">
                  Create Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-display font-bold text-primary-foreground">
                      {step.step}
                    </span>
                    <div className="h-px w-12 bg-primary/30" />
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-card border border-border p-12 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-3xl bg-primary/20 flex items-center justify-center">
                        <step.icon className="w-16 h-16 text-primary" />
                      </div>
                      <motion.div
                        className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="font-display font-bold text-primary-foreground text-xl">
                          {step.step}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Your safety, our priority
            </h2>
            <p className="text-lg text-muted-foreground">
              Every parking spot is verified. Your vehicle is protected with comprehensive insurance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Verified Spaces", desc: "Every spot is physically verified by our team" },
              { icon: Smartphone, title: "Real-time Updates", desc: "Entry, exit, and overstay notifications" },
              { icon: MapPin, title: "Live Tracking", desc: "Track your parking session in real-time" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to park smarter?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who've switched to stress-free parking.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/search">
                <Button variant="hero">
                  Find Parking Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/how-it-works/hosts">
                <Button variant="heroOutline">
                  I Have a Parking Space
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HowItWorksUsers;

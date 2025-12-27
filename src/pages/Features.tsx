import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Shield, Zap, Camera, Clock, Smartphone, CreditCard, MapPin, Star,
  Car, QrCode, Bell, Wallet, Calendar, Users, Lock, Headphones,
  ArrowRight, CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const featureCategories = [
    {
      title: "For Vehicle Owners",
      description: "Everything you need for stress-free parking",
      features: [
        { icon: MapPin, title: "Smart Discovery", desc: "GPS-based search with real-time availability and ETA" },
        { icon: Shield, title: "Verified Spaces", desc: "Every spot is physically verified and inspected" },
        { icon: QrCode, title: "Digital Access", desc: "QR code or OTP entry - no physical tickets" },
        { icon: CreditCard, title: "Easy Payments", desc: "UPI, cards, wallet, and auto-billing" },
        { icon: Clock, title: "Flexible Duration", desc: "Book by hour, day, week, or month" },
        { icon: Car, title: "Multiple Vehicles", desc: "Add and manage all your vehicles in one app" },
        { icon: Bell, title: "Smart Alerts", desc: "Entry, exit, and overstay notifications" },
        { icon: Star, title: "Ratings & Reviews", desc: "Make informed decisions with user feedback" }
      ]
    },
    {
      title: "For Space Owners",
      description: "Turn your unused space into income",
      features: [
        { icon: Calendar, title: "Availability Control", desc: "Set your own hours and blackout dates" },
        { icon: Wallet, title: "Earnings Dashboard", desc: "Track revenue, payouts, and occupancy" },
        { icon: Camera, title: "CCTV Integration", desc: "Connect your cameras for enhanced security" },
        { icon: Users, title: "Booking Management", desc: "Accept, reject, or auto-approve bookings" },
        { icon: Lock, title: "Property Protection", desc: "Up to ₹10 Lakh insurance coverage" },
        { icon: Zap, title: "Surge Pricing", desc: "Earn more during events and peak hours" },
        { icon: Smartphone, title: "Mobile Dashboard", desc: "Manage everything from your phone" },
        { icon: Headphones, title: "Host Support", desc: "Priority support for all hosts" }
      ]
    }
  ];

  const premiumFeatures = [
    {
      icon: Zap,
      title: "EV Charging",
      description: "Find and filter by EV charging availability. Track charging status and pay seamlessly.",
      highlight: true
    },
    {
      icon: Camera,
      title: "24/7 CCTV",
      description: "Most Parq spots feature CCTV surveillance. View live feed from select locations.",
      highlight: false
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "All bookings include vehicle protection. File claims directly through the app.",
      highlight: false
    },
    {
      icon: Users,
      title: "Fleet Management",
      description: "Manage parking for your entire fleet with centralized billing and analytics.",
      highlight: true
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
              Features
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Built for <span className="text-gradient">modern mobility</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Smart parking features designed for drivers, hosts, and the cities of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-24 ${categoryIndex % 2 === 1 ? 'bg-card' : 'bg-background'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {category.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {category.description}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-6 rounded-2xl border border-border hover:border-primary/30 transition-all ${
                    categoryIndex % 2 === 1 ? 'bg-background' : 'bg-card'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Premium Features */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Premium Features
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Going beyond parking
            </h2>
            <p className="text-lg text-muted-foreground">
              EV charging, fleet management, and more — designed for the future of urban mobility.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {premiumFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-3xl border ${
                  feature.highlight 
                    ? 'bg-gradient-card border-primary/30' 
                    : 'bg-card border-border'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  feature.highlight ? 'bg-primary' : 'bg-primary/10'
                }`}>
                  <feature.icon className={`w-7 h-7 ${
                    feature.highlight ? 'text-primary-foreground' : 'text-primary'
                  }`} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Why choose Parq?
              </h2>
              <p className="text-muted-foreground">
                See how we compare to traditional parking
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-muted/50 border border-border">
                <h3 className="font-display text-xl font-semibold text-muted-foreground mb-6">
                  Street Parking
                </h3>
                <ul className="space-y-4">
                  {[
                    "Uncertain availability",
                    "Risk of challan/towing",
                    "No security guarantee",
                    "No EV charging",
                    "Cash or coins only"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center text-xs">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-display text-xl font-semibold text-primary mb-6">
                  Parq
                </h3>
                <ul className="space-y-4">
                  {[
                    "Real-time availability",
                    "100% legal & verified",
                    "CCTV + insurance",
                    "EV charging at select spots",
                    "Digital payments"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Experience the difference
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download the app or find parking on web right now.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/search">
                <Button variant="hero">
                  Find Parking
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/host/signup">
                <Button variant="heroOutline">
                  List Your Space
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

export default Features;

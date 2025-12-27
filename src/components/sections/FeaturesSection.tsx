import { motion } from "framer-motion";
import { Shield, Zap, Camera, Clock, Smartphone, CreditCard, MapPin, Star } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified & Secure",
      description: "Every parking space is verified. Your vehicle is protected with insurance coverage.",
    },
    {
      icon: Zap,
      title: "EV Charging",
      description: "Find spots with charging stations. Filter by charger type and availability.",
    },
    {
      icon: Camera,
      title: "CCTV Monitored",
      description: "24/7 camera surveillance at partner locations for complete peace of mind.",
    },
    {
      icon: Clock,
      title: "Flexible Duration",
      description: "Book by hour, day, or month. Extend or cancel with just a few taps.",
    },
    {
      icon: Smartphone,
      title: "Digital Access",
      description: "QR code or OTP entry. No physical tickets, no waiting in queues.",
    },
    {
      icon: CreditCard,
      title: "Easy Payments",
      description: "Pay via UPI, cards, or Parq wallet. Automatic billing for regulars.",
    },
    {
      icon: MapPin,
      title: "Real-time Availability",
      description: "See live spot availability. Never drive to a full parking lot again.",
    },
    {
      icon: Star,
      title: "Rated Spaces",
      description: "User reviews and ratings help you choose the best parking spots.",
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Everything you need to{" "}
            <span className="text-gradient">park smarter</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Built for modern urban life. Safe, smart, and sustainable parking solutions.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

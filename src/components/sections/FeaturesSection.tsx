import { motion } from "framer-motion";
import { Shield, Zap, Camera, Clock, Smartphone, CreditCard, MapPin, Star, Droplets, Key, Gift, Users, BarChart3, Globe, Bell, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const coreFeatures = [
    {
      icon: Shield,
      title: "Verified & Secure",
      description: "Every parking space is verified. Your vehicle is protected with insurance coverage.",
    },
    {
      icon: Zap,
      title: "EV Charging",
      description: "Reserve charging stations with real-time availability and multiple charger types.",
      link: "/user/ev-charging",
    },
    {
      icon: Droplets,
      title: "Car Wash & Valet",
      description: "Add premium services like car wash, valet parking, and interior cleaning.",
      link: "/user/services",
    },
    {
      icon: Clock,
      title: "Flexible Duration",
      description: "Book by hour, day, or month. Extend or cancel with just a few taps.",
    },
  ];

  const additionalFeatures = [
    {
      icon: Star,
      title: "Reviews & Ratings",
      description: "Rate your experience and help others find the best spots.",
      link: "/user/reviews",
    },
    {
      icon: Gift,
      title: "Referral Rewards",
      description: "Invite friends and earn ₹300 for each successful referral.",
      link: "/user/referrals",
    },
    {
      icon: Users,
      title: "Family Accounts",
      description: "Share parking benefits with family members and manage together.",
      link: "/user/family",
    },
    {
      icon: AlertTriangle,
      title: "Safety Features",
      description: "Emergency contacts, incident reporting, and SOS alerts.",
      link: "/user/safety",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Booking reminders, payment alerts, and personalized offers.",
      link: "/user/notification-settings",
    },
    {
      icon: Globe,
      title: "Multi-language",
      description: "Available in English, Hindi, Kannada, Tamil, Telugu, and Marathi.",
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

        {/* Core Features - Highlighted */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {feature.description}
              </p>
              {feature.link && (
                <Link to={feature.link} className="text-sm text-primary font-medium hover:underline">
                  Learn more →
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
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
              {feature.link && (
                <Link to={feature.link} className="text-sm text-primary font-medium hover:underline mt-2 inline-block">
                  Explore →
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/features">
            <Button variant="outline" size="lg">
              View All Features
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, Shield, Clock, ArrowRight } from "lucide-react";

const HostSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Earn Passive Income",
      description: "Turn your unused parking space into a steady income stream.",
    },
    {
      icon: Shield,
      title: "Full Insurance Coverage",
      description: "Your property is protected against damage with our comprehensive policy.",
    },
    {
      icon: Clock,
      title: "Flexible Control",
      description: "Set your own hours, pricing, and availability. You're always in control.",
    },
  ];

  return (
    <section id="hosts" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              For Space Owners
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Turn unused space into{" "}
              <span className="text-gradient">reliable income</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Have a driveway, garage, or parking spot that sits empty? List it on Parq and start earning while helping your community find safe parking.
            </p>

            {/* Benefits */}
            <div className="space-y-6 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero">
                List Your Space
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="heroOutline">
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-gradient-card border border-border p-8 lg:p-10">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

              <div className="relative">
                {/* Host Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 glow-button">
                  <Home className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Earnings Preview */}
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-2">
                    Average monthly earnings
                  </p>
                  <div className="font-display text-5xl lg:text-6xl font-bold text-gradient">
                    ₹8,000+
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    per parking spot
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="font-display text-2xl font-bold text-foreground">
                      15K+
                    </div>
                    <p className="text-xs text-muted-foreground">Active Hosts</p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="font-display text-2xl font-bold text-foreground">
                      ₹2Cr+
                    </div>
                    <p className="text-xs text-muted-foreground">Paid to Hosts</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HostSection;

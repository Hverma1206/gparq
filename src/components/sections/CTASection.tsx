import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, AppWindow } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Download the App
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            Ready to{" "}
            <span className="text-gradient">park smarter</span>?
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 500K+ users who've switched to stress-free parking. EV charging, car wash, valet services — all in one app.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl">
              Find Parking Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="heroOutline" size="xl">
              List Your Space
            </Button>
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-secondary border border-border hover:border-primary/30 transition-colors group"
            >
              <AppWindow className="w-8 h-8 text-foreground" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Download on the</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  App Store
                </p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-secondary border border-border hover:border-primary/30 transition-colors group"
            >
              <AppWindow className="w-8 h-8 text-foreground" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Get it on</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Google Play
                </p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Wrench, Bell, Twitter } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Car className="h-8 w-8 text-primary" />
          <span className="font-display text-2xl font-bold text-foreground">Parq</span>
        </Link>

        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Wrench className="h-12 w-12 text-primary" />
          </motion.div>
        </div>

        <h1 className="font-display text-3xl font-bold text-foreground mb-4">
          We'll Be Right Back
        </h1>
        <p className="text-muted-foreground mb-8">
          We're performing scheduled maintenance to improve your experience. 
          We'll be back online shortly.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h3 className="font-medium text-foreground mb-2">Estimated Downtime</h3>
          <p className="text-2xl font-display font-bold text-primary">~ 30 minutes</p>
          <p className="text-sm text-muted-foreground mt-2">Started at 2:00 AM IST</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg">
            <Bell className="mr-2 h-5 w-5" />
            Notify Me
          </Button>
          <a href="https://twitter.com/parq" target="_blank" rel="noopener noreferrer">
            <Button size="lg">
              <Twitter className="mr-2 h-5 w-5" />
              Follow Updates
            </Button>
          </a>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Need urgent help? Email us at{" "}
          <a href="mailto:support@parq.app" className="text-primary hover:underline">
            support@parq.app
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Maintenance;

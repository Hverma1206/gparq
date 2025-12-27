import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, MapPinOff, Bell, Search } from "lucide-react";

const LimitedServiceArea = () => {
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
        className="relative z-10 w-full max-w-md text-center"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Car className="h-8 w-8 text-primary" />
          <span className="font-display text-2xl font-bold text-foreground">Parq</span>
        </Link>

        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPinOff className="h-12 w-12 text-primary" />
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Coming Soon to Your Area
        </h1>
        <p className="text-muted-foreground mb-8">
          We're not yet available in your location, but we're expanding rapidly. 
          Get notified when we launch in your city!
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h3 className="font-medium text-foreground mb-4">Currently Available In</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Chennai", "Pune"].map((city) => (
              <span
                key={city}
                className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button size="lg" className="w-full">
            <Bell className="mr-2 h-5 w-5" />
            Notify Me When Available
          </Button>
          <Link to="/">
            <Button variant="outline" size="lg" className="w-full">
              <Search className="mr-2 h-5 w-5" />
              Search Another Location
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LimitedServiceArea;

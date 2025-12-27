import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, MapPin, Settings } from "lucide-react";

const LocationPermission = () => {
  const handleEnableLocation = () => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => window.location.reload(),
        () => console.log("Location denied")
      );
    }
  };

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
          <MapPin className="h-12 w-12 text-primary" />
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Location Access Needed
        </h1>
        <p className="text-muted-foreground mb-8">
          Enable location services to find parking spots near you and get turn-by-turn directions.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h3 className="font-medium text-foreground mb-4">Why we need location</h3>
          <ul className="text-left text-sm text-muted-foreground space-y-2">
            <li>• Find nearby parking spots</li>
            <li>• Get accurate directions</li>
            <li>• Calculate distances & ETA</li>
            <li>• Auto-detect arrival for hands-free entry</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <Button size="lg" onClick={handleEnableLocation}>
            <MapPin className="mr-2 h-5 w-5" />
            Enable Location
          </Button>
          <Button variant="outline" size="lg">
            <Settings className="mr-2 h-5 w-5" />
            Open Settings
          </Button>
        </div>

        <Link
          to="/"
          className="block mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Continue without location
        </Link>
      </motion.div>
    </div>
  );
};

export default LocationPermission;

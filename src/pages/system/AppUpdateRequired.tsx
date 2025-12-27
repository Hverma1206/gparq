import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Download, Smartphone } from "lucide-react";

const AppUpdateRequired = () => {
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
          <Smartphone className="h-12 w-12 text-primary" />
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Update Required
        </h1>
        <p className="text-muted-foreground mb-8">
          A new version of Parq is available. Please update to continue using the app.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h3 className="font-medium text-foreground mb-4">What's New</h3>
          <ul className="text-left text-sm text-muted-foreground space-y-2">
            <li>• Improved booking experience</li>
            <li>• Faster parking search</li>
            <li>• Bug fixes and performance improvements</li>
            <li>• Enhanced security features</li>
          </ul>
        </div>

        <Button size="lg" className="w-full">
          <Download className="mr-2 h-5 w-5" />
          Update Now
        </Button>
      </motion.div>
    </div>
  );
};

export default AppUpdateRequired;

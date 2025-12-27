import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, WifiOff, RefreshCw } from "lucide-react";

const NetworkError = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-muted/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-muted/30 rounded-full blur-3xl" />
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

        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="h-12 w-12 text-muted-foreground" />
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          No Internet Connection
        </h1>
        <p className="text-muted-foreground mb-8">
          Please check your network connection and try again.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h3 className="font-medium text-foreground mb-4">Try these steps</h3>
          <ul className="text-left text-sm text-muted-foreground space-y-2">
            <li>• Check your WiFi or mobile data</li>
            <li>• Try airplane mode on/off</li>
            <li>• Move to an area with better signal</li>
            <li>• Restart your device</li>
          </ul>
        </div>

        <Button size="lg" className="w-full" onClick={handleRetry}>
          <RefreshCw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
      </motion.div>
    </div>
  );
};

export default NetworkError;

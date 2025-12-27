import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Clock, ArrowLeft, RefreshCw } from "lucide-react";

const SessionExpired = () => {
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
          <Clock className="h-12 w-12 text-primary" />
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Session Expired
        </h1>
        <p className="text-muted-foreground mb-8">
          Your session has expired for security reasons. Please sign in again to continue.
        </p>

        <div className="flex flex-col gap-4">
          <Link to="/login">
            <Button size="lg" className="w-full">
              <RefreshCw className="mr-2 h-5 w-5" />
              Sign In Again
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg" className="w-full">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SessionExpired;

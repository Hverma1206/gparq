import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <span className="font-display text-[150px] sm:text-[200px] font-bold text-gradient leading-none">
                404
              </span>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8"
            >
              <MapPin className="w-10 h-10 text-primary" />
            </motion.div>

            {/* Message */}
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Oops! Wrong turn
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Looks like this parking spot doesn't exist. Let's get you back on track.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/">
                <Button variant="hero">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/user/search">
                <Button variant="heroOutline">
                  <Search className="w-5 h-5 mr-2" />
                  Find Parking
                </Button>
              </Link>
            </div>

            {/* Go Back Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go back to previous page
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-semibold text-foreground text-center mb-8">
            Popular pages you might be looking for
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto">
            {[
              { label: "How It Works", href: "/how-it-works/users" },
              { label: "Features", href: "/features" },
              { label: "Pricing", href: "/pricing/users" },
              { label: "FAQs", href: "/faqs" },
              { label: "Contact", href: "/contact" },
              { label: "Help Center", href: "/help" }
            ].map((link, i) => (
              <Link
                key={i}
                to={link.href}
                className="px-4 py-2 rounded-full bg-background border border-border text-sm text-foreground hover:border-primary/30 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NotFound;

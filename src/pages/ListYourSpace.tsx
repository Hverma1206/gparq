import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ListYourSpace = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <section className="pt-32 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
            <Home className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient">List Your Space</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">Turn your unused parking space into a steady income stream</p>
          <Link to="/host/signup"><Button variant="hero">Get Started<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
        </motion.div>
      </div>
    </section>
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">Why list with Parq?</h2>
          <div className="space-y-4">
            {["Earn passive income from unused space", "Full insurance coverage", "You control pricing & availability", "Weekly payouts to your bank", "24/7 host support"].map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default ListYourSpace;

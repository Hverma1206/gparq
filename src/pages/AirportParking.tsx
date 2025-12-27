import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Plane, Train, Clock, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AirportParking = () => {
  const airports = [
    { name: "Mumbai International (BOM)", spots: "500+" },
    { name: "Delhi IGI (DEL)", spots: "800+" },
    { name: "Bangalore Kempegowda (BLR)", spots: "400+" },
    { name: "Chennai International (MAA)", spots: "300+" }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Plane className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Airport Parking</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="text-gradient">Airport</span> & Station Parking
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Secure long-term parking near airports and railway stations. Book in advance, travel stress-free.
            </p>
            <Link to="/search?type=airport">
              <Button variant="hero">Find Airport Parking<ArrowRight className="w-5 h-5 ml-2" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            {[
              { icon: Clock, label: "Book up to 30 days ahead" },
              { icon: Shield, label: "24/7 security & CCTV" },
              { icon: Train, label: "Near airports & stations" }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <f.icon className="w-8 h-8 text-primary" />
                <span className="text-foreground font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Available at Major Airports</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {airports.map((a, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border flex justify-between items-center">
                <span className="font-medium text-foreground">{a.name}</span>
                <span className="text-primary font-semibold">{a.spots} spots</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AirportParking;

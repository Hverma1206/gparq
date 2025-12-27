import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Star, Car } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const CityLanding = () => {
  const { city } = useParams();
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "Your City";
  
  const popularAreas = ["Airport", "Railway Station", "Business District", "Shopping Mall", "Hospital Zone", "IT Park"];
  
  const stats = [
    { value: "5,000+", label: "Parking Spots" },
    { value: "200+", label: "EV Chargers" },
    { value: "4.8★", label: "Avg Rating" }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">{cityName}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Parking in <span className="text-gradient">{cityName}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find verified, secure parking spots across {cityName}. Book instantly.
            </p>
            <Link to={`/search?city=${city}`}>
              <Button variant="hero">Find Parking in {cityName}<ArrowRight className="w-5 h-5 ml-2" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Popular Areas in {cityName}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {popularAreas.map((area, i) => (
              <Link key={i} to={`/search?city=${city}&area=${area.toLowerCase()}`} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{area}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CityLanding;

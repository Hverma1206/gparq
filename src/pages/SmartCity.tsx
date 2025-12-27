import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Building, Cpu, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SmartCity = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Building className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Government & Smart City</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="text-gradient">Smart City</span> Parking Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Partner with Parq to transform urban parking infrastructure. Reduce congestion, increase revenue.
            </p>
            <Link to="/government-enquiry">
              <Button variant="hero">Partner With Us<ArrowRight className="w-5 h-5 ml-2" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Cpu, title: "IoT Integration", desc: "Sensor-based occupancy tracking" },
              { icon: BarChart3, title: "City Analytics", desc: "Traffic and parking insights" },
              { icon: Building, title: "Govt Parking", desc: "Manage municipal parking lots" }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-card border border-border text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SmartCity;

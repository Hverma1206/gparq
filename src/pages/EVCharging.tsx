import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Zap, MapPin, Clock, Battery, Plug, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const EVCharging = () => {
  const chargerTypes = [
    { name: "AC Slow", power: "3.3 kW", time: "8-12 hours", icon: "🔌" },
    { name: "AC Fast", power: "7.4-22 kW", time: "2-4 hours", icon: "⚡" },
    { name: "DC Fast", power: "50+ kW", time: "30-60 min", icon: "🚀" }
  ];

  const features = [
    { icon: MapPin, title: "Find Nearby Chargers", desc: "Filter parking spots by EV charging availability" },
    { icon: Battery, title: "Real-time Status", desc: "See charger availability and queue status live" },
    { icon: Clock, title: "Book in Advance", desc: "Reserve charging slots along with parking" },
    { icon: Plug, title: "Multiple Connectors", desc: "Type 2, CCS, CHAdeMO compatibility" }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">EV Charging Network</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Park & <span className="text-gradient">Charge</span> your EV
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find parking spots with EV charging. Book both together for a seamless experience.
            </p>
            <Link to="/search?ev=true">
              <Button variant="hero">
                Find EV Charging
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Charger Types Available</h2>
            <p className="text-muted-foreground">From slow overnight charging to rapid DC charging</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {chargerTypes.map((type, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl bg-card border border-border text-center">
                <div className="text-5xl mb-4">{type.icon}</div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{type.name}</h3>
                <p className="text-primary font-semibold mb-1">{type.power}</p>
                <p className="text-sm text-muted-foreground">{type.time} for full charge</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6">Ready to go electric?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of EV owners parking & charging with Parq</p>
          <Link to="/search"><Button variant="hero">Find Charging Spots</Button></Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EVCharging;

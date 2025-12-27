import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Car, Droplets, Wrench, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    { icon: Droplets, title: "Car Wash", desc: "Exterior wash, interior cleaning, and full detailing while you park", price: "From ₹199" },
    { icon: Wrench, title: "Quick Repairs", desc: "Tyre check, battery service, and minor repairs at select locations", price: "Varies" },
    { icon: Shield, title: "Security Guard", desc: "Guarded parking with 24/7 security personnel", price: "Included" },
    { icon: Car, title: "Valet Service", desc: "Drop your car at entrance, pick it up when ready", price: "From ₹99" }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">Services</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              More than just <span className="text-gradient">parking</span>
            </h1>
            <p className="text-xl text-muted-foreground">Add-on services to make your parking experience complete</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl bg-card border border-border">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground mb-4">{s.desc}</p>
                <p className="text-primary font-semibold">{s.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6">Book services with your parking</h2>
          <Link to="/search"><Button variant="hero">Find Parking<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;

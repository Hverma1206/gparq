import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Wrench, Zap, Droplets, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BecomePartner = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <section className="pt-32 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Become a <span className="text-gradient">Service Partner</span></h1>
          <p className="text-xl text-muted-foreground mb-8">Offer your services to Parq users and grow your business</p>
          <Link to="/partner/signup"><Button variant="hero">Apply Now<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
        </motion.div>
      </div>
    </section>
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Droplets, title: "Car Wash", desc: "Offer wash services at parking locations" },
            { icon: Zap, title: "EV Charging", desc: "Install and manage charging points" },
            { icon: Wrench, title: "Repair Services", desc: "Provide quick repairs and maintenance" }
          ].map((s, i) => (
            <div key={i} className="p-8 rounded-3xl bg-card border border-border text-center">
              <s.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default BecomePartner;

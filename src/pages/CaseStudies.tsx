import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TrendingUp, Building2, Users } from "lucide-react";

const caseStudies = [
  { title: "Mumbai Airport Parking", result: "500% increase in bookings", icon: TrendingUp },
  { title: "Corporate Fleet - TechCorp", result: "₹2L monthly savings", icon: Building2 },
  { title: "Society Parking - RWA", result: "₹50K monthly earnings", icon: Users }
];

const CaseStudies = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <section className="pt-32 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6"><span className="text-gradient">Case Studies</span></h1>
          <p className="text-xl text-muted-foreground">Real results from real Parq users</p>
        </motion.div>
      </div>
    </section>
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {caseStudies.map((c, i) => (
            <div key={i} className="p-8 rounded-3xl bg-card border border-border">
              <c.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{c.title}</h3>
              <p className="text-gradient font-semibold text-lg">{c.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default CaseStudies;

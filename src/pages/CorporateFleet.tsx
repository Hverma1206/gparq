import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Building2, Truck, CreditCard, BarChart3, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CorporateFleet = () => {
  const benefits = [
    "Centralized billing for entire fleet",
    "Dedicated account manager",
    "Custom pricing & contracts",
    "Real-time fleet tracking",
    "Expense reports & analytics",
    "Priority booking access"
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">For Business</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="text-gradient">Corporate</span> & Fleet Parking
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Manage parking for your entire organization. One platform, one bill.
            </p>
            <Link to="/corporate-enquiry">
              <Button variant="hero">Contact Sales<ArrowRight className="w-5 h-5 ml-2" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Built for businesses</h2>
              <ul className="space-y-4">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Truck, label: "Fleet Management" },
                { icon: CreditCard, label: "Unified Billing" },
                { icon: BarChart3, label: "Analytics" },
                { icon: Building2, label: "Enterprise Support" }
              ].map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border text-center">
                  <f.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CorporateFleet;

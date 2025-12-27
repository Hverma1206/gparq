import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, FileText } from "lucide-react";

const Insurance = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Insurance & <span className="text-gradient">Liability</span>
            </h1>
            <p className="text-xl text-muted-foreground">Understanding your protection when using Parq</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">Vehicle Protection</h2>
              </div>
              <p className="text-muted-foreground mb-4">All vehicles parked through Parq are covered under our protection policy:</p>
              <ul className="space-y-2 text-foreground">
                <li>• Coverage for damage during parking</li>
                <li>• Theft protection at verified locations</li>
                <li>• Third-party liability coverage</li>
                <li>• Up to ₹5 Lakh per incident</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="flex items-center gap-4 mb-4">
                <FileText className="w-8 h-8 text-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">Host Protection</h2>
              </div>
              <p className="text-muted-foreground mb-4">For space owners listing on Parq:</p>
              <ul className="space-y-2 text-foreground">
                <li>• Property damage protection up to ₹10 Lakh</li>
                <li>• Liability coverage for incidents</li>
                <li>• 24/7 emergency support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Insurance;

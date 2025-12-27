import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Target, Eye, Rocket } from "lucide-react";

const VisionMission = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-gradient">Vision & Mission</span>
            </h1>
            <p className="text-xl text-muted-foreground">What drives us every day</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become India's largest decentralized parking & mobility infrastructure, turning unused urban space into safe, smart, and revenue-generating parking hubs.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Mission</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Reduce urban parking chaos</li>
                <li>• Enable citizens to monetize unused space</li>
                <li>• Support EV adoption</li>
                <li>• Build trust-first, tech-driven urban mobility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default VisionMission;

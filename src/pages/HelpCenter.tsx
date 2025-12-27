import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, Book, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const categories = [
  { title: "Getting Started", count: 12 },
  { title: "Booking & Payments", count: 18 },
  { title: "For Hosts", count: 15 },
  { title: "Safety & Security", count: 8 },
  { title: "Account & Settings", count: 10 },
  { title: "Troubleshooting", count: 14 }
];

const HelpCenter = () => {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">How can we <span className="text-gradient">help</span>?</h1>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="text" placeholder="Search for help..." value={query} onChange={e => setQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border text-foreground" />
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((cat, i) => (
              <Link key={i} to={`/help/${cat.title.toLowerCase().replace(/ /g, '-')}`} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
                <Book className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-1">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} articles</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <MessageCircle className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Chat with us</p>
                <p className="text-sm text-muted-foreground">Available 9AM-9PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">1800-PARQ-HELP</p>
                <p className="text-sm text-muted-foreground">24/7 for emergencies</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default HelpCenter;

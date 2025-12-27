import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Linkedin, Twitter } from "lucide-react";

const founders = [
  { name: "Founder Name", role: "CEO & Co-Founder", bio: "Passionate about solving urban mobility challenges." },
  { name: "Co-Founder Name", role: "CTO & Co-Founder", bio: "Building technology that scales cities." }
];

const Founders = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Meet Our <span className="text-gradient">Founders</span></h1>
            <p className="text-xl text-muted-foreground">The team behind Parq's vision</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-card border border-border text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="font-display text-3xl font-bold text-primary">{f.name.charAt(0)}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{f.name}</h3>
                <p className="text-primary text-sm mb-4">{f.role}</p>
                <p className="text-muted-foreground mb-6">{f.bio}</p>
                <div className="flex items-center justify-center gap-4">
                  <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="w-5 h-5" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Founders;

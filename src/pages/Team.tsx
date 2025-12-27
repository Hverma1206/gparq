import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Linkedin } from "lucide-react";

const team = [
  { name: "Team Member 1", role: "Head of Engineering" },
  { name: "Team Member 2", role: "Head of Operations" },
  { name: "Team Member 3", role: "Head of Marketing" },
  { name: "Team Member 4", role: "Head of Product" },
  { name: "Team Member 5", role: "Head of Growth" },
  { name: "Team Member 6", role: "Head of Finance" }
];

const Team = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Our <span className="text-gradient">Team</span></h1>
            <p className="text-xl text-muted-foreground">The people making Parq happen</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-bold text-primary">{m.name.charAt(0)}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Team;

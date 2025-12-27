import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Monitor, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const RequestDemo = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "" });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Demo requested!", description: "We'll schedule a demo call with you soon." });
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <Monitor className="w-12 h-12 text-primary mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Request a <span className="text-gradient">Demo</span></h1>
            <p className="text-xl text-muted-foreground">See Parq in action with a personalized walkthrough</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <input type="text" placeholder="Company Name" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
            <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input type="email" placeholder="Work Email" required className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            <Button type="submit" variant="hero" className="w-full">Request Demo<Send className="w-5 h-5 ml-2" /></Button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default RequestDemo;

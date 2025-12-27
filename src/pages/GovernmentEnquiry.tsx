import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Building, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const GovernmentEnquiry = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ org: "", name: "", email: "", phone: "", message: "" });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Enquiry submitted!", description: "Our government partnerships team will contact you." });
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <Building className="w-12 h-12 text-primary mx-auto mb-6" />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6"><span className="text-gradient">Government</span> & RWA Enquiry</h1>
            <p className="text-xl text-muted-foreground">Partner with Parq for smart city parking solutions</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            <input type="text" placeholder="Organization Name" required className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground" value={form.org} onChange={e => setForm({...form, org: e.target.value})} />
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Contact Person" required className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            <textarea placeholder="Tell us about your requirements" rows={4} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground resize-none" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            <Button type="submit" variant="hero" className="w-full">Submit<Send className="w-5 h-5 ml-2" /></Button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default GovernmentEnquiry;

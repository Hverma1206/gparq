import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Camera, UserCheck, Phone, CheckCircle } from "lucide-react";

const TrustSafety = () => {
  const measures = [
    { icon: UserCheck, title: "Verified Spaces", desc: "Every parking spot is physically verified by our team before going live." },
    { icon: Camera, title: "CCTV Monitoring", desc: "Partner locations feature 24/7 camera surveillance for your peace of mind." },
    { icon: Shield, title: "Insurance Coverage", desc: "All bookings include vehicle protection coverage at no extra cost." },
    { icon: Phone, title: "24/7 Support", desc: "Emergency support available round the clock for urgent issues." }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trust & Safety</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Your safety is our <span className="text-gradient">priority</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We've built multiple layers of protection so you can park with complete confidence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {measures.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl bg-card border border-border">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <m.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{m.title}</h3>
                <p className="text-muted-foreground">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Our Commitments</h2>
            <div className="space-y-4">
              {[
                "All hosts undergo verification before listing",
                "Regular safety audits at partner locations",
                "Instant refunds for safety-related issues",
                "Zero tolerance for misconduct",
                "Transparent incident reporting"
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{c}</span>
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

export default TrustSafety;

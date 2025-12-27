import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { quote: "Parq has transformed how I park in the city. No more circling for spots!", author: "Priya S.", role: "IT Professional, Bangalore", rating: 5 },
  { quote: "I earn ₹15K monthly from my garage. Best decision ever.", author: "Rajesh K.", role: "Host, Mumbai", rating: 5 },
  { quote: "EV charging + parking in one app. Perfect for my Tesla.", author: "Ananya P.", role: "EV Owner, Hyderabad", rating: 5 },
  { quote: "Our society parking is now organized and earning revenue.", author: "RWA Secretary", role: "Housing Society, Pune", rating: 5 },
  { quote: "Fleet management made simple. Saved us hours weekly.", author: "Fleet Manager", role: "Logistics Company, Delhi", rating: 5 },
  { quote: "Airport parking booked in 2 minutes. Stress-free travel!", author: "Vikram T.", role: "Frequent Traveler", rating: 5 }
];

const Testimonials = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <section className="pt-32 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">What People <span className="text-gradient">Say</span></h1>
          <p className="text-xl text-muted-foreground">Stories from our community</p>
        </motion.div>
      </div>
    </section>
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl bg-card border border-border relative">
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">{Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}</div>
              <p className="text-foreground mb-4">"{t.quote}"</p>
              <p className="font-semibold text-foreground">{t.author}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default Testimonials;

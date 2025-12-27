import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, BookOpen, ArrowRight } from "lucide-react";

const blogPosts = [
  { title: "5 Tips for Stress-Free Airport Parking", excerpt: "Make your travel smoother with these expert tips...", date: "Dec 20, 2024" },
  { title: "How to Earn ₹10K/Month from Your Garage", excerpt: "Turn your unused space into passive income...", date: "Dec 18, 2024" },
  { title: "EV Charging Guide for Beginners", excerpt: "Everything you need to know about charging your EV...", date: "Dec 15, 2024" },
  { title: "Why Verified Parking Matters", excerpt: "The importance of parking at trusted locations...", date: "Dec 12, 2024" }
];

const Blog = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <section className="pt-32 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Parq <span className="text-gradient">Blog</span></h1>
          <p className="text-xl text-muted-foreground">Tips, guides, and stories from the world of smart parking</p>
        </motion.div>
      </div>
    </section>
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {blogPosts.map((post, i) => (
            <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
              <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <Button variant="link" className="p-0 h-auto text-primary">Read More<ArrowRight className="w-4 h-4 ml-1" /></Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default Blog;

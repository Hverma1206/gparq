import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Target, Lightbulb, Users, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "Reduce urban parking chaos. Enable citizens to monetize unused space. Support EV adoption. Build trust-first urban mobility."
    },
    {
      icon: Lightbulb,
      title: "Vision",
      description: "To become India's largest decentralized parking & mobility infrastructure, turning unused urban space into safe, smart, and revenue-generating parking hubs."
    },
    {
      icon: Heart,
      title: "Values",
      description: "Safety first. Transparency always. Technology for good. Community-driven. Sustainability-focused."
    }
  ];

  const stats = [
    { value: "50K+", label: "Parking Spaces" },
    { value: "100+", label: "Cities" },
    { value: "500K+", label: "Happy Users" },
    { value: "15K+", label: "Active Hosts" }
  ];

  const milestones = [
    { year: "2023", event: "Parq founded with a vision to solve urban parking" },
    { year: "2023", event: "First 1,000 parking spaces listed" },
    { year: "2024", event: "Expanded to 50 cities" },
    { year: "2024", event: "Launched EV charging network" },
    { year: "2025", event: "500K+ users and growing" }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              About Parq
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Building India's <span className="text-gradient">smartest parking network</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to make urban parking safe, smart, and stress-free for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                The problem we're solving
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  30-40% of city traffic is just people searching for parking. Illegal parking leads to challans, towing, and endless frustration. Meanwhile, thousands of private parking spaces sit empty.
                </p>
                <p>
                  EV owners struggle to find charging infrastructure. Delivery drivers and cab operators waste hours finding safe spots. The market lacks a standardized, trusted, bookable parking network.
                </p>
                <p>
                  <strong className="text-foreground">Parq is the solution.</strong> A two-sided marketplace where space owners monetize unused spots and vehicle owners find verified, safe parking — all powered by technology.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-card border border-border p-12 flex items-center justify-center">
                <div className="w-32 h-32 rounded-3xl bg-primary flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-background border border-border"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our journey
            </h2>
            <p className="text-muted-foreground">
              From idea to India's fastest-growing parking platform
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-20 shrink-0">
                    <span className="text-primary font-display font-bold">{milestone.year}</span>
                  </div>
                  <div className="relative pb-8">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary" />
                    <div className="absolute left-1.5 top-5 w-px h-full bg-border" />
                    <p className="pl-8 text-foreground">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Join our team
            </h2>
            <p className="text-muted-foreground mb-8">
              We're looking for passionate people who want to shape the future of urban mobility.
            </p>
            <Link to="/careers">
              <Button variant="hero">
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;

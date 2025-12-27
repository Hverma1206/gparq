import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EventParking = () => {
  const eventTypes = ["Concerts", "Sports Events", "Weddings", "Conferences", "Exhibitions", "Festivals"];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Event Parking</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Parking for <span className="text-gradient">Events</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Pre-book parking near event venues. Skip the chaos, arrive relaxed.
            </p>
            <Link to="/search?type=event">
              <Button variant="hero">Find Event Parking<ArrowRight className="w-5 h-5 ml-2" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Perfect for All Events</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {eventTypes.map((type, i) => (
              <span key={i} className="px-6 py-3 rounded-full bg-card border border-border text-foreground">{type}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Calendar, title: "Book Ahead", desc: "Reserve spots days before the event" },
              { icon: MapPin, title: "Nearby Venues", desc: "Parking within walking distance" },
              { icon: Users, title: "Group Booking", desc: "Book multiple spots for groups" }
            ].map((f, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EventParking;

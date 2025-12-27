import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, ArrowRight, CheckCircle, IndianRupee, Shield, 
  Clock, Zap, Star, Building2, Users, TrendingUp,
  Phone, Mail, MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ListYourSpace = () => {
  const benefits = [
    { icon: IndianRupee, title: "Earn ₹10,000+/month", desc: "Average host earnings from a single parking space" },
    { icon: Shield, title: "Full Insurance Coverage", desc: "Complete protection for your property and vehicles parked" },
    { icon: Clock, title: "You're in Control", desc: "Set your own availability, pricing, and booking rules" },
    { icon: Zap, title: "Weekly Payouts", desc: "Get paid directly to your bank account every week" },
  ];

  const steps = [
    { num: 1, title: "Create Your Account", desc: "Sign up in 2 minutes with your basic details" },
    { num: 2, title: "List Your Space", desc: "Add photos, set pricing, and describe your parking space" },
    { num: 3, title: "Get Verified", desc: "Our team verifies your space within 24-48 hours" },
    { num: 4, title: "Start Earning", desc: "Accept bookings and watch your earnings grow" },
  ];

  const stats = [
    { value: "₹15K+", label: "Avg Monthly Earnings" },
    { value: "1,250+", label: "Active Hosts" },
    { value: "98%", label: "Host Satisfaction" },
    { value: "24/7", label: "Support Available" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Bangalore",
      text: "I never thought my empty driveway could earn me ₹12,000 every month. Parq made it so easy!",
      rating: 5,
      earning: "₹12,000/month"
    },
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      text: "As a commercial property owner, Parq helps me monetize my parking lot efficiently. Great platform!",
      rating: 5,
      earning: "₹45,000/month"
    },
    {
      name: "Ananya Patel",
      location: "Delhi",
      text: "The weekly payouts and full insurance coverage gave me peace of mind. Highly recommend!",
      rating: 5,
      earning: "₹8,500/month"
    },
  ];

  const spaceTypes = [
    { icon: Home, title: "Driveway", desc: "Perfect for residential areas" },
    { icon: Building2, title: "Garage", desc: "Covered parking spaces" },
    { icon: MapPin, title: "Parking Lot", desc: "Commercial parking facilities" },
    { icon: Users, title: "Shared Space", desc: "Office or apartment complexes" },
  ];

  const handleContactClick = () => {
    console.log("Contact clicked");
    toast.info("Our team will contact you soon!");
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Join 1,250+ Hosts Earning with Parq</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Turn Your Parking Space Into{" "}
                <span className="text-gradient">Passive Income</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Earn up to ₹15,000/month by listing your unused parking space on Parq. Zero hassle, full insurance, weekly payouts.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/host/signup">
                  <Button variant="hero" size="lg" className="gap-2">
                    Start Earning Today
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" onClick={handleContactClick} className="gap-2">
                  <Phone className="w-5 h-5" />
                  Talk to Us
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free to list</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <Card className="bg-card border-border p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-display font-bold text-primary mb-2">₹15,000+</div>
                  <div className="text-muted-foreground">Average monthly earnings</div>
                </div>
                
                <div className="space-y-4">
                  {[
                    "2 parking spots × ₹50/hour",
                    "8 hours/day average usage",
                    "25 days/month",
                    "= ₹20,000 gross earnings",
                    "- 15% Parq commission",
                    "= ₹17,000 in your pocket"
                  ].map((line, i) => (
                    <div key={i} className={`flex items-center gap-3 ${i === 5 ? "font-bold text-primary pt-2 border-t border-border" : "text-muted-foreground"}`}>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
                
                <Link to="/host/signup" className="block mt-6">
                  <Button className="w-full" size="lg">Calculate Your Earnings</Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Hosts Love <span className="text-gradient">Parq</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of property owners who are earning passive income with their unused parking spaces
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-card border-border h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Space Types */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Can You List?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether it's a driveway, garage, or commercial parking lot - we help you monetize it
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spaceTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="text-center p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <type.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{type.title}</h3>
                <p className="text-muted-foreground text-sm">{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From sign up to your first earning - it takes less than a week
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -z-10" />
                )}
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-2xl font-bold mb-4 mx-auto md:mx-0">
                  {step.num}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 text-center md:text-left">{step.title}</h3>
                <p className="text-muted-foreground text-sm text-center md:text-left">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Hosts Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-background border-border h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-bold text-primary">{testimonial.earning}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of hosts who are already earning passive income with Parq. It's free to list, and you can start earning within a week.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/host/signup">
                <Button variant="hero" size="lg" className="gap-2">
                  Become a Host
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ListYourSpace;

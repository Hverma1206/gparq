import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Wrench, Zap, Droplets, ArrowRight, CheckCircle, 
  IndianRupee, Users, TrendingUp, Clock, Shield,
  Smartphone, BarChart3, Calendar, Headphones, Star
} from "lucide-react";
import { Link } from "react-router-dom";

const BecomePartner = () => {
  const serviceTypes = [
    { 
      icon: Droplets, 
      title: "Car Wash Services", 
      desc: "Offer wash, detailing, and cleaning services to parked vehicles",
      earnings: "₹15,000 - ₹50,000/month",
      features: ["Basic & Premium Wash", "Interior Cleaning", "Detailing Services"]
    },
    { 
      icon: Zap, 
      title: "EV Charging", 
      desc: "Install and manage EV charging stations at parking locations",
      earnings: "₹20,000 - ₹80,000/month",
      features: ["Fast Charging", "Standard Charging", "Multiple Connectors"]
    },
    { 
      icon: Wrench, 
      title: "Repair & Maintenance", 
      desc: "Provide quick repairs, tyre services, and maintenance",
      earnings: "₹25,000 - ₹70,000/month",
      features: ["Tyre Repair", "Battery Jump", "Minor Repairs"]
    },
  ];

  const benefits = [
    { icon: Users, title: "Access to 50,000+ Users", desc: "Tap into our growing customer base actively looking for services" },
    { icon: IndianRupee, title: "Guaranteed Payments", desc: "Weekly payouts directly to your bank account with zero delays" },
    { icon: Smartphone, title: "Easy-to-Use App", desc: "Manage bookings, track earnings, and communicate with customers" },
    { icon: BarChart3, title: "Business Analytics", desc: "Detailed insights to help you grow and optimize your services" },
    { icon: Calendar, title: "Flexible Schedule", desc: "Work when you want, accept jobs that fit your availability" },
    { icon: Shield, title: "Insurance Coverage", desc: "Protection for you and your customers while providing services" },
  ];

  const howItWorks = [
    { step: "01", title: "Apply Online", desc: "Fill out our simple application form with your business details" },
    { step: "02", title: "Get Verified", desc: "Our team verifies your credentials and service quality" },
    { step: "03", title: "Set Up Profile", desc: "Create your service listings and set your prices" },
    { step: "04", title: "Start Earning", desc: "Accept jobs, provide great service, and get paid weekly" },
  ];

  const testimonials = [
    { name: "Rajesh Kumar", business: "Sparkle Car Wash", city: "Bangalore", quote: "Joining Parq doubled my customer base in just 3 months. The platform is incredibly easy to use.", rating: 5, earnings: "₹45,000/month" },
    { name: "Priya Sharma", business: "GreenCharge EV", city: "Mumbai", quote: "The guaranteed payments and business analytics helped me scale from 1 to 5 charging stations.", rating: 5, earnings: "₹1,20,000/month" },
    { name: "Mohammed Ali", business: "QuickFix Auto", city: "Delhi", quote: "Flexible scheduling means I can manage my family and business perfectly. Best decision I made!", rating: 5, earnings: "₹35,000/month" },
  ];

  const stats = [
    { value: "500+", label: "Active Partners" },
    { value: "₹2Cr+", label: "Partner Earnings" },
    { value: "50,000+", label: "Services Completed" },
    { value: "4.8★", label: "Average Rating" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Join 500+ Partners Earning with Parq</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Grow Your <span className="text-gradient">Service Business</span> with Parq
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Partner with India's fastest-growing parking platform. Reach thousands of customers, 
              get guaranteed payments, and scale your business effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partner/signup">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/partner/dashboard">
                <Button variant="outline" size="lg" className="gap-2 text-lg px-8">
                  Partner Login
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur border border-border">
                <div className="font-display text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Choose Your <span className="text-gradient">Service Category</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a car wash expert, EV charging provider, or auto mechanic, 
              there's a place for you on Parq.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceTypes.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card border-border h-full hover:border-primary/30 transition-colors group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.desc}</p>
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 mb-6">
                      <div className="text-sm text-muted-foreground">Earning Potential</div>
                      <div className="font-display text-lg font-bold text-green-500">{service.earnings}</div>
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Partners <span className="text-gradient">Love Parq</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed and grow your service business.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
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
              Get Started in <span className="text-gradient">4 Easy Steps</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary text-primary-foreground font-display text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Partner <span className="text-gradient">Success Stories</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card border-border h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.business}, {testimonial.city}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Earning</div>
                        <div className="font-semibold text-green-500">{testimonial.earnings}</div>
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
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 overflow-hidden">
              <CardContent className="p-12 text-center relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="relative">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    Ready to Grow Your Business?
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join hundreds of service providers already earning with Parq. 
                    Apply today and start accepting jobs within 48 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/partner/signup">
                      <Button size="lg" className="gap-2 text-lg px-8">
                        Apply Now - It's Free <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" /> No joining fee
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" /> Start in 48 hours
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" /> Weekly payouts
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Partner Support</div>
                <div className="text-sm text-muted-foreground">Available 7 days a week</div>
              </div>
            </div>
            <div className="h-8 w-px bg-border hidden md:block" />
            <div className="text-center md:text-left">
              <div className="text-sm text-muted-foreground mb-1">Have questions?</div>
              <a href="mailto:partners@parkongo.com" className="text-primary hover:underline font-medium">
                partners@parkongo.com
              </a>
            </div>
            <div className="h-8 w-px bg-border hidden md:block" />
            <div className="text-center md:text-left">
              <div className="text-sm text-muted-foreground mb-1">Call us at</div>
              <a href="tel:1800-PARQ-PARTNER" className="text-primary hover:underline font-medium">
                1800-PARQ-PARTNER
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BecomePartner;

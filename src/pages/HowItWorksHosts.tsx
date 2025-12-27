import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Home, Camera, Wallet, Shield, TrendingUp, CheckCircle, ArrowRight, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorksHosts = () => {
  const steps = [
    {
      step: "01",
      icon: Home,
      title: "List Your Space",
      description: "Sign up as a host. Add details about your parking space — location, photos, type (covered/open), and any special features.",
      details: [
        "Quick 5-minute setup",
        "Add multiple spaces",
        "Upload photos & videos",
        "Set space rules"
      ]
    },
    {
      step: "02",
      icon: Camera,
      title: "Verification",
      description: "Our team verifies your space remotely or in-person. We ensure it meets safety standards and is accurately represented.",
      details: [
        "Property document check",
        "Location verification",
        "Safety assessment",
        "Approval within 48 hours"
      ]
    },
    {
      step: "03",
      icon: Calendar,
      title: "Set Availability & Pricing",
      description: "Define when your space is available. Set your own hourly, daily, or monthly rates. Enable surge pricing for events.",
      details: [
        "Flexible calendar control",
        "Dynamic pricing options",
        "Blackout dates support",
        "Recurring availability"
      ]
    },
    {
      step: "04",
      icon: Users,
      title: "Accept Bookings",
      description: "Receive booking requests. Accept instantly or manually approve. Track all parkings in your host dashboard.",
      details: [
        "Real-time notifications",
        "Auto-accept option",
        "Booking management",
        "Entry/exit logs"
      ]
    },
    {
      step: "05",
      icon: Wallet,
      title: "Get Paid",
      description: "Earnings are deposited directly to your bank account. Weekly payouts, transparent commission, tax-ready reports.",
      details: [
        "Weekly bank transfers",
        "Low platform commission",
        "Detailed earnings reports",
        "GST invoices"
      ]
    }
  ];

  const earnings = [
    { type: "Driveway", monthly: "₹4,000 - ₹8,000" },
    { type: "Garage", monthly: "₹6,000 - ₹12,000" },
    { type: "Parking Lot", monthly: "₹20,000 - ₹50,000" },
    { type: "Commercial Space", monthly: "₹50,000+" }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              For Space Owners
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Turn unused space into <span className="text-gradient">income</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have a driveway, garage, or parking lot? List it on Parq and start earning today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/host/signup">
                <Button variant="hero">
                  List Your Space
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/host/earnings-calculator">
                <Button variant="heroOutline">
                  Calculate Earnings
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Earnings Preview */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Potential Monthly Earnings
            </h2>
            <p className="text-muted-foreground">Based on average bookings in metro cities</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {earnings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border text-center"
              >
                <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                <p className="font-display text-2xl font-bold text-gradient">{item.monthly}</p>
                <p className="text-xs text-muted-foreground mt-1">per month</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              5 steps to become a host
            </h2>
            <p className="text-lg text-muted-foreground">
              It's quick, easy, and you could be earning within a week.
            </p>
          </div>
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-display font-bold text-primary-foreground">
                      {step.step}
                    </span>
                    <div className="h-px w-12 bg-primary/30" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-card border border-border p-12 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-3xl bg-primary/20 flex items-center justify-center">
                        <step.icon className="w-16 h-16 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Protection */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                We've got you covered
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your property is protected with comprehensive insurance and our trust & safety team.
              </p>
              <div className="space-y-4">
                {[
                  "Up to ₹10 Lakh property protection",
                  "Liability coverage for incidents",
                  "24/7 emergency support",
                  "Verified drivers only",
                  "CCTV integration available"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="p-8 rounded-3xl bg-background border border-border">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Host Protection
                </h3>
                <p className="text-muted-foreground mb-4">
                  Every booking comes with property protection coverage at no extra cost.
                </p>
                <Link to="/trust-safety">
                  <Button variant="outline">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Start earning with your space
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join 15,000+ hosts across India who are already earning with Parq.
            </p>
            <Link to="/host/signup">
              <Button variant="hero">
                Become a Host
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

export default HowItWorksHosts;

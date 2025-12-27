import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Droplets, Wrench, Shield, ArrowRight, Zap, Key, CheckCircle, Sparkles, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import evChargingImg from "@/assets/ev-charging-service.jpg";
import carWashImg from "@/assets/car-wash-service.jpg";
import valetImg from "@/assets/valet-service.jpg";

const Services = () => {
  const mainServices = [
    {
      icon: Zap,
      title: "EV Charging",
      desc: "Reserve charging stations at parking locations with real-time availability",
      image: evChargingImg,
      link: "/ev-charging",
      pricing: [
        { name: "AC Slow (3.3kW)", price: "₹8/kWh", time: "8-12 hrs" },
        { name: "AC Fast (7-22kW)", price: "₹12/kWh", time: "2-4 hrs" },
        { name: "DC Fast (50kW+)", price: "₹18/kWh", time: "30-60 min" },
      ],
      features: ["Multiple charger types", "Reserve in advance", "Real-time status"],
      popular: true,
    },
    {
      icon: Droplets,
      title: "Car Wash",
      desc: "Professional car wash services while you park - from quick exterior to full detailing",
      image: carWashImg,
      link: "/user/services",
      pricing: [
        { name: "Basic Exterior", price: "₹199", time: "20 mins" },
        { name: "Premium Wash", price: "₹499", time: "45 mins" },
        { name: "Full Detailing", price: "₹1,499", time: "2 hrs" },
      ],
      features: ["Eco-friendly products", "Interior & exterior", "Done while you park"],
      popular: false,
    },
    {
      icon: Key,
      title: "Valet Parking",
      desc: "Premium valet service - hand over your keys and let professionals handle the rest",
      image: valetImg,
      link: "/user/services",
      pricing: [
        { name: "Standard Valet", price: "₹149", time: "Instant" },
        { name: "Priority Valet", price: "₹299", time: "Skip queue" },
        { name: "VIP Service", price: "₹499", time: "Premium care" },
      ],
      features: ["Professional valets", "Insurance covered", "Priority retrieval"],
      popular: false,
    },
  ];

  const additionalServices = [
    { icon: Wrench, title: "Quick Repairs", desc: "Tyre check, battery service, and minor repairs", price: "Varies" },
    { icon: Shield, title: "Security Guard", desc: "Guarded parking with 24/7 security personnel", price: "Included" },
    { icon: Sparkles, title: "AC Refresh", desc: "Quick AC sanitization and freshener service", price: "₹299" },
    { icon: Car, title: "Interior Sanitization", desc: "Deep cleaning and sanitization of car interior", price: "₹399" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">Premium Services</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              More than just <span className="text-gradient">parking</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              EV Charging, Car Wash, Valet, and more - add premium services to your parking experience
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/search">
                <Button variant="hero" size="lg">
                  Find Parking
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/ev-charging">
                <Button variant="outline" size="lg">
                  <Zap className="w-5 h-5 mr-2" />
                  EV Charging
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground">Choose from a range of premium services to enhance your parking experience</p>
          </div>

          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-64 lg:h-80 object-cover" />
                    {service.popular && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">{service.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-lg">{service.desc}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {service.pricing.map((tier, idx) => (
                      <Card key={idx} className={`bg-card border-border ${idx === 1 ? 'ring-2 ring-primary' : ''}`}>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm font-medium text-foreground mb-1">{tier.name}</p>
                          <p className="text-xl font-bold text-primary">{tier.price}</p>
                          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {tier.time}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Link to={service.link}>
                    <Button className="gap-2">
                      Book Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Additional Services</h2>
            <p className="text-muted-foreground">Extra conveniences available at select locations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {additionalServices.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-background border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                    <p className="text-primary font-semibold">{s.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6">Book services with your parking</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Add services during booking or to an existing reservation. Available at select parking locations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/search">
              <Button variant="hero" size="lg">
                Find Parking
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/user/services">
              <Button variant="outline" size="lg">
                View My Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;

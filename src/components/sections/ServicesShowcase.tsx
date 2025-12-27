import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Droplets, Key, ArrowRight, Star, Clock, CheckCircle } from "lucide-react";
import evChargingImg from "@/assets/ev-charging-service.jpg";
import carWashImg from "@/assets/car-wash-service.jpg";
import valetImg from "@/assets/valet-service.jpg";

const ServicesShowcase = () => {
  const services = [
    {
      id: "ev-charging",
      icon: Zap,
      title: "EV Charging",
      description: "Reserve charging stations at parking locations. Multiple charger types supported including CCS, CHAdeMO, and Type 2.",
      image: evChargingImg,
      price: "₹12/kWh",
      priceLabel: "Starting from",
      features: ["Real-time availability", "Multiple charger types", "Reserve in advance"],
      popular: true,
      link: "/user/ev-charging",
      color: "from-green-500/20 to-emerald-500/10",
    },
    {
      id: "car-wash",
      icon: Droplets,
      title: "Car Wash",
      description: "Professional car wash services while you park. From quick exterior wash to complete detailing.",
      image: carWashImg,
      price: "₹199",
      priceLabel: "Starting from",
      features: ["Exterior & interior options", "Eco-friendly products", "Done while you park"],
      popular: false,
      link: "/user/services",
      color: "from-blue-500/20 to-cyan-500/10",
    },
    {
      id: "valet",
      icon: Key,
      title: "Valet Parking",
      description: "Premium valet service at select locations. Hand over your keys and let professionals handle the rest.",
      image: valetImg,
      price: "₹149",
      priceLabel: "Starting from",
      features: ["Professional valets", "Priority retrieval", "Insurance covered"],
      popular: false,
      link: "/user/services",
      color: "from-purple-500/20 to-violet-500/10",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4"
          >
            Premium Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            More than just{" "}
            <span className="text-gradient">parking</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Add premium services to your parking booking. Charge your EV, get a car wash, or enjoy valet service.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} to-transparent`} />
                
                {/* Popular Badge */}
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Popular
                  </Badge>
                )}

                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{service.priceLabel}</p>
                    <p className="text-lg font-bold text-primary">{service.price}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to={service.link}>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            All services can be added during booking or to an existing reservation
          </p>
          <Link to="/user/services">
            <Button variant="link" className="text-primary">
              View all services
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;

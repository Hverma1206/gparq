import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Car, Building2, TrendingUp, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const PricingHosts = () => {
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerMonth, setDaysPerMonth] = useState(20);
  const hourlyRate = 50;
  const commission = 0.15;

  const grossEarnings = hoursPerDay * daysPerMonth * hourlyRate;
  const netEarnings = grossEarnings * (1 - commission);

  const features = [
    "Zero listing fee",
    "Free property verification",
    "Free QR codes & signage",
    "Insurance coverage included",
    "Weekly payouts to bank",
    "Host dashboard & analytics",
    "24/7 host support",
    "Surge pricing tools"
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Pricing for Hosts
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Earn more, <span className="text-gradient">keep more</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Low commission. Fast payouts. No hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toggle */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <Link to="/pricing/users">
              <Button variant="outline" size="lg">
                <Car className="w-4 h-4 mr-2" />
                For Drivers
              </Button>
            </Link>
            <Link to="/pricing/hosts">
              <Button variant="default" size="lg">
                <Building2 className="w-4 h-4 mr-2" />
                For Hosts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Commission Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-card border border-primary/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Simple Commission
                    </h3>
                    <p className="text-sm text-muted-foreground">No monthly fees</p>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="font-display text-6xl font-bold text-gradient">15%</span>
                  <span className="text-xl text-muted-foreground ml-2">per booking</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  You keep 85% of every booking. That's it. No setup fees, no monthly charges, no hidden costs.
                </p>
                <ul className="space-y-2">
                  {["GST included", "Instant calculation", "Transparent breakdown"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Calculator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Earnings Calculator
                    </h3>
                    <p className="text-sm text-muted-foreground">Estimate your monthly income</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Hours per day: {hoursPerDay}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      value={hoursPerDay}
                      onChange={(e) => setHoursPerDay(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Days per month: {daysPerMonth}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={daysPerMonth}
                      onChange={(e) => setDaysPerMonth(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Gross Earnings</span>
                      <span className="text-foreground font-medium">₹{grossEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Commission (15%)</span>
                      <span className="text-muted-foreground">-₹{(grossEarnings - netEarnings).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="text-foreground font-semibold">Your Earnings</span>
                      <span className="font-display text-2xl font-bold text-gradient">
                        ₹{Math.round(netEarnings).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      *Based on ₹{hourlyRate}/hour average rate
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              What's included for hosts
            </h2>
            <p className="text-muted-foreground">
              Everything you need to start earning — at no extra cost
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-background border border-border flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payout Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Fast, reliable payouts
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Earnings are deposited directly to your bank account every week. Track everything in your dashboard.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { day: "Mon-Sun", label: "Bookings collected" },
                { day: "Monday", label: "Payout processed" },
                { day: "Tues-Wed", label: "Money in your bank" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                  <p className="text-primary font-medium mb-1">{item.day}</p>
                  <p className="text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Ready to start earning?
            </h2>
            <p className="text-muted-foreground mb-8">
              List your space in 5 minutes. Start earning within a week.
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

export default PricingHosts;

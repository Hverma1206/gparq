import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Car, Wrench, Zap, Droplets, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PartnerSignup = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    serviceType: "",
    city: "",
    agree: false,
  });

  const serviceTypes = [
    { value: "car-wash", label: "Car Wash", icon: Droplets },
    { value: "ev-charging", label: "EV Charging", icon: Zap },
    { value: "repairs", label: "Repairs & Maintenance", icon: Wrench },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Application Submitted!", description: "We'll review your application and get back to you within 48 hours." });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <Car className="h-10 w-10 text-primary" />
            <span className="font-display text-3xl font-bold text-foreground">Parq</span>
          </Link>
          <h2 className="font-display text-4xl font-bold text-foreground text-center mb-4">
            Become a Service Partner
          </h2>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            Join Parq's network of trusted service providers and grow your business.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {serviceTypes.map((service) => (
              <div key={service.value} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{service.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Car className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">Parq</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Partner Application</h1>
          <p className="text-muted-foreground mb-8">Fill in your details to get started</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input
                placeholder="Your business name"
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Owner Name</Label>
              <Input
                placeholder="Full name"
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select value={form.serviceType} onValueChange={(v) => setForm({ ...form, serviceType: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>City</Label>
              <Input
                placeholder="Operating city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agree"
                checked={form.agree}
                onCheckedChange={(c) => setForm({ ...form, agree: c as boolean })}
              />
              <Label htmlFor="agree" className="text-sm">
                I agree to the <Link to="/service-partner-agreement" className="text-primary hover:underline">Service Partner Agreement</Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={!form.agree}>
              Submit Application <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already a partner? <Link to="/partner/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerSignup;

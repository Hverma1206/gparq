import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, ArrowRight, Building2, User, Mail, Phone, 
  Lock, Eye, EyeOff, CheckCircle, IndianRupee, Shield,
  Clock, Zap
} from "lucide-react";
import { toast } from "sonner";

const HostSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    spaceType: "",
    address: "",
    city: "",
    pincode: "",
    spotsCount: "",
    agreeTerms: false,
  });

  const benefits = [
    { icon: IndianRupee, title: "Earn ₹10,000+/month", desc: "Average host earnings from single parking space" },
    { icon: Shield, title: "Full Insurance", desc: "Complete coverage for your property and vehicles" },
    { icon: Clock, title: "Flexible Control", desc: "Set your own availability and pricing rules" },
    { icon: Zap, title: "Weekly Payouts", desc: "Get paid directly to your bank account every week" },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`${field} changed:`, value);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
        toast.error("Please fill all required fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }
    }
    console.log(`Moving to step ${step + 1}`);
    setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    console.log("Host signup submitted:", formData);
    toast.success("Registration successful! Please verify your email.");
    navigate("/host/pending");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">Parq</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">Already a host?</span>
              <Link to="/login">
                <Button variant="outline" size="sm">Log in</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24">
                <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                  Become a <span className="text-gradient">Parq Host</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Turn your unused parking space into a steady income stream. Join thousands of hosts earning with Parq.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-4 rounded-xl bg-card border border-border"
                    >
                      <benefit.icon className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold text-primary">1,250+</div>
                      <div className="text-sm text-muted-foreground">Active hosts in India</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    "Listing my driveway on Parq was the best decision. I earn ₹15,000/month doing nothing!"
                  </p>
                  <p className="text-sm font-medium text-foreground mt-2">— Priya S., Bangalore</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Create Host Account</CardTitle>
                  <CardDescription>Step {step} of 2 - {step === 1 ? "Personal Details" : "Space Details"}</CardDescription>
                  
                  {/* Progress Bar */}
                  <div className="flex gap-2 mt-4">
                    <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-secondary"}`} />
                    <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-secondary"}`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            placeholder="Enter your full name"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="you@example.com"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+91 98765 43210"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            placeholder="Create a strong password"
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            placeholder="Confirm your password"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <Button className="w-full" onClick={handleNextStep}>
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="spaceType">Space Type *</Label>
                        <Select value={formData.spaceType} onValueChange={(val) => handleInputChange("spaceType", val)}>
                          <SelectTrigger className="mt-1 bg-card">
                            <SelectValue placeholder="Select space type" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border z-50">
                            <SelectItem value="driveway">Driveway</SelectItem>
                            <SelectItem value="garage">Garage</SelectItem>
                            <SelectItem value="parking_lot">Parking Lot</SelectItem>
                            <SelectItem value="basement">Basement Parking</SelectItem>
                            <SelectItem value="commercial">Commercial Space</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="address">Full Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="Street address"
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="City"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input
                            id="pincode"
                            value={formData.pincode}
                            onChange={(e) => handleInputChange("pincode", e.target.value)}
                            placeholder="560001"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="spotsCount">Number of Parking Spots *</Label>
                        <Select value={formData.spotsCount} onValueChange={(val) => handleInputChange("spotsCount", val)}>
                          <SelectTrigger className="mt-1 bg-card">
                            <SelectValue placeholder="How many spots?" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border z-50">
                            <SelectItem value="1">1 spot</SelectItem>
                            <SelectItem value="2-5">2-5 spots</SelectItem>
                            <SelectItem value="6-10">6-10 spots</SelectItem>
                            <SelectItem value="11-25">11-25 spots</SelectItem>
                            <SelectItem value="26-50">26-50 spots</SelectItem>
                            <SelectItem value="50+">50+ spots</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-start space-x-3 pt-4">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                        />
                        <label htmlFor="agreeTerms" className="text-sm text-muted-foreground leading-tight">
                          I agree to the <Link to="/host-agreement" className="text-primary hover:underline">Host Agreement</Link>,{" "}
                          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>, and{" "}
                          <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                          Back
                        </Button>
                        <Button className="flex-1" onClick={handleSubmit}>
                          Create Account
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">Log in</Link>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostSignup;

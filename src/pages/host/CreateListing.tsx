import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MapPin, Upload, Clock, IndianRupee, Zap, Shield, 
  Camera, Car, Plus, ArrowLeft, Check
} from "lucide-react";
import Header from "@/components/layout/Header";

const CreateListing = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    totalSpots: "",
    pricePerHour: "",
    description: "",
    features: [] as string[],
    operatingHours: "24/7",
    evCharging: false,
  });

  const features = [
    { id: "covered", label: "Covered Parking" },
    { id: "cctv", label: "CCTV Surveillance" },
    { id: "guard", label: "Security Guard" },
    { id: "valet", label: "Valet Service" },
    { id: "ev", label: "EV Charging" },
    { id: "wheelchair", label: "Wheelchair Accessible" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/host/listings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Link>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Create New Listing
            </h1>
            <p className="text-muted-foreground">
              Add your parking space and start earning
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {step > s ? <Check className="h-4 w-4" /> : s}
                </div>
                <span className={`text-sm ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                  {s === 1 ? "Basic Info" : s === 2 ? "Details" : "Photos"}
                </span>
                {s < 3 && <div className="flex-1 h-0.5 bg-border" />}
              </div>
            ))}
          </motion.div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Parking Space Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Forum Mall Parking"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Textarea
                        id="address"
                        placeholder="Enter complete address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="pl-10 min-h-[80px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="e.g., Bangalore"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="spots">Total Parking Spots</Label>
                      <div className="relative">
                        <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="spots"
                          type="number"
                          placeholder="e.g., 50"
                          value={formData.totalSpots}
                          onChange={(e) => setFormData({ ...formData, totalSpots: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Hour</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="e.g., 40"
                        value={formData.pricePerHour}
                        onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => setStep(2)}>
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Features & Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your parking space..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Features & Amenities</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {features.map((feature) => (
                        <label
                          key={feature.id}
                          className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
                        >
                          <Checkbox
                            checked={formData.features.includes(feature.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, features: [...formData.features, feature.id] });
                              } else {
                                setFormData({ ...formData, features: formData.features.filter(f => f !== feature.id) });
                              }
                            }}
                          />
                          <span>{feature.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">EV Charging Available</div>
                        <div className="text-sm text-muted-foreground">Enable if you have EV charging stations</div>
                      </div>
                    </div>
                    <Switch
                      checked={formData.evCharging}
                      onCheckedChange={(checked) => setFormData({ ...formData, evCharging: checked })}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Photos */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Upload Photos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground mb-2">Upload Photos</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop photos or click to browse
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-xl bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <Plus className="h-8 w-8 text-muted-foreground" />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Link to="/host/listings" className="flex-1">
                      <Button className="w-full">
                        Create Listing
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateListing;

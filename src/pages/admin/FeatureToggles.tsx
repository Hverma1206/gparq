import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Flag, Search, Zap, Shield, Car, Wallet, 
  CreditCard, Bell, MapPin, Star, Smartphone, Settings
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "enabled" | "disabled" | "partial";
  enabledFor: string[];
  icon: any;
}

const FeatureToggles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [features, setFeatures] = useState<FeatureFlag[]>([
    { id: "1", name: "EV Charging", description: "Allow users to book EV charging slots", category: "Services", status: "enabled", enabledFor: ["all"], icon: Zap },
    { id: "2", name: "Car Wash Service", description: "On-demand car wash booking", category: "Services", status: "partial", enabledFor: ["Bangalore", "Mumbai"], icon: Car },
    { id: "3", name: "Wallet Payments", description: "In-app wallet for payments", category: "Payments", status: "enabled", enabledFor: ["all"], icon: Wallet },
    { id: "4", name: "UPI Payments", description: "Accept UPI payments", category: "Payments", status: "enabled", enabledFor: ["all"], icon: CreditCard },
    { id: "5", name: "Push Notifications", description: "Send push notifications to users", category: "Engagement", status: "enabled", enabledFor: ["all"], icon: Bell },
    { id: "6", name: "Surge Pricing", description: "Dynamic pricing during peak hours", category: "Pricing", status: "disabled", enabledFor: [], icon: Star },
    { id: "7", name: "Event Parking", description: "Special event-based parking listings", category: "Features", status: "partial", enabledFor: ["Delhi NCR", "Mumbai"], icon: MapPin },
    { id: "8", name: "Guest Vehicle", description: "Allow users to add temporary vehicles", category: "Features", status: "enabled", enabledFor: ["all"], icon: Car },
    { id: "9", name: "Family Accounts", description: "Shared accounts for family members", category: "Features", status: "partial", enabledFor: ["Bangalore"], icon: Shield },
    { id: "10", name: "SMS OTP Login", description: "Allow login via SMS OTP", category: "Auth", status: "enabled", enabledFor: ["all"], icon: Smartphone },
  ]);

  const categories = [...new Set(features.map(f => f.category))];

  const handleToggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(f => {
      if (f.id === featureId) {
        const newStatus = f.status === 'enabled' ? 'disabled' : 'enabled';
        toast.success(`${f.name} ${newStatus}`);
        return { ...f, status: newStatus as any, enabledFor: newStatus === 'enabled' ? ['all'] : [] };
      }
      return f;
    }));
  };

  const handleCityToggle = (featureId: string, city: string) => {
    setFeatures(prev => prev.map(f => {
      if (f.id === featureId) {
        const enabledFor = f.enabledFor.includes(city)
          ? f.enabledFor.filter(c => c !== city)
          : [...f.enabledFor, city];
        const status = enabledFor.length === 0 ? 'disabled' : enabledFor.includes('all') ? 'enabled' : 'partial';
        return { ...f, enabledFor, status: status as any };
      }
      return f;
    }));
    toast.success(`Feature updated for ${city}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enabled":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Enabled</Badge>;
      case "disabled":
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">Disabled</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Partial</Badge>;
      default:
        return null;
    }
  };

  const filteredFeatures = features.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const cities = ["Bangalore", "Mumbai", "Delhi NCR", "Chennai", "Hyderabad"];

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Feature Toggles
          </h1>
          <p className="text-muted-foreground">
            Enable or disable features globally or per city
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="font-display text-3xl font-bold text-green-500">
                {features.filter(f => f.status === 'enabled').length}
              </p>
              <p className="text-sm text-muted-foreground">Enabled Globally</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="font-display text-3xl font-bold text-yellow-500">
                {features.filter(f => f.status === 'partial').length}
              </p>
              <p className="text-sm text-muted-foreground">Partial Rollout</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="font-display text-3xl font-bold text-gray-500">
                {features.filter(f => f.status === 'disabled').length}
              </p>
              <p className="text-sm text-muted-foreground">Disabled</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search features..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Features List */}
        <div className="space-y-4">
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        feature.status === 'enabled' ? 'bg-green-500/10' :
                        feature.status === 'partial' ? 'bg-yellow-500/10' : 'bg-muted'
                      }`}>
                        <feature.icon className={`w-6 h-6 ${
                          feature.status === 'enabled' ? 'text-green-500' :
                          feature.status === 'partial' ? 'text-yellow-500' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg font-bold text-foreground">{feature.name}</h3>
                          {getStatusBadge(feature.status)}
                          <Badge variant="outline">{feature.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {feature.status === 'enabled' ? 'On' : feature.status === 'disabled' ? 'Off' : 'Partial'}
                      </span>
                      <Switch 
                        checked={feature.status !== 'disabled'}
                        onCheckedChange={() => handleToggleFeature(feature.id)}
                      />
                    </div>
                  </div>

                  {feature.status !== 'disabled' && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-3">Enabled Cities:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={feature.enabledFor.includes('all') ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setFeatures(prev => prev.map(f => 
                              f.id === feature.id 
                                ? { ...f, enabledFor: ['all'], status: 'enabled' as any }
                                : f
                            ));
                            toast.success("Enabled for all cities");
                          }}
                        >
                          All Cities
                        </Button>
                        {cities.map(city => (
                          <Button
                            key={city}
                            variant={feature.enabledFor.includes(city) || feature.enabledFor.includes('all') ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => handleCityToggle(feature.id, city)}
                            disabled={feature.enabledFor.includes('all')}
                          >
                            {city}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FeatureToggles;

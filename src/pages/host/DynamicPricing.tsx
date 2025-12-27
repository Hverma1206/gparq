import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, Clock, Calendar, Star, Zap, 
  IndianRupee, Percent, AlertCircle, CheckCircle, Settings
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface PricingRule {
  id: string;
  name: string;
  type: "peak" | "event" | "surge" | "discount";
  multiplier: number;
  conditions: string;
  status: "active" | "inactive";
}

const DynamicPricing = () => {
  const [basePrice, setBasePrice] = useState(40);
  const [surgePricingEnabled, setSurgePricingEnabled] = useState(true);
  const [maxMultiplier, setMaxMultiplier] = useState([2.0]);

  const [rules, setRules] = useState<PricingRule[]>([
    { id: "1", name: "Morning Rush", type: "peak", multiplier: 1.3, conditions: "Mon-Fri, 8AM-10AM", status: "active" },
    { id: "2", name: "Evening Rush", type: "peak", multiplier: 1.5, conditions: "Mon-Fri, 5PM-8PM", status: "active" },
    { id: "3", name: "Weekend Premium", type: "peak", multiplier: 1.2, conditions: "Sat-Sun, All Day", status: "active" },
    { id: "4", name: "Night Discount", type: "discount", multiplier: 0.7, conditions: "Daily, 10PM-6AM", status: "active" },
    { id: "5", name: "IPL Match Day", type: "event", multiplier: 2.0, conditions: "Stadium events", status: "inactive" },
  ]);

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r
    ));
    toast.success("Pricing rule updated");
  };

  const handleSaveSettings = () => {
    toast.success("Pricing settings saved successfully");
  };

  const getRuleBadge = (type: string) => {
    switch (type) {
      case "peak":
        return <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">Peak Hour</Badge>;
      case "event":
        return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">Event</Badge>;
      case "surge":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Surge</Badge>;
      case "discount":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Discount</Badge>;
      default:
        return null;
    }
  };

  const currentHour = new Date().getHours();
  const isCurrentlyPeak = (currentHour >= 8 && currentHour <= 10) || (currentHour >= 17 && currentHour <= 20);
  const currentMultiplier = isCurrentlyPeak ? 1.4 : 1.0;
  const currentPrice = Math.round(basePrice * currentMultiplier);

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Dynamic Pricing
          </h1>
          <p className="text-muted-foreground">
            Set up smart pricing rules to maximize your earnings
          </p>
        </div>

        {/* Current Price Display */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Base Price</p>
              <p className="font-display text-3xl font-bold text-foreground">₹{basePrice}/hr</p>
            </CardContent>
          </Card>
          <Card className={`border-2 ${isCurrentlyPeak ? 'bg-orange-500/10 border-orange-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {isCurrentlyPeak ? (
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                <p className="text-sm text-muted-foreground">Current Price</p>
              </div>
              <p className="font-display text-3xl font-bold text-foreground">₹{currentPrice}/hr</p>
              <Badge variant="secondary" className="mt-2">
                {currentMultiplier}x multiplier
              </Badge>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Est. Extra Earnings</p>
              <p className="font-display text-3xl font-bold text-green-500">+₹4,500</p>
              <p className="text-xs text-muted-foreground mt-1">This month from surge pricing</p>
            </CardContent>
          </Card>
        </div>

        {/* Base Price Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary" />
              Base Price Settings
            </CardTitle>
            <CardDescription>Set your standard hourly rate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Hourly Rate (₹)</Label>
                <Input 
                  type="number" 
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Daily Rate (₹)</Label>
                <Input type="number" defaultValue={basePrice * 10} />
              </div>
              <div className="space-y-2">
                <Label>Monthly Rate (₹)</Label>
                <Input type="number" defaultValue={basePrice * 200} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Surge Pricing */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Surge Pricing
                </CardTitle>
                <CardDescription>Automatically adjust prices based on demand</CardDescription>
              </div>
              <Switch 
                checked={surgePricingEnabled}
                onCheckedChange={setSurgePricingEnabled}
              />
            </div>
          </CardHeader>
          {surgePricingEnabled && (
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">How Surge Pricing Works</p>
                    <p className="text-sm text-muted-foreground">
                      When demand is high in your area, prices automatically increase up to your set maximum multiplier. 
                      This helps you earn more during busy periods.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Maximum Price Multiplier</Label>
                  <span className="font-display font-bold text-foreground">{maxMultiplier[0]}x</span>
                </div>
                <Slider
                  value={maxMultiplier}
                  onValueChange={setMaxMultiplier}
                  min={1.5}
                  max={3.0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1.5x (Conservative)</span>
                  <span>2.0x (Moderate)</span>
                  <span>3.0x (Aggressive)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  At {maxMultiplier[0]}x, your price can go up to <strong>₹{Math.round(basePrice * maxMultiplier[0])}/hr</strong> during high demand.
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Pricing Rules */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Pricing Rules
                </CardTitle>
                <CardDescription>Define custom pricing for specific times and events</CardDescription>
              </div>
              <Button variant="outline" className="gap-2" onClick={() => toast.info("Add rule wizard coming soon")}>
                <Settings className="w-4 h-4" /> Add Rule
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  rule.status === 'active' ? 'bg-secondary/30 border-border' : 'bg-muted/30 border-border opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    rule.type === 'peak' ? 'bg-orange-500/10' :
                    rule.type === 'event' ? 'bg-purple-500/10' :
                    rule.type === 'discount' ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}>
                    {rule.type === 'discount' ? (
                      <Percent className={`w-5 h-5 ${
                        rule.type === 'discount' ? 'text-green-500' : 'text-muted-foreground'
                      }`} />
                    ) : (
                      <TrendingUp className={`w-5 h-5 ${
                        rule.type === 'peak' ? 'text-orange-500' :
                        rule.type === 'event' ? 'text-purple-500' : 'text-red-500'
                      }`} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{rule.name}</h3>
                      {getRuleBadge(rule.type)}
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.conditions}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-display font-bold ${
                      rule.multiplier > 1 ? 'text-orange-500' : 'text-green-500'
                    }`}>
                      {rule.multiplier > 1 ? '+' : ''}{Math.round((rule.multiplier - 1) * 100)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{Math.round(basePrice * rule.multiplier)}/hr
                    </p>
                  </div>
                  <Switch 
                    checked={rule.status === 'active'}
                    onCheckedChange={() => handleToggleRule(rule.id)}
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Event Pricing */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Special pricing for nearby events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "IPL Match - RCB vs MI", date: "Dec 28, 2025", venue: "Chinnaswamy Stadium", suggestedMultiplier: 2.5 },
                { name: "New Year Eve Concert", date: "Dec 31, 2025", venue: "Palace Grounds", suggestedMultiplier: 2.0 },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">{event.date} • {event.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Suggested</p>
                      <p className="font-display font-bold text-purple-500">{event.suggestedMultiplier}x</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.success(`Event pricing enabled: ${event.suggestedMultiplier}x`)}>
                      Enable
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" onClick={handleSaveSettings} className="gap-2">
            <CheckCircle className="w-4 h-4" /> Save All Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DynamicPricing;

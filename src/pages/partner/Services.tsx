import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, Zap, Wrench, Plus, Edit2, Trash2, 
  IndianRupee, Clock, CheckCircle 
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const PartnerServices = () => {
  const { toast } = useToast();

  const [services, setServices] = useState([
    { id: 1, name: "Basic Car Wash", price: 249, duration: "30 mins", category: "wash", active: true, bookings: 89 },
    { id: 2, name: "Premium Car Wash", price: 499, duration: "45 mins", category: "wash", active: true, bookings: 67 },
    { id: 3, name: "Interior Cleaning", price: 799, duration: "60 mins", category: "wash", active: true, bookings: 34 },
    { id: 4, name: "EV Fast Charging", price: 15, duration: "per kWh", category: "ev", active: true, bookings: 156 },
    { id: 5, name: "Tyre Puncture Repair", price: 150, duration: "20 mins", category: "repair", active: false, bookings: 23 },
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "wash": return <Droplets className="w-5 h-5" />;
      case "ev": return <Zap className="w-5 h-5" />;
      case "repair": return <Wrench className="w-5 h-5" />;
      default: return <Wrench className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "wash": return "bg-blue-500/10 text-blue-500";
      case "ev": return "bg-green-500/10 text-green-500";
      case "repair": return "bg-amber-500/10 text-amber-500";
      default: return "bg-primary/10 text-primary";
    }
  };

  const toggleService = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
    toast({ title: "Service updated", description: "Service status has been changed." });
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              My Services
            </h1>
            <p className="text-muted-foreground">
              Manage the services you offer to Parq users
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Service
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="font-display text-3xl font-bold text-foreground">{services.length}</div>
              <div className="text-sm text-muted-foreground">Total Services</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="font-display text-3xl font-bold text-green-500">{services.filter(s => s.active).length}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="font-display text-3xl font-bold text-foreground">{services.reduce((a, s) => a + s.bookings, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  service.active ? 'bg-secondary/50 border-border' : 'bg-muted/30 border-border/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryColor(service.category)}`}>
                    {getCategoryIcon(service.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${service.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {service.name}
                      </span>
                      {!service.active && <Badge variant="secondary">Inactive</Badge>}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <IndianRupee className="w-3 h-3" />{service.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{service.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />{service.bookings} bookings
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Switch
                    checked={service.active}
                    onCheckedChange={() => toggleService(service.id)}
                  />
                  <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerServices;

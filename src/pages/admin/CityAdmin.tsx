import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, Users, Building2, TrendingUp, Search, 
  Plus, Settings, BarChart3, IndianRupee, Car, AlertCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface City {
  id: string;
  name: string;
  state: string;
  status: "active" | "launching" | "inactive";
  hosts: number;
  users: number;
  bookings: number;
  revenue: number;
  adminAssigned: string;
}

const CityAdmin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const cities: City[] = [
    { id: "1", name: "Bangalore", state: "Karnataka", status: "active", hosts: 245, users: 12500, bookings: 8450, revenue: 2456000, adminAssigned: "Rahul S." },
    { id: "2", name: "Mumbai", state: "Maharashtra", status: "active", hosts: 189, users: 9800, bookings: 6200, revenue: 1890000, adminAssigned: "Priya M." },
    { id: "3", name: "Delhi NCR", state: "Delhi", status: "active", hosts: 156, users: 7600, bookings: 4800, revenue: 1450000, adminAssigned: "Amit K." },
    { id: "4", name: "Chennai", state: "Tamil Nadu", status: "launching", hosts: 45, users: 1200, bookings: 320, revenue: 98000, adminAssigned: "Unassigned" },
    { id: "5", name: "Hyderabad", state: "Telangana", status: "launching", hosts: 38, users: 890, bookings: 210, revenue: 67000, adminAssigned: "Neha R." },
    { id: "6", name: "Pune", state: "Maharashtra", status: "inactive", hosts: 0, users: 0, bookings: 0, revenue: 0, adminAssigned: "Unassigned" },
  ];

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>;
      case "launching":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Launching</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">Inactive</Badge>;
      default:
        return null;
    }
  };

  const handleCityAction = (action: string, city: City) => {
    toast.success(`${action} action for ${city.name}`);
  };

  const totalStats = {
    cities: cities.filter(c => c.status === "active").length,
    hosts: cities.reduce((acc, c) => acc + c.hosts, 0),
    users: cities.reduce((acc, c) => acc + c.users, 0),
    revenue: cities.reduce((acc, c) => acc + c.revenue, 0),
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              City Administration
            </h1>
            <p className="text-muted-foreground">
              Manage cities, regions, and local operations
            </p>
          </div>
          <Button className="gap-2" onClick={() => toast.info("City onboarding wizard coming soon")}>
            <Plus className="w-4 h-4" /> Add New City
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Active Cities</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{totalStats.cities}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Total Hosts</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{totalStats.hosts}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Total Users</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{totalStats.users.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Total Revenue</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">₹{(totalStats.revenue / 100000).toFixed(1)}L</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search cities..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="launching">Launching</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`bg-card border-border hover:border-primary/50 transition-colors cursor-pointer ${
                city.status === 'inactive' ? 'opacity-60' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-lg font-bold text-foreground">{city.name}</h3>
                        {getStatusBadge(city.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{city.state}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleCityAction("Settings", city)}>
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Hosts</p>
                      <p className="font-display font-bold text-foreground">{city.hosts}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Users</p>
                      <p className="font-display font-bold text-foreground">{city.users.toLocaleString()}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Bookings</p>
                      <p className="font-display font-bold text-foreground">{city.bookings.toLocaleString()}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="font-display font-bold text-foreground">₹{(city.revenue / 1000).toFixed(0)}K</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Admin: </span>
                      <span className={city.adminAssigned === "Unassigned" ? "text-yellow-500" : "text-foreground"}>
                        {city.adminAssigned}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleCityAction("View Details", city)}>
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pending Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Pending City Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { city: "Chennai", action: "Assign city admin", priority: "high" },
              { city: "Pune", action: "Complete city setup", priority: "medium" },
              { city: "Hyderabad", action: "Review host applications (12)", priority: "high" },
              { city: "Delhi NCR", action: "Resolve compliance issue", priority: "low" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}>
                    {item.priority}
                  </Badge>
                  <div>
                    <p className="font-medium text-foreground">{item.city}</p>
                    <p className="text-sm text-muted-foreground">{item.action}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info(`Taking action for ${item.city}`)}>
                  Take Action
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CityAdmin;

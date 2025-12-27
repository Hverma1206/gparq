import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Truck, Plus, Search, Car, Tag, Users, 
  Calendar, IndianRupee, BarChart3, Download,
  Building2, MapPin, Clock, CheckCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface FleetVehicle {
  id: string;
  numberPlate: string;
  type: string;
  tag: string;
  driver?: string;
  department: string;
  status: "active" | "parked" | "maintenance";
  lastParked?: string;
  totalSpend: number;
}

const FleetManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [vehicles, setVehicles] = useState<FleetVehicle[]>([
    { id: "1", numberPlate: "KA-01-AB-1234", type: "Sedan", tag: "Sales", driver: "Rajesh K.", department: "Sales", status: "active", lastParked: "Forum Mall", totalSpend: 12500 },
    { id: "2", numberPlate: "KA-01-CD-5678", type: "SUV", tag: "Executive", driver: "Priya M.", department: "Management", status: "parked", lastParked: "Brigade Gateway", totalSpend: 18200 },
    { id: "3", numberPlate: "KA-01-EF-9012", type: "Hatchback", tag: "Delivery", driver: "Amit S.", department: "Logistics", status: "active", totalSpend: 8900 },
    { id: "4", numberPlate: "KA-01-GH-3456", type: "Van", tag: "Logistics", department: "Operations", status: "maintenance", totalSpend: 5600 },
    { id: "5", numberPlate: "KA-01-IJ-7890", type: "Sedan", tag: "Sales", driver: "Neha R.", department: "Sales", status: "active", lastParked: "Indiranagar", totalSpend: 9800 },
  ]);

  const departments = ["Sales", "Management", "Logistics", "Operations", "HR", "IT"];
  const tags = ["Sales", "Executive", "Delivery", "Logistics", "VIP", "General"];

  const stats = {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === "active").length,
    parkedNow: vehicles.filter(v => v.status === "parked").length,
    monthlySpend: vehicles.reduce((acc, v) => acc + v.totalSpend, 0),
  };

  const filteredVehicles = vehicles.filter(v =>
    v.numberPlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.driver?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>;
      case "parked":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Parked</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Maintenance</Badge>;
      default:
        return null;
    }
  };

  const handleAddVehicle = () => {
    toast.success("Vehicle added to fleet");
    setShowAddDialog(false);
  };

  const handleBulkBook = () => {
    toast.success("Bulk booking initiated for selected vehicles");
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Fleet Management
            </h1>
            <p className="text-muted-foreground">
              Manage your corporate fleet vehicles and parking
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => toast.info("Exporting fleet data...")}>
              <Download className="w-4 h-4" /> Export
            </Button>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" /> Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="font-display">Add Fleet Vehicle</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Number Plate *</Label>
                      <Input placeholder="KA-01-XX-1234" />
                    </div>
                    <div className="space-y-2">
                      <Label>Vehicle Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tag</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tag" />
                        </SelectTrigger>
                        <SelectContent>
                          {tags.map(tag => (
                            <SelectItem key={tag} value={tag.toLowerCase()}>{tag}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Assigned Driver (Optional)</Label>
                      <Input placeholder="Driver name" />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddVehicle}>Add Vehicle</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Vehicles</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stats.totalVehicles}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stats.activeVehicles}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Parked Now</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stats.parkedNow}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Monthly Spend</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">₹{(stats.monthlySpend / 1000).toFixed(1)}K</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by plate, driver, department..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="parked">Parked</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Bulk Parking Booking</p>
                  <p className="text-sm text-muted-foreground">Book parking for multiple vehicles at once</p>
                </div>
              </div>
              <Button onClick={handleBulkBook} className="gap-2">
                <CheckCircle className="w-4 h-4" /> Book for Selected
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Vehicles */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Fleet Vehicles</CardTitle>
            <CardDescription>All vehicles in your corporate fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Car className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-mono font-medium text-foreground">{vehicle.numberPlate}</h3>
                        {getStatusBadge(vehicle.status)}
                        <Badge variant="outline" className="gap-1">
                          <Tag className="w-3 h-3" /> {vehicle.tag}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{vehicle.type}</span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> {vehicle.department}
                        </span>
                        {vehicle.driver && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {vehicle.driver}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-foreground">₹{vehicle.totalSpend.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </div>
                    {vehicle.status === "parked" && vehicle.lastParked && (
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="w-3 h-3" /> {vehicle.lastParked}
                      </Badge>
                    )}
                    <Button variant="outline" size="sm" onClick={() => toast.info(`Booking for ${vehicle.numberPlate}`)}>
                      Book Parking
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Department Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {departments.slice(0, 3).map((dept, index) => {
                const deptVehicles = vehicles.filter(v => v.department === dept);
                const deptSpend = deptVehicles.reduce((acc, v) => acc + v.totalSpend, 0);
                return (
                  <div key={dept} className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <h4 className="font-medium text-foreground mb-2">{dept}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Vehicles</p>
                        <p className="font-display font-bold text-foreground">{deptVehicles.length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Spend</p>
                        <p className="font-display font-bold text-foreground">₹{(deptSpend / 1000).toFixed(1)}K</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FleetManagement;

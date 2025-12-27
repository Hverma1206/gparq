import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  MapPin, Users, Building2, TrendingUp, Search, 
  Plus, Settings, BarChart3, IndianRupee, Car, AlertCircle,
  Edit, Trash2, Eye, MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  launchDate?: string;
  notes?: string;
}

const CityAdmin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    status: "inactive" as City["status"],
    adminAssigned: "",
    launchDate: "",
    notes: "",
  });

  const [cities, setCities] = useState<City[]>([
    { id: "1", name: "Bangalore", state: "Karnataka", status: "active", hosts: 245, users: 12500, bookings: 8450, revenue: 2456000, adminAssigned: "Rahul S." },
    { id: "2", name: "Mumbai", state: "Maharashtra", status: "active", hosts: 189, users: 9800, bookings: 6200, revenue: 1890000, adminAssigned: "Priya M." },
    { id: "3", name: "Delhi NCR", state: "Delhi", status: "active", hosts: 156, users: 7600, bookings: 4800, revenue: 1450000, adminAssigned: "Amit K." },
    { id: "4", name: "Chennai", state: "Tamil Nadu", status: "launching", hosts: 45, users: 1200, bookings: 320, revenue: 98000, adminAssigned: "Unassigned", launchDate: "Jan 15, 2026" },
    { id: "5", name: "Hyderabad", state: "Telangana", status: "launching", hosts: 38, users: 890, bookings: 210, revenue: 67000, adminAssigned: "Neha R.", launchDate: "Feb 1, 2026" },
    { id: "6", name: "Pune", state: "Maharashtra", status: "inactive", hosts: 0, users: 0, bookings: 0, revenue: 0, adminAssigned: "Unassigned" },
  ]);

  const admins = ["Rahul S.", "Priya M.", "Amit K.", "Neha R.", "Vikram P."];
  const states = ["Karnataka", "Maharashtra", "Delhi", "Tamil Nadu", "Telangana", "Gujarat", "Rajasthan", "West Bengal", "Kerala"];

  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || city.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleCreate = () => {
    const newCity: City = {
      id: String(cities.length + 1),
      name: formData.name,
      state: formData.state,
      status: formData.status,
      hosts: 0,
      users: 0,
      bookings: 0,
      revenue: 0,
      adminAssigned: formData.adminAssigned || "Unassigned",
      launchDate: formData.launchDate,
      notes: formData.notes,
    };
    setCities([...cities, newCity]);
    setShowCreateDialog(false);
    resetForm();
    toast.success(`${formData.name} added successfully`);
  };

  const handleEdit = () => {
    if (!selectedCity) return;
    setCities(cities.map(c => 
      c.id === selectedCity.id 
        ? { 
            ...c, 
            name: formData.name,
            state: formData.state,
            status: formData.status,
            adminAssigned: formData.adminAssigned || "Unassigned",
            launchDate: formData.launchDate,
            notes: formData.notes,
          } 
        : c
    ));
    setShowEditDialog(false);
    setSelectedCity(null);
    resetForm();
    toast.success("City updated successfully");
  };

  const handleDelete = (city: City) => {
    if (city.hosts > 0 || city.users > 0) {
      toast.error("Cannot delete city with active hosts or users");
      return;
    }
    setCities(cities.filter(c => c.id !== city.id));
    toast.success(`${city.name} deleted`);
  };

  const handleToggleStatus = (city: City) => {
    const newStatus = city.status === "active" ? "inactive" : "active";
    setCities(cities.map(c => 
      c.id === city.id ? { ...c, status: newStatus } : c
    ));
    toast.success(`${city.name} is now ${newStatus}`);
  };

  const openEditDialog = (city: City) => {
    setSelectedCity(city);
    setFormData({
      name: city.name,
      state: city.state,
      status: city.status,
      adminAssigned: city.adminAssigned === "Unassigned" ? "" : city.adminAssigned,
      launchDate: city.launchDate || "",
      notes: city.notes || "",
    });
    setShowEditDialog(true);
  };

  const openViewDialog = (city: City) => {
    setSelectedCity(city);
    setShowViewDialog(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      state: "",
      status: "inactive",
      adminAssigned: "",
      launchDate: "",
      notes: "",
    });
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
          <Button className="gap-2" onClick={() => setShowCreateDialog(true)}>
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
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search cities..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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
              <Card className={`bg-card border-border hover:border-primary/50 transition-colors ${
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
                      {city.launchDate && city.status === "launching" && (
                        <p className="text-xs text-primary mt-1">Launch: {city.launchDate}</p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openViewDialog(city)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(city)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit City
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(city)}>
                          <Settings className="h-4 w-4 mr-2" />
                          {city.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(city)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete City
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
            {cities.filter(c => c.adminAssigned === "Unassigned" || c.status === "launching").map((city, index) => (
              <div key={city.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <Badge variant={city.adminAssigned === "Unassigned" ? "destructive" : "default"}>
                    {city.adminAssigned === "Unassigned" ? "High" : "Medium"}
                  </Badge>
                  <div>
                    <p className="font-medium text-foreground">{city.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {city.adminAssigned === "Unassigned" ? "Assign city admin" : `Launch on ${city.launchDate}`}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => openEditDialog(city)}>
                  Take Action
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Create Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New City</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter city name"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Select value={formData.state} onValueChange={(v) => setFormData({...formData, state: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v as City["status"]})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="launching">Launching</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Assign Admin</Label>
                  <Select value={formData.adminAssigned} onValueChange={(v) => setFormData({...formData, adminAssigned: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select admin" />
                    </SelectTrigger>
                    <SelectContent>
                      {admins.map(admin => (
                        <SelectItem key={admin} value={admin}>{admin}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {formData.status === "launching" && (
                <div>
                  <Label>Launch Date</Label>
                  <Input 
                    type="date"
                    value={formData.launchDate} 
                    onChange={(e) => setFormData({...formData, launchDate: e.target.value})}
                  />
                </div>
              )}
              <div>
                <Label>Notes (Optional)</Label>
                <Textarea 
                  value={formData.notes} 
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any additional notes..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={!formData.name || !formData.state}>Add City</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit City - {selectedCity?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Select value={formData.state} onValueChange={(v) => setFormData({...formData, state: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v as City["status"]})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="launching">Launching</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Assign Admin</Label>
                  <Select value={formData.adminAssigned} onValueChange={(v) => setFormData({...formData, adminAssigned: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select admin" />
                    </SelectTrigger>
                    <SelectContent>
                      {admins.map(admin => (
                        <SelectItem key={admin} value={admin}>{admin}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {formData.status === "launching" && (
                <div>
                  <Label>Launch Date</Label>
                  <Input 
                    type="date"
                    value={formData.launchDate} 
                    onChange={(e) => setFormData({...formData, launchDate: e.target.value})}
                  />
                </div>
              )}
              <div>
                <Label>Notes</Label>
                <Textarea 
                  value={formData.notes} 
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button onClick={handleEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>City Details - {selectedCity?.name}</DialogTitle>
            </DialogHeader>
            {selectedCity && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedCity.status)}
                  <span className="text-muted-foreground">{selectedCity.state}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Total Hosts</p>
                    <p className="font-display text-xl font-bold">{selectedCity.hosts}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Total Users</p>
                    <p className="font-display text-xl font-bold">{selectedCity.users.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Bookings</p>
                    <p className="font-display text-xl font-bold">{selectedCity.bookings.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="font-display text-xl font-bold">₹{(selectedCity.revenue / 100000).toFixed(2)}L</p>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-muted-foreground">City Admin</p>
                  <p className={`font-medium ${selectedCity.adminAssigned === "Unassigned" ? "text-yellow-500" : ""}`}>
                    {selectedCity.adminAssigned}
                  </p>
                </div>

                {selectedCity.launchDate && (
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Launch Date</p>
                    <p className="font-medium">{selectedCity.launchDate}</p>
                  </div>
                )}

                {selectedCity.notes && (
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Notes</p>
                    <p className="text-sm">{selectedCity.notes}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
              <Button onClick={() => { setShowViewDialog(false); openEditDialog(selectedCity!); }}>
                Edit City
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CityAdmin;
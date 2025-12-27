import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Car, Plus, Clock, Trash2, AlertCircle, 
  Calendar, CheckCircle, Edit
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface GuestVehicle {
  id: string;
  numberPlate: string;
  vehicleType: string;
  nickname: string;
  addedAt: string;
  expiresAt: string;
  usageCount: number;
}

const GuestVehiclePage = () => {
  const [guestVehicles, setGuestVehicles] = useState<GuestVehicle[]>([
    { 
      id: "1", 
      numberPlate: "KA-02-XY-9876", 
      vehicleType: "car",
      nickname: "Mom's Car",
      addedAt: "Dec 20, 2025",
      expiresAt: "Jan 20, 2026",
      usageCount: 2
    },
    { 
      id: "2", 
      numberPlate: "KA-05-AB-1234", 
      vehicleType: "bike",
      nickname: "Friend's Bike",
      addedAt: "Dec 25, 2025",
      expiresAt: "Dec 25, 2025",
      usageCount: 1
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    numberPlate: "",
    vehicleType: "car",
    nickname: "",
    duration: "1day"
  });

  const handleAddVehicle = () => {
    if (!newVehicle.numberPlate) {
      toast.error("Please enter the vehicle number plate");
      return;
    }

    const now = new Date();
    let expiresAt = new Date();
    
    switch (newVehicle.duration) {
      case "1day":
        expiresAt.setDate(now.getDate() + 1);
        break;
      case "1week":
        expiresAt.setDate(now.getDate() + 7);
        break;
      case "1month":
        expiresAt.setMonth(now.getMonth() + 1);
        break;
    }

    const vehicle: GuestVehicle = {
      id: Date.now().toString(),
      numberPlate: newVehicle.numberPlate.toUpperCase(),
      vehicleType: newVehicle.vehicleType,
      nickname: newVehicle.nickname || "Guest Vehicle",
      addedAt: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expiresAt: expiresAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      usageCount: 0
    };

    setGuestVehicles(prev => [...prev, vehicle]);
    setNewVehicle({ numberPlate: "", vehicleType: "car", nickname: "", duration: "1day" });
    setShowAddForm(false);
    toast.success("Guest vehicle added successfully");
  };

  const handleRemoveVehicle = (vehicleId: string) => {
    setGuestVehicles(prev => prev.filter(v => v.id !== vehicleId));
    toast.success("Guest vehicle removed");
  };

  const handleExtendValidity = (vehicleId: string) => {
    toast.success("Vehicle validity extended by 7 days");
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Guest Vehicles
            </h1>
            <p className="text-muted-foreground">
              Add temporary vehicles for friends, family, or rental cars
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add Guest Vehicle
          </Button>
        </div>

        {/* Info Card */}
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">How Guest Vehicles Work</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Add vehicles you don't own but want to park temporarily</li>
                  <li>• Perfect for rental cars, borrowed vehicles, or visiting friends</li>
                  <li>• Guest vehicles automatically expire after the set duration</li>
                  <li>• No documents required for guest vehicles</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Vehicle Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-card border-border border-primary/50">
              <CardHeader>
                <CardTitle className="font-display text-xl">Add Guest Vehicle</CardTitle>
                <CardDescription>Enter the vehicle details for temporary access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Number Plate *</Label>
                    <Input 
                      placeholder="KA-01-AB-1234"
                      value={newVehicle.numberPlate}
                      onChange={(e) => setNewVehicle(prev => ({ ...prev, numberPlate: e.target.value }))}
                      className="uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Vehicle Type</Label>
                    <Select 
                      value={newVehicle.vehicleType}
                      onValueChange={(value) => setNewVehicle(prev => ({ ...prev, vehicleType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="bike">Bike</SelectItem>
                        <SelectItem value="ev">Electric Vehicle</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nickname (Optional)</Label>
                    <Input 
                      placeholder="e.g., Mom's Car, Rental"
                      value={newVehicle.nickname}
                      onChange={(e) => setNewVehicle(prev => ({ ...prev, nickname: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Valid For</Label>
                    <Select 
                      value={newVehicle.duration}
                      onValueChange={(value) => setNewVehicle(prev => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1day">1 Day</SelectItem>
                        <SelectItem value="1week">1 Week</SelectItem>
                        <SelectItem value="1month">1 Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddVehicle} className="gap-2">
                    <CheckCircle className="w-4 h-4" /> Add Vehicle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Guest Vehicles List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Your Guest Vehicles</CardTitle>
            <CardDescription>Temporary vehicles you can book parking for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {guestVehicles.length === 0 ? (
              <div className="text-center py-12">
                <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                  No Guest Vehicles
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add a guest vehicle to book parking for vehicles you don't own
                </p>
                <Button onClick={() => setShowAddForm(true)} className="gap-2">
                  <Plus className="w-4 h-4" /> Add Your First Guest Vehicle
                </Button>
              </div>
            ) : (
              guestVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Car className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground font-mono">{vehicle.numberPlate}</h3>
                        <Badge variant="secondary">{vehicle.vehicleType}</Badge>
                        <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                          Guest
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{vehicle.nickname}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Added: {vehicle.addedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Expires: {vehicle.expiresAt}
                        </span>
                        <span>Used {vehicle.usageCount} times</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExtendValidity(vehicle.id)}
                    >
                      Extend
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveVehicle(vehicle.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Guest Vehicle Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Active Guest Vehicles</p>
                <p className="text-sm text-muted-foreground">You can have up to 5 guest vehicles at a time</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold text-foreground">
                  {guestVehicles.length}/5
                </p>
                <p className="text-sm text-muted-foreground">vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GuestVehiclePage;

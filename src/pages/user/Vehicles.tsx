import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Car, Plus, Edit, Trash2, Star, MoreVertical, Check
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const UserVehicles = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "My Sedan",
      number: "KA 01 AB 1234",
      type: "Sedan",
      color: "White",
      isDefault: true,
    },
    {
      id: 2,
      name: "Family SUV",
      number: "KA 05 CD 5678",
      type: "SUV",
      color: "Black",
      isDefault: false,
    },
    {
      id: 3,
      name: "City Hatchback",
      number: "KA 03 EF 9012",
      type: "Hatchback",
      color: "Red",
      isDefault: false,
    },
  ]);

  const [newVehicle, setNewVehicle] = useState({
    name: "",
    number: "",
    type: "",
    color: "",
  });

  const handleAddVehicle = () => {
    if (!newVehicle.name || !newVehicle.number || !newVehicle.type) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const vehicle = {
      id: Date.now(),
      ...newVehicle,
      isDefault: vehicles.length === 0,
    };
    
    setVehicles([...vehicles, vehicle]);
    setNewVehicle({ name: "", number: "", type: "", color: "" });
    setDialogOpen(false);
    toast.success("Vehicle added successfully");
  };

  const handleDelete = (id: number) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast.success("Vehicle removed");
  };

  const handleSetDefault = (id: number) => {
    setVehicles(vehicles.map(v => ({
      ...v,
      isDefault: v.id === id,
    })));
    toast.success("Default vehicle updated");
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              My Vehicles
            </h1>
            <p className="text-muted-foreground">
              Manage your registered vehicles
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Vehicle Name</Label>
                  <Input
                    id="name"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    placeholder="e.g., My Sedan"
                  />
                </div>
                <div>
                  <Label htmlFor="number">Vehicle Number</Label>
                  <Input
                    id="number"
                    value={newVehicle.number}
                    onChange={(e) => setNewVehicle({ ...newVehicle, number: e.target.value.toUpperCase() })}
                    placeholder="e.g., KA 01 AB 1234"
                  />
                </div>
                <div>
                  <Label>Vehicle Type</Label>
                  <Select value={newVehicle.type} onValueChange={(v) => setNewVehicle({ ...newVehicle, type: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="Bike">Bike</SelectItem>
                      <SelectItem value="EV">Electric Vehicle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Color (Optional)</Label>
                  <Input
                    id="color"
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                    placeholder="e.g., White"
                  />
                </div>
                <Button onClick={handleAddVehicle} className="w-full">
                  Add Vehicle
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className={`bg-card hover:border-primary/50 transition-colors ${
                vehicle.isDefault ? "border-primary" : "border-border"
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Car className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-semibold text-foreground">
                            {vehicle.name}
                          </h3>
                          {vehicle.isDefault && (
                            <Badge className="bg-primary/10 text-primary">
                              <Star className="h-3 w-3 mr-1 fill-primary" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="font-mono text-lg text-muted-foreground">
                          {vehicle.number}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!vehicle.isDefault && (
                          <DropdownMenuItem onClick={() => handleSetDefault(vehicle.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Set as Default
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(vehicle.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="secondary">{vehicle.type}</Badge>
                    </div>
                    {vehicle.color && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Color:</span>
                        <span className="font-medium">{vehicle.color}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Add Vehicle Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * vehicles.length }}
          >
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Card className="bg-card border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer min-h-[160px] flex items-center justify-center">
                  <CardContent className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium text-foreground">Add New Vehicle</p>
                    <p className="text-sm text-muted-foreground">Register another vehicle</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserVehicles;

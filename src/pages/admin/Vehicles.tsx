import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Car, Search, MoreVertical, Eye, CheckCircle, XCircle, Plus, Edit, Trash2, Download, User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface Vehicle {
  id: number;
  plateNumber: string;
  make: string;
  model: string;
  color: string;
  type: "Car" | "Bike" | "SUV" | "EV";
  ownerName: string;
  ownerEmail: string;
  bookings: number;
  status: "Active" | "Pending" | "Blocked";
  addedAt: string;
}

const AdminVehicles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    plateNumber: "",
    make: "",
    model: "",
    color: "",
    type: "Car" as Vehicle["type"],
    ownerName: "",
    ownerEmail: "",
    status: "Active" as Vehicle["status"],
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, plateNumber: "KA 01 AB 1234", make: "Maruti", model: "Swift", color: "White", type: "Car", ownerName: "Rahul Sharma", ownerEmail: "rahul@email.com", bookings: 24, status: "Active", addedAt: "Dec 15, 2025" },
    { id: 2, plateNumber: "KA 05 CD 5678", make: "Hyundai", model: "Creta", color: "Black", type: "SUV", ownerName: "Priya Mehta", ownerEmail: "priya@email.com", bookings: 18, status: "Active", addedAt: "Dec 10, 2025" },
    { id: 3, plateNumber: "KA 03 EF 9012", make: "Tesla", model: "Model 3", color: "Red", type: "EV", ownerName: "Amit Kumar", ownerEmail: "amit@email.com", bookings: 32, status: "Active", addedAt: "Nov 28, 2025" },
    { id: 4, plateNumber: "KA 02 GH 3456", make: "Honda", model: "Activa", color: "Grey", type: "Bike", ownerName: "Neha Reddy", ownerEmail: "neha@email.com", bookings: 45, status: "Active", addedAt: "Nov 15, 2025" },
    { id: 5, plateNumber: "KA 04 IJ 7890", make: "Tata", model: "Nexon EV", color: "Blue", type: "EV", ownerName: "Vikram Patel", ownerEmail: "vikram@email.com", bookings: 12, status: "Pending", addedAt: "Dec 20, 2025" },
  ]);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || vehicle.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleView = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowViewDialog(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      plateNumber: vehicle.plateNumber,
      make: vehicle.make,
      model: vehicle.model,
      color: vehicle.color,
      type: vehicle.type,
      ownerName: vehicle.ownerName,
      ownerEmail: vehicle.ownerEmail,
      status: vehicle.status,
    });
    setShowEditDialog(true);
  };

  const handleDelete = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDeleteDialog(true);
  };

  const handleCreate = () => {
    const newVehicle: Vehicle = {
      id: vehicles.length + 1,
      ...formData,
      bookings: 0,
      addedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setVehicles([...vehicles, newVehicle]);
    setShowCreateDialog(false);
    setFormData({ plateNumber: "", make: "", model: "", color: "", type: "Car", ownerName: "", ownerEmail: "", status: "Active" });
    toast.success("Vehicle added successfully");
  };

  const handleUpdate = () => {
    if (!selectedVehicle) return;
    setVehicles(vehicles.map(v => 
      v.id === selectedVehicle.id 
        ? { ...v, ...formData }
        : v
    ));
    setShowEditDialog(false);
    toast.success("Vehicle updated successfully");
  };

  const confirmDelete = () => {
    if (!selectedVehicle) return;
    setVehicles(vehicles.filter(v => v.id !== selectedVehicle.id));
    setShowDeleteDialog(false);
    toast.success("Vehicle deleted successfully");
  };

  const handleApprove = (vehicle: Vehicle) => {
    setVehicles(vehicles.map(v => v.id === vehicle.id ? { ...v, status: "Active" } : v));
    toast.success(`${vehicle.plateNumber} approved`);
  };

  const handleBlock = (vehicle: Vehicle) => {
    setVehicles(vehicles.map(v => v.id === vehicle.id ? { ...v, status: "Blocked" } : v));
    toast.error(`${vehicle.plateNumber} blocked`);
  };

  const handleExport = () => toast.success("Export started");

  const stats = {
    total: vehicles.length,
    cars: vehicles.filter(v => v.type === "Car").length,
    evs: vehicles.filter(v => v.type === "EV").length,
    bikes: vehicles.filter(v => v.type === "Bike").length,
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Vehicle Management
            </h1>
            <p className="text-muted-foreground">
              Manage all registered vehicles on the platform
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2" onClick={() => {
              setFormData({ plateNumber: "", make: "", model: "", color: "", type: "Car", ownerName: "", ownerEmail: "", status: "Active" });
              setShowCreateDialog(true);
            }}>
              <Plus className="h-5 w-5" />
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Vehicles</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Cars</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.cars}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">EVs</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.evs}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Bikes</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.bikes}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by plate number, owner, or make..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Car">Car</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="EV">EV</SelectItem>
              <SelectItem value="Bike">Bike</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vehicles Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle, index) => (
                  <motion.tr
                    key={vehicle.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Car className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-mono font-medium text-foreground">{vehicle.plateNumber}</div>
                          <div className="text-sm text-muted-foreground">{vehicle.make} {vehicle.model} ({vehicle.color})</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{vehicle.ownerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{vehicle.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{vehicle.bookings}</TableCell>
                    <TableCell>
                      <Badge className={
                        vehicle.status === "Active" ? "bg-green-500/10 text-green-500" :
                        vehicle.status === "Blocked" ? "bg-destructive/10 text-destructive" :
                        "bg-yellow-500/10 text-yellow-500"
                      }>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{vehicle.addedAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(vehicle)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(vehicle)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Vehicle
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {vehicle.status === "Pending" && (
                            <DropdownMenuItem onClick={() => handleApprove(vehicle)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {vehicle.status === "Active" && (
                            <DropdownMenuItem className="text-destructive" onClick={() => handleBlock(vehicle)}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Block
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(vehicle)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Create Vehicle Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>Register a new vehicle on the platform</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plate Number</Label>
                  <Input
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                    placeholder="KA 01 AB 1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as Vehicle["type"] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Car">Car</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="EV">EV</SelectItem>
                      <SelectItem value="Bike">Bike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Make</Label>
                  <Input
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    placeholder="e.g., Maruti"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g., Swift"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="e.g., White"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Owner Name</Label>
                  <Input
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Owner Email</Label>
                <Input
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreate}>Add Vehicle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Vehicle Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Vehicle Details</DialogTitle>
            </DialogHeader>
            {selectedVehicle && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xl font-bold">{selectedVehicle.plateNumber}</h3>
                    <p className="text-muted-foreground">{selectedVehicle.make} {selectedVehicle.model}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-medium">{selectedVehicle.color}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Type</p>
                    <Badge variant="outline">{selectedVehicle.type}</Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{selectedVehicle.ownerName}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <p className="font-medium">{selectedVehicle.bookings}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={
                      selectedVehicle.status === "Active" ? "bg-green-500/10 text-green-500" :
                      selectedVehicle.status === "Blocked" ? "bg-destructive/10 text-destructive" :
                      "bg-yellow-500/10 text-yellow-500"
                    }>
                      {selectedVehicle.status}
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Added</p>
                    <p className="font-medium">{selectedVehicle.addedAt}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
              <Button onClick={() => { setShowViewDialog(false); if(selectedVehicle) handleEdit(selectedVehicle); }}>
                Edit Vehicle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Vehicle Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Vehicle</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plate Number</Label>
                  <Input
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as Vehicle["type"] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Car">Car</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="EV">EV</SelectItem>
                      <SelectItem value="Bike">Bike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Make</Label>
                  <Input
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Vehicle["status"] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedVehicle?.plateNumber}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminVehicles;

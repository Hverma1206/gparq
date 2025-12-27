import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Search, Filter, MoreVertical, Eye, 
  CheckCircle, XCircle, Star, Car, Plus, Edit, Trash2, Download, Building2, IndianRupee
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

interface Host {
  id: number;
  name: string;
  owner: string;
  email: string;
  phone: string;
  location: string;
  city: string;
  spots: number;
  earnings: string;
  rating: number;
  status: "Active" | "Pending" | "Suspended";
  propertyType: string;
}

const AdminHosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    email: "",
    phone: "",
    location: "",
    city: "",
    spots: 0,
    propertyType: "Commercial",
    status: "Pending" as Host["status"],
  });

  const [hosts, setHosts] = useState<Host[]>([
    { id: 1, name: "Forum Mall", owner: "Prestige Group", email: "forum@prestige.com", phone: "+91 98765 43220", location: "Koramangala", city: "Bangalore", spots: 50, earnings: "₹1.2L", rating: 4.8, status: "Active", propertyType: "Mall" },
    { id: 2, name: "Brigade Gateway", owner: "Brigade Group", email: "brigade@gateway.com", phone: "+91 98765 43221", location: "Rajajinagar", city: "Bangalore", spots: 30, earnings: "₹85K", rating: 4.6, status: "Active", propertyType: "Commercial" },
    { id: 3, name: "UB City", owner: "UB Holdings", email: "parking@ubcity.com", phone: "+91 98765 43222", location: "Vittal Mallya Road", city: "Bangalore", spots: 100, earnings: "₹2.1L", rating: 4.9, status: "Pending", propertyType: "Mall" },
    { id: 4, name: "Orion Mall", owner: "Brigade Group", email: "orion@brigade.com", phone: "+91 98765 43223", location: "Malleshwaram", city: "Bangalore", spots: 75, earnings: "₹1.5L", rating: 4.5, status: "Active", propertyType: "Mall" },
    { id: 5, name: "Phoenix Mall", owner: "Phoenix Mills", email: "phoenix@whitefield.com", phone: "+91 98765 43224", location: "Whitefield", city: "Bangalore", spots: 120, earnings: "₹2.8L", rating: 4.7, status: "Suspended", propertyType: "Mall" },
  ]);

  const filteredHosts = hosts.filter(host => {
    const matchesSearch = host.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      host.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      host.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || host.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (host: Host) => {
    setSelectedHost(host);
    setShowViewDialog(true);
  };

  const handleEdit = (host: Host) => {
    setSelectedHost(host);
    setFormData({
      name: host.name,
      owner: host.owner,
      email: host.email,
      phone: host.phone,
      location: host.location,
      city: host.city,
      spots: host.spots,
      propertyType: host.propertyType,
      status: host.status,
    });
    setShowEditDialog(true);
  };

  const handleDelete = (host: Host) => {
    setSelectedHost(host);
    setShowDeleteDialog(true);
  };

  const handleCreate = () => {
    const newHost: Host = {
      id: hosts.length + 1,
      name: formData.name,
      owner: formData.owner,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      city: formData.city,
      spots: formData.spots,
      propertyType: formData.propertyType,
      status: formData.status,
      earnings: "₹0",
      rating: 0,
    };
    setHosts([...hosts, newHost]);
    setShowCreateDialog(false);
    setFormData({ name: "", owner: "", email: "", phone: "", location: "", city: "", spots: 0, propertyType: "Commercial", status: "Pending" });
    toast.success("Host created successfully");
  };

  const handleUpdate = () => {
    if (!selectedHost) return;
    setHosts(hosts.map(h => 
      h.id === selectedHost.id 
        ? { ...h, ...formData }
        : h
    ));
    setShowEditDialog(false);
    toast.success("Host updated successfully");
  };

  const confirmDelete = () => {
    if (!selectedHost) return;
    setHosts(hosts.filter(h => h.id !== selectedHost.id));
    setShowDeleteDialog(false);
    toast.success("Host deleted successfully");
  };

  const handleApprove = (host: Host) => {
    setHosts(hosts.map(h => h.id === host.id ? { ...h, status: "Active" } : h));
    toast.success(`${host.name} approved`);
  };

  const handleSuspend = (host: Host) => {
    setHosts(hosts.map(h => h.id === host.id ? { ...h, status: "Suspended" } : h));
    toast.error(`${host.name} suspended`);
  };

  const handleReactivate = (host: Host) => {
    setHosts(hosts.map(h => h.id === host.id ? { ...h, status: "Active" } : h));
    toast.success(`${host.name} reactivated`);
  };

  const handleExport = () => toast.success("Export started");

  const stats = {
    total: hosts.length,
    active: hosts.filter(h => h.status === "Active").length,
    pending: hosts.filter(h => h.status === "Pending").length,
    suspended: hosts.filter(h => h.status === "Suspended").length,
    totalSpots: hosts.reduce((acc, h) => acc + h.spots, 0),
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Host Management
            </h1>
            <p className="text-muted-foreground">
              Create, view, edit and manage all parking space hosts
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2" onClick={() => {
              setFormData({ name: "", owner: "", email: "", phone: "", location: "", city: "", spots: 0, propertyType: "Commercial", status: "Pending" });
              setShowCreateDialog(true);
            }}>
              <Plus className="h-5 w-5" />
              Add Host
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Hosts</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.active}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Total Spots</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.totalSpots}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="text-sm text-muted-foreground">Suspended</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.suspended}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search hosts by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hosts Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parking Space</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Spots</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHosts.map((host, index) => (
                  <motion.tr
                    key={host.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{host.name}</div>
                          <div className="text-sm text-muted-foreground">{host.location}, {host.city}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">{host.owner}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{host.spots}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-500">{host.earnings}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{host.rating || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        host.status === "Active" ? "bg-green-500/10 text-green-500" :
                        host.status === "Suspended" ? "bg-destructive/10 text-destructive" :
                        "bg-yellow-500/10 text-yellow-500"
                      }>
                        {host.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(host)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(host)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Host
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {host.status === "Pending" && (
                            <DropdownMenuItem onClick={() => handleApprove(host)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {host.status === "Active" && (
                            <DropdownMenuItem className="text-destructive" onClick={() => handleSuspend(host)}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          )}
                          {host.status === "Suspended" && (
                            <DropdownMenuItem onClick={() => handleReactivate(host)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Reactivate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(host)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Host
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

        {/* Create Host Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Host</DialogTitle>
              <DialogDescription>Add a new parking space host to the platform</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Parking Space Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Forum Mall Parking"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Owner Name</Label>
                  <Input
                    id="owner"
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    placeholder="e.g., Prestige Group"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Koramangala"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g., Bangalore"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spots">Number of Spots</Label>
                  <Input
                    id="spots"
                    type="number"
                    value={formData.spots}
                    onChange={(e) => setFormData({ ...formData, spots: parseInt(e.target.value) || 0 })}
                    placeholder="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={(v) => setFormData({ ...formData, propertyType: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mall">Mall</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Host["status"] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreate}>Create Host</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Host Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Host Details</DialogTitle>
            </DialogHeader>
            {selectedHost && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{selectedHost.name}</h3>
                    <p className="text-muted-foreground">{selectedHost.owner}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedHost.location}, {selectedHost.city}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Property Type</p>
                    <p className="font-medium">{selectedHost.propertyType}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Parking Spots</p>
                    <p className="font-medium">{selectedHost.spots}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="font-medium text-green-500">{selectedHost.earnings}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{selectedHost.rating || "N/A"}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={
                      selectedHost.status === "Active" ? "bg-green-500/10 text-green-500" :
                      selectedHost.status === "Suspended" ? "bg-destructive/10 text-destructive" :
                      "bg-yellow-500/10 text-yellow-500"
                    }>
                      {selectedHost.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedHost.email}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedHost.phone}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
              <Button onClick={() => { setShowViewDialog(false); if(selectedHost) handleEdit(selectedHost); }}>
                Edit Host
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Host Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Host</DialogTitle>
              <DialogDescription>Update host information</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Parking Space Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Owner Name</Label>
                  <Input
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Number of Spots</Label>
                  <Input
                    type="number"
                    value={formData.spots}
                    onChange={(e) => setFormData({ ...formData, spots: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Host["status"] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
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
              <AlertDialogTitle>Delete Host</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedHost?.name}? This action cannot be undone.
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

export default AdminHosts;

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, Search, MoreVertical, Eye, CheckCircle, XCircle, Star, Plus, Edit, Trash2, Download, Phone, Mail
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
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
  services: string[];
  city: string;
  jobs: number;
  earnings: string;
  rating: number;
  status: "Active" | "Pending" | "Suspended";
  joined: string;
}

const AdminPartners = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [] as string[],
    city: "",
    status: "Pending" as Partner["status"],
  });

  const availableServices = ["Car Wash", "Valet Parking", "EV Charging", "Detailing"];

  const [partners, setPartners] = useState<Partner[]>([
    { id: 1, name: "Raju's Car Services", email: "raju@carservice.com", phone: "+91 98765 43230", services: ["Car Wash", "Valet Parking"], city: "Bangalore", jobs: 156, earnings: "₹45K", rating: 4.8, status: "Active", joined: "Oct 15, 2025" },
    { id: 2, name: "Quick Clean Auto", email: "quick@clean.com", phone: "+91 98765 43231", services: ["Car Wash", "Detailing"], city: "Mumbai", jobs: 98, earnings: "₹32K", rating: 4.5, status: "Active", joined: "Nov 10, 2025" },
    { id: 3, name: "EV Charge Plus", email: "ev@chargeplus.com", phone: "+91 98765 43232", services: ["EV Charging"], city: "Bangalore", jobs: 245, earnings: "₹78K", rating: 4.9, status: "Active", joined: "Sep 20, 2025" },
    { id: 4, name: "Valet Pro Services", email: "valet@pro.com", phone: "+91 98765 43233", services: ["Valet Parking"], city: "Delhi", jobs: 67, earnings: "₹22K", rating: 4.3, status: "Pending", joined: "Dec 5, 2025" },
    { id: 5, name: "Premium Wash Hub", email: "premium@wash.com", phone: "+91 98765 43234", services: ["Car Wash", "Detailing"], city: "Chennai", jobs: 45, earnings: "₹15K", rating: 4.0, status: "Suspended", joined: "Nov 25, 2025" },
  ]);

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowViewDialog(true);
  };

  const handleEdit = (partner: Partner) => {
    setSelectedPartner(partner);
    setFormData({
      name: partner.name,
      email: partner.email,
      phone: partner.phone,
      services: partner.services,
      city: partner.city,
      status: partner.status,
    });
    setShowEditDialog(true);
  };

  const handleDelete = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowDeleteDialog(true);
  };

  const handleCreate = () => {
    const newPartner: Partner = {
      id: partners.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      services: formData.services,
      city: formData.city,
      status: formData.status,
      jobs: 0,
      earnings: "₹0",
      rating: 0,
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setPartners([...partners, newPartner]);
    setShowCreateDialog(false);
    setFormData({ name: "", email: "", phone: "", services: [], city: "", status: "Pending" });
    toast.success("Partner created successfully");
  };

  const handleUpdate = () => {
    if (!selectedPartner) return;
    setPartners(partners.map(p => 
      p.id === selectedPartner.id 
        ? { ...p, ...formData }
        : p
    ));
    setShowEditDialog(false);
    toast.success("Partner updated successfully");
  };

  const confirmDelete = () => {
    if (!selectedPartner) return;
    setPartners(partners.filter(p => p.id !== selectedPartner.id));
    setShowDeleteDialog(false);
    toast.success("Partner deleted successfully");
  };

  const handleApprove = (partner: Partner) => {
    setPartners(partners.map(p => p.id === partner.id ? { ...p, status: "Active" } : p));
    toast.success(`${partner.name} approved`);
  };

  const handleSuspend = (partner: Partner) => {
    setPartners(partners.map(p => p.id === partner.id ? { ...p, status: "Suspended" } : p));
    toast.error(`${partner.name} suspended`);
  };

  const handleExport = () => toast.success("Export started");

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const stats = {
    total: partners.length,
    active: partners.filter(p => p.status === "Active").length,
    pending: partners.filter(p => p.status === "Pending").length,
    totalJobs: partners.reduce((acc, p) => acc + p.jobs, 0),
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Partner Management
            </h1>
            <p className="text-muted-foreground">
              Manage service partners (Car Wash, Valet, EV Charging)
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2" onClick={() => {
              setFormData({ name: "", email: "", phone: "", services: [], city: "", status: "Pending" });
              setShowCreateDialog(true);
            }}>
              <Plus className="h-5 w-5" />
              Add Partner
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Partners</span>
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
                <XCircle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Total Jobs</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.totalJobs}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search partners..."
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

        {/* Partners Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Jobs</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartners.map((partner, index) => (
                  <motion.tr
                    key={partner.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{partner.name}</div>
                          <div className="text-sm text-muted-foreground">{partner.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {partner.services.map(s => (
                          <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{partner.city}</TableCell>
                    <TableCell className="font-medium">{partner.jobs}</TableCell>
                    <TableCell className="font-medium text-green-500">{partner.earnings}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{partner.rating || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        partner.status === "Active" ? "bg-green-500/10 text-green-500" :
                        partner.status === "Suspended" ? "bg-destructive/10 text-destructive" :
                        "bg-yellow-500/10 text-yellow-500"
                      }>
                        {partner.status}
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
                          <DropdownMenuItem onClick={() => handleView(partner)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(partner)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Partner
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {partner.status === "Pending" && (
                            <DropdownMenuItem onClick={() => handleApprove(partner)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          {partner.status === "Active" && (
                            <DropdownMenuItem className="text-destructive" onClick={() => handleSuspend(partner)}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(partner)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Partner
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

        {/* Create Partner Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Partner</DialogTitle>
              <DialogDescription>Add a new service partner to the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Partner Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Quick Clean Auto"
                />
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
              <div className="space-y-2">
                <Label>Services</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableServices.map(service => (
                    <div key={service} className="flex items-center gap-2">
                      <Checkbox
                        id={service}
                        checked={formData.services.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                      />
                      <label htmlFor={service} className="text-sm">{service}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g., Bangalore"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreate}>Create Partner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Partner Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Partner Details</DialogTitle>
            </DialogHeader>
            {selectedPartner && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{selectedPartner.name}</h3>
                    <p className="text-muted-foreground">{selectedPartner.city}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.services.map(s => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedPartner.email}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedPartner.phone}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Total Jobs</p>
                    <p className="font-medium">{selectedPartner.jobs}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="font-medium text-green-500">{selectedPartner.earnings}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{selectedPartner.rating || "N/A"}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">{selectedPartner.joined}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
              <Button onClick={() => { setShowViewDialog(false); if(selectedPartner) handleEdit(selectedPartner); }}>
                Edit Partner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Partner Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Partner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Partner Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
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
              <div className="space-y-2">
                <Label>Services</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableServices.map(service => (
                    <div key={service} className="flex items-center gap-2">
                      <Checkbox
                        id={`edit-${service}`}
                        checked={formData.services.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                      />
                      <label htmlFor={`edit-${service}`} className="text-sm">{service}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Partner["status"] })}>
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
              <AlertDialogTitle>Delete Partner</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedPartner?.name}? This action cannot be undone.
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

export default AdminPartners;

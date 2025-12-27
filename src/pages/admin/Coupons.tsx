import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Ticket, Search, MoreVertical, Eye, CheckCircle, XCircle, Plus, Edit, Trash2, Download, Percent, Calendar
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

interface Coupon {
  id: number;
  code: string;
  type: "Percentage" | "Flat";
  value: number;
  minOrder: number;
  maxDiscount: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  status: "Active" | "Expired" | "Disabled";
  city: string;
}

const AdminCoupons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    type: "Percentage" as Coupon["type"],
    value: 10,
    minOrder: 100,
    maxDiscount: 50,
    usageLimit: 100,
    validFrom: "",
    validUntil: "",
    city: "All Cities",
    status: "Active" as Coupon["status"],
  });

  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: 1, code: "WELCOME50", type: "Percentage", value: 50, minOrder: 100, maxDiscount: 100, usageLimit: 1000, usedCount: 456, validFrom: "Dec 1, 2025", validUntil: "Dec 31, 2025", status: "Active", city: "All Cities" },
    { id: 2, code: "FLAT100", type: "Flat", value: 100, minOrder: 200, maxDiscount: 100, usageLimit: 500, usedCount: 234, validFrom: "Dec 15, 2025", validUntil: "Jan 15, 2026", status: "Active", city: "Bangalore" },
    { id: 3, code: "NEWYEAR25", type: "Percentage", value: 25, minOrder: 150, maxDiscount: 75, usageLimit: 2000, usedCount: 0, validFrom: "Jan 1, 2026", validUntil: "Jan 7, 2026", status: "Active", city: "All Cities" },
    { id: 4, code: "DIWALI30", type: "Percentage", value: 30, minOrder: 100, maxDiscount: 100, usageLimit: 1500, usedCount: 1500, validFrom: "Oct 20, 2025", validUntil: "Nov 5, 2025", status: "Expired", city: "All Cities" },
    { id: 5, code: "MUMBAI20", type: "Percentage", value: 20, minOrder: 100, maxDiscount: 50, usageLimit: 300, usedCount: 89, validFrom: "Dec 1, 2025", validUntil: "Dec 31, 2025", status: "Disabled", city: "Mumbai" },
  ]);

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || coupon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowViewDialog(true);
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minOrder: coupon.minOrder,
      maxDiscount: coupon.maxDiscount,
      usageLimit: coupon.usageLimit,
      validFrom: coupon.validFrom,
      validUntil: coupon.validUntil,
      city: coupon.city,
      status: coupon.status,
    });
    setShowEditDialog(true);
  };

  const handleDelete = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteDialog(true);
  };

  const handleCreate = () => {
    const newCoupon: Coupon = {
      id: coupons.length + 1,
      code: formData.code.toUpperCase(),
      type: formData.type,
      value: formData.value,
      minOrder: formData.minOrder,
      maxDiscount: formData.maxDiscount,
      usageLimit: formData.usageLimit,
      usedCount: 0,
      validFrom: formData.validFrom || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      validUntil: formData.validUntil,
      city: formData.city,
      status: formData.status,
    };
    setCoupons([...coupons, newCoupon]);
    setShowCreateDialog(false);
    setFormData({ code: "", type: "Percentage", value: 10, minOrder: 100, maxDiscount: 50, usageLimit: 100, validFrom: "", validUntil: "", city: "All Cities", status: "Active" });
    toast.success("Coupon created successfully");
  };

  const handleUpdate = () => {
    if (!selectedCoupon) return;
    setCoupons(coupons.map(c => 
      c.id === selectedCoupon.id 
        ? { ...c, ...formData, code: formData.code.toUpperCase() }
        : c
    ));
    setShowEditDialog(false);
    toast.success("Coupon updated successfully");
  };

  const confirmDelete = () => {
    if (!selectedCoupon) return;
    setCoupons(coupons.filter(c => c.id !== selectedCoupon.id));
    setShowDeleteDialog(false);
    toast.success("Coupon deleted successfully");
  };

  const handleToggleStatus = (coupon: Coupon) => {
    const newStatus = coupon.status === "Active" ? "Disabled" : "Active";
    setCoupons(coupons.map(c => c.id === coupon.id ? { ...c, status: newStatus } : c));
    toast.success(`Coupon ${newStatus.toLowerCase()}`);
  };

  const handleExport = () => toast.success("Export started");

  const stats = {
    total: coupons.length,
    active: coupons.filter(c => c.status === "Active").length,
    totalRedemptions: coupons.reduce((acc, c) => acc + c.usedCount, 0),
    totalSavings: coupons.reduce((acc, c) => acc + (c.usedCount * (c.type === "Flat" ? c.value : c.maxDiscount / 2)), 0),
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Coupons & Promotions
            </h1>
            <p className="text-muted-foreground">
              Create and manage discount coupons
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2" onClick={() => {
              setFormData({ code: "", type: "Percentage", value: 10, minOrder: 100, maxDiscount: 50, usageLimit: 100, validFrom: "", validUntil: "", city: "All Cities", status: "Active" });
              setShowCreateDialog(true);
            }}>
              <Plus className="h-5 w-5" />
              Create Coupon
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Coupons</span>
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
                <Percent className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Redemptions</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.totalRedemptions.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Total Savings</span>
              </div>
              <p className="font-display text-2xl font-bold">₹{(stats.totalSavings / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search coupons..."
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
              <SelectItem value="Expired">Expired</SelectItem>
              <SelectItem value="Disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Coupons Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon, index) => (
                  <motion.tr
                    key={coupon.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Ticket className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-mono font-bold text-foreground">{coupon.code}</div>
                          <div className="text-sm text-muted-foreground">Min ₹{coupon.minOrder}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {coupon.type === "Percentage" ? `${coupon.value}%` : `₹${coupon.value}`}
                      </span>
                      {coupon.type === "Percentage" && (
                        <span className="text-sm text-muted-foreground block">Max ₹{coupon.maxDiscount}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{coupon.usedCount}</span>
                        <span className="text-muted-foreground"> / {coupon.usageLimit}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{coupon.city}</TableCell>
                    <TableCell className="text-muted-foreground">{coupon.validUntil}</TableCell>
                    <TableCell>
                      <Badge className={
                        coupon.status === "Active" ? "bg-green-500/10 text-green-500" :
                        coupon.status === "Expired" ? "bg-gray-500/10 text-gray-500" :
                        "bg-yellow-500/10 text-yellow-500"
                      }>
                        {coupon.status}
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
                          <DropdownMenuItem onClick={() => handleView(coupon)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(coupon)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Coupon
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {coupon.status !== "Expired" && (
                            <DropdownMenuItem onClick={() => handleToggleStatus(coupon)}>
                              {coupon.status === "Active" ? (
                                <>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Disable
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Enable
                                </>
                              )}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(coupon)}>
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

        {/* Create Coupon Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
              <DialogDescription>Create a new discount coupon for users</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Coupon Code</Label>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., WELCOME50"
                    className="uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as Coupon["type"] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Flat">Flat Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discount Value {formData.type === "Percentage" ? "(%)" : "(₹)"}</Label>
                  <Input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Discount (₹)</Label>
                  <Input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: parseInt(e.target.value) || 0 })}
                    disabled={formData.type === "Flat"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Min Order (₹)</Label>
                  <Input
                    type="number"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Usage Limit</Label>
                  <Input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valid From</Label>
                  <Input
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valid Until</Label>
                  <Input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Applicable City</Label>
                <Select value={formData.city} onValueChange={(v) => setFormData({ ...formData, city: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Cities">All Cities</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreate}>Create Coupon</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Coupon Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Coupon Details</DialogTitle>
            </DialogHeader>
            {selectedCoupon && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Ticket className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-mono text-2xl font-bold">{selectedCoupon.code}</h3>
                    <Badge className={
                      selectedCoupon.status === "Active" ? "bg-green-500/10 text-green-500" :
                      selectedCoupon.status === "Expired" ? "bg-gray-500/10 text-gray-500" :
                      "bg-yellow-500/10 text-yellow-500"
                    }>
                      {selectedCoupon.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Discount</p>
                    <p className="font-medium">
                      {selectedCoupon.type === "Percentage" ? `${selectedCoupon.value}%` : `₹${selectedCoupon.value}`}
                      {selectedCoupon.type === "Percentage" && ` (Max ₹${selectedCoupon.maxDiscount})`}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Min Order</p>
                    <p className="font-medium">₹{selectedCoupon.minOrder}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Usage</p>
                    <p className="font-medium">{selectedCoupon.usedCount} / {selectedCoupon.usageLimit}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">City</p>
                    <p className="font-medium">{selectedCoupon.city}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Valid From</p>
                    <p className="font-medium">{selectedCoupon.validFrom}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Valid Until</p>
                    <p className="font-medium">{selectedCoupon.validUntil}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
              <Button onClick={() => { setShowViewDialog(false); if(selectedCoupon) handleEdit(selectedCoupon); }}>
                Edit Coupon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Coupon Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Coupon</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Coupon Code</Label>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Coupon["status"] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discount Value</Label>
                  <Input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Usage Limit</Label>
                  <Input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 0 })}
                  />
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
              <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedCoupon?.code}? This action cannot be undone.
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

export default AdminCoupons;

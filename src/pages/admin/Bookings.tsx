import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Calendar, Search, Filter, Eye, MoreVertical, Plus,
  Car, MapPin, Clock, IndianRupee, CheckCircle, XCircle, AlertCircle,
  Edit, Trash2, RefreshCw, Download
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

interface Booking {
  id: string;
  user: string;
  userPhone: string;
  userEmail: string;
  host: string;
  hostId: string;
  vehicle: string;
  date: string;
  startTime: string;
  endTime: string;
  amount: number;
  status: "active" | "upcoming" | "completed" | "cancelled";
  paymentStatus: "paid" | "pending" | "refunded";
  notes?: string;
}

const AdminBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  const [formData, setFormData] = useState({
    user: "",
    userPhone: "",
    userEmail: "",
    host: "",
    vehicle: "",
    date: "",
    startTime: "",
    endTime: "",
    amount: "",
    status: "upcoming" as "active" | "upcoming" | "completed" | "cancelled",
    notes: "",
  });

  const stats = {
    total: 1256,
    active: 42,
    completed: 1180,
    cancelled: 34,
  };

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BKG-2024-001",
      user: "Rahul S.",
      userPhone: "+91 98765 43210",
      userEmail: "rahul@email.com",
      host: "Forum Mall Parking",
      hostId: "HST-001",
      vehicle: "KA 01 AB 1234",
      date: "Dec 27, 2025",
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      amount: 160,
      status: "active",
      paymentStatus: "paid",
    },
    {
      id: "BKG-2024-002",
      user: "Priya M.",
      userPhone: "+91 98765 43211",
      userEmail: "priya@email.com",
      host: "Brigade Gateway",
      hostId: "HST-002",
      vehicle: "KA 05 CD 5678",
      date: "Dec 27, 2025",
      startTime: "2:00 PM",
      endTime: "6:00 PM",
      amount: 200,
      status: "upcoming",
      paymentStatus: "paid",
    },
    {
      id: "BKG-2024-003",
      user: "Amit K.",
      userPhone: "+91 98765 43212",
      userEmail: "amit@email.com",
      host: "Forum Mall Parking",
      hostId: "HST-001",
      vehicle: "KA 03 EF 9012",
      date: "Dec 26, 2025",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      amount: 80,
      status: "completed",
      paymentStatus: "paid",
    },
    {
      id: "BKG-2024-004",
      user: "Neha R.",
      userPhone: "+91 98765 43213",
      userEmail: "neha@email.com",
      host: "UB City Parking",
      hostId: "HST-003",
      vehicle: "KA 02 GH 3456",
      date: "Dec 25, 2025",
      startTime: "3:00 PM",
      endTime: "7:00 PM",
      amount: 240,
      status: "cancelled",
      paymentStatus: "refunded",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="outline" className="text-green-500 border-green-500">Paid</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Pending</Badge>;
      case "refunded":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCreate = () => {
    const newBooking: Booking = {
      id: `BKG-2024-${String(bookings.length + 1).padStart(3, "0")}`,
      user: formData.user,
      userPhone: formData.userPhone,
      userEmail: formData.userEmail,
      host: formData.host,
      hostId: "HST-NEW",
      vehicle: formData.vehicle,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      amount: parseFloat(formData.amount) || 0,
      status: formData.status,
      paymentStatus: "pending",
      notes: formData.notes,
    };
    setBookings([newBooking, ...bookings]);
    setShowCreateDialog(false);
    resetForm();
    toast.success("Booking created successfully");
  };

  const handleEdit = () => {
    if (!selectedBooking) return;
    setBookings(bookings.map(b => 
      b.id === selectedBooking.id 
        ? { 
            ...b, 
            user: formData.user,
            userPhone: formData.userPhone,
            userEmail: formData.userEmail,
            host: formData.host,
            vehicle: formData.vehicle,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            amount: parseFloat(formData.amount) || 0,
            notes: formData.notes,
          } 
        : b
    ));
    setShowEditDialog(false);
    setSelectedBooking(null);
    resetForm();
    toast.success("Booking updated successfully");
  };

  const handleDelete = (bookingId: string) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
    toast.success("Booking deleted");
  };

  const handleCancel = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: "cancelled" as const, paymentStatus: "refunded" as const } : b
    ));
    toast.success("Booking cancelled and refund initiated");
  };

  const handleExtend = (bookingId: string) => {
    toast.info("Extend booking functionality - would open time picker");
  };

  const handleExport = () => {
    toast.success("Bookings exported to CSV");
  };

  const openEditDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setFormData({
      user: booking.user,
      userPhone: booking.userPhone,
      userEmail: booking.userEmail,
      host: booking.host,
      vehicle: booking.vehicle,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      amount: String(booking.amount),
      status: booking.status,
      notes: booking.notes || "",
    });
    setShowEditDialog(true);
  };

  const openViewDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowViewDialog(true);
  };

  const resetForm = () => {
    setFormData({
      user: "",
      userPhone: "",
      userEmail: "",
      host: "",
      vehicle: "",
      date: "",
      startTime: "",
      endTime: "",
      amount: "",
      status: "upcoming",
      notes: "",
    });
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Booking Management
            </h1>
            <p className="text-muted-foreground">
              Create, view, edit, and manage all platform bookings
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Booking
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.total.toLocaleString()}</p>
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
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Completed</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.completed.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-muted-foreground">Cancelled</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.cancelled}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by booking ID, user, or vehicle..."
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Booking ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Host/Location</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Vehicle</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Payment</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      className="border-b border-border/50 hover:bg-secondary/20"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm">{booking.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{booking.user}</p>
                          <p className="text-xs text-muted-foreground">{booking.userPhone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.host}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono text-sm">{booking.vehicle}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm">{booking.date}</p>
                          <p className="text-xs text-muted-foreground">{booking.startTime} - {booking.endTime}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-medium">₹{booking.amount}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getPaymentBadge(booking.paymentStatus)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openViewDialog(booking)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(booking)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Booking
                            </DropdownMenuItem>
                            {(booking.status === "active" || booking.status === "upcoming") && (
                              <>
                                <DropdownMenuItem onClick={() => handleExtend(booking.id)}>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Extend Time
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleCancel(booking.id)}
                                  className="text-destructive"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel Booking
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(booking.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Create Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Manual Booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>User Name</Label>
                  <Input 
                    value={formData.user} 
                    onChange={(e) => setFormData({...formData, user: e.target.value})}
                    placeholder="Enter user name"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input 
                    value={formData.userPhone} 
                    onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  value={formData.userEmail} 
                  onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                  placeholder="user@email.com"
                />
              </div>
              <div>
                <Label>Parking Location</Label>
                <Select value={formData.host} onValueChange={(v) => setFormData({...formData, host: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parking location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Forum Mall Parking">Forum Mall Parking</SelectItem>
                    <SelectItem value="Brigade Gateway">Brigade Gateway</SelectItem>
                    <SelectItem value="UB City Parking">UB City Parking</SelectItem>
                    <SelectItem value="Phoenix Marketcity">Phoenix Marketcity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Vehicle Number</Label>
                <Input 
                  value={formData.vehicle} 
                  onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                  placeholder="KA 01 AB 1234"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input 
                    type="date"
                    value={formData.date} 
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Start Time</Label>
                  <Input 
                    type="time"
                    value={formData.startTime} 
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input 
                    type="time"
                    value={formData.endTime} 
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>Amount (₹)</Label>
                <Input 
                  type="number"
                  value={formData.amount} 
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="100"
                />
              </div>
              <div>
                <Label>Notes (Optional)</Label>
                <Textarea 
                  value={formData.notes} 
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any special instructions..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreate}>Create Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Booking - {selectedBooking?.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>User Name</Label>
                  <Input 
                    value={formData.user} 
                    onChange={(e) => setFormData({...formData, user: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input 
                    value={formData.userPhone} 
                    onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  value={formData.userEmail} 
                  onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                />
              </div>
              <div>
                <Label>Parking Location</Label>
                <Select value={formData.host} onValueChange={(v) => setFormData({...formData, host: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Forum Mall Parking">Forum Mall Parking</SelectItem>
                    <SelectItem value="Brigade Gateway">Brigade Gateway</SelectItem>
                    <SelectItem value="UB City Parking">UB City Parking</SelectItem>
                    <SelectItem value="Phoenix Marketcity">Phoenix Marketcity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Vehicle Number</Label>
                <Input 
                  value={formData.vehicle} 
                  onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input 
                    type="date"
                    value={formData.date} 
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Start Time</Label>
                  <Input 
                    type="time"
                    value={formData.startTime} 
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input 
                    type="time"
                    value={formData.endTime} 
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>Amount (₹)</Label>
                <Input 
                  type="number"
                  value={formData.amount} 
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
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
              <DialogTitle>Booking Details - {selectedBooking?.id}</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedBooking.status)}
                  {getPaymentBadge(selectedBooking.paymentStatus)}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">User</p>
                    <p className="font-medium">{selectedBooking.user}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.userPhone}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.userEmail}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Parking Location</p>
                    <p className="font-medium">{selectedBooking.host}</p>
                    <p className="text-sm text-muted-foreground">ID: {selectedBooking.hostId}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Vehicle</p>
                    <p className="font-medium font-mono">{selectedBooking.vehicle}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="font-medium text-lg">₹{selectedBooking.amount}</p>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-muted-foreground">Schedule</p>
                  <p className="font-medium">{selectedBooking.date}</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.startTime} - {selectedBooking.endTime}</p>
                </div>

                {selectedBooking.notes && (
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Notes</p>
                    <p className="text-sm">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
              <Button onClick={() => { setShowViewDialog(false); openEditDialog(selectedBooking!); }}>
                Edit Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminBookings;
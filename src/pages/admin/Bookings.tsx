import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, Search, Filter, Eye, MoreVertical, 
  Car, MapPin, Clock, IndianRupee, CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const AdminBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = {
    total: 1256,
    active: 42,
    completed: 1180,
    cancelled: 34,
  };

  const bookings = [
    {
      id: "BKG-2024-001",
      user: "Rahul S.",
      userPhone: "+91 98765 43210",
      host: "Forum Mall Parking",
      vehicle: "KA 01 AB 1234",
      date: "Dec 27, 2025",
      time: "10:00 AM - 2:00 PM",
      amount: 160,
      status: "active",
    },
    {
      id: "BKG-2024-002",
      user: "Priya M.",
      userPhone: "+91 98765 43211",
      host: "Brigade Gateway",
      vehicle: "KA 05 CD 5678",
      date: "Dec 27, 2025",
      time: "2:00 PM - 6:00 PM",
      amount: 200,
      status: "upcoming",
    },
    {
      id: "BKG-2024-003",
      user: "Amit K.",
      userPhone: "+91 98765 43212",
      host: "Forum Mall Parking",
      vehicle: "KA 03 EF 9012",
      date: "Dec 26, 2025",
      time: "10:00 AM - 12:00 PM",
      amount: 80,
      status: "completed",
    },
    {
      id: "BKG-2024-004",
      user: "Neha R.",
      userPhone: "+91 98765 43213",
      host: "UB City Parking",
      vehicle: "KA 02 GH 3456",
      date: "Dec 25, 2025",
      time: "3:00 PM - 7:00 PM",
      amount: 240,
      status: "cancelled",
    },
    {
      id: "BKG-2024-005",
      user: "Vikram P.",
      userPhone: "+91 98765 43214",
      host: "Phoenix Marketcity",
      vehicle: "KA 04 IJ 7890",
      date: "Dec 25, 2025",
      time: "11:00 AM - 3:00 PM",
      amount: 180,
      status: "completed",
    },
  ];

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

  const handleViewDetails = (bookingId: string) => {
    console.log(`Viewing booking: ${bookingId}`);
    toast.info("Opening booking details...");
  };

  const handleCancelBooking = (bookingId: string) => {
    console.log(`Cancelling booking: ${bookingId}`);
    toast.success("Booking cancelled");
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Booking Management
          </h1>
          <p className="text-muted-foreground">
            View and manage all platform bookings
          </p>
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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
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
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
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
                          <p className="text-xs text-muted-foreground">{booking.time}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-medium">₹{booking.amount}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(booking.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {booking.status !== "cancelled" && booking.status !== "completed" && (
                              <DropdownMenuItem 
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-destructive"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Booking
                              </DropdownMenuItem>
                            )}
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
      </div>
    </DashboardLayout>
  );
};

export default AdminBookings;

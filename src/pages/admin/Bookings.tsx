import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, Search, Eye, MoreVertical,
  Car, MapPin, Clock, IndianRupee, CheckCircle, XCircle,
  Download, Loader2
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

const AdminBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`*, parking_spots (id, name, address, city)`)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data || [];
    },
  });

  const now = new Date();
  const stats = {
    total: bookings?.length || 0,
    active: bookings?.filter(b => b.status === "confirmed" && new Date(b.start_time) <= now && new Date(b.end_time) >= now).length || 0,
    completed: bookings?.filter(b => b.status === "completed").length || 0,
    cancelled: bookings?.filter(b => b.status === "cancelled").length || 0,
  };

  const filteredBookings = (bookings || []).filter(b => {
    const matchesSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.vehicle_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.parking_spots?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed": return <Badge className="bg-blue-500/10 text-blue-500">Confirmed</Badge>;
      case "completed": return <Badge className="bg-green-500/10 text-green-500">Completed</Badge>;
      case "cancelled": return <Badge className="bg-destructive/10 text-destructive">Cancelled</Badge>;
      default: return <Badge className="bg-yellow-500/10 text-yellow-500">{status}</Badge>;
    }
  };

  const handleCancel = async (id: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id);
    if (error) toast.error("Failed to cancel");
    else {
      toast.success("Booking cancelled");
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout type="admin">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">Booking Management</h1>
            <p className="text-muted-foreground">View and manage all platform bookings</p>
          </div>
          <Button variant="outline" onClick={() => toast.success("Export started")}>
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, icon: Calendar, color: "text-primary" },
            { label: "Active", value: stats.active, icon: CheckCircle, color: "text-green-500" },
            { label: "Completed", value: stats.completed, icon: Clock, color: "text-blue-500" },
            { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "text-red-500" },
          ].map((s, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </div>
                <p className="font-display text-2xl font-bold">{s.value.toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by ID, vehicle, or location..." className="pl-10" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No bookings found</p>
            </div>
          ) : (
            filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.03 * index }}
              >
                <Card className="bg-card border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Car className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm">{booking.id.slice(0, 8).toUpperCase()}</span>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {booking.parking_spots?.name || "Unknown"} • {booking.vehicle_number}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(booking.start_time), "MMM d, yyyy h:mm a")} → {format(new Date(booking.end_time), "h:mm a")}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-display text-lg font-bold">₹{Number(booking.total_amount).toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{booking.payment_status}</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => { setSelectedBooking(booking); setShowViewDialog(true); }}>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            {booking.status === "confirmed" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => handleCancel(booking.id)}>
                                  <XCircle className="h-4 w-4 mr-2" /> Cancel
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent>
            <DialogHeader><DialogTitle>Booking Details</DialogTitle></DialogHeader>
            {selectedBooking && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Booking ID", value: selectedBooking.id.slice(0, 8).toUpperCase() },
                    { label: "Status", value: selectedBooking.status },
                    { label: "Location", value: selectedBooking.parking_spots?.name },
                    { label: "Vehicle", value: selectedBooking.vehicle_number },
                    { label: "Start", value: format(new Date(selectedBooking.start_time), "MMM d, yyyy h:mm a") },
                    { label: "End", value: format(new Date(selectedBooking.end_time), "MMM d, yyyy h:mm a") },
                    { label: "Amount", value: `₹${Number(selectedBooking.total_amount).toLocaleString()}` },
                    { label: "Payment", value: selectedBooking.payment_status },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminBookings;

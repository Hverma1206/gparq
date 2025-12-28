import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Car, MapPin, Calendar, Clock, 
  QrCode, Navigation, Phone, MoreVertical, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useBookings } from "@/hooks/useBookings";
import { format } from "date-fns";
import { toast } from "sonner";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { bookings, isLoading, cancelBooking } = useBookings();

  const now = new Date();

  const categorizedBookings = {
    upcoming: bookings?.filter(b => b.status === "confirmed" && new Date(b.start_time) > now) || [],
    active: bookings?.filter(b => b.status === "confirmed" && new Date(b.start_time) <= now && new Date(b.end_time) >= now) || [],
    completed: bookings?.filter(b => b.status === "completed") || [],
    cancelled: bookings?.filter(b => b.status === "cancelled") || [],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500/10 text-blue-500";
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string, startTime: string, endTime: string) => {
    if (status === "confirmed") {
      if (new Date(startTime) > now) return "Confirmed";
      if (new Date(endTime) >= now) return "In Progress";
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const calculateDuration = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours === 0) return `${minutes} mins`;
    if (minutes === 0) return `${hours} hours`;
    return `${hours}h ${minutes}m`;
  };

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking({ id, reason: "User cancelled" });
    }
  };

  const BookingCard = ({ booking, type }: { booking: any; type: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Car className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {booking.parking_spots?.name || "Parking Spot"}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {booking.parking_spots?.address || booking.parking_spots?.city || "Address"}
            </p>
          </div>
        </div>
        <div>
          <Badge className={getStatusColor(booking.status)}>
            {getStatusLabel(booking.status, booking.start_time, booking.end_time)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Date</div>
          <div className="font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4 text-primary" />
            {format(new Date(booking.start_time), "MMM d, yyyy")}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Time</div>
          <div className="font-medium flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            {format(new Date(booking.start_time), "h:mm a")} - {format(new Date(booking.end_time), "h:mm a")}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Duration</div>
          <div className="font-medium">{calculateDuration(booking.start_time, booking.end_time)}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Amount</div>
          <div className="font-medium text-primary">₹{Number(booking.total_amount).toLocaleString()}</div>
        </div>
      </div>

      {type === "active" && (
        <div className="bg-primary/10 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Ends at</span>
            <span className="font-display text-2xl font-bold text-primary">
              {format(new Date(booking.end_time), "h:mm a")}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Booking ID: <span className="font-mono">{booking.id.slice(0, 8).toUpperCase()}</span>
        </div>
        <div className="flex gap-2">
          {type === "upcoming" && (
            <>
              <Button variant="outline" size="sm" className="gap-1">
                <QrCode className="h-4 w-4" />
                Entry QR
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Navigation className="h-4 w-4" />
                Directions
              </Button>
              <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleCancel(booking.id)}>
                Cancel
              </Button>
            </>
          )}
          {type === "active" && (
            <>
              <Button variant="outline" size="sm" onClick={() => toast.success("Parking extended by 1 hour")}>
                Extend
              </Button>
              <Button size="sm" className="gap-1">
                <Phone className="h-4 w-4" />
                Support
              </Button>
            </>
          )}
          {type === "completed" && (
            <Button variant="outline" size="sm">
              Book Again
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <DashboardLayout type="user">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            My Bookings
          </h1>
          <p className="text-muted-foreground">
            View and manage all your parking bookings
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="upcoming" className="gap-2">
              Upcoming
              <span className="ml-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {categorizedBookings.upcoming.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              Active
              <span className="ml-1 bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded-full">
                {categorizedBookings.active.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          {(["upcoming", "active", "completed", "cancelled"] as const).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {categorizedBookings[tab].length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No {tab} bookings</p>
                </div>
              ) : (
                categorizedBookings[tab].map((booking) => (
                  <BookingCard key={booking.id} booking={booking} type={tab} />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;

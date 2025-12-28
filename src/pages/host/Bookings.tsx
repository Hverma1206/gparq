import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Car, Calendar, Check, X, Clock, 
  Phone, MapPin, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { useBookings } from "@/hooks/useBookings";
import { format } from "date-fns";

const HostBookings = () => {
  const { bookings, isLoading, updateBooking } = useBookings();

  const now = new Date();

  const categorizedBookings = {
    requests: bookings?.filter(b => b.status === "pending") || [],
    active: bookings?.filter(b => b.status === "confirmed" && new Date(b.start_time) <= now && new Date(b.end_time) >= now) || [],
    upcoming: bookings?.filter(b => b.status === "confirmed" && new Date(b.start_time) > now) || [],
    completed: bookings?.filter(b => b.status === "completed") || [],
  };

  const handleApprove = (id: string) => {
    updateBooking({ id, updates: { status: "confirmed" } });
    toast.success("Booking approved");
  };
  
  const handleReject = (id: string) => {
    updateBooking({ id, updates: { status: "cancelled", cancellation_reason: "Rejected by host" } });
    toast.error("Booking rejected");
  };
  
  const handleContact = () => toast.info("Contacting user...");

  const BookingCard = ({ booking, type }: { booking: any; type: string }) => (
    <div className="bg-secondary/50 rounded-xl p-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-display font-bold text-primary">
              {booking.vehicle_number?.[0] || "P"}
            </span>
          </div>
          <div>
            <div className="font-medium text-foreground">{booking.vehicle_number}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Car className="h-3 w-3" />
              {booking.vehicle_type || "Car"}
            </div>
          </div>
        </div>
        {type === "requests" && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => handleReject(booking.id)}>
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => handleApprove(booking.id)}>
              <Check className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{booking.parking_spots?.name || "Parking"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(new Date(booking.start_time), "MMM d, yyyy")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{format(new Date(booking.start_time), "h:mm a")} - {format(new Date(booking.end_time), "h:mm a")}</span>
        </div>
        <div className="font-medium text-primary">₹{Number(booking.total_amount).toLocaleString()}</div>
      </div>

      {type === "active" && (
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-sm">
            <span className="text-muted-foreground">Entry: </span>
            <span className="font-medium text-green-500">
              {booking.check_in_time ? format(new Date(booking.check_in_time), "h:mm a") : "Pending"}
            </span>
          </div>
          <Button size="sm" variant="outline" className="gap-1" onClick={handleContact}>
            <Phone className="h-3 w-3" />
            Contact
          </Button>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <DashboardLayout type="host">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Booking Management
          </h1>
          <p className="text-muted-foreground">
            Manage booking requests and track active parkings
          </p>
        </div>

        <Tabs defaultValue="requests">
          <TabsList className="mb-6">
            <TabsTrigger value="requests" className="gap-2">
              Requests
              <span className="ml-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {categorizedBookings.requests.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              Active
              <span className="ml-1 bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded-full">
                {categorizedBookings.active.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {(["requests", "active", "upcoming", "completed"] as const).map((tab) => (
            <TabsContent key={tab} value={tab}>
              {categorizedBookings[tab].length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No {tab} bookings</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {categorizedBookings[tab].map((booking) => (
                    <BookingCard key={booking.id} booking={booking} type={tab} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HostBookings;

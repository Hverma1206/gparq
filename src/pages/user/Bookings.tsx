import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Car, MapPin, Calendar, Clock, 
  QrCode, Navigation, Phone, MoreVertical
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const bookings = {
    upcoming: [
      {
        id: 1,
        location: "Phoenix Mall Parking",
        address: "Whitefield, Bangalore",
        date: "Dec 26, 2025",
        time: "10:00 AM - 2:00 PM",
        duration: "4 hours",
        amount: "₹160",
        status: "Confirmed",
        bookingId: "PQ123456",
      },
      {
        id: 2,
        location: "UB City Parking",
        address: "Vittal Mallya Road, Bangalore",
        date: "Dec 28, 2025",
        time: "6:00 PM - 10:00 PM",
        duration: "4 hours",
        amount: "₹200",
        status: "Confirmed",
        bookingId: "PQ123457",
      },
    ],
    active: [
      {
        id: 3,
        location: "Brigade Gateway",
        address: "Rajajinagar, Bangalore",
        date: "Dec 25, 2025",
        time: "1:00 PM - 4:00 PM",
        duration: "3 hours",
        amount: "₹120",
        status: "In Progress",
        bookingId: "PQ123458",
        remainingTime: "02:45:30",
      },
    ],
    completed: [
      {
        id: 4,
        location: "Forum Mall Parking",
        address: "Koramangala, Bangalore",
        date: "Dec 24, 2025",
        time: "2:00 PM - 5:00 PM",
        duration: "3 hours",
        amount: "₹120",
        status: "Completed",
        bookingId: "PQ123455",
      },
      {
        id: 5,
        location: "Indiranagar Metro Station",
        address: "Indiranagar, Bangalore",
        date: "Dec 22, 2025",
        time: "9:00 AM - 6:00 PM",
        duration: "9 hours",
        amount: "₹350",
        status: "Completed",
        bookingId: "PQ123454",
      },
    ],
    cancelled: [
      {
        id: 6,
        location: "MG Road Parking",
        address: "MG Road, Bangalore",
        date: "Dec 20, 2025",
        time: "11:00 AM - 3:00 PM",
        duration: "4 hours",
        amount: "₹180",
        status: "Cancelled",
        bookingId: "PQ123453",
        refundStatus: "Refunded",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-500/10 text-blue-500";
      case "In Progress":
        return "bg-green-500/10 text-green-500";
      case "Completed":
        return "bg-primary/10 text-primary";
      case "Cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
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
              {booking.location}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {booking.address}
            </p>
          </div>
        </div>
        <div>
          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Date</div>
          <div className="font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4 text-primary" />
            {booking.date}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Time</div>
          <div className="font-medium flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            {booking.time}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Duration</div>
          <div className="font-medium">{booking.duration}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Amount</div>
          <div className="font-medium text-primary">{booking.amount}</div>
        </div>
      </div>

      {type === "active" && booking.remainingTime && (
        <div className="bg-primary/10 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Time Remaining</span>
            <span className="font-display text-2xl font-bold text-primary">
              {booking.remainingTime}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Booking ID: <span className="font-mono">{booking.bookingId}</span>
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
            </>
          )}
          {type === "active" && (
            <>
              <Button variant="outline" size="sm">
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
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

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

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="upcoming" className="gap-2">
              Upcoming
              <span className="ml-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{bookings.upcoming.length}</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              Active
              <span className="ml-1 bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded-full">{bookings.active.length}</span>
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {bookings.upcoming.map((booking) => (
              <BookingCard key={booking.id} booking={booking} type="upcoming" />
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {bookings.active.map((booking) => (
              <BookingCard key={booking.id} booking={booking} type="active" />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {bookings.completed.map((booking) => (
              <BookingCard key={booking.id} booking={booking} type="completed" />
            ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {bookings.cancelled.map((booking) => (
              <BookingCard key={booking.id} booking={booking} type="cancelled" />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Car, Calendar, Check, X, Clock, 
  Phone, MapPin, MoreVertical
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HostBookings = () => {
  const bookings = {
    requests: [
      { id: 1, user: "Rahul S.", vehicle: "KA 01 AB 1234", vehicleType: "Sedan", spot: "Forum Mall", date: "Dec 26, 2025", time: "10:00 AM - 2:00 PM", amount: "₹160" },
      { id: 2, user: "Priya M.", vehicle: "KA 05 CD 5678", vehicleType: "SUV", spot: "Forum Mall", date: "Dec 26, 2025", time: "2:00 PM - 6:00 PM", amount: "₹200" },
    ],
    active: [
      { id: 3, user: "Amit K.", vehicle: "KA 03 EF 9012", vehicleType: "Sedan", spot: "Brigade Gateway", date: "Dec 25, 2025", time: "1:00 PM - 4:00 PM", amount: "₹150", entryTime: "1:05 PM", slot: "A-15" },
    ],
    upcoming: [
      { id: 4, user: "Neha R.", vehicle: "KA 02 GH 3456", vehicleType: "Hatchback", spot: "Forum Mall", date: "Dec 27, 2025", time: "9:00 AM - 1:00 PM", amount: "₹160" },
    ],
    completed: [
      { id: 5, user: "Vikram P.", vehicle: "KA 04 IJ 7890", vehicleType: "Sedan", spot: "Forum Mall", date: "Dec 24, 2025", time: "10:00 AM - 2:00 PM", amount: "₹160" },
      { id: 6, user: "Sneha G.", vehicle: "KA 06 KL 2345", vehicleType: "SUV", spot: "Brigade Gateway", date: "Dec 24, 2025", time: "3:00 PM - 7:00 PM", amount: "₹200" },
    ],
  };

  const BookingCard = ({ booking, type }: { booking: any; type: string }) => (
    <div className="bg-secondary/50 rounded-xl p-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-display font-bold text-primary">{booking.user[0]}</span>
          </div>
          <div>
            <div className="font-medium text-foreground">{booking.user}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Car className="h-3 w-3" />
              {booking.vehicle} • {booking.vehicleType}
            </div>
          </div>
        </div>
        {type === "requests" && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Check className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{booking.spot}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{booking.time}</span>
        </div>
        <div className="font-medium text-primary">{booking.amount}</div>
      </div>

      {type === "active" && (
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-sm">
            <span className="text-muted-foreground">Slot: </span>
            <span className="font-mono font-medium">{booking.slot}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Entry: </span>
            <span className="font-medium text-green-500">{booking.entryTime}</span>
          </div>
          <Button size="sm" variant="outline" className="gap-1">
            <Phone className="h-3 w-3" />
            Contact
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Booking Management
            </h1>
            <p className="text-muted-foreground">
              Manage booking requests and track active parkings
            </p>
          </motion.div>

          <Tabs defaultValue="requests">
            <TabsList className="mb-6">
              <TabsTrigger value="requests" className="gap-2">
                Requests
                <Badge variant="secondary">{bookings.requests.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="active" className="gap-2">
                Active
                <Badge variant="secondary">{bookings.active.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
              <div className="grid md:grid-cols-2 gap-4">
                {bookings.requests.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} type="requests" />
                ))}
              </div>
              {bookings.requests.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No pending booking requests
                </div>
              )}
            </TabsContent>

            <TabsContent value="active">
              <div className="grid md:grid-cols-2 gap-4">
                {bookings.active.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} type="active" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming">
              <div className="grid md:grid-cols-2 gap-4">
                {bookings.upcoming.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} type="upcoming" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid md:grid-cols-2 gap-4">
                {bookings.completed.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} type="completed" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HostBookings;

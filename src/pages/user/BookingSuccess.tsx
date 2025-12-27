import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, MapPin, Calendar, Clock, Car, 
  QrCode, Navigation, Download, Share2, Home
} from "lucide-react";
import Header from "@/components/layout/Header";

const BookingSuccess = () => {
  const booking = {
    id: "PQ123459",
    location: "Forum Mall Parking",
    address: "Koramangala 5th Block, Bangalore",
    date: "Dec 25, 2025",
    startTime: "2:00 PM",
    endTime: "5:00 PM",
    duration: "3 hours",
    amount: "₹125",
    vehicle: "Honda City (KA 01 AB 1234)",
    slot: "A-23",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <CheckCircle className="h-12 w-12 text-green-500" />
              </motion.div>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Your parking spot has been reserved successfully
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border mb-6">
              <CardContent className="p-6">
                {/* QR Code */}
                <div className="text-center mb-6">
                  <div className="inline-block p-4 bg-foreground rounded-2xl mb-4">
                    <div className="w-40 h-40 bg-background rounded-xl flex items-center justify-center">
                      <QrCode className="h-32 w-32 text-foreground" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Show this QR code at entry
                  </p>
                </div>

                {/* Booking Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-mono font-semibold text-primary">{booking.id}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{booking.location}</div>
                        <div className="text-sm text-muted-foreground">{booking.address}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{booking.startTime} - {booking.endTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground mb-1">Vehicle</div>
                      <div className="font-medium flex items-center gap-2">
                        <Car className="h-4 w-4 text-primary" />
                        {booking.vehicle.split(" (")[0]}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground mb-1">Slot</div>
                      <div className="font-display text-2xl font-bold text-primary">
                        {booking.slot}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <span className="font-medium">Amount Paid</span>
                    <span className="font-display text-xl font-bold text-primary">
                      {booking.amount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="gap-2">
                <Navigation className="h-5 w-5" />
                Get Directions
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-5 w-5" />
                Download
              </Button>
            </div>
            <Button variant="outline" className="w-full gap-2">
              <Share2 className="h-5 w-5" />
              Share Booking Details
            </Button>
            <Link to="/user/dashboard">
              <Button className="w-full gap-2">
                <Home className="h-5 w-5" />
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 rounded-xl bg-secondary/50"
          >
            <h3 className="font-medium mb-2">Tips for your visit</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Arrive 5 minutes before your slot time</li>
              <li>• Keep your QR code ready at the entry gate</li>
              <li>• Contact support if you face any issues</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BookingSuccess;

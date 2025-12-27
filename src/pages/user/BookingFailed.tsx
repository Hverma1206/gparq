import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  XCircle, MapPin, Calendar, Clock, Car, 
  ArrowLeft, RefreshCw, Phone
} from "lucide-react";
import Header from "@/components/layout/Header";

const BookingFailed = () => {
  const booking = {
    location: "Forum Mall Parking",
    address: "Koramangala 5th Block, Bangalore",
    date: "Dec 25, 2025",
    time: "2:00 PM - 5:00 PM",
    amount: "₹125",
    error: "Payment failed due to insufficient funds",
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
            <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <XCircle className="h-12 w-12 text-destructive" />
              </motion.div>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Booking Failed
            </h1>
            <p className="text-muted-foreground">
              {booking.error}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border mb-6">
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-semibold mb-4">Booking Details</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{booking.location}</div>
                        <div className="text-sm text-muted-foreground">{booking.address}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        Date
                      </div>
                      <div className="font-medium">{booking.date}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        Time
                      </div>
                      <div className="font-medium">{booking.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                    <span className="font-medium">Amount</span>
                    <span className="font-display text-xl font-bold">
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
            <Link to="/user/booking-summary">
              <Button className="w-full gap-2" size="lg">
                <RefreshCw className="h-5 w-5" />
                Try Again
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/search">
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Search
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 rounded-xl bg-secondary/50"
          >
            <h3 className="font-medium mb-2">Common Solutions</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Check your payment method has sufficient balance</li>
              <li>• Try a different payment method</li>
              <li>• Ensure your card is enabled for online transactions</li>
              <li>• Contact your bank if the issue persists</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BookingFailed;

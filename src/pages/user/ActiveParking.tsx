import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Car, MapPin, Clock, QrCode, Phone, AlertTriangle,
  Navigation, Plus, Shield
} from "lucide-react";
import Header from "@/components/layout/Header";

const ActiveParking = () => {
  const [timeRemaining, setTimeRemaining] = useState(9930); // seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const parking = {
    id: "PQ123459",
    location: "Forum Mall Parking",
    address: "Koramangala 5th Block, Bangalore",
    slot: "A-23",
    vehicle: "Honda City (KA 01 AB 1234)",
    entryTime: "2:00 PM",
    exitTime: "5:00 PM",
    rate: 40,
    contactNumber: "+91 98765 43210",
  };

  const isLowTime = timeRemaining < 1800; // Less than 30 mins

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isLowTime ? "bg-yellow-500/10" : "bg-green-500/10"
            }`}>
              <Car className={`h-12 w-12 ${isLowTime ? "text-yellow-500" : "text-green-500"}`} />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Parking Active
            </h1>
            <p className="text-muted-foreground">
              Your parking session is currently in progress
            </p>
          </motion.div>

          {/* Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={`border-2 mb-6 ${
              isLowTime ? "bg-yellow-500/5 border-yellow-500/30" : "bg-green-500/5 border-green-500/30"
            }`}>
              <CardContent className="p-8 text-center">
                <div className="text-sm text-muted-foreground mb-2">Time Remaining</div>
                <div className={`font-display text-5xl font-bold mb-4 ${
                  isLowTime ? "text-yellow-500" : "text-green-500"
                }`}>
                  {formatTime(timeRemaining)}
                </div>
                {isLowTime && (
                  <div className="flex items-center justify-center gap-2 text-yellow-500">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-sm font-medium">Low time remaining</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Parking Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-muted-foreground">Parking Slot</div>
                    <div className="font-display text-4xl font-bold text-primary">{parking.slot}</div>
                  </div>
                  <div className="w-20 h-20 bg-foreground rounded-xl flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-background" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{parking.location}</div>
                        <div className="text-sm text-muted-foreground">{parking.address}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground mb-1">Entry Time</div>
                      <div className="font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        {parking.entryTime}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground mb-1">Scheduled Exit</div>
                      <div className="font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        {parking.exitTime}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Vehicle</div>
                        <div className="font-medium">{parking.vehicle}</div>
                      </div>
                    </div>
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
            <Button className="w-full gap-2" size="lg">
              <Plus className="h-5 w-5" />
              Extend Parking Time
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="gap-2">
                <Navigation className="h-5 w-5" />
                Navigate to Car
              </Button>
              <Button variant="outline" className="gap-2">
                <Phone className="h-5 w-5" />
                Contact Support
              </Button>
            </div>
          </motion.div>

          {/* Safety Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20"
          >
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-medium text-foreground mb-1">Your vehicle is secured</div>
                <p className="text-sm text-muted-foreground">
                  24/7 CCTV monitoring and security guards are on duty. 
                  Contact support immediately if you notice any issues.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ActiveParking;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Star, Clock, Heart, RotateCcw, Calendar
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const RecentLocations = () => {
  const recentSpots = [
    {
      id: 1,
      name: "Forum Mall Parking",
      address: "Koramangala 5th Block, Bangalore",
      price: "₹40/hr",
      rating: 4.8,
      lastVisit: "Today, 2:30 PM",
      duration: "3 hours",
      amount: "₹120",
    },
    {
      id: 2,
      name: "Brigade Gateway Parking",
      address: "Rajajinagar, Bangalore",
      price: "₹50/hr",
      rating: 4.6,
      lastVisit: "Yesterday, 10:00 AM",
      duration: "2 hours",
      amount: "₹100",
    },
    {
      id: 3,
      name: "Phoenix Marketcity",
      address: "Whitefield, Bangalore",
      price: "₹45/hr",
      rating: 4.7,
      lastVisit: "Dec 23, 2025",
      duration: "4 hours",
      amount: "₹180",
    },
    {
      id: 4,
      name: "Orion Mall Parking",
      address: "Rajajinagar, Bangalore",
      price: "₹55/hr",
      rating: 4.5,
      lastVisit: "Dec 20, 2025",
      duration: "1.5 hours",
      amount: "₹83",
    },
    {
      id: 5,
      name: "UB City Parking",
      address: "Vittal Mallya Road, Bangalore",
      price: "₹60/hr",
      rating: 4.9,
      lastVisit: "Dec 18, 2025",
      duration: "2 hours",
      amount: "₹120",
    },
  ];

  const handleSave = (name: string) => {
    console.log(`Saving location: ${name}`);
    toast.success(`${name} added to saved locations`);
  };

  const handleRebook = (id: number, name: string) => {
    console.log(`Rebooking: ${id}`);
    toast.info(`Rebooking ${name}...`);
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Recent Locations
          </h1>
          <p className="text-muted-foreground">
            Your parking history for quick rebooking
          </p>
        </div>

        {recentSpots.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No Recent Locations
              </h3>
              <p className="text-muted-foreground mb-4">
                Your recently visited parking spots will appear here
              </p>
              <Link to="/search">
                <Button>Find Parking</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {recentSpots.map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between sm:justify-start sm:gap-4 mb-2">
                          <div>
                            <h3 className="font-display text-lg font-semibold text-foreground">
                              {spot.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {spot.address}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 sm:hidden">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{spot.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <Badge variant="secondary" className="gap-1">
                            <Calendar className="h-3 w-3" />
                            {spot.lastVisit}
                          </Badge>
                          <span className="text-muted-foreground">
                            Duration: {spot.duration}
                          </span>
                          <span className="font-medium text-primary">
                            Paid: {spot.amount}
                          </span>
                          <div className="hidden sm:flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{spot.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleSave(spot.name)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Link to={`/parking/${spot.id}`}>
                          <Button className="gap-2">
                            <RotateCcw className="h-4 w-4" />
                            Rebook
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RecentLocations;

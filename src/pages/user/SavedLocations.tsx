import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Star, Car, Heart, Trash2, Navigation,
  Clock, Zap, MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const SavedLocations = () => {
  const savedSpots = [
    {
      id: 1,
      name: "Forum Mall Parking",
      address: "Koramangala 5th Block, Bangalore",
      price: "₹40/hr",
      rating: 4.8,
      reviews: 245,
      available: 12,
      features: ["Covered", "EV Charging", "24/7"],
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400",
      savedDate: "Dec 15, 2025",
    },
    {
      id: 2,
      name: "Brigade Gateway Parking",
      address: "Rajajinagar, Bangalore",
      price: "₹50/hr",
      rating: 4.6,
      reviews: 180,
      available: 8,
      features: ["Covered", "Valet", "CCTV"],
      image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400",
      savedDate: "Dec 10, 2025",
    },
    {
      id: 3,
      name: "UB City Parking",
      address: "Vittal Mallya Road, Bangalore",
      price: "₹60/hr",
      rating: 4.9,
      reviews: 312,
      available: 20,
      features: ["Covered", "Valet", "Premium"],
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400",
      savedDate: "Dec 5, 2025",
    },
  ];

  const handleRemove = (id: number, name: string) => {
    console.log(`Removing saved location: ${id}`);
    toast.success(`${name} removed from saved locations`);
  };

  const handleNavigate = (name: string) => {
    console.log(`Navigating to: ${name}`);
    toast.info(`Opening navigation to ${name}`);
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Saved Locations
          </h1>
          <p className="text-muted-foreground">
            Your favorite parking spots for quick access
          </p>
        </div>

        {savedSpots.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No Saved Locations
              </h3>
              <p className="text-muted-foreground mb-4">
                Save your favorite parking spots for quick access
              </p>
              <Link to="/search">
                <Button>Find Parking</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {savedSpots.map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 h-48 md:h-auto shrink-0">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {spot.name}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {spot.address}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleNavigate(spot.name)}>
                              <Navigation className="h-4 w-4 mr-2" />
                              Navigate
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleRemove(spot.id, spot.name)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{spot.rating}</span>
                          <span className="text-muted-foreground text-sm">({spot.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-500">
                          <Car className="h-4 w-4" />
                          <span className="text-sm font-medium">{spot.available} available</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {spot.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature === "EV Charging" && <Zap className="h-3 w-3 mr-1" />}
                            {feature === "24/7" && <Clock className="h-3 w-3 mr-1" />}
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground">Saved on {spot.savedDate}</span>
                          <div className="font-display text-xl font-bold text-primary">
                            {spot.price}
                          </div>
                        </div>
                        <Link to={`/parking/${spot.id}`}>
                          <Button>Book Now</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SavedLocations;

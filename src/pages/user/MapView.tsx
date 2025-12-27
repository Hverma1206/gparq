import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, Search, Star, Car, Navigation, Loader2, 
  ChevronRight, Zap, Clock, X
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ParkingMap from "@/components/map/ParkingMap";
import { useGeolocation, calculateDistance, formatDistance } from "@/hooks/use-geolocation";
import { toast } from "sonner";

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);
  const { latitude, longitude, loading: geoLoading, requestLocation } = useGeolocation();

  useEffect(() => {
    requestLocation();
  }, []);

  const parkingSpotsData = [
    {
      id: 1,
      name: "Forum Mall Parking",
      address: "Koramangala 5th Block",
      price: "₹40/hr",
      rating: 4.8,
      available: 12,
      features: ["Covered", "EV Charging"],
      lat: 12.9357,
      lng: 77.6101,
    },
    {
      id: 2,
      name: "Sony World Junction",
      address: "Koramangala 4th Block",
      price: "₹30/hr",
      rating: 4.5,
      available: 8,
      features: ["Open", "CCTV"],
      lat: 12.9340,
      lng: 77.6152,
    },
    {
      id: 3,
      name: "BDA Complex Parking",
      address: "Koramangala 1st Block",
      price: "₹25/hr",
      rating: 4.2,
      available: 25,
      features: ["Covered", "Valet"],
      lat: 12.9310,
      lng: 77.6180,
    },
    {
      id: 4,
      name: "Jyoti Nivas College",
      address: "Koramangala 5th Block",
      price: "₹20/hr",
      rating: 4.0,
      available: 5,
      features: ["Open"],
      lat: 12.9380,
      lng: 77.6120,
    },
    {
      id: 5,
      name: "National Games Village",
      address: "Koramangala 7th Block",
      price: "₹35/hr",
      rating: 4.6,
      available: 18,
      features: ["Covered", "24/7"],
      lat: 12.9290,
      lng: 77.6220,
    },
  ];

  const parkingSpots = useMemo(() => {
    if (!latitude || !longitude) {
      return parkingSpotsData.map(spot => ({
        ...spot,
        distance: "-- km",
        distanceValue: Infinity,
      }));
    }
    
    return parkingSpotsData
      .map(spot => {
        const distanceKm = calculateDistance(latitude, longitude, spot.lat, spot.lng);
        return {
          ...spot,
          distance: formatDistance(distanceKm),
          distanceValue: distanceKm,
        };
      })
      .sort((a, b) => a.distanceValue - b.distanceValue);
  }, [latitude, longitude]);

  const mapCenter: [number, number] = useMemo(() => {
    if (latitude && longitude) {
      return [longitude, latitude];
    }
    return [77.6146, 12.9344];
  }, [latitude, longitude]);

  const mapSpots = parkingSpots.map(spot => ({
    id: spot.id,
    name: spot.name,
    address: spot.address,
    price: spot.price,
    rating: spot.rating,
    available: spot.available,
    lat: spot.lat,
    lng: spot.lng,
  }));

  const selectedSpot = parkingSpots.find(s => s.id === selectedSpotId);

  return (
    <DashboardLayout type="user">
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Search Bar */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location..."
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={requestLocation}
            disabled={geoLoading}
          >
            {geoLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className={`h-4 w-4 ${latitude ? 'text-primary' : ''}`} />
            )}
          </Button>
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative rounded-xl overflow-hidden border border-border">
          <ParkingMap
            spots={mapSpots}
            onSpotSelect={setSelectedSpotId}
            selectedSpotId={selectedSpotId}
            center={mapCenter}
          />
          
          {/* Selected Spot Card */}
          {selectedSpot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80"
            >
              <Card className="bg-card/95 backdrop-blur-sm border-border shadow-lg">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{selectedSpot.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedSpot.address}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => setSelectedSpotId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{selectedSpot.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <Car className="h-4 w-4" />
                      <span className="text-sm font-medium">{selectedSpot.available} spots</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{selectedSpot.distance}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {selectedSpot.features.map(f => (
                      <Badge key={f} variant="secondary" className="text-xs">
                        {f === "EV Charging" && <Zap className="h-3 w-3 mr-1" />}
                        {f === "24/7" && <Clock className="h-3 w-3 mr-1" />}
                        {f}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="font-display text-xl font-bold text-primary">
                      {selectedSpot.price}
                    </div>
                    <Link to={`/parking/${selectedSpot.id}`}>
                      <Button size="sm" className="gap-1">
                        Book Now <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapView;

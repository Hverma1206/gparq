import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Search, Filter, Star, Clock, Zap, Car, 
  Grid, List, Map as MapIcon, X, Navigation, Loader2
} from "lucide-react";
import Header from "@/components/layout/Header";
import ParkingMap from "@/components/map/ParkingMap";
import FilterPanel, { FilterState } from "@/components/search/FilterPanel";
import { useGeolocation, calculateDistance, formatDistance } from "@/hooks/use-geolocation";
import { toast } from "sonner";

const SearchResults = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list");
  const [searchQuery, setSearchQuery] = useState("Koramangala, Bangalore");
  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);
  const [showMapPanel, setShowMapPanel] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);
  
  const { latitude, longitude, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();
  
  // Request location on mount
  useEffect(() => {
    requestLocation();
  }, []);
  
  // Show toast when location is detected or on error
  useEffect(() => {
    if (latitude && longitude) {
      toast.success("Location detected! Showing nearby parking spots.");
      setSearchQuery("Near your location");
    }
  }, [latitude, longitude]);
  
  useEffect(() => {
    if (geoError) {
      toast.error(geoError);
    }
  }, [geoError]);

  const parkingSpotsData = [
    {
      id: 1,
      name: "Forum Mall Parking",
      address: "Koramangala 5th Block, Bangalore",
      price: "₹40/hr",
      rating: 4.8,
      reviews: 245,
      available: 12,
      total: 50,
      features: ["Covered", "EV Charging", "24/7"],
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400",
      lat: 12.9357,
      lng: 77.6101,
    },
    {
      id: 2,
      name: "Sony World Junction Parking",
      address: "Koramangala 4th Block, Bangalore",
      price: "₹30/hr",
      rating: 4.5,
      reviews: 180,
      available: 8,
      total: 30,
      features: ["Open", "CCTV"],
      image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400",
      lat: 12.9340,
      lng: 77.6152,
    },
    {
      id: 3,
      name: "BDA Complex Parking",
      address: "Koramangala 1st Block, Bangalore",
      price: "₹25/hr",
      rating: 4.2,
      reviews: 95,
      available: 25,
      total: 100,
      features: ["Covered", "Valet", "EV Charging"],
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400",
      lat: 12.9310,
      lng: 77.6180,
    },
    {
      id: 4,
      name: "Jyoti Nivas College Parking",
      address: "Koramangala 5th Block, Bangalore",
      price: "₹20/hr",
      rating: 4.0,
      reviews: 62,
      available: 5,
      total: 20,
      features: ["Open", "Guard"],
      image: "https://images.unsplash.com/photo-1545179605-1296651e9d43?w=400",
      lat: 12.9380,
      lng: 77.6120,
    },
    {
      id: 5,
      name: "National Games Village Parking",
      address: "Koramangala 7th Block, Bangalore",
      price: "₹35/hr",
      rating: 4.6,
      reviews: 128,
      available: 18,
      total: 60,
      features: ["Covered", "24/7", "CCTV"],
      image: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400",
      lat: 12.9290,
      lng: 77.6220,
    },
  ];

  // Calculate distances and sort by proximity when user location is available
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

  // Map center based on user location or default
  const mapCenter: [number, number] = useMemo(() => {
    if (latitude && longitude) {
      return [longitude, latitude];
    }
    return [77.6146, 12.9344]; // Default: Koramangala, Bangalore
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

  const handleSpotSelect = (spotId: number) => {
    setSelectedSpotId(spotId);
    const element = document.getElementById(`spot-${spotId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-4 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex gap-2">
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
                  title="Use my location"
                >
                  {geoLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Navigation className={`h-4 w-4 ${latitude ? 'text-primary' : ''}`} />
                  )}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={showFilters ? "default" : "outline"} 
                  className="gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilters && (
                    <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </Button>
                <Button className="gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <FilterPanel
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                onApplyFilters={(filters) => setActiveFilters(filters)}
              />
            )}
          </AnimatePresence>

          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {parkingSpots.length} Parking Spots Found
              </h1>
              <p className="text-muted-foreground">Near {searchQuery}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("map")}
                className="md:hidden"
              >
                <MapIcon className="h-4 w-4" />
              </Button>
              <div className="hidden md:flex">
                <Button
                  variant={showMapPanel ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowMapPanel(!showMapPanel)}
                  className="gap-2"
                >
                  <MapIcon className="h-4 w-4" />
                  {showMapPanel ? "Hide Map" : "Show Map"}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {["All", "Covered", "EV Charging", "24/7", "Valet", "Under ₹30/hr"].map((filter) => (
              <Badge
                key={filter}
                variant={filter === "All" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
              >
                {filter}
              </Badge>
            ))}
          </motion.div>

          {/* Mobile Map View */}
          {viewMode === "map" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:hidden h-[60vh] mb-6"
            >
              <ParkingMap
                spots={mapSpots}
                onSpotSelect={handleSpotSelect}
                selectedSpotId={selectedSpotId}
                center={mapCenter}
              />
            </motion.div>
          )}

          {/* Main Content - Split View on Desktop */}
          <div className="flex gap-6">
            {/* Results List/Grid */}
            <div className={`flex-1 ${showMapPanel ? 'lg:w-1/2' : 'w-full'}`}>
              <div className={viewMode === "grid" || viewMode === "map" ? "grid md:grid-cols-2 gap-4" : "space-y-4"}>
                {parkingSpots.map((spot, index) => (
                  <motion.div
                    key={spot.id}
                    id={`spot-${spot.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onMouseEnter={() => setSelectedSpotId(spot.id)}
                    onMouseLeave={() => setSelectedSpotId(null)}
                  >
                    <Link to={`/parking/${spot.id}`}>
                      <div className={`bg-card border rounded-2xl overflow-hidden transition-all ${
                        selectedSpotId === spot.id 
                          ? 'border-primary shadow-lg shadow-primary/10' 
                          : 'border-border hover:border-primary/50'
                      } ${viewMode === "list" ? "flex" : ""}`}>
                        <div className={viewMode === "list" ? "w-48 h-36 shrink-0" : "h-48"}>
                          <img
                            src={spot.image}
                            alt={spot.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1">
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
                            <div className="text-right">
                              <div className="font-display text-xl font-bold text-primary">
                                {spot.price}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{spot.rating}</span>
                              <span className="text-muted-foreground text-sm">({spot.reviews})</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {spot.distance} away
                            </div>
                            <div className="flex items-center gap-1">
                              <Car className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-green-500 font-medium">
                                {spot.available} available
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {spot.features.map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature === "EV Charging" && <Zap className="h-3 w-3 mr-1" />}
                                {feature === "24/7" && <Clock className="h-3 w-3 mr-1" />}
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Panel - Desktop Only */}
            {showMapPanel && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block w-1/2 sticky top-24 h-[calc(100vh-8rem)]"
              >
                <div className="relative h-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 bg-card/90 backdrop-blur-sm"
                    onClick={() => setShowMapPanel(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <ParkingMap
                    spots={mapSpots}
                    onSpotSelect={handleSpotSelect}
                    selectedSpotId={selectedSpotId}
                    center={mapCenter}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;

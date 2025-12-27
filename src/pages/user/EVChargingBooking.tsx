import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Zap, MapPin, Clock, Battery, BatteryCharging, Plug, Car, Calendar, IndianRupee } from "lucide-react";
import { toast } from "sonner";

interface ChargingStation {
  id: string;
  name: string;
  location: string;
  distance: string;
  chargerTypes: string[];
  availableSlots: number;
  pricePerKwh: number;
  rating: number;
  amenities: string[];
}

const EVChargingBooking = () => {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [chargerType, setChargerType] = useState("");
  const [duration, setDuration] = useState("");

  const stations: ChargingStation[] = [
    {
      id: "1",
      name: "EV Hub Central",
      location: "MG Road, Bangalore",
      distance: "1.2 km",
      chargerTypes: ["Type 2 AC", "CCS DC Fast", "CHAdeMO"],
      availableSlots: 4,
      pricePerKwh: 12,
      rating: 4.8,
      amenities: ["Cafe", "Restroom", "WiFi"]
    },
    {
      id: "2",
      name: "Green Charge Point",
      location: "Koramangala, Bangalore",
      distance: "2.5 km",
      chargerTypes: ["Type 2 AC", "CCS DC Fast"],
      availableSlots: 2,
      pricePerKwh: 10,
      rating: 4.5,
      amenities: ["Restroom", "Security"]
    },
    {
      id: "3",
      name: "Electrify India",
      location: "Indiranagar, Bangalore",
      distance: "3.8 km",
      chargerTypes: ["CCS DC Fast", "Tesla Supercharger"],
      availableSlots: 6,
      pricePerKwh: 15,
      rating: 4.9,
      amenities: ["Lounge", "Cafe", "Restroom", "WiFi"]
    }
  ];

  const handleBookStation = (stationId: string) => {
    if (!chargerType || !duration) {
      toast.error("Please select charger type and duration");
      return;
    }
    toast.success("Charging slot booked successfully!");
    setSelectedStation(null);
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">EV Charging</h1>
          <p className="text-muted-foreground">Find and book charging stations near you</p>
        </div>

        {/* Search Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input placeholder="Enter location" defaultValue="Current Location" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Charger Type</label>
                <Select value={chargerType} onValueChange={setChargerType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="type2">Type 2 AC</SelectItem>
                    <SelectItem value="ccs">CCS DC Fast</SelectItem>
                    <SelectItem value="chademo">CHAdeMO</SelectItem>
                    <SelectItem value="tesla">Tesla Supercharger</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Search Stations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Station List */}
        <div className="grid gap-4">
          {stations.map((station) => (
            <Card key={station.id} className={selectedStation === station.id ? "ring-2 ring-primary" : ""}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BatteryCharging className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{station.name}</h3>
                        <Badge variant="secondary">{station.rating} ★</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{station.location}</span>
                        <span className="text-sm">• {station.distance}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {station.chargerTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            <Plug className="h-3 w-3 mr-1" />
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {station.amenities.map((amenity) => (
                          <span key={amenity} className="bg-secondary px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">₹{station.pricePerKwh}/kWh</p>
                      <p className="text-sm text-muted-foreground">
                        <Battery className="h-4 w-4 inline mr-1" />
                        {station.availableSlots} slots available
                      </p>
                    </div>
                    <Button 
                      onClick={() => setSelectedStation(station.id)}
                      variant={selectedStation === station.id ? "default" : "outline"}
                    >
                      {selectedStation === station.id ? "Selected" : "Select Station"}
                    </Button>
                  </div>
                </div>

                {selectedStation === station.id && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Time Slot</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="now">Now</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Vehicle</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tata-nexon">Tata Nexon EV (KA-01-AB-1234)</SelectItem>
                            <SelectItem value="mg-zs">MG ZS EV (KA-02-CD-5678)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button 
                          className="w-full" 
                          onClick={() => handleBookStation(station.id)}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Charging Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BatteryCharging className="h-5 w-5 text-primary" />
              Active Charging
            </CardTitle>
            <CardDescription>Your current charging sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No active charging sessions</p>
              <p className="text-sm">Book a charging slot to get started</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EVChargingBooking;

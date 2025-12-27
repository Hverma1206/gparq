import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Car, Droplets, Key, Clock, IndianRupee, Star, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  popular?: boolean;
}

const AddOnServices = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const carWashServices: Service[] = [
    { id: "basic-wash", name: "Basic Exterior Wash", description: "Quick exterior wash with foam cleaning", price: 199, duration: "20 mins", rating: 4.5 },
    { id: "premium-wash", name: "Premium Wash", description: "Interior vacuum + exterior wash + tire shine", price: 499, duration: "45 mins", rating: 4.8, popular: true },
    { id: "full-detail", name: "Full Detailing", description: "Complete interior & exterior detailing with polish", price: 1499, duration: "2 hours", rating: 4.9 },
    { id: "ceramic-coat", name: "Ceramic Coating", description: "Premium ceramic coating for long-lasting shine", price: 4999, duration: "4 hours", rating: 5.0 },
  ];

  const valetServices: Service[] = [
    { id: "valet-park", name: "Valet Parking", description: "Professional valet will park your car", price: 149, duration: "Instant", rating: 4.7, popular: true },
    { id: "valet-retrieve", name: "Valet Retrieval", description: "Get your car brought to you", price: 99, duration: "5-10 mins", rating: 4.6 },
    { id: "priority-valet", name: "Priority Valet", description: "Skip the queue with priority service", price: 299, duration: "Instant", rating: 4.9 },
  ];

  const additionalServices: Service[] = [
    { id: "fuel-fill", name: "Fuel Fill-up", description: "We'll fill up your tank (fuel cost extra)", price: 99, duration: "15 mins", rating: 4.5 },
    { id: "tire-check", name: "Tire Pressure Check", description: "Check and adjust tire pressure", price: 49, duration: "10 mins", rating: 4.4 },
    { id: "ac-refresh", name: "AC Refresh", description: "Quick AC sanitization and freshener", price: 299, duration: "20 mins", rating: 4.6 },
    { id: "interior-sanitize", name: "Interior Sanitization", description: "Deep sanitization of car interior", price: 399, duration: "30 mins", rating: 4.8, popular: true },
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const allServices = [...carWashServices, ...valetServices, ...additionalServices];
  const totalPrice = selectedServices.reduce((sum, id) => {
    const service = allServices.find(s => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  const handleBookServices = () => {
    if (!selectedVehicle) {
      toast.error("Please select a vehicle");
      return;
    }
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }
    toast.success(`${selectedServices.length} services booked successfully!`);
    setSelectedServices([]);
  };

  const ServiceCard = ({ service }: { service: Service }) => (
    <Card 
      className={`cursor-pointer transition-all ${selectedServices.includes(service.id) ? "ring-2 ring-primary bg-primary/5" : "hover:bg-secondary/50"}`}
      onClick={() => toggleService(service.id)}
    >
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Checkbox 
              checked={selectedServices.includes(service.id)}
              className="mt-1"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{service.name}</h4>
                {service.popular && <Badge className="text-xs">Popular</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {service.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  {service.rating}
                </span>
              </div>
            </div>
          </div>
          <p className="font-semibold text-primary">₹{service.price}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Add-On Services</h1>
          <p className="text-muted-foreground">Enhance your parking experience with premium services</p>
        </div>

        {/* Vehicle Selection */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Select Vehicle</p>
                  <p className="text-sm text-muted-foreground">Choose which vehicle to service</p>
                </div>
              </div>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger className="w-full sm:w-[280px]">
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="swift">Maruti Swift (KA-01-AB-1234)</SelectItem>
                  <SelectItem value="creta">Hyundai Creta (KA-02-CD-5678)</SelectItem>
                  <SelectItem value="nexon">Tata Nexon EV (KA-03-EF-9012)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Services Tabs */}
        <Tabs defaultValue="carwash" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="carwash" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              <span className="hidden sm:inline">Car Wash</span>
            </TabsTrigger>
            <TabsTrigger value="valet" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">Valet</span>
            </TabsTrigger>
            <TabsTrigger value="additional" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Additional</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="carwash" className="space-y-3">
            {carWashServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </TabsContent>

          <TabsContent value="valet" className="space-y-3">
            {valetServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </TabsContent>

          <TabsContent value="additional" className="space-y-3">
            {additionalServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Booking Summary */}
        {selectedServices.length > 0 && (
          <Card className="sticky bottom-4 bg-card border-2 border-primary">
            <CardContent className="pt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{selectedServices.length} service(s) selected</p>
                  <p className="text-2xl font-bold text-primary">₹{totalPrice}</p>
                </div>
                <Button size="lg" onClick={handleBookServices}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Book Services
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Past Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Service Bookings</CardTitle>
            <CardDescription>Your past add-on service history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Droplets className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Premium Wash</p>
                    <p className="text-sm text-muted-foreground">Dec 20, 2024 • Maruti Swift</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹499</p>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Valet Parking</p>
                    <p className="text-sm text-muted-foreground">Dec 15, 2024 • Hyundai Creta</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹149</p>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddOnServices;

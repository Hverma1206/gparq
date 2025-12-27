import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, Save, MapPin, Car, IndianRupee, Clock, 
  Camera, Trash2, Plus, Zap, Shield, Wifi
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const EditListing = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const [listing, setListing] = useState({
    title: "Phoenix Mall Parking - Basement Level 2",
    description: "Covered parking spot in Phoenix Mall basement. Easy access to mall entrance. 24/7 security with CCTV surveillance.",
    address: "Phoenix Marketcity, Whitefield Main Road, Bangalore - 560066",
    type: "covered",
    vehicleType: "car",
    priceHourly: 50,
    priceDaily: 400,
    priceMonthly: 8000,
    availability: "24/7",
    spotCount: 5,
    active: true,
    amenities: {
      evCharging: true,
      cctv: true,
      covered: true,
      security: true,
      wifi: false,
      wheelchair: true,
    },
  });

  const handleSave = () => {
    toast({ title: "Listing updated", description: "Your changes have been saved successfully." });
  };

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/host/listings" className="p-2 rounded-lg hover:bg-secondary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Edit Listing
              </h1>
              <p className="text-muted-foreground">Update your parking space details</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label>Active</Label>
              <Switch
                checked={listing.active}
                onCheckedChange={(v) => setListing({ ...listing, active: v })}
              />
            </div>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Listing Title</Label>
                  <Input
                    value={listing.title}
                    onChange={(e) => setListing({ ...listing, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={4}
                    value={listing.description}
                    onChange={(e) => setListing({ ...listing, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      className="pl-10"
                      rows={2}
                      value={listing.address}
                      onChange={(e) => setListing({ ...listing, address: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Hourly Rate</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="number"
                        className="pl-10"
                        value={listing.priceHourly}
                        onChange={(e) => setListing({ ...listing, priceHourly: +e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Daily Rate</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="number"
                        className="pl-10"
                        value={listing.priceDaily}
                        onChange={(e) => setListing({ ...listing, priceDaily: +e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Rate</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="number"
                        className="pl-10"
                        value={listing.priceMonthly}
                        onChange={(e) => setListing({ ...listing, priceMonthly: +e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl">Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative aspect-square rounded-xl bg-secondary/50 overflow-hidden group">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        Photo {i}
                      </div>
                      <button className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Plus className="w-8 h-8" />
                    <span className="text-sm">Add Photo</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Parking Type</Label>
                  <Select value={listing.type} onValueChange={(v) => setListing({ ...listing, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="covered">Covered</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="basement">Basement</SelectItem>
                      <SelectItem value="multi-level">Multi-Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Type</Label>
                  <Select value={listing.vehicleType} onValueChange={(v) => setListing({ ...listing, vehicleType: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="bike">Two Wheeler</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Available Spots</Label>
                  <Input
                    type="number"
                    value={listing.spotCount}
                    onChange={(e) => setListing({ ...listing, spotCount: +e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select value={listing.availability} onValueChange={(v) => setListing({ ...listing, availability: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24/7">24/7</SelectItem>
                      <SelectItem value="daytime">Daytime Only (6AM-10PM)</SelectItem>
                      <SelectItem value="weekdays">Weekdays Only</SelectItem>
                      <SelectItem value="custom">Custom Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl">Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "evCharging", label: "EV Charging", icon: Zap },
                  { key: "cctv", label: "CCTV", icon: Shield },
                  { key: "covered", label: "Covered Parking", icon: Car },
                  { key: "security", label: "24/7 Security", icon: Shield },
                  { key: "wifi", label: "WiFi", icon: Wifi },
                ].map((amenity) => (
                  <div key={amenity.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <amenity.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{amenity.label}</span>
                    </div>
                    <Switch
                      checked={listing.amenities[amenity.key as keyof typeof listing.amenities]}
                      onCheckedChange={(v) => setListing({
                        ...listing,
                        amenities: { ...listing.amenities, [amenity.key]: v }
                      })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditListing;

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Plus, Star, Car, Clock, Zap, 
  MoreVertical, Edit, Eye, Trash2, TrendingUp, Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { useParkingSpots } from "@/hooks/useParkingSpots";

const Listings = () => {
  const navigate = useNavigate();
  const { parkingSpots, isLoading, deleteSpot } = useParkingSpots(true);

  const handleView = (id: string) => navigate(`/host/listings/${id}`);
  const handleEdit = (id: string) => navigate(`/host/listings/${id}/edit`);
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      deleteSpot(id);
    }
  };

  const getFeatures = (spot: any) => {
    const features = [];
    if (spot.is_covered) features.push("Covered");
    if (spot.has_ev_charging) features.push("EV Charging");
    if (spot.amenities?.includes("24/7")) features.push("24/7");
    if (spot.amenities?.includes("CCTV")) features.push("CCTV");
    if (spot.amenities?.includes("Valet")) features.push("Valet");
    return features.slice(0, 3);
  };

  if (isLoading) {
    return (
      <DashboardLayout type="host">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              My Listings
            </h1>
            <p className="text-muted-foreground">
              Manage your parking spaces and availability
            </p>
          </div>
          <Link to="/host/listings/new">
            <Button className="gap-2">
              <Plus className="h-5 w-5" />
              Add New Listing
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingSpots.map((listing) => (
            <Card key={listing.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors">
              <div className="relative h-48 bg-secondary">
                {listing.images?.[0] ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-muted-foreground opacity-50" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={listing.is_active ? "bg-green-500" : "bg-yellow-500"}>
                    {listing.is_active ? "Active" : "Pending"}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleView(listing.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(listing.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(listing.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {listing.name}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {listing.address}, {listing.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{listing.rating || 0}</span>
                    <span className="text-muted-foreground">({listing.review_count || 0})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {listing.available_spots || 0}/{listing.total_spots || 0}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {getFeatures(listing).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature === "EV Charging" && <Zap className="h-3 w-3 mr-1" />}
                      {feature === "24/7" && <Clock className="h-3 w-3 mr-1" />}
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="font-display text-xl font-bold text-primary">
                      ₹{listing.price_per_hour}/hr
                    </div>
                  </div>
                  {listing.price_per_day && (
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Daily</div>
                      <div className="font-medium text-foreground">
                        ₹{listing.price_per_day}/day
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Card */}
          <Link to="/host/listings/new">
            <Card className="bg-card border-border border-dashed h-full min-h-[400px] flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Add New Listing
                </h3>
                <p className="text-sm text-muted-foreground">
                  List your parking space and start earning
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Listings;

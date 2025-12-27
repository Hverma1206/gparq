import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Plus, Star, Car, Clock, Zap, 
  MoreVertical, Edit, Eye, Trash2, TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const Listings = () => {
  const listings = [
    {
      id: 1,
      name: "Forum Mall Parking",
      address: "Koramangala 5th Block, Bangalore",
      totalSpots: 50,
      availableSpots: 12,
      price: 40,
      rating: 4.8,
      reviews: 245,
      earnings: "₹12,450",
      status: "Active",
      features: ["Covered", "EV Charging", "24/7"],
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400",
    },
    {
      id: 2,
      name: "Brigade Gateway Parking",
      address: "Rajajinagar, Bangalore",
      totalSpots: 30,
      availableSpots: 8,
      price: 50,
      rating: 4.6,
      reviews: 180,
      earnings: "₹8,920",
      status: "Active",
      features: ["Covered", "Valet", "CCTV"],
      image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400",
    },
    {
      id: 3,
      name: "Indiranagar Parking",
      address: "100 Feet Road, Indiranagar",
      totalSpots: 20,
      availableSpots: 5,
      price: 30,
      rating: 4.9,
      reviews: 95,
      earnings: "₹5,210",
      status: "Pending",
      features: ["Open", "Guard"],
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400",
    },
  ];

  const handleView = (id: number) => toast.info(`Viewing listing ${id}`);
  const handleEdit = (id: number) => toast.info(`Editing listing ${id}`);
  const handleDelete = (id: number) => toast.error(`Delete listing ${id}?`);

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
          {listings.map((listing) => (
            <Card key={listing.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors">
              <div className="relative h-48">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={listing.status === "Active" ? "bg-green-500" : "bg-yellow-500"}>
                    {listing.status}
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
                      {listing.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{listing.rating}</span>
                    <span className="text-muted-foreground">({listing.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {listing.availableSpots}/{listing.totalSpots}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.features.map((feature) => (
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
                      ₹{listing.price}/hr
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">This Month</div>
                    <div className="font-medium text-green-500 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {listing.earnings}
                    </div>
                  </div>
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

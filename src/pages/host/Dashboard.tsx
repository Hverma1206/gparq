import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, MapPin, IndianRupee, TrendingUp, Calendar, 
  ChevronRight, Plus, Users, Star, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParkingSpots, useParkingSpotStats } from "@/hooks/useParkingSpots";
import { useBookings } from "@/hooks/useBookings";
import { format } from "date-fns";

const HostDashboard = () => {
  const { parkingSpots, isLoading: spotsLoading } = useParkingSpots(true);
  const { data: spotStats, isLoading: statsLoading } = useParkingSpotStats();
  const { bookings, isLoading: bookingsLoading } = useBookings();

  const recentBookings = bookings?.slice(0, 3) || [];

  const stats = [
    { label: "Total Earnings", value: `₹${(spotStats?.earnings || 0).toLocaleString()}`, icon: IndianRupee, color: "text-green-500", change: "" },
    { label: "Active Listings", value: (spotStats?.listingCount || 0).toString(), icon: MapPin, color: "text-primary", change: "" },
    { label: "Total Bookings", value: bookings?.length?.toString() || "0", icon: Calendar, color: "text-blue-500", change: "" },
    { label: "Total Spots", value: (spotStats?.totalSpots || 0).toString(), icon: Car, color: "text-yellow-500", change: "" },
  ];

  const todayBookings = bookings?.filter(b => {
    const today = new Date();
    const bookingDate = new Date(b.start_time);
    return bookingDate.toDateString() === today.toDateString();
  }) || [];

  const todayRevenue = todayBookings.reduce((sum, b) => sum + (Number(b.host_payout) || 0), 0);
  const occupancyRate = spotStats?.totalSpots 
    ? Math.round((spotStats.occupiedSpots / spotStats.totalSpots) * 100) 
    : 0;

  if (spotsLoading || statsLoading || bookingsLoading) {
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
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Host Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your parking spaces and track earnings
            </p>
          </div>
          <Link to="/host/listings/new">
            <Button className="gap-2">
              <Plus className="h-5 w-5" />
              Add New Listing
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  {stat.change && (
                    <span className="text-sm text-green-500 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Recent Bookings</CardTitle>
                <Link to="/host/bookings" className="text-primary text-sm hover:underline flex items-center gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </CardHeader>
              <CardContent>
                {recentBookings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bookings yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{booking.vehicle_number}</div>
                            <div className="text-sm text-muted-foreground">
                              {booking.vehicle_type} • {booking.parking_spots?.name || "Parking"}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-foreground">₹{Number(booking.total_amount).toLocaleString()}</div>
                          <div className={`text-sm ${
                            booking.status === "confirmed" ? "text-green-500" :
                            booking.status === "completed" ? "text-blue-500" : "text-muted-foreground"
                          }`}>
                            {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats & Listings */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold mb-4">Today's Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="opacity-80">Bookings Today</span>
                    <span className="font-semibold">{todayBookings.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Revenue Today</span>
                    <span className="font-semibold">₹{todayRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Occupancy Rate</span>
                    <span className="font-semibold">{occupancyRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl">My Listings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {parkingSpots.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No listings yet</p>
                    <Link to="/host/listings/new">
                      <Button variant="link" size="sm">Create your first listing</Button>
                    </Link>
                  </div>
                ) : (
                  parkingSpots.slice(0, 3).map((listing) => (
                    <Link
                      key={listing.id}
                      to={`/host/listings/${listing.id}`}
                      className="block p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{listing.name}</span>
                        <span className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-yellow-500" />
                          {listing.rating || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{listing.available_spots || 0}/{listing.total_spots || 0} available</span>
                        <span className="text-primary font-medium">₹{listing.price_per_hour}/hr</span>
                      </div>
                      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${((listing.total_spots || 0) - (listing.available_spots || 0)) / (listing.total_spots || 1) * 100}%` }}
                        />
                      </div>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostDashboard;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, MapPin, IndianRupee, TrendingUp, Calendar, 
  ChevronRight, Plus, Users, Star
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const HostDashboard = () => {
  const stats = [
    { label: "Total Earnings", value: "₹45,280", icon: IndianRupee, color: "text-green-500", change: "+12%" },
    { label: "Active Listings", value: "3", icon: MapPin, color: "text-primary", change: "" },
    { label: "Total Bookings", value: "156", icon: Calendar, color: "text-blue-500", change: "+8%" },
    { label: "Avg. Rating", value: "4.8", icon: Star, color: "text-yellow-500", change: "" },
  ];

  const recentBookings = [
    { id: 1, user: "Rahul S.", vehicle: "KA 01 AB 1234", spot: "Forum Mall", time: "2:00 PM - 5:00 PM", amount: "₹120", status: "Active" },
    { id: 2, user: "Priya M.", vehicle: "KA 05 CD 5678", spot: "Forum Mall", time: "10:00 AM - 12:00 PM", amount: "₹80", status: "Completed" },
    { id: 3, user: "Amit K.", vehicle: "KA 03 EF 9012", spot: "Brigade Gateway", time: "6:00 PM - 9:00 PM", amount: "₹150", status: "Upcoming" },
  ];

  const listings = [
    { id: 1, name: "Forum Mall Parking", spots: 50, occupied: 38, earnings: "₹12,450", rating: 4.8 },
    { id: 2, name: "Brigade Gateway Parking", spots: 30, occupied: 22, earnings: "₹8,920", rating: 4.6 },
    { id: 3, name: "Indiranagar Parking", spots: 20, occupied: 15, earnings: "₹5,210", rating: 4.9 },
  ];

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
                          <div className="font-medium text-foreground">{booking.user}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.vehicle} • {booking.spot}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">{booking.amount}</div>
                        <div className={`text-sm ${
                          booking.status === "Active" ? "text-green-500" :
                          booking.status === "Upcoming" ? "text-blue-500" : "text-muted-foreground"
                        }`}>
                          {booking.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Revenue Today</span>
                    <span className="font-semibold">₹1,850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-80">Occupancy Rate</span>
                    <span className="font-semibold">76%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl">My Listings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {listings.map((listing) => (
                  <Link
                    key={listing.id}
                    to={`/host/listings/${listing.id}`}
                    className="block p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{listing.name}</span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-yellow-500" />
                        {listing.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{listing.occupied}/{listing.spots} occupied</span>
                      <span className="text-green-500 font-medium">{listing.earnings}</span>
                    </div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(listing.occupied / listing.spots) * 100}%` }}
                      />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostDashboard;

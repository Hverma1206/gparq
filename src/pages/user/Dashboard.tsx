import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, MapPin, Calendar, Wallet, Clock, ChevronRight, 
  Star, Search, Plus, Zap, Droplets, Gift, Bell, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useBookings, useBookingStats } from "@/hooks/useBookings";
import { useWallet } from "@/hooks/useWallet";
import { useSavedLocations } from "@/hooks/useSavedLocations";
import { useNotifications } from "@/hooks/useNotifications";
import { format } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, isLoading: profileLoading } = useProfile();
  const { bookings, isLoading: bookingsLoading } = useBookings();
  const { data: bookingStats } = useBookingStats();
  const { balance } = useWallet();
  const { locations, isLoading: locationsLoading } = useSavedLocations();
  const { unreadCount } = useNotifications();

  const recentBookings = bookings?.slice(0, 3) || [];
  const activeBooking = bookings?.find(b => b.status === "confirmed");

  const stats = [
    { label: "Total Bookings", value: bookingStats?.total?.toString() || "0", icon: Calendar, color: "text-primary" },
    { label: "Active Parking", value: bookingStats?.active?.toString() || "0", icon: Car, color: "text-green-500" },
    { label: "Wallet Balance", value: `₹${balance.toLocaleString()}`, icon: Wallet, color: "text-blue-500" },
    { label: "Upcoming", value: bookingStats?.upcoming?.toString() || "0", icon: Clock, color: "text-yellow-500" },
  ];

  const quickServices = [
    { icon: Zap, label: "EV Charging", href: "/user/ev-charging", color: "bg-green-500/10 text-green-500" },
    { icon: Droplets, label: "Car Wash", href: "/user/services", color: "bg-blue-500/10 text-blue-500" },
    { icon: Star, label: "Reviews", href: "/user/reviews", color: "bg-yellow-500/10 text-yellow-500" },
    { icon: Gift, label: "Referrals", href: "/user/referrals", color: "bg-purple-500/10 text-purple-500" },
  ];

  const handleExtendParking = () => {
    toast.success("Parking extended by 1 hour");
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";

  if (profileLoading || bookingsLoading) {
    return (
      <DashboardLayout type="user">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, {displayName}! 👋
            </h1>
            <p className="text-muted-foreground">
              Manage your parking, bookings, and services all in one place.
            </p>
          </div>
          <Link to="/user/notifications">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link to="/search">
            <Button size="lg" className="gap-2">
              <Search className="h-5 w-5" />
              Find Parking
            </Button>
          </Link>
          <Link to="/user/ev-charging">
            <Button variant="outline" size="lg" className="gap-2">
              <Zap className="h-5 w-5" />
              EV Charging
            </Button>
          </Link>
          <Link to="/user/services">
            <Button variant="outline" size="lg" className="gap-2">
              <Droplets className="h-5 w-5" />
              Services
            </Button>
          </Link>
          <Link to="/user/wallet">
            <Button variant="outline" size="lg" className="gap-2">
              <Wallet className="h-5 w-5" />
              Add Money
            </Button>
          </Link>
        </div>

        {/* Quick Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickServices.map((service, index) => (
            <Link key={index} to={service.href}>
              <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${service.color}`}>
                    <service.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-foreground">{service.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Recent Bookings</CardTitle>
                <Link to="/user/bookings" className="text-primary text-sm hover:underline flex items-center gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </CardHeader>
              <CardContent>
                {recentBookings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bookings yet</p>
                    <Link to="/search">
                      <Button variant="link" className="mt-2">Find parking nearby</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Car className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {booking.parking_spots?.name || "Parking Spot"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(booking.start_time), "MMM d, yyyy")} • {format(new Date(booking.start_time), "h:mm a")}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-foreground">₹{Number(booking.total_amount).toLocaleString()}</div>
                          <div className={`text-sm ${
                            booking.status === "completed" ? "text-green-500" :
                            booking.status === "confirmed" ? "text-blue-500" :
                            booking.status === "cancelled" ? "text-destructive" : "text-muted-foreground"
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

          {/* Saved Locations */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Saved Locations</CardTitle>
                <Link to="/user/saved">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {locationsLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : locations.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No saved locations</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {locations.slice(0, 3).map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{location.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{location.address}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Parking Alert */}
            {activeBooking && (
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Active Parking</div>
                      <div className="text-sm text-muted-foreground">
                        {activeBooking.parking_spots?.name || "Parking Spot"}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-display font-bold text-primary mb-2">
                    {format(new Date(activeBooking.end_time), "h:mm a")}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Ends at</p>
                  <Button className="w-full" size="sm" onClick={handleExtendParking}>
                    Extend Parking
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

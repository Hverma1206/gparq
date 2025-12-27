import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, MapPin, Calendar, Wallet, Clock, ChevronRight, 
  Star, Search, Plus, Zap, Droplets, Gift, Bell
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const Dashboard = () => {
  const stats = [
    { label: "Total Bookings", value: "24", icon: Calendar, color: "text-primary" },
    { label: "Active Parking", value: "1", icon: Car, color: "text-green-500" },
    { label: "Wallet Balance", value: "₹2,450", icon: Wallet, color: "text-blue-500" },
    { label: "Referral Earnings", value: "₹800", icon: Gift, color: "text-yellow-500" },
  ];

  const recentBookings = [
    { id: 1, location: "Phoenix Mall Parking", date: "Dec 24, 2025", time: "2:00 PM - 5:00 PM", status: "Completed", amount: "₹120", services: ["Car Wash"] },
    { id: 2, location: "Indiranagar Metro Station", date: "Dec 22, 2025", time: "9:00 AM - 6:00 PM", status: "Completed", amount: "₹350", services: ["EV Charging"] },
    { id: 3, location: "Koramangala Tech Park", date: "Dec 20, 2025", time: "10:00 AM - 7:00 PM", status: "Completed", amount: "₹400", services: [] },
  ];

  const savedLocations = [
    { name: "Home", address: "123 MG Road, Bangalore" },
    { name: "Office", address: "Tech Park, Whitefield" },
    { name: "Gym", address: "Gold's Gym, Indiranagar" },
  ];

  const quickServices = [
    { icon: Zap, label: "EV Charging", href: "/user/ev-charging", color: "bg-green-500/10 text-green-500" },
    { icon: Droplets, label: "Car Wash", href: "/user/services", color: "bg-blue-500/10 text-blue-500" },
    { icon: Star, label: "Reviews", href: "/user/reviews", color: "bg-yellow-500/10 text-yellow-500" },
    { icon: Gift, label: "Referrals", href: "/user/referrals", color: "bg-purple-500/10 text-purple-500" },
  ];

  const handleExtendParking = () => {
    console.log("Extend parking clicked");
    toast.success("Parking extended by 1 hour");
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, Rahul! 👋
            </h1>
            <p className="text-muted-foreground">
              Manage your parking, bookings, and services all in one place.
            </p>
          </div>
          <Link to="/user/notifications">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">3</span>
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
                          <div className="font-medium text-foreground">{booking.location}</div>
                        <div className="text-sm text-muted-foreground">
                            {booking.date} • {booking.time}
                          </div>
                          {booking.services && booking.services.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {booking.services.map((service, i) => (
                                <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  {service}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">{booking.amount}</div>
                        <div className="text-sm text-green-500">{booking.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Saved Locations */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Saved Locations</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => toast.info("Add location coming soon!")}>
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedLocations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{location.name}</div>
                        <div className="text-sm text-muted-foreground">{location.address}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Parking Alert */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Active Parking</div>
                    <div className="text-sm text-muted-foreground">Brigade Gateway</div>
                  </div>
                </div>
                <div className="text-2xl font-display font-bold text-primary mb-2">02:45:30</div>
                <p className="text-sm text-muted-foreground mb-4">Time remaining</p>
                <Button className="w-full" size="sm" onClick={handleExtendParking}>
                  Extend Parking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

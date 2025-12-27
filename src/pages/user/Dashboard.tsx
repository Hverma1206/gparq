import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, MapPin, Calendar, Wallet, Clock, ChevronRight, 
  Zap, Star, Bell, Search, Plus 
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  const stats = [
    { label: "Total Bookings", value: "24", icon: Calendar, color: "text-primary" },
    { label: "Active Parking", value: "1", icon: Car, color: "text-green-500" },
    { label: "Wallet Balance", value: "₹2,450", icon: Wallet, color: "text-blue-500" },
    { label: "Loyalty Points", value: "1,250", icon: Star, color: "text-yellow-500" },
  ];

  const recentBookings = [
    { id: 1, location: "Phoenix Mall Parking", date: "Dec 24, 2025", time: "2:00 PM - 5:00 PM", status: "Completed", amount: "₹120" },
    { id: 2, location: "Indiranagar Metro Station", date: "Dec 22, 2025", time: "9:00 AM - 6:00 PM", status: "Completed", amount: "₹350" },
    { id: 3, location: "Koramangala Tech Park", date: "Dec 20, 2025", time: "10:00 AM - 7:00 PM", status: "Completed", amount: "₹400" },
  ];

  const savedLocations = [
    { name: "Home", address: "123 MG Road, Bangalore" },
    { name: "Office", address: "Tech Park, Whitefield" },
    { name: "Gym", address: "Gold's Gym, Indiranagar" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, Rahul! 👋
            </h1>
            <p className="text-muted-foreground">
              Manage your parking, bookings, and wallet all in one place.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link to="/search">
              <Button size="lg" className="gap-2">
                <Search className="h-5 w-5" />
                Find Parking
              </Button>
            </Link>
            <Link to="/user/bookings">
              <Button variant="outline" size="lg" className="gap-2">
                <Calendar className="h-5 w-5" />
                My Bookings
              </Button>
            </Link>
            <Link to="/user/wallet">
              <Button variant="outline" size="lg" className="gap-2">
                <Wallet className="h-5 w-5" />
                Add Money
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
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
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
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
            </motion.div>

            {/* Saved Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-display text-xl">Saved Locations</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
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
                  <Button className="w-full" size="sm">
                    Extend Parking
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

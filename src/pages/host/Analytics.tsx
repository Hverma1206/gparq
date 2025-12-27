import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, TrendingDown, Users, Calendar, 
  Clock, Star
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const HostAnalytics = () => {
  const stats = [
    { label: "Total Bookings", value: "156", change: "+12%", up: true, icon: Calendar },
    { label: "Unique Users", value: "89", change: "+8%", up: true, icon: Users },
    { label: "Avg. Duration", value: "3.2 hrs", change: "-5%", up: false, icon: Clock },
    { label: "Avg. Rating", value: "4.8", change: "+0.2", up: true, icon: Star },
  ];

  const occupancyData = [
    { day: "Mon", rate: 65 },
    { day: "Tue", rate: 72 },
    { day: "Wed", rate: 68 },
    { day: "Thu", rate: 75 },
    { day: "Fri", rate: 82 },
    { day: "Sat", rate: 90 },
    { day: "Sun", rate: 85 },
  ];

  const peakHours = [
    { hour: "8 AM", bookings: 12 },
    { hour: "9 AM", bookings: 25 },
    { hour: "10 AM", bookings: 35 },
    { hour: "11 AM", bookings: 28 },
    { hour: "12 PM", bookings: 22 },
    { hour: "1 PM", bookings: 18 },
  ];

  const maxBookings = Math.max(...peakHours.map(h => h.bookings));

  const topLocations = [
    { name: "Forum Mall", bookings: 68, revenue: "₹8,450" },
    { name: "Brigade Gateway", bookings: 52, revenue: "₹6,200" },
    { name: "Indiranagar", bookings: 36, revenue: "₹3,800" },
  ];

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Insights and performance metrics for your parking spaces
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                  <span className={`text-sm flex items-center gap-1 ${stat.up ? "text-green-500" : "text-red-500"}`}>
                    {stat.up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {stat.change}
                  </span>
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Occupancy Rate */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Weekly Occupancy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-48">
                {occupancyData.map((day, index) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full h-40 bg-secondary rounded-t-lg relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${day.rate}%` }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        className="absolute bottom-0 w-full bg-primary rounded-t-lg"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                    <span className="text-xs font-medium">{day.rate}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Peak Hours */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Peak Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {peakHours.map((hour) => (
                  <div key={hour.hour} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-12">{hour.hour}</span>
                    <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(hour.bookings / maxBookings) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{hour.bookings}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Locations */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Top Performing Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLocations.map((location, index) => (
                <div
                  key={location.name}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-display font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{location.name}</div>
                      <div className="text-sm text-muted-foreground">{location.bookings} bookings this month</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-green-500">{location.revenue}</div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HostAnalytics;

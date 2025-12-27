import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, MapPin, IndianRupee, Calendar, TrendingUp,
  Search, Filter, MoreVertical, Eye, Ban, CheckCircle, XCircle
} from "lucide-react";
import Header from "@/components/layout/Header";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Users", value: "52,450", change: "+12%", icon: Users },
    { label: "Active Hosts", value: "1,250", change: "+8%", icon: MapPin },
    { label: "Revenue (MTD)", value: "₹12.5L", change: "+15%", icon: IndianRupee },
    { label: "Bookings Today", value: "1,842", change: "+22%", icon: Calendar },
  ];

  const recentActivities = [
    { id: 1, type: "user_signup", message: "New user registered: rahul@email.com", time: "2 mins ago" },
    { id: 2, type: "booking", message: "New booking at Forum Mall Parking", time: "5 mins ago" },
    { id: 3, type: "host_approval", message: "Host application approved: Phoenix Mall", time: "10 mins ago" },
    { id: 4, type: "dispute", message: "New dispute raised: Booking #PQ123456", time: "15 mins ago" },
    { id: 5, type: "payout", message: "Payout processed: ₹45,000 to Host #H1234", time: "20 mins ago" },
  ];

  const pendingApprovals = [
    { id: 1, name: "UB City Parking", host: "Prestige Group", spots: 100, status: "pending" },
    { id: 2, name: "Orion Mall Parking", host: "Brigade Group", spots: 75, status: "pending" },
    { id: 3, name: "Mantri Mall Parking", host: "Mantri Developers", spots: 60, status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Overview of platform performance and management
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                    <span className="text-sm text-green-500 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
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
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === "dispute" ? "bg-yellow-500/10" :
                            activity.type === "user_signup" ? "bg-green-500/10" : "bg-primary/10"
                          }`}>
                            {activity.type === "user_signup" && <Users className="h-5 w-5 text-green-500" />}
                            {activity.type === "booking" && <Calendar className="h-5 w-5 text-primary" />}
                            {activity.type === "host_approval" && <CheckCircle className="h-5 w-5 text-primary" />}
                            {activity.type === "dispute" && <XCircle className="h-5 w-5 text-yellow-500" />}
                            {activity.type === "payout" && <IndianRupee className="h-5 w-5 text-primary" />}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{activity.message}</div>
                            <div className="text-sm text-muted-foreground">{activity.time}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pending Approvals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-secondary/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-foreground">{item.name}</div>
                        <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                          Pending
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {item.host} • {item.spots} spots
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-destructive hover:text-destructive">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

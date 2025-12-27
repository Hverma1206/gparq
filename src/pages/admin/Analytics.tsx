import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Car, 
  IndianRupee, MapPin, Calendar, ArrowUpRight, ArrowDownRight,
  Download, RefreshCw, PieChart, Activity
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const revenueData = [
    { name: "Mon", revenue: 45000, bookings: 120 },
    { name: "Tue", revenue: 52000, bookings: 145 },
    { name: "Wed", revenue: 48000, bookings: 132 },
    { name: "Thu", revenue: 61000, bookings: 168 },
    { name: "Fri", revenue: 75000, bookings: 210 },
    { name: "Sat", revenue: 82000, bookings: 245 },
    { name: "Sun", revenue: 68000, bookings: 195 },
  ];

  const userGrowthData = [
    { month: "Jul", users: 12500, hosts: 450 },
    { month: "Aug", users: 15200, hosts: 520 },
    { month: "Sep", users: 18900, hosts: 610 },
    { month: "Oct", users: 22400, hosts: 720 },
    { month: "Nov", users: 27800, hosts: 850 },
    { month: "Dec", users: 32500, hosts: 980 },
  ];

  const cityData = [
    { name: "Bangalore", value: 45, color: "hsl(var(--primary))" },
    { name: "Mumbai", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Delhi", value: 15, color: "hsl(var(--chart-3))" },
    { name: "Chennai", value: 10, color: "hsl(var(--chart-4))" },
    { name: "Others", value: 5, color: "hsl(var(--chart-5))" },
  ];

  const stats = [
    { label: "Total Revenue", value: "₹4.31L", change: "+12.5%", positive: true, icon: IndianRupee },
    { label: "Total Bookings", value: "1,215", change: "+8.2%", positive: true, icon: Calendar },
    { label: "Active Users", value: "32.5K", change: "+15.3%", positive: true, icon: Users },
    { label: "Active Hosts", value: "980", change: "+5.7%", positive: true, icon: Car },
    { label: "Avg Booking Value", value: "₹355", change: "-2.1%", positive: false, icon: TrendingUp },
    { label: "Occupancy Rate", value: "78%", change: "+4.2%", positive: true, icon: Activity },
  ];

  const topLocations = [
    { name: "MG Road", bookings: 245, revenue: 87500, growth: 12 },
    { name: "Koramangala", bookings: 198, revenue: 72400, growth: 8 },
    { name: "Indiranagar", bookings: 176, revenue: 65800, growth: 15 },
    { name: "Whitefield", bookings: 154, revenue: 58200, growth: -3 },
    { name: "HSR Layout", bookings: 132, revenue: 48600, growth: 22 },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive platform insights and metrics</p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="secondary" className={stat.positive ? "text-green-500" : "text-red-500"}>
                    {stat.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Bookings</CardTitle>
              <CardDescription>Daily performance for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" name="Revenue (₹)" />
                  <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="hsl(var(--chart-2))" name="Bookings" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Growth */}
          <Card>
            <CardHeader>
              <CardTitle>User & Host Growth</CardTitle>
              <CardDescription>Platform growth over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Legend />
                  <Bar dataKey="users" fill="hsl(var(--primary))" name="Users" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hosts" fill="hsl(var(--chart-3))" name="Hosts" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Second Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* City Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>City Distribution</CardTitle>
              <CardDescription>Bookings by city</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPie>
                  <Pie
                    data={cityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {cityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPie>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Locations */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Performing Locations</CardTitle>
              <CardDescription>Highest revenue generating areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-muted-foreground">{location.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(location.revenue / 1000).toFixed(1)}K</p>
                      <Badge variant="secondary" className={location.growth >= 0 ? "text-green-500" : "text-red-500"}>
                        {location.growth >= 0 ? "+" : ""}{location.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <Tabs defaultValue="usage" className="space-y-4">
          <TabsList>
            <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Hours</CardTitle>
                <CardDescription>When users are most active on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-2">
                  {["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"].map((hour, index) => {
                    const intensity = [30, 65, 80, 55, 95, 70][index];
                    return (
                      <div key={hour} className="text-center">
                        <div 
                          className="h-24 rounded-lg mb-2 transition-all" 
                          style={{ 
                            backgroundColor: `hsl(var(--primary) / ${intensity / 100})`,
                          }}
                        />
                        <p className="text-sm font-medium">{hour}</p>
                        <p className="text-xs text-muted-foreground">{intensity}%</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retention">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-primary">68%</p>
                    <p className="text-sm text-muted-foreground">Day 1 Retention</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">45%</p>
                    <p className="text-sm text-muted-foreground">Day 7 Retention</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">32%</p>
                    <p className="text-sm text-muted-foreground">Day 30 Retention</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">24%</p>
                    <p className="text-sm text-muted-foreground">Day 90 Retention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-primary">12.5%</p>
                    <p className="text-sm text-muted-foreground">Visitor → Signup</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">45%</p>
                    <p className="text-sm text-muted-foreground">Signup → First Booking</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">72%</p>
                    <p className="text-sm text-muted-foreground">First → Second Booking</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">85%</p>
                    <p className="text-sm text-muted-foreground">Repeat User Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;

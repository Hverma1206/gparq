import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, TrendingUp, Users, IndianRupee, Star,
  Calendar, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const PartnerAnalytics = () => {
  const stats = [
    { label: "Total Jobs", value: "156", change: "+12%", up: true, icon: BarChart3 },
    { label: "Revenue", value: "₹45,200", change: "+8%", up: true, icon: IndianRupee },
    { label: "New Customers", value: "34", change: "+15%", up: true, icon: Users },
    { label: "Avg. Rating", value: "4.9", change: "+0.2", up: true, icon: Star },
  ];

  const weeklyData = [
    { day: "Mon", jobs: 8, revenue: 3200 },
    { day: "Tue", jobs: 12, revenue: 4800 },
    { day: "Wed", jobs: 10, revenue: 4000 },
    { day: "Thu", jobs: 15, revenue: 6000 },
    { day: "Fri", jobs: 18, revenue: 7200 },
    { day: "Sat", jobs: 22, revenue: 8800 },
    { day: "Sun", jobs: 14, revenue: 5600 },
  ];

  const topServices = [
    { name: "Premium Car Wash", jobs: 67, revenue: 33433, percent: 45 },
    { name: "Interior Cleaning", jobs: 34, revenue: 27166, percent: 30 },
    { name: "Basic Wash", jobs: 45, revenue: 11205, percent: 15 },
    { name: "Detailing", jobs: 10, revenue: 8990, percent: 10 },
  ];

  const peakHours = [
    { hour: "8-10 AM", jobs: 12 },
    { hour: "10-12 PM", jobs: 18 },
    { hour: "12-2 PM", jobs: 8 },
    { hour: "2-4 PM", jobs: 15 },
    { hour: "4-6 PM", jobs: 22 },
    { hour: "6-8 PM", jobs: 16 },
  ];

  const maxJobs = Math.max(...weeklyData.map(d => d.jobs));

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Analytics
            </h1>
            <p className="text-muted-foreground">
              Track your business performance
            </p>
          </div>
          <Select defaultValue="30d">
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                  <span className={`flex items-center text-sm ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
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
          {/* Weekly Performance */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-48 gap-2">
                {weeklyData.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden"
                      style={{ height: `${(day.jobs / maxJobs) * 100}%` }}
                    >
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all"
                        style={{ height: `${(day.jobs / maxJobs) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  Jobs Completed
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Top Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topServices.map((service, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{service.name}</span>
                    <span className="text-sm text-muted-foreground">{service.jobs} jobs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${service.percent}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-primary w-20 text-right">
                      ₹{service.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Peak Hours */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Peak Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {peakHours.map((hour, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-20 text-sm text-muted-foreground">{hour.hour}</span>
                  <div className="flex-1 h-6 bg-secondary rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-primary/60 rounded-lg flex items-center justify-end px-2"
                      style={{ width: `${(hour.jobs / 22) * 100}%` }}
                    >
                      <span className="text-xs text-primary-foreground font-medium">{hour.jobs}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Customer Insights */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Customer Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <div className="font-display text-2xl font-bold text-foreground">78%</div>
                  <div className="text-sm text-muted-foreground">Repeat Customers</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <div className="font-display text-2xl font-bold text-foreground">4.2 min</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <div className="font-display text-2xl font-bold text-foreground">₹420</div>
                  <div className="text-sm text-muted-foreground">Avg. Order Value</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 text-center">
                  <div className="font-display text-2xl font-bold text-foreground">96%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PartnerAnalytics;

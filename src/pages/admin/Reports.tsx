import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, FileText, BarChart3, TrendingUp, Users, 
  Car, IndianRupee, Calendar, Filter
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminReports = () => {
  const reports = [
    { 
      id: 1, 
      name: "Monthly Revenue Report", 
      description: "Detailed breakdown of revenue by source",
      type: "financial",
      lastGenerated: "Dec 26, 2025",
      icon: IndianRupee,
    },
    { 
      id: 2, 
      name: "User Growth Report", 
      description: "New signups, active users, and retention metrics",
      type: "users",
      lastGenerated: "Dec 25, 2025",
      icon: Users,
    },
    { 
      id: 3, 
      name: "Booking Analytics", 
      description: "Booking trends, peak hours, and popular locations",
      type: "bookings",
      lastGenerated: "Dec 27, 2025",
      icon: Car,
    },
    { 
      id: 4, 
      name: "Host Performance Report", 
      description: "Host earnings, ratings, and response times",
      type: "hosts",
      lastGenerated: "Dec 24, 2025",
      icon: BarChart3,
    },
    { 
      id: 5, 
      name: "Platform Health Report", 
      description: "System uptime, error rates, and performance metrics",
      type: "system",
      lastGenerated: "Dec 27, 2025",
      icon: TrendingUp,
    },
  ];

  const quickStats = [
    { label: "Total Revenue (Dec)", value: "₹24,56,780", change: "+12%" },
    { label: "Active Users", value: "12,456", change: "+8%" },
    { label: "Total Bookings", value: "8,234", change: "+15%" },
    { label: "Avg. Rating", value: "4.7", change: "+0.2" },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground">
              Generate and download platform reports
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="dec-2025">
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dec-2025">December 2025</SelectItem>
                <SelectItem value="nov-2025">November 2025</SelectItem>
                <SelectItem value="oct-2025">October 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="flex items-end justify-between">
                  <span className="font-display text-2xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-green-500 text-sm">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Available Reports */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Available Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <report.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{report.name}</div>
                    <div className="text-sm text-muted-foreground">{report.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Last generated</div>
                    <div className="text-sm text-foreground">{report.lastGenerated}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <BarChart3 className="w-4 h-4" /> View
                    </Button>
                    <Button size="sm" className="gap-2">
                      <Download className="w-4 h-4" /> Export
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Custom Report */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Generate Custom Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="bookings">Bookings</SelectItem>
                  <SelectItem value="hosts">Hosts</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2">
                <FileText className="w-4 h-4" /> Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;

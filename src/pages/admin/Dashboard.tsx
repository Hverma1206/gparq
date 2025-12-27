import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, MapPin, IndianRupee, Calendar, TrendingUp,
  Eye, CheckCircle, XCircle, AlertTriangle, BarChart3, Shield
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Users", value: "52,450", change: "+12%", icon: Users },
    { label: "Active Hosts", value: "1,250", change: "+8%", icon: MapPin },
    { label: "Revenue (MTD)", value: "₹12.5L", change: "+15%", icon: IndianRupee },
    { label: "Bookings Today", value: "1,842", change: "+22%", icon: Calendar },
  ];

  const quickLinks = [
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3, color: "bg-blue-500/10 text-blue-500" },
    { label: "Fraud Detection", href: "/admin/fraud", icon: AlertTriangle, color: "bg-red-500/10 text-red-500" },
    { label: "Roles & Permissions", href: "/admin/roles", icon: Shield, color: "bg-purple-500/10 text-purple-500" },
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

  const handleApprove = (name: string) => toast.success(`${name} approved`);
  const handleReject = (name: string) => toast.error(`${name} rejected`);
  const handleView = (id: number) => toast.info(`Viewing activity ${id}`);

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of platform performance and management
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.href}>
              <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${link.color}`}>
                    <link.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{link.label}</p>
                    <p className="text-sm text-muted-foreground">View details</p>
                  </div>
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
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
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
                      <Button variant="ghost" size="icon" onClick={() => handleView(activity.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Approvals */}
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
                    <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">
                      Pending
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {item.host} • {item.spots} spots
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => handleApprove(item.name)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-destructive hover:text-destructive" onClick={() => handleReject(item.name)}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

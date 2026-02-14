import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, MapPin, IndianRupee, Calendar, TrendingUp,
  Eye, CheckCircle, XCircle, AlertTriangle, BarChart3, Shield, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { useAdminStats, useRecentActivity } from "@/hooks/useAdminStats";
import { useParkingSpots } from "@/hooks/useParkingSpots";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

const AdminDashboard = () => {
  const { data: adminStats, isLoading } = useAdminStats();
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity();

  const quickLinks = [
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3, color: "bg-blue-500/10 text-blue-500" },
    { label: "Fraud Detection", href: "/admin/fraud", icon: AlertTriangle, color: "bg-red-500/10 text-red-500" },
    { label: "Roles & Permissions", href: "/admin/roles", icon: Shield, color: "bg-purple-500/10 text-purple-500" },
  ];

  const stats = [
    { label: "Total Users", value: adminStats?.totalUsers?.toLocaleString() || "0", icon: Users },
    { label: "Active Hosts", value: adminStats?.activeHosts?.toLocaleString() || "0", icon: MapPin },
    { label: "Revenue (MTD)", value: `₹${(adminStats?.monthlyRevenue || 0).toLocaleString()}`, icon: IndianRupee },
    { label: "Bookings Today", value: adminStats?.todayBookings?.toLocaleString() || "0", icon: Calendar },
  ];

  const handleApprove = async (id: string, name: string) => {
    const { error } = await supabase
      .from("parking_spots")
      .update({ is_active: true })
      .eq("id", id);
    if (error) {
      toast.error("Failed to approve");
    } else {
      toast.success(`${name} approved`);
    }
  };

  const handleReject = async (id: string, name: string) => {
    const { error } = await supabase
      .from("parking_spots")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Failed to reject");
    } else {
      toast.error(`${name} rejected`);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout type="admin">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

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
                {activityLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : recentActivity && recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === "user_signup" ? "bg-green-500/10" : "bg-primary/10"
                          }`}>
                            {activity.type === "user_signup" ? (
                              <Users className="h-5 w-5 text-green-500" />
                            ) : (
                              <Calendar className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{activity.message}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent activity
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Pending Approvals */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {adminStats?.pendingApprovals && adminStats.pendingApprovals.length > 0 ? (
                adminStats.pendingApprovals.map((item: any) => (
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
                      {item.total_spots || 0} spots
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => handleApprove(item.id, item.name)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-destructive hover:text-destructive" onClick={() => handleReject(item.id, item.name)}>
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No pending approvals
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

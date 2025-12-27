import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wrench, IndianRupee, Calendar, Star, TrendingUp, 
  Clock, CheckCircle, XCircle, ChevronRight 
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const PartnerDashboard = () => {
  const stats = [
    { label: "Total Services", value: "156", icon: Wrench, color: "text-primary", change: "+12%" },
    { label: "This Month", value: "₹45,200", icon: IndianRupee, color: "text-green-500", change: "+8%" },
    { label: "Pending Jobs", value: "5", icon: Clock, color: "text-amber-500", change: "" },
    { label: "Rating", value: "4.8", icon: Star, color: "text-yellow-500", change: "" },
  ];

  const recentJobs = [
    { id: 1, service: "Premium Car Wash", vehicle: "Honda City - KA 01 AB 1234", customer: "Rahul S.", amount: "₹499", status: "completed", time: "2 hours ago" },
    { id: 2, service: "EV Charging", vehicle: "Tata Nexon EV - KA 05 CD 5678", customer: "Priya M.", amount: "₹350", status: "in-progress", time: "Active" },
    { id: 3, service: "Interior Cleaning", vehicle: "Maruti Swift - KA 03 EF 9012", customer: "Amit K.", amount: "₹799", status: "pending", time: "In 1 hour" },
    { id: 4, service: "Basic Wash", vehicle: "Hyundai i20 - KA 02 GH 3456", customer: "Sneha R.", amount: "₹249", status: "completed", time: "Yesterday" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="flex items-center gap-1 text-green-500 text-sm"><CheckCircle className="w-4 h-4" /> Completed</span>;
      case "in-progress":
        return <span className="flex items-center gap-1 text-blue-500 text-sm"><Clock className="w-4 h-4" /> In Progress</span>;
      case "pending":
        return <span className="flex items-center gap-1 text-amber-500 text-sm"><Clock className="w-4 h-4" /> Pending</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, Quick Wash! 👋
          </h1>
          <p className="text-muted-foreground">
            Manage your services, track earnings, and grow your business.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  {stat.change && (
                    <span className="flex items-center text-green-500 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />{stat.change}
                    </span>
                  )}
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="gap-2">
            <Wrench className="h-5 w-5" />
            View Jobs
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Calendar className="h-5 w-5" />
            Schedule
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <IndianRupee className="h-5 w-5" />
            Earnings
          </Button>
        </div>

        {/* Recent Jobs */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-xl">Recent Jobs</CardTitle>
            <Link to="/partner/jobs" className="text-primary text-sm hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Wrench className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{job.service}</div>
                      <div className="text-sm text-muted-foreground">
                        {job.vehicle} • {job.customer}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">{job.amount}</div>
                    {getStatusBadge(job.status)}
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

export default PartnerDashboard;

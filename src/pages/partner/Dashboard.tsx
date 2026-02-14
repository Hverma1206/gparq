import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wrench, IndianRupee, Calendar, Star, TrendingUp, 
  Clock, CheckCircle, ChevronRight, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

const PartnerDashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["partner-jobs", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("partner_jobs")
        .select("*")
        .eq("partner_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: services } = useQuery({
    queryKey: ["partner-services", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("partner_services")
        .select("*")
        .eq("partner_id", user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: reviews } = useQuery({
    queryKey: ["partner-reviews", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("reviewee_id", user.id)
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const totalEarnings = jobs?.filter(j => j.status === "completed").reduce((sum, j) => sum + Number(j.amount), 0) || 0;
  const pendingJobs = jobs?.filter(j => j.status === "pending").length || 0;
  const avgRating = reviews && reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : "0";

  const stats = [
    { label: "Total Services", value: services?.length?.toString() || "0", icon: Wrench, color: "text-primary" },
    { label: "Earnings", value: `₹${totalEarnings.toLocaleString()}`, icon: IndianRupee, color: "text-green-500" },
    { label: "Pending Jobs", value: pendingJobs.toString(), icon: Clock, color: "text-amber-500" },
    { label: "Rating", value: avgRating, icon: Star, color: "text-yellow-500" },
  ];

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Partner";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <span className="flex items-center gap-1 text-green-500 text-sm"><CheckCircle className="w-4 h-4" /> Completed</span>;
      case "in-progress": return <span className="flex items-center gap-1 text-blue-500 text-sm"><Clock className="w-4 h-4" /> In Progress</span>;
      case "pending": return <span className="flex items-center gap-1 text-amber-500 text-sm"><Clock className="w-4 h-4" /> Pending</span>;
      default: return null;
    }
  };

  if (jobsLoading) {
    return (
      <DashboardLayout type="partner">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, {displayName}! 👋
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
          <Link to="/partner/jobs"><Button size="lg" className="gap-2"><Wrench className="h-5 w-5" /> View Jobs</Button></Link>
          <Link to="/partner/services"><Button variant="outline" size="lg" className="gap-2"><Calendar className="h-5 w-5" /> Services</Button></Link>
          <Link to="/partner/earnings"><Button variant="outline" size="lg" className="gap-2"><IndianRupee className="h-5 w-5" /> Earnings</Button></Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Jobs */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-xl">Recent Jobs</CardTitle>
              <Link to="/partner/jobs" className="text-primary text-sm hover:underline flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent>
              {jobs && jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.slice(0, 4).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Wrench className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Job #{job.id.slice(0, 8)}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">₹{Number(job.amount).toLocaleString()}</div>
                        {getStatusBadge(job.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No jobs yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-xl">Recent Reviews</CardTitle>
              <Link to="/partner/reviews" className="text-primary text-sm hover:underline flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </CardHeader>
            <CardContent>
              {reviews && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No reviews yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PartnerDashboard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  IndianRupee, ArrowUpRight,
  Download, Wallet, CreditCard, Loader2, Wrench
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

const PartnerEarnings = () => {
  const { user } = useAuth();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["partner-earnings-jobs", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("partner_jobs")
        .select("*")
        .eq("partner_id", user.id)
        .eq("status", "completed")
        .order("completed_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const totalEarnings = jobs?.reduce((sum, j) => sum + Number(j.amount), 0) || 0;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthJobs = jobs?.filter(j => j.completed_at && new Date(j.completed_at) >= startOfMonth) || [];
  const thisMonthEarnings = thisMonthJobs.reduce((sum, j) => sum + Number(j.amount), 0);

  const stats = [
    { label: "Total Earnings", value: `₹${totalEarnings.toLocaleString()}` },
    { label: "This Month", value: `₹${thisMonthEarnings.toLocaleString()}` },
    { label: "Completed Jobs", value: jobs?.length?.toString() || "0" },
    { label: "This Month Jobs", value: thisMonthJobs.length.toString() },
  ];

  if (isLoading) {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Earnings</h1>
            <p className="text-muted-foreground">Track your income from completed jobs</p>
          </div>
          <Button variant="outline" className="gap-2" onClick={() => toast.success("Export started")}>
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <IndianRupee className="h-6 w-6 text-primary" />
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completed Jobs as Transactions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Completed Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(jobs || []).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No completed jobs yet</p>
              </div>
            ) : (
              (jobs || []).slice(0, 20).map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Job #{job.id.slice(0, 8)}</div>
                      <div className="text-sm text-muted-foreground">
                        {job.completed_at ? format(new Date(job.completed_at), "MMM d, yyyy") : "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="text-green-500 font-medium">+₹{Number(job.amount).toLocaleString()}</div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerEarnings;

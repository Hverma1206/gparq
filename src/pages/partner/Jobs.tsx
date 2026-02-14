import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, Clock, CheckCircle, Phone, 
  Car, Calendar, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

const PartnerJobs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["partner-jobs-all", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("partner_jobs")
        .select("*")
        .eq("partner_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const handleAccept = async (id: string) => {
    const { error } = await supabase
      .from("partner_jobs")
      .update({ status: "in-progress" })
      .eq("id", id);
    if (error) toast.error("Failed to accept job");
    else {
      toast.success("Job accepted!");
      queryClient.invalidateQueries({ queryKey: ["partner-jobs-all"] });
    }
  };

  const handleComplete = async (id: string) => {
    const { error } = await supabase
      .from("partner_jobs")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", id);
    if (error) toast.error("Failed to complete job");
    else {
      toast.success("Job completed!");
      queryClient.invalidateQueries({ queryKey: ["partner-jobs-all"] });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      case "in-progress": return <Badge variant="outline" className="border-blue-500 text-blue-500">In Progress</Badge>;
      case "completed": return <Badge variant="outline" className="border-green-500 text-green-500">Completed</Badge>;
      case "cancelled": return <Badge variant="outline" className="border-destructive text-destructive">Cancelled</Badge>;
      default: return null;
    }
  };

  const filterJobs = (status: string) => {
    if (status === "all") return jobs || [];
    return (jobs || []).filter(j => j.status === status);
  };

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
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Service Jobs</h1>
          <p className="text-muted-foreground">Manage your pending and completed service requests</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({(jobs || []).length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({filterJobs("pending").length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({filterJobs("in-progress").length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({filterJobs("completed").length})</TabsTrigger>
          </TabsList>

          {["all", "pending", "in-progress", "completed"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filterJobs(tab).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No {tab === "all" ? "" : tab} jobs</p>
                </div>
              ) : (
                filterJobs(tab).map((job) => (
                  <Card key={job.id} className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Wrench className="h-7 w-7 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="font-display text-lg font-semibold text-foreground">
                                Job #{job.id.slice(0, 8)}
                              </span>
                              {getStatusBadge(job.status)}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(job.created_at), "MMM d, yyyy h:mm a")}
                              </div>
                              {job.notes && (
                                <div className="text-sm text-muted-foreground">{job.notes}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-display text-xl font-bold text-foreground">₹{Number(job.amount).toLocaleString()}</div>
                          </div>
                          <div className="flex gap-2">
                            {job.status === "pending" && (
                              <Button onClick={() => handleAccept(job.id)}>Accept</Button>
                            )}
                            {job.status === "in-progress" && (
                              <Button onClick={() => handleComplete(job.id)}>Complete</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerJobs;

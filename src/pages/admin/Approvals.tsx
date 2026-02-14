import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, XCircle, Clock, Search, Eye,
  Building, User, MapPin, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

const AdminApprovals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const { data: spots, isLoading } = useQuery({
    queryKey: ["admin-all-spots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parking_spots")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const pendingSpots = spots?.filter(s => !s.is_active) || [];
  const approvedSpots = spots?.filter(s => s.is_active) || [];

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from("parking_spots")
      .update({ is_active: true })
      .eq("id", id);
    if (error) {
      toast.error("Failed to approve");
    } else {
      toast.success("Listing approved!");
      queryClient.invalidateQueries({ queryKey: ["admin-all-spots"] });
    }
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from("parking_spots")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Failed to reject");
    } else {
      toast.error("Listing rejected");
      queryClient.invalidateQueries({ queryKey: ["admin-all-spots"] });
    }
  };

  const getStatusBadge = (active: boolean) => {
    return active 
      ? <Badge className="bg-green-500/10 text-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Active</Badge>
      : <Badge className="bg-yellow-500/10 text-yellow-500"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
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
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Host Approvals
          </h1>
          <p className="text-muted-foreground">
            Review and approve parking spot listings
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="font-display text-2xl font-bold">{pendingSpots.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Approved</span>
              </div>
              <p className="font-display text-2xl font-bold">{approvedSpots.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
              <p className="font-display text-2xl font-bold">{spots?.length || 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or city..."
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingSpots.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedSpots.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4 space-y-4">
            {pendingSpots.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No pending approvals</p>
              </div>
            ) : (
              pendingSpots
                .filter(s => !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.city.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((spot, index) => (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusBadge(false)}
                          </div>
                          <h3 className="font-medium text-lg">{spot.name}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" /> {spot.address}, {spot.city}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" /> {spot.total_spots} spots
                            </div>
                            <span>₹{Number(spot.price_per_hour)}/hr</span>
                            <span>Created: {format(new Date(spot.created_at), "MMM d, yyyy")}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="destructive" onClick={() => handleReject(spot.id)}>
                            <XCircle className="h-4 w-4 mr-2" /> Reject
                          </Button>
                          <Button onClick={() => handleApprove(spot.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" /> Approve
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="mt-4 space-y-4">
            {approvedSpots.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No approved listings yet</div>
            ) : (
              approvedSpots
                .filter(s => !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((spot) => (
                <Card key={spot.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{spot.name}</h3>
                          {getStatusBadge(true)}
                        </div>
                        <p className="text-sm text-muted-foreground">{spot.address}, {spot.city} • {spot.total_spots} spots • ₹{Number(spot.price_per_hour)}/hr</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminApprovals;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Droplets, Zap, Wrench, Plus, Edit2, Trash2, 
  IndianRupee, CheckCircle, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PartnerServices = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: "", service_type: "wash", description: "" });

  const { data: services, isLoading } = useQuery({
    queryKey: ["partner-services-all", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("partner_services")
        .select("*")
        .eq("partner_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const handleAdd = async () => {
    if (!user?.id || !newService.name || !newService.price) return;
    const { error } = await supabase.from("partner_services").insert({
      partner_id: user.id,
      name: newService.name,
      price: parseFloat(newService.price),
      service_type: newService.service_type,
      description: newService.description || null,
    });
    if (error) toast.error("Failed to add service");
    else {
      toast.success("Service added!");
      queryClient.invalidateQueries({ queryKey: ["partner-services-all"] });
      setNewService({ name: "", price: "", service_type: "wash", description: "" });
      setIsDialogOpen(false);
    }
  };

  const toggleService = async (id: string, currentActive: boolean) => {
    const { error } = await supabase
      .from("partner_services")
      .update({ is_active: !currentActive })
      .eq("id", id);
    if (error) toast.error("Failed to update");
    else {
      queryClient.invalidateQueries({ queryKey: ["partner-services-all"] });
      toast.success("Service updated");
    }
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from("partner_services").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else {
      queryClient.invalidateQueries({ queryKey: ["partner-services-all"] });
      toast.success("Service deleted");
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case "wash": return <Droplets className="w-5 h-5" />;
      case "ev": return <Zap className="w-5 h-5" />;
      default: return <Wrench className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case "wash": return "bg-blue-500/10 text-blue-500";
      case "ev": return "bg-green-500/10 text-green-500";
      default: return "bg-amber-500/10 text-amber-500";
    }
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">My Services</h1>
            <p className="text-muted-foreground">Manage the services you offer</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="w-4 h-4" /> Add Service</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Service</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Service Name</Label>
                  <Input placeholder="e.g., Premium Car Wash" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" placeholder="499" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newService.service_type} onValueChange={(v) => setNewService({ ...newService, service_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wash">Car Wash</SelectItem>
                      <SelectItem value="ev">EV Charging</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="valet">Valet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description (optional)</Label>
                  <Input placeholder="Service description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
                </div>
                <Button className="w-full" onClick={handleAdd}>Add Service</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="font-display text-3xl font-bold text-foreground">{(services || []).length}</div>
              <div className="text-sm text-muted-foreground">Total Services</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="font-display text-3xl font-bold text-green-500">{(services || []).filter(s => s.is_active).length}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="font-display text-3xl font-bold text-foreground">{(services || []).filter(s => !s.is_active).length}</div>
              <div className="text-sm text-muted-foreground">Inactive</div>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="font-display text-xl">Services</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {(services || []).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No services added yet</p>
              </div>
            ) : (
              (services || []).map((service) => (
                <div
                  key={service.id}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    service.is_active ? 'bg-secondary/50 border-border' : 'bg-muted/30 border-border/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryColor(service.service_type)}`}>
                      {getCategoryIcon(service.service_type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${service.is_active ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {service.name}
                        </span>
                        {!service.is_active && <Badge variant="secondary">Inactive</Badge>}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{Number(service.price)}</span>
                        <span>{service.service_type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch checked={service.is_active ?? false} onCheckedChange={() => toggleService(service.id, service.is_active ?? false)} />
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteService(service.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerServices;

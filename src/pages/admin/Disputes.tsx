import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  AlertTriangle, MessageSquare, Clock, CheckCircle, 
  Search, Filter, Eye, User, Building, IndianRupee
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const AdminDisputes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [resolution, setResolution] = useState("");

  const stats = {
    total: 45,
    open: 12,
    investigating: 8,
    resolved: 25,
  };

  const disputes = [
    {
      id: "DSP-2024-001",
      type: "Damage Claim",
      user: "Rahul S.",
      host: "Forum Mall Parking",
      bookingId: "BKG-2024-001",
      amount: 5000,
      date: "Dec 26, 2025",
      status: "open",
      priority: "high",
      description: "Scratch found on car bumper after parking",
    },
    {
      id: "DSP-2024-002",
      type: "Overcharge",
      user: "Priya M.",
      host: "Brigade Gateway",
      bookingId: "BKG-2024-002",
      amount: 120,
      date: "Dec 25, 2025",
      status: "investigating",
      priority: "medium",
      description: "Charged extra ₹120 beyond booking duration",
    },
    {
      id: "DSP-2024-003",
      type: "Service Issue",
      user: "Amit K.",
      host: "UB City Parking",
      bookingId: "BKG-2024-003",
      amount: 0,
      date: "Dec 24, 2025",
      status: "resolved",
      priority: "low",
      description: "Parking spot was not available despite booking",
    },
    {
      id: "DSP-2024-004",
      type: "Refund Request",
      user: "Neha R.",
      host: "Phoenix Marketcity",
      bookingId: "BKG-2024-004",
      amount: 180,
      date: "Dec 23, 2025",
      status: "open",
      priority: "medium",
      description: "Booking cancelled but refund not received",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-yellow-500">Open</Badge>;
      case "investigating":
        return <Badge className="bg-blue-500">Investigating</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const handleResolve = () => {
    if (!resolution.trim()) {
      toast.error("Please enter resolution details");
      return;
    }
    console.log(`Resolving dispute: ${selectedDispute?.id}`);
    toast.success("Dispute resolved successfully");
    setSelectedDispute(null);
    setResolution("");
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Dispute Center
          </h1>
          <p className="text-muted-foreground">
            Manage and resolve customer disputes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Open</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.open}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Investigating</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.investigating}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Resolved</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.resolved}</p>
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
              placeholder="Search disputes..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Disputes List */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open ({stats.open})</TabsTrigger>
            <TabsTrigger value="investigating">Investigating</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            {disputes.map((dispute, index) => (
              <motion.div
                key={dispute.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm">{dispute.id}</span>
                          {getStatusBadge(dispute.status)}
                          {getPriorityBadge(dispute.priority)}
                        </div>
                        <h3 className="font-medium text-lg mb-1">{dispute.type}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{dispute.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{dispute.user}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{dispute.host}</span>
                          </div>
                          {dispute.amount > 0 && (
                            <div className="flex items-center gap-1">
                              <IndianRupee className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">₹{dispute.amount}</span>
                            </div>
                          )}
                          <span className="text-muted-foreground">{dispute.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => setSelectedDispute(dispute)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View & Resolve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="open" className="mt-4">
            <p className="text-muted-foreground text-center py-8">Showing open disputes</p>
          </TabsContent>
          <TabsContent value="investigating" className="mt-4">
            <p className="text-muted-foreground text-center py-8">Showing disputes under investigation</p>
          </TabsContent>
          <TabsContent value="resolved" className="mt-4">
            <p className="text-muted-foreground text-center py-8">Showing resolved disputes</p>
          </TabsContent>
        </Tabs>

        {/* Resolve Dialog */}
        <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Resolve Dispute</DialogTitle>
            </DialogHeader>
            {selectedDispute && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm">{selectedDispute.id}</span>
                    {getStatusBadge(selectedDispute.status)}
                  </div>
                  <p className="font-medium">{selectedDispute.type}</p>
                  <p className="text-sm text-muted-foreground">{selectedDispute.description}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Resolution Notes</label>
                  <Textarea
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    placeholder="Enter resolution details..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedDispute(null)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleResolve}>
                    Mark as Resolved
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminDisputes;

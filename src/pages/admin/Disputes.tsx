import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  AlertTriangle, MessageSquare, Clock, CheckCircle, 
  Search, Filter, Eye, User, Building, IndianRupee,
  Plus, MoreVertical, ArrowUp, Trash2, UserPlus, Scale
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface Dispute {
  id: string;
  type: string;
  user: string;
  userEmail: string;
  host: string;
  bookingId: string;
  amount: number;
  compensationAmount?: number;
  date: string;
  status: "open" | "investigating" | "resolved" | "closed";
  priority: "high" | "medium" | "low";
  description: string;
  assignedTo?: string;
  resolution?: string;
  evidence?: string[];
}

const AdminDisputes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [resolution, setResolution] = useState("");
  const [compensationAmount, setCompensationAmount] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);

  const [disputeForm, setDisputeForm] = useState({
    type: "",
    user: "",
    userEmail: "",
    host: "",
    bookingId: "",
    amount: "",
    description: "",
    priority: "medium" as Dispute["priority"],
  });

  const agents = ["Rahul S.", "Priya M.", "Amit K.", "Neha R."];

  const stats = {
    total: 45,
    open: 12,
    investigating: 8,
    resolved: 25,
  };

  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: "DSP-2024-001",
      type: "Damage Claim",
      user: "Rahul S.",
      userEmail: "rahul@email.com",
      host: "Forum Mall Parking",
      bookingId: "BKG-2024-001",
      amount: 5000,
      date: "Dec 26, 2025",
      status: "open",
      priority: "high",
      description: "Scratch found on car bumper after parking",
      evidence: ["photo1.jpg", "photo2.jpg"],
    },
    {
      id: "DSP-2024-002",
      type: "Overcharge",
      user: "Priya M.",
      userEmail: "priya@email.com",
      host: "Brigade Gateway",
      bookingId: "BKG-2024-002",
      amount: 120,
      date: "Dec 25, 2025",
      status: "investigating",
      priority: "medium",
      description: "Charged extra ₹120 beyond booking duration",
      assignedTo: "Amit K.",
    },
    {
      id: "DSP-2024-003",
      type: "Service Issue",
      user: "Amit K.",
      userEmail: "amit@email.com",
      host: "UB City Parking",
      bookingId: "BKG-2024-003",
      amount: 0,
      date: "Dec 24, 2025",
      status: "resolved",
      priority: "low",
      description: "Parking spot was not available despite booking",
      assignedTo: "Priya M.",
      resolution: "Full refund provided and ₹100 credit added",
      compensationAmount: 100,
    },
    {
      id: "DSP-2024-004",
      type: "Refund Request",
      user: "Neha R.",
      userEmail: "neha@email.com",
      host: "Phoenix Marketcity",
      bookingId: "BKG-2024-004",
      amount: 180,
      date: "Dec 23, 2025",
      status: "open",
      priority: "medium",
      description: "Booking cancelled but refund not received",
    },
  ]);

  const disputeTypes = ["Damage Claim", "Overcharge", "Service Issue", "Refund Request", "Safety Concern", "Other"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-yellow-500">Open</Badge>;
      case "investigating":
        return <Badge className="bg-blue-500">Investigating</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
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

  const handleCreateDispute = () => {
    const newDispute: Dispute = {
      id: `DSP-2024-${String(disputes.length + 1).padStart(3, "0")}`,
      type: disputeForm.type,
      user: disputeForm.user,
      userEmail: disputeForm.userEmail,
      host: disputeForm.host,
      bookingId: disputeForm.bookingId,
      amount: parseFloat(disputeForm.amount) || 0,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "open",
      priority: disputeForm.priority,
      description: disputeForm.description,
    };
    setDisputes([newDispute, ...disputes]);
    setShowCreateDialog(false);
    setDisputeForm({ type: "", user: "", userEmail: "", host: "", bookingId: "", amount: "", description: "", priority: "medium" });
    toast.success("Dispute created successfully");
  };

  const handleResolve = () => {
    if (!resolution.trim() || !selectedDispute) return;
    
    setDisputes(disputes.map(d => 
      d.id === selectedDispute.id 
        ? { 
            ...d, 
            status: "resolved" as const, 
            resolution, 
            compensationAmount: parseFloat(compensationAmount) || 0 
          } 
        : d
    ));
    setShowResolveDialog(false);
    setSelectedDispute(null);
    setResolution("");
    setCompensationAmount("");
    toast.success("Dispute resolved successfully");
  };

  const handleAssign = (disputeId: string, agent: string) => {
    setDisputes(disputes.map(d => 
      d.id === disputeId ? { ...d, assignedTo: agent, status: "investigating" as const } : d
    ));
    setShowAssignDialog(false);
    toast.success(`Dispute assigned to ${agent}`);
  };

  const handleEscalate = (disputeId: string) => {
    setDisputes(disputes.map(d => d.id === disputeId ? { ...d, priority: "high" as const } : d));
    toast.warning("Dispute escalated to high priority");
  };

  const handleClose = (disputeId: string) => {
    setDisputes(disputes.map(d => d.id === disputeId ? { ...d, status: "closed" as const } : d));
    toast.success("Dispute closed");
  };

  const handleDelete = (disputeId: string) => {
    setDisputes(disputes.filter(d => d.id !== disputeId));
    toast.success("Dispute deleted");
  };

  const filteredDisputes = disputes.filter(d => {
    const matchesSearch = d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Dispute Center
            </h1>
            <p className="text-muted-foreground">
              Manage and resolve customer disputes with full CRUD operations
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Dispute
          </Button>
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

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search disputes..."
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Disputes List */}
        <div className="space-y-4">
          {filteredDisputes.map((dispute, index) => (
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
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-mono text-sm">{dispute.id}</span>
                        {getStatusBadge(dispute.status)}
                        {getPriorityBadge(dispute.priority)}
                        <Badge variant="outline">{dispute.type}</Badge>
                      </div>
                      <h3 className="font-medium text-lg mb-1">{dispute.description}</h3>
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
                        {dispute.assignedTo && (
                          <span className="text-primary">Assigned: {dispute.assignedTo}</span>
                        )}
                      </div>
                      {dispute.resolution && (
                        <div className="mt-2 p-2 rounded bg-green-500/10 text-sm">
                          <span className="font-medium">Resolution: </span>
                          {dispute.resolution}
                          {dispute.compensationAmount && dispute.compensationAmount > 0 && (
                            <span className="ml-2 text-green-600">+₹{dispute.compensationAmount} compensation</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedDispute(dispute); setShowAssignDialog(true); }}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign Agent
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEscalate(dispute.id)}>
                            <ArrowUp className="h-4 w-4 mr-2" />
                            Escalate
                          </DropdownMenuItem>
                          {dispute.status !== "resolved" && dispute.status !== "closed" && (
                            <DropdownMenuItem onClick={() => { setSelectedDispute(dispute); setShowResolveDialog(true); }}>
                              <Scale className="h-4 w-4 mr-2" />
                              Resolve with Compensation
                            </DropdownMenuItem>
                          )}
                          {dispute.status === "resolved" && (
                            <DropdownMenuItem onClick={() => handleClose(dispute.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Close Dispute
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(dispute.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Create Dispute Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Dispute</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Dispute Type</Label>
                  <Select value={disputeForm.type} onValueChange={(v) => setDisputeForm({...disputeForm, type: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {disputeTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select value={disputeForm.priority} onValueChange={(v) => setDisputeForm({...disputeForm, priority: v as Dispute["priority"]})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>User Name</Label>
                  <Input 
                    value={disputeForm.user} 
                    onChange={(e) => setDisputeForm({...disputeForm, user: e.target.value})}
                    placeholder="User name"
                  />
                </div>
                <div>
                  <Label>User Email</Label>
                  <Input 
                    value={disputeForm.userEmail} 
                    onChange={(e) => setDisputeForm({...disputeForm, userEmail: e.target.value})}
                    placeholder="user@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Host/Location</Label>
                  <Input 
                    value={disputeForm.host} 
                    onChange={(e) => setDisputeForm({...disputeForm, host: e.target.value})}
                    placeholder="Host name"
                  />
                </div>
                <div>
                  <Label>Booking ID</Label>
                  <Input 
                    value={disputeForm.bookingId} 
                    onChange={(e) => setDisputeForm({...disputeForm, bookingId: e.target.value})}
                    placeholder="BKG-2024-001"
                  />
                </div>
              </div>
              <div>
                <Label>Claimed Amount (₹)</Label>
                <Input 
                  type="number"
                  value={disputeForm.amount} 
                  onChange={(e) => setDisputeForm({...disputeForm, amount: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  value={disputeForm.description} 
                  onChange={(e) => setDisputeForm({...disputeForm, description: e.target.value})}
                  placeholder="Detailed description of the dispute..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateDispute}>Create Dispute</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Resolve Dialog */}
        <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Resolve Dispute - {selectedDispute?.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedDispute && (
                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(selectedDispute.status)}
                    {getPriorityBadge(selectedDispute.priority)}
                  </div>
                  <p className="font-medium">{selectedDispute.type}</p>
                  <p className="text-sm text-muted-foreground">{selectedDispute.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>User: {selectedDispute.user}</span>
                    <span>Amount: ₹{selectedDispute.amount}</span>
                  </div>
                </div>
              )}
              
              <div>
                <Label>Resolution Notes</Label>
                <Textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  placeholder="Enter resolution details..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label>Compensation Amount (₹) - Optional</Label>
                <Input
                  type="number"
                  value={compensationAmount}
                  onChange={(e) => setCompensationAmount(e.target.value)}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter amount to credit to user's wallet as compensation
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowResolveDialog(false)}>Cancel</Button>
              <Button onClick={handleResolve}>Mark as Resolved</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Assign Agent Dialog */}
        <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Assign Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select an agent to assign to dispute {selectedDispute?.id}
              </p>
              <div className="space-y-2">
                {agents.map((agent) => (
                  <Button
                    key={agent}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => selectedDispute && handleAssign(selectedDispute.id, agent)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {agent}
                  </Button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminDisputes;
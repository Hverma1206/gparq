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
  MessageCircle, Search, Clock, CheckCircle, User,
  Phone, Mail, MoreVertical, Send, Filter, Plus,
  AlertTriangle, ArrowUp, Trash2, Edit, UserPlus
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

interface Ticket {
  id: string;
  user: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  time: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "high" | "medium" | "low";
  category: string;
  assignedTo?: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  from: "admin" | "user";
  message: string;
  timestamp: string;
}

const AdminSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [reply, setReply] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  
  const [ticketForm, setTicketForm] = useState({
    user: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "medium" as Ticket["priority"],
    category: "",
  });

  const agents = ["Rahul S.", "Priya M.", "Amit K.", "Neha R."];

  const stats = {
    total: 156,
    open: 23,
    inProgress: 18,
    resolved: 115,
    avgResponseTime: "2.5 hrs",
  };

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TKT-2024-001",
      user: "Rahul S.",
      email: "rahul@email.com",
      phone: "+91 98765 43210",
      subject: "Unable to complete payment",
      message: "I tried to book a parking spot but the payment keeps failing. Please help.",
      date: "Dec 27, 2025",
      time: "10:30 AM",
      status: "open",
      priority: "high",
      category: "Payment",
      replies: [],
    },
    {
      id: "TKT-2024-002",
      user: "Priya M.",
      email: "priya@email.com",
      phone: "+91 98765 43211",
      subject: "Refund not received",
      message: "I cancelled my booking 3 days ago but haven't received the refund yet.",
      date: "Dec 26, 2025",
      time: "3:45 PM",
      status: "in_progress",
      priority: "medium",
      category: "Refund",
      assignedTo: "Amit K.",
      replies: [
        { id: "1", from: "admin", message: "We are looking into this issue. Your refund is being processed.", timestamp: "Dec 26, 4:00 PM" }
      ],
    },
    {
      id: "TKT-2024-003",
      user: "Amit K.",
      email: "amit@email.com",
      phone: "+91 98765 43212",
      subject: "App crashing on login",
      message: "The app crashes every time I try to login. Using iPhone 13.",
      date: "Dec 26, 2025",
      time: "11:00 AM",
      status: "open",
      priority: "medium",
      category: "Technical",
      replies: [],
    },
    {
      id: "TKT-2024-004",
      user: "Neha R.",
      email: "neha@email.com",
      phone: "+91 98765 43213",
      subject: "Wrong parking spot assigned",
      message: "I was assigned spot A-15 but it was already occupied.",
      date: "Dec 25, 2025",
      time: "6:00 PM",
      status: "resolved",
      priority: "low",
      category: "Booking",
      assignedTo: "Priya M.",
      replies: [
        { id: "1", from: "admin", message: "We apologize for the inconvenience. We have refunded your booking and added ₹50 credits.", timestamp: "Dec 25, 7:00 PM" },
        { id: "2", from: "user", message: "Thank you for the quick resolution!", timestamp: "Dec 25, 7:30 PM" }
      ],
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-yellow-500">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
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

  const handleCreateTicket = () => {
    const newTicket: Ticket = {
      id: `TKT-2024-${String(tickets.length + 1).padStart(3, "0")}`,
      user: ticketForm.user,
      email: ticketForm.email,
      phone: ticketForm.phone,
      subject: ticketForm.subject,
      message: ticketForm.message,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      status: "open",
      priority: ticketForm.priority,
      category: ticketForm.category,
      replies: [],
    };
    setTickets([newTicket, ...tickets]);
    setShowCreateDialog(false);
    setTicketForm({ user: "", email: "", phone: "", subject: "", message: "", priority: "medium", category: "" });
    toast.success("Ticket created successfully");
  };

  const handleReply = () => {
    if (!reply.trim() || !selectedTicket) return;
    
    const newReply: Reply = {
      id: String(selectedTicket.replies.length + 1),
      from: "admin",
      message: reply,
      timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }),
    };

    setTickets(tickets.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, replies: [...t.replies, newReply], status: "in_progress" as const }
        : t
    ));
    setSelectedTicket({ ...selectedTicket, replies: [...selectedTicket.replies, newReply], status: "in_progress" });
    setReply("");
    toast.success("Reply sent successfully");
  };

  const handleResolve = (ticketId: string) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: "resolved" as const } : t));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: "resolved" });
    }
    toast.success("Ticket marked as resolved");
  };

  const handleClose = (ticketId: string) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: "closed" as const } : t));
    toast.success("Ticket closed");
  };

  const handleEscalate = (ticketId: string) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, priority: "high" as const } : t));
    toast.warning("Ticket escalated to high priority");
  };

  const handleAssign = (ticketId: string, agent: string) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, assignedTo: agent, status: "in_progress" as const } : t
    ));
    setShowAssignDialog(false);
    toast.success(`Ticket assigned to ${agent}`);
  };

  const handleDelete = (ticketId: string) => {
    setTickets(tickets.filter(t => t.id !== ticketId));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(null);
    }
    toast.success("Ticket deleted");
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Support Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage customer support tickets and communications
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-primary" />
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
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">In Progress</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.inProgress}</p>
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
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Avg Response</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.avgResponseTime}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Tickets List */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-lg">Support Tickets</CardTitle>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tickets..."
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto space-y-3">
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedTicket?.id === ticket.id
                      ? "bg-primary/10 border border-primary"
                      : "bg-secondary/30 hover:bg-secondary/50"
                  }`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs">{ticket.id}</span>
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedTicket(ticket); setShowAssignDialog(true); }}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Assign Agent
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEscalate(ticket.id); }}>
                          <ArrowUp className="h-4 w-4 mr-2" />
                          Escalate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleResolve(ticket.id); }}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Resolved
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDelete(ticket.id); }} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-medium mb-1">{ticket.subject}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{ticket.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{ticket.user}</span>
                    <span>•</span>
                    <span>{ticket.date}</span>
                    {ticket.assignedTo && (
                      <>
                        <span>•</span>
                        <span className="text-primary">{ticket.assignedTo}</span>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Ticket Detail */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg">Ticket Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTicket ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{selectedTicket.id}</span>
                      {getStatusBadge(selectedTicket.status)}
                      {getPriorityBadge(selectedTicket.priority)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleResolve(selectedTicket.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleClose(selectedTicket.id)}>
                        Close
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{selectedTicket.user[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium">{selectedTicket.user}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{selectedTicket.email}</span>
                          <Phone className="h-3 w-3 ml-2" />
                          <span>{selectedTicket.phone}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">{selectedTicket.subject}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTicket.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{selectedTicket.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {selectedTicket.date} at {selectedTicket.time}
                      </span>
                    </div>
                  </div>

                  {/* Conversation Thread */}
                  {selectedTicket.replies.length > 0 && (
                    <div className="space-y-3 max-h-[200px] overflow-y-auto">
                      {selectedTicket.replies.map((r) => (
                        <div 
                          key={r.id} 
                          className={`p-3 rounded-lg ${
                            r.from === "admin" ? "bg-primary/10 ml-4" : "bg-secondary/30 mr-4"
                          }`}
                        >
                          <p className="text-sm">{r.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {r.from === "admin" ? "Support Team" : selectedTicket.user} • {r.timestamp}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Reply</label>
                    <Textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your response..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button onClick={handleReply} className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Select a ticket to view details
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Create Ticket Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>User Name</Label>
                  <Input 
                    value={ticketForm.user} 
                    onChange={(e) => setTicketForm({...ticketForm, user: e.target.value})}
                    placeholder="User name"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input 
                    value={ticketForm.phone} 
                    onChange={(e) => setTicketForm({...ticketForm, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  value={ticketForm.email} 
                  onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                  placeholder="user@email.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={ticketForm.category} onValueChange={(v) => setTicketForm({...ticketForm, category: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Payment">Payment</SelectItem>
                      <SelectItem value="Booking">Booking</SelectItem>
                      <SelectItem value="Refund">Refund</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select value={ticketForm.priority} onValueChange={(v) => setTicketForm({...ticketForm, priority: v as Ticket["priority"]})}>
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
              <div>
                <Label>Subject</Label>
                <Input 
                  value={ticketForm.subject} 
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea 
                  value={ticketForm.message} 
                  onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                  placeholder="Detailed description..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateTicket}>Create Ticket</Button>
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
                Select an agent to assign to ticket {selectedTicket?.id}
              </p>
              <div className="space-y-2">
                {agents.map((agent) => (
                  <Button
                    key={agent}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => selectedTicket && handleAssign(selectedTicket.id, agent)}
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

export default AdminSupport;
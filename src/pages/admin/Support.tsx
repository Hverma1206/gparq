import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, Search, Clock, CheckCircle, User,
  Phone, Mail, MoreVertical, Send, Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const AdminSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [reply, setReply] = useState("");

  const stats = {
    total: 156,
    open: 23,
    inProgress: 18,
    resolved: 115,
    avgResponseTime: "2.5 hrs",
  };

  const tickets = [
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
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-yellow-500">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
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

  const handleReply = () => {
    if (!reply.trim()) {
      toast.error("Please enter a reply");
      return;
    }
    console.log(`Replying to ticket ${selectedTicket?.id}: ${reply}`);
    toast.success("Reply sent successfully");
    setReply("");
  };

  const handleResolve = (ticketId: string) => {
    console.log(`Resolving ticket: ${ticketId}`);
    toast.success("Ticket marked as resolved");
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Support Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage customer support tickets
          </p>
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
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
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
              {tickets.map((ticket, index) => (
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
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">{ticket.id}</span>
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                  </div>
                  <h3 className="font-medium mb-1">{ticket.subject}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{ticket.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{ticket.user}</span>
                    <span>•</span>
                    <span>{ticket.date}</span>
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
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleResolve(selectedTicket.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Resolved
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">{selectedTicket.subject}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTicket.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {selectedTicket.date} at {selectedTicket.time}
                    </p>
                  </div>
                  
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
      </div>
    </DashboardLayout>
  );
};

export default AdminSupport;

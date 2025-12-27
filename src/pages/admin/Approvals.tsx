import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, XCircle, Clock, Search, Filter, Eye,
  Building, User, FileText, MapPin, MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const AdminApprovals = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    pending: 15,
    approved: 142,
    rejected: 8,
  };

  const hostApplications = [
    {
      id: "HST-2024-001",
      name: "Ravi Kumar",
      email: "ravi@email.com",
      phone: "+91 98765 43210",
      propertyType: "Commercial",
      location: "Koramangala, Bangalore",
      spots: 30,
      submittedAt: "Dec 26, 2025",
      status: "pending",
      documents: ["Aadhaar", "PAN", "Property Deed"],
    },
    {
      id: "HST-2024-002",
      name: "Sunita Sharma",
      email: "sunita@email.com",
      phone: "+91 98765 43211",
      propertyType: "Residential",
      location: "HSR Layout, Bangalore",
      spots: 5,
      submittedAt: "Dec 25, 2025",
      status: "pending",
      documents: ["Aadhaar", "PAN"],
    },
    {
      id: "HST-2024-003",
      name: "Prakash Mall Parking",
      email: "prakash@mall.com",
      phone: "+91 98765 43212",
      propertyType: "Mall",
      location: "Whitefield, Bangalore",
      spots: 100,
      submittedAt: "Dec 24, 2025",
      status: "approved",
      documents: ["Aadhaar", "PAN", "Property Deed", "GST"],
    },
    {
      id: "HST-2024-004",
      name: "Rejected Applicant",
      email: "rejected@email.com",
      phone: "+91 98765 43213",
      propertyType: "Residential",
      location: "Electronic City, Bangalore",
      spots: 2,
      submittedAt: "Dec 23, 2025",
      status: "rejected",
      documents: ["Aadhaar"],
      rejectionReason: "Incomplete documentation",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleApprove = (id: string) => {
    console.log(`Approving application: ${id}`);
    toast.success("Host application approved!");
  };

  const handleReject = (id: string) => {
    console.log(`Rejecting application: ${id}`);
    toast.error("Host application rejected");
  };

  const handleViewDetails = (id: string) => {
    console.log(`Viewing application: ${id}`);
    toast.info("Opening application details...");
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Host Approvals
          </h1>
          <p className="text-muted-foreground">
            Review and approve host applications
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
              <p className="font-display text-2xl font-bold">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Approved</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.approved}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-muted-foreground">Rejected</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.rejected}</p>
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
              placeholder="Search by name, email, or location..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Applications */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4 space-y-4">
            {hostApplications
              .filter((app) => app.status === "pending")
              .map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-sm">{app.id}</span>
                            {getStatusBadge(app.status)}
                            <Badge variant="secondary">{app.propertyType}</Badge>
                          </div>
                          
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{app.name}</h3>
                              <p className="text-sm text-muted-foreground">{app.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{app.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <span>{app.spots} spots</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{app.documents.length} docs</span>
                            </div>
                            <span className="text-muted-foreground">Submitted: {app.submittedAt}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => handleViewDetails(app.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={() => handleReject(app.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button onClick={() => handleApprove(app.id)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </TabsContent>

          <TabsContent value="approved" className="mt-4">
            <p className="text-muted-foreground text-center py-8">Showing approved applications</p>
          </TabsContent>

          <TabsContent value="rejected" className="mt-4">
            <p className="text-muted-foreground text-center py-8">Showing rejected applications</p>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminApprovals;

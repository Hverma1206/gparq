import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Search, Download, Clock, User, Shield, Settings, AlertTriangle, CheckCircle, XCircle, Edit, Trash2, Eye
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface AuditLog {
  id: number;
  action: string;
  category: "User" | "Host" | "Booking" | "Finance" | "Settings" | "Security";
  performedBy: string;
  role: string;
  target: string;
  ip: string;
  timestamp: string;
  status: "Success" | "Failed" | "Warning";
  details: string;
}

const AdminAuditLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const logs: AuditLog[] = [
    { id: 1, action: "User Created", category: "User", performedBy: "Rahul Sharma", role: "Super Admin", target: "user_12345", ip: "192.168.1.100", timestamp: "Dec 27, 2025 10:30 AM", status: "Success", details: "Created new user with email: john@email.com" },
    { id: 2, action: "Host Approved", category: "Host", performedBy: "Priya Mehta", role: "City Admin", target: "host_67890", ip: "192.168.1.101", timestamp: "Dec 27, 2025 10:15 AM", status: "Success", details: "Approved host application for UB City Parking" },
    { id: 3, action: "Booking Cancelled", category: "Booking", performedBy: "System", role: "System", target: "BKG-2024-123", ip: "-", timestamp: "Dec 27, 2025 10:00 AM", status: "Success", details: "Auto-cancelled booking due to payment timeout" },
    { id: 4, action: "Payout Processed", category: "Finance", performedBy: "Vikram Singh", role: "Finance Manager", target: "host_45678", ip: "192.168.1.102", timestamp: "Dec 27, 2025 9:45 AM", status: "Success", details: "Processed payout of ₹45,000 to Forum Mall Parking" },
    { id: 5, action: "Login Failed", category: "Security", performedBy: "Unknown", role: "-", target: "admin@parq.com", ip: "45.67.89.123", timestamp: "Dec 27, 2025 9:30 AM", status: "Failed", details: "Failed login attempt - incorrect password (3rd attempt)" },
    { id: 6, action: "Settings Updated", category: "Settings", performedBy: "Rahul Sharma", role: "Super Admin", target: "platform_settings", ip: "192.168.1.100", timestamp: "Dec 27, 2025 9:15 AM", status: "Success", details: "Updated commission rate from 10% to 12%" },
    { id: 7, action: "User Suspended", category: "User", performedBy: "Amit Kumar", role: "Support Agent", target: "user_11111", ip: "192.168.1.103", timestamp: "Dec 27, 2025 9:00 AM", status: "Warning", details: "Suspended user for policy violation - multiple chargebacks" },
    { id: 8, action: "Role Created", category: "Security", performedBy: "Rahul Sharma", role: "Super Admin", target: "role_regional_manager", ip: "192.168.1.100", timestamp: "Dec 26, 2025 6:00 PM", status: "Success", details: "Created new role: Regional Manager with permissions: view_hosts, manage_hosts" },
    { id: 9, action: "Coupon Created", category: "Settings", performedBy: "Neha Reddy", role: "City Admin", target: "WELCOME50", ip: "192.168.1.104", timestamp: "Dec 26, 2025 5:30 PM", status: "Success", details: "Created coupon WELCOME50 with 50% discount, max ₹100" },
    { id: 10, action: "Dispute Resolved", category: "Booking", performedBy: "Priya Mehta", role: "City Admin", target: "DSP-2024-015", ip: "192.168.1.101", timestamp: "Dec 26, 2025 4:00 PM", status: "Success", details: "Resolved dispute in favor of user, refund processed: ₹250" },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.performedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleView = (log: AuditLog) => {
    setSelectedLog(log);
    setShowViewDialog(true);
  };

  const handleExport = () => toast.success("Audit logs exported");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "User": return <User className="h-4 w-4" />;
      case "Host": return <User className="h-4 w-4" />;
      case "Booking": return <FileText className="h-4 w-4" />;
      case "Finance": return <FileText className="h-4 w-4" />;
      case "Settings": return <Settings className="h-4 w-4" />;
      case "Security": return <Shield className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Failed": return <XCircle className="h-4 w-4 text-destructive" />;
      case "Warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const stats = {
    total: logs.length,
    success: logs.filter(l => l.status === "Success").length,
    failed: logs.filter(l => l.status === "Failed").length,
    warning: logs.filter(l => l.status === "Warning").length,
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Audit Logs
            </h1>
            <p className="text-muted-foreground">
              Track all admin actions and system events
            </p>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Events</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Successful</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.success}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="text-sm text-muted-foreground">Failed</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.failed}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Warnings</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.warning}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Host">Host</SelectItem>
              <SelectItem value="Booking">Booking</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Settings">Settings</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Success">Success</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Warning">Warning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logs Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Performed By</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log, index) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="font-medium">{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        {getCategoryIcon(log.category)}
                        {log.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{log.performedBy}</div>
                        <div className="text-sm text-muted-foreground">{log.role}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.target}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {log.timestamp}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        log.status === "Success" ? "bg-green-500/10 text-green-500" :
                        log.status === "Failed" ? "bg-destructive/10 text-destructive" :
                        "bg-yellow-500/10 text-yellow-500"
                      }>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleView(log)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Log Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Audit Log Details</DialogTitle>
            </DialogHeader>
            {selectedLog && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedLog.status === "Success" ? "bg-green-500/10" :
                    selectedLog.status === "Failed" ? "bg-destructive/10" :
                    "bg-yellow-500/10"
                  }`}>
                    {getStatusIcon(selectedLog.status)}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{selectedLog.action}</h3>
                    <Badge variant="outline" className="gap-1">
                      {getCategoryIcon(selectedLog.category)}
                      {selectedLog.category}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Performed By</p>
                    <p className="font-medium">{selectedLog.performedBy}</p>
                    <p className="text-sm text-muted-foreground">{selectedLog.role}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Target</p>
                    <p className="font-mono font-medium">{selectedLog.target}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">IP Address</p>
                    <p className="font-mono font-medium">{selectedLog.ip}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Timestamp</p>
                    <p className="font-medium">{selectedLog.timestamp}</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground mb-2">Details</p>
                  <p className="text-sm">{selectedLog.details}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminAuditLogs;

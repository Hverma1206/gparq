import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  FileText, Search, Download, Clock, User, Shield, Settings, AlertTriangle, 
  CheckCircle, XCircle, Eye, Monitor, Smartphone, Globe, Activity, RefreshCw,
  Calendar, Filter, MapPin, Laptop, ChevronLeft, ChevronRight, MoreHorizontal,
  Mail, Bell, BellRing, Send, Trash2, Plus, Zap, Lock, AlertCircle, UserX
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { format } from "date-fns";

interface AuditLog {
  id: number;
  action: string;
  category: "User" | "Host" | "Booking" | "Finance" | "Settings" | "Security" | "System";
  performedBy: string;
  role: string;
  target: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  sessionId: string;
  timestamp: string;
  duration: string;
  status: "Success" | "Failed" | "Warning";
  details: string;
  changes?: { field: string; oldValue: string; newValue: string }[];
}

const AdminAuditLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [adminFilter, setAdminFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isLiveTracking, setIsLiveTracking] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  // Email Alerts State
  const [emailAlerts, setEmailAlerts] = useState({
    enabled: true,
    recipients: ["admin@parq.com", "security@parq.com"],
    failedLoginThreshold: 3,
    suspiciousActivityEnabled: true,
    roleChangeEnabled: true,
    permissionChangeEnabled: true,
    bulkOperationsEnabled: true,
    apiKeyChangeEnabled: true,
    newDeviceLoginEnabled: true,
    unusualLocationEnabled: true,
    afterHoursEnabled: false,
    afterHoursStart: "22:00",
    afterHoursEnd: "06:00",
  });
  const [newRecipient, setNewRecipient] = useState("");
  const [recentAlerts, setRecentAlerts] = useState([
    { id: 1, type: "failed_login", message: "Multiple failed login attempts detected for admin@parq.com", ip: "45.67.89.123", location: "Unknown Location", timestamp: "Dec 27, 2025 9:30:55 AM", severity: "critical", emailSent: true },
    { id: 2, type: "role_change", message: "Role 'Regional Manager' was created with elevated permissions", admin: "Rahul Sharma", timestamp: "Dec 26, 2025 6:00:00 PM", severity: "warning", emailSent: true },
    { id: 3, type: "api_key", message: "Payment gateway API key was regenerated", admin: "Vikram Singh", timestamp: "Dec 26, 2025 2:00:10 PM", severity: "warning", emailSent: true },
    { id: 4, type: "new_device", message: "New device login detected for Neha Reddy", device: "Mobile - Safari 17.0", location: "Hyderabad, India", timestamp: "Dec 26, 2025 5:30:45 PM", severity: "info", emailSent: true },
    { id: 5, type: "bulk_operation", message: "Bulk import of 150 users performed", admin: "Rahul Sharma", timestamp: "Dec 26, 2025 3:15:00 PM", severity: "info", emailSent: true },
  ]);

  // Simulate security event detection
  useEffect(() => {
    if (!emailAlerts.enabled || !isLiveTracking) return;
    
    const interval = setInterval(() => {
      // 10% chance to simulate a security event
      if (Math.random() < 0.1) {
        const events: { type: string; message: string; severity: "info" | "warning" | "critical" }[] = [
          { type: "failed_login", message: "Failed login attempt detected", severity: "warning" },
          { type: "suspicious_ip", message: "Login from unusual IP address", severity: "warning" },
          { type: "new_device", message: "Login from new device detected", severity: "info" },
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        
        if (event.severity === "warning" || event.severity === "critical") {
          toast.warning(`🔔 Security Alert: ${event.message}`, {
            description: "Email notification sent to configured recipients",
            duration: 5000,
          });
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [emailAlerts.enabled, isLiveTracking]);

  const adminUsers = [
    { id: "admin1", name: "Rahul Sharma" },
    { id: "admin2", name: "Priya Mehta" },
    { id: "admin3", name: "Vikram Singh" },
    { id: "admin4", name: "Amit Kumar" },
    { id: "admin5", name: "Neha Reddy" },
  ];

  const logs: AuditLog[] = [
    { 
      id: 1, 
      action: "User Created", 
      category: "User", 
      performedBy: "Rahul Sharma", 
      role: "Super Admin", 
      target: "user_12345", 
      ip: "192.168.1.100",
      location: "Bangalore, India",
      device: "Desktop",
      browser: "Chrome 120.0",
      sessionId: "sess_abc123xyz",
      timestamp: "Dec 27, 2025 10:30:45 AM", 
      duration: "1.2s",
      status: "Success", 
      details: "Created new user with email: john@email.com",
      changes: [
        { field: "email", oldValue: "-", newValue: "john@email.com" },
        { field: "name", oldValue: "-", newValue: "John Doe" },
        { field: "status", oldValue: "-", newValue: "Active" }
      ]
    },
    { 
      id: 2, 
      action: "Host Approved", 
      category: "Host", 
      performedBy: "Priya Mehta", 
      role: "City Admin", 
      target: "host_67890", 
      ip: "192.168.1.101",
      location: "Mumbai, India",
      device: "Desktop",
      browser: "Firefox 121.0",
      sessionId: "sess_def456uvw",
      timestamp: "Dec 27, 2025 10:15:22 AM", 
      duration: "0.8s",
      status: "Success", 
      details: "Approved host application for UB City Parking",
      changes: [
        { field: "status", oldValue: "Pending", newValue: "Approved" },
        { field: "approved_by", oldValue: "-", newValue: "Priya Mehta" }
      ]
    },
    { 
      id: 3, 
      action: "Booking Cancelled", 
      category: "Booking", 
      performedBy: "System", 
      role: "System", 
      target: "BKG-2024-123", 
      ip: "-",
      location: "Server",
      device: "System",
      browser: "-",
      sessionId: "system_auto",
      timestamp: "Dec 27, 2025 10:00:00 AM", 
      duration: "0.3s",
      status: "Success", 
      details: "Auto-cancelled booking due to payment timeout"
    },
    { 
      id: 4, 
      action: "Payout Processed", 
      category: "Finance", 
      performedBy: "Vikram Singh", 
      role: "Finance Manager", 
      target: "host_45678", 
      ip: "192.168.1.102",
      location: "Delhi, India",
      device: "Desktop",
      browser: "Chrome 120.0",
      sessionId: "sess_ghi789rst",
      timestamp: "Dec 27, 2025 9:45:18 AM", 
      duration: "2.5s",
      status: "Success", 
      details: "Processed payout of ₹45,000 to Forum Mall Parking",
      changes: [
        { field: "amount", oldValue: "Pending", newValue: "₹45,000" },
        { field: "status", oldValue: "Pending", newValue: "Completed" }
      ]
    },
    { 
      id: 5, 
      action: "Login Failed", 
      category: "Security", 
      performedBy: "Unknown", 
      role: "-", 
      target: "admin@parq.com", 
      ip: "45.67.89.123",
      location: "Unknown Location",
      device: "Desktop",
      browser: "Chrome 118.0",
      sessionId: "-",
      timestamp: "Dec 27, 2025 9:30:55 AM", 
      duration: "0.1s",
      status: "Failed", 
      details: "Failed login attempt - incorrect password (3rd attempt)"
    },
    { 
      id: 6, 
      action: "Settings Updated", 
      category: "Settings", 
      performedBy: "Rahul Sharma", 
      role: "Super Admin", 
      target: "platform_settings", 
      ip: "192.168.1.100",
      location: "Bangalore, India",
      device: "Laptop",
      browser: "Safari 17.2",
      sessionId: "sess_jkl012mno",
      timestamp: "Dec 27, 2025 9:15:33 AM", 
      duration: "1.8s",
      status: "Success", 
      details: "Updated commission rate from 10% to 12%",
      changes: [
        { field: "commission_rate", oldValue: "10%", newValue: "12%" }
      ]
    },
    { 
      id: 7, 
      action: "User Suspended", 
      category: "User", 
      performedBy: "Amit Kumar", 
      role: "Support Agent", 
      target: "user_11111", 
      ip: "192.168.1.103",
      location: "Chennai, India",
      device: "Desktop",
      browser: "Edge 120.0",
      sessionId: "sess_pqr345stu",
      timestamp: "Dec 27, 2025 9:00:12 AM", 
      duration: "0.6s",
      status: "Warning", 
      details: "Suspended user for policy violation - multiple chargebacks",
      changes: [
        { field: "status", oldValue: "Active", newValue: "Suspended" },
        { field: "suspension_reason", oldValue: "-", newValue: "Policy Violation" }
      ]
    },
    { 
      id: 8, 
      action: "Role Created", 
      category: "Security", 
      performedBy: "Rahul Sharma", 
      role: "Super Admin", 
      target: "role_regional_manager", 
      ip: "192.168.1.100",
      location: "Bangalore, India",
      device: "Desktop",
      browser: "Chrome 120.0",
      sessionId: "sess_vwx678yza",
      timestamp: "Dec 26, 2025 6:00:00 PM", 
      duration: "1.1s",
      status: "Success", 
      details: "Created new role: Regional Manager with permissions: view_hosts, manage_hosts"
    },
    { 
      id: 9, 
      action: "Coupon Created", 
      category: "Settings", 
      performedBy: "Neha Reddy", 
      role: "City Admin", 
      target: "WELCOME50", 
      ip: "192.168.1.104",
      location: "Hyderabad, India",
      device: "Mobile",
      browser: "Safari Mobile 17.0",
      sessionId: "sess_bcd901efg",
      timestamp: "Dec 26, 2025 5:30:45 PM", 
      duration: "0.9s",
      status: "Success", 
      details: "Created coupon WELCOME50 with 50% discount, max ₹100"
    },
    { 
      id: 10, 
      action: "Dispute Resolved", 
      category: "Booking", 
      performedBy: "Priya Mehta", 
      role: "City Admin", 
      target: "DSP-2024-015", 
      ip: "192.168.1.101",
      location: "Mumbai, India",
      device: "Desktop",
      browser: "Firefox 121.0",
      sessionId: "sess_hij234klm",
      timestamp: "Dec 26, 2025 4:00:22 PM", 
      duration: "3.2s",
      status: "Success", 
      details: "Resolved dispute in favor of user, refund processed: ₹250"
    },
    { 
      id: 11, 
      action: "Bulk Import", 
      category: "System", 
      performedBy: "Rahul Sharma", 
      role: "Super Admin", 
      target: "users_batch_import", 
      ip: "192.168.1.100",
      location: "Bangalore, India",
      device: "Desktop",
      browser: "Chrome 120.0",
      sessionId: "sess_nop567qrs",
      timestamp: "Dec 26, 2025 3:15:00 PM", 
      duration: "15.8s",
      status: "Success", 
      details: "Imported 150 users from CSV file"
    },
    { 
      id: 12, 
      action: "API Key Regenerated", 
      category: "Security", 
      performedBy: "Vikram Singh", 
      role: "Finance Manager", 
      target: "payment_gateway_key", 
      ip: "192.168.1.102",
      location: "Delhi, India",
      device: "Desktop",
      browser: "Chrome 120.0",
      sessionId: "sess_tuv890wxy",
      timestamp: "Dec 26, 2025 2:00:10 PM", 
      duration: "0.5s",
      status: "Warning", 
      details: "Payment gateway API key was regenerated - old key invalidated"
    },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.performedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesAdmin = adminFilter === "all" || log.performedBy === adminFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesAdmin;
  });

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  const handleView = (log: AuditLog) => {
    setSelectedLog(log);
    setShowViewDialog(true);
  };

  const handleExport = (format: string) => {
    toast.success(`Audit logs exported as ${format.toUpperCase()}`);
  };

  const handleRefresh = () => {
    toast.success("Logs refreshed");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "User": return <User className="h-4 w-4" />;
      case "Host": return <User className="h-4 w-4" />;
      case "Booking": return <FileText className="h-4 w-4" />;
      case "Finance": return <FileText className="h-4 w-4" />;
      case "Settings": return <Settings className="h-4 w-4" />;
      case "Security": return <Shield className="h-4 w-4" />;
      case "System": return <Monitor className="h-4 w-4" />;
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

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile": return <Smartphone className="h-4 w-4" />;
      case "desktop": return <Monitor className="h-4 w-4" />;
      case "laptop": return <Laptop className="h-4 w-4" />;
      case "system": return <Settings className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const stats = {
    total: logs.length,
    today: logs.filter(l => l.timestamp.includes("Dec 27")).length,
    success: logs.filter(l => l.status === "Success").length,
    failed: logs.filter(l => l.status === "Failed").length,
    warning: logs.filter(l => l.status === "Warning").length,
    securityEvents: logs.filter(l => l.category === "Security").length,
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setAdminFilter("all");
    setDateRange({ from: undefined, to: undefined });
  };

  const addRecipient = () => {
    if (newRecipient && newRecipient.includes("@")) {
      setEmailAlerts(prev => ({
        ...prev,
        recipients: [...prev.recipients, newRecipient]
      }));
      setNewRecipient("");
      toast.success(`Added ${newRecipient} to alert recipients`);
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const removeRecipient = (email: string) => {
    setEmailAlerts(prev => ({
      ...prev,
      recipients: prev.recipients.filter(r => r !== email)
    }));
    toast.success(`Removed ${email} from alert recipients`);
  };

  const testEmailAlert = () => {
    toast.success("Test email sent!", {
      description: `Sent to: ${emailAlerts.recipients.join(", ")}`,
    });
  };

  const saveAlertSettings = () => {
    toast.success("Email alert settings saved successfully");
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info": return <Bell className="h-4 w-4 text-blue-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case "failed_login": return <Lock className="h-4 w-4" />;
      case "role_change": return <Shield className="h-4 w-4" />;
      case "api_key": return <Zap className="h-4 w-4" />;
      case "new_device": return <Smartphone className="h-4 w-4" />;
      case "bulk_operation": return <FileText className="h-4 w-4" />;
      case "suspicious_ip": return <Globe className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Activity Logs
            </h1>
            <p className="text-muted-foreground">
              Track all admin actions with timestamps, IP addresses, and session details
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={isLiveTracking ? "default" : "outline"} 
              size="sm"
              className="gap-2"
              onClick={() => setIsLiveTracking(!isLiveTracking)}
            >
              <Activity className={`h-4 w-4 ${isLiveTracking ? "animate-pulse" : ""}`} />
              {isLiveTracking ? "Live" : "Paused"}
            </Button>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
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
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.today}</p>
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
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-orange-500" />
                <span className="text-sm text-muted-foreground">Security</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.securityEvents}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by action, user, target, or IP..."
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
                  <SelectItem value="System">System</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Success">Success</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={adminFilter} onValueChange={setAdminFilter}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Admin User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Admins</SelectItem>
                  {adminUsers.map(admin => (
                    <SelectItem key={admin.id} value={admin.name}>{admin.name}</SelectItem>
                  ))}
                  <SelectItem value="System">System</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Date Range
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <CalendarComponent
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <Button variant="ghost" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Logs</TabsTrigger>
            <TabsTrigger value="security">Security Events</TabsTrigger>
            <TabsTrigger value="changes">Data Changes</TabsTrigger>
            <TabsTrigger value="failed">Failed Actions</TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <Mail className="h-4 w-4" />
              Email Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
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
                      <TableHead>IP & Location</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedLogs.map((log, index) => (
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
                          <div className="space-y-1">
                            <div className="font-mono text-sm">{log.ip}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {log.location}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(log.device)}
                            <div>
                              <div className="text-sm">{log.device}</div>
                              <div className="text-xs text-muted-foreground">{log.browser}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {log.timestamp}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Duration: {log.duration}
                            </div>
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

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * logsPerPage) + 1} to {Math.min(currentPage * logsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {logs.filter(l => l.category === "Security").map(log => (
                    <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
                      <div className={`p-2 rounded-lg ${
                        log.status === "Failed" ? "bg-destructive/10" : "bg-orange-500/10"
                      }`}>
                        <Shield className={`h-5 w-5 ${
                          log.status === "Failed" ? "text-destructive" : "text-orange-500"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{log.action}</h4>
                          <Badge className={
                            log.status === "Success" ? "bg-green-500/10 text-green-500" :
                            log.status === "Failed" ? "bg-destructive/10 text-destructive" :
                            "bg-yellow-500/10 text-yellow-500"
                          }>
                            {log.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {log.performedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {log.ip}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {log.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {log.timestamp}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleView(log)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changes" className="mt-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {logs.filter(l => l.changes && l.changes.length > 0).map(log => (
                    <div key={log.id} className="p-4 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <h4 className="font-medium">{log.action}</h4>
                          <Badge variant="outline">{log.target}</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                      </div>
                      <div className="space-y-2">
                        {log.changes?.map((change, idx) => (
                          <div key={idx} className="flex items-center gap-4 text-sm p-2 rounded bg-background">
                            <span className="font-mono text-muted-foreground w-32">{change.field}</span>
                            <span className="text-destructive line-through">{change.oldValue}</span>
                            <span>→</span>
                            <span className="text-green-500">{change.newValue}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span>By: {log.performedBy}</span>
                        <span>IP: {log.ip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="failed" className="mt-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {logs.filter(l => l.status === "Failed").map(log => (
                    <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <XCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{log.action}</h4>
                          <Badge className="bg-destructive/10 text-destructive">Failed</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {log.ip}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {log.location}
                          </span>
                          <span className="flex items-center gap-1">
                            {getDeviceIcon(log.device)}
                            {log.device} - {log.browser}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {log.timestamp}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleView(log)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {logs.filter(l => l.status === "Failed").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <p>No failed actions found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Alerts Tab */}
          <TabsContent value="alerts" className="mt-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Alert Settings */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BellRing className="h-5 w-5 text-primary" />
                        Email Alert Settings
                      </CardTitle>
                      <CardDescription>Configure when to receive email notifications for security events</CardDescription>
                    </div>
                    <Switch
                      checked={emailAlerts.enabled}
                      onCheckedChange={(checked) => setEmailAlerts(prev => ({ ...prev, enabled: checked }))}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Recipients */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Alert Recipients</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="email@example.com"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addRecipient()}
                      />
                      <Button onClick={addRecipient} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {emailAlerts.recipients.map(email => (
                        <Badge key={email} variant="secondary" className="gap-2 py-1.5">
                          <Mail className="h-3 w-3" />
                          {email}
                          <button onClick={() => removeRecipient(email)} className="hover:text-destructive">
                            <XCircle className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Security Event Triggers */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Security Event Triggers</Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <Lock className="h-5 w-5 text-destructive" />
                          <div>
                            <p className="font-medium">Failed Login Attempts</p>
                            <p className="text-sm text-muted-foreground">Alert after multiple failed logins</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min={1}
                            max={10}
                            value={emailAlerts.failedLoginThreshold}
                            onChange={(e) => setEmailAlerts(prev => ({ ...prev, failedLoginThreshold: parseInt(e.target.value) || 3 }))}
                            className="w-16 text-center"
                          />
                          <span className="text-sm text-muted-foreground">attempts</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          <div>
                            <p className="font-medium">Suspicious Activity</p>
                            <p className="text-sm text-muted-foreground">Unusual patterns or behaviors</p>
                          </div>
                        </div>
                        <Switch
                          checked={emailAlerts.suspiciousActivityEnabled}
                          onCheckedChange={(checked) => setEmailAlerts(prev => ({ ...prev, suspiciousActivityEnabled: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Role Changes</p>
                            <p className="text-sm text-muted-foreground">Admin role creation or modification</p>
                          </div>
                        </div>
                        <Switch
                          checked={emailAlerts.roleChangeEnabled}
                          onCheckedChange={(checked) => setEmailAlerts(prev => ({ ...prev, roleChangeEnabled: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <UserX className="h-5 w-5 text-orange-500" />
                          <div>
                            <p className="font-medium">Permission Changes</p>
                            <p className="text-sm text-muted-foreground">User permissions modified</p>
                          </div>
                        </div>
                        <Switch
                          checked={emailAlerts.permissionChangeEnabled}
                          onCheckedChange={(checked) => setEmailAlerts(prev => ({ ...prev, permissionChangeEnabled: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="font-medium">API Key Changes</p>
                            <p className="text-sm text-muted-foreground">API key creation or regeneration</p>
                          </div>
                        </div>
                        <Switch
                          checked={emailAlerts.apiKeyChangeEnabled}
                          onCheckedChange={(checked) => setEmailAlerts(prev => ({ ...prev, apiKeyChangeEnabled: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">Bulk Operations</p>
                            <p className="text-sm text-muted-foreground">Large-scale data imports or exports</p>
                          </div>
                        </div>
                        <Switch
                          checked={emailAlerts.bulkOperationsEnabled}
                          onCheckedChange={(checked) => setEmailAlerts(prev => ({ ...prev, bulkOperationsEnabled: checked }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Device & Location Alerts */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Device & Location Alerts</Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">New Device Login</p>
                            <p className="text-sm text-muted-foreground">Login from unrecognized device</p>
                          </div>
                        </div>
                        <Switch
                          checked={emailAlerts.newDeviceLoginEnabled}
                          onCheckedChange={(checked) => setEmailAlerts(prev => ({ ...prev, newDeviceLoginEnabled: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-cyan-500" />
                          <div>
                            <p className="font-medium">Unusual Location</p>
                            <p className="text-sm text-muted-foreground">Login from new geographic location</p>
                          </div>
                        </div>
                        <Switch
                          checked={emailAlerts.unusualLocationEnabled}
                          onCheckedChange={(checked) => setEmailAlerts(prev => ({ ...prev, unusualLocationEnabled: checked }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* After Hours Alerts */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">After-Hours Activity Alerts</Label>
                      <Switch
                        checked={emailAlerts.afterHoursEnabled}
                        onCheckedChange={(checked) => setEmailAlerts(prev => ({ ...prev, afterHoursEnabled: checked }))}
                      />
                    </div>
                    {emailAlerts.afterHoursEnabled && (
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">From</Label>
                          <Input
                            type="time"
                            value={emailAlerts.afterHoursStart}
                            onChange={(e) => setEmailAlerts(prev => ({ ...prev, afterHoursStart: e.target.value }))}
                            className="w-28"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">To</Label>
                          <Input
                            type="time"
                            value={emailAlerts.afterHoursEnd}
                            onChange={(e) => setEmailAlerts(prev => ({ ...prev, afterHoursEnd: e.target.value }))}
                            className="w-28"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button onClick={testEmailAlert} variant="outline" className="gap-2">
                      <Send className="h-4 w-4" />
                      Send Test Email
                    </Button>
                    <Button onClick={saveAlertSettings} className="gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    Recent Security Alerts
                  </CardTitle>
                  <CardDescription>Email notifications sent for security events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg border ${
                          alert.severity === "critical" ? "bg-destructive/5 border-destructive/20" :
                          alert.severity === "warning" ? "bg-yellow-500/5 border-yellow-500/20" :
                          "bg-blue-500/5 border-blue-500/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            alert.severity === "critical" ? "bg-destructive/10" :
                            alert.severity === "warning" ? "bg-yellow-500/10" :
                            "bg-blue-500/10"
                          }`}>
                            {getAlertTypeIcon(alert.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {getSeverityIcon(alert.severity)}
                              <span className="font-medium capitalize">{alert.type.replace(/_/g, " ")}</span>
                              {alert.emailSent && (
                                <Badge variant="outline" className="text-xs gap-1">
                                  <Mail className="h-3 w-3" />
                                  Sent
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              {alert.ip && (
                                <span className="flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  {alert.ip}
                                </span>
                              )}
                              {alert.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {alert.location}
                                </span>
                              )}
                              {alert.admin && (
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {alert.admin}
                                </span>
                              )}
                              {alert.device && (
                                <span className="flex items-center gap-1">
                                  <Smartphone className="h-3 w-3" />
                                  {alert.device}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {alert.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {recentAlerts.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <p>No recent security alerts</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Alert Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{recentAlerts.filter(a => a.severity === "critical").length}</p>
                      <p className="text-sm text-muted-foreground">Critical Alerts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{recentAlerts.filter(a => a.severity === "warning").length}</p>
                      <p className="text-sm text-muted-foreground">Warnings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Mail className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{recentAlerts.filter(a => a.emailSent).length}</p>
                      <p className="text-sm text-muted-foreground">Emails Sent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{emailAlerts.recipients.length}</p>
                      <p className="text-sm text-muted-foreground">Recipients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* View Log Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Activity Log Details</DialogTitle>
            </DialogHeader>
            {selectedLog && (
              <div className="space-y-6 py-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    selectedLog.status === "Success" ? "bg-green-500/10" :
                    selectedLog.status === "Failed" ? "bg-destructive/10" :
                    "bg-yellow-500/10"
                  }`}>
                    {getStatusIcon(selectedLog.status)}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">{selectedLog.action}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="gap-1">
                        {getCategoryIcon(selectedLog.category)}
                        {selectedLog.category}
                      </Badge>
                      <Badge className={
                        selectedLog.status === "Success" ? "bg-green-500/10 text-green-500" :
                        selectedLog.status === "Failed" ? "bg-destructive/10 text-destructive" :
                        "bg-yellow-500/10 text-yellow-500"
                      }>
                        {selectedLog.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Performed By</p>
                    <p className="font-medium">{selectedLog.performedBy}</p>
                    <p className="text-sm text-muted-foreground">{selectedLog.role}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Target</p>
                    <p className="font-mono font-medium">{selectedLog.target}</p>
                  </div>
                </div>

                {/* Technical Details */}
                <div>
                  <h4 className="font-medium mb-3">Technical Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-secondary/30 flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">IP Address</p>
                        <p className="font-mono font-medium">{selectedLog.ip}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/30 flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{selectedLog.location}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/30 flex items-center gap-3">
                      {getDeviceIcon(selectedLog.device)}
                      <div>
                        <p className="text-sm text-muted-foreground">Device & Browser</p>
                        <p className="font-medium">{selectedLog.device} - {selectedLog.browser}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/30 flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{selectedLog.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Session Info */}
                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Session ID</p>
                  </div>
                  <p className="font-mono text-sm">{selectedLog.sessionId}</p>
                </div>

                {/* Timestamp */}
                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Timestamp</p>
                  </div>
                  <p className="font-medium">{selectedLog.timestamp}</p>
                </div>

                {/* Details */}
                <div className="p-4 rounded-lg bg-secondary/30">
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">{selectedLog.details}</p>
                </div>

                {/* Changes */}
                {selectedLog.changes && selectedLog.changes.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Data Changes</h4>
                    <div className="space-y-2">
                      {selectedLog.changes.map((change, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 text-sm">
                          <span className="font-mono text-muted-foreground w-40">{change.field}</span>
                          <span className="text-destructive line-through flex-1">{change.oldValue}</span>
                          <span>→</span>
                          <span className="text-green-500 flex-1">{change.newValue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

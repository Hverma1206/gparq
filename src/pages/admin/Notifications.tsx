import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bell, Search, MoreVertical, Eye, Send, Plus, Edit, Trash2, Users, Building2, Clock, CheckCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "Push" | "Email" | "SMS" | "In-App";
  audience: "All Users" | "All Hosts" | "All Partners" | "Specific Users";
  sentTo: number;
  opened: number;
  status: "Sent" | "Scheduled" | "Draft";
  sentAt: string;
  createdBy: string;
}

const AdminNotifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "Push" as Notification["type"],
    audience: "All Users" as Notification["audience"],
    scheduledAt: "",
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "New Year Sale - 50% Off!", message: "Celebrate New Year with 50% off on all bookings. Use code NEWYEAR50.", type: "Push", audience: "All Users", sentTo: 45000, opened: 28500, status: "Sent", sentAt: "Dec 26, 2025 10:00 AM", createdBy: "Admin" },
    { id: 2, title: "Host Payout Processed", message: "Your weekly payout of ₹45,000 has been processed.", type: "Email", audience: "All Hosts", sentTo: 1250, opened: 980, status: "Sent", sentAt: "Dec 25, 2025 9:00 AM", createdBy: "System" },
    { id: 3, title: "New EV Charging Stations", message: "We've added 50 new EV charging stations across Bangalore!", type: "In-App", audience: "All Users", sentTo: 52000, opened: 15600, status: "Sent", sentAt: "Dec 24, 2025 11:00 AM", createdBy: "Admin" },
    { id: 4, title: "Christmas Special", message: "Book any parking and get free car wash!", type: "Push", audience: "All Users", sentTo: 0, opened: 0, status: "Scheduled", sentAt: "Dec 28, 2025 8:00 AM", createdBy: "Admin" },
    { id: 5, title: "Partner Training Session", message: "Join our upcoming training session for service partners.", type: "Email", audience: "All Partners", sentTo: 0, opened: 0, status: "Draft", sentAt: "-", createdBy: "Admin" },
  ]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowViewDialog(true);
  };

  const handleDelete = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowDeleteDialog(true);
  };

  const handleCreate = () => {
    const newNotification: Notification = {
      id: notifications.length + 1,
      title: formData.title,
      message: formData.message,
      type: formData.type,
      audience: formData.audience,
      sentTo: 0,
      opened: 0,
      status: formData.scheduledAt ? "Scheduled" : "Draft",
      sentAt: formData.scheduledAt || "-",
      createdBy: "Admin",
    };
    setNotifications([...notifications, newNotification]);
    setShowCreateDialog(false);
    setFormData({ title: "", message: "", type: "Push", audience: "All Users", scheduledAt: "" });
    toast.success("Notification created successfully");
  };

  const handleSendNow = (notification: Notification) => {
    setNotifications(notifications.map(n => 
      n.id === notification.id 
        ? { ...n, status: "Sent", sentAt: new Date().toLocaleString(), sentTo: notification.audience === "All Users" ? 52000 : notification.audience === "All Hosts" ? 1250 : 450 }
        : n
    ));
    toast.success("Notification sent successfully");
  };

  const confirmDelete = () => {
    if (!selectedNotification) return;
    setNotifications(notifications.filter(n => n.id !== selectedNotification.id));
    setShowDeleteDialog(false);
    toast.success("Notification deleted successfully");
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === "Sent").length,
    scheduled: notifications.filter(n => n.status === "Scheduled").length,
    totalReach: notifications.filter(n => n.status === "Sent").reduce((acc, n) => acc + n.sentTo, 0),
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Notifications
            </h1>
            <p className="text-muted-foreground">
              Send and manage notifications to users, hosts, and partners
            </p>
          </div>
          <Button className="gap-2" onClick={() => {
            setFormData({ title: "", message: "", type: "Push", audience: "All Users", scheduledAt: "" });
            setShowCreateDialog(true);
          }}>
            <Plus className="h-5 w-5" />
            Create Notification
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Sent</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.sent}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Scheduled</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.scheduled}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Total Reach</span>
              </div>
              <p className="font-display text-2xl font-bold">{(stats.totalReach / 1000).toFixed(0)}K</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Sent">Sent</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Notification</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Sent To</TableHead>
                  <TableHead>Open Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification, index) => (
                  <motion.tr
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/50"
                  >
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium text-foreground">{notification.title}</div>
                        <div className="text-sm text-muted-foreground truncate">{notification.message}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{notification.type}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{notification.audience}</TableCell>
                    <TableCell>{notification.sentTo > 0 ? notification.sentTo.toLocaleString() : "-"}</TableCell>
                    <TableCell>
                      {notification.sentTo > 0 ? (
                        <span className="font-medium">{((notification.opened / notification.sentTo) * 100).toFixed(0)}%</span>
                      ) : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        notification.status === "Sent" ? "bg-green-500/10 text-green-500" :
                        notification.status === "Scheduled" ? "bg-blue-500/10 text-blue-500" :
                        "bg-gray-500/10 text-gray-500"
                      }>
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(notification)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {notification.status !== "Sent" && (
                            <DropdownMenuItem onClick={() => handleSendNow(notification)}>
                              <Send className="h-4 w-4 mr-2" />
                              Send Now
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(notification)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Create Notification Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Notification</DialogTitle>
              <DialogDescription>Send a notification to users, hosts, or partners</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Notification title"
                />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Notification message..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as Notification["type"] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Push">Push</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                      <SelectItem value="In-App">In-App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Audience</Label>
                  <Select value={formData.audience} onValueChange={(v) => setFormData({ ...formData, audience: v as Notification["audience"] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Users">All Users</SelectItem>
                      <SelectItem value="All Hosts">All Hosts</SelectItem>
                      <SelectItem value="All Partners">All Partners</SelectItem>
                      <SelectItem value="Specific Users">Specific Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Schedule (Optional)</Label>
                <Input
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button variant="outline" onClick={handleCreate}>Save as Draft</Button>
              <Button onClick={() => {
                handleCreate();
                toast.success("Notification sent successfully");
              }}>
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Notification Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Notification Details</DialogTitle>
            </DialogHeader>
            {selectedNotification && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold">{selectedNotification.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedNotification.type}</Badge>
                      <Badge className={
                        selectedNotification.status === "Sent" ? "bg-green-500/10 text-green-500" :
                        selectedNotification.status === "Scheduled" ? "bg-blue-500/10 text-blue-500" :
                        "bg-gray-500/10 text-gray-500"
                      }>
                        {selectedNotification.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30">
                  <p className="text-sm">{selectedNotification.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Audience</p>
                    <p className="font-medium">{selectedNotification.audience}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Sent To</p>
                    <p className="font-medium">{selectedNotification.sentTo.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Opened</p>
                    <p className="font-medium">
                      {selectedNotification.opened.toLocaleString()}
                      {selectedNotification.sentTo > 0 && ` (${((selectedNotification.opened / selectedNotification.sentTo) * 100).toFixed(0)}%)`}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground">Sent At</p>
                    <p className="font-medium">{selectedNotification.sentAt}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Notification</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this notification? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminNotifications;

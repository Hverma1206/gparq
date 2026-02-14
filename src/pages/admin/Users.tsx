import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Search, MoreVertical, Eye, 
  Ban, CheckCircle, Mail, Phone, Calendar, Download, Loader2
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
  DialogHeader,
  DialogTitle,
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
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;

      // Get roles for each user
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role");

      // Get booking counts
      const { data: bookings } = await supabase
        .from("bookings")
        .select("user_id");

      // Get wallet balances
      const { data: wallets } = await supabase
        .from("wallet_balances")
        .select("user_id, balance");

      return (profiles || []).map(profile => {
        const userRole = roles?.find(r => r.user_id === profile.id);
        const bookingCount = bookings?.filter(b => b.user_id === profile.id).length || 0;
        const wallet = wallets?.find(w => w.user_id === profile.id);
        return {
          ...profile,
          role: userRole?.role || "user",
          bookings: bookingCount,
          wallet: wallet?.balance || 0,
        };
      });
    },
  });

  const filteredUsers = (users || []).filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || user.role === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: users?.length || 0,
    users: users?.filter(u => u.role === "user").length || 0,
    hosts: users?.filter(u => u.role === "host").length || 0,
    partners: users?.filter(u => u.role === "partner").length || 0,
  };

  const handleView = (user: any) => {
    setSelectedUser(user);
    setShowViewDialog(true);
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              User Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all platform users
            </p>
          </div>
          <Button variant="outline" className="gap-2" onClick={() => toast.success("Export started")}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Users</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.users}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Ban className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Hosts</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.hosts}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Partners</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.partners}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="host">Hosts</SelectItem>
              <SelectItem value="partner">Partners</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Wallet</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-secondary/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-display font-bold text-primary">
                              {(user.full_name || user.email)?.[0]?.toUpperCase() || "?"}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{user.full_name || "No Name"}</div>
                            <div className="text-sm text-muted-foreground">{user.id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <Mail className="h-3 w-3" /> {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" /> {user.phone}
                          </div>
                        )}
                      </TableCell>
                      <TableCell><span className="font-medium">{user.bookings}</span></TableCell>
                      <TableCell><span className="font-medium">₹{Number(user.wallet).toLocaleString()}</span></TableCell>
                      <TableCell>
                        <Badge className={
                          user.role === "admin" ? "bg-purple-500/10 text-purple-500" :
                          user.role === "host" ? "bg-blue-500/10 text-blue-500" :
                          user.role === "partner" ? "bg-amber-500/10 text-amber-500" :
                          "bg-green-500/10 text-green-500"
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(user.created_at), "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(user)}>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-primary">
                      {(selectedUser.full_name || selectedUser.email)?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{selectedUser.full_name || "No Name"}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                    <Badge className="mt-1">{selectedUser.role}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-secondary/50">
                    <div className="text-sm text-muted-foreground">Bookings</div>
                    <div className="font-display text-xl font-bold">{selectedUser.bookings}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/50">
                    <div className="text-sm text-muted-foreground">Wallet</div>
                    <div className="font-display text-xl font-bold">₹{Number(selectedUser.wallet).toLocaleString()}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/50">
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{selectedUser.phone || "Not set"}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/50">
                    <div className="text-sm text-muted-foreground">Joined</div>
                    <div className="font-medium">{format(new Date(selectedUser.created_at), "MMM d, yyyy")}</div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;

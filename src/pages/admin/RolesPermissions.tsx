import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Shield, Users, Plus, Edit, Trash2, Search,
  Key, Eye, Lock, Unlock, Crown, UserCog, Settings
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
  isSystem: boolean;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  city?: string;
  status: "active" | "inactive";
  lastActive: string;
}

const RolesPermissions = () => {
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const roles: Role[] = [
    { 
      id: "1", 
      name: "Super Admin", 
      description: "Full platform access with all permissions",
      permissions: ["all"],
      usersCount: 2,
      isSystem: true
    },
    { 
      id: "2", 
      name: "City Admin", 
      description: "Manage specific city operations and hosts",
      permissions: ["view_hosts", "approve_hosts", "view_bookings", "manage_disputes", "view_reports"],
      usersCount: 5,
      isSystem: true
    },
    { 
      id: "3", 
      name: "Support Agent", 
      description: "Handle customer support and disputes",
      permissions: ["view_users", "view_bookings", "manage_disputes", "process_refunds"],
      usersCount: 8,
      isSystem: false
    },
    { 
      id: "4", 
      name: "Finance Manager", 
      description: "Manage payouts and financial reports",
      permissions: ["view_finance", "manage_payouts", "view_reports", "export_data"],
      usersCount: 3,
      isSystem: false
    },
    { 
      id: "5", 
      name: "Content Moderator", 
      description: "Review and moderate user-generated content",
      permissions: ["view_reviews", "moderate_content", "manage_listings"],
      usersCount: 4,
      isSystem: false
    },
  ];

  const adminUsers: AdminUser[] = [
    { id: "1", name: "Rahul Sharma", email: "rahul@parq.com", role: "Super Admin", status: "active", lastActive: "2 min ago" },
    { id: "2", name: "Priya Mehta", email: "priya@parq.com", role: "City Admin", city: "Mumbai", status: "active", lastActive: "15 min ago" },
    { id: "3", name: "Amit Kumar", email: "amit@parq.com", role: "City Admin", city: "Delhi NCR", status: "active", lastActive: "1 hour ago" },
    { id: "4", name: "Neha Reddy", email: "neha@parq.com", role: "Support Agent", status: "active", lastActive: "30 min ago" },
    { id: "5", name: "Vikram Singh", email: "vikram@parq.com", role: "Finance Manager", status: "inactive", lastActive: "2 days ago" },
  ];

  const allPermissions = [
    { id: "view_users", label: "View Users", category: "Users" },
    { id: "manage_users", label: "Manage Users", category: "Users" },
    { id: "view_hosts", label: "View Hosts", category: "Hosts" },
    { id: "approve_hosts", label: "Approve Hosts", category: "Hosts" },
    { id: "manage_hosts", label: "Manage Hosts", category: "Hosts" },
    { id: "view_bookings", label: "View Bookings", category: "Bookings" },
    { id: "manage_bookings", label: "Manage Bookings", category: "Bookings" },
    { id: "view_finance", label: "View Finance", category: "Finance" },
    { id: "manage_payouts", label: "Manage Payouts", category: "Finance" },
    { id: "view_reports", label: "View Reports", category: "Reports" },
    { id: "export_data", label: "Export Data", category: "Reports" },
    { id: "manage_disputes", label: "Manage Disputes", category: "Support" },
    { id: "process_refunds", label: "Process Refunds", category: "Support" },
    { id: "view_reviews", label: "View Reviews", category: "Content" },
    { id: "moderate_content", label: "Moderate Content", category: "Content" },
    { id: "manage_listings", label: "Manage Listings", category: "Content" },
    { id: "manage_settings", label: "Manage Settings", category: "System" },
    { id: "manage_roles", label: "Manage Roles", category: "System" },
  ];

  const handleCreateRole = () => {
    toast.success("Role created successfully");
    setShowAddRoleDialog(false);
  };

  const handleEditRole = (role: Role) => {
    toast.info(`Editing role: ${role.name}`);
  };

  const handleDeleteRole = (role: Role) => {
    if (role.isSystem) {
      toast.error("System roles cannot be deleted");
      return;
    }
    toast.success(`Role "${role.name}" deleted`);
  };

  const handleToggleUserStatus = (user: AdminUser) => {
    toast.success(`User ${user.status === 'active' ? 'deactivated' : 'activated'}`);
  };

  const filteredUsers = adminUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Roles & Permissions
            </h1>
            <p className="text-muted-foreground">
              Manage admin roles and access control
            </p>
          </div>
          <Dialog open={showAddRoleDialog} onOpenChange={setShowAddRoleDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display">Create New Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role Name</Label>
                    <Input placeholder="e.g., Regional Manager" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input placeholder="Brief description of this role" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-medium">Permissions</Label>
                  {["Users", "Hosts", "Bookings", "Finance", "Reports", "Support", "Content", "System"].map(category => (
                    <div key={category} className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{category}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {allPermissions.filter(p => p.category === category).map(permission => (
                          <div key={permission.id} className="flex items-center gap-2">
                            <Checkbox id={permission.id} />
                            <label htmlFor={permission.id} className="text-sm">{permission.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowAddRoleDialog(false)}>Cancel</Button>
                  <Button onClick={handleCreateRole}>Create Role</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        role.name === 'Super Admin' ? 'bg-primary/20' : 'bg-secondary'
                      }`}>
                        {role.name === 'Super Admin' ? (
                          <Crown className="w-5 h-5 text-primary" />
                        ) : (
                          <Shield className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{role.name}</h3>
                          {role.isSystem && (
                            <Badge variant="secondary" className="text-xs">System</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{role.usersCount} users</p>
                      </div>
                    </div>
                    {!role.isSystem && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditRole(role)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteRole(role)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map(perm => (
                      <Badge key={perm} variant="outline" className="text-xs">
                        {perm === 'all' ? 'All Permissions' : perm.replace('_', ' ')}
                      </Badge>
                    ))}
                    {role.permissions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{role.permissions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Admin Users */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-xl">Admin Users</CardTitle>
                <CardDescription>Manage admin access and roles</CardDescription>
              </div>
              <Button variant="outline" className="gap-2" onClick={() => toast.info("Invite admin modal")}>
                <Plus className="w-4 h-4" /> Invite Admin
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search admins..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{user.name}</p>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{user.email}</span>
                        {user.city && (
                          <>
                            <span>•</span>
                            <span>{user.city}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant="outline">{user.role}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">Active {user.lastActive}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toast.info("Edit user")}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleToggleUserStatus(user)}
                      >
                        {user.status === 'active' ? (
                          <Lock className="w-4 h-4 text-destructive" />
                        ) : (
                          <Unlock className="w-4 h-4 text-green-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RolesPermissions;

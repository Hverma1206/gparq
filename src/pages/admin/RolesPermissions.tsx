import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Shield, Users, Plus, Edit, Trash2, Search,
  Key, Eye, Lock, Unlock, Crown, UserCog, Settings,
  MoreVertical, Mail, Phone
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
  phone: string;
  role: string;
  city?: string;
  status: "active" | "inactive";
  lastActive: string;
  joinedDate: string;
}

const RolesPermissions = () => {
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [showViewUserDialog, setShowViewUserDialog] = useState(false);
  const [showEditRoleDialog, setShowEditRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    city: "",
  });

  const [roles, setRoles] = useState<Role[]>([
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
  ]);

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    { id: "1", name: "Rahul Sharma", email: "rahul@parq.com", phone: "+91 98765 43210", role: "Super Admin", status: "active", lastActive: "2 min ago", joinedDate: "Jan 15, 2024" },
    { id: "2", name: "Priya Mehta", email: "priya@parq.com", phone: "+91 98765 43211", role: "City Admin", city: "Mumbai", status: "active", lastActive: "15 min ago", joinedDate: "Mar 20, 2024" },
    { id: "3", name: "Amit Kumar", email: "amit@parq.com", phone: "+91 98765 43212", role: "City Admin", city: "Delhi NCR", status: "active", lastActive: "1 hour ago", joinedDate: "Apr 10, 2024" },
    { id: "4", name: "Neha Reddy", email: "neha@parq.com", phone: "+91 98765 43213", role: "Support Agent", status: "active", lastActive: "30 min ago", joinedDate: "May 5, 2024" },
    { id: "5", name: "Vikram Singh", email: "vikram@parq.com", phone: "+91 98765 43214", role: "Finance Manager", status: "inactive", lastActive: "2 days ago", joinedDate: "Jun 12, 2024" },
  ]);

  const cities = ["Bangalore", "Mumbai", "Delhi NCR", "Chennai", "Hyderabad", "Pune"];

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

  // Role CRUD Handlers
  const handleCreateRole = () => {
    const newRole: Role = {
      id: String(roles.length + 1),
      name: roleForm.name,
      description: roleForm.description,
      permissions: roleForm.permissions,
      usersCount: 0,
      isSystem: false,
    };
    setRoles([...roles, newRole]);
    setShowAddRoleDialog(false);
    resetRoleForm();
    toast.success("Role created successfully");
  };

  const handleEditRole = () => {
    if (!selectedRole) return;
    setRoles(roles.map(r => 
      r.id === selectedRole.id 
        ? { ...r, name: roleForm.name, description: roleForm.description, permissions: roleForm.permissions }
        : r
    ));
    setShowEditRoleDialog(false);
    setSelectedRole(null);
    resetRoleForm();
    toast.success("Role updated successfully");
  };

  const handleDeleteRole = (role: Role) => {
    if (role.isSystem) {
      toast.error("System roles cannot be deleted");
      return;
    }
    if (role.usersCount > 0) {
      toast.error("Cannot delete role with assigned users");
      return;
    }
    setRoles(roles.filter(r => r.id !== role.id));
    toast.success(`Role "${role.name}" deleted`);
  };

  const openEditRoleDialog = (role: Role) => {
    setSelectedRole(role);
    setRoleForm({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
    });
    setShowEditRoleDialog(true);
  };

  const resetRoleForm = () => {
    setRoleForm({ name: "", description: "", permissions: [] });
  };

  const togglePermission = (permId: string) => {
    setRoleForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId]
    }));
  };

  // Admin User CRUD Handlers
  const handleCreateUser = () => {
    const newUser: AdminUser = {
      id: String(adminUsers.length + 1),
      name: userForm.name,
      email: userForm.email,
      phone: userForm.phone,
      role: userForm.role,
      city: userForm.city || undefined,
      status: "active",
      lastActive: "Just now",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setAdminUsers([newUser, ...adminUsers]);
    setShowAddUserDialog(false);
    resetUserForm();
    toast.success("Admin user invited successfully");
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    setAdminUsers(adminUsers.map(u => 
      u.id === selectedUser.id 
        ? { 
            ...u, 
            name: userForm.name, 
            email: userForm.email, 
            phone: userForm.phone,
            role: userForm.role,
            city: userForm.city || undefined,
          }
        : u
    ));
    setShowEditUserDialog(false);
    setSelectedUser(null);
    resetUserForm();
    toast.success("Admin user updated successfully");
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (user.role === "Super Admin" && adminUsers.filter(u => u.role === "Super Admin").length <= 1) {
      toast.error("Cannot delete the last Super Admin");
      return;
    }
    setAdminUsers(adminUsers.filter(u => u.id !== user.id));
    toast.success(`Admin "${user.name}" removed`);
  };

  const handleToggleUserStatus = (user: AdminUser) => {
    setAdminUsers(adminUsers.map(u => 
      u.id === user.id 
        ? { ...u, status: u.status === "active" ? "inactive" as const : "active" as const }
        : u
    ));
    toast.success(`User ${user.status === 'active' ? 'deactivated' : 'activated'}`);
  };

  const handleResendInvite = (user: AdminUser) => {
    toast.success(`Invite resent to ${user.email}`);
  };

  const handleResetPassword = (user: AdminUser) => {
    toast.success(`Password reset email sent to ${user.email}`);
  };

  const openEditUserDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      city: user.city || "",
    });
    setShowEditUserDialog(true);
  };

  const openViewUserDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setShowViewUserDialog(true);
  };

  const resetUserForm = () => {
    setUserForm({ name: "", email: "", phone: "", role: "", city: "" });
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
          <Button className="gap-2" onClick={() => setShowAddRoleDialog(true)}>
            <Plus className="w-4 h-4" /> Create Role
          </Button>
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
                        <Button variant="ghost" size="icon" onClick={() => openEditRoleDialog(role)}>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="font-display text-xl">Admin Users</CardTitle>
                <CardDescription>Manage admin access and roles</CardDescription>
              </div>
              <Button className="gap-2" onClick={() => setShowAddUserDialog(true)}>
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
                    <div className="text-right hidden sm:block">
                      <Badge variant="outline">{user.role}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">Active {user.lastActive}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openViewUserDialog(user)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditUserDialog(user)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                          <Key className="w-4 h-4 mr-2" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResendInvite(user)}>
                          <Mail className="w-4 h-4 mr-2" />
                          Resend Invite
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleToggleUserStatus(user)}>
                          {user.status === 'active' ? (
                            <>
                              <Lock className="w-4 h-4 mr-2 text-destructive" />
                              <span className="text-destructive">Deactivate</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-4 h-4 mr-2 text-green-500" />
                              <span className="text-green-500">Activate</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Create Role Dialog */}
        <Dialog open={showAddRoleDialog} onOpenChange={setShowAddRoleDialog}>
          <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">Create New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role Name</Label>
                  <Input 
                    placeholder="e.g., Regional Manager" 
                    value={roleForm.name}
                    onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input 
                    placeholder="Brief description of this role" 
                    value={roleForm.description}
                    onChange={(e) => setRoleForm({...roleForm, description: e.target.value})}
                  />
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
                          <Checkbox 
                            id={permission.id} 
                            checked={roleForm.permissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                          />
                          <label htmlFor={permission.id} className="text-sm">{permission.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowAddRoleDialog(false); resetRoleForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole} disabled={!roleForm.name}>
                Create Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Role Dialog */}
        <Dialog open={showEditRoleDialog} onOpenChange={setShowEditRoleDialog}>
          <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display">Edit Role - {selectedRole?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role Name</Label>
                  <Input 
                    value={roleForm.name}
                    onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input 
                    value={roleForm.description}
                    onChange={(e) => setRoleForm({...roleForm, description: e.target.value})}
                  />
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
                          <Checkbox 
                            id={`edit-${permission.id}`} 
                            checked={roleForm.permissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                          />
                          <label htmlFor={`edit-${permission.id}`} className="text-sm">{permission.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowEditRoleDialog(false); setSelectedRole(null); resetRoleForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleEditRole}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Admin User Dialog */}
        <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Invite Admin User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input 
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                    placeholder="admin@parq.com"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input 
                    value={userForm.phone}
                    onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <Select value={userForm.role} onValueChange={(v) => setUserForm({...userForm, role: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>City (for City Admin)</Label>
                  <Select value={userForm.city} onValueChange={(v) => setUserForm({...userForm, city: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowAddUserDialog(false); resetUserForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleCreateUser} disabled={!userForm.name || !userForm.email || !userForm.role}>
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Admin User Dialog */}
        <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Admin User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input 
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input 
                    value={userForm.phone}
                    onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <Select value={userForm.role} onValueChange={(v) => setUserForm({...userForm, role: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>City</Label>
                  <Select value={userForm.city} onValueChange={(v) => setUserForm({...userForm, city: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowEditUserDialog(false); setSelectedUser(null); resetUserForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleEditUser}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Admin User Dialog */}
        <Dialog open={showViewUserDialog} onOpenChange={setShowViewUserDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Admin User Details</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-display text-xl font-bold">{selectedUser.name}</h3>
                    <Badge variant={selectedUser.status === 'active' ? 'default' : 'secondary'}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Role</p>
                    <Badge variant="outline">{selectedUser.role}</Badge>
                  </div>
                  {selectedUser.city && (
                    <div className="p-3 rounded-lg bg-secondary/30">
                      <p className="text-xs text-muted-foreground">City</p>
                      <p className="font-medium">{selectedUser.city}</p>
                    </div>
                  )}
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="font-medium">{selectedUser.joinedDate}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Last Active</p>
                    <p className="font-medium">{selectedUser.lastActive}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewUserDialog(false)}>
                Close
              </Button>
              <Button onClick={() => { setShowViewUserDialog(false); openEditUserDialog(selectedUser!); }}>
                Edit User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default RolesPermissions;
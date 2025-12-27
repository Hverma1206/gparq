import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, Plus, Mail, Phone, Car, Wallet, 
  Shield, Crown, Edit, Trash2, Send
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "owner" | "member";
  status: "active" | "pending";
  canBook: boolean;
  canUseWallet: boolean;
  vehicles: string[];
}

const FamilyAccounts = () => {
  const [members, setMembers] = useState<FamilyMember[]>([
    { 
      id: "1", 
      name: "Rahul Sharma", 
      email: "rahul@example.com", 
      phone: "+91 98765 43210",
      role: "owner", 
      status: "active",
      canBook: true,
      canUseWallet: true,
      vehicles: ["KA-01-AB-1234", "KA-01-CD-5678"]
    },
    { 
      id: "2", 
      name: "Priya Sharma", 
      email: "priya@example.com", 
      phone: "+91 98765 43211",
      role: "member", 
      status: "active",
      canBook: true,
      canUseWallet: true,
      vehicles: ["KA-01-AB-1234"]
    },
    { 
      id: "3", 
      name: "Amit Sharma", 
      email: "amit@example.com", 
      phone: "+91 98765 43212",
      role: "member", 
      status: "pending",
      canBook: true,
      canUseWallet: false,
      vehicles: []
    },
  ]);

  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setShowInviteDialog(false);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
    toast.success("Family member removed");
  };

  const handleTogglePermission = (memberId: string, permission: "canBook" | "canUseWallet") => {
    setMembers(prev => prev.map(m => 
      m.id === memberId ? { ...m, [permission]: !m[permission] } : m
    ));
    toast.success("Permission updated");
  };

  const handleResendInvite = (email: string) => {
    toast.success(`Invitation resent to ${email}`);
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Family Account
            </h1>
            <p className="text-muted-foreground">
              Share your parking benefits with family members
            </p>
          </div>
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display">Invite Family Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input 
                    type="email"
                    placeholder="family@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  An invitation will be sent to join your family account. They can accept and create their profile.
                </p>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInvite} className="gap-2">
                    <Send className="w-4 h-4" /> Send Invite
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Family Plan Benefits */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Family Plan Active</h3>
                <p className="text-sm text-muted-foreground">Up to 5 members • Shared wallet • Shared vehicles</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-background/50">
                <p className="font-display text-2xl font-bold text-foreground">{members.length}</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <p className="font-display text-2xl font-bold text-foreground">₹2,450</p>
                <p className="text-xs text-muted-foreground">Shared Wallet</p>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <p className="font-display text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">Vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Members */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Family Members</CardTitle>
            <CardDescription>Manage access and permissions for each member</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border border-border bg-secondary/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{member.name}</h3>
                        {member.role === "owner" && (
                          <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
                            <Crown className="w-3 h-3" /> Owner
                          </Badge>
                        )}
                        {member.status === "pending" && (
                          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {member.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {member.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  {member.role !== "owner" && (
                    <div className="flex items-center gap-2">
                      {member.status === "pending" && (
                        <Button variant="outline" size="sm" onClick={() => handleResendInvite(member.email)}>
                          Resend Invite
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveMember(member.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </div>

                {member.status === "active" && member.role !== "owner" && (
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Can Book Parking</span>
                      </div>
                      <Switch 
                        checked={member.canBook}
                        onCheckedChange={() => handleTogglePermission(member.id, "canBook")}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Can Use Wallet</span>
                      </div>
                      <Switch 
                        checked={member.canUseWallet}
                        onCheckedChange={() => handleTogglePermission(member.id, "canUseWallet")}
                      />
                    </div>
                  </div>
                )}

                {member.vehicles.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Assigned Vehicles:</p>
                    <div className="flex gap-2 flex-wrap">
                      {member.vehicles.map(vehicle => (
                        <Badge key={vehicle} variant="secondary" className="gap-1">
                          <Car className="w-3 h-3" /> {vehicle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Family Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Family Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Shared Wallet</p>
                <p className="text-sm text-muted-foreground">Allow members to use the family wallet</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Booking Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified when members make bookings</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Monthly Spending Limit</p>
                <p className="text-sm text-muted-foreground">Set a limit for family spending</p>
              </div>
              <Input type="number" className="w-32" defaultValue="5000" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FamilyAccounts;

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Ban, UserX, Shield, AlertTriangle, 
  Calendar, MapPin, Unlock, Info
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface BlockedHost {
  id: string;
  name: string;
  location: string;
  blockedAt: string;
  reason: string;
}

const BlockedUsers = () => {
  const [blockedHosts, setBlockedHosts] = useState<BlockedHost[]>([
    { 
      id: "1", 
      name: "Forum Mall Parking", 
      location: "Koramangala, Bangalore",
      blockedAt: "Dec 15, 2025",
      reason: "Poor service experience"
    },
    { 
      id: "2", 
      name: "Brigade Gateway Parking", 
      location: "Rajajinagar, Bangalore",
      blockedAt: "Dec 10, 2025",
      reason: "Disputed charges"
    },
  ]);

  const handleUnblock = (hostId: string) => {
    setBlockedHosts(prev => prev.filter(h => h.id !== hostId));
    toast.success("Host unblocked. You can now book their spaces.");
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Blocked Hosts
          </h1>
          <p className="text-muted-foreground">
            Manage hosts you've blocked. Their listings won't appear in your searches.
          </p>
        </div>

        {/* Info Card */}
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Why block a host?</p>
                <p className="text-sm text-muted-foreground">
                  Blocking a host hides their listings from your search results. This is useful if you had a bad experience and want to avoid booking with them again.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blocked Hosts List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Ban className="w-5 h-5 text-destructive" />
              Blocked Hosts ({blockedHosts.length})
            </CardTitle>
            <CardDescription>
              You can unblock hosts anytime to see their listings again
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {blockedHosts.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-medium text-foreground mb-2">
                  No Blocked Hosts
                </h3>
                <p className="text-muted-foreground">
                  You haven't blocked any hosts yet. Block hosts from their listing page if needed.
                </p>
              </div>
            ) : (
              blockedHosts.map((host, index) => (
                <motion.div
                  key={host.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-destructive/10 text-destructive">
                        <UserX className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-foreground">{host.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {host.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Blocked: {host.blockedAt}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Reason: {host.reason}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => handleUnblock(host.id)}
                  >
                    <Unlock className="w-4 h-4" /> Unblock
                  </Button>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Account Restrictions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Your Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-medium text-foreground">Account in Good Standing</p>
                  <p className="text-sm text-muted-foreground">
                    No restrictions on your account. You can book any available parking.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-secondary/30 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> If you violate our terms of service, hosts may block you from booking their spaces. 
                Repeated violations may result in account suspension.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BlockedUsers;

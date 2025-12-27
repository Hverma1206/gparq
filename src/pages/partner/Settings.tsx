import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, Mail, Phone, MapPin, Building2, Save, 
  Bell, Shield, CreditCard, Clock
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const PartnerSettings = () => {
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    businessName: "Quick Wash Services",
    ownerName: "Rajesh Kumar",
    email: "rajesh@quickwash.com",
    phone: "+91 98765 43210",
    address: "123, Auto Nagar, Koramangala, Bangalore - 560034",
    gst: "29XXXXX1234X1Z5",
    serviceType: "car-wash",
  });

  const [notifications, setNotifications] = useState({
    newJobs: true,
    jobUpdates: true,
    payouts: true,
    marketing: false,
    sms: true,
  });

  const [payout, setPayout] = useState({
    bankName: "HDFC Bank",
    accountNumber: "XXXX XXXX 4567",
    ifsc: "HDFC0001234",
    upiId: "quickwash@upi",
    frequency: "weekly",
  });

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your preferences have been updated successfully." });
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your business profile and preferences
            </p>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>

        {/* Business Profile */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Business Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Owner Name</Label>
                <Input
                  value={profile.ownerName}
                  onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    className="pl-10"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    className="pl-10"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Business Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  className="pl-10"
                  rows={2}
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GST Number</Label>
                <Input
                  value={profile.gst}
                  onChange={(e) => setProfile({ ...profile, gst: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select value={profile.serviceType} onValueChange={(v) => setProfile({ ...profile, serviceType: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car-wash">Car Wash</SelectItem>
                    <SelectItem value="ev-charging">EV Charging</SelectItem>
                    <SelectItem value="repairs">Repairs & Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payout Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payout Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bank Name</Label>
                <Input
                  value={payout.bankName}
                  onChange={(e) => setPayout({ ...payout, bankName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Account Number</Label>
                <Input
                  value={payout.accountNumber}
                  onChange={(e) => setPayout({ ...payout, accountNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>IFSC Code</Label>
                <Input
                  value={payout.ifsc}
                  onChange={(e) => setPayout({ ...payout, ifsc: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>UPI ID (Optional)</Label>
                <Input
                  value={payout.upiId}
                  onChange={(e) => setPayout({ ...payout, upiId: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payout Frequency</Label>
              <Select value={payout.frequency} onValueChange={(v) => setPayout({ ...payout, frequency: v })}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>New Job Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when new jobs are available</p>
              </div>
              <Switch
                checked={notifications.newJobs}
                onCheckedChange={(v) => setNotifications({ ...notifications, newJobs: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Job Updates</Label>
                <p className="text-sm text-muted-foreground">Updates on your ongoing jobs</p>
              </div>
              <Switch
                checked={notifications.jobUpdates}
                onCheckedChange={(v) => setNotifications({ ...notifications, jobUpdates: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Payout Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when payments are processed</p>
              </div>
              <Switch
                checked={notifications.payouts}
                onCheckedChange={(v) => setNotifications({ ...notifications, payouts: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive SMS for important updates</p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(v) => setNotifications({ ...notifications, sms: v })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing & Promotions</Label>
                <p className="text-sm text-muted-foreground">Tips and offers to grow your business</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(v) => setNotifications({ ...notifications, marketing: v })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div>
                <Label>Password</Label>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerSettings;

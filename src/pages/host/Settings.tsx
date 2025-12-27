import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, Wallet, User, Shield, Trash2, 
  Mail, Smartphone, IndianRupee, Building2, CreditCard
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const HostSettings = () => {
  const [notifications, setNotifications] = useState({
    newBooking: true,
    bookingCancellation: true,
    paymentReceived: true,
    reviewReceived: true,
    promotions: false,
    smsAlerts: true,
    emailDigest: "daily",
  });

  const [payout, setPayout] = useState({
    bankName: "HDFC Bank",
    accountNumber: "****4521",
    ifscCode: "HDFC0001234",
    accountType: "savings",
    payoutSchedule: "weekly",
  });

  const handleNotificationChange = (key: string, value: boolean | string) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success("Notification preference updated");
  };

  const handleSavePayoutSettings = () => {
    toast.success("Payout settings saved successfully");
  };

  const handleSaveAccountSettings = () => {
    toast.success("Account settings saved successfully");
  };

  const handleDeactivateAccount = () => {
    toast.info("Account deactivation request sent. Our team will contact you.");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion requires verification. Check your email for instructions.");
  };

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your notifications, payouts, and account preferences
          </p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="payouts" className="gap-2">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Payouts</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Choose what email notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground font-medium">New Booking</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone books your space</p>
                  </div>
                  <Switch 
                    checked={notifications.newBooking}
                    onCheckedChange={(checked) => handleNotificationChange("newBooking", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground font-medium">Booking Cancellation</Label>
                    <p className="text-sm text-muted-foreground">Get notified when a booking is cancelled</p>
                  </div>
                  <Switch 
                    checked={notifications.bookingCancellation}
                    onCheckedChange={(checked) => handleNotificationChange("bookingCancellation", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground font-medium">Payment Received</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you receive a payment</p>
                  </div>
                  <Switch 
                    checked={notifications.paymentReceived}
                    onCheckedChange={(checked) => handleNotificationChange("paymentReceived", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground font-medium">Review Received</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you receive a new review</p>
                  </div>
                  <Switch 
                    checked={notifications.reviewReceived}
                    onCheckedChange={(checked) => handleNotificationChange("reviewReceived", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground font-medium">Promotions & Tips</Label>
                    <p className="text-sm text-muted-foreground">Receive promotional offers and hosting tips</p>
                  </div>
                  <Switch 
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-foreground font-medium">Email Digest Frequency</Label>
                      <p className="text-sm text-muted-foreground">How often to receive summary emails</p>
                    </div>
                    <Select 
                      value={notifications.emailDigest}
                      onValueChange={(value) => handleNotificationChange("emailDigest", value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  SMS Notifications
                </CardTitle>
                <CardDescription>
                  Get important alerts via SMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-foreground font-medium">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive SMS for urgent notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("smsAlerts", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payouts Tab */}
          <TabsContent value="payouts" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Bank Account Details
                </CardTitle>
                <CardDescription>
                  Your earnings will be transferred to this account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input 
                      value={payout.bankName}
                      onChange={(e) => setPayout(prev => ({ ...prev, bankName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input 
                      value={payout.accountNumber}
                      onChange={(e) => setPayout(prev => ({ ...prev, accountNumber: e.target.value }))}
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>IFSC Code</Label>
                    <Input 
                      value={payout.ifscCode}
                      onChange={(e) => setPayout(prev => ({ ...prev, ifscCode: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select 
                      value={payout.accountType}
                      onValueChange={(value) => setPayout(prev => ({ ...prev, accountType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="current">Current</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleSavePayoutSettings} className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  Save Bank Details
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  Payout Schedule
                </CardTitle>
                <CardDescription>
                  Choose when you want to receive your earnings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Payout Frequency</Label>
                  <Select 
                    value={payout.payoutSchedule}
                    onValueChange={(value) => setPayout(prev => ({ ...prev, payoutSchedule: value }))}
                  >
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily (min ₹500)</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Payouts are processed every {payout.payoutSchedule === "daily" ? "day" : payout.payoutSchedule === "weekly" ? "Monday" : payout.payoutSchedule === "biweekly" ? "1st and 15th" : "1st of the month"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <IndianRupee className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Next Payout</p>
                      <p className="text-sm text-muted-foreground">₹12,450 scheduled for Dec 30, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Account Information
                </CardTitle>
                <CardDescription>
                  Update your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Rahul Sharma" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="rahul@example.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Name (Optional)</Label>
                    <Input defaultValue="Rahul Parking Solutions" />
                  </div>
                </div>
                <Button onClick={handleSaveAccountSettings}>Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                  <div>
                    <p className="font-medium text-foreground">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline" onClick={() => toast.info("Password change email sent")}>
                    Change Password
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" onClick={() => toast.info("2FA setup started")}>
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-destructive/50">
              <CardHeader>
                <CardTitle className="font-display text-xl text-destructive flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <div>
                    <p className="font-medium text-foreground">Deactivate Account</p>
                    <p className="text-sm text-muted-foreground">Temporarily disable your host account</p>
                  </div>
                  <Button variant="outline" onClick={handleDeactivateAccount}>
                    Deactivate
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <div>
                    <p className="font-medium text-foreground">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HostSettings;

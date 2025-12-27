import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, Shield, Bell, Globe, CreditCard, Percent,
  Mail, Smartphone, Save, RefreshCw
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    platformName: "Parq",
    supportEmail: "support@parq.app",
    supportPhone: "+91 1800 123 4567",
    commissionRate: 10,
    gstRate: 18,
    minBookingDuration: 1,
    maxBookingDuration: 24,
    cancellationWindow: 2,
    refundPercent: 90,
    maintenanceMode: false,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    toast.success("Settings saved successfully");
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Platform Settings
            </h1>
            <p className="text-muted-foreground">
              Configure global platform settings
            </p>
          </div>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general" className="gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2">
              <Percent className="h-4 w-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="mt-6 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Platform Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Platform Name</Label>
                    <Input
                      value={settings.platformName}
                      onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Support Email</Label>
                    <Input
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Support Phone</Label>
                    <Input
                      value={settings.supportPhone}
                      onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">
                      When enabled, users will see a maintenance page
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={() => handleToggle("maintenanceMode")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Settings */}
          <TabsContent value="pricing" className="mt-6 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Commission & Fees
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Platform Commission (%)</Label>
                    <Input
                      type="number"
                      value={settings.commissionRate}
                      onChange={(e) => setSettings({ ...settings, commissionRate: Number(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Percentage charged on each booking
                    </p>
                  </div>
                  <div>
                    <Label>GST Rate (%)</Label>
                    <Input
                      type="number"
                      value={settings.gstRate}
                      onChange={(e) => setSettings({ ...settings, gstRate: Number(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Applied on service charges
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg">Booking Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Min Booking Duration (hours)</Label>
                    <Input
                      type="number"
                      value={settings.minBookingDuration}
                      onChange={(e) => setSettings({ ...settings, minBookingDuration: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Max Booking Duration (hours)</Label>
                    <Input
                      type="number"
                      value={settings.maxBookingDuration}
                      onChange={(e) => setSettings({ ...settings, maxBookingDuration: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Free Cancellation Window (hours)</Label>
                    <Input
                      type="number"
                      value={settings.cancellationWindow}
                      onChange={(e) => setSettings({ ...settings, cancellationWindow: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Refund Percentage (%)</Label>
                    <Input
                      type="number"
                      value={settings.refundPercent}
                      onChange={(e) => setSettings({ ...settings, refundPercent: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Send emails for important updates</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleToggle("emailNotifications")}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-4">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Send push notifications to app users</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={() => handleToggle("pushNotifications")}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-4">
                    <Smartphone className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Send SMS for critical alerts</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={() => handleToggle("smsNotifications")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">IP Whitelisting</p>
                      <p className="text-sm text-muted-foreground">Restrict admin access by IP</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;

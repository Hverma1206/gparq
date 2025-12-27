import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, BellOff, Mail, Smartphone, MessageSquare, 
  Calendar, IndianRupee, Shield, Gift, Clock, Settings,
  Check, X, Volume2, VolumeX
} from "lucide-react";
import { toast } from "sonner";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    { id: "booking_confirm", label: "Booking Confirmations", description: "When your booking is confirmed", email: true, push: true, sms: true },
    { id: "booking_reminder", label: "Booking Reminders", description: "30 mins before your parking starts", email: true, push: true, sms: false },
    { id: "booking_complete", label: "Booking Completion", description: "When your parking session ends", email: true, push: true, sms: false },
    { id: "payment_success", label: "Payment Receipts", description: "Successful payment notifications", email: true, push: true, sms: false },
    { id: "payment_failed", label: "Payment Failures", description: "When a payment fails", email: true, push: true, sms: true },
    { id: "wallet_low", label: "Low Wallet Balance", description: "When wallet balance is below ₹100", email: true, push: true, sms: false },
    { id: "promo_offers", label: "Promotions & Offers", description: "Special deals and discounts", email: true, push: false, sms: false },
    { id: "referral_update", label: "Referral Updates", description: "When someone uses your referral", email: true, push: true, sms: false },
    { id: "security_alert", label: "Security Alerts", description: "Login attempts and password changes", email: true, push: true, sms: true },
    { id: "system_update", label: "System Updates", description: "App updates and maintenance", email: false, push: true, sms: false },
  ]);

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: "22:00",
    end: "07:00"
  });

  const toggleSetting = (settingId: string, channel: "email" | "push" | "sms") => {
    setSettings(prev => prev.map(s => 
      s.id === settingId ? { ...s, [channel]: !s[channel] } : s
    ));
    toast.success("Preference updated");
  };

  const enableAll = (channel: "email" | "push" | "sms") => {
    setSettings(prev => prev.map(s => ({ ...s, [channel]: true })));
    toast.success(`All ${channel} notifications enabled`);
  };

  const disableAll = (channel: "email" | "push" | "sms") => {
    setSettings(prev => prev.map(s => ({ ...s, [channel]: false })));
    toast.success(`All ${channel} notifications disabled`);
  };

  const getCategorySettings = (category: string) => {
    const categories: Record<string, string[]> = {
      bookings: ["booking_confirm", "booking_reminder", "booking_complete"],
      payments: ["payment_success", "payment_failed", "wallet_low"],
      marketing: ["promo_offers", "referral_update"],
      security: ["security_alert", "system_update"]
    };
    return settings.filter(s => categories[category]?.includes(s.id));
  };

  const renderSettingRow = (setting: NotificationSetting) => (
    <div key={setting.id} className="flex items-center justify-between py-4 border-b last:border-0">
      <div>
        <p className="font-medium">{setting.label}</p>
        <p className="text-sm text-muted-foreground">{setting.description}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <Switch 
            checked={setting.email} 
            onCheckedChange={() => toggleSetting(setting.id, "email")}
          />
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-muted-foreground" />
          <Switch 
            checked={setting.push} 
            onCheckedChange={() => toggleSetting(setting.id, "push")}
          />
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <Switch 
            checked={setting.sms} 
            onCheckedChange={() => toggleSetting(setting.id, "sms")}
          />
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Notification Preferences</h1>
          <p className="text-muted-foreground">Manage how you receive updates and alerts</p>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Quick Controls</p>
                  <p className="text-sm text-muted-foreground">Enable or disable all notifications by channel</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => enableAll("push")}>
                  <Check className="h-4 w-4 mr-1" />
                  Enable All Push
                </Button>
                <Button variant="outline" size="sm" onClick={() => disableAll("push")}>
                  <X className="h-4 w-4 mr-1" />
                  Disable All Push
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {quietHours.enabled ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  Quiet Hours
                </CardTitle>
                <CardDescription>Mute notifications during specific hours</CardDescription>
              </div>
              <Switch 
                checked={quietHours.enabled} 
                onCheckedChange={(checked) => setQuietHours(prev => ({ ...prev, enabled: checked }))}
              />
            </div>
          </CardHeader>
          {quietHours.enabled && (
            <CardContent>
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Start Time</label>
                  <input 
                    type="time" 
                    value={quietHours.start}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                <span className="text-muted-foreground mt-6">to</span>
                <div>
                  <label className="text-sm font-medium block mb-1">End Time</label>
                  <input 
                    type="time" 
                    value={quietHours.end}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2 border rounded-md bg-background"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Push notifications will be silenced from {quietHours.start} to {quietHours.end}
              </p>
            </CardContent>
          )}
        </Card>

        {/* Category Tabs */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <IndianRupee className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="gap-2">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Offers</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> Email</span>
                  <span className="flex items-center gap-1"><Smartphone className="h-4 w-4" /> Push</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> SMS</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="bookings" className="mt-0">
                {getCategorySettings("bookings").map(renderSettingRow)}
              </TabsContent>
              <TabsContent value="payments" className="mt-0">
                {getCategorySettings("payments").map(renderSettingRow)}
              </TabsContent>
              <TabsContent value="marketing" className="mt-0">
                {getCategorySettings("marketing").map(renderSettingRow)}
              </TabsContent>
              <TabsContent value="security" className="mt-0">
                {getCategorySettings("security").map(renderSettingRow)}
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        {/* Device Registration */}
        <Card>
          <CardHeader>
            <CardTitle>Registered Devices</CardTitle>
            <CardDescription>Devices that can receive push notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "iPhone 15 Pro", lastActive: "Active now", current: true },
                { name: "Chrome on MacBook", lastActive: "2 hours ago", current: false },
                { name: "Android Phone", lastActive: "3 days ago", current: false },
              ].map((device, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {device.name}
                        {device.current && <Badge className="ml-2" variant="secondary">Current</Badge>}
                      </p>
                      <p className="text-sm text-muted-foreground">{device.lastActive}</p>
                    </div>
                  </div>
                  {!device.current && (
                    <Button variant="ghost" size="sm">Remove</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={() => toast.success("Preferences saved!")}>
            Save Preferences
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationSettings;

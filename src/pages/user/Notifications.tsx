import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, Mail, Smartphone, MessageSquare, Calendar,
  Gift, AlertTriangle, Clock, Check
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const UserNotifications = () => {
  const [settings, setSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    bookingConfirmation: true,
    bookingReminders: true,
    parkingAlerts: true,
    promotions: true,
    priceAlerts: false,
    securityAlerts: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    console.log(`Toggled ${key}`);
    toast.success("Settings updated");
  };

  const notificationTypes = [
    {
      icon: Calendar,
      title: "Booking Confirmations",
      description: "Get notified when your booking is confirmed",
      key: "bookingConfirmation" as const,
    },
    {
      icon: Clock,
      title: "Booking Reminders",
      description: "Reminders before your parking session starts",
      key: "bookingReminders" as const,
    },
    {
      icon: AlertTriangle,
      title: "Parking Alerts",
      description: "Alerts for overstay, exit reminders, etc.",
      key: "parkingAlerts" as const,
    },
    {
      icon: Gift,
      title: "Promotions & Offers",
      description: "Special deals and discount notifications",
      key: "promotions" as const,
    },
    {
      icon: Bell,
      title: "Price Alerts",
      description: "Get notified when prices drop for saved locations",
      key: "priceAlerts" as const,
    },
  ];

  return (
    <DashboardLayout type="user">
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Notification Settings
          </h1>
          <p className="text-muted-foreground">
            Manage how you receive notifications
          </p>
        </div>

        {/* Notification Channels */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Notification Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Label className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
              </div>
              <Switch
                checked={settings.pushEnabled}
                onCheckedChange={() => handleToggle("pushEnabled")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailEnabled}
                onCheckedChange={() => handleToggle("emailEnabled")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <Label className="text-base font-medium">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive SMS for critical alerts</p>
                </div>
              </div>
              <Switch
                checked={settings.smsEnabled}
                onCheckedChange={() => handleToggle("smsEnabled")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Types */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Notification Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationTypes.map((type, index) => (
              <motion.div
                key={type.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                {index > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <type.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">{type.title}</Label>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings[type.key]}
                    onCheckedChange={() => handleToggle(type.key)}
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Security Alert (Always On) */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <Label className="text-base font-medium">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Critical security notifications (always enabled)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-500">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Always On</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserNotifications;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, Moon, Globe, Smartphone, Shield, CreditCard, 
  MapPin, Volume2, Vibrate, Mail
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const UserSettings = () => {
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    promotionalEmails: false,
    darkMode: true,
    language: "en",
    currency: "INR",
    locationAccess: true,
    soundEffects: true,
    vibration: true,
    biometricAuth: false,
    savePaymentMethods: true,
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings({ ...settings, [key]: value });
    toast({ title: "Settings updated", description: "Your preferences have been saved." });
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Customize your Parq experience
          </p>
        </div>

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
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts on your device</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(v) => updateSetting("pushNotifications", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Get updates via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(v) => updateSetting("emailNotifications", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive text messages</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(v) => updateSetting("smsNotifications", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Booking Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded before your parking ends</p>
              </div>
              <Switch
                checked={settings.bookingReminders}
                onCheckedChange={(v) => updateSetting("bookingReminders", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Promotional Emails</Label>
                <p className="text-sm text-muted-foreground">Receive offers and discounts</p>
              </div>
              <Switch
                checked={settings.promotionalEmails}
                onCheckedChange={(v) => updateSetting("promotionalEmails", v)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Use dark theme</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(v) => updateSetting("darkMode", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred language</p>
              </div>
              <Select value={settings.language} onValueChange={(v) => updateSetting("language", v)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Currency</Label>
                <p className="text-sm text-muted-foreground">Display prices in</p>
              </div>
              <Select value={settings.currency} onValueChange={(v) => updateSetting("currency", v)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">₹ INR</SelectItem>
                  <SelectItem value="USD">$ USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Location Access</Label>
                <p className="text-sm text-muted-foreground">Allow Parq to access your location</p>
              </div>
              <Switch
                checked={settings.locationAccess}
                onCheckedChange={(v) => updateSetting("locationAccess", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Biometric Authentication</Label>
                <p className="text-sm text-muted-foreground">Use fingerprint or face ID</p>
              </div>
              <Switch
                checked={settings.biometricAuth}
                onCheckedChange={(v) => updateSetting("biometricAuth", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Save Payment Methods</Label>
                <p className="text-sm text-muted-foreground">Remember cards for faster checkout</p>
              </div>
              <Switch
                checked={settings.savePaymentMethods}
                onCheckedChange={(v) => updateSetting("savePaymentMethods", v)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sound & Haptics */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" />
              Sound & Haptics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sound Effects</Label>
                <p className="text-sm text-muted-foreground">Play sounds for actions</p>
              </div>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={(v) => updateSetting("soundEffects", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Vibration</Label>
                <p className="text-sm text-muted-foreground">Haptic feedback for interactions</p>
              </div>
              <Switch
                checked={settings.vibration}
                onCheckedChange={(v) => updateSetting("vibration", v)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserSettings;

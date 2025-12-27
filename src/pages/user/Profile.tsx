import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, Mail, Phone, Car, Shield, Bell, Lock, 
  ChevronRight, Camera, LogOut, Trash2, CheckCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
  });

  const vehicles = [
    { id: 1, name: "Honda City", number: "KA 01 AB 1234", type: "Sedan", primary: true },
    { id: 2, name: "TVS Jupiter", number: "KA 01 CD 5678", type: "Two Wheeler", primary: false },
  ];

  const menuItems = [
    { icon: Car, label: "My Vehicles", href: "/user/vehicles", badge: vehicles.length },
    { icon: Bell, label: "Notifications", href: "/user/notifications" },
    { icon: Lock, label: "Change Password", href: "/change-password" },
    { icon: Shield, label: "Privacy Settings", href: "/user/settings" },
  ];

  const handleSaveChanges = () => {
    toast.success("Profile updated successfully");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Card */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {profile.name}
                </h2>
                <p className="text-muted-foreground">{profile.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Verified Account</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardContent>
        </Card>

        {/* My Vehicles */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-xl">My Vehicles</CardTitle>
            <Button variant="outline" size="sm" onClick={() => toast.info("Add vehicle coming soon!")}>Add Vehicle</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {vehicle.name}
                      {vehicle.primary && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {vehicle.number} • {vehicle.type}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${
                  index !== menuItems.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="bg-primary/10 text-primary text-sm px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-card border-destructive/20">
          <CardContent className="p-6 space-y-4">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive" onClick={() => toast.error("This action cannot be undone")}>
              <Trash2 className="h-5 w-5" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

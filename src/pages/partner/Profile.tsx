import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, Mail, Phone, MapPin, Camera, CheckCircle,
  Star, Calendar, Wrench, Award
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const PartnerProfile = () => {
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    businessName: "Quick Wash Services",
    ownerName: "Rajesh Kumar",
    email: "rajesh@quickwash.com",
    phone: "+91 98765 43210",
    about: "Professional car washing and detailing services with 5+ years of experience. We specialize in premium car care using eco-friendly products.",
  });

  const stats = [
    { label: "Total Jobs", value: "456", icon: Wrench },
    { label: "Rating", value: "4.9", icon: Star },
    { label: "Member Since", value: "Jan 2024", icon: Calendar },
    { label: "Badges", value: "5", icon: Award },
  ];

  const badges = [
    { name: "Top Performer", desc: "Top 10% partner", color: "bg-yellow-500" },
    { name: "Quick Responder", desc: "Avg response < 5 min", color: "bg-blue-500" },
    { name: "100+ Jobs", desc: "Completed 100 jobs", color: "bg-green-500" },
    { name: "5-Star Service", desc: "50+ 5-star reviews", color: "bg-purple-500" },
    { name: "Verified Partner", desc: "KYC verified", color: "bg-primary" },
  ];

  const handleSave = () => {
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your public profile and business information
          </p>
        </div>

        {/* Profile Header */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="text-2xl">RK</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {profile.businessName}
                  </h2>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{profile.ownerName} • Car Wash Services</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" /> {profile.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" /> {profile.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Bangalore
                  </span>
                </div>
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Edit Profile */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>About Your Business</Label>
                <Textarea
                  rows={4}
                  value={profile.about}
                  onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                  placeholder="Tell customers about your services..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Earned Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {badges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50"
                >
                  <div className={`w-10 h-10 rounded-full ${badge.color} flex items-center justify-center`}>
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{badge.name}</div>
                    <div className="text-sm text-muted-foreground">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PartnerProfile;

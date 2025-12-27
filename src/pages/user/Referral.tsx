import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Gift, Copy, Share2, Users, IndianRupee, CheckCircle,
  Clock, Facebook, Twitter, MessageCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const UserReferral = () => {
  const referralCode = "PARQ2024RS";
  const referralLink = `https://parq.app/refer/${referralCode}`;
  
  const stats = {
    totalReferred: 8,
    successfulReferrals: 5,
    pendingReferrals: 3,
    totalEarnings: 500,
  };

  const referrals = [
    { name: "Amit K.", status: "completed", reward: 100, date: "Dec 20, 2025" },
    { name: "Priya M.", status: "completed", reward: 100, date: "Dec 15, 2025" },
    { name: "Rahul S.", status: "completed", reward: 100, date: "Dec 10, 2025" },
    { name: "Neha R.", status: "pending", reward: 100, date: "Dec 24, 2025" },
    { name: "Vikram P.", status: "pending", reward: 100, date: "Dec 23, 2025" },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    console.log("Copied referral code");
    toast.success("Referral code copied!");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    console.log("Copied referral link");
    toast.success("Referral link copied!");
  };

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`);
    toast.info(`Opening ${platform}...`);
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Refer & Earn
          </h1>
          <p className="text-muted-foreground">
            Invite friends and earn rewards when they book
          </p>
        </div>

        {/* Referral Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">
                Get ₹100 for every friend
              </h2>
              <p className="opacity-80">
                Your friend also gets ₹100 on their first booking
              </p>
            </div>

            {/* Referral Code */}
            <div className="bg-primary-foreground/10 rounded-xl p-4 mb-4">
              <p className="text-sm opacity-80 mb-2 text-center">Your Referral Code</p>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-bold tracking-wider">
                  {referralCode}
                </span>
                <Button 
                  variant="secondary" 
                  size="icon"
                  onClick={handleCopyCode}
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex justify-center gap-3">
              <Button 
                variant="secondary" 
                size="icon"
                onClick={() => handleShare("WhatsApp")}
                className="bg-green-500 hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                onClick={() => handleShare("Facebook")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                onClick={() => handleShare("Twitter")}
                className="bg-sky-500 hover:bg-sky-600"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                onClick={handleCopyLink}
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Total Referred", value: stats.totalReferred, color: "text-blue-500" },
            { icon: CheckCircle, label: "Successful", value: stats.successfulReferrals, color: "text-green-500" },
            { icon: Clock, label: "Pending", value: stats.pendingReferrals, color: "text-yellow-500" },
            { icon: IndianRupee, label: "Total Earned", value: `₹${stats.totalEarnings}`, color: "text-primary" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Referral Link */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2">Your Referral Link</p>
            <div className="flex gap-2">
              <Input value={referralLink} readOnly className="font-mono text-sm" />
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Referral History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Referral History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referrals.map((referral, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{referral.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-xs text-muted-foreground">{referral.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={referral.status === "completed" ? "default" : "secondary"}>
                      {referral.status === "completed" ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Completed</>
                      ) : (
                        <><Clock className="h-3 w-3 mr-1" /> Pending</>
                      )}
                    </Badge>
                    <span className={`font-medium ${
                      referral.status === "completed" ? "text-green-500" : "text-muted-foreground"
                    }`}>
                      {referral.status === "completed" ? `+₹${referral.reward}` : "₹0"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserReferral;

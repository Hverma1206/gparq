import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Gift, Users, Copy, Share2, IndianRupee, Trophy, 
  CheckCircle, Clock, ArrowRight, Sparkles, MessageCircle
} from "lucide-react";
import { toast } from "sonner";

interface Referral {
  id: string;
  name: string;
  status: "pending" | "signed_up" | "completed";
  reward: number;
  date: string;
}

const ReferralProgram = () => {
  const [referralCode] = useState("PARQ-RAHUL-2024");
  const referralLink = `https://parq.app/invite/${referralCode}`;

  const stats = {
    totalReferrals: 12,
    successfulReferrals: 8,
    pendingReferrals: 4,
    totalEarned: 2400,
    currentBalance: 800,
    nextMilestone: 15,
    milestoneReward: 1000
  };

  const referrals: Referral[] = [
    { id: "1", name: "Amit S.", status: "completed", reward: 300, date: "Dec 20, 2024" },
    { id: "2", name: "Priya M.", status: "completed", reward: 300, date: "Dec 18, 2024" },
    { id: "3", name: "Vikram R.", status: "signed_up", reward: 0, date: "Dec 22, 2024" },
    { id: "4", name: "Sneha K.", status: "pending", reward: 0, date: "Dec 25, 2024" },
    { id: "5", name: "Raj P.", status: "completed", reward: 300, date: "Dec 15, 2024" },
  ];

  const milestones = [
    { referrals: 5, reward: 500, achieved: true },
    { referrals: 10, reward: 1000, achieved: false },
    { referrals: 25, reward: 3000, achieved: false },
    { referrals: 50, reward: 7500, achieved: false },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Parq and get ₹100 off!",
        text: "Use my referral code to sign up on Parq and get ₹100 off your first parking!",
        url: referralLink
      });
    } else {
      copyToClipboard(referralLink);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-500">Completed</Badge>;
      case "signed_up":
        return <Badge className="bg-blue-500/10 text-blue-500">Signed Up</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Referral Program</h1>
          <p className="text-muted-foreground">Invite friends and earn rewards</p>
        </div>

        {/* Hero Card */}
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Refer & Earn ₹300</h2>
                    <p className="text-muted-foreground">For every friend who completes their first booking</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Referral Code</label>
                  <div className="flex gap-2">
                    <Input value={referralCode} readOnly className="font-mono text-lg" />
                    <Button variant="outline" onClick={() => copyToClipboard(referralCode)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={shareReferral} className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </Button>
                  <Button variant="outline" onClick={() => copyToClipboard(referralLink)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:w-80">
                <div className="bg-background p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{stats.totalReferrals}</p>
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                </div>
                <div className="bg-background p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">₹{stats.totalEarned}</p>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-medium">Share Your Code</h4>
                  <p className="text-sm text-muted-foreground">Share your unique referral code with friends</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-medium">Friend Signs Up</h4>
                  <p className="text-sm text-muted-foreground">They get ₹100 off their first booking</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-medium">You Earn Rewards</h4>
                  <p className="text-sm text-muted-foreground">Get ₹300 when they complete first booking</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Referral Milestones
            </CardTitle>
            <CardDescription>Unlock bonus rewards as you refer more friends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>{stats.successfulReferrals} of {stats.nextMilestone} referrals</span>
                <span className="text-primary font-medium">₹{stats.milestoneReward} bonus</span>
              </div>
              <Progress value={(stats.successfulReferrals / stats.nextMilestone) * 100} className="h-3" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border text-center ${
                      milestone.achieved ? "bg-primary/10 border-primary" : "bg-secondary/50"
                    }`}
                  >
                    {milestone.achieved && (
                      <CheckCircle className="h-5 w-5 text-primary mx-auto mb-2" />
                    )}
                    <p className="font-bold">{milestone.referrals} Referrals</p>
                    <p className={`text-sm ${milestone.achieved ? "text-primary" : "text-muted-foreground"}`}>
                      ₹{milestone.reward} Bonus
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral History */}
        <Card>
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
            <CardDescription>Track your referrals and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-sm text-muted-foreground">{referral.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(referral.status)}
                    {referral.reward > 0 && (
                      <span className="font-medium text-primary">+₹{referral.reward}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Share Options */}
        <Card>
          <CardHeader>
            <CardTitle>Share via</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="outline" className="gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter
              </Button>
              <Button variant="outline" className="gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
              <Button variant="outline" className="gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReferralProgram;

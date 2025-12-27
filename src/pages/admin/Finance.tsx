import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  IndianRupee, TrendingUp, TrendingDown, Download, Calendar,
  ArrowUpRight, ArrowDownRight, Building2, Users, Percent
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const AdminFinance = () => {
  const [period, setPeriod] = useState("month");

  const stats = {
    totalRevenue: 2456780,
    platformFee: 245678,
    hostPayouts: 2211102,
    pendingPayouts: 156890,
    growthPercent: 12.5,
  };

  const revenueBreakdown = [
    { label: "Booking Fees", amount: 1850000, percent: 75 },
    { label: "Service Charges", amount: 356780, percent: 15 },
    { label: "Premium Features", amount: 150000, percent: 6 },
    { label: "Late Fees", amount: 100000, percent: 4 },
  ];

  const recentTransactions = [
    { id: 1, type: "Host Payout", host: "Forum Mall Parking", amount: 45280, date: "Dec 27, 2025", status: "completed" },
    { id: 2, type: "Booking Fee", user: "Rahul S.", amount: 160, date: "Dec 27, 2025", status: "completed" },
    { id: 3, type: "Refund", user: "Priya M.", amount: -120, date: "Dec 26, 2025", status: "completed" },
    { id: 4, type: "Host Payout", host: "Brigade Gateway", amount: 32100, date: "Dec 26, 2025", status: "pending" },
    { id: 5, type: "Booking Fee", user: "Amit K.", amount: 200, date: "Dec 26, 2025", status: "completed" },
  ];

  const handleExport = () => {
    console.log("Exporting finance report");
    toast.success("Report exported successfully");
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Finance Overview
            </h1>
            <p className="text-muted-foreground">
              Platform revenue and payout management
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="h-5 w-5" />
                <span className="text-sm opacity-80">Total Revenue</span>
              </div>
              <p className="font-display text-2xl font-bold">
                ₹{(stats.totalRevenue / 100000).toFixed(1)}L
              </p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <ArrowUpRight className="h-4 w-4" />
                <span>{stats.growthPercent}% vs last period</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Platform Fee</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                ₹{(stats.platformFee / 100000).toFixed(1)}L
              </p>
              <p className="text-sm text-muted-foreground mt-2">10% commission</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Host Payouts</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                ₹{(stats.hostPayouts / 100000).toFixed(1)}L
              </p>
              <p className="text-sm text-muted-foreground mt-2">90% to hosts</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                ₹{(stats.pendingPayouts / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-muted-foreground mt-2">Next payout: Dec 30</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBreakdown.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.label}</span>
                    <span className="font-display font-bold">₹{(item.amount / 100000).toFixed(2)}L</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ delay: 0.2 * index, duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.percent}% of total</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.amount > 0 ? "bg-green-500/10" : "bg-red-500/10"
                    }`}>
                      {tx.amount > 0 ? (
                        <ArrowUpRight className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{tx.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {tx.host || tx.user} • {tx.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-display font-bold ${
                      tx.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {tx.status}
                    </Badge>
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

export default AdminFinance;

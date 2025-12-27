import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight,
  Calendar, Download, Wallet, CreditCard
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const PartnerEarnings = () => {
  const stats = [
    { label: "Total Earnings", value: "₹1,45,200", change: "+12%", up: true },
    { label: "This Month", value: "₹45,200", change: "+8%", up: true },
    { label: "Pending Payout", value: "₹12,500", change: "", up: true },
    { label: "Last Payout", value: "₹32,700", change: "Dec 20", up: true },
  ];

  const transactions = [
    { id: 1, service: "Premium Car Wash", date: "Dec 27, 2025", amount: 499, status: "completed" },
    { id: 2, service: "EV Charging", date: "Dec 27, 2025", amount: 350, status: "completed" },
    { id: 3, service: "Interior Cleaning", date: "Dec 26, 2025", amount: 799, status: "completed" },
    { id: 4, service: "Basic Wash", date: "Dec 26, 2025", amount: 249, status: "completed" },
    { id: 5, service: "Premium Car Wash", date: "Dec 25, 2025", amount: 499, status: "completed" },
    { id: 6, service: "Tyre Repair", date: "Dec 25, 2025", amount: 150, status: "completed" },
  ];

  const payouts = [
    { id: 1, date: "Dec 20, 2025", amount: 32700, status: "completed", method: "Bank Transfer" },
    { id: 2, date: "Dec 13, 2025", amount: 28500, status: "completed", method: "Bank Transfer" },
    { id: 3, date: "Dec 6, 2025", amount: 35200, status: "completed", method: "Bank Transfer" },
  ];

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Earnings
            </h1>
            <p className="text-muted-foreground">
              Track your income and manage payouts
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <IndianRupee className="h-6 w-6 text-primary" />
                  {stat.change && (
                    <span className={`flex items-center text-sm ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div>
                    <div className="font-medium text-foreground">{txn.service}</div>
                    <div className="text-sm text-muted-foreground">{txn.date}</div>
                  </div>
                  <div className="text-green-500 font-medium">+₹{txn.amount}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payout History */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-xl">Payout History</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Wallet className="w-4 h-4" /> Payout Settings
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {payouts.map((payout) => (
                <div
                  key={payout.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">₹{payout.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{payout.date}</div>
                    </div>
                  </div>
                  <span className="text-sm text-green-500">Completed</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PartnerEarnings;

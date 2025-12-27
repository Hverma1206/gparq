import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  IndianRupee, TrendingUp, Calendar, Download, 
  ArrowUpRight, ArrowDownRight, Building, Clock
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Earnings = () => {
  const [period, setPeriod] = useState("month");

  const stats = {
    totalEarnings: "₹45,280",
    thisMonth: "₹12,450",
    pending: "₹2,850",
    withdrawn: "₹30,000",
  };

  const transactions = [
    { id: 1, type: "earning", description: "Booking #PQ123459", location: "Forum Mall", amount: 120, date: "Dec 25, 2025" },
    { id: 2, type: "earning", description: "Booking #PQ123458", location: "Forum Mall", amount: 80, date: "Dec 25, 2025" },
    { id: 3, type: "withdrawal", description: "Bank Transfer", location: "HDFC Bank ****4532", amount: 5000, date: "Dec 24, 2025" },
    { id: 4, type: "earning", description: "Booking #PQ123457", location: "Brigade Gateway", amount: 150, date: "Dec 24, 2025" },
    { id: 5, type: "earning", description: "Booking #PQ123456", location: "Forum Mall", amount: 200, date: "Dec 23, 2025" },
  ];

  const monthlyData = [
    { month: "Jul", amount: 8500 },
    { month: "Aug", amount: 9200 },
    { month: "Sep", amount: 7800 },
    { month: "Oct", amount: 10500 },
    { month: "Nov", amount: 11200 },
    { month: "Dec", amount: 12450 },
  ];

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Earnings
              </h1>
              <p className="text-muted-foreground">
                Track your earnings and manage payouts
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-5 w-5" />
              Download Report
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-6">
                <IndianRupee className="h-8 w-8 mb-4 opacity-80" />
                <div className="font-display text-2xl font-bold mb-1">
                  {stats.totalEarnings}
                </div>
                <div className="text-sm opacity-80">Total Earnings</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                  <span className="text-sm text-green-500 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    +12%
                  </span>
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stats.thisMonth}
                </div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-yellow-500 mb-4" />
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stats.pending}
                </div>
                <div className="text-sm text-muted-foreground">Pending Payout</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <Building className="h-8 w-8 text-blue-500 mb-4" />
                <div className="font-display text-2xl font-bold text-foreground mb-1">
                  {stats.withdrawn}
                </div>
                <div className="text-sm text-muted-foreground">Total Withdrawn</div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Earnings Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Earnings Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-4">
                    {monthlyData.map((data, index) => (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-secondary rounded-t-lg relative" style={{ height: '200px' }}>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(data.amount / maxAmount) * 100}%` }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                            className="absolute bottom-0 w-full bg-primary rounded-t-lg"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{data.month}</span>
                        <span className="text-xs font-medium">₹{(data.amount / 1000).toFixed(1)}k</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payout Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Payout</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-sm text-muted-foreground mb-2">Available for Withdrawal</div>
                    <div className="font-display text-4xl font-bold text-primary">
                      {stats.pending}
                    </div>
                  </div>
                  <Button className="w-full mb-4">Withdraw to Bank</Button>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">HDFC Bank</div>
                        <div className="text-sm text-muted-foreground">****4532</div>
                      </div>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Change Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="earnings">Earnings</TabsTrigger>
                    <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            tx.type === "earning" ? "bg-green-500/10" : "bg-blue-500/10"
                          }`}>
                            {tx.type === "earning" ? (
                              <ArrowDownRight className="h-6 w-6 text-green-500" />
                            ) : (
                              <ArrowUpRight className="h-6 w-6 text-blue-500" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{tx.description}</div>
                            <div className="text-sm text-muted-foreground">{tx.location}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-display text-lg font-semibold ${
                            tx.type === "earning" ? "text-green-500" : "text-foreground"
                          }`}>
                            {tx.type === "earning" ? "+" : "-"}₹{tx.amount}
                          </div>
                          <div className="text-sm text-muted-foreground">{tx.date}</div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="earnings" className="space-y-4">
                    {transactions.filter(tx => tx.type === "earning").map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <ArrowDownRight className="h-6 w-6 text-green-500" />
                          </div>
                          <div>
                            <div className="font-medium">{tx.description}</div>
                            <div className="text-sm text-muted-foreground">{tx.location}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-lg font-semibold text-green-500">
                            +₹{tx.amount}
                          </div>
                          <div className="text-sm text-muted-foreground">{tx.date}</div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="withdrawals" className="space-y-4">
                    {transactions.filter(tx => tx.type === "withdrawal").map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <ArrowUpRight className="h-6 w-6 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-medium">{tx.description}</div>
                            <div className="text-sm text-muted-foreground">{tx.location}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-lg font-semibold">
                            -₹{tx.amount}
                          </div>
                          <div className="text-sm text-muted-foreground">{tx.date}</div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Earnings;

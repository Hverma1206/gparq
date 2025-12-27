import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, 
  CreditCard, Smartphone, Building, Gift, Clock
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Wallet = () => {
  const [amount, setAmount] = useState("");

  const quickAmounts = [100, 200, 500, 1000, 2000];

  const transactions = [
    { id: 1, type: "credit", description: "Added to wallet", amount: 500, date: "Dec 24, 2025", time: "10:30 AM" },
    { id: 2, type: "debit", description: "Parking at Forum Mall", amount: 120, date: "Dec 24, 2025", time: "5:00 PM" },
    { id: 3, type: "credit", description: "Refund - Cancelled Booking", amount: 180, date: "Dec 22, 2025", time: "2:15 PM" },
    { id: 4, type: "debit", description: "Parking at Indiranagar Metro", amount: 350, date: "Dec 22, 2025", time: "6:00 PM" },
    { id: 5, type: "credit", description: "Referral Bonus", amount: 100, date: "Dec 20, 2025", time: "11:00 AM" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              My Wallet
            </h1>
            <p className="text-muted-foreground">
              Add money, view transactions, and manage your payments
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                      <WalletIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm opacity-80">Available Balance</div>
                      <div className="font-display text-3xl font-bold">₹2,450</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-primary-foreground/10 rounded-xl p-3">
                      <div className="opacity-80 mb-1">This Month</div>
                      <div className="font-semibold">₹1,850 spent</div>
                    </div>
                    <div className="bg-primary-foreground/10 rounded-xl p-3">
                      <div className="opacity-80 mb-1">Savings</div>
                      <div className="font-semibold">₹320 saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Add Money */}
              <Card className="bg-card border-border mt-6">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Add Money</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Enter Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-medium">₹</span>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                          className="pl-10 text-2xl font-display h-14"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {quickAmounts.map((amt) => (
                        <Button
                          key={amt}
                          variant="outline"
                          size="sm"
                          onClick={() => setAmount(amt.toString())}
                          className={amount === amt.toString() ? "border-primary bg-primary/10" : ""}
                        >
                          +₹{amt}
                        </Button>
                      ))}
                    </div>

                    <Button className="w-full" size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      Add ₹{amount || 0}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="bg-card border-border mt-6">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground">**** 4532</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">UPI</div>
                      <div className="text-sm text-muted-foreground">rahul@upi</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <Building className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Net Banking</div>
                      <div className="text-sm text-muted-foreground">HDFC Bank</div>
                    </div>
                  </button>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-6">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="credits">Credits</TabsTrigger>
                      <TabsTrigger value="debits">Debits</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                      {transactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              tx.type === "credit" ? "bg-green-500/10" : "bg-red-500/10"
                            }`}>
                              {tx.type === "credit" ? (
                                <ArrowDownLeft className="h-6 w-6 text-green-500" />
                              ) : (
                                <ArrowUpRight className="h-6 w-6 text-red-500" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{tx.description}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {tx.date} at {tx.time}
                              </div>
                            </div>
                          </div>
                          <div className={`font-display text-lg font-semibold ${
                            tx.type === "credit" ? "text-green-500" : "text-foreground"
                          }`}>
                            {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="credits" className="space-y-4">
                      {transactions.filter(tx => tx.type === "credit").map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                              <ArrowDownLeft className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                              <div className="font-medium">{tx.description}</div>
                              <div className="text-sm text-muted-foreground">{tx.date}</div>
                            </div>
                          </div>
                          <div className="font-display text-lg font-semibold text-green-500">
                            +₹{tx.amount}
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="debits" className="space-y-4">
                      {transactions.filter(tx => tx.type === "debit").map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                              <ArrowUpRight className="h-6 w-6 text-red-500" />
                            </div>
                            <div>
                              <div className="font-medium">{tx.description}</div>
                              <div className="text-sm text-muted-foreground">{tx.date}</div>
                            </div>
                          </div>
                          <div className="font-display text-lg font-semibold">
                            -₹{tx.amount}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Offers */}
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 mt-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Gift className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                        Get 10% Cashback
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Add ₹1000 or more and get 10% cashback up to ₹100
                      </p>
                    </div>
                    <Button>Claim Offer</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wallet;

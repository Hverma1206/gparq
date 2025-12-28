import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, 
  CreditCard, Smartphone, Building, Gift, Clock, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { useWallet } from "@/hooks/useWallet";
import { format } from "date-fns";

const Wallet = () => {
  const [amount, setAmount] = useState("");
  const { balance, transactions, isLoading, addMoney, isAdding, monthlyStats } = useWallet();

  const quickAmounts = [100, 200, 500, 1000, 2000];

  const handleAddMoney = () => {
    const numAmount = parseInt(amount);
    if (numAmount > 0) {
      addMoney(numAmount);
      setAmount("");
    } else {
      toast.error("Please enter a valid amount");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout type="user">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            My Wallet
          </h1>
          <p className="text-muted-foreground">
            Add money, view transactions, and manage your payments
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <WalletIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Available Balance</div>
                    <div className="font-display text-3xl font-bold">₹{balance.toLocaleString()}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-primary-foreground/10 rounded-xl p-3">
                    <div className="opacity-80 mb-1">This Month</div>
                    <div className="font-semibold">₹{monthlyStats.spent.toLocaleString()} spent</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-xl p-3">
                    <div className="opacity-80 mb-1">Credited</div>
                    <div className="font-semibold">₹{monthlyStats.credited.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Money */}
            <Card className="bg-card border-border">
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

                  <Button 
                    className="w-full" 
                    size="lg" 
                    onClick={handleAddMoney}
                    disabled={isAdding || !amount || parseInt(amount) <= 0}
                  >
                    {isAdding ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <Plus className="h-5 w-5 mr-2" />
                    )}
                    Add ₹{amount || 0}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-card border-border">
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
                    <div className="text-sm text-muted-foreground">Add a card</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">UPI</div>
                    <div className="text-sm text-muted-foreground">Link UPI ID</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Building className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Net Banking</div>
                    <div className="text-sm text-muted-foreground">Link bank account</div>
                  </div>
                </button>
                <Button variant="outline" className="w-full" onClick={() => toast.info("Add payment method coming soon!")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transactions */}
          <div className="lg:col-span-2 space-y-6">
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

                  {transactions.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <WalletIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No transactions yet</p>
                    </div>
                  ) : (
                    <>
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
                                <div className="font-medium text-foreground">{tx.description || tx.type}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {format(new Date(tx.created_at), "MMM d, yyyy 'at' h:mm a")}
                                </div>
                              </div>
                            </div>
                            <div className={`font-display text-lg font-semibold ${
                              tx.type === "credit" ? "text-green-500" : "text-foreground"
                            }`}>
                              {tx.type === "credit" ? "+" : "-"}₹{Number(tx.amount).toLocaleString()}
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
                                <div className="font-medium">{tx.description || "Credit"}</div>
                                <div className="text-sm text-muted-foreground">
                                  {format(new Date(tx.created_at), "MMM d, yyyy")}
                                </div>
                              </div>
                            </div>
                            <div className="font-display text-lg font-semibold text-green-500">
                              +₹{Number(tx.amount).toLocaleString()}
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
                                <div className="font-medium">{tx.description || "Debit"}</div>
                                <div className="text-sm text-muted-foreground">
                                  {format(new Date(tx.created_at), "MMM d, yyyy")}
                                </div>
                              </div>
                            </div>
                            <div className="font-display text-lg font-semibold">
                              -₹{Number(tx.amount).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    </>
                  )}
                </Tabs>
              </CardContent>
            </Card>

            {/* Offers */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
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
                  <Button onClick={() => {
                    setAmount("1000");
                    toast.success("Offer applied! Add ₹1000 to avail.");
                  }}>
                    Claim Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;

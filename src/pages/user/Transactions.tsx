import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowDownLeft, ArrowUpRight, Search, Calendar,
  Download, Filter, Car, Wallet, Gift
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    {
      id: 1,
      type: "debit",
      category: "parking",
      description: "Forum Mall Parking",
      amount: 120,
      date: "Dec 25, 2025",
      time: "2:30 PM",
      status: "completed",
    },
    {
      id: 2,
      type: "credit",
      category: "wallet",
      description: "Wallet Top-up",
      amount: 1000,
      date: "Dec 24, 2025",
      time: "10:00 AM",
      status: "completed",
    },
    {
      id: 3,
      type: "debit",
      category: "parking",
      description: "Brigade Gateway Parking",
      amount: 150,
      date: "Dec 23, 2025",
      time: "6:00 PM",
      status: "completed",
    },
    {
      id: 4,
      type: "credit",
      category: "refund",
      description: "Booking Refund",
      amount: 80,
      date: "Dec 22, 2025",
      time: "3:00 PM",
      status: "completed",
    },
    {
      id: 5,
      type: "credit",
      category: "reward",
      description: "Referral Bonus",
      amount: 100,
      date: "Dec 20, 2025",
      time: "12:00 PM",
      status: "completed",
    },
    {
      id: 6,
      type: "debit",
      category: "parking",
      description: "Phoenix Marketcity",
      amount: 180,
      date: "Dec 18, 2025",
      time: "4:00 PM",
      status: "completed",
    },
    {
      id: 7,
      type: "debit",
      category: "parking",
      description: "UB City Parking",
      amount: 240,
      date: "Dec 15, 2025",
      time: "1:00 PM",
      status: "completed",
    },
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case "parking": return Car;
      case "wallet": return Wallet;
      case "refund": return ArrowDownLeft;
      case "reward": return Gift;
      default: return Wallet;
    }
  };

  const handleDownload = () => {
    console.log("Downloading transaction history");
    toast.success("Transaction history downloaded");
  };

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const debits = filteredTransactions.filter(t => t.type === "debit");
  const credits = filteredTransactions.filter(t => t.type === "credit");

  const TransactionList = ({ items }: { items: typeof transactions }) => (
    <div className="space-y-3">
      {items.map((transaction, index) => {
        const Icon = getIcon(transaction.category);
        return (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <Card className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "credit" ? "bg-green-500/10" : "bg-red-500/10"
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        transaction.type === "credit" ? "text-green-500" : "text-red-500"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date} • {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-display font-bold ${
                      transaction.type === "credit" ? "text-green-500" : "text-foreground"
                    }`}>
                      {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
      {items.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No transactions found
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Transactions
            </h1>
            <p className="text-muted-foreground">
              View your payment history
            </p>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownLeft className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Money In</span>
              </div>
              <p className="font-display text-2xl font-bold text-green-500">
                ₹{credits.reduce((acc, t) => acc + t.amount, 0)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="h-5 w-5 text-red-500" />
                <span className="text-sm text-muted-foreground">Money Out</span>
              </div>
              <p className="font-display text-2xl font-bold text-red-500">
                ₹{debits.reduce((acc, t) => acc + t.amount, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Transactions List */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="credits">Credits</TabsTrigger>
            <TabsTrigger value="debits">Debits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <TransactionList items={filteredTransactions} />
          </TabsContent>
          <TabsContent value="credits" className="mt-4">
            <TransactionList items={credits} />
          </TabsContent>
          <TabsContent value="debits" className="mt-4">
            <TransactionList items={debits} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  IndianRupee, Download, Search, Calendar, Filter,
  ArrowUpRight, CheckCircle, Clock, AlertCircle, FileText
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const HostPayouts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    totalPaid: 156780,
    pending: 8450,
    thisMonth: 24500,
    lastMonth: 21200,
  };

  const payouts = [
    {
      id: "PAY-2024-001",
      amount: 12450,
      date: "Dec 25, 2025",
      status: "completed",
      bank: "HDFC Bank XXXX4521",
      period: "Dec 18 - Dec 24",
    },
    {
      id: "PAY-2024-002",
      amount: 8920,
      date: "Dec 18, 2025",
      status: "completed",
      bank: "HDFC Bank XXXX4521",
      period: "Dec 11 - Dec 17",
    },
    {
      id: "PAY-2024-003",
      amount: 15200,
      date: "Dec 11, 2025",
      status: "completed",
      bank: "HDFC Bank XXXX4521",
      period: "Dec 4 - Dec 10",
    },
    {
      id: "PAY-2024-004",
      amount: 11800,
      date: "Dec 4, 2025",
      status: "completed",
      bank: "HDFC Bank XXXX4521",
      period: "Nov 27 - Dec 3",
    },
    {
      id: "PAY-2024-005",
      amount: 8450,
      date: "Jan 1, 2026",
      status: "pending",
      bank: "HDFC Bank XXXX4521",
      period: "Dec 25 - Dec 31",
    },
  ];

  const handleDownload = (payoutId: string) => {
    console.log(`Downloading invoice for: ${payoutId}`);
    toast.success("Invoice downloaded");
  };

  const handleExportAll = () => {
    console.log("Exporting all payouts");
    toast.success("Payout history exported");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Payout History
            </h1>
            <p className="text-muted-foreground">
              Track all your earnings and payouts
            </p>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleExportAll}>
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Total Paid</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                ₹{stats.totalPaid.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                ₹{stats.pending.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">This Month</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                ₹{stats.thisMonth.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last Month</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                ₹{stats.lastMonth.toLocaleString()}
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
              placeholder="Search by payout ID..."
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

        {/* Payout List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">All Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payouts.map((payout, index) => (
                <motion.div
                  key={payout.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      payout.status === "completed" ? "bg-green-500/10" : "bg-yellow-500/10"
                    }`}>
                      {getStatusIcon(payout.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm">{payout.id}</span>
                        <Badge variant={payout.status === "completed" ? "secondary" : "default"}>
                          {payout.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {payout.period} • {payout.bank}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-display font-bold ${
                        payout.status === "completed" ? "text-green-500" : "text-foreground"
                      }`}>
                        ₹{payout.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{payout.date}</p>
                    </div>
                    {payout.status === "completed" && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDownload(payout.id)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
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

export default HostPayouts;

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  IndianRupee, TrendingUp, TrendingDown, Download, Calendar,
  ArrowUpRight, ArrowDownRight, Building2, Users, Percent,
  Plus, RefreshCw, Eye, MoreVertical, Check, X, Edit, Search
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface Transaction {
  id: string;
  type: "booking" | "payout" | "refund" | "adjustment" | "penalty";
  description: string;
  entity: string;
  entityType: "user" | "host" | "partner";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  notes?: string;
}

interface Payout {
  id: string;
  host: string;
  hostId: string;
  amount: number;
  bookings: number;
  period: string;
  status: "pending" | "processing" | "completed" | "failed";
  bankAccount: string;
  scheduledDate: string;
}

const AdminFinance = () => {
  const [period, setPeriod] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  
  const [transactionForm, setTransactionForm] = useState({
    type: "adjustment" as Transaction["type"],
    description: "",
    entity: "",
    entityType: "user" as Transaction["entityType"],
    amount: "",
    notes: "",
  });

  const [refundForm, setRefundForm] = useState({
    bookingId: "",
    amount: "",
    reason: "",
  });

  const stats = {
    totalRevenue: 2456780,
    platformFee: 245678,
    hostPayouts: 2211102,
    pendingPayouts: 156890,
    growthPercent: 12.5,
  };

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "TXN-001", type: "payout", description: "Weekly Payout", entity: "Forum Mall Parking", entityType: "host", amount: 45280, date: "Dec 27, 2025", status: "completed" },
    { id: "TXN-002", type: "booking", description: "Booking Fee", entity: "Rahul S.", entityType: "user", amount: 160, date: "Dec 27, 2025", status: "completed" },
    { id: "TXN-003", type: "refund", description: "Cancelled Booking", entity: "Priya M.", entityType: "user", amount: -120, date: "Dec 26, 2025", status: "completed" },
    { id: "TXN-004", type: "payout", description: "Weekly Payout", entity: "Brigade Gateway", entityType: "host", amount: 32100, date: "Dec 26, 2025", status: "pending" },
    { id: "TXN-005", type: "penalty", description: "Late Cancellation Penalty", entity: "Amit K.", entityType: "user", amount: 50, date: "Dec 26, 2025", status: "completed" },
  ]);

  const [payouts, setPayouts] = useState<Payout[]>([
    { id: "PAY-001", host: "Forum Mall Parking", hostId: "HST-001", amount: 45280, bookings: 156, period: "Dec 20-27, 2025", status: "pending", bankAccount: "HDFC ****1234", scheduledDate: "Dec 30, 2025" },
    { id: "PAY-002", host: "Brigade Gateway", hostId: "HST-002", amount: 32100, bookings: 98, period: "Dec 20-27, 2025", status: "pending", bankAccount: "ICICI ****5678", scheduledDate: "Dec 30, 2025" },
    { id: "PAY-003", host: "UB City Parking", hostId: "HST-003", amount: 28500, bookings: 87, period: "Dec 20-27, 2025", status: "processing", bankAccount: "SBI ****9012", scheduledDate: "Dec 28, 2025" },
    { id: "PAY-004", host: "Phoenix Marketcity", hostId: "HST-004", amount: 51200, bookings: 178, period: "Dec 13-20, 2025", status: "completed", bankAccount: "AXIS ****3456", scheduledDate: "Dec 23, 2025" },
  ]);

  const revenueBreakdown = [
    { label: "Booking Fees", amount: 1850000, percent: 75 },
    { label: "Service Charges", amount: 356780, percent: 15 },
    { label: "Premium Features", amount: 150000, percent: 6 },
    { label: "Late Fees", amount: 100000, percent: 4 },
  ];

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "booking":
        return <Badge className="bg-green-500">Booking</Badge>;
      case "payout":
        return <Badge className="bg-blue-500">Payout</Badge>;
      case "refund":
        return <Badge variant="destructive">Refund</Badge>;
      case "adjustment":
        return <Badge variant="secondary">Adjustment</Badge>;
      case "penalty":
        return <Badge className="bg-yellow-500">Penalty</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const getPayoutStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Processing</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-green-500 border-green-500">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleCreateTransaction = () => {
    const newTransaction: Transaction = {
      id: `TXN-${String(transactions.length + 1).padStart(3, "0")}`,
      type: transactionForm.type,
      description: transactionForm.description,
      entity: transactionForm.entity,
      entityType: transactionForm.entityType,
      amount: transactionForm.type === "refund" ? -Math.abs(parseFloat(transactionForm.amount)) : parseFloat(transactionForm.amount),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "completed",
      notes: transactionForm.notes,
    };
    setTransactions([newTransaction, ...transactions]);
    setShowTransactionDialog(false);
    setTransactionForm({ type: "adjustment", description: "", entity: "", entityType: "user", amount: "", notes: "" });
    toast.success("Transaction created successfully");
  };

  const handleProcessRefund = () => {
    const newRefund: Transaction = {
      id: `TXN-${String(transactions.length + 1).padStart(3, "0")}`,
      type: "refund",
      description: `Refund for ${refundForm.bookingId}`,
      entity: "User",
      entityType: "user",
      amount: -Math.abs(parseFloat(refundForm.amount)),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "completed",
      notes: refundForm.reason,
    };
    setTransactions([newRefund, ...transactions]);
    setShowRefundDialog(false);
    setRefundForm({ bookingId: "", amount: "", reason: "" });
    toast.success("Refund processed successfully");
  };

  const handleProcessPayout = (payout: Payout) => {
    setPayouts(payouts.map(p => 
      p.id === payout.id ? { ...p, status: "processing" as const } : p
    ));
    toast.success(`Processing payout for ${payout.host}`);
  };

  const handleCompletePayout = (payout: Payout) => {
    setPayouts(payouts.map(p => 
      p.id === payout.id ? { ...p, status: "completed" as const } : p
    ));
    const newTx: Transaction = {
      id: `TXN-${String(transactions.length + 1).padStart(3, "0")}`,
      type: "payout",
      description: "Payout Completed",
      entity: payout.host,
      entityType: "host",
      amount: payout.amount,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "completed",
    };
    setTransactions([newTx, ...transactions]);
    toast.success(`Payout completed for ${payout.host}`);
  };

  const handleExport = () => {
    toast.success("Finance report exported successfully");
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Finance Management
            </h1>
            <p className="text-muted-foreground">
              Revenue, payouts, refunds, and transaction management
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

        {/* Tabs for different sections */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payouts">Host Payouts</TabsTrigger>
            <TabsTrigger value="breakdown">Revenue Breakdown</TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transactions..."
                  className="pl-10"
                />
              </div>
              <Button onClick={() => setShowRefundDialog(true)} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Process Refund
              </Button>
              <Button onClick={() => setShowTransactionDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Entity</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, index) => (
                        <motion.tr
                          key={tx.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.05 * index }}
                          className="border-b border-border/50 hover:bg-secondary/20"
                        >
                          <td className="py-3 px-4 font-mono text-sm">{tx.id}</td>
                          <td className="py-3 px-4">{getTransactionBadge(tx.type)}</td>
                          <td className="py-3 px-4">{tx.description}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p>{tx.entity}</p>
                              <p className="text-xs text-muted-foreground capitalize">{tx.entityType}</p>
                            </div>
                          </td>
                          <td className={`py-3 px-4 text-right font-medium ${tx.amount >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {tx.amount >= 0 ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{tx.date}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge variant={tx.status === "completed" ? "secondary" : tx.status === "pending" ? "outline" : "destructive"}>
                              {tx.status}
                            </Badge>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payouts Tab */}
          <TabsContent value="payouts" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Pending Host Payouts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {payouts.map((payout, index) => (
                  <motion.div
                    key={payout.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{payout.host}</p>
                        <p className="text-sm text-muted-foreground">{payout.period} • {payout.bookings} bookings</p>
                        <p className="text-xs text-muted-foreground">{payout.bankAccount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-display text-xl font-bold">₹{payout.amount.toLocaleString()}</p>
                        {getPayoutStatusBadge(payout.status)}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setSelectedPayout(payout); setShowPayoutDialog(true); }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {payout.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleProcessPayout(payout)}>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Process Now
                            </DropdownMenuItem>
                          )}
                          {payout.status === "processing" && (
                            <DropdownMenuItem onClick={() => handleCompletePayout(payout)}>
                              <Check className="h-4 w-4 mr-2" />
                              Mark Complete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Breakdown Tab */}
          <TabsContent value="breakdown" className="space-y-4">
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
          </TabsContent>
        </Tabs>

        {/* Create Transaction Dialog */}
        <Dialog open={showTransactionDialog} onOpenChange={setShowTransactionDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Manual Transaction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Transaction Type</Label>
                  <Select 
                    value={transactionForm.type} 
                    onValueChange={(v) => setTransactionForm({...transactionForm, type: v as Transaction["type"]})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adjustment">Adjustment</SelectItem>
                      <SelectItem value="penalty">Penalty</SelectItem>
                      <SelectItem value="refund">Refund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Entity Type</Label>
                  <Select 
                    value={transactionForm.entityType} 
                    onValueChange={(v) => setTransactionForm({...transactionForm, entityType: v as Transaction["entityType"]})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="host">Host</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Entity Name/ID</Label>
                <Input 
                  value={transactionForm.entity} 
                  onChange={(e) => setTransactionForm({...transactionForm, entity: e.target.value})}
                  placeholder="Enter user/host name or ID"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input 
                  value={transactionForm.description} 
                  onChange={(e) => setTransactionForm({...transactionForm, description: e.target.value})}
                  placeholder="Transaction description"
                />
              </div>
              <div>
                <Label>Amount (₹)</Label>
                <Input 
                  type="number"
                  value={transactionForm.amount} 
                  onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                  placeholder="100"
                />
              </div>
              <div>
                <Label>Notes (Optional)</Label>
                <Textarea 
                  value={transactionForm.notes} 
                  onChange={(e) => setTransactionForm({...transactionForm, notes: e.target.value})}
                  placeholder="Additional notes..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTransactionDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateTransaction}>Create Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Process Refund Dialog */}
        <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Process Refund</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Booking ID</Label>
                <Input 
                  value={refundForm.bookingId} 
                  onChange={(e) => setRefundForm({...refundForm, bookingId: e.target.value})}
                  placeholder="BKG-2024-001"
                />
              </div>
              <div>
                <Label>Refund Amount (₹)</Label>
                <Input 
                  type="number"
                  value={refundForm.amount} 
                  onChange={(e) => setRefundForm({...refundForm, amount: e.target.value})}
                  placeholder="100"
                />
              </div>
              <div>
                <Label>Reason</Label>
                <Textarea 
                  value={refundForm.reason} 
                  onChange={(e) => setRefundForm({...refundForm, reason: e.target.value})}
                  placeholder="Reason for refund..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRefundDialog(false)}>Cancel</Button>
              <Button onClick={handleProcessRefund}>Process Refund</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Payout Details Dialog */}
        <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Payout Details</DialogTitle>
            </DialogHeader>
            {selectedPayout && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getPayoutStatusBadge(selectedPayout.status)}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Host</p>
                    <p className="font-medium">{selectedPayout.host}</p>
                    <p className="text-sm text-muted-foreground">{selectedPayout.hostId}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="font-display text-xl font-bold">₹{selectedPayout.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Period</p>
                    <p className="font-medium">{selectedPayout.period}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-xs text-muted-foreground">Bookings</p>
                    <p className="font-medium">{selectedPayout.bookings}</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-muted-foreground">Bank Account</p>
                  <p className="font-medium">{selectedPayout.bankAccount}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-muted-foreground">Scheduled Date</p>
                  <p className="font-medium">{selectedPayout.scheduledDate}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPayoutDialog(false)}>Close</Button>
              {selectedPayout?.status === "pending" && (
                <Button onClick={() => { handleProcessPayout(selectedPayout); setShowPayoutDialog(false); }}>
                  Process Now
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminFinance;
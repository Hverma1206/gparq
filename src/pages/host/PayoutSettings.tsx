import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Building2, CreditCard, Plus, CheckCircle, Trash2, 
  Edit, Shield, IndianRupee, Calendar
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const PayoutSettings = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [autoPayout, setAutoPayout] = useState(true);

  const bankAccounts = [
    {
      id: 1,
      bankName: "HDFC Bank",
      accountNumber: "XXXX XXXX 4521",
      ifsc: "HDFC0001234",
      accountType: "Savings",
      isPrimary: true,
      isVerified: true,
    },
    {
      id: 2,
      bankName: "ICICI Bank",
      accountNumber: "XXXX XXXX 7890",
      ifsc: "ICIC0005678",
      accountType: "Current",
      isPrimary: false,
      isVerified: true,
    },
  ];

  const payoutHistory = [
    { id: 1, date: "Dec 25, 2025", amount: 12450, status: "completed", bank: "HDFC Bank" },
    { id: 2, date: "Dec 18, 2025", amount: 8920, status: "completed", bank: "HDFC Bank" },
    { id: 3, date: "Dec 11, 2025", amount: 15200, status: "completed", bank: "HDFC Bank" },
  ];

  const handleSetPrimary = (id: number) => {
    console.log(`Setting primary account: ${id}`);
    toast.success("Primary account updated");
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting account: ${id}`);
    toast.success("Bank account removed");
  };

  const handleAddAccount = () => {
    console.log("Adding new bank account");
    toast.success("Bank account added successfully");
    setDialogOpen(false);
  };

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Payout Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your bank accounts and payout preferences
          </p>
        </div>

        {/* Payout Balance */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80 mb-1">Available for Payout</p>
                <p className="font-display text-4xl font-bold">₹8,450</p>
                <p className="text-sm opacity-80 mt-2">Next payout: Dec 30, 2025</p>
              </div>
              <Button variant="secondary" className="bg-primary-foreground/20 hover:bg-primary-foreground/30">
                Request Payout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Auto Payout Setting */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Automatic Payouts</p>
                  <p className="text-sm text-muted-foreground">Transfer earnings weekly to primary account</p>
                </div>
              </div>
              <Switch checked={autoPayout} onCheckedChange={setAutoPayout} />
            </div>
          </CardContent>
        </Card>

        {/* Bank Accounts */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg">Bank Accounts</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Bank Account</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Account Holder Name</Label>
                    <Input placeholder="As per bank records" />
                  </div>
                  <div>
                    <Label>Account Number</Label>
                    <Input placeholder="Enter account number" />
                  </div>
                  <div>
                    <Label>Confirm Account Number</Label>
                    <Input placeholder="Re-enter account number" />
                  </div>
                  <div>
                    <Label>IFSC Code</Label>
                    <Input placeholder="e.g., HDFC0001234" />
                  </div>
                  <Button onClick={handleAddAccount} className="w-full">
                    Add Bank Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {bankAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-xl border ${
                  account.isPrimary ? "border-primary bg-primary/5" : "border-border bg-secondary/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{account.bankName}</h3>
                        {account.isPrimary && <Badge className="bg-primary">Primary</Badge>}
                        {account.isVerified && (
                          <Badge variant="secondary" className="gap-1">
                            <Shield className="h-3 w-3" /> Verified
                          </Badge>
                        )}
                      </div>
                      <p className="font-mono text-sm text-muted-foreground">{account.accountNumber}</p>
                      <p className="text-xs text-muted-foreground">IFSC: {account.ifsc} • {account.accountType}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!account.isPrimary && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSetPrimary(account.id)}
                      >
                        Set Primary
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(account.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Recent Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payoutHistory.map((payout, index) => (
                <motion.div
                  key={payout.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <IndianRupee className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">₹{payout.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{payout.date} • {payout.bank}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {payout.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PayoutSettings;

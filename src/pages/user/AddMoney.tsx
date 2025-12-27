import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Wallet, CreditCard, Smartphone, Building2, 
  CheckCircle, ArrowLeft, Plus
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const AddMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  const quickAmounts = [500, 1000, 2000, 5000];

  const handleAddMoney = async () => {
    if (!amount || parseInt(amount) < 100) {
      toast.error("Minimum amount is ₹100");
      return;
    }
    
    setLoading(true);
    console.log(`Adding ₹${amount} via ${paymentMethod}`);
    
    // Simulate payment
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`₹${amount} added to wallet successfully!`);
    setLoading(false);
    navigate("/user/wallet");
  };

  return (
    <DashboardLayout type="user">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Add Money
            </h1>
            <p className="text-muted-foreground">
              Top up your Parq wallet
            </p>
          </div>
        </div>

        {/* Current Balance */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-80">Current Balance</p>
                <p className="font-display text-3xl font-bold">₹2,450</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amount Input */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Enter Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">₹</span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="text-3xl font-bold pl-10 h-16 text-center"
                min="100"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant={amount === String(amt) ? "default" : "outline"}
                  onClick={() => setAmount(String(amt))}
                  className="flex-1"
                >
                  ₹{amt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <Label
                  htmlFor="upi"
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value="upi" id="upi" />
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">UPI</p>
                    <p className="text-sm text-muted-foreground">GPay, PhonePe, Paytm</p>
                  </div>
                  {paymentMethod === "upi" && <CheckCircle className="h-5 w-5 text-primary" />}
                </Label>
                
                <Label
                  htmlFor="card"
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                  </div>
                  {paymentMethod === "card" && <CheckCircle className="h-5 w-5 text-primary" />}
                </Label>
                
                <Label
                  htmlFor="netbanking"
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                    paymentMethod === "netbanking" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Building2 className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium">Net Banking</p>
                    <p className="text-sm text-muted-foreground">All major banks</p>
                  </div>
                  {paymentMethod === "netbanking" && <CheckCircle className="h-5 w-5 text-primary" />}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Add Money Button */}
        <Button 
          onClick={handleAddMoney} 
          className="w-full h-14 text-lg gap-2"
          disabled={loading || !amount}
        >
          {loading ? (
            <>Processing...</>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              Add ₹{amount || 0} to Wallet
            </>
          )}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default AddMoney;

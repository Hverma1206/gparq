import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, Plus, Trash2, CheckCircle, Smartphone,
  Building2, Wallet
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const PaymentMethods = () => {
  const { toast } = useToast();

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "card", name: "HDFC Credit Card", last4: "4532", expiry: "12/26", primary: true, brand: "visa" },
    { id: 2, type: "card", name: "ICICI Debit Card", last4: "8901", expiry: "03/25", primary: false, brand: "mastercard" },
    { id: 3, type: "upi", name: "Google Pay", upiId: "rahul@okaxis", primary: false },
    { id: 4, type: "upi", name: "PhonePe", upiId: "9876543210@ybl", primary: false },
  ]);

  const getCardIcon = (brand: string) => {
    return <CreditCard className="w-6 h-6" />;
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "card": return <CreditCard className="w-6 h-6 text-primary" />;
      case "upi": return <Smartphone className="w-6 h-6 text-primary" />;
      case "netbanking": return <Building2 className="w-6 h-6 text-primary" />;
      case "wallet": return <Wallet className="w-6 h-6 text-primary" />;
      default: return <CreditCard className="w-6 h-6 text-primary" />;
    }
  };

  const handleSetPrimary = (id: number) => {
    setPaymentMethods(paymentMethods.map(pm => ({ ...pm, primary: pm.id === id })));
    toast({ title: "Primary method updated", description: "This will be used for future payments." });
  };

  const handleDelete = (id: number) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    toast({ title: "Payment method removed", description: "The payment method has been deleted." });
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Payment Methods
            </h1>
            <p className="text-muted-foreground">
              Manage your saved payment methods
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
        </div>

        {/* Cards */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Cards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.filter(pm => pm.type === "card").map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    {getCardIcon(method.brand || "")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{method.name}</span>
                      {method.primary && (
                        <Badge className="bg-primary/10 text-primary border-0">Primary</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      •••• {method.last4} • Expires {method.expiry}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.primary && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSetPrimary(method.id)}
                    >
                      Set Primary
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive"
                    onClick={() => handleDelete(method.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* UPI */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              UPI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.filter(pm => pm.type === "upi").map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{method.name}</div>
                    <div className="text-sm text-muted-foreground">{method.upiId}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive"
                    onClick={() => handleDelete(method.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Add New Options */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Add Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: CreditCard, label: "Credit/Debit Card" },
                { icon: Smartphone, label: "UPI" },
                { icon: Building2, label: "Net Banking" },
                { icon: Wallet, label: "Wallet" },
              ].map((option, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="h-auto py-6 flex-col gap-2"
                >
                  <option.icon className="w-8 h-8 text-primary" />
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentMethods;

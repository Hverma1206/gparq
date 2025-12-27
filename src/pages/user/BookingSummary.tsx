import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  MapPin, Calendar, Clock, Car, Shield, Tag, 
  CreditCard, Smartphone, Wallet, ChevronRight, Check
} from "lucide-react";
import Header from "@/components/layout/Header";

const BookingSummary = () => {
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [couponApplied, setCouponApplied] = useState(false);

  const booking = {
    location: "Forum Mall Parking",
    address: "Koramangala 5th Block, Bangalore",
    date: "Dec 25, 2025",
    startTime: "2:00 PM",
    endTime: "5:00 PM",
    duration: 3,
    rate: 40,
    vehicle: "Honda City (KA 01 AB 1234)",
  };

  const subtotal = booking.duration * booking.rate;
  const discount = couponApplied ? 20 : 0;
  const convenienceFee = 5;
  const total = subtotal - discount + convenienceFee;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "PARQ20") {
      setCouponApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Booking Summary
            </h1>
            <p className="text-muted-foreground">
              Review your booking details before payment
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold mb-4">Parking Details</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{booking.location}</div>
                          <div className="text-sm text-muted-foreground">{booking.address}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-secondary/50">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4" />
                            Date
                          </div>
                          <div className="font-medium">{booking.date}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-secondary/50">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            Time
                          </div>
                          <div className="font-medium">{booking.startTime} - {booking.endTime}</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-secondary/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Car className="h-4 w-4" />
                          Vehicle
                        </div>
                        <div className="font-medium">{booking.vehicle}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Coupon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                      <Tag className="h-5 w-5 text-primary" />
                      Apply Coupon
                    </h2>
                    {couponApplied ? (
                      <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500" />
                          <span className="font-medium text-green-500">PARQ20 applied</span>
                        </div>
                        <button
                          onClick={() => {
                            setCouponApplied(false);
                            setCouponCode("");
                          }}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" onClick={handleApplyCoupon}>
                          Apply
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold mb-4">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <label
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                            paymentMethod === "wallet"
                              ? "bg-primary/10 border border-primary"
                              : "bg-secondary/50 border border-transparent hover:bg-secondary"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Wallet className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">Parq Wallet</div>
                              <div className="text-sm text-muted-foreground">Balance: ₹2,450</div>
                            </div>
                          </div>
                          <RadioGroupItem value="wallet" />
                        </label>

                        <label
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                            paymentMethod === "upi"
                              ? "bg-primary/10 border border-primary"
                              : "bg-secondary/50 border border-transparent hover:bg-secondary"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                              <Smartphone className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                              <div className="font-medium">UPI</div>
                              <div className="text-sm text-muted-foreground">rahul@upi</div>
                            </div>
                          </div>
                          <RadioGroupItem value="upi" />
                        </label>

                        <label
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                            paymentMethod === "card"
                              ? "bg-primary/10 border border-primary"
                              : "bg-secondary/50 border border-transparent hover:bg-secondary"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <div className="font-medium">Credit/Debit Card</div>
                              <div className="text-sm text-muted-foreground">**** 4532</div>
                            </div>
                          </div>
                          <RadioGroupItem value="card" />
                        </label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Price Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-card border-border sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Price Details</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Parking ({booking.duration} hrs × ₹{booking.rate})
                      </span>
                      <span className="font-medium">₹{subtotal}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-green-500">
                        <span>Coupon Discount</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Convenience Fee</span>
                      <span className="font-medium">₹{convenienceFee}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-display font-bold text-primary">₹{total}</span>
                    </div>
                  </div>

                  <Link to="/user/booking-success">
                    <Button className="w-full" size="lg">
                      Pay ₹{total}
                    </Button>
                  </Link>

                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-green-500" />
                    100% Secure Payment
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingSummary;

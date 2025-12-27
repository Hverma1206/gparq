import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { 
  MapPin, Calendar as CalendarIcon, Clock, Car, Shield, 
  CreditCard, Smartphone, Wallet, ChevronRight, Check, Tag,
  ChevronLeft
} from "lucide-react";
import PublicHeader from "@/components/layout/PublicHeader";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const BookingFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("17:00");
  const [vehicleNumber, setVehicleNumber] = useState("KA 01 AB 1234");
  const [vehicleType, setVehicleType] = useState("car");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("wallet");

  // Mock parking data
  const parking = {
    id: id || "1",
    name: "Forum Mall Parking",
    address: "Koramangala 5th Block, Bangalore",
    price: 40,
    rating: 4.8,
    available: 12,
  };

  const timeSlots = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
  ];

  const calculateDuration = () => {
    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);
    return end > start ? end - start : 0;
  };

  const duration = calculateDuration();
  const subtotal = duration * parking.price;
  const discount = couponApplied ? 20 : 0;
  const convenienceFee = 5;
  const total = subtotal - discount + convenienceFee;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "PARQ20") {
      setCouponApplied(true);
      toast.success("Coupon applied successfully! You saved ₹20");
      console.log("Coupon PARQ20 applied");
    } else {
      toast.error("Invalid coupon code");
      console.log("Invalid coupon code:", couponCode);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && duration <= 0) {
      toast.error("Please select valid time slots");
      return;
    }
    console.log(`Moving to step ${step + 1}`);
    setStep(step + 1);
  };

  const handlePayment = () => {
    console.log("Processing payment:", {
      parking: parking.name,
      date: selectedDate,
      startTime,
      endTime,
      duration,
      total,
      paymentMethod,
      vehicleNumber,
    });
    toast.success("Payment processing...");
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("Payment successful!");
      navigate("/user/booking-success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                      s === step
                        ? "bg-primary text-primary-foreground"
                        : s < step
                        ? "bg-green-500 text-white"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {s < step ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={cn(
                        "w-16 h-1 mx-2",
                        s < step ? "bg-green-500" : "bg-secondary"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-8 mt-2 text-sm text-muted-foreground">
              <span>Date & Time</span>
              <span>Vehicle</span>
              <span>Payment</span>
            </div>
          </motion.div>

          {/* Back Button */}
          {step > 1 && (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}

          {/* Step 1: Date & Time Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Select Date & Time</h2>
                  
                  {/* Parking Info */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{parking.name}</div>
                      <div className="text-sm text-muted-foreground">{parking.address}</div>
                      <div className="text-sm text-primary font-medium mt-1">₹{parking.price}/hr</div>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-6">
                    <Label className="mb-2 block">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card border-border z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Start Time</Label>
                      <Select value={startTime} onValueChange={(val) => { setStartTime(val); console.log("Start time:", val); }}>
                        <SelectTrigger className="bg-card">
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">End Time</Label>
                      <Select value={endTime} onValueChange={(val) => { setEndTime(val); console.log("End time:", val); }}>
                        <SelectTrigger className="bg-card">
                          <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {duration > 0 && (
                    <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex justify-between text-sm">
                        <span>Duration</span>
                        <span className="font-medium">{duration} hours</span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold mt-2">
                        <span>Estimated Total</span>
                        <span className="text-primary">₹{subtotal}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button className="w-full" size="lg" onClick={handleNextStep}>
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Vehicle Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Vehicle Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Vehicle Type</Label>
                      <Select value={vehicleType} onValueChange={(val) => { setVehicleType(val); console.log("Vehicle type:", val); }}>
                        <SelectTrigger className="bg-card">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="bike">Bike</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="ev">Electric Vehicle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-2 block">Vehicle Number</Label>
                      <Input
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder="KA 01 AB 1234"
                        className="uppercase"
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="mt-6 p-4 rounded-xl bg-secondary/50">
                    <h3 className="font-medium mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span>{selectedDate && format(selectedDate, "PPP")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time</span>
                        <span>{startTime} - {endTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span>{duration} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vehicle</span>
                        <span>{vehicleNumber}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full" size="lg" onClick={handleNextStep}>
                Continue to Payment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Coupon */}
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
                        <span className="font-medium text-green-500">PARQ20 applied - You save ₹20!</span>
                      </div>
                      <button
                        onClick={() => { setCouponApplied(false); setCouponCode(""); console.log("Coupon removed"); }}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code (try PARQ20)"
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

              {/* Payment Method */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={(val) => { setPaymentMethod(val); console.log("Payment method:", val); }}>
                    <div className="space-y-3">
                      {[
                        { value: "wallet", icon: Wallet, label: "Parq Wallet", subtitle: "Balance: ₹2,450", color: "text-primary" },
                        { value: "upi", icon: Smartphone, label: "UPI", subtitle: "rahul@upi", color: "text-purple-500" },
                        { value: "card", icon: CreditCard, label: "Credit/Debit Card", subtitle: "**** 4532", color: "text-blue-500" },
                      ].map((method) => (
                        <label
                          key={method.value}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors",
                            paymentMethod === method.value
                              ? "bg-primary/10 border border-primary"
                              : "bg-secondary/50 border border-transparent hover:bg-secondary"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", `${method.color}/10`)}>
                              <method.icon className={cn("h-5 w-5", method.color)} />
                            </div>
                            <div>
                              <div className="font-medium">{method.label}</div>
                              <div className="text-sm text-muted-foreground">{method.subtitle}</div>
                            </div>
                          </div>
                          <RadioGroupItem value={method.value} />
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Price Summary */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Price Details</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Parking ({duration} hrs × ₹{parking.price})
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

                  <Button className="w-full" size="lg" onClick={handlePayment}>
                    Pay ₹{total}
                  </Button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-green-500" />
                    100% Secure Payment
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookingFlow;

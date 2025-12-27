import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP verification
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <Car className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">Parq</span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
            Verify Your Phone
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            We've sent a 6-digit code to your phone number
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={otp.length !== 6}>
              Verify
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button className="text-primary hover:underline">Resend</button>
          </p>

          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to signup
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;

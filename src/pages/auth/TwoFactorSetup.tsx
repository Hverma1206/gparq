import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Shield, Smartphone, ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const TwoFactorSetup = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

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

          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
            Two-Factor Authentication
          </h1>

          {step === 1 && (
            <>
              <p className="text-muted-foreground text-center mb-8">
                Add an extra layer of security to your account.
              </p>

              <div className="space-y-4 mb-8">
                <button className="w-full p-4 bg-secondary/50 hover:bg-secondary rounded-xl flex items-center gap-4 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-foreground">Authenticator App</div>
                    <div className="text-sm text-muted-foreground">Use Google Authenticator or similar</div>
                  </div>
                </button>
              </div>

              <Button className="w-full" size="lg" onClick={() => setStep(2)}>
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-muted-foreground text-center mb-6">
                Scan this QR code with your authenticator app
              </p>

              <div className="bg-secondary/50 rounded-xl p-6 mb-6 flex items-center justify-center">
                <div className="w-40 h-40 bg-foreground rounded-lg" />
              </div>

              <p className="text-sm text-muted-foreground text-center mb-6">
                Or enter this code manually: <strong className="font-mono">ABCD-EFGH-IJKL-MNOP</strong>
              </p>

              <Button className="w-full" size="lg" onClick={() => setStep(3)}>
                I've Scanned the Code
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-muted-foreground text-center mb-8">
                Enter the 6-digit code from your authenticator app
              </p>

              <div className="flex justify-center mb-6">
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

              <Button className="w-full" size="lg" disabled={otp.length !== 6}>
                Verify & Enable
              </Button>
            </>
          )}

          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default TwoFactorSetup;

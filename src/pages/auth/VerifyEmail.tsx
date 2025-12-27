import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Mail, ArrowLeft } from "lucide-react";

const VerifyEmail = () => {
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
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg text-center">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <Car className="h-8 w-8 text-primary" />
            <span className="font-display text-2xl font-bold text-foreground">Parq</span>
          </Link>

          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground mb-6">
            We've sent a verification link to your email address. Please click the link to activate your account.
          </p>

          <div className="bg-secondary/50 rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              The verification link will expire in <strong>24 hours</strong>
            </p>
          </div>

          <Button variant="outline" className="w-full mb-4">
            Resend Verification Email
          </Button>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;

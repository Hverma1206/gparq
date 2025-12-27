import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Clock, AlertTriangle, XCircle, UserX, RefreshCw } from "lucide-react";

const statusConfig = {
  pending: {
    icon: Clock,
    title: "Account Pending Verification",
    description: "Your account is being reviewed. This usually takes 1-2 business days.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  review: {
    icon: Clock,
    title: "Account Under Review",
    description: "We're reviewing your account details. You'll receive an update soon.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  suspended: {
    icon: AlertTriangle,
    title: "Account Suspended",
    description: "Your account has been temporarily suspended. Please contact support for assistance.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  banned: {
    icon: XCircle,
    title: "Account Banned",
    description: "Your account has been permanently banned due to violation of our terms of service.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  deactivated: {
    icon: UserX,
    title: "Account Deactivated",
    description: "Your account has been deactivated. You can reactivate it at any time.",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
};

const AccountStatus = () => {
  const [searchParams] = useSearchParams();
  const status = (searchParams.get("status") as keyof typeof statusConfig) || "pending";
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

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

          <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <Icon className={`h-8 w-8 ${config.color}`} />
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            {config.title}
          </h1>
          <p className="text-muted-foreground mb-8">
            {config.description}
          </p>

          {status === "deactivated" && (
            <Link to="/reactivate">
              <Button className="w-full mb-4" size="lg">
                <RefreshCw className="mr-2 h-5 w-5" />
                Reactivate Account
              </Button>
            </Link>
          )}

          {(status === "suspended" || status === "banned") && (
            <Link to="/contact">
              <Button className="w-full mb-4" size="lg">
                Contact Support
              </Button>
            </Link>
          )}

          <Link to="/">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountStatus;

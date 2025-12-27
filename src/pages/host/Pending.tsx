import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, CheckCircle, Mail, ArrowRight } from "lucide-react";

const HostPending = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">Parq</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for registering as a Parq host. Your application is under review.
            </p>

            <Card className="bg-card border-border mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
                <div className="space-y-4 text-left">
                  {[
                    { step: 1, text: "Our team will verify your details (24-48 hours)" },
                    { step: 2, text: "You'll receive an email confirmation" },
                    { step: 3, text: "Complete your listing with photos and pricing" },
                    { step: 4, text: "Start accepting bookings and earning!" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{item.step}</span>
                      </div>
                      <span className="text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
              <Link to="/help">
                <Button className="w-full sm:w-auto gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HostPending;

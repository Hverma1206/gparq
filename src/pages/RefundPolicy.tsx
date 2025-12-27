import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cancellation & Refund Policy</h1>
            <p className="text-muted-foreground">Clear, fair, and transparent refund guidelines</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Refund Timeline */}
            <section className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-8 border border-primary/20">
              <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
                <Clock className="text-primary" />
                Cancellation Timeline
              </h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl">
                  <CheckCircle className="text-green-500 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">24+ hours before booking</p>
                    <p className="text-muted-foreground">Full refund (100%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl">
                  <CheckCircle className="text-yellow-500 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">6-24 hours before booking</p>
                    <p className="text-muted-foreground">75% refund</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl">
                  <AlertTriangle className="text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">1-6 hours before booking</p>
                    <p className="text-muted-foreground">50% refund</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl">
                  <XCircle className="text-red-500 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Less than 1 hour / No-show</p>
                    <p className="text-muted-foreground">No refund</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">How to Cancel</h2>
              <div className="space-y-4 text-muted-foreground">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Open the Parq app or website</li>
                  <li>Go to "My Bookings"</li>
                  <li>Select the booking you wish to cancel</li>
                  <li>Tap "Cancel Booking"</li>
                  <li>Confirm cancellation</li>
                </ol>
                <p>Refund will be processed automatically based on the cancellation timeline.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Refund Processing</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Wallet:</strong> Instant credit</li>
                  <li><strong className="text-foreground">UPI:</strong> 1-2 business days</li>
                  <li><strong className="text-foreground">Credit/Debit Card:</strong> 5-7 business days</li>
                  <li><strong className="text-foreground">Net Banking:</strong> 5-7 business days</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Special Circumstances</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-medium text-foreground">Full Refund Guaranteed</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Host cancels the booking</li>
                  <li>Space not as described</li>
                  <li>Unable to access the parking space</li>
                  <li>Technical issues preventing entry</li>
                  <li>Natural disasters or emergencies</li>
                </ul>
                
                <h3 className="text-lg font-medium text-foreground mt-6">Partial Refund</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Early checkout (unused hours refunded)</li>
                  <li>Service quality issues (case-by-case basis)</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Non-Refundable Items</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Completed bookings without valid complaints</li>
                  <li>Service add-ons already performed</li>
                  <li>Convenience fees (non-refundable)</li>
                  <li>Insurance premiums (if purchased)</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Disputes</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you disagree with a refund decision:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact support within 7 days</li>
                  <li>Provide booking details and evidence</li>
                  <li>Our team will review within 48 hours</li>
                  <li>Final decision communicated via email</li>
                </ol>
                <p className="mt-4">Email: support@parq.in</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy;

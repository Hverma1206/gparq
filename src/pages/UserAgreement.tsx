import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const UserAgreement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">User Agreement</h1>
            <p className="text-muted-foreground">Agreement for Vehicle Owners using Parq</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Definitions</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">"User"</strong> - A vehicle owner using Parq to find and book parking</li>
                  <li><strong className="text-foreground">"Host"</strong> - A space owner listing parking spaces on Parq</li>
                  <li><strong className="text-foreground">"Booking"</strong> - A confirmed reservation for a parking space</li>
                  <li><strong className="text-foreground">"Platform"</strong> - Parq's website and mobile applications</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Eligibility</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>To use Parq as a User, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Hold a valid driving license</li>
                  <li>Own or have legal access to the vehicle being parked</li>
                  <li>Have valid vehicle registration and insurance</li>
                  <li>Complete identity verification as required</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Booking Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bookings are confirmed only after successful payment</li>
                  <li>Arrival within 30 minutes of booked time is required</li>
                  <li>Extension of booking subject to availability</li>
                  <li>Multiple vehicles require separate bookings</li>
                  <li>Booking is non-transferable</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Payment Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>All prices include GST unless stated otherwise</li>
                  <li>Payment methods: UPI, Cards, Wallet, Net Banking</li>
                  <li>Auto-debit for overstay if wallet enabled</li>
                  <li>Refunds processed within 5-7 business days</li>
                  <li>Failed payments may result in booking cancellation</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. User Conduct</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Users agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Park only in the designated spot</li>
                  <li>Follow all parking rules and host instructions</li>
                  <li>Not leave valuables in the vehicle</li>
                  <li>Report any damage or issues immediately</li>
                  <li>Treat hosts and their property with respect</li>
                  <li>Not engage in any illegal activities</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Prohibited Uses</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Users must not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use spaces for vehicle storage beyond booked time</li>
                  <li>Conduct repairs or maintenance on premises</li>
                  <li>Park hazardous or illegally modified vehicles</li>
                  <li>Sub-let or share the parking space</li>
                  <li>Use the space for commercial activities</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Users acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Parking is at owner's risk unless insurance purchased</li>
                  <li>Parq is not liable for theft, damage, or loss</li>
                  <li>Users are liable for damage caused to property</li>
                  <li>Optional insurance is strongly recommended</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Parq may suspend or terminate user accounts for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violation of this agreement</li>
                  <li>Fraudulent activity</li>
                  <li>Repeated no-shows or cancellations</li>
                  <li>Negative ratings or complaints</li>
                  <li>Any illegal activity</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserAgreement;

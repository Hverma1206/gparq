import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const HostAgreement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Host Agreement</h1>
            <p className="text-muted-foreground">Agreement for Space Owners listing on Parq</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Host Eligibility</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>To become a Parq Host, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be the legal owner or authorized manager of the property</li>
                  <li>Have the legal right to offer parking services</li>
                  <li>Complete identity and property verification</li>
                  <li>Comply with local parking regulations</li>
                  <li>Maintain valid property insurance</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Listing Requirements</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Hosts must provide:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accurate location and geo-coordinates</li>
                  <li>Clear photos of parking space(s)</li>
                  <li>Accurate dimensions and vehicle capacity</li>
                  <li>Correct availability calendar</li>
                  <li>Any restrictions (vehicle type, height limits)</li>
                  <li>Amenities and security features</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Commission & Pricing</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Parq charges 15% commission on each booking</li>
                  <li>Hosts set their own base prices</li>
                  <li>Dynamic pricing available for events/peak hours</li>
                  <li>GST applicable as per Indian tax laws</li>
                  <li>Commission may vary for premium/corporate listings</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Payouts</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payouts processed weekly (every Monday)</li>
                  <li>Minimum payout threshold: ₹500</li>
                  <li>Bank transfer to verified account</li>
                  <li>Tax deducted at source as applicable</li>
                  <li>Detailed earning reports available in dashboard</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Host Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Hosts agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain clean and accessible parking spaces</li>
                  <li>Honor all confirmed bookings</li>
                  <li>Provide accurate entry/exit instructions</li>
                  <li>Respond to user queries within 2 hours</li>
                  <li>Report any incidents immediately</li>
                  <li>Maintain proper lighting and safety</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Cancellation by Host</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If a host cancels a confirmed booking:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>User receives full refund</li>
                  <li>Host rating may be affected</li>
                  <li>Repeated cancellations may lead to listing suspension</li>
                  <li>Emergency cancellations must be reported immediately</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Liability & Insurance</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hosts must have property liability insurance</li>
                  <li>Parq provides supplementary coverage up to ₹5L</li>
                  <li>Hosts liable for negligence-related damages</li>
                  <li>Incident documentation required for claims</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Quality Standards</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Hosts must maintain:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Minimum 4.0 star rating</li>
                  <li>Response rate above 90%</li>
                  <li>Cancellation rate below 5%</li>
                  <li>Updated availability calendar</li>
                </ul>
                <p>Failure to meet standards may result in reduced visibility or suspension.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>This agreement may be terminated:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>By host with 30 days notice</li>
                  <li>By Parq for policy violations</li>
                  <li>Immediately for illegal activities</li>
                  <li>Upon loss of property ownership</li>
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

export default HostAgreement;

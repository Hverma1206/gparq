import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>By accessing or using Parq's services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
                <p>These terms apply to all users, including vehicle owners (users), space owners (hosts), and service partners.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Services Description</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Parq provides a platform that connects:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vehicle owners looking for parking spaces</li>
                  <li>Space owners offering parking spots</li>
                  <li>Service providers offering add-on services</li>
                </ul>
                <p>Parq acts as an intermediary and is not responsible for the actual parking spaces or services provided by third parties.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per person; no shared accounts</li>
                  <li>Minimum age requirement: 18 years</li>
                  <li>We reserve the right to suspend or terminate accounts</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Bookings & Payments</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>All bookings are subject to availability</li>
                  <li>Prices are displayed including applicable taxes</li>
                  <li>Payments are processed through secure payment gateways</li>
                  <li>Cancellation policies vary by listing</li>
                  <li>Overstay charges apply for exceeding booked duration</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. User Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Users agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Follow parking rules and regulations</li>
                  <li>Not damage property or other vehicles</li>
                  <li>Park only in designated spots</li>
                  <li>Not use spaces for illegal activities</li>
                  <li>Respect space owners and their property</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Limitation of Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Parq is not liable for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Theft, damage, or loss to vehicles</li>
                  <li>Actions of space owners or other users</li>
                  <li>Service interruptions or technical issues</li>
                  <li>Third-party service quality</li>
                </ul>
                <p>Users are encouraged to use our optional insurance coverage for protection.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Dispute Resolution</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Disputes will be resolved through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Direct negotiation between parties</li>
                  <li>Mediation through Parq's dispute center</li>
                  <li>Arbitration as per Indian Arbitration Act</li>
                </ul>
                <p>Courts in Mumbai, India shall have exclusive jurisdiction.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Changes to Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may update these terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;

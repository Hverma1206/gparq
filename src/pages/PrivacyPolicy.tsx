import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>At Parq, we collect information to provide better services to our users. The types of information we collect include:</p>
                <h3 className="text-lg font-medium text-foreground mt-6">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Vehicle registration details</li>
                  <li>Payment information (processed securely through payment partners)</li>
                  <li>Government-issued ID for verification purposes</li>
                </ul>
                <h3 className="text-lg font-medium text-foreground mt-6">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Location data when using parking services</li>
                  <li>Booking history and preferences</li>
                  <li>Device information and app usage patterns</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. How We Use Your Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide, maintain, and improve our parking services</li>
                  <li>To process bookings and payments</li>
                  <li>To send booking confirmations and updates</li>
                  <li>To provide customer support</li>
                  <li>To detect and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Information Sharing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We do not sell your personal information. We may share information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Space owners (limited to booking details)</li>
                  <li>Service partners (for add-on services)</li>
                  <li>Payment processors</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement industry-standard security measures including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>End-to-end encryption for sensitive data</li>
                  <li>Secure payment processing (PCI DSS compliant)</li>
                  <li>Regular security audits</li>
                  <li>Access controls and monitoring</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Under applicable data protection laws, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>For privacy-related inquiries, contact our Data Protection Officer:</p>
                <p>Email: privacy@parq.in</p>
                <p>Address: Parq Technologies Pvt. Ltd., Mumbai, India</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

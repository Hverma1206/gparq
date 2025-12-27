import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>
            <p className="text-muted-foreground">Important legal information about Parq services</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">General Disclaimer</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>The information provided on Parq's platform is for general informational purposes only. While we strive to keep information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Platform Role</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Parq operates as an intermediary platform connecting:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vehicle owners seeking parking spaces</li>
                  <li>Property owners offering parking spaces</li>
                  <li>Service providers offering add-on services</li>
                </ul>
                <p className="mt-4">Parq does not own, operate, or manage parking spaces. We do not guarantee the quality, safety, legality, or suitability of any listing on our platform.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Limitation of Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Parq shall not be liable for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Any loss or damage to vehicles, personal property, or persons</li>
                  <li>Theft, vandalism, or accidents occurring at parking locations</li>
                  <li>Actions, omissions, or negligence of hosts or service partners</li>
                  <li>Accuracy of listing descriptions or photos</li>
                  <li>Availability or accessibility of parking spaces</li>
                  <li>Service interruptions or technical failures</li>
                  <li>Any indirect, incidental, or consequential damages</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Third-Party Services</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Our platform may contain links to or integrate with third-party services, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment gateways</li>
                  <li>Map and navigation services</li>
                  <li>Insurance providers</li>
                  <li>EV charging networks</li>
                </ul>
                <p className="mt-4">Parq is not responsible for the content, privacy policies, or practices of these third-party services.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Pricing & Availability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>All prices displayed on Parq are subject to change without notice. Availability of parking spaces is shown in real-time but may not always be accurate due to technical limitations or host actions.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">No Professional Advice</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Content on this platform does not constitute professional, legal, financial, or insurance advice. Users should consult appropriate professionals for specific concerns.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">User Responsibility</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Users are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Verifying parking space suitability before booking</li>
                  <li>Ensuring their vehicle fits the space requirements</li>
                  <li>Following all parking rules and local regulations</li>
                  <li>Securing valuables and locking vehicles</li>
                  <li>Reporting any issues promptly</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Indemnification</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>By using Parq, you agree to indemnify and hold harmless Parq Technologies Pvt. Ltd., its directors, employees, and affiliates from any claims, damages, losses, or expenses arising from your use of the platform.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Governing Law</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>This disclaimer is governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;

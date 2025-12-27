import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What Are Cookies?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience on Parq.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Types of Cookies We Use</h2>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Essential Cookies</h3>
                  <p>Required for the website to function. These cannot be disabled.</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Session management</li>
                    <li>Authentication</li>
                    <li>Security features</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Performance Cookies</h3>
                  <p>Help us understand how visitors use our site.</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Page load times</li>
                    <li>Error tracking</li>
                    <li>Usage analytics</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Functional Cookies</h3>
                  <p>Remember your preferences for a better experience.</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Language preferences</li>
                    <li>Location settings</li>
                    <li>Recent searches</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Marketing Cookies</h3>
                  <p>Used to show relevant advertisements.</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Ad personalization</li>
                    <li>Campaign tracking</li>
                    <li>Remarketing</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Third-Party Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use services from trusted third parties that may set their own cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Google Analytics:</strong> Website usage analysis</li>
                  <li><strong className="text-foreground">Google Maps:</strong> Location services</li>
                  <li><strong className="text-foreground">Facebook Pixel:</strong> Ad performance tracking</li>
                  <li><strong className="text-foreground">Payment Gateways:</strong> Secure payment processing</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Managing Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You can control cookies through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
                  <li><strong className="text-foreground">Cookie Banner:</strong> Use our cookie preferences when prompted</li>
                  <li><strong className="text-foreground">Opt-out Links:</strong> Third parties provide opt-out mechanisms</li>
                </ul>
                <p className="mt-4">Note: Disabling essential cookies may affect website functionality.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookie Retention</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Session cookies:</strong> Deleted when browser closes</li>
                  <li><strong className="text-foreground">Persistent cookies:</strong> Stored for 1-12 months</li>
                  <li><strong className="text-foreground">Analytics cookies:</strong> Up to 2 years</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Updates to This Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may update this policy periodically. Changes will be posted on this page with an updated date.</p>
                <p className="mt-4">Questions? Contact: privacy@parq.in</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;

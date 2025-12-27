import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ServicePartnerAgreement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Service Partner Agreement</h1>
            <p className="text-muted-foreground">Agreement for Add-on Service Providers on Parq</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Partner Eligibility</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>To become a Parq Service Partner, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be a registered business entity</li>
                  <li>Hold relevant licenses and certifications</li>
                  <li>Have liability insurance coverage</li>
                  <li>Complete background verification</li>
                  <li>Meet quality and safety standards</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Service Categories</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Approved service categories include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">EV Charging:</strong> Electric vehicle charging services</li>
                  <li><strong className="text-foreground">Car Wash:</strong> Interior and exterior cleaning</li>
                  <li><strong className="text-foreground">Detailing:</strong> Premium cleaning and polishing</li>
                  <li><strong className="text-foreground">Minor Repairs:</strong> Basic maintenance services</li>
                  <li><strong className="text-foreground">Fuel Delivery:</strong> On-demand fuel services</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Commission Structure</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Parq charges 20% commission on service bookings</li>
                  <li>Partners set their own service prices</li>
                  <li>Promotional pricing subject to approval</li>
                  <li>GST applicable as per Indian tax laws</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Service Standards</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Partners must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use certified products and equipment</li>
                  <li>Complete services within stated time</li>
                  <li>Maintain cleanliness and professionalism</li>
                  <li>Document before/after service photos</li>
                  <li>Carry proper identification</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Partners liable for service-related damages</li>
                  <li>Minimum ₹10L liability insurance required</li>
                  <li>Claims processed through partner's insurance</li>
                  <li>Parq provides mediation for disputes</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Quality Metrics</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Partners must maintain:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Minimum 4.2 star rating</li>
                  <li>Job completion rate above 95%</li>
                  <li>Response time under 15 minutes</li>
                  <li>Zero tolerance for damage complaints</li>
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

export default ServicePartnerAgreement;

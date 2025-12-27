import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, CheckCircle, AlertTriangle, FileText } from "lucide-react";

const InsurancePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Insurance Policy</h1>
            <p className="text-muted-foreground">Comprehensive protection for your vehicle while parked</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Coverage Overview */}
            <section className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-8 border border-primary/20">
              <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
                <Shield className="text-primary" />
                Parq Protection Plans
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Basic Protection</h3>
                  <p className="text-2xl font-bold text-primary mb-4">₹29<span className="text-sm text-muted-foreground">/booking</span></p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Up to ₹1,00,000 coverage</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Theft protection</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Vandalism damage</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Fire damage</li>
                  </ul>
                </div>
                <div className="bg-card rounded-xl p-6 border border-primary">
                  <div className="text-xs font-medium text-primary mb-2">RECOMMENDED</div>
                  <h3 className="text-lg font-semibold mb-3">Premium Protection</h3>
                  <p className="text-2xl font-bold text-primary mb-4">₹79<span className="text-sm text-muted-foreground">/booking</span></p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Up to ₹5,00,000 coverage</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> All Basic features</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Accidental damage</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Personal belongings (₹25K)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Zero deductible</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">What's Covered</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vehicle theft during booked parking period</li>
                  <li>Intentional damage by third parties</li>
                  <li>Fire and natural disaster damage</li>
                  <li>Collision damage while parked</li>
                  <li>Parts theft (wheels, mirrors, accessories)</li>
                  <li>Glass damage (Premium plan)</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" />
                What's Not Covered
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mechanical or electrical failures</li>
                  <li>Pre-existing damage</li>
                  <li>Normal wear and tear</li>
                  <li>Damage outside booked hours</li>
                  <li>Items left in unlocked vehicles</li>
                  <li>Damage due to user negligence</li>
                  <li>Vehicles not matching registration</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <FileText className="text-primary" />
                How to File a Claim
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ol className="list-decimal pl-6 space-y-3">
                  <li><strong className="text-foreground">Report immediately:</strong> File claim within 24 hours of incident</li>
                  <li><strong className="text-foreground">Document damage:</strong> Take photos and videos of damage</li>
                  <li><strong className="text-foreground">File police report:</strong> Required for theft claims</li>
                  <li><strong className="text-foreground">Submit claim:</strong> Through app or website with all documents</li>
                  <li><strong className="text-foreground">Investigation:</strong> Our team reviews within 72 hours</li>
                  <li><strong className="text-foreground">Settlement:</strong> Approved claims paid within 7 days</li>
                </ol>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Required Documents</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Booking confirmation from Parq</li>
                  <li>Photos of damage (before/after if available)</li>
                  <li>Police FIR (for theft/vandalism)</li>
                  <li>Vehicle registration certificate</li>
                  <li>Valid driving license</li>
                  <li>Repair estimate from authorized service center</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Insurance Partner</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Parq Protection is underwritten by leading insurance partners regulated by IRDAI. Policy terms and conditions apply as per the master policy.</p>
                <p className="mt-4">For insurance queries: insurance@parq.in</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InsurancePolicy;

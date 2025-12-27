import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText, UserCheck, AlertTriangle } from "lucide-react";

const DataProtection = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Data Protection</h1>
            <p className="text-muted-foreground">Compliance with Digital Personal Data Protection Act (DPDP), 2023</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* DPDP Compliance Overview */}
            <section className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-8 border border-primary/20">
              <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
                <Shield className="text-primary" />
                Our Commitment to Data Protection
              </h2>
              <p className="text-muted-foreground">
                Parq is fully committed to protecting your personal data in compliance with the Digital Personal Data Protection Act (DPDP), 2023. We implement robust measures to ensure your data is processed lawfully, fairly, and transparently.
              </p>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <Lock className="text-primary" />
                Data Processing Principles
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <div>
                      <strong className="text-foreground">Lawful Purpose:</strong> We only collect data for legitimate, specific purposes disclosed to you.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <div>
                      <strong className="text-foreground">Consent:</strong> We obtain explicit consent before processing personal data.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <div>
                      <strong className="text-foreground">Data Minimization:</strong> We collect only data necessary for the stated purpose.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <div>
                      <strong className="text-foreground">Accuracy:</strong> We maintain accurate and up-to-date records.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">5.</span>
                    <div>
                      <strong className="text-foreground">Storage Limitation:</strong> We retain data only as long as necessary.
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <UserCheck className="text-primary" />
                Your Rights Under DPDP Act
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>As a data principal, you have the following rights:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Right to Access:</strong> Obtain confirmation and summary of your data</li>
                  <li><strong className="text-foreground">Right to Correction:</strong> Request correction of inaccurate data</li>
                  <li><strong className="text-foreground">Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong className="text-foreground">Right to Grievance Redressal:</strong> File complaints regarding data handling</li>
                  <li><strong className="text-foreground">Right to Nominate:</strong> Designate someone to exercise rights on your behalf</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <Eye className="text-primary" />
                Consent Management
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We ensure transparent consent management:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Clear, specific consent requests in English and Hindi</li>
                  <li>Granular consent options for different data uses</li>
                  <li>Easy withdrawal of consent at any time</li>
                  <li>Consent records maintained for audit purposes</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <FileText className="text-primary" />
                Data Processing Activities
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-foreground">Data Type</th>
                        <th className="text-left p-3 text-foreground">Purpose</th>
                        <th className="text-left p-3 text-foreground">Retention</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-3">Identity Data</td>
                        <td className="p-3">Account verification</td>
                        <td className="p-3">Account lifetime + 5 years</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-3">Contact Data</td>
                        <td className="p-3">Communication</td>
                        <td className="p-3">Account lifetime + 2 years</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-3">Location Data</td>
                        <td className="p-3">Parking services</td>
                        <td className="p-3">90 days</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-3">Transaction Data</td>
                        <td className="p-3">Billing & compliance</td>
                        <td className="p-3">7 years (legal requirement)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" />
                Data Breach Response
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>In case of a data breach, we will:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Notify the Data Protection Board within 72 hours</li>
                  <li>Inform affected users without undue delay</li>
                  <li>Take immediate remedial measures</li>
                  <li>Conduct root cause analysis</li>
                  <li>Implement preventive measures</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Protection Officer</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>For any data protection queries or to exercise your rights, contact our Data Protection Officer:</p>
                <div className="bg-secondary/50 rounded-xl p-4 mt-4">
                  <p><strong className="text-foreground">Name:</strong> Data Protection Officer, Parq</p>
                  <p><strong className="text-foreground">Email:</strong> dpo@parq.in</p>
                  <p><strong className="text-foreground">Address:</strong> Parq Technologies Pvt. Ltd., Mumbai, India</p>
                  <p><strong className="text-foreground">Response Time:</strong> Within 30 days</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataProtection;

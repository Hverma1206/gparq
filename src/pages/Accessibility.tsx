import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accessibility as AccessibilityIcon, Eye, Ear, Hand, Brain, Phone } from "lucide-react";

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Accessibility Statement</h1>
            <p className="text-muted-foreground">Our commitment to making Parq accessible to everyone</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-8 border border-primary/20">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <AccessibilityIcon className="text-primary" />
                Our Commitment
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Parq is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to ensure we provide equal access to all users.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Accessibility Features</h2>
              <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Visual</h3>
                    <ul className="text-sm space-y-1">
                      <li>High contrast mode</li>
                      <li>Resizable text</li>
                      <li>Screen reader compatible</li>
                      <li>Alt text for images</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Ear className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Auditory</h3>
                    <ul className="text-sm space-y-1">
                      <li>Visual notifications</li>
                      <li>Captioned videos</li>
                      <li>Text-based alerts</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Hand className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Motor</h3>
                    <ul className="text-sm space-y-1">
                      <li>Keyboard navigation</li>
                      <li>Large touch targets</li>
                      <li>Voice command support</li>
                      <li>No time limits</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Cognitive</h3>
                    <ul className="text-sm space-y-1">
                      <li>Simple, clear language</li>
                      <li>Consistent navigation</li>
                      <li>Error prevention</li>
                      <li>Clear instructions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Standards Compliance</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We aim to conform to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">WCAG 2.1 Level AA:</strong> Web Content Accessibility Guidelines</li>
                  <li><strong className="text-foreground">Rights of Persons with Disabilities Act, 2016:</strong> Indian accessibility laws</li>
                  <li><strong className="text-foreground">Accessible India Campaign:</strong> Government accessibility initiatives</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Accessible Parking Spaces</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We actively promote accessible parking options:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Filter for wheelchair-accessible spaces</li>
                  <li>Clearly marked accessible spots in listings</li>
                  <li>Ground-level parking options</li>
                  <li>Extra-wide spaces for adapted vehicles</li>
                  <li>Ramp access indicators</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Known Limitations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>While we strive for full accessibility, some areas are still being improved:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Some older map integrations may have limited accessibility</li>
                  <li>Third-party payment pages may vary in accessibility</li>
                  <li>User-uploaded content may lack alt text</li>
                </ul>
                <p className="mt-4">We are actively working to address these limitations.</p>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Assistive Technology Support</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Parq is tested with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>NVDA (Windows)</li>
                  <li>VoiceOver (iOS/macOS)</li>
                  <li>TalkBack (Android)</li>
                  <li>Dragon NaturallySpeaking</li>
                  <li>Keyboard-only navigation</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <Phone className="text-primary" />
                Accessibility Support
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Need accessibility assistance? We're here to help:</p>
                <div className="bg-secondary/50 rounded-xl p-4 mt-4">
                  <p><strong className="text-foreground">Email:</strong> accessibility@parq.in</p>
                  <p><strong className="text-foreground">Phone:</strong> +91 1800-XXX-XXXX (Toll-free)</p>
                  <p><strong className="text-foreground">Response Time:</strong> Within 2 business days</p>
                </div>
                <p className="mt-4">Please include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nature of the accessibility issue</li>
                  <li>Page or feature affected</li>
                  <li>Assistive technology used</li>
                  <li>Browser and device information</li>
                </ul>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Continuous Improvement</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We regularly:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Conduct accessibility audits</li>
                  <li>Train our team on accessibility best practices</li>
                  <li>Gather feedback from users with disabilities</li>
                  <li>Update our platform based on feedback</li>
                </ul>
                <p className="mt-4 text-sm">Last accessibility review: December 2024</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accessibility;

import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I book a parking spot?", a: "Search for parking by entering your destination. Select a spot, choose your time, and pay securely. You'll receive a digital pass." },
  { q: "What payment methods are accepted?", a: "We accept UPI, credit/debit cards, net banking, and Parq Wallet." },
  { q: "Can I cancel my booking?", a: "Yes, free cancellation is available up to 1 hour before your booking start time. Check the specific spot's policy for details." },
  { q: "How do I enter the parking spot?", a: "Use the QR code or OTP shown in your app. Scan at entry or show to the guard." },
  { q: "What if I overstay my booking?", a: "You'll be notified before your time ends. Overstay is charged at 1.5x the regular rate." },
  { q: "How do I become a host?", a: "Sign up as a host, add your space details and photos, complete verification, and start earning." },
  { q: "When do hosts get paid?", a: "Payouts are processed weekly and deposited directly to your bank account." },
  { q: "Is my vehicle insured?", a: "Yes, all bookings include vehicle protection coverage. See our insurance policy for details." },
  { q: "What if there's an issue at the parking spot?", a: "Contact our 24/7 support via app chat or call 1800-PARQ-HELP." },
  { q: "Can I book for someone else?", a: "Yes, you can enter a different vehicle number while booking." }
];

const FAQs = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <section className="pt-32 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Frequently Asked <span className="text-gradient">Questions</span></h1>
          <p className="text-xl text-muted-foreground">Quick answers to common questions</p>
        </motion.div>
      </div>
    </section>
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-xl px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
    <Footer />
  </main>
);

export default FAQs;

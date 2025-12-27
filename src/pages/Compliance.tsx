import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileCheck } from "lucide-react";

const Compliance = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <section className="pt-32 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Compliance & <span className="text-gradient">Regulations</span></h1>
          <p className="text-xl text-muted-foreground">How Parq adheres to regulatory requirements</p>
        </motion.div>
      </div>
    </section>
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-invert">
          <div className="p-8 rounded-3xl bg-card border border-border space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground">Regulatory Compliance</h2>
            <p className="text-muted-foreground">Parq operates in full compliance with applicable laws and regulations including GST, data protection (DPDP Act), consumer protection, and local municipal regulations.</p>
            <h3 className="font-display text-xl font-bold text-foreground">Key Compliance Areas</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• GST registered and compliant</li>
              <li>• Data Protection (DPDP Act 2023)</li>
              <li>• Consumer Protection Act compliance</li>
              <li>• RBI guidelines for digital payments</li>
              <li>• Local parking regulations adherence</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default Compliance;

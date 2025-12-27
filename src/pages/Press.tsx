import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Download, FileText, Image } from "lucide-react";

const Press = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <section className="pt-32 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Press & <span className="text-gradient">Media Kit</span></h1>
          <p className="text-xl text-muted-foreground">Resources for journalists and media partners</p>
        </motion.div>
      </div>
    </section>
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl bg-card border border-border">
            <Image className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Brand Assets</h3>
            <p className="text-muted-foreground mb-4">Logos, icons, and brand guidelines</p>
            <Button variant="outline"><Download className="w-4 h-4 mr-2" />Download Kit</Button>
          </div>
          <div className="p-8 rounded-3xl bg-card border border-border">
            <FileText className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Press Releases</h3>
            <p className="text-muted-foreground mb-4">Latest news and announcements</p>
            <Button variant="outline">View All</Button>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">For press inquiries, contact:</p>
          <p className="text-primary font-semibold">press@parq.app</p>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default Press;

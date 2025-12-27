import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle, ChevronRight } from "lucide-react";

const articles: Record<string, any> = {
  "how-to-book": {
    title: "How to Book a Parking Spot",
    category: "Getting Started",
    content: `
      <h2>Step 1: Search for Parking</h2>
      <p>Open the Parq app and enter your destination in the search bar. You can also use "Near Me" to find parking spots close to your current location.</p>
      
      <h2>Step 2: Choose a Spot</h2>
      <p>Browse through available parking spots. Each listing shows:</p>
      <ul>
        <li>Price per hour/day</li>
        <li>Distance from your destination</li>
        <li>Amenities (covered, EV charging, security)</li>
        <li>User ratings and reviews</li>
      </ul>
      
      <h2>Step 3: Select Your Time</h2>
      <p>Choose your check-in and check-out times. The app will calculate the total cost based on your duration.</p>
      
      <h2>Step 4: Complete Payment</h2>
      <p>Select your preferred payment method (UPI, cards, wallet) and confirm your booking. You'll receive a digital pass with a QR code.</p>
      
      <h2>Step 5: Park Your Vehicle</h2>
      <p>Navigate to the parking location and show your QR code at entry. Enjoy hassle-free parking!</p>
    `,
    relatedArticles: [
      { title: "Payment Methods Accepted", slug: "payment-methods" },
      { title: "How to Cancel a Booking", slug: "cancel-booking" },
      { title: "Understanding Parking Fees", slug: "parking-fees" },
    ],
  },
  "payment-methods": {
    title: "Payment Methods Accepted",
    category: "Booking & Payments",
    content: `
      <h2>Accepted Payment Methods</h2>
      <p>Parq accepts a wide variety of payment methods for your convenience:</p>
      
      <h3>UPI</h3>
      <p>Pay instantly using any UPI app like Google Pay, PhonePe, Paytm, or your bank's UPI app.</p>
      
      <h3>Credit & Debit Cards</h3>
      <p>We accept all major cards including Visa, Mastercard, RuPay, and American Express.</p>
      
      <h3>Net Banking</h3>
      <p>Pay directly from your bank account using internet banking from any supported bank.</p>
      
      <h3>Parq Wallet</h3>
      <p>Add money to your Parq Wallet for faster checkouts and exclusive cashback offers.</p>
      
      <h2>Saving Payment Methods</h2>
      <p>You can save your preferred payment methods in the app for quicker future bookings. Your card details are securely encrypted and never stored on our servers.</p>
    `,
    relatedArticles: [
      { title: "How to Book a Parking Spot", slug: "how-to-book" },
      { title: "Refund Policy", slug: "refund-policy" },
      { title: "Add Money to Wallet", slug: "add-wallet" },
    ],
  },
};

const HelpArticle = () => {
  const { slug } = useParams();
  const article = articles[slug || ""] || articles["how-to-book"];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/help" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Help Center
            </Link>

            <div className="text-sm text-primary mb-2">{article.category}</div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-8">
              {article.title}
            </h1>

            <div 
              className="prose prose-lg prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Feedback */}
            <Card className="bg-card border-border mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Was this article helpful?</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ThumbsUp className="w-4 h-4" /> Yes
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ThumbsDown className="w-4 h-4" /> No
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <div className="mb-8">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Related Articles</h2>
              <div className="space-y-2">
                {article.relatedArticles.map((related: any, i: number) => (
                  <Link 
                    key={i}
                    to={`/help/${related.slug}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                  >
                    <span className="text-foreground">{related.title}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Still need help?</h3>
                  <p className="text-muted-foreground">Our support team is available 24/7</p>
                </div>
                <Button className="gap-2">
                  <MessageCircle className="w-4 h-4" /> Contact Support
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default HelpArticle;

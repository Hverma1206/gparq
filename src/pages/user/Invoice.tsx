import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Download, Share2, Printer, Car, 
  MapPin, Calendar, Clock, CheckCircle 
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Invoice = () => {
  const { id } = useParams();

  const invoice = {
    id: "INV-2025-00142",
    bookingId: "BKG-78945",
    date: "December 27, 2025",
    status: "Paid",
    
    location: {
      name: "Phoenix Mall Parking",
      address: "Phoenix Marketcity, Whitefield, Bangalore - 560066",
    },
    
    vehicle: {
      name: "Honda City",
      number: "KA 01 AB 1234",
    },
    
    duration: {
      checkIn: "Dec 27, 2025 - 2:00 PM",
      checkOut: "Dec 27, 2025 - 5:00 PM",
      hours: "3 hours",
    },
    
    pricing: {
      basePrice: 100,
      duration: 3,
      subtotal: 300,
      convenienceFee: 15,
      gst: 56.70,
      discount: 50,
      total: 321.70,
    },
    
    payment: {
      method: "HDFC Credit Card ****4532",
      transactionId: "TXN789456123",
      paidAt: "Dec 27, 2025 - 1:45 PM",
    },
    
    customer: {
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 98765 43210",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <Link to="/user/bookings" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Bookings
              </Link>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="w-4 h-4" /> Print
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </Button>
                <Button size="sm" className="gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              </div>
            </div>

            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="h-8 w-8 text-primary" />
                      <span className="font-display text-2xl font-bold text-foreground">Parq</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Parq Technologies Pvt. Ltd.<br />
                      #123, Tech Park, Bangalore - 560001<br />
                      GSTIN: 29XXXXX1234X1Z5
                    </p>
                  </div>
                  <div className="text-right">
                    <h1 className="font-display text-2xl font-bold text-foreground mb-1">INVOICE</h1>
                    <p className="text-muted-foreground">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground mt-2">{invoice.date}</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-green-500 text-sm">
                      <CheckCircle className="w-4 h-4" /> {invoice.status}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Customer & Booking Info */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Bill To</h3>
                    <p className="text-muted-foreground">
                      {invoice.customer.name}<br />
                      {invoice.customer.email}<br />
                      {invoice.customer.phone}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Booking Details</h3>
                    <p className="text-muted-foreground">
                      Booking ID: {invoice.bookingId}<br />
                      Vehicle: {invoice.vehicle.name} ({invoice.vehicle.number})
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl bg-secondary/50 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{invoice.location.name}</div>
                      <div className="text-sm text-muted-foreground">{invoice.location.address}</div>
                    </div>
                  </div>
                  <div className="flex gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {invoice.duration.checkIn}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {invoice.duration.hours}
                    </div>
                  </div>
                </div>

                {/* Pricing Table */}
                <div className="border border-border rounded-xl overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-foreground">Description</th>
                        <th className="text-right p-4 font-medium text-foreground">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border">
                        <td className="p-4 text-muted-foreground">
                          Parking ({invoice.pricing.duration} hours × ₹{invoice.pricing.basePrice}/hr)
                        </td>
                        <td className="p-4 text-right text-foreground">₹{invoice.pricing.subtotal}</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-4 text-muted-foreground">Convenience Fee</td>
                        <td className="p-4 text-right text-foreground">₹{invoice.pricing.convenienceFee}</td>
                      </tr>
                      <tr className="border-t border-border">
                        <td className="p-4 text-muted-foreground">GST (18%)</td>
                        <td className="p-4 text-right text-foreground">₹{invoice.pricing.gst}</td>
                      </tr>
                      {invoice.pricing.discount > 0 && (
                        <tr className="border-t border-border">
                          <td className="p-4 text-green-500">Discount (FIRST50)</td>
                          <td className="p-4 text-right text-green-500">-₹{invoice.pricing.discount}</td>
                        </tr>
                      )}
                      <tr className="border-t-2 border-border bg-secondary/30">
                        <td className="p-4 font-bold text-foreground">Total</td>
                        <td className="p-4 text-right font-bold text-foreground text-xl">₹{invoice.pricing.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Payment Info */}
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-500">Payment Successful</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Paid via {invoice.payment.method}</p>
                    <p>Transaction ID: {invoice.payment.transactionId}</p>
                    <p>Paid on: {invoice.payment.paidAt}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <p className="text-center text-sm text-muted-foreground">
                  Thank you for using Parq! For support, contact us at support@parkongo.com
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Invoice;

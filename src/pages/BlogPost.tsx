import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

const blogPosts: Record<string, any> = {
  "stress-free-airport-parking": {
    title: "5 Tips for Stress-Free Airport Parking",
    excerpt: "Make your travel smoother with these expert tips for hassle-free airport parking.",
    date: "Dec 20, 2024",
    readTime: "5 min read",
    author: "Priya Sharma",
    category: "Travel Tips",
    content: `
      <p>Airport parking doesn't have to be stressful. With a little planning and the right strategies, you can make your travel experience much smoother. Here are our top 5 tips:</p>
      
      <h2>1. Book in Advance</h2>
      <p>Pre-booking your parking spot can save you time, money, and stress. Parq allows you to reserve a spot near the airport days or even weeks in advance, ensuring you have a guaranteed space waiting for you.</p>
      
      <h2>2. Compare Prices</h2>
      <p>Airport parking prices can vary significantly. Use Parq to compare rates from different parking providers near the airport. You might find a spot that's cheaper and closer than the official airport parking.</p>
      
      <h2>3. Allow Extra Time</h2>
      <p>On travel days, always allow extra time for parking. Factor in time to find your spot, transfer to the terminal, and go through security. We recommend arriving at least 2-3 hours before your flight.</p>
      
      <h2>4. Take Photos of Your Spot</h2>
      <p>Before leaving your car, take photos of your parking location, level number, and any nearby landmarks. This will save you time when you return, especially after a long trip.</p>
      
      <h2>5. Use Digital Parking Passes</h2>
      <p>With Parq, you get a digital parking pass right on your phone. No need to worry about losing paper tickets or remembering which pocket you put them in.</p>
      
      <h2>Conclusion</h2>
      <p>By following these simple tips and using Parq for your airport parking needs, you can start your journey stress-free and enjoy your travels to the fullest.</p>
    `,
  },
  "earn-from-garage": {
    title: "How to Earn ₹10K/Month from Your Garage",
    excerpt: "Turn your unused parking space into a passive income stream.",
    date: "Dec 18, 2024",
    readTime: "7 min read",
    author: "Amit Kumar",
    category: "Hosting Tips",
    content: `
      <p>Have an unused garage or parking space? It could be earning you money right now. Here's how to turn your empty space into a steady income stream with Parq.</p>
      
      <h2>The Opportunity</h2>
      <p>With urban parking becoming increasingly scarce and expensive, there's a growing demand for private parking spaces. Your unused garage or driveway could be exactly what someone is looking for.</p>
      
      <h2>Getting Started as a Parq Host</h2>
      <p>Signing up as a host is simple:</p>
      <ul>
        <li>Create your host account</li>
        <li>Add photos and details of your space</li>
        <li>Set your availability and pricing</li>
        <li>Complete verification</li>
        <li>Start earning!</li>
      </ul>
      
      <h2>Pricing Strategy</h2>
      <p>Research similar spaces in your area. In major cities, private parking spaces can earn ₹200-500 per day. With just 20-25 bookings a month, you could easily hit ₹10,000+.</p>
      
      <h2>Maximize Your Earnings</h2>
      <p>Tips to increase your income:</p>
      <ul>
        <li>Offer monthly packages at a discount</li>
        <li>Keep your space clean and well-lit</li>
        <li>Respond quickly to booking requests</li>
        <li>Add amenities like EV charging</li>
      </ul>
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts[slug || ""] || blogPosts["stress-free-airport-parking"];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <Badge className="mb-4">{post.category}</Badge>
            
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>

            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl mb-12 flex items-center justify-center">
              <span className="text-muted-foreground">Featured Image</span>
            </div>

            <div 
              className="prose prose-lg prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share */}
            <div className="border-t border-border pt-8">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share this article
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPost;

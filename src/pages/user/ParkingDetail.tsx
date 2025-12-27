import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, Star, Clock, Zap, Car, Shield, Camera, 
  ChevronLeft, ChevronRight, Share2, Heart, Navigation,
  Calendar, Phone, Info
} from "lucide-react";
import Header from "@/components/layout/Header";

const ParkingDetail = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const parking = {
    id: 1,
    name: "Forum Mall Parking",
    address: "Koramangala 5th Block, 80 Feet Road, Bangalore - 560095",
    distance: "0.3 km",
    price: 40,
    rating: 4.8,
    reviews: 245,
    available: 12,
    total: 50,
    features: ["Covered Parking", "EV Charging", "24/7 Open", "CCTV", "Security Guard", "Valet Available"],
    images: [
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800",
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800",
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800",
    ],
    operatingHours: "Open 24 hours",
    contactNumber: "+91 98765 43210",
    description: "Premium covered parking facility at Forum Mall with state-of-the-art security and EV charging stations. Convenient location with easy access to shopping, dining, and entertainment.",
    rules: [
      "Valid parking ticket required at all times",
      "Maximum vehicle height: 2.1 meters",
      "No overnight parking without prior approval",
      "Report any incidents to security immediately",
    ],
  };

  const reviews = [
    { id: 1, name: "Priya S.", rating: 5, comment: "Great parking facility! Clean, secure, and the EV charging works perfectly.", date: "2 days ago" },
    { id: 2, name: "Rahul M.", rating: 4, comment: "Good location and security. A bit crowded on weekends.", date: "1 week ago" },
    { id: 3, name: "Ananya K.", rating: 5, comment: "Best parking near the mall. Valet service is very professional.", date: "2 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        {/* Image Gallery */}
        <div className="relative h-64 md:h-96 bg-muted">
          <img
            src={parking.images[currentImage]}
            alt={parking.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          {/* Navigation */}
          <button
            onClick={() => setCurrentImage((prev) => (prev === 0 ? parking.images.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentImage((prev) => (prev === parking.images.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Image Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {parking.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImage === index ? "bg-primary" : "bg-background/50"
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                          {parking.name}
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {parking.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{parking.rating}</span>
                        <span className="text-muted-foreground">({parking.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>{parking.operatingHours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-green-500" />
                        <span className="text-green-500 font-medium">{parking.available} spots available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="h-5 w-5 text-blue-500" />
                        <span>{parking.distance} away</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">{parking.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {parking.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="px-3 py-1">
                          {feature.includes("EV") && <Zap className="h-3 w-3 mr-1" />}
                          {feature.includes("CCTV") && <Camera className="h-3 w-3 mr-1" />}
                          {feature.includes("Security") && <Shield className="h-3 w-3 mr-1" />}
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      Parking Rules
                    </h2>
                    <ul className="space-y-2">
                      {parking.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                      Reviews ({parking.reviews})
                    </h2>
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="p-4 rounded-xl bg-secondary/50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  {review.name[0]}
                                </span>
                              </div>
                              <span className="font-medium">{review.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{review.comment}</p>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-card border-border sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="font-display text-4xl font-bold text-primary">
                      ₹{parking.price}
                    </div>
                    <div className="text-muted-foreground">per hour</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <label className="text-sm text-muted-foreground mb-2 block">Date</label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="font-medium">Today, Dec 25, 2025</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-secondary/50">
                        <label className="text-sm text-muted-foreground mb-2 block">Start Time</label>
                        <span className="font-medium">2:00 PM</span>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/50">
                        <label className="text-sm text-muted-foreground mb-2 block">End Time</label>
                        <span className="font-medium">5:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">3 hours</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Rate</span>
                      <span className="font-medium">₹{parking.price}/hr</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary">₹{parking.price * 3}</span>
                    </div>
                  </div>

                  <Link to={`/booking/${parking.id}`}>
                    <Button className="w-full" size="lg">
                      Book Now
                    </Button>
                  </Link>

                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-green-500" />
                    Free cancellation up to 1 hour before
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParkingDetail;

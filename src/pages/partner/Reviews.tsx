import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, ThumbsUp, ThumbsDown, MessageCircle, 
  User, Calendar, Car, Filter
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const PartnerReviews = () => {
  const stats = {
    overall: 4.9,
    total: 234,
    breakdown: [
      { stars: 5, count: 189, percent: 81 },
      { stars: 4, count: 32, percent: 14 },
      { stars: 3, count: 8, percent: 3 },
      { stars: 2, count: 3, percent: 1 },
      { stars: 1, count: 2, percent: 1 },
    ],
  };

  const reviews = [
    {
      id: 1,
      customer: "Rahul S.",
      rating: 5,
      date: "Dec 26, 2025",
      service: "Premium Car Wash",
      vehicle: "Honda City",
      comment: "Excellent service! My car looks brand new. The team was professional and thorough.",
      reply: "Thank you for your kind words, Rahul! We're glad you loved our service.",
    },
    {
      id: 2,
      customer: "Priya M.",
      rating: 5,
      date: "Dec 25, 2025",
      service: "Interior Cleaning",
      vehicle: "Maruti Swift",
      comment: "Very impressed with the interior cleaning. All the stains were removed perfectly.",
      reply: null,
    },
    {
      id: 3,
      customer: "Amit K.",
      rating: 4,
      date: "Dec 24, 2025",
      service: "Basic Wash",
      vehicle: "Hyundai i20",
      comment: "Good service overall. Could have been a bit quicker but quality was great.",
      reply: null,
    },
    {
      id: 4,
      customer: "Sneha R.",
      rating: 5,
      date: "Dec 23, 2025",
      service: "Premium Car Wash",
      vehicle: "Toyota Innova",
      comment: "Best car wash service in Bangalore! Highly recommended.",
      reply: "Thank you Sneha! We appreciate your support.",
    },
  ];

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Reviews
            </h1>
            <p className="text-muted-foreground">
              See what customers are saying about your services
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>

        {/* Rating Overview */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="font-display text-5xl font-bold text-foreground mb-2">
                {stats.overall}
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.round(stats.overall) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <p className="text-muted-foreground">Based on {stats.total} reviews</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border lg:col-span-2">
            <CardContent className="p-6">
              <div className="space-y-3">
                {stats.breakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="w-12 text-sm text-muted-foreground">{item.stars} stars</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <span className="w-12 text-sm text-muted-foreground text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 rounded-xl bg-secondary/50 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{review.customer}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary">{review.service}</Badge>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Car className="w-3 h-3" /> {review.vehicle}
                  </span>
                </div>

                <p className="text-foreground">{review.comment}</p>

                {review.reply ? (
                  <div className="p-3 rounded-lg bg-primary/5 border-l-2 border-primary">
                    <div className="text-sm font-medium text-primary mb-1">Your Reply</div>
                    <p className="text-sm text-muted-foreground">{review.reply}</p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <MessageCircle className="w-4 h-4" /> Reply
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-2">
                      <ThumbsUp className="w-4 h-4" /> Thank
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerReviews;

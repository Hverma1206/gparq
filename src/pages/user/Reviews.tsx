import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageSquare, MapPin, Calendar, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  parkingName: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  hostReply?: string;
  helpful: number;
  images?: string[];
}

interface PendingReview {
  id: string;
  parkingName: string;
  location: string;
  date: string;
  bookingId: string;
}

const UserReviews = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const myReviews: Review[] = [
    {
      id: "1",
      parkingName: "MG Road Parking Complex",
      location: "MG Road, Bangalore",
      rating: 5,
      comment: "Excellent parking spot! Very secure and the host was very helpful. The space was clean and easy to access. Would definitely book again.",
      date: "Dec 20, 2024",
      helpful: 12,
      hostReply: "Thank you for your kind words! We're glad you had a great experience."
    },
    {
      id: "2",
      parkingName: "Indiranagar Residential Parking",
      location: "Indiranagar, Bangalore",
      rating: 4,
      comment: "Good parking space in a convenient location. Only issue was finding the exact spot initially, but the host provided clear directions.",
      date: "Dec 15, 2024",
      helpful: 5
    },
    {
      id: "3",
      parkingName: "Koramangala Tech Park",
      location: "Koramangala, Bangalore",
      rating: 3,
      comment: "Average experience. The space was a bit tight for my SUV, but it worked. Price was reasonable.",
      date: "Dec 10, 2024",
      helpful: 2
    }
  ];

  const pendingReviews: PendingReview[] = [
    {
      id: "p1",
      parkingName: "Whitefield IT Hub Parking",
      location: "Whitefield, Bangalore",
      date: "Dec 25, 2024",
      bookingId: "BK-7892"
    },
    {
      id: "p2",
      parkingName: "HSR Layout Community Parking",
      location: "HSR Layout, Bangalore",
      date: "Dec 22, 2024",
      bookingId: "BK-7845"
    }
  ];

  const handleSubmitReview = (pendingId: string) => {
    if (selectedRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    toast.success("Review submitted successfully!");
    setSelectedRating(0);
    setReviewText("");
  };

  const handleDeleteReview = (reviewId: string) => {
    toast.success("Review deleted");
  };

  const renderStars = (rating: number, interactive = false, size = "h-4 w-4") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= (interactive ? (hoverRating || selectedRating) : rating)
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted-foreground"
            } ${interactive ? "cursor-pointer transition-colors" : ""}`}
            onClick={() => interactive && setSelectedRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">My Reviews</h1>
          <p className="text-muted-foreground">Manage your parking reviews and ratings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold">{myReviews.length}</p>
              <p className="text-sm text-muted-foreground">Reviews Given</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold">{pendingReviews.length}</p>
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold">4.0</p>
              <p className="text-sm text-muted-foreground">Avg Rating Given</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold">{myReviews.reduce((sum, r) => sum + r.helpful, 0)}</p>
              <p className="text-sm text-muted-foreground">Helpful Votes</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Reviews
              {pendingReviews.length > 0 && (
                <Badge variant="secondary" className="ml-2">{pendingReviews.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingReviews.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No pending reviews</p>
                </CardContent>
              </Card>
            ) : (
              pendingReviews.map((pending) => (
                <Card key={pending.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{pending.parkingName}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3" />
                          {pending.location}
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          {pending.date}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Booking: {pending.bookingId}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Rating</label>
                      {renderStars(0, true, "h-8 w-8")}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Review</label>
                      <Textarea
                        placeholder="Share your experience with this parking spot..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSubmitReview(pending.id)}>
                        Submit Review
                      </Button>
                      <Button variant="ghost">Skip</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="my-reviews" className="space-y-4">
            {myReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{review.parkingName}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {review.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteReview(review.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>

                    <p className="text-sm">{review.comment}</p>

                    {review.hostReply && (
                      <div className="bg-secondary/50 p-4 rounded-lg">
                        <p className="text-sm font-medium mb-1">Host Reply:</p>
                        <p className="text-sm text-muted-foreground">{review.hostReply}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-2 border-t">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {review.helpful} found helpful
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserReviews;

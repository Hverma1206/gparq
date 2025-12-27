import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, ThumbsUp, MessageCircle, TrendingUp, Filter,
  ChevronDown, Flag, Reply
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const HostReviews = () => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const stats = {
    averageRating: 4.7,
    totalReviews: 156,
    fiveStars: 98,
    fourStars: 42,
    threeStars: 12,
    twoStars: 3,
    oneStars: 1,
  };

  const reviews = [
    {
      id: 1,
      user: "Rahul S.",
      rating: 5,
      date: "Dec 24, 2025",
      spot: "Forum Mall Parking",
      comment: "Excellent parking space! Very clean, well-lit, and the staff was helpful. Will definitely use again.",
      helpful: 12,
      hasReply: false,
    },
    {
      id: 2,
      user: "Priya M.",
      rating: 4,
      date: "Dec 22, 2025",
      spot: "Forum Mall Parking",
      comment: "Good parking facility. A bit crowded during peak hours but overall a good experience.",
      helpful: 8,
      hasReply: true,
      hostReply: "Thank you for your feedback! We're working on improving traffic management during peak hours.",
    },
    {
      id: 3,
      user: "Amit K.",
      rating: 5,
      date: "Dec 20, 2025",
      spot: "Brigade Gateway Parking",
      comment: "Love the EV charging facility! Made my trip so convenient.",
      helpful: 15,
      hasReply: false,
    },
    {
      id: 4,
      user: "Neha R.",
      rating: 3,
      date: "Dec 18, 2025",
      spot: "Forum Mall Parking",
      comment: "Parking was okay but the entry process took too long. Could be improved.",
      helpful: 5,
      hasReply: true,
      hostReply: "We apologize for the inconvenience. We've updated our entry system to be faster.",
    },
  ];

  const handleReply = (reviewId: number) => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }
    console.log(`Replying to review ${reviewId}: ${replyText}`);
    toast.success("Reply posted successfully!");
    setReplyingTo(null);
    setReplyText("");
  };

  const handleReport = (reviewId: number) => {
    console.log(`Reporting review: ${reviewId}`);
    toast.info("Review reported for moderation");
  };

  const RatingBar = ({ stars, count, total }: { stars: number; count: number; total: number }) => (
    <div className="flex items-center gap-2">
      <span className="text-sm w-3">{stars}</span>
      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-yellow-500 rounded-full"
          style={{ width: `${(count / total) * 100}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground w-8">{count}</span>
    </div>
  );

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Reviews & Ratings
          </h1>
          <p className="text-muted-foreground">
            See what your customers are saying
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="font-display text-4xl font-bold text-foreground">{stats.averageRating}</span>
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <p className="font-display text-4xl font-bold text-foreground mb-2">{stats.totalReviews}</p>
              <p className="text-muted-foreground">Total Reviews</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="space-y-2">
                <RatingBar stars={5} count={stats.fiveStars} total={stats.totalReviews} />
                <RatingBar stars={4} count={stats.fourStars} total={stats.totalReviews} />
                <RatingBar stars={3} count={stats.threeStars} total={stats.totalReviews} />
                <RatingBar stars={2} count={stats.twoStars} total={stats.totalReviews} />
                <RatingBar stars={1} count={stats.oneStars} total={stats.totalReviews} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="positive">Positive ({reviews.filter(r => r.rating >= 4).length})</TabsTrigger>
              <TabsTrigger value="negative">Needs Response ({reviews.filter(r => !r.hasReply).length})</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Filter options coming soon")}>
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <TabsContent value="all" className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">{review.user[0]}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{review.user}</h3>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {review.date} • {review.spot}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleReport(review.id)}
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-foreground mb-4">{review.comment}</p>

                    <div className="flex items-center gap-4 mb-4">
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        Helpful ({review.helpful})
                      </Button>
                      {!review.hasReply && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => setReplyingTo(review.id)}
                        >
                          <Reply className="h-4 w-4" />
                          Reply
                        </Button>
                      )}
                    </div>

                    {/* Host Reply */}
                    {review.hasReply && review.hostReply && (
                      <div className="ml-6 p-4 rounded-lg bg-primary/5 border-l-2 border-primary">
                        <p className="text-sm font-medium text-primary mb-1">Your Reply</p>
                        <p className="text-sm text-muted-foreground">{review.hostReply}</p>
                      </div>
                    )}

                    {/* Reply Input */}
                    {replyingTo === review.id && (
                      <div className="mt-4 space-y-2">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                          <Button size="sm" onClick={() => handleReply(review.id)}>
                            Post Reply
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="positive" className="space-y-4">
            {reviews.filter(r => r.rating >= 4).map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <span className="font-bold text-green-500">{review.user[0]}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{review.user}</h3>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge variant="secondary" className="bg-green-500/10 text-green-500">Positive</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {review.date} • {review.spot}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground">{review.comment}</p>
                    {review.hasReply && review.hostReply && (
                      <div className="ml-6 mt-4 p-4 rounded-lg bg-primary/5 border-l-2 border-primary">
                        <p className="text-sm font-medium text-primary mb-1">Your Reply</p>
                        <p className="text-sm text-muted-foreground">{review.hostReply}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="negative" className="space-y-4">
            {reviews.filter(r => !r.hasReply).length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">All reviews have been responded to!</p>
                </CardContent>
              </Card>
            ) : (
              reviews.filter(r => !r.hasReply).map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-card border-border border-yellow-500/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                            <span className="font-bold text-yellow-500">{review.user[0]}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{review.user}</h3>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">Awaiting Reply</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {review.date} • {review.spot}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-foreground mb-4">{review.comment}</p>
                      
                      {replyingTo === review.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            className="min-h-[80px]"
                          />
                          <div className="flex gap-2 justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setReplyingTo(null)}
                            >
                              Cancel
                            </Button>
                            <Button size="sm" onClick={() => handleReply(review.id)}>
                              Post Reply
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          className="gap-2"
                          onClick={() => setReplyingTo(review.id)}
                        >
                          <Reply className="h-4 w-4" />
                          Respond Now
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HostReviews;

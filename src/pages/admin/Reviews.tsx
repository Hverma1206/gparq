import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, Search, MoreVertical, Eye, CheckCircle, XCircle, Flag, Trash2, MessageSquare
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface Review {
  id: number;
  user: string;
  host: string;
  rating: number;
  comment: string;
  date: string;
  status: "Published" | "Pending" | "Flagged" | "Removed";
  flagReason?: string;
}

const AdminReviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFlagDialog, setShowFlagDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [flagReason, setFlagReason] = useState("");

  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, user: "Rahul Sharma", host: "Forum Mall Parking", rating: 5, comment: "Excellent parking experience! Very clean and secure facility.", date: "Dec 26, 2025", status: "Published" },
    { id: 2, user: "Priya Mehta", host: "Brigade Gateway", rating: 4, comment: "Good parking, but a bit crowded during peak hours.", date: "Dec 25, 2025", status: "Published" },
    { id: 3, user: "Amit Kumar", host: "UB City Parking", rating: 2, comment: "Poor service. The staff was rude and unprofessional.", date: "Dec 24, 2025", status: "Flagged", flagReason: "Inappropriate language" },
    { id: 4, user: "Neha Reddy", host: "Orion Mall", rating: 5, comment: "Best parking in the city! Valet service was amazing.", date: "Dec 23, 2025", status: "Published" },
    { id: 5, user: "Vikram Patel", host: "Phoenix Mall", rating: 3, comment: "Average experience. Nothing special but gets the job done.", date: "Dec 22, 2025", status: "Pending" },
    { id: 6, user: "Sunita Sharma", host: "Forum Mall Parking", rating: 1, comment: "This is spam content that should be removed...", date: "Dec 21, 2025", status: "Removed" },
  ]);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (review: Review) => {
    setSelectedReview(review);
    setShowViewDialog(true);
  };

  const handleApprove = (review: Review) => {
    setReviews(reviews.map(r => r.id === review.id ? { ...r, status: "Published" } : r));
    toast.success("Review approved and published");
  };

  const handleFlag = (review: Review) => {
    setSelectedReview(review);
    setFlagReason("");
    setShowFlagDialog(true);
  };

  const confirmFlag = () => {
    if (!selectedReview) return;
    setReviews(reviews.map(r => r.id === selectedReview.id ? { ...r, status: "Flagged", flagReason } : r));
    setShowFlagDialog(false);
    toast.warning("Review flagged for moderation");
  };

  const handleDelete = (review: Review) => {
    setSelectedReview(review);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!selectedReview) return;
    setReviews(reviews.map(r => r.id === selectedReview.id ? { ...r, status: "Removed" } : r));
    setShowDeleteDialog(false);
    toast.success("Review removed");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
    );
  };

  const stats = {
    total: reviews.length,
    published: reviews.filter(r => r.status === "Published").length,
    pending: reviews.filter(r => r.status === "Pending").length,
    flagged: reviews.filter(r => r.status === "Flagged").length,
    avgRating: (reviews.filter(r => r.status === "Published").reduce((acc, r) => acc + r.rating, 0) / reviews.filter(r => r.status === "Published").length).toFixed(1),
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Reviews & Moderation
            </h1>
            <p className="text-muted-foreground">
              Manage and moderate user reviews
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Reviews</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-muted-foreground">Avg Rating</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.avgRating}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Published</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.published}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flag className="h-5 w-5 text-destructive" />
                <span className="text-sm text-muted-foreground">Flagged</span>
              </div>
              <p className="font-display text-2xl font-bold">{stats.flagged}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Flagged">Flagged</SelectItem>
              <SelectItem value="Removed">Removed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="max-w-xs">Review</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review, index) => (
                  <motion.tr
                    key={review.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-secondary/50"
                  >
                    <TableCell className="font-medium">{review.user}</TableCell>
                    <TableCell className="text-muted-foreground">{review.host}</TableCell>
                    <TableCell>{renderStars(review.rating)}</TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate text-sm">{review.comment}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{review.date}</TableCell>
                    <TableCell>
                      <Badge className={
                        review.status === "Published" ? "bg-green-500/10 text-green-500" :
                        review.status === "Flagged" ? "bg-destructive/10 text-destructive" :
                        review.status === "Removed" ? "bg-gray-500/10 text-gray-500" :
                        "bg-yellow-500/10 text-yellow-500"
                      }>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(review)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Review
                          </DropdownMenuItem>
                          {review.status === "Pending" && (
                            <DropdownMenuItem onClick={() => handleApprove(review)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve & Publish
                            </DropdownMenuItem>
                          )}
                          {review.status !== "Removed" && review.status !== "Flagged" && (
                            <DropdownMenuItem onClick={() => handleFlag(review)}>
                              <Flag className="h-4 w-4 mr-2" />
                              Flag for Review
                            </DropdownMenuItem>
                          )}
                          {review.status === "Flagged" && (
                            <DropdownMenuItem onClick={() => handleApprove(review)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Unflag & Publish
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {review.status !== "Removed" && (
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(review)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Review
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Review Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
            </DialogHeader>
            {selectedReview && (
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedReview.user}</p>
                    <p className="text-sm text-muted-foreground">reviewed {selectedReview.host}</p>
                  </div>
                  {renderStars(selectedReview.rating)}
                </div>
                <div className="p-4 rounded-lg bg-secondary/30">
                  <p className="text-sm">{selectedReview.comment}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{selectedReview.date}</span>
                  <Badge className={
                    selectedReview.status === "Published" ? "bg-green-500/10 text-green-500" :
                    selectedReview.status === "Flagged" ? "bg-destructive/10 text-destructive" :
                    selectedReview.status === "Removed" ? "bg-gray-500/10 text-gray-500" :
                    "bg-yellow-500/10 text-yellow-500"
                  }>
                    {selectedReview.status}
                  </Badge>
                </div>
                {selectedReview.flagReason && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">
                      <strong>Flag Reason:</strong> {selectedReview.flagReason}
                    </p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Flag Review Dialog */}
        <Dialog open={showFlagDialog} onOpenChange={setShowFlagDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Flag Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Please provide a reason for flagging this review.
              </p>
              <Textarea
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="e.g., Inappropriate language, spam content, etc."
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFlagDialog(false)}>Cancel</Button>
              <Button onClick={confirmFlag} variant="destructive">Flag Review</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Review</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this review? This action will hide the review from public view.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminReviews;

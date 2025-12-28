import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  IndianRupee, TrendingUp, Calendar, Download, 
  ArrowUpRight, ArrowDownRight, Building, Clock, Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";
import { useBookings } from "@/hooks/useBookings";
import { useParkingSpotStats } from "@/hooks/useParkingSpots";
import { format } from "date-fns";

const Earnings = () => {
  const { bookings, isLoading: bookingsLoading } = useBookings();
  const { data: spotStats, isLoading: statsLoading } = useParkingSpotStats();

  const completedBookings = bookings?.filter(b => b.status === "completed") || [];
  
  const totalEarnings = completedBookings.reduce((sum, b) => sum + (Number(b.host_payout) || 0), 0);
  
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthBookings = completedBookings.filter(b => new Date(b.created_at) >= startOfMonth);
  const thisMonthEarnings = thisMonthBookings.reduce((sum, b) => sum + (Number(b.host_payout) || 0), 0);

  const stats = {
    totalEarnings: `₹${totalEarnings.toLocaleString()}`,
    thisMonth: `₹${thisMonthEarnings.toLocaleString()}`,
    pending: `₹${(spotStats?.earnings || 0).toLocaleString()}`,
    withdrawn: "₹0",
  };

  // Generate monthly data from bookings
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const monthBookings = completedBookings.filter(b => {
      const bookingDate = new Date(b.created_at);
      return bookingDate >= monthStart && bookingDate <= monthEnd;
    });
    
    return {
      month: format(date, "MMM"),
      amount: monthBookings.reduce((sum, b) => sum + (Number(b.host_payout) || 0), 0),
    };
  });

  const maxAmount = Math.max(...monthlyData.map(d => d.amount), 1);

  const handleDownload = () => toast.success("Report download started");
  const handleWithdraw = () => toast.success("Withdrawal initiated");

  if (bookingsLoading || statsLoading) {
    return (
      <DashboardLayout type="host">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Earnings
            </h1>
            <p className="text-muted-foreground">
              Track your earnings and manage payouts
            </p>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleDownload}>
            <Download className="h-5 w-5" />
            Download Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <IndianRupee className="h-8 w-8 mb-4 opacity-80" />
              <div className="font-display text-2xl font-bold mb-1">
                {stats.totalEarnings}
              </div>
              <div className="text-sm opacity-80">Total Earnings</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground mb-1">
                {stats.thisMonth}
              </div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-yellow-500 mb-4" />
              <div className="font-display text-2xl font-bold text-foreground mb-1">
                {stats.pending}
              </div>
              <div className="text-sm text-muted-foreground">Pending Payout</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <Building className="h-8 w-8 text-blue-500 mb-4" />
              <div className="font-display text-2xl font-bold text-foreground mb-1">
                {stats.withdrawn}
              </div>
              <div className="text-sm text-muted-foreground">Total Withdrawn</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Earnings Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-xl">Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-secondary rounded-t-lg relative" style={{ height: '200px' }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(data.amount / maxAmount) * 100}%` }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          className="absolute bottom-0 w-full bg-primary rounded-t-lg"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{data.month}</span>
                      <span className="text-xs font-medium">₹{(data.amount / 1000).toFixed(1)}k</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payout Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl">Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-sm text-muted-foreground mb-2">Available for Withdrawal</div>
                <div className="font-display text-4xl font-bold text-primary">
                  {stats.pending}
                </div>
              </div>
              <Button className="w-full mb-4" onClick={handleWithdraw}>Withdraw to Bank</Button>
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3 mb-2">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Bank Account</div>
                    <div className="text-sm text-muted-foreground">Not linked</div>
                  </div>
                </div>
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => toast.info("Link bank account coming soon")}>
                  Link Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {completedBookings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <IndianRupee className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No transactions yet</p>
                  </div>
                ) : (
                  completedBookings.slice(0, 10).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <ArrowDownRight className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            Booking #{booking.id.slice(0, 8).toUpperCase()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {booking.parking_spots?.name || "Parking"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg font-semibold text-green-500">
                          +₹{Number(booking.host_payout || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(booking.created_at), "MMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="earnings" className="space-y-4">
                {completedBookings.slice(0, 10).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <ArrowDownRight className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Booking #{booking.id.slice(0, 8).toUpperCase()}</div>
                        <div className="text-sm text-muted-foreground">{booking.parking_spots?.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg font-semibold text-green-500">
                        +₹{Number(booking.host_payout || 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(booking.created_at), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="withdrawals" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No withdrawals yet</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Earnings;

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, Shield, Eye, Ban, CheckCircle, Clock, 
  TrendingUp, Users, CreditCard, MapPin, Search, Filter,
  AlertCircle, XCircle, Activity
} from "lucide-react";
import { toast } from "sonner";

interface FraudAlert {
  id: string;
  type: string;
  severity: "high" | "medium" | "low";
  user: string;
  description: string;
  timestamp: string;
  status: "pending" | "investigating" | "resolved" | "dismissed";
  amount?: number;
}

const FraudDetection = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const stats = {
    totalAlerts: 47,
    highRisk: 8,
    pendingReview: 12,
    blockedToday: 3,
    amountSaved: 45000
  };

  const alerts: FraudAlert[] = [
    {
      id: "1",
      type: "Multiple Payment Failures",
      severity: "high",
      user: "user_2847",
      description: "5 failed payment attempts with different cards in 10 minutes",
      timestamp: "2 mins ago",
      status: "pending",
      amount: 2500
    },
    {
      id: "2",
      type: "Suspicious Location",
      severity: "high",
      user: "user_9284",
      description: "Booking made from IP in different country than registered address",
      timestamp: "15 mins ago",
      status: "investigating",
      amount: 1500
    },
    {
      id: "3",
      type: "Velocity Check",
      severity: "medium",
      user: "user_5621",
      description: "10 bookings created in last hour across different locations",
      timestamp: "32 mins ago",
      status: "pending",
      amount: 8500
    },
    {
      id: "4",
      type: "Chargeback Pattern",
      severity: "high",
      user: "user_1847",
      description: "User has 3 chargebacks in the last 30 days",
      timestamp: "1 hour ago",
      status: "pending",
      amount: 4200
    },
    {
      id: "5",
      type: "Account Takeover Attempt",
      severity: "medium",
      user: "user_7392",
      description: "Password changed and new payment method added within 5 minutes",
      timestamp: "2 hours ago",
      status: "resolved"
    },
    {
      id: "6",
      type: "Promo Abuse",
      severity: "low",
      user: "user_4829",
      description: "Same device ID used with 5 different accounts for first-time promo",
      timestamp: "3 hours ago",
      status: "dismissed"
    }
  ];

  const handleAction = (alertId: string, action: string) => {
    toast.success(`Alert ${action} successfully`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "low": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/10 text-yellow-500";
      case "investigating": return "bg-blue-500/10 text-blue-500";
      case "resolved": return "bg-green-500/10 text-green-500";
      case "dismissed": return "bg-gray-500/10 text-gray-500";
      default: return "";
    }
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Fraud Detection</h1>
            <p className="text-muted-foreground">Monitor and manage suspicious activities</p>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Configure Rules
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalAlerts}</p>
                  <p className="text-xs text-muted-foreground">Total Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.highRisk}</p>
                  <p className="text-xs text-muted-foreground">High Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingReview}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Ban className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.blockedToday}</p>
                  <p className="text-xs text-muted-foreground">Blocked Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{(stats.amountSaved / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by user ID or description..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="pending">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="high">High Risk</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold">{alert.type}</h4>
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {alert.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </span>
                          {alert.amount && (
                            <span className="flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              ₹{alert.amount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {alert.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleAction(alert.id, "investigated")}>
                          <Eye className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleAction(alert.id, "blocked")}>
                          <Ban className="h-4 w-4 mr-1" />
                          Block User
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleAction(alert.id, "dismissed")}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="high" className="space-y-4">
            {alerts.filter(a => a.severity === "high").map((alert) => (
              <Card key={alert.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <h4 className="font-semibold">{alert.type}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {alerts.filter(a => a.status === "pending").map((alert) => (
              <Card key={alert.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div>
                      <h4 className="font-semibold">{alert.type}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Fraud Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Active Detection Rules
            </CardTitle>
            <CardDescription>Automated rules monitoring for suspicious activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {[
                { name: "Multiple Failed Payments", triggers: "3+ failures in 10 mins", status: "active" },
                { name: "Geographic Anomaly", triggers: "Location mismatch > 500km", status: "active" },
                { name: "Velocity Check", triggers: "5+ bookings in 1 hour", status: "active" },
                { name: "Device Fingerprint", triggers: "Multiple accounts same device", status: "active" },
                { name: "Chargeback History", triggers: "2+ chargebacks in 30 days", status: "active" },
              ].map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-muted-foreground">{rule.triggers}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FraudDetection;

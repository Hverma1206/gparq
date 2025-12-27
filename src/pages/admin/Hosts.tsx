import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Search, Filter, MoreVertical, Eye, 
  CheckCircle, XCircle, Star, Car
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const AdminHosts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const hosts = [
    { id: 1, name: "Forum Mall", owner: "Prestige Group", location: "Koramangala", spots: 50, earnings: "₹1.2L", rating: 4.8, status: "Active" },
    { id: 2, name: "Brigade Gateway", owner: "Brigade Group", location: "Rajajinagar", spots: 30, earnings: "₹85K", rating: 4.6, status: "Active" },
    { id: 3, name: "UB City", owner: "UB Holdings", location: "Vittal Mallya Road", spots: 100, earnings: "₹2.1L", rating: 4.9, status: "Pending" },
    { id: 4, name: "Orion Mall", owner: "Brigade Group", location: "Malleshwaram", spots: 75, earnings: "₹1.5L", rating: 4.5, status: "Active" },
    { id: 5, name: "Phoenix Mall", owner: "Phoenix Mills", location: "Whitefield", spots: 120, earnings: "₹2.8L", rating: 4.7, status: "Suspended" },
  ];

  const handleView = (name: string) => toast.info(`Viewing ${name}`);
  const handleApprove = (name: string) => toast.success(`${name} approved`);
  const handleSuspend = (name: string) => toast.error(`${name} suspended`);
  const handleExport = () => toast.success("Export started");

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Host Management
            </h1>
            <p className="text-muted-foreground">
              View and manage all parking space hosts
            </p>
          </div>
          <Button className="gap-2" onClick={handleExport}>
            <MapPin className="h-5 w-5" />
            Export Hosts
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search hosts by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2" onClick={() => toast.info("Filters coming soon")}>
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Hosts Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground">Parking Space</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Owner</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Spots</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Earnings</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Rating</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hosts.map((host) => (
                    <tr key={host.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{host.name}</div>
                            <div className="text-sm text-muted-foreground">{host.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-muted-foreground">{host.owner}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{host.spots}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-green-500">{host.earnings}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{host.rating}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={
                          host.status === "Active" ? "bg-green-500/10 text-green-500" :
                          host.status === "Suspended" ? "bg-destructive/10 text-destructive" :
                          "bg-yellow-500/10 text-yellow-500"
                        }>
                          {host.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(host.name)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleApprove(host.name)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleSuspend(host.name)}>
                              <XCircle className="h-4 w-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminHosts;

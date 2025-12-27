import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Search, Filter, MoreVertical, Eye, 
  Ban, CheckCircle, Mail, Phone, Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/layout/Header";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    { id: 1, name: "Rahul Sharma", email: "rahul@email.com", phone: "+91 98765 43210", bookings: 24, status: "Active", joined: "Dec 15, 2025" },
    { id: 2, name: "Priya Mehta", email: "priya@email.com", phone: "+91 98765 43211", bookings: 18, status: "Active", joined: "Dec 10, 2025" },
    { id: 3, name: "Amit Kumar", email: "amit@email.com", phone: "+91 98765 43212", bookings: 12, status: "Suspended", joined: "Nov 28, 2025" },
    { id: 4, name: "Neha Reddy", email: "neha@email.com", phone: "+91 98765 43213", bookings: 32, status: "Active", joined: "Nov 15, 2025" },
    { id: 5, name: "Vikram Patel", email: "vikram@email.com", phone: "+91 98765 43214", bookings: 8, status: "Pending", joined: "Dec 20, 2025" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                User Management
              </h1>
              <p className="text-muted-foreground">
                View and manage all platform users
              </p>
            </div>
            <Button className="gap-2">
              <Users className="h-5 w-5" />
              Export Users
            </Button>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 mb-6"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </motion.div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Contact</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Bookings</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                        <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="font-display font-bold text-primary">{user.name[0]}</span>
                              </div>
                              <div>
                                <div className="font-medium text-foreground">{user.name}</div>
                                <div className="text-sm text-muted-foreground">ID: U{user.id.toString().padStart(5, '0')}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-medium">{user.bookings}</span>
                          </td>
                          <td className="p-4">
                            <Badge className={
                              user.status === "Active" ? "bg-green-500/10 text-green-500" :
                              user.status === "Suspended" ? "bg-destructive/10 text-destructive" :
                              "bg-yellow-500/10 text-yellow-500"
                            }>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {user.joined}
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Verify User
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspend User
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
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;

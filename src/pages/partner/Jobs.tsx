import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, Clock, CheckCircle, XCircle, Phone, 
  MapPin, Car, User, Calendar 
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const PartnerJobs = () => {
  const { toast } = useToast();

  const jobs = [
    { 
      id: 1, service: "Premium Car Wash", vehicle: "Honda City", number: "KA 01 AB 1234",
      customer: "Rahul Sharma", phone: "+91 98765 43210", location: "Phoenix Mall Parking",
      time: "2:30 PM", date: "Dec 27, 2025", amount: 499, status: "pending"
    },
    { 
      id: 2, service: "EV Fast Charging", vehicle: "Tata Nexon EV", number: "KA 05 CD 5678",
      customer: "Priya Mehta", phone: "+91 87654 32109", location: "Brigade Gateway",
      time: "3:00 PM", date: "Dec 27, 2025", amount: 350, status: "in-progress"
    },
    { 
      id: 3, service: "Interior Cleaning", vehicle: "Maruti Swift", number: "KA 03 EF 9012",
      customer: "Amit Kumar", phone: "+91 76543 21098", location: "Orion Mall",
      time: "4:00 PM", date: "Dec 27, 2025", amount: 799, status: "pending"
    },
    { 
      id: 4, service: "Basic Wash", vehicle: "Hyundai i20", number: "KA 02 GH 3456",
      customer: "Sneha Reddy", phone: "+91 65432 10987", location: "Indiranagar Metro",
      time: "11:00 AM", date: "Dec 27, 2025", amount: 249, status: "completed"
    },
    { 
      id: 5, service: "Premium Car Wash", vehicle: "Toyota Innova", number: "KA 04 IJ 7890",
      customer: "Vikram Singh", phone: "+91 54321 09876", location: "Forum Mall",
      time: "10:00 AM", date: "Dec 27, 2025", amount: 499, status: "completed"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="border-green-500 text-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="border-destructive text-destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const handleAccept = (id: number) => {
    toast({ title: "Job Accepted", description: "You've accepted this service request." });
  };

  const handleComplete = (id: number) => {
    toast({ title: "Job Completed", description: "Great work! The service has been marked as complete." });
  };

  const filterJobs = (status: string) => {
    if (status === "all") return jobs;
    return jobs.filter(j => j.status === status);
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Service Jobs
          </h1>
          <p className="text-muted-foreground">
            Manage your pending and completed service requests
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({jobs.filter(j => j.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({jobs.filter(j => j.status === "in-progress").length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({jobs.filter(j => j.status === "completed").length})</TabsTrigger>
          </TabsList>

          {["all", "pending", "in-progress", "completed"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filterJobs(tab).map((job) => (
                <Card key={job.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Wrench className="h-7 w-7 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-display text-lg font-semibold text-foreground">{job.service}</span>
                            {getStatusBadge(job.status)}
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Car className="w-4 h-4" />
                              {job.vehicle} • {job.number}
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {job.customer}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {job.date} at {job.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-display text-xl font-bold text-foreground">₹{job.amount}</div>
                        </div>
                        <div className="flex gap-2">
                          {job.status === "pending" && (
                            <Button onClick={() => handleAccept(job.id)}>Accept</Button>
                          )}
                          {job.status === "in-progress" && (
                            <Button onClick={() => handleComplete(job.id)}>Complete</Button>
                          )}
                          <Button variant="outline" size="icon">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerJobs;

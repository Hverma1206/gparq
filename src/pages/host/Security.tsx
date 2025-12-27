import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Camera, Shield, Users, Plus, Settings, Eye,
  Video, Clock, AlertTriangle, CheckCircle, Trash2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const HostSecurity = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const cameras = [
    {
      id: 1,
      name: "Entry Gate Camera",
      location: "Main Entrance",
      status: "online",
      lastActive: "Now",
      recording: true,
    },
    {
      id: 2,
      name: "Exit Gate Camera",
      location: "Exit Point",
      status: "online",
      lastActive: "Now",
      recording: true,
    },
    {
      id: 3,
      name: "Parking Area A",
      location: "Ground Floor",
      status: "offline",
      lastActive: "2 hours ago",
      recording: false,
    },
  ];

  const guards = [
    {
      id: 1,
      name: "Raju Kumar",
      shift: "Day (6 AM - 6 PM)",
      phone: "+91 98765 43210",
      status: "on_duty",
      assignedArea: "Forum Mall Parking",
    },
    {
      id: 2,
      name: "Suresh M.",
      shift: "Night (6 PM - 6 AM)",
      phone: "+91 98765 43211",
      status: "off_duty",
      assignedArea: "Forum Mall Parking",
    },
  ];

  const incidents = [
    {
      id: 1,
      type: "Minor Scratch",
      vehicle: "KA 01 AB 1234",
      date: "Dec 24, 2025",
      status: "resolved",
      description: "Minor scratch reported on vehicle bumper",
    },
    {
      id: 2,
      type: "Unauthorized Entry",
      vehicle: "Unknown",
      date: "Dec 20, 2025",
      status: "investigating",
      description: "Attempted unauthorized entry at gate 2",
    },
  ];

  const handleAddCamera = () => {
    console.log("Adding new camera");
    toast.success("Camera added successfully");
    setDialogOpen(false);
  };

  const handleViewFeed = (cameraId: number) => {
    console.log(`Viewing camera feed: ${cameraId}`);
    toast.info("Opening camera feed...");
  };

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Security Management
          </h1>
          <p className="text-muted-foreground">
            Manage cameras, guards, and security incidents
          </p>
        </div>

        <Tabs defaultValue="cameras">
          <TabsList>
            <TabsTrigger value="cameras" className="gap-2">
              <Camera className="h-4 w-4" />
              CCTV
            </TabsTrigger>
            <TabsTrigger value="guards" className="gap-2">
              <Users className="h-4 w-4" />
              Guards
            </TabsTrigger>
            <TabsTrigger value="incidents" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Incidents
            </TabsTrigger>
          </TabsList>

          {/* CCTV Tab */}
          <TabsContent value="cameras" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-lg font-semibold">Camera Management</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Camera
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add CCTV Camera</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Camera Name</Label>
                      <Input placeholder="e.g., Entry Gate Camera" />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input placeholder="e.g., Main Entrance" />
                    </div>
                    <div>
                      <Label>RTSP URL</Label>
                      <Input placeholder="rtsp://..." />
                    </div>
                    <Button onClick={handleAddCamera} className="w-full">
                      Add Camera
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cameras.map((camera, index) => (
                <motion.div
                  key={camera.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-secondary rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                        <Video className="h-12 w-12 text-muted-foreground" />
                        {camera.status === "online" && (
                          <div className="absolute top-2 right-2 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-green-500">LIVE</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{camera.name}</h3>
                          <p className="text-sm text-muted-foreground">{camera.location}</p>
                        </div>
                        <Badge variant={camera.status === "online" ? "default" : "destructive"}>
                          {camera.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          Last active: {camera.lastActive}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewFeed(camera.id)}
                          disabled={camera.status !== "online"}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Guards Tab */}
          <TabsContent value="guards" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-lg font-semibold">Guard Management</h2>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Guard
              </Button>
            </div>

            <div className="space-y-4">
              {guards.map((guard, index) => (
                <motion.div
                  key={guard.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{guard.name}</h3>
                              <Badge variant={guard.status === "on_duty" ? "default" : "secondary"}>
                                {guard.status === "on_duty" ? "On Duty" : "Off Duty"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {guard.shift} • {guard.assignedArea}
                            </p>
                            <p className="text-xs text-muted-foreground">{guard.phone}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Contact</Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-lg font-semibold">Incident Reports</h2>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Report Incident
              </Button>
            </div>

            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            incident.status === "resolved" ? "bg-green-500/10" : "bg-yellow-500/10"
                          }`}>
                            {incident.status === "resolved" ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{incident.type}</h3>
                              <Badge variant={incident.status === "resolved" ? "secondary" : "default"}>
                                {incident.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{incident.description}</p>
                            <p className="text-xs text-muted-foreground">
                              Vehicle: {incident.vehicle} • {incident.date}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HostSecurity;

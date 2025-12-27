import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, Phone, MapPin, Shield, Plus, 
  Trash2, Edit, Send, Camera, FileText, Clock,
  CheckCircle, AlertCircle, PhoneCall
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface Incident {
  id: string;
  type: string;
  location: string;
  date: string;
  status: "open" | "investigating" | "resolved";
  description: string;
}

const SafetyPage = () => {
  const [showSOSDialog, setShowSOSDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: "1", name: "Priya Sharma", phone: "+91 98765 43210", relationship: "Spouse" },
    { id: "2", name: "Amit Kumar", phone: "+91 98765 43211", relationship: "Brother" },
  ]);

  const [incidents, setIncidents] = useState<Incident[]>([
    { 
      id: "1", 
      type: "Vehicle Damage", 
      location: "Forum Mall Parking", 
      date: "Dec 20, 2025",
      status: "investigating",
      description: "Minor scratch found on rear bumper"
    },
  ]);

  const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" });
  const [newIncident, setNewIncident] = useState({ type: "", description: "", location: "" });

  const handleSOS = () => {
    toast.error("🚨 SOS Alert Sent!", {
      description: "Emergency contacts and nearby security have been notified. Help is on the way.",
      duration: 10000,
    });
    setShowSOSDialog(false);
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact
    };
    setEmergencyContacts(prev => [...prev, contact]);
    setNewContact({ name: "", phone: "", relationship: "" });
    toast.success("Emergency contact added");
  };

  const handleRemoveContact = (id: string) => {
    setEmergencyContacts(prev => prev.filter(c => c.id !== id));
    toast.success("Contact removed");
  };

  const handleReportIncident = () => {
    if (!newIncident.type || !newIncident.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    const incident: Incident = {
      id: Date.now().toString(),
      type: newIncident.type,
      description: newIncident.description,
      location: newIncident.location || "Current Location",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "open"
    };
    setIncidents(prev => [incident, ...prev]);
    setNewIncident({ type: "", description: "", location: "" });
    setShowReportDialog(false);
    toast.success("Incident reported. Our team will contact you shortly.");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Open</Badge>;
      case "investigating":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Investigating</Badge>;
      case "resolved":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Resolved</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Safety & Emergency
          </h1>
          <p className="text-muted-foreground">
            Quick access to emergency features and incident reporting
          </p>
        </div>

        {/* SOS Button */}
        <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">Emergency SOS</h2>
                  <p className="text-muted-foreground">
                    Instantly alert your emergency contacts and nearby security
                  </p>
                </div>
              </div>
              <Dialog open={showSOSDialog} onOpenChange={setShowSOSDialog}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="destructive" className="gap-2 text-lg px-8">
                    <Phone className="w-5 h-5" /> SOS
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-red-500/50">
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl text-red-500 flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6" /> Confirm Emergency Alert
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground">
                      This will immediately:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Notify your {emergencyContacts.length} emergency contacts
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Share your live location
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Alert parking security (if available)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Create an incident record
                      </li>
                    </ul>
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" className="flex-1" onClick={() => setShowSOSDialog(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" className="flex-1 gap-2" onClick={handleSOS}>
                        <Phone className="w-4 h-4" /> Send SOS Alert
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast.info("Calling parking security...")}>
            <CardContent className="p-6 text-center">
              <PhoneCall className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-medium text-foreground">Call Security</h3>
              <p className="text-sm text-muted-foreground">Contact parking security</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast.info("Sharing live location...")}>
            <CardContent className="p-6 text-center">
              <MapPin className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-medium text-foreground">Share Location</h3>
              <p className="text-sm text-muted-foreground">Share with contacts</p>
            </CardContent>
          </Card>
          <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
            <DialogTrigger asChild>
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <FileText className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-medium text-foreground">Report Incident</h3>
                  <p className="text-sm text-muted-foreground">Log damage or theft</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-display">Report Incident</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Incident Type *</Label>
                  <Select value={newIncident.type} onValueChange={(value) => setNewIncident(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="damage">Vehicle Damage</SelectItem>
                      <SelectItem value="theft">Theft/Break-in</SelectItem>
                      <SelectItem value="harassment">Harassment</SelectItem>
                      <SelectItem value="safety">Safety Hazard</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input 
                    placeholder="Parking location (auto-filled if active)" 
                    value={newIncident.location}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea 
                    placeholder="Describe what happened..."
                    value={newIncident.description}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Camera className="w-4 h-4" /> Add Photos
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowReportDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleReportIncident}>
                    Submit Report
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Emergency Contacts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>People to notify in case of emergency</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">{contact.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{contact.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{contact.phone}</span>
                      <span>•</span>
                      <span>{contact.relationship}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveContact(contact.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </motion.div>
            ))}

            {/* Add Contact Form */}
            <div className="p-4 rounded-xl border border-dashed border-border">
              <p className="text-sm font-medium text-foreground mb-3">Add New Contact</p>
              <div className="grid md:grid-cols-3 gap-3">
                <Input 
                  placeholder="Name" 
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input 
                  placeholder="Phone Number" 
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Input 
                    placeholder="Relationship" 
                    value={newContact.relationship}
                    onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                  />
                  <Button onClick={handleAddContact}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incident History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Incident History
            </CardTitle>
            <CardDescription>Your reported incidents and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {incidents.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-muted-foreground">No incidents reported. Stay safe!</p>
              </div>
            ) : (
              incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-secondary/30 border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{incident.type}</h3>
                      {getStatusBadge(incident.status)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {incident.date}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {incident.location}
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SafetyPage;

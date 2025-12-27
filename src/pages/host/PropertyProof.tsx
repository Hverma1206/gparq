import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Upload, FileText, MapPin, Building, Home, Image,
  CheckCircle, ArrowRight, ArrowLeft
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const PropertyProof = () => {
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState("");
  const [ownershipType, setOwnershipType] = useState("");

  const documents = [
    { id: "deed", title: "Property Deed / Sale Agreement", uploaded: true },
    { id: "tax", title: "Property Tax Receipt", uploaded: true },
    { id: "noc", title: "NOC from Society (if applicable)", uploaded: false },
    { id: "photos", title: "Property Photos (min 5)", uploaded: false },
  ];

  const handleUpload = (docId: string) => {
    console.log(`Uploading: ${docId}`);
    toast.success("Document uploaded!");
  };

  const handleSubmit = () => {
    console.log("Submitting property verification");
    toast.success("Property documents submitted for review!");
    navigate("/host/pending");
  };

  return (
    <DashboardLayout type="host">
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Property Verification
            </h1>
            <p className="text-muted-foreground">
              Verify your property ownership to list parking spaces
            </p>
          </div>
        </div>

        {/* Property Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="mall">Mall / Shopping Complex</SelectItem>
                    <SelectItem value="office">Office Building</SelectItem>
                    <SelectItem value="hospital">Hospital / Clinic</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ownership Type</Label>
                <Select value={ownershipType} onValueChange={setOwnershipType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ownership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owned">Self Owned</SelectItem>
                    <SelectItem value="leased">Leased</SelectItem>
                    <SelectItem value="managed">Property Manager</SelectItem>
                    <SelectItem value="society">Society/RWA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Property Address</Label>
              <Textarea 
                placeholder="Enter complete property address"
                className="min-h-[80px]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input placeholder="e.g., Bangalore" />
              </div>
              <div>
                <Label>Pincode</Label>
                <Input placeholder="e.g., 560095" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  {doc.uploaded ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <span className={doc.uploaded ? "text-foreground" : "text-muted-foreground"}>
                    {doc.title}
                  </span>
                </div>
                {doc.uploaded ? (
                  <Badge variant="secondary">Uploaded</Badge>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => handleUpload(doc.id)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Parking Space Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Parking Space Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Total Parking Spots</Label>
                <Input type="number" placeholder="e.g., 20" />
              </div>
              <div>
                <Label>Covered Spots</Label>
                <Input type="number" placeholder="e.g., 10" />
              </div>
              <div>
                <Label>Open Spots</Label>
                <Input type="number" placeholder="e.g., 10" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Length (in feet)</Label>
                <Input type="number" placeholder="e.g., 18" />
              </div>
              <div>
                <Label>Width (in feet)</Label>
                <Input type="number" placeholder="e.g., 9" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
            Save as Draft
          </Button>
          <Button className="flex-1 gap-2" onClick={handleSubmit}>
            Submit for Verification
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PropertyProof;

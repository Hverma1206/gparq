import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, CheckCircle, Clock, AlertCircle, FileText,
  Camera, User, CreditCard, Building, ArrowRight
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const HostKYC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(60);

  const documents = [
    {
      id: "aadhaar",
      title: "Aadhaar Card",
      description: "Government issued ID proof",
      icon: User,
      status: "verified",
      uploadedAt: "Dec 20, 2025",
    },
    {
      id: "pan",
      title: "PAN Card",
      description: "For tax purposes",
      icon: CreditCard,
      status: "verified",
      uploadedAt: "Dec 20, 2025",
    },
    {
      id: "bank",
      title: "Bank Statement",
      description: "Last 3 months statement",
      icon: Building,
      status: "pending",
      uploadedAt: "Dec 24, 2025",
    },
    {
      id: "photo",
      title: "Profile Photo",
      description: "Clear face photo",
      icon: Camera,
      status: "not_uploaded",
      uploadedAt: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Verified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      default:
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" /> Required</Badge>;
    }
  };

  const handleUpload = (docId: string) => {
    console.log(`Uploading document: ${docId}`);
    toast.success("Document uploaded successfully!");
  };

  return (
    <DashboardLayout type="host">
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            KYC Verification
          </h1>
          <p className="text-muted-foreground">
            Complete your identity verification to start hosting
          </p>
        </div>

        {/* Progress Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-foreground">Verification Progress</h3>
                <p className="text-sm text-muted-foreground">Complete all documents to get verified</p>
              </div>
              <span className="font-display text-2xl font-bold text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className={`bg-card border-border hover:border-primary/50 transition-colors ${
                doc.status === "verified" ? "border-green-500/30" : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        doc.status === "verified" ? "bg-green-500/10" : 
                        doc.status === "pending" ? "bg-yellow-500/10" : "bg-secondary"
                      }`}>
                        <doc.icon className={`h-6 w-6 ${
                          doc.status === "verified" ? "text-green-500" : 
                          doc.status === "pending" ? "text-yellow-500" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{doc.title}</h3>
                          {getStatusBadge(doc.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                        {doc.uploadedAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Uploaded on {doc.uploadedAt}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {doc.status === "not_uploaded" ? (
                      <Button onClick={() => handleUpload(doc.id)} className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload
                      </Button>
                    ) : doc.status === "pending" ? (
                      <Button variant="outline" disabled>
                        <Clock className="h-4 w-4 mr-2" />
                        Under Review
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" className="text-green-500">
                        <CheckCircle className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Complete all document uploads</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Wait for verification (24-48 hours)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>Upload property documents</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6 gap-2"
              onClick={() => navigate("/host/property-proof")}
            >
              Continue to Property Verification
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HostKYC;

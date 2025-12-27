import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, FileText, CheckCircle, AlertCircle, 
  Car, Shield, Calendar, Eye, Trash2, Plus
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

interface Document {
  id: string;
  type: string;
  name: string;
  status: "verified" | "pending" | "rejected";
  uploadedAt: string;
  expiryDate?: string;
}

const VehicleDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", type: "RC", name: "Registration Certificate", status: "verified", uploadedAt: "Dec 15, 2025", expiryDate: "Dec 2030" },
    { id: "2", type: "Insurance", name: "Vehicle Insurance", status: "pending", uploadedAt: "Dec 20, 2025", expiryDate: "Dec 2026" },
    { id: "3", type: "PUC", name: "Pollution Certificate", status: "rejected", uploadedAt: "Dec 18, 2025", expiryDate: "Jun 2026" },
  ]);

  const documentTypes = [
    { type: "RC", label: "Registration Certificate", icon: FileText, required: true },
    { type: "Insurance", label: "Vehicle Insurance", icon: Shield, required: true },
    { type: "PUC", label: "Pollution Certificate", icon: CheckCircle, required: false },
    { type: "DL", label: "Driving License", icon: Car, required: false },
  ];

  const handleUpload = (type: string) => {
    toast.success(`${type} upload started. File will be verified within 24 hours.`);
  };

  const handleView = (doc: Document) => {
    toast.info(`Viewing ${doc.name}`);
  };

  const handleDelete = (docId: string) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    toast.success("Document deleted");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Vehicle Documents
          </h1>
          <p className="text-muted-foreground">
            Upload and manage your vehicle documents for faster verification
          </p>
        </div>

        {/* Document Status Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {documentTypes.map((docType) => {
            const doc = documents.find(d => d.type === docType.type);
            return (
              <Card key={docType.type} className={`bg-card border-border ${!doc && docType.required ? 'border-yellow-500/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc?.status === 'verified' ? 'bg-green-500/10' : 'bg-muted'}`}>
                      <docType.icon className={`w-5 h-5 ${doc?.status === 'verified' ? 'text-green-500' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{docType.label}</p>
                      {docType.required && !doc && (
                        <p className="text-xs text-yellow-500">Required</p>
                      )}
                    </div>
                  </div>
                  {doc ? (
                    getStatusBadge(doc.status)
                  ) : (
                    <Button size="sm" variant="outline" className="w-full gap-2" onClick={() => handleUpload(docType.type)}>
                      <Upload className="w-4 h-4" /> Upload
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Uploaded Documents */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Uploaded Documents</CardTitle>
            <CardDescription>All your uploaded vehicle documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No documents uploaded yet</p>
              </div>
            ) : (
              documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    doc.status === 'rejected' ? 'border-red-500/50 bg-red-500/5' : 'border-border bg-secondary/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      doc.status === 'verified' ? 'bg-green-500/10' : 
                      doc.status === 'pending' ? 'bg-yellow-500/10' : 'bg-red-500/10'
                    }`}>
                      <FileText className={`w-6 h-6 ${
                        doc.status === 'verified' ? 'text-green-500' : 
                        doc.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{doc.name}</p>
                        {getStatusBadge(doc.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Uploaded: {doc.uploadedAt}</span>
                        {doc.expiryDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Expires: {doc.expiryDate}
                          </span>
                        )}
                      </div>
                      {doc.status === 'rejected' && (
                        <p className="text-sm text-red-500 mt-1">
                          Document unclear. Please re-upload a clearer copy.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(doc)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(doc.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    {doc.status === 'rejected' && (
                      <Button size="sm" onClick={() => handleUpload(doc.type)}>
                        Re-upload
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Upload New Document */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-xl">Upload New Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="font-medium text-foreground mb-2">
                Drag and drop your document here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Supports: PDF, JPG, PNG (Max 5MB)
              </p>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Select File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VehicleDocuments;

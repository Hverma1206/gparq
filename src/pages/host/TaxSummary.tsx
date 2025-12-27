import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText, Download, IndianRupee, Calendar, Building2,
  TrendingUp, Receipt, AlertCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const TaxSummary = () => {
  const [selectedYear, setSelectedYear] = useState("2025");

  const taxData = {
    totalEarnings: 545280,
    gstCollected: 98150,
    tdsDeducted: 54528,
    netPaid: 492602,
  };

  const quarterlyData = [
    { quarter: "Q1 (Apr-Jun)", earnings: 125000, gst: 22500, tds: 12500 },
    { quarter: "Q2 (Jul-Sep)", earnings: 142000, gst: 25560, tds: 14200 },
    { quarter: "Q3 (Oct-Dec)", earnings: 168000, gst: 30240, tds: 16800 },
    { quarter: "Q4 (Jan-Mar)", earnings: 110280, gst: 19850, tds: 11028 },
  ];

  const documents = [
    { id: 1, name: "Form 16A - FY 2024-25", type: "TDS Certificate", date: "Apr 2025" },
    { id: 2, name: "Annual GST Summary", type: "GST Report", date: "Apr 2025" },
    { id: 3, name: "Quarterly Statement Q3", type: "TDS Statement", date: "Jan 2025" },
    { id: 4, name: "Quarterly Statement Q2", type: "TDS Statement", date: "Oct 2024" },
  ];

  const handleDownload = (docId: number, docName: string) => {
    console.log(`Downloading: ${docId}`);
    toast.success(`${docName} downloaded`);
  };

  return (
    <DashboardLayout type="host">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Tax Summary
            </h1>
            <p className="text-muted-foreground">
              View your tax reports and download certificates
            </p>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">FY 2024-25</SelectItem>
              <SelectItem value="2024">FY 2023-24</SelectItem>
              <SelectItem value="2023">FY 2022-23</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tax Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Total Earnings</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">
                ₹{taxData.totalEarnings.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">GST Collected</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">
                ₹{taxData.gstCollected.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-5 w-5 text-red-500" />
                <span className="text-sm text-muted-foreground">TDS Deducted</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">
                ₹{taxData.tdsDeducted.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Net Paid</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">
                ₹{taxData.netPaid.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quarterly Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Quarterly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quarter</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Earnings</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">GST (18%)</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">TDS (10%)</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Net</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyData.map((row, index) => (
                    <motion.tr
                      key={row.quarter}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border-b border-border/50"
                    >
                      <td className="py-3 px-4 font-medium">{row.quarter}</td>
                      <td className="py-3 px-4 text-right">₹{row.earnings.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-blue-500">₹{row.gst.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-red-500">₹{row.tds.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-medium text-green-500">
                        ₹{(row.earnings - row.tds).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tax Documents */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg">Tax Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownload(doc.id, doc.name)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Tax Notice */}
        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground mb-1">Important Tax Information</p>
                <p className="text-sm text-muted-foreground">
                  TDS is deducted at 10% on all payouts above ₹30,000 per month as per Income Tax Act. 
                  Please consult a tax professional for personalized advice. Form 16A will be available 
                  after the end of each quarter.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TaxSummary;

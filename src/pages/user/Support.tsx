import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, Phone, Mail, HelpCircle, ChevronRight,
  FileText, AlertCircle, Clock, CheckCircle, Send
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const UserSupport = () => {
  const [message, setMessage] = useState("");

  const tickets = [
    {
      id: "TKT-1234",
      subject: "Refund for cancelled booking",
      status: "open",
      date: "Dec 24, 2025",
      lastUpdate: "2 hours ago",
    },
    {
      id: "TKT-1189",
      subject: "Issue with payment",
      status: "resolved",
      date: "Dec 20, 2025",
      lastUpdate: "3 days ago",
    },
  ];

  const faqs = [
    { q: "How do I cancel a booking?", a: "Go to My Bookings, select the booking, and tap Cancel." },
    { q: "When will I receive my refund?", a: "Refunds are processed within 5-7 business days." },
    { q: "How do I add a vehicle?", a: "Go to Profile > My Vehicles > Add Vehicle." },
    { q: "Can I extend my parking duration?", a: "Yes, from the Active Parking screen, tap Extend." },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    console.log("Sending message:", message);
    toast.success("Message sent! We'll respond shortly.");
    setMessage("");
  };

  const handleCall = () => {
    console.log("Initiating call");
    toast.info("Calling support...");
  };

  return (
    <DashboardLayout type="user">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Help & Support
          </h1>
          <p className="text-muted-foreground">
            Get help with your Parq experience
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: MessageCircle, label: "Live Chat", color: "text-primary", action: () => toast.info("Opening chat...") },
            { icon: Phone, label: "Call Us", color: "text-green-500", action: handleCall },
            { icon: Mail, label: "Email", color: "text-blue-500", action: () => toast.info("Opening email...") },
            { icon: HelpCircle, label: "FAQs", color: "text-yellow-500", action: () => document.getElementById("faqs")?.scrollIntoView() },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card 
                className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
                onClick={item.action}
              >
                <CardContent className="p-4 text-center">
                  <item.icon className={`h-8 w-8 mx-auto mb-2 ${item.color}`} />
                  <p className="font-medium text-sm">{item.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="chat">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Chat with Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Chat Messages Area */}
                <div className="h-64 bg-secondary/30 rounded-lg mb-4 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                        P
                      </div>
                      <div className="bg-card rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Hi! How can we help you today?</p>
                        <p className="text-xs text-muted-foreground mt-1">2:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Input */}
                <div className="flex gap-2">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="min-h-[44px] max-h-32"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="h-11 w-11">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="mt-4">
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          ticket.status === "open" ? "bg-yellow-500/10" : "bg-green-500/10"
                        }`}>
                          {ticket.status === "open" ? (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{ticket.subject}</p>
                            <Badge variant={ticket.status === "open" ? "default" : "secondary"}>
                              {ticket.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {ticket.id} • {ticket.date} • Updated {ticket.lastUpdate}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Create New Ticket
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="mt-4" id="faqs">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground mb-1">{faq.q}</p>
                          <p className="text-sm text-muted-foreground">{faq.a}</p>
                        </div>
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

export default UserSupport;

import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  MapPin, Bell, Settings, LogOut, User, 
  Home, Search, Calendar, Wallet, Car,
  LayoutDashboard, List, IndianRupee, BarChart3, Plus,
  Users, Building2, FileText, Shield, Menu
} from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
  type: "user" | "host" | "admin" | "partner";
}

const userMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/user/dashboard" },
  { icon: Search, label: "Find Parking", href: "/search" },
  { icon: Calendar, label: "My Bookings", href: "/user/bookings" },
  { icon: Car, label: "Active Parking", href: "/user/active-parking" },
  { icon: Wallet, label: "Wallet", href: "/user/wallet" },
  { icon: User, label: "Profile", href: "/user/profile" },
];

const hostMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/host/dashboard" },
  { icon: List, label: "My Listings", href: "/host/listings" },
  { icon: Plus, label: "Add Listing", href: "/host/listings/new" },
  { icon: Calendar, label: "Bookings", href: "/host/bookings" },
  { icon: IndianRupee, label: "Earnings", href: "/host/earnings" },
  { icon: BarChart3, label: "Analytics", href: "/host/analytics" },
];

const adminMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Building2, label: "Hosts", href: "/admin/hosts" },
  { icon: FileText, label: "Reports", href: "/admin/reports" },
  { icon: Shield, label: "Security", href: "/admin/security" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const partnerMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/partner/dashboard" },
  { icon: List, label: "My Services", href: "/partner/services" },
  { icon: Calendar, label: "Jobs", href: "/partner/jobs" },
  { icon: IndianRupee, label: "Earnings", href: "/partner/earnings" },
  { icon: Settings, label: "Settings", href: "/partner/settings" },
];

const DashboardLayout = ({ children, type }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(3);

  const menuItems = type === "user" ? userMenuItems : type === "host" ? hostMenuItems : type === "partner" ? partnerMenuItems : adminMenuItems;
  const dashboardTitle = type === "user" ? "User Dashboard" : type === "host" ? "Host Dashboard" : type === "partner" ? "Partner Dashboard" : "Admin Dashboard";

  const handleNotificationClick = () => {
    console.log("Notifications clicked");
    toast.info("You have 3 new notifications");
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    toast.info("Opening settings...");
    navigate(type === "user" ? "/user/profile" : `/${type}/settings`);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    navigate(type === "user" ? "/user/profile" : `/${type}/profile`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <Sidebar className="border-r border-border">
          <SidebarHeader className="p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center group-hover:glow-teal transition-all duration-300">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Parq
              </span>
            </Link>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{dashboardTitle}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.href}
                        tooltip={item.label}
                      >
                        <Link 
                          to={item.href}
                          onClick={() => console.log(`Navigating to ${item.href}`)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-secondary transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">Rahul S.</p>
                    <p className="text-xs text-muted-foreground">{type === "user" ? "User" : type === "host" ? "Host" : "Admin"}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border z-50">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-4 lg:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="font-display text-lg font-semibold hidden sm:block">{dashboardTitle}</h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={handleNotificationClick}
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

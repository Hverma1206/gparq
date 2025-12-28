import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HowItWorksUsers from "./pages/HowItWorksUsers";
import HowItWorksHosts from "./pages/HowItWorksHosts";
import Features from "./pages/Features";
import PricingUsers from "./pages/PricingUsers";
import PricingHosts from "./pages/PricingHosts";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EVCharging from "./pages/EVCharging";
import Services from "./pages/Services";
import CityLanding from "./pages/CityLanding";
import AirportParking from "./pages/AirportParking";
import EventParking from "./pages/EventParking";
import CorporateFleet from "./pages/CorporateFleet";
import SmartCity from "./pages/SmartCity";
import VisionMission from "./pages/VisionMission";
import Founders from "./pages/Founders";
import Team from "./pages/Team";
import TrustSafety from "./pages/TrustSafety";
import Insurance from "./pages/Insurance";
import Compliance from "./pages/Compliance";
import Press from "./pages/Press";
import CaseStudies from "./pages/CaseStudies";
import Testimonials from "./pages/Testimonials";
import ListYourSpace from "./pages/ListYourSpace";
import BecomePartner from "./pages/BecomePartner";
import CorporateEnquiry from "./pages/CorporateEnquiry";
import GovernmentEnquiry from "./pages/GovernmentEnquiry";
import RequestDemo from "./pages/RequestDemo";
import Blog from "./pages/Blog";
import HelpCenter from "./pages/HelpCenter";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import UserAgreement from "./pages/UserAgreement";
import HostAgreement from "./pages/HostAgreement";
import ServicePartnerAgreement from "./pages/ServicePartnerAgreement";
import RefundPolicy from "./pages/RefundPolicy";
import InsurancePolicy from "./pages/InsurancePolicy";
import CookiePolicy from "./pages/CookiePolicy";
import DataProtection from "./pages/DataProtection";
import Disclaimer from "./pages/Disclaimer";
import Accessibility from "./pages/Accessibility";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ChangePassword from "./pages/auth/ChangePassword";
import TwoFactorSetup from "./pages/auth/TwoFactorSetup";
import AccountStatus from "./pages/auth/AccountStatus";
import ReactivateAccount from "./pages/auth/ReactivateAccount";

// System Pages
import Unauthorized from "./pages/system/Unauthorized";
import ServerError from "./pages/system/ServerError";
import Maintenance from "./pages/system/Maintenance";
import AppUpdateRequired from "./pages/system/AppUpdateRequired";
import LocationPermission from "./pages/system/LocationPermission";
import NetworkError from "./pages/system/NetworkError";
import SessionExpired from "./pages/system/SessionExpired";
import LimitedServiceArea from "./pages/system/LimitedServiceArea";

// User Pages
import UserDashboard from "./pages/user/Dashboard";
import SearchResults from "./pages/user/SearchResults";
import ParkingDetail from "./pages/user/ParkingDetail";
import Bookings from "./pages/user/Bookings";
import Wallet from "./pages/user/Wallet";
import Profile from "./pages/user/Profile";
import BookingSummary from "./pages/user/BookingSummary";
import BookingSuccess from "./pages/user/BookingSuccess";
import BookingFailed from "./pages/user/BookingFailed";
import ActiveParking from "./pages/user/ActiveParking";
import BookingFlow from "./pages/user/BookingFlow";
import UserMapView from "./pages/user/MapView";
import SavedLocations from "./pages/user/SavedLocations";
import RecentLocations from "./pages/user/RecentLocations";
import AddMoney from "./pages/user/AddMoney";
import Transactions from "./pages/user/Transactions";
import UserVehicles from "./pages/user/Vehicles";
import UserNotifications from "./pages/user/Notifications";
import UserSupport from "./pages/user/Support";
import UserReferral from "./pages/user/Referral";
import VehicleDocuments from "./pages/user/VehicleDocuments";
import FamilyAccounts from "./pages/user/FamilyAccounts";
import BlockedUsers from "./pages/user/BlockedUsers";
import GuestVehicle from "./pages/user/GuestVehicle";
import SafetyPage from "./pages/user/Safety";
import FleetManagement from "./pages/user/FleetManagement";
import EVChargingBooking from "./pages/user/EVChargingBooking";
import AddOnServices from "./pages/user/AddOnServices";
import UserReviews from "./pages/user/Reviews";
import ReferralProgram from "./pages/user/ReferralProgram";
import NotificationSettings from "./pages/user/NotificationSettings";

// Host Pages
import HostDashboard from "./pages/host/Dashboard";
import HostListings from "./pages/host/Listings";
import HostEarnings from "./pages/host/Earnings";
import HostBookings from "./pages/host/Bookings";
import HostAnalytics from "./pages/host/Analytics";
import CreateListing from "./pages/host/CreateListing";
import HostSignup from "./pages/host/Signup";
import HostPending from "./pages/host/Pending";
import HostKYC from "./pages/host/KYC";
import PropertyProof from "./pages/host/PropertyProof";
import PayoutSettings from "./pages/host/PayoutSettings";
import HostReviews from "./pages/host/Reviews";
import HostSecurity from "./pages/host/Security";
import HostPayouts from "./pages/host/Payouts";
import TaxSummary from "./pages/host/TaxSummary";
import HostSettings from "./pages/host/Settings";
import DynamicPricing from "./pages/host/DynamicPricing";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminHosts from "./pages/admin/Hosts";
import AdminBookings from "./pages/admin/Bookings";
import AdminDisputes from "./pages/admin/Disputes";
import AdminFinance from "./pages/admin/Finance";
import AdminSupport from "./pages/admin/Support";
import AdminSettings from "./pages/admin/Settings";
import AdminApprovals from "./pages/admin/Approvals";
import AdminReports from "./pages/admin/Reports";
import CityAdmin from "./pages/admin/CityAdmin";
import RolesPermissions from "./pages/admin/RolesPermissions";
import FeatureToggles from "./pages/admin/FeatureToggles";
import FraudDetection from "./pages/admin/FraudDetection";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminPartners from "./pages/admin/Partners";
import AdminVehicles from "./pages/admin/Vehicles";
import AdminReviews from "./pages/admin/Reviews";
import AdminCoupons from "./pages/admin/Coupons";
import AdminNotifications from "./pages/admin/Notifications";
import AdminAuditLogs from "./pages/admin/AuditLogs";
import AdminProfile from "./pages/admin/Profile";

// Partner Pages
import PartnerSignup from "./pages/partner/Signup";
import PartnerLogin from "./pages/partner/Login";
import PartnerDashboard from "./pages/partner/Dashboard";
import PartnerServices from "./pages/partner/Services";
import PartnerEarnings from "./pages/partner/Earnings";
import PartnerJobs from "./pages/partner/Jobs";
import PartnerSettings from "./pages/partner/Settings";
import PartnerProfile from "./pages/partner/Profile";
import PartnerReviews from "./pages/partner/Reviews";
import PartnerAnalytics from "./pages/partner/Analytics";

// Additional Pages
import BlogPost from "./pages/BlogPost";
import HelpArticle from "./pages/HelpArticle";
import UserSettings from "./pages/user/Settings";
import PaymentMethods from "./pages/user/PaymentMethods";
import Invoice from "./pages/user/Invoice";
import EditListing from "./pages/host/EditListing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Core */}
          <Route path="/" element={<Index />} />
          
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/2fa-setup" element={<TwoFactorSetup />} />
          <Route path="/account-status" element={<AccountStatus />} />
          <Route path="/reactivate" element={<ReactivateAccount />} />
          
          {/* How It Works */}
          <Route path="/how-it-works" element={<HowItWorksUsers />} />
          <Route path="/how-it-works/users" element={<HowItWorksUsers />} />
          <Route path="/how-it-works/hosts" element={<HowItWorksHosts />} />
          
          {/* Product */}
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<PricingUsers />} />
          <Route path="/pricing/users" element={<PricingUsers />} />
          <Route path="/pricing/hosts" element={<PricingHosts />} />
          <Route path="/ev-charging" element={<EVCharging />} />
          <Route path="/services" element={<Services />} />
          
          {/* Landing Pages */}
          <Route path="/city/:city" element={<CityLanding />} />
          <Route path="/airport-parking" element={<AirportParking />} />
          <Route path="/event-parking" element={<EventParking />} />
          <Route path="/corporate" element={<CorporateFleet />} />
          <Route path="/smart-city" element={<SmartCity />} />
          
          {/* Company */}
          <Route path="/about" element={<About />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/team" element={<Team />} />
          <Route path="/trust-safety" element={<TrustSafety />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/press" element={<Press />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/testimonials" element={<Testimonials />} />
          
          {/* Conversion */}
          <Route path="/list-your-space" element={<ListYourSpace />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route path="/corporate-enquiry" element={<CorporateEnquiry />} />
          <Route path="/government-enquiry" element={<GovernmentEnquiry />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Content */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faqs" element={<FAQs />} />
          
          {/* Legal */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/user-agreement" element={<UserAgreement />} />
          <Route path="/host-agreement" element={<HostAgreement />} />
          <Route path="/service-partner-agreement" element={<ServicePartnerAgreement />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/insurance-policy" element={<InsurancePolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/data-protection" element={<DataProtection />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/accessibility" element={<Accessibility />} />
          
          {/* User Dashboard - Protected Routes */}
          <Route path="/user/dashboard" element={<ProtectedRoute allowedRoles={["user", "admin"]}><UserDashboard /></ProtectedRoute>} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/user/search" element={<SearchResults />} />
          <Route path="/user/map" element={<UserMapView />} />
          <Route path="/user/saved" element={<ProtectedRoute><SavedLocations /></ProtectedRoute>} />
          <Route path="/user/recent" element={<ProtectedRoute><RecentLocations /></ProtectedRoute>} />
          <Route path="/parking/:id" element={<ParkingDetail />} />
          <Route path="/user/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/user/bookings/upcoming" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/user/bookings/active" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/user/bookings/completed" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/user/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/user/wallet/add" element={<ProtectedRoute><AddMoney /></ProtectedRoute>} />
          <Route path="/user/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/user/vehicles" element={<ProtectedRoute><UserVehicles /></ProtectedRoute>} />
          <Route path="/user/notifications" element={<ProtectedRoute><UserNotifications /></ProtectedRoute>} />
          <Route path="/user/booking-summary" element={<ProtectedRoute><BookingSummary /></ProtectedRoute>} />
          <Route path="/user/booking-success" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
          <Route path="/user/booking-failed" element={<ProtectedRoute><BookingFailed /></ProtectedRoute>} />
          <Route path="/user/active-parking" element={<ProtectedRoute><ActiveParking /></ProtectedRoute>} />
          <Route path="/user/support" element={<ProtectedRoute><UserSupport /></ProtectedRoute>} />
          <Route path="/user/referral" element={<ProtectedRoute><UserReferral /></ProtectedRoute>} />
          <Route path="/user/settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
          <Route path="/user/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
          <Route path="/user/invoice/:id" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
          <Route path="/user/documents" element={<ProtectedRoute><VehicleDocuments /></ProtectedRoute>} />
          <Route path="/user/family" element={<ProtectedRoute><FamilyAccounts /></ProtectedRoute>} />
          <Route path="/user/blocked" element={<ProtectedRoute><BlockedUsers /></ProtectedRoute>} />
          <Route path="/user/guest-vehicle" element={<ProtectedRoute><GuestVehicle /></ProtectedRoute>} />
          <Route path="/user/safety" element={<ProtectedRoute><SafetyPage /></ProtectedRoute>} />
          <Route path="/user/fleet" element={<ProtectedRoute><FleetManagement /></ProtectedRoute>} />
          <Route path="/user/ev-charging" element={<ProtectedRoute><EVChargingBooking /></ProtectedRoute>} />
          <Route path="/user/services" element={<ProtectedRoute><AddOnServices /></ProtectedRoute>} />
          <Route path="/user/reviews" element={<ProtectedRoute><UserReviews /></ProtectedRoute>} />
          <Route path="/user/referrals" element={<ProtectedRoute><ReferralProgram /></ProtectedRoute>} />
          <Route path="/user/notification-settings" element={<ProtectedRoute><NotificationSettings /></ProtectedRoute>} />
          <Route path="/booking/:id" element={<ProtectedRoute><BookingFlow /></ProtectedRoute>} />
          
          {/* Host Dashboard - Protected Routes */}
          <Route path="/host/signup" element={<HostSignup />} />
          <Route path="/host/pending" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostPending /></ProtectedRoute>} />
          <Route path="/host/kyc" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostKYC /></ProtectedRoute>} />
          <Route path="/host/property-proof" element={<ProtectedRoute allowedRoles={["host", "admin"]}><PropertyProof /></ProtectedRoute>} />
          <Route path="/host/dashboard" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostDashboard /></ProtectedRoute>} />
          <Route path="/host/listings" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostListings /></ProtectedRoute>} />
          <Route path="/host/listings/new" element={<ProtectedRoute allowedRoles={["host", "admin"]}><CreateListing /></ProtectedRoute>} />
          <Route path="/host/earnings" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostEarnings /></ProtectedRoute>} />
          <Route path="/host/bookings" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostBookings /></ProtectedRoute>} />
          <Route path="/host/analytics" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostAnalytics /></ProtectedRoute>} />
          <Route path="/host/payout-settings" element={<ProtectedRoute allowedRoles={["host", "admin"]}><PayoutSettings /></ProtectedRoute>} />
          <Route path="/host/payouts" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostPayouts /></ProtectedRoute>} />
          <Route path="/host/reviews" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostReviews /></ProtectedRoute>} />
          <Route path="/host/security" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostSecurity /></ProtectedRoute>} />
          <Route path="/host/tax" element={<ProtectedRoute allowedRoles={["host", "admin"]}><TaxSummary /></ProtectedRoute>} />
          <Route path="/host/settings" element={<ProtectedRoute allowedRoles={["host", "admin"]}><HostSettings /></ProtectedRoute>} />
          <Route path="/host/pricing" element={<ProtectedRoute allowedRoles={["host", "admin"]}><DynamicPricing /></ProtectedRoute>} />
          <Route path="/host/listings/:id/edit" element={<ProtectedRoute allowedRoles={["host", "admin"]}><EditListing /></ProtectedRoute>} />
          
          {/* Admin Dashboard - Protected Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/hosts" element={<ProtectedRoute allowedRoles={["admin"]}><AdminHosts /></ProtectedRoute>} />
          <Route path="/admin/partners" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPartners /></ProtectedRoute>} />
          <Route path="/admin/vehicles" element={<ProtectedRoute allowedRoles={["admin"]}><AdminVehicles /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={["admin"]}><AdminBookings /></ProtectedRoute>} />
          <Route path="/admin/disputes" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDisputes /></ProtectedRoute>} />
          <Route path="/admin/finance" element={<ProtectedRoute allowedRoles={["admin"]}><AdminFinance /></ProtectedRoute>} />
          <Route path="/admin/support" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSupport /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/approvals" element={<ProtectedRoute allowedRoles={["admin"]}><AdminApprovals /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["admin"]}><AdminReports /></ProtectedRoute>} />
          <Route path="/admin/cities" element={<ProtectedRoute allowedRoles={["admin"]}><CityAdmin /></ProtectedRoute>} />
          <Route path="/admin/roles" element={<ProtectedRoute allowedRoles={["admin"]}><RolesPermissions /></ProtectedRoute>} />
          <Route path="/admin/features" element={<ProtectedRoute allowedRoles={["admin"]}><FeatureToggles /></ProtectedRoute>} />
          <Route path="/admin/fraud" element={<ProtectedRoute allowedRoles={["admin"]}><FraudDetection /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={["admin"]}><AdminReviews /></ProtectedRoute>} />
          <Route path="/admin/coupons" element={<ProtectedRoute allowedRoles={["admin"]}><AdminCoupons /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute allowedRoles={["admin"]}><AdminNotifications /></ProtectedRoute>} />
          <Route path="/admin/audit-logs" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAuditLogs /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={["admin"]}><AdminProfile /></ProtectedRoute>} />
          
          {/* Partner Portal - Protected Routes */}
          <Route path="/partner/signup" element={<PartnerSignup />} />
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/partner/dashboard" element={<ProtectedRoute allowedRoles={["partner", "admin"]}><PartnerDashboard /></ProtectedRoute>} />
          <Route path="/partner/services" element={<ProtectedRoute allowedRoles={["partner", "admin"]}><PartnerServices /></ProtectedRoute>} />
          <Route path="/partner/earnings" element={<ProtectedRoute allowedRoles={["partner", "admin"]}><PartnerEarnings /></ProtectedRoute>} />
          <Route path="/partner/jobs" element={<ProtectedRoute allowedRoles={["partner", "admin"]}><PartnerJobs /></ProtectedRoute>} />
          <Route path="/partner/settings" element={<ProtectedRoute allowedRoles={["partner", "admin"]}><PartnerSettings /></ProtectedRoute>} />
          <Route path="/partner/profile" element={<ProtectedRoute allowedRoles={["partner", "admin"]}><PartnerProfile /></ProtectedRoute>} />
          <Route path="/partner/reviews" element={<ProtectedRoute allowedRoles={["partner", "admin"]}><PartnerReviews /></ProtectedRoute>} />
          <Route path="/partner/analytics" element={<ProtectedRoute allowedRoles={["partner", "admin"]}><PartnerAnalytics /></ProtectedRoute>} />
          
          {/* Content Pages */}
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/help/:slug" element={<HelpArticle />} />
          
          {/* System */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/update-required" element={<AppUpdateRequired />} />
          <Route path="/location-permission" element={<LocationPermission />} />
          <Route path="/network-error" element={<NetworkError />} />
          <Route path="/session-expired" element={<SessionExpired />} />
          <Route path="/limited-service" element={<LimitedServiceArea />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

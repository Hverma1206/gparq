import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

// Partner Pages
import PartnerSignup from "./pages/partner/Signup";
import PartnerDashboard from "./pages/partner/Dashboard";
import PartnerServices from "./pages/partner/Services";
import PartnerEarnings from "./pages/partner/Earnings";
import PartnerJobs from "./pages/partner/Jobs";

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
          
          {/* User Dashboard */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/user/search" element={<SearchResults />} />
          <Route path="/user/map" element={<UserMapView />} />
          <Route path="/user/saved" element={<SavedLocations />} />
          <Route path="/user/recent" element={<RecentLocations />} />
          <Route path="/parking/:id" element={<ParkingDetail />} />
          <Route path="/user/bookings" element={<Bookings />} />
          <Route path="/user/bookings/upcoming" element={<Bookings />} />
          <Route path="/user/bookings/active" element={<Bookings />} />
          <Route path="/user/bookings/completed" element={<Bookings />} />
          <Route path="/user/wallet" element={<Wallet />} />
          <Route path="/user/wallet/add" element={<AddMoney />} />
          <Route path="/user/transactions" element={<Transactions />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/vehicles" element={<UserVehicles />} />
          <Route path="/user/notifications" element={<UserNotifications />} />
          <Route path="/user/booking-summary" element={<BookingSummary />} />
          <Route path="/user/booking-success" element={<BookingSuccess />} />
          <Route path="/user/booking-failed" element={<BookingFailed />} />
          <Route path="/user/active-parking" element={<ActiveParking />} />
          <Route path="/user/support" element={<UserSupport />} />
          <Route path="/user/referral" element={<UserReferral />} />
          <Route path="/user/settings" element={<UserSettings />} />
          <Route path="/user/payment-methods" element={<PaymentMethods />} />
          <Route path="/user/invoice/:id" element={<Invoice />} />
          <Route path="/booking/:id" element={<BookingFlow />} />
          
          {/* Host Dashboard */}
          <Route path="/host/signup" element={<HostSignup />} />
          <Route path="/host/pending" element={<HostPending />} />
          <Route path="/host/kyc" element={<HostKYC />} />
          <Route path="/host/property-proof" element={<PropertyProof />} />
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/host/listings" element={<HostListings />} />
          <Route path="/host/listings/new" element={<CreateListing />} />
          <Route path="/host/earnings" element={<HostEarnings />} />
          <Route path="/host/bookings" element={<HostBookings />} />
          <Route path="/host/analytics" element={<HostAnalytics />} />
          <Route path="/host/payout-settings" element={<PayoutSettings />} />
          <Route path="/host/payouts" element={<HostPayouts />} />
          <Route path="/host/reviews" element={<HostReviews />} />
          <Route path="/host/security" element={<HostSecurity />} />
          <Route path="/host/tax" element={<TaxSummary />} />
          <Route path="/host/listings/:id/edit" element={<EditListing />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/hosts" element={<AdminHosts />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/disputes" element={<AdminDisputes />} />
          <Route path="/admin/finance" element={<AdminFinance />} />
          <Route path="/admin/support" element={<AdminSupport />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/approvals" element={<AdminApprovals />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          
          {/* Partner Portal */}
          <Route path="/partner/signup" element={<PartnerSignup />} />
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          <Route path="/partner/services" element={<PartnerServices />} />
          <Route path="/partner/earnings" element={<PartnerEarnings />} />
          <Route path="/partner/jobs" element={<PartnerJobs />} />
          
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

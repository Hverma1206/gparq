import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, AppRole } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate(redirectTo, { replace: true });
        return;
      }

      // Check role-based access if allowedRoles is specified
      if (allowedRoles && allowedRoles.length > 0 && role) {
        if (!allowedRoles.includes(role)) {
          // Redirect to appropriate dashboard based on their actual role
          switch (role) {
            case "admin":
              navigate("/admin/dashboard", { replace: true });
              break;
            case "host":
              navigate("/host/dashboard", { replace: true });
              break;
            case "partner":
              navigate("/partner/dashboard", { replace: true });
              break;
            default:
              navigate("/user/dashboard", { replace: true });
          }
        }
      }
    }
  }, [isAuthenticated, loading, role, allowedRoles, navigate, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // If role check is required and role doesn't match, don't render
  if (allowedRoles && allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

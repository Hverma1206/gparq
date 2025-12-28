import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useAdminStats = () => {
  const { user, role } = useAuth();

  return useQuery({
    queryKey: ["admin-stats", user?.id],
    queryFn: async () => {
      if (role !== "admin") return null;

      // Get user count
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get host count
      const { count: hostCount } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "host");

      // Get today's bookings
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { count: todayBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString())
        .lt("created_at", tomorrow.toISOString());

      // Get monthly revenue
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const { data: monthlyBookings } = await supabase
        .from("bookings")
        .select("total_amount, platform_fee")
        .gte("created_at", startOfMonth.toISOString())
        .eq("status", "completed");

      const monthlyRevenue = monthlyBookings?.reduce((sum, b) => sum + (Number(b.platform_fee) || 0), 0) || 0;

      // Get pending approvals (inactive parking spots)
      const { data: pendingApprovals } = await supabase
        .from("parking_spots")
        .select("id, name, host_id, total_spots, created_at")
        .eq("is_active", false)
        .order("created_at", { ascending: false })
        .limit(10);

      return {
        totalUsers: userCount || 0,
        activeHosts: hostCount || 0,
        todayBookings: todayBookings || 0,
        monthlyRevenue,
        pendingApprovals: pendingApprovals || [],
      };
    },
    enabled: !!user?.id && role === "admin",
  });
};

export const useRecentActivity = () => {
  const { user, role } = useAuth();

  return useQuery({
    queryKey: ["recent-activity", user?.id],
    queryFn: async () => {
      if (role !== "admin") return [];

      // Get recent bookings
      const { data: recentBookings } = await supabase
        .from("bookings")
        .select(`
          id,
          created_at,
          status,
          parking_spots (name)
        `)
        .order("created_at", { ascending: false })
        .limit(5);

      // Get recent signups
      const { data: recentUsers } = await supabase
        .from("profiles")
        .select("id, email, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      const activities: any[] = [];

      recentBookings?.forEach(b => {
        activities.push({
          id: b.id,
          type: "booking",
          message: `New booking at ${b.parking_spots?.name || "Unknown"}`,
          time: b.created_at,
        });
      });

      recentUsers?.forEach(u => {
        activities.push({
          id: u.id,
          type: "user_signup",
          message: `New user registered: ${u.email}`,
          time: u.created_at,
        });
      });

      return activities
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 10);
    },
    enabled: !!user?.id && role === "admin",
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export const useBookings = (filter?: "upcoming" | "active" | "completed" | "cancelled") => {
  const { user, role } = useAuth();
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", user?.id, role, filter],
    queryFn: async () => {
      if (!user?.id) return [];
      
      let query = supabase
        .from("bookings")
        .select(`
          *,
          parking_spots (
            id,
            name,
            address,
            city,
            price_per_hour,
            images
          )
        `)
        .order("created_at", { ascending: false });

      // Role-based filtering
      if (role === "user") {
        query = query.eq("user_id", user.id);
      }
      // For hosts, the RLS policy handles filtering by parking spot ownership

      // Status filtering
      const now = new Date().toISOString();
      if (filter === "upcoming") {
        query = query.eq("status", "confirmed").gt("start_time", now);
      } else if (filter === "active") {
        query = query.eq("status", "confirmed").lte("start_time", now).gte("end_time", now);
      } else if (filter === "completed") {
        query = query.eq("status", "completed");
      } else if (filter === "cancelled") {
        query = query.eq("status", "cancelled");
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const createBooking = useMutation({
    mutationFn: async (booking: {
      parking_spot_id: string;
      start_time: string;
      end_time: string;
      vehicle_number: string;
      vehicle_type?: string;
      total_amount: number;
    }) => {
      if (!user?.id) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          ...booking,
          user_id: user.id,
          status: "pending",
          payment_status: "pending",
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create booking");
    },
  });

  const updateBooking = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<any> }) => {
      const { data, error } = await supabase
        .from("bookings")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking updated");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update booking");
    },
  });

  const cancelBooking = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason?: string }) => {
      const { data, error } = await supabase
        .from("bookings")
        .update({ 
          status: "cancelled",
          cancellation_reason: reason 
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking cancelled");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to cancel booking");
    },
  });

  return {
    bookings,
    isLoading,
    createBooking: createBooking.mutate,
    updateBooking: updateBooking.mutate,
    cancelBooking: cancelBooking.mutate,
    isCreating: createBooking.isPending,
  };
};

export const useBookingStats = () => {
  const { user, role } = useAuth();

  return useQuery({
    queryKey: ["booking-stats", user?.id, role],
    queryFn: async () => {
      if (!user?.id) return { total: 0, active: 0, completed: 0, upcoming: 0 };
      
      const now = new Date().toISOString();
      let query = supabase.from("bookings").select("id, status, start_time, end_time", { count: "exact" });
      
      if (role === "user") {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;
      if (error) throw error;

      const bookings = data || [];
      return {
        total: bookings.length,
        active: bookings.filter(b => b.status === "confirmed" && b.start_time <= now && b.end_time >= now).length,
        completed: bookings.filter(b => b.status === "completed").length,
        upcoming: bookings.filter(b => b.status === "confirmed" && b.start_time > now).length,
      };
    },
    enabled: !!user?.id,
  });
};

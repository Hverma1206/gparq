import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export const useParkingSpots = (hostOnly = false) => {
  const { user, role } = useAuth();
  const queryClient = useQueryClient();

  const { data: parkingSpots, isLoading } = useQuery({
    queryKey: ["parking-spots", user?.id, hostOnly, role],
    queryFn: async () => {
      let query = supabase
        .from("parking_spots")
        .select("*")
        .order("created_at", { ascending: false });

      if (hostOnly && user?.id && (role === "host" || role === "admin")) {
        query = query.eq("host_id", user.id);
      } else {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: hostOnly ? !!user?.id : true,
  });

  const createSpot = useMutation({
    mutationFn: async (spot: {
      name: string;
      address: string;
      city: string;
      description?: string;
      price_per_hour: number;
      price_per_day?: number;
      total_spots?: number;
      available_spots?: number;
      is_covered?: boolean;
      has_ev_charging?: boolean;
      vehicle_types?: string[];
      amenities?: string[];
      latitude?: number;
      longitude?: number;
      images?: string[];
    }) => {
      if (!user?.id) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("parking_spots")
        .insert({
          ...spot,
          host_id: user.id,
          is_active: false, // Needs approval
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parking-spots"] });
      toast.success("Listing created! Pending approval.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create listing");
    },
  });

  const updateSpot = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<any> }) => {
      const { data, error } = await supabase
        .from("parking_spots")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parking-spots"] });
      toast.success("Listing updated");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update listing");
    },
  });

  const deleteSpot = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("parking_spots")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parking-spots"] });
      toast.success("Listing deleted");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete listing");
    },
  });

  return {
    parkingSpots: parkingSpots || [],
    isLoading,
    createSpot: createSpot.mutate,
    updateSpot: updateSpot.mutate,
    deleteSpot: deleteSpot.mutate,
    isCreating: createSpot.isPending,
  };
};

export const useParkingSpotStats = () => {
  const { user, role } = useAuth();

  return useQuery({
    queryKey: ["parking-spot-stats", user?.id, role],
    queryFn: async () => {
      if (!user?.id) return { totalSpots: 0, occupiedSpots: 0, earnings: 0 };
      
      const { data: spots, error } = await supabase
        .from("parking_spots")
        .select("id, total_spots, available_spots")
        .eq("host_id", user.id);
      
      if (error) throw error;

      const totalSpots = spots?.reduce((sum, s) => sum + (s.total_spots || 0), 0) || 0;
      const availableSpots = spots?.reduce((sum, s) => sum + (s.available_spots || 0), 0) || 0;

      // Get monthly earnings from bookings
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const spotIds = spots?.map(s => s.id) || [];
      const { data: bookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("host_payout")
        .in("parking_spot_id", spotIds)
        .gte("created_at", startOfMonth.toISOString())
        .eq("status", "completed");

      if (bookingsError) throw bookingsError;

      const monthlyEarnings = bookings?.reduce((sum, b) => sum + (Number(b.host_payout) || 0), 0) || 0;

      return {
        totalSpots,
        occupiedSpots: totalSpots - availableSpots,
        earnings: monthlyEarnings,
        listingCount: spots?.length || 0,
      };
    },
    enabled: !!user?.id && (role === "host" || role === "admin"),
  });
};

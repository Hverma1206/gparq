import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export const useSavedLocations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: locations, isLoading } = useQuery({
    queryKey: ["saved-locations", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("saved_locations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const addLocation = useMutation({
    mutationFn: async (location: { name: string; address: string; latitude?: number; longitude?: number }) => {
      if (!user?.id) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("saved_locations")
        .insert({
          ...location,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-locations", user?.id] });
      toast.success("Location saved");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save location");
    },
  });

  const deleteLocation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("saved_locations")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-locations", user?.id] });
      toast.success("Location removed");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove location");
    },
  });

  return {
    locations: locations || [],
    isLoading,
    addLocation: addLocation.mutate,
    deleteLocation: deleteLocation.mutate,
    isAdding: addLocation.isPending,
  };
};

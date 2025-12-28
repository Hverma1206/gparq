import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

interface Vehicle {
  id: string;
  user_id: string;
  name: string;
  vehicle_number: string;
  vehicle_type: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export const useVehicles = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["vehicles", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("user_id", user.id)
        .order("is_primary", { ascending: false })
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Vehicle[];
    },
    enabled: !!user?.id,
  });

  const addVehicle = useMutation({
    mutationFn: async (vehicle: { name: string; vehicle_number: string; vehicle_type: string; is_primary?: boolean }) => {
      if (!user?.id) throw new Error("Not authenticated");
      
      // If this is the first vehicle or marked as primary, update others to not primary
      if (vehicle.is_primary) {
        await supabase
          .from("vehicles")
          .update({ is_primary: false })
          .eq("user_id", user.id);
      }

      const { data, error } = await supabase
        .from("vehicles")
        .insert({
          ...vehicle,
          user_id: user.id,
          is_primary: vehicle.is_primary ?? (vehicles?.length === 0),
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles", user?.id] });
      toast.success("Vehicle added successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add vehicle");
    },
  });

  const updateVehicle = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Vehicle> }) => {
      if (updates.is_primary && user?.id) {
        await supabase
          .from("vehicles")
          .update({ is_primary: false })
          .eq("user_id", user.id);
      }

      const { data, error } = await supabase
        .from("vehicles")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles", user?.id] });
      toast.success("Vehicle updated");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update vehicle");
    },
  });

  const deleteVehicle = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles", user?.id] });
      toast.success("Vehicle removed");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove vehicle");
    },
  });

  return {
    vehicles: vehicles || [],
    isLoading,
    addVehicle: addVehicle.mutate,
    updateVehicle: updateVehicle.mutate,
    deleteVehicle: deleteVehicle.mutate,
    isAdding: addVehicle.isPending,
  };
};

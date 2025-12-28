import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export const useWallet = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ["wallet", user?.id],
    queryFn: async () => {
      if (!user?.id) return { balance: 0 };
      const { data, error } = await supabase
        .from("wallet_balances")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data || { balance: 0 };
    },
    enabled: !!user?.id,
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const addMoney = useMutation({
    mutationFn: async (amount: number) => {
      if (!user?.id) throw new Error("Not authenticated");
      
      // Create transaction
      const { error: txError } = await supabase
        .from("transactions")
        .insert({
          user_id: user.id,
          type: "credit",
          amount,
          description: "Added to wallet",
          status: "completed",
        });
      
      if (txError) throw txError;

      // Update wallet balance
      const newBalance = (wallet?.balance || 0) + amount;
      const { error: walletError } = await supabase
        .from("wallet_balances")
        .upsert({
          user_id: user.id,
          balance: newBalance,
        });
      
      if (walletError) throw walletError;
      return newBalance;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] });
      toast.success("Money added to wallet");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add money");
    },
  });

  const getMonthlyStats = () => {
    if (!transactions) return { spent: 0, credited: 0 };
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const monthlyTx = transactions.filter(tx => 
      new Date(tx.created_at) >= startOfMonth
    );

    return {
      spent: monthlyTx.filter(tx => tx.type === "debit").reduce((sum, tx) => sum + Number(tx.amount), 0),
      credited: monthlyTx.filter(tx => tx.type === "credit").reduce((sum, tx) => sum + Number(tx.amount), 0),
    };
  };

  return {
    balance: wallet?.balance || 0,
    transactions: transactions || [],
    isLoading: walletLoading || transactionsLoading,
    addMoney: addMoney.mutate,
    isAdding: addMoney.isPending,
    monthlyStats: getMonthlyStats(),
  };
};

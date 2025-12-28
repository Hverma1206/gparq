-- Add vehicles table for user vehicles
CREATE TABLE public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    vehicle_number TEXT NOT NULL,
    vehicle_type TEXT NOT NULL DEFAULT 'car',
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add saved_locations table
CREATE TABLE public.saved_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude NUMERIC,
    longitude NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add wallet_balances table for user wallets
CREATE TABLE public.wallet_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    balance NUMERIC NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL,
    reviewee_id UUID,
    parking_spot_id UUID REFERENCES parking_spots(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add partner_services table
CREATE TABLE public.partner_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID NOT NULL,
    service_type TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add partner_jobs table
CREATE TABLE public.partner_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID NOT NULL,
    service_id UUID REFERENCES partner_services(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    customer_id UUID NOT NULL,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    amount NUMERIC NOT NULL,
    notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_jobs ENABLE ROW LEVEL SECURITY;

-- RLS policies for vehicles
CREATE POLICY "Users can view their own vehicles" ON public.vehicles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own vehicles" ON public.vehicles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own vehicles" ON public.vehicles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own vehicles" ON public.vehicles FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all vehicles" ON public.vehicles FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS policies for saved_locations
CREATE POLICY "Users can view their own saved locations" ON public.saved_locations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own saved locations" ON public.saved_locations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own saved locations" ON public.saved_locations FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for wallet_balances
CREATE POLICY "Users can view their own wallet" ON public.wallet_balances FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all wallets" ON public.wallet_balances FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- RLS policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Admins can manage all reviews" ON public.reviews FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS policies for partner_services
CREATE POLICY "Anyone can view active services" ON public.partner_services FOR SELECT USING (is_active = true);
CREATE POLICY "Partners can manage their services" ON public.partner_services FOR ALL USING (auth.uid() = partner_id);
CREATE POLICY "Admins can manage all services" ON public.partner_services FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS policies for partner_jobs
CREATE POLICY "Partners can view their jobs" ON public.partner_jobs FOR SELECT USING (auth.uid() = partner_id);
CREATE POLICY "Customers can view their jobs" ON public.partner_jobs FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Partners can update their jobs" ON public.partner_jobs FOR UPDATE USING (auth.uid() = partner_id);
CREATE POLICY "System can create jobs" ON public.partner_jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage all jobs" ON public.partner_jobs FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create updated_at triggers
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_wallet_balances_updated_at BEFORE UPDATE ON public.wallet_balances FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_partner_services_updated_at BEFORE UPDATE ON public.partner_services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_partner_jobs_updated_at BEFORE UPDATE ON public.partner_jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to initialize user wallet on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_wallet()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.wallet_balances (user_id, balance)
  VALUES (NEW.id, 0);
  RETURN NEW;
END;
$$;

-- Create trigger for auto-creating wallet
CREATE TRIGGER on_auth_user_created_wallet
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_wallet();

-- Add indexes for performance
CREATE INDEX idx_vehicles_user_id ON public.vehicles(user_id);
CREATE INDEX idx_saved_locations_user_id ON public.saved_locations(user_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_reviews_parking_spot_id ON public.reviews(parking_spot_id);
CREATE INDEX idx_partner_jobs_partner_id ON public.partner_jobs(partner_id);
CREATE INDEX idx_partner_jobs_status ON public.partner_jobs(status);
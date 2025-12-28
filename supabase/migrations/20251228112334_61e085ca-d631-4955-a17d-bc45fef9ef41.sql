-- Create parking_spots table
CREATE TABLE public.parking_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  zip_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  price_per_hour DECIMAL(10, 2) NOT NULL,
  price_per_day DECIMAL(10, 2),
  vehicle_types TEXT[] DEFAULT ARRAY['car'],
  amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active BOOLEAN DEFAULT true,
  is_covered BOOLEAN DEFAULT false,
  has_ev_charging BOOLEAN DEFAULT false,
  total_spots INTEGER DEFAULT 1,
  available_spots INTEGER DEFAULT 1,
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS on parking_spots
ALTER TABLE public.parking_spots ENABLE ROW LEVEL SECURITY;

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parking_spot_id UUID NOT NULL REFERENCES public.parking_spots(id) ON DELETE CASCADE,
  vehicle_number TEXT NOT NULL,
  vehicle_type TEXT DEFAULT 'car',
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled', 'expired')),
  total_amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) DEFAULT 0,
  host_payout DECIMAL(10, 2) DEFAULT 0,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_method TEXT,
  qr_code TEXT,
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('payment', 'refund', 'payout', 'wallet_credit', 'wallet_debit', 'commission')),
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method TEXT,
  payment_gateway TEXT,
  gateway_transaction_id TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS on transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create security_alerts table for email notifications
CREATE TABLE public.security_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('failed_login', 'new_device', 'password_reset', 'suspicious_activity', 'role_change', 'api_key_change')),
  severity TEXT DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  location TEXT,
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS on security_alerts
ALTER TABLE public.security_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for parking_spots
CREATE POLICY "Anyone can view active parking spots"
ON public.parking_spots FOR SELECT
USING (is_active = true);

CREATE POLICY "Hosts can view their own spots"
ON public.parking_spots FOR SELECT
USING (auth.uid() = host_id);

CREATE POLICY "Hosts can create their own spots"
ON public.parking_spots FOR INSERT
WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their own spots"
ON public.parking_spots FOR UPDATE
USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete their own spots"
ON public.parking_spots FOR DELETE
USING (auth.uid() = host_id);

CREATE POLICY "Admins can manage all spots"
ON public.parking_spots FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings"
ON public.bookings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Hosts can view bookings for their spots"
ON public.bookings FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.parking_spots
    WHERE parking_spots.id = bookings.parking_spot_id
    AND parking_spots.host_id = auth.uid()
  )
);

CREATE POLICY "Users can create bookings"
ON public.bookings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
ON public.bookings FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all bookings"
ON public.bookings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions"
ON public.transactions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all transactions"
ON public.transactions FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for security_alerts
CREATE POLICY "Users can view their own security alerts"
ON public.security_alerts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can create alerts"
ON public.security_alerts FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all security alerts"
ON public.security_alerts FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_parking_spots_updated_at
  BEFORE UPDATE ON public.parking_spots
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for faster queries
CREATE INDEX idx_parking_spots_city ON public.parking_spots(city);
CREATE INDEX idx_parking_spots_host_id ON public.parking_spots(host_id);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_parking_spot_id ON public.bookings(parking_spot_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_booking_id ON public.transactions(booking_id);
CREATE INDEX idx_security_alerts_user_id ON public.security_alerts(user_id);
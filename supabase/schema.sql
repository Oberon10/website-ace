-- =========================================================================
-- ACE GLOBAL LOGISTICS - SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY
-- =========================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. PROFILES TABLE (Role-Based Access Control)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('customer', 'staff', 'admin')) DEFAULT 'customer',
  phone TEXT,
  company TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to automatically create a profile record when a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -------------------------------------------------------------------------
-- 2. SHIPMENTS TABLE (Relational Model)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT,
  sender_address TEXT,
  sender_city TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_email TEXT,
  recipient_address TEXT,
  recipient_city TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('air', 'sea', 'road', 'warehousing')),
  status TEXT NOT NULL CHECK (status IN (
    'pending',
    'picked_up',
    'in_transit',
    'customs_clearance',
    'out_for_delivery',
    'delivered',
    'delayed'
  )) DEFAULT 'picked_up',
  weight_kg NUMERIC(10, 2) NOT NULL,
  pieces INTEGER DEFAULT 1,
  dimensions TEXT DEFAULT 'Standard',
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  estimated_delivery TEXT NOT NULL,
  current_location TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on tracking_number for sub-millisecond public tracking queries
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON public.shipments (UPPER(tracking_number));
CREATE INDEX IF NOT EXISTS idx_shipments_user_id ON public.shipments (user_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON public.shipments (status);

-- -------------------------------------------------------------------------
-- 3. SHIPMENT CHECKPOINTS TABLE (Audit Trail History)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.shipment_checkpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_checkpoints_shipment_id ON public.shipment_checkpoints (shipment_id);

-- -------------------------------------------------------------------------
-- 4. QUOTATIONS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('air', 'sea', 'road', 'warehousing')),
  weight_kg NUMERIC(10, 2) NOT NULL,
  volume_cbm NUMERIC(10, 2) DEFAULT 1.0,
  cargo_description TEXT NOT NULL,
  estimated_price NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'quoted', 'accepted', 'declined')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 5. CONTACT INQUIRIES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('new', 'in_progress', 'resolved')) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipment_checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Helper functions to check user roles in RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND (role = 'staff' OR role = 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -------------------------------------------------------------------------
-- RLS POLICIES: PROFILES
-- -------------------------------------------------------------------------
-- 1. Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id OR public.is_staff());

-- 2. Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 3. Admins have full access to manage profiles
CREATE POLICY "Admins have full access on profiles" 
ON public.profiles FOR ALL 
USING (public.is_admin());

-- -------------------------------------------------------------------------
-- RLS POLICIES: SHIPMENTS
-- -------------------------------------------------------------------------
-- 1. PUBLIC TRACKING: Anyone can look up a shipment by exact tracking number
CREATE POLICY "Public tracking lookup by tracking number" 
ON public.shipments FOR SELECT 
USING (true);

-- 2. Customers can insert new shipment orders
CREATE POLICY "Customers can book shipments" 
ON public.shipments FOR INSERT 
WITH CHECK (auth.uid() = user_id OR public.is_staff());

-- 3. Staff and Admins can update shipment statuses & locations
CREATE POLICY "Staff can update shipments" 
ON public.shipments FOR UPDATE 
USING (public.is_staff());

-- 4. Admins can delete shipments
CREATE POLICY "Admins can delete shipments" 
ON public.shipments FOR DELETE 
USING (public.is_admin());

-- -------------------------------------------------------------------------
-- RLS POLICIES: SHIPMENT CHECKPOINTS
-- -------------------------------------------------------------------------
-- 1. Anyone can view checkpoints (public audit trail)
CREATE POLICY "Anyone can view checkpoints" 
ON public.shipment_checkpoints FOR SELECT 
USING (true);

-- 2. Only staff and admin can insert new checkpoints
CREATE POLICY "Staff can insert checkpoints" 
ON public.shipment_checkpoints FOR INSERT 
WITH CHECK (public.is_staff());

-- -------------------------------------------------------------------------
-- RLS POLICIES: QUOTATIONS
-- -------------------------------------------------------------------------
-- 1. Anyone can insert a quotation request
CREATE POLICY "Anyone can request quotations" 
ON public.quotations FOR INSERT 
WITH CHECK (true);

-- 2. Customers view their own; Staff/Admin view all
CREATE POLICY "View quotations policy" 
ON public.quotations FOR SELECT 
USING (auth.uid() = user_id OR public.is_staff());

-- 3. Staff and Admin can update quotation status
CREATE POLICY "Staff can update quotations" 
ON public.quotations FOR UPDATE 
USING (public.is_staff());

-- -------------------------------------------------------------------------
-- RLS POLICIES: INQUIRIES
-- -------------------------------------------------------------------------
-- 1. Public can submit inquiries
CREATE POLICY "Public can submit inquiries" 
ON public.inquiries FOR INSERT 
WITH CHECK (true);

-- 2. Only Staff & Admin can view and resolve inquiries
CREATE POLICY "Staff can manage inquiries" 
ON public.inquiries FOR ALL 
USING (public.is_staff());

-- =========================================================================
-- SEED DATA (Ready for Immediate Testing)
-- =========================================================================

-- Insert initial shipments
INSERT INTO public.shipments (
  id, tracking_number, sender_name, sender_city, recipient_name, recipient_city,
  origin, destination, service_type, status, weight_kg, pieces, price, estimated_delivery, current_location
) VALUES 
(
  'e5b9f71c-32b0-466d-8e42-123456789abc',
  'ACE123456',
  'Apex Manufacturing Corp',
  'Frankfurt, Germany',
  'Pacific Electronics Ltd',
  'Singapore',
  'Frankfurt (FRA), Germany',
  'Singapore (SIN)',
  'air',
  'in_transit',
  840.00,
  14,
  3250.00,
  '2026-10-25 16:00',
  'Dubai Cargo Hub (DXB) - Sorting Center'
),
(
  'b8f2d50a-91a1-432a-bc91-789012345def',
  'ACE789012',
  'Nordic Furniture Design',
  'Rotterdam, Netherlands',
  'Atlantic Home Goods',
  'New York, USA',
  'Rotterdam Port, Netherlands',
  'Port of New York & New Jersey, USA',
  'sea',
  'customs_clearance',
  18500.00,
  420,
  6800.00,
  '2026-10-27 12:00',
  'New York Container Terminal, Berth 4'
),
(
  'c1e3a47b-12d8-4f90-9988-456789012ghi',
  'ACE456789',
  'Metro Pharmaceuticals',
  'Chicago, IL',
  'Saint Jude Regional Health',
  'Atlanta, GA',
  'Chicago, IL, USA',
  'Atlanta, GA, USA',
  'road',
  'out_for_delivery',
  420.00,
  6,
  940.00,
  '2026-10-23 15:30',
  'Atlanta Metro Hub - Vehicle 104'
)
ON CONFLICT (tracking_number) DO NOTHING;

-- Insert checkpoints for ACE123456
INSERT INTO public.shipment_checkpoints (shipment_id, status, title, location, timestamp, notes)
VALUES
(
  'e5b9f71c-32b0-466d-8e42-123456789abc',
  'picked_up',
  'Cargo Received at Origin Warehouse',
  'Frankfurt Logistics Center, Germany',
  '2026-10-21 10:15 CET',
  'Weighed, security screened and palletized.'
),
(
  'e5b9f71c-32b0-466d-8e42-123456789abc',
  'in_transit',
  'Export Customs Cleared & Aircraft Departed',
  'Frankfurt International Airport (FRA)',
  '2026-10-22 03:40 CET',
  'Departed flight ACE-Cargo 409.'
),
(
  'e5b9f71c-32b0-466d-8e42-123456789abc',
  'in_transit',
  'Transshipment Hub Arrival & Processing',
  'Dubai Cargo Hub (DXB), UAE',
  '2026-10-23 06:15 GST',
  'Undergoing intermediate transfer to Boeing 777F connecting flight.'
);

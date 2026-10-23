import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Stage 3: Supabase Client Initializer
 * Provides resilient access: If environment variables are supplied, connects
 * directly to the live Supabase PostgreSQL backend.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Helper to execute Supabase database operations with fallback to mock data
 */
export async function fetchShipmentsFromDB() {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('shipments')
    .select(`
      *,
      checkpoints:shipment_checkpoints(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase query error:', error.message);
    return null;
  }

  return data;
}

export async function fetchTrackingFromDB(trackingNumber: string) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('shipments')
    .select(`
      *,
      checkpoints:shipment_checkpoints(*)
    `)
    .ilike('tracking_number', trackingNumber)
    .single();

  if (error) {
    return null;
  }

  return data;
}

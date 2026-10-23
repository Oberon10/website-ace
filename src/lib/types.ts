export type UserRole = 'customer' | 'staff' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  company?: string;
  avatar_url?: string;
}

export type ServiceType = 'air' | 'sea' | 'road' | 'warehousing';

export type ShipmentStatus = 
  | 'pending'
  | 'picked_up'
  | 'in_transit'
  | 'customs_clearance'
  | 'out_for_delivery'
  | 'delivered'
  | 'delayed';

export interface Checkpoint {
  id: string;
  status: ShipmentStatus;
  title: string;
  location: string;
  timestamp: string;
  notes?: string;
}

export interface Shipment {
  id: string;
  tracking_number: string;
  sender_name: string;
  sender_email?: string;
  sender_address: string;
  sender_city: string;
  recipient_name: string;
  recipient_email?: string;
  recipient_address: string;
  recipient_city: string;
  origin: string;
  destination: string;
  service_type: ServiceType;
  status: ShipmentStatus;
  weight_kg: number;
  pieces: number;
  dimensions?: string; // e.g., "50x40x30 cm"
  price: number;
  currency: string;
  estimated_delivery: string;
  current_location: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
  checkpoints: Checkpoint[];
}

export interface Quotation {
  id: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  origin: string;
  destination: string;
  service_type: ServiceType;
  weight_kg: number;
  volume_cbm?: number;
  cargo_description: string;
  estimated_price: number;
  status: 'pending' | 'quoted' | 'accepted' | 'declined';
  created_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
}

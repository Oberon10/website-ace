import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_SHIPMENTS } from '@/lib/mockData';
import { Shipment, ServiceType } from '@/lib/types';

// In-memory API store for development / REST validation
let shipmentsStore: Shipment[] = [...INITIAL_SHIPMENTS];

/**
 * Stage 2: REST API - Shipments Collection
 * GET /api/shipments - List shipments with optional query filtering (?status, ?service, ?search)
 * POST /api/shipments - Create a new shipment consignment with auto-generated tracking waybill
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status');
  const serviceFilter = searchParams.get('service');
  const search = searchParams.get('search');
  const userId = searchParams.get('userId');

  let results = [...shipmentsStore];

  if (userId) {
    results = results.filter(s => s.user_id === userId);
  }

  if (statusFilter) {
    results = results.filter(s => s.status.toLowerCase() === statusFilter.toLowerCase());
  }

  if (serviceFilter) {
    results = results.filter(s => s.service_type.toLowerCase() === serviceFilter.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(s =>
      s.tracking_number.toLowerCase().includes(q) ||
      s.origin.toLowerCase().includes(q) ||
      s.destination.toLowerCase().includes(q) ||
      s.recipient_name.toLowerCase().includes(q)
    );
  }

  return NextResponse.json(
    {
      success: true,
      count: results.length,
      data: results,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const requiredFields = ['sender_name', 'recipient_name', 'origin', 'destination', 'service_type', 'weight_kg'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = body.tracking_number || `ACE${randomDigits}`;
    const newId = `sh_${Date.now()}`;
    const now = new Date().toISOString();

    const newShipment: Shipment = {
      id: newId,
      tracking_number: trackingNumber,
      sender_name: body.sender_name,
      sender_email: body.sender_email || '',
      sender_address: body.sender_address || '',
      sender_city: body.origin,
      recipient_name: body.recipient_name,
      recipient_email: body.recipient_email || '',
      recipient_address: body.recipient_address || '',
      recipient_city: body.destination,
      origin: body.origin,
      destination: body.destination,
      service_type: body.service_type as ServiceType,
      status: body.status || 'picked_up',
      weight_kg: Number(body.weight_kg),
      pieces: Number(body.pieces || 1),
      dimensions: body.dimensions || 'Standard',
      price: Number(body.price || Math.round(Number(body.weight_kg) * 5.5 + 40)),
      currency: body.currency || 'USD',
      estimated_delivery: body.estimated_delivery || new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0] + ' 18:00',
      current_location: `${body.origin} Freight Hub`,
      user_id: body.user_id || 'usr_cust_01',
      created_at: now,
      updated_at: now,
      checkpoints: [
        {
          id: `cp_${Date.now()}`,
          shipment_id: newId,
          status: 'picked_up',
          title: 'Shipment Consignment Created & Booked into System',
          location: body.origin,
          timestamp: new Date().toLocaleString(),
          notes: 'Registered via ACE Global REST API.',
        },
      ],
    };

    shipmentsStore = [newShipment, ...shipmentsStore];

    return NextResponse.json(
      {
        success: true,
        message: 'Shipment successfully created',
        data: newShipment,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON request payload', details: err.message },
      { status: 400 }
    );
  }
}

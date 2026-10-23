import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_SHIPMENTS } from '@/lib/mockData';

/**
 * Stage 2: REST API - Public Tracking Endpoint
 * GET /api/tracking/[trackingNumber] - High-speed waybill lookup with checkpoint history
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  const { trackingNumber } = await params;
  const cleanNumber = trackingNumber.trim().toUpperCase();

  const shipment = INITIAL_SHIPMENTS.find(
    s => s.tracking_number.toUpperCase() === cleanNumber
  );

  if (!shipment) {
    return NextResponse.json(
      {
        success: false,
        error: `Tracking number '${trackingNumber}' was not found in the global registry.`,
        hint: 'Please check your waybill or try demo numbers: ACE123456, ACE789012, ACE456789',
      },
      { status: 404 }
    );
  }

  // Calculate transit percentage based on status
  const progressMap: Record<string, number> = {
    pending: 10,
    picked_up: 25,
    in_transit: 55,
    customs_clearance: 75,
    out_for_delivery: 90,
    delivered: 100,
  };

  return NextResponse.json(
    {
      success: true,
      data: {
        tracking_number: shipment.tracking_number,
        service: shipment.service_type,
        status: shipment.status,
        progress_percentage: progressMap[shipment.status] || 50,
        origin: shipment.origin,
        destination: shipment.destination,
        current_location: shipment.current_location,
        estimated_delivery: shipment.estimated_delivery,
        weight_kg: shipment.weight_kg,
        pieces: shipment.pieces,
        checkpoints: shipment.checkpoints,
      },
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    }
  );
}

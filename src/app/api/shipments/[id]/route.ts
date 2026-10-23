import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_SHIPMENTS } from '@/lib/mockData';
import { Shipment, ShipmentStatus } from '@/lib/types';

/**
 * Stage 2: REST API - Individual Shipment Operations
 * GET /api/shipments/[id] - Retrieve by ID or Tracking Number
 * PATCH /api/shipments/[id] - Update status, append checkpoint
 * DELETE /api/shipments/[id] - Remove shipment
 */

let shipmentsStore: Shipment[] = [...INITIAL_SHIPMENTS];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cleanId = id.trim().toUpperCase();

  const shipment = shipmentsStore.find(
    s => s.id.toUpperCase() === cleanId || s.tracking_number.toUpperCase() === cleanId
  );

  if (!shipment) {
    return NextResponse.json(
      { success: false, error: `Shipment with identifier '${id}' not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, data: shipment },
    { status: 200 }
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cleanId = id.trim().toUpperCase();

    const shipmentIndex = shipmentsStore.findIndex(
      s => s.id.toUpperCase() === cleanId || s.tracking_number.toUpperCase() === cleanId
    );

    if (shipmentIndex === -1) {
      return NextResponse.json(
        { success: false, error: `Shipment '${id}' not found` },
        { status: 404 }
      );
    }

    const current = shipmentsStore[shipmentIndex];
    const newStatus = (body.status || current.status) as ShipmentStatus;
    const newLocation = body.current_location || current.current_location;
    const now = new Date().toISOString();

    // Create audit checkpoint
    const newCheckpoint = {
      id: `cp_${Date.now()}`,
      shipment_id: current.id,
      status: newStatus,
      title: body.title || `Status updated to ${newStatus.toUpperCase()}`,
      location: newLocation,
      timestamp: new Date().toLocaleString(),
      notes: body.notes || 'Checkpoint recorded via REST API PATCH.',
    };

    const updatedShipment: Shipment = {
      ...current,
      ...body,
      status: newStatus,
      current_location: newLocation,
      updated_at: now,
      checkpoints: [newCheckpoint, ...current.checkpoints],
    };

    shipmentsStore[shipmentIndex] = updatedShipment;

    return NextResponse.json(
      {
        success: true,
        message: 'Shipment updated successfully',
        data: updatedShipment,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Invalid update payload', details: err.message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cleanId = id.trim().toUpperCase();

  const exists = shipmentsStore.some(
    s => s.id.toUpperCase() === cleanId || s.tracking_number.toUpperCase() === cleanId
  );

  if (!exists) {
    return NextResponse.json(
      { success: false, error: `Shipment '${id}' not found` },
      { status: 404 }
    );
  }

  shipmentsStore = shipmentsStore.filter(
    s => s.id.toUpperCase() !== cleanId && s.tracking_number.toUpperCase() !== cleanId
  );

  return NextResponse.json(
    {
      success: true,
      message: `Shipment '${id}' deleted successfully`,
    },
    { status: 200 }
  );
}

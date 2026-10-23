import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_QUOTES } from '@/lib/mockData';
import { Quotation, ServiceType } from '@/lib/types';

let quotesStore: Quotation[] = [...INITIAL_QUOTES];

/**
 * Stage 2: REST API - Quotations Service
 * GET /api/quotations - List quotes
 * POST /api/quotations - Submit new quotation request
 * PATCH /api/quotations - Approve or decline quotation
 */

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      count: quotesStore.length,
      data: quotesStore,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.customer_name || !body.customer_email || !body.origin || !body.destination) {
      return NextResponse.json(
        { success: false, error: 'Missing customer contact and routing information' },
        { status: 400 }
      );
    }

    const weight = Number(body.weight_kg || 50);
    const service = (body.service_type || 'air') as ServiceType;

    // Pricing formula
    const multiplier = service === 'air' ? 5.5 : service === 'sea' ? 1.5 : 2.5;
    const estimatedPrice = Math.round(weight * multiplier + 120);

    const newQuote: Quotation = {
      id: `qt_${Date.now()}`,
      user_id: body.user_id || 'usr_cust_01',
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone || '',
      origin: body.origin,
      destination: body.destination,
      service_type: service,
      weight_kg: weight,
      volume_cbm: Number(body.volume_cbm || 1),
      cargo_description: body.cargo_description || 'General freight goods',
      estimated_price: estimatedPrice,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    quotesStore = [newQuote, ...quotesStore];

    return NextResponse.json(
      {
        success: true,
        message: 'Quotation request submitted successfully',
        data: newQuote,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON', details: err.message },
      { status: 400 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, revised_price } = body;

    const quoteIndex = quotesStore.findIndex(q => q.id === id);
    if (quoteIndex === -1) {
      return NextResponse.json(
        { success: false, error: `Quote '${id}' not found` },
        { status: 404 }
      );
    }

    const current = quotesStore[quoteIndex];
    const updated: Quotation = {
      ...current,
      status: status || current.status,
      estimated_price: revised_price !== undefined ? Number(revised_price) : current.estimated_price,
    };

    quotesStore[quoteIndex] = updated;

    return NextResponse.json(
      {
        success: true,
        message: `Quote '${id}' updated to ${updated.status}`,
        data: updated,
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

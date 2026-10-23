import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_INQUIRIES } from '@/lib/mockData';
import { ContactInquiry } from '@/lib/types';

let inquiriesStore: ContactInquiry[] = [...INITIAL_INQUIRIES];

/**
 * Stage 2: REST API - Customer Inquiries & CRM
 * GET /api/inquiries - List support tickets
 * POST /api/inquiries - Submit an inquiry
 * PATCH /api/inquiries - Update resolution status
 */

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      count: inquiriesStore.length,
      data: inquiriesStore,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const newInquiry: ContactInquiry = {
      id: `inq_${Date.now()}`,
      name: body.name,
      email: body.email,
      subject: body.subject || 'General Logistics Inquiry',
      message: body.message,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    inquiriesStore = [newInquiry, ...inquiriesStore];

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received. A logistics agent will respond shortly.',
        data: newInquiry,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Invalid payload', details: err.message },
      { status: 400 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const inqIndex = inquiriesStore.findIndex(i => i.id === id);
    if (inqIndex === -1) {
      return NextResponse.json(
        { success: false, error: `Inquiry '${id}' not found` },
        { status: 404 }
      );
    }

    inquiriesStore[inqIndex].status = status;

    return NextResponse.json(
      {
        success: true,
        message: `Inquiry '${id}' status updated to ${status}`,
        data: inquiriesStore[inqIndex],
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

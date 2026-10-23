import { NextRequest, NextResponse } from 'next/server';

/**
 * Stage 2: REST API - Payment & Billing Processing
 * POST /api/payments - Process simulated credit card / wire transfer payment for waybill
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tracking_number, amount, currency, payment_method, customer_email } = body;

    if (!tracking_number || !amount) {
      return NextResponse.json(
        { success: false, error: 'Tracking number and amount are required' },
        { status: 400 }
      );
    }

    const transactionId = `txn_ace_${Date.now()}`;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Payment authorized and receipt generated',
        payment: {
          transaction_id: transactionId,
          invoice_number: invoiceNumber,
          tracking_number,
          amount: Number(amount),
          currency: currency || 'USD',
          payment_method: payment_method || 'Credit Card (Visa)',
          status: 'paid',
          timestamp: new Date().toISOString(),
          receipt_url: `https://ace-logistics.com/invoices/${invoiceNumber}.pdf`,
          cleared_by: 'ACE Global Merchant Services',
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Payment processing error', details: err.message },
      { status: 500 }
    );
  }
}

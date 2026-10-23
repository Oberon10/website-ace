import { NextRequest, NextResponse } from 'next/server';
import { DEMO_USERS } from '@/lib/mockData';
import { UserRole } from '@/lib/types';

/**
 * Stage 2: REST API - Authentication Handler
 * POST /api/auth - Login with email and password, or simulate role authentication
 * GET /api/auth - Retrieve current authenticated profile
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, role } = body;

    // Check if selecting a demo role
    if (role && DEMO_USERS[role as UserRole]) {
      const user = DEMO_USERS[role as UserRole];
      return NextResponse.json(
        {
          success: true,
          message: `Successfully authenticated as ${user.role.toUpperCase()}`,
          user,
          token: `ace_jwt_simulated_${user.role}_${Date.now()}`,
        },
        { status: 200 }
      );
    }

    // Email lookup
    const foundUser = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === (email || '').toLowerCase()
    );

    if (foundUser) {
      return NextResponse.json(
        {
          success: true,
          message: 'Authentication successful',
          user: foundUser,
          token: `ace_jwt_simulated_${foundUser.role}_${Date.now()}`,
        },
        { status: 200 }
      );
    }

    // Default fallback to customer profile
    return NextResponse.json(
      {
        success: true,
        message: 'Logged in as new customer',
        user: {
          id: `usr_custom_${Date.now()}`,
          email: email || 'user@example.com',
          full_name: email ? email.split('@')[0] : 'Valued Customer',
          role: 'customer' as UserRole,
        },
        token: `ace_jwt_simulated_customer_${Date.now()}`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Invalid request payload', details: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Check authorization header
  const authHeader = request.headers.get('authorization');
  
  return NextResponse.json(
    {
      authenticated: Boolean(authHeader),
      activeRoles: ['customer', 'staff', 'admin'],
      sessionStatus: 'healthy',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

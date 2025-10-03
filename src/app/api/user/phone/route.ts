import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED' 
      }, { status: 401 });
    }

    const requestBody = await request.json();
    const { userId, phone } = requestBody;

    // Security check: Prevent user ID manipulation
    if ('userId' in requestBody || 'user_id' in requestBody) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    // Validate phone is provided (can be empty string)
    if (phone === undefined) {
      return NextResponse.json({ 
        error: "Phone field is required",
        code: "MISSING_PHONE" 
      }, { status: 400 });
    }

    // Sanitize phone input
    const sanitizedPhone = typeof phone === 'string' ? phone.trim() : '';

    // Check if user exists and belongs to authenticated user
    const existingUser = await db.select()
      .from(user)
      .where(eq(user.id, currentUser.id))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND' 
      }, { status: 404 });
    }

    // Update user's phone number
    const updatedUser = await db.update(user)
      .set({
        phone: sanitizedPhone,
        updatedAt: new Date()
      })
      .where(eq(user.id, currentUser.id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to update user',
        code: 'UPDATE_FAILED' 
      }, { status: 500 });
    }

    return NextResponse.json(updatedUser[0], { status: 200 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}
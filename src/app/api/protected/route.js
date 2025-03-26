// /app/api/protected/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value; // read 'token' cookie
    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded;

    // If valid, return protected data
    return NextResponse.json(
      { message: `Protected content. Welcome user #${id} (${email}).` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid or expired token', error: error.message },
      { status: 403 }
    );
  }
}

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password required' },
        { status: 400 }
      );
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Attach token in an HttpOnly cookie
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60, 
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Login failed', error: error.message },
      { status: 500 }
    );
  }
}

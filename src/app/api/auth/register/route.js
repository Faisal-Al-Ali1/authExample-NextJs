import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing fields' },
        { status: 400 }
      );
    }

    const checkUser = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
    if (checkUser.rows.length > 0) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];

    return NextResponse.json(
      { message: 'User registered successfully', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Registration failed', error: error.message },
      { status: 500 }
    );
  }
}

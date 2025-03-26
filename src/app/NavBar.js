// app/NavBar.jsx
"use client";

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="font-bold text-xl">MyApp</div>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link href="/register" className="hover:text-gray-200">
            Register
          </Link>
          <Link href="/login" className="hover:text-gray-200">
            Login
          </Link>
          <Link href="/protected" className="hover:text-gray-200">
            Protected
          </Link>
        </div>
      </div>
    </nav>
  );
}

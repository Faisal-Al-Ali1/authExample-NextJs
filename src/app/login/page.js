"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      
      // Mark success in state
      setMessage(response.data.message || "Login successful!");
      setIsSuccess(true);

      // Wait 2s then redirect to homepage
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            className="border border-gray-300 rounded w-full p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            className="border border-gray-300 rounded w-full p-2 mt-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {message && (
        <p
          className={`font-medium mt-4 ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      {isSuccess && (
        <p className="text-gray-600">
          Redirecting to homepage in 2 seconds...
        </p>
      )}
    </div>
  );
}

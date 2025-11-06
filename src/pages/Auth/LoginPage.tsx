"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input.js";
import { Button } from "@/components/ui/button.js";
import { Label } from "@/components/ui/label.js";
import { Link, useNavigate } from "react-router";

export default function SimpleLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  setTimeout(() => {
    // Get stored user from localStorage
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (!parsedUser) {
      setError("No user found. Please register first.");
    } else if (parsedUser.email !== email || parsedUser.token !== "fake-jwt-token-123") {
      setError("Invalid email or password.");
    } else {
      console.log("Login successful:", parsedUser);
      navigate("/home"); // redirect after login
    }

    setIsLoading(false);
  }, 1000);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full"
          />
        </div>
        <div>
            <h1>not registered? <span>
                <Link to={"register"}>
                Register
                </Link>
                </span></h1>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input.js";
import { Button } from "@/components/ui/button.js";
import { Label } from "@/components/ui/label.js";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    // Simulate API registration
    setTimeout(() => {
      const userData = {
        email,
        token: "fake-jwt-token-123", // in real app, get token from API
      };

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Registered User:", userData);
      setIsLoading(false);

      // Redirect to home page or login
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

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
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 w-full"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}

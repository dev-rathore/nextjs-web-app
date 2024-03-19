"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login response:", response.data);
      router.push("/profile");
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login {loading ? "..." : ""}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="text-black"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        className="text-black"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />
      <button
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signup">
        Signup
      </Link>
    </div>
  );
};

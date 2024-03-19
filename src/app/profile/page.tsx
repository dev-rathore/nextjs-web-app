"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/data");
      setUser(response.data.userData);
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <p>{user === null ? "No data found" : user.email}</p>
      <hr />
      <button
        onClick={getUser}
      >
        Get User
      </button>
      <button
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

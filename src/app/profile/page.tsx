"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <button
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="w-10/12 mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Doctor Dashboard</h2>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default LogoutButton;
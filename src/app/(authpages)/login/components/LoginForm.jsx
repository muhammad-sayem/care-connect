"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [role, setRole] = useState("PATIENT");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginData = { email, password, role };

    if (!email || !password) {
      Swal.fire({
        title: "Please fill all the fields",
        icon: "warning",
        draggable: true
      });
      return;
    }

    try {
      const res = await axios.post("https://appointment-manager-node.onrender.com/api/v1/auth/login", loginData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      Swal.fire({
        title: `Successfully logged in as ${role}`,
        icon: "success",
        draggable: true
      });

      if (role === "PATIENT") {
        router.push('/patient/dashboard');
      }
      else {
        router.push('/doctor/dashboard');
      }
    }

    catch (error) {
      Swal.fire({
        title: `Something went wrong!!!`,
        icon: "error",
        draggable: true
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Care Connect</h2>

        <form onSubmit={handleLogin} className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-600 mb-1">
              Login as
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>
          </div>

          <Button className="w-full py-2 border border-black font-bold bg-gradient-to-r from-secondary to-primary hover:cursor-pointer" variant="default">
            Login
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

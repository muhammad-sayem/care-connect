"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  const [activeTab, setActiveTab] = useState("PATIENT");

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology"
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h2>

        <div className="flex mb-6 border-b border-gray-200">
          <button
            type="button"
            className={`flex-1 py-2 text-center font-medium ${activeTab === "PATIENT"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
              }`}
            onClick={() => setActiveTab("PATIENT")}
          >
            Patient
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center font-medium ${activeTab === "DOCTOR"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
              }`}
            onClick={() => setActiveTab("DOCTOR")}
          >
            Doctor
          </button>
        </div>

        <form className="space-y-4">

          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>


          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>


          {activeTab === "PATIENT" && (
            <div>
              <label className="block text-gray-600 mb-1">Photo URL (optional)</label>
              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}


          {activeTab === "DOCTOR" && (
            <>
              <div>
                <label className="block text-gray-600 mb-1">Specialization</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Photo URL (optional)</label>
                <input
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </>
          )}


          <Button className="w-full py-2 mt-2 border border-black font-bold" variant="default">
            Register
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

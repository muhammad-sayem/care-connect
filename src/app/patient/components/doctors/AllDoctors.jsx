"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import { useState } from "react";

const AllDoctors = () => {
  const [search, setSearch] = useState("");

  const { data: allDoctors, isLoading, isError } = useQuery({
    queryKey: ["all-doctors", search],
    queryFn: async () => {
      const res = await axios.get(
        "https://appointment-manager-node.onrender.com/api/v1/doctors",
        {
          params: {
            page: 1,
            limit: 12,
            search: search || ""
          }
        }
      );
      return res.data.data;
    },
    keepPreviousData: true,
  });

  return (
    <div className="w-10/12 mx-auto">
      <h2 className="text-4xl font-bold text-center text-primary my-6">
        All Available Doctors
      </h2>

      <div className="flex justify-center mb-8 gap-x-2 items-center">
        <input
          type="text"
          placeholder="Search by doctor name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {isLoading && <p>Loading doctors...</p>}
      {isError && <p>Failed to load doctors list</p>}

      {
        allDoctors && allDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
            {allDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <p>No doctor found</p>
        )
      }
    </div>
  );
};

export default AllDoctors;

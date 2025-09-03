"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import LogoutButton from "../../../../components/LogoutButton";

const AllDoctors = () => {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("")
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: allDoctors, isLoading, isError } = useQuery({
    queryKey: ["all-doctors", search, page, specialization],
    queryFn: async () => {
      const res = await axios.get(
        "https://appointment-manager-node.onrender.com/api/v1/doctors",
        {
          params: {
            page,
            limit,
            search: search || "",
            specialization: specialization || ""
          },
        }
      );
      return res.data.data;
    },
    keepPreviousData: true,
  });

  const { data: specializations, refetch } = useQuery({
    queryKey: ['specializations'],
    queryFn: async () => {
      const res = await axios.get("https://appointment-manager-node.onrender.com/api/v1/specializations");
      return res.data.data;
    }
  })

  return (
    <div className="w-10/12 mx-auto">
      <div className="flex justify-between items-center">
        <div>

        </div>
        <h2 className="text-4xl font-bold text-center text-primary my-6">
          All Available Doctors
        </h2>

        <div>
          <LogoutButton />
        </div>
      </div>

      <div className="flex justify-center mb-8 gap-x-2 items-center">
        <input
          type="text"
          placeholder="Search by doctor name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={specialization}
          onChange={(e) => { setSpecialization(e.target.value); setPage(1); }}
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Specializations</option>
          {
            specializations && specializations?.map((spec, idx) => (
              <option key={idx} value={spec}>{spec}</option>
            ))
          }
        </select>

        <Button onClick={() => setSearch("")} variant='outline'> Show All </Button>
      </div>

      {isLoading && <p> <LoadingSpinner /> </p>}

      {isError && <p> Failed to load doctors list </p>}

      {
        allDoctors && allDoctors.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {allDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  refetch={refetch}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-x-10 mb-8">
              <Button
                className="text-lg"
                variant="default"
                onClick={() => setPage(page - 1)}
              > <FaArrowCircleLeft /> Previous
              </Button>

              <span className="bg-black text-white font-bold text-xl px-6 py-1 rounded-md"> {page} </span>

              <Button
                className="text-lg"
                variant="default"
                onClick={() => setPage(page + 1)}
              > Next <FaArrowCircleRight />
              </Button>
            </div>
          </div>
        ) : (
          <p>No doctor found</p>
        )
      }
    </div >
  );
};

export default AllDoctors;

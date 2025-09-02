"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DoctorCard from "./DoctorCard";

const AllDoctors = () => {
  const { data: allDoctors, isLoading, isError } = useQuery({
    queryKey: ["all-doctors"],
    queryFn: async () => {
      const res = await axios.get("https://appointment-manager-node.onrender.com/api/v1/doctors");
      return res.data.data;
    }
  });

  if (isLoading) {
    return <p> Loading </p>
  }

  if (isError) {
    return <p> Failed to load doctors list </p>
  }

  return (
    <div className="w-10/12 mx-auto">
      <h2> All Doctors </h2>

      {
        allDoctors && allDoctors.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {
              allDoctors?.map(doctor => {
                return (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                  />
                )
              })
            }
          </div>
          :
          <p> No doctor found </p>
      }
    </div>

  );
};

export default AllDoctors;
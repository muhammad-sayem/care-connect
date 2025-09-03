"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import LogoutButton from "../../../../components/LogoutButton";

export default function AppointmentList() {
  const [page, setPage] = useState(1);
  const [disabledIds, setDisabledIds] = useState([]);
  const limit = 10;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["appointmentList", page],
    queryFn: async () => {
      const res = await axios.get(
        "https://appointment-manager-node.onrender.com/api/v1/appointments/doctor",
        {
          params: { page, limit },
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        }
      );
      return res.data.data;
    },
    keepPreviousData: true,
  });

  const handleUpdateStatus = async (appointmentId, status) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${status.toLowerCase()} this appointment?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    });

    if (!result.isConfirmed) return;

    try {
      await axios.patch(
        "https://appointment-manager-node.onrender.com/api/v1/appointments/update-status",
        { appointment_id: appointmentId, status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` } }
      );

      setDisabledIds((prev) => [...prev, appointmentId]);
      Swal.fire("Updated!", `Appointment ${status}`, "success");
      refetch();
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  return (
    <div className="w-10/12 mx-auto">
      <div className="flex justify-between items-center">
        <div></div>
        <h2 className="text-2xl font-bold mb-4 text-center my-6 text-primary">Appointment List</h2>
        <div>
          <LogoutButton />
        </div>
      </div>

      {isLoading && <p className="text-center"><LoadingSpinner /> </p>}
      {isError && <p className="text-center text-red-500">Failed to load appointments</p>}

      {data && data.length > 0 ? (
        <div className="grid gap-4">
          {data.map((appt) => {
            const isCompleteDisabled = disabledIds.includes(appt.id) || appt.status === "CONFIRMED";
            const isCancelDisabled = disabledIds.includes(appt.id) || appt.status === "CANCELLED";

            return (
              <div
                key={appt.id}
                className="border p-4 rounded-md shadow-md flex justify-between items-center"
              >
                <div>
                  <p><strong>Patient:</strong> {appt.patient?.name}</p>
                  <p><strong>Email:</strong> {appt.patient?.email}</p>
                  <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
                  <p><strong>Status:</strong> {appt.status}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(appt.id, "CONFIRMED")}
                    className={`px-3 py-1 rounded text-white ${isCompleteDisabled
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-green-500"
                      }`}
                    disabled={isCompleteDisabled}
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(appt.id, "CANCELLED")}
                    className={`px-3 py-1 rounded text-white ${isCancelDisabled
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-red-500"
                      }`}
                    disabled={isCancelDisabled}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && <p className="text-center">No appointments found</p>
      )}

      {data && data.length > 0 && (
        <div className="flex justify-center items-center gap-x-6 my-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="font-bold text-xl">{page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={data.length < limit}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../../../../components/LoadingSpinner";

export default function MyAppointments() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const limit = 10;

  // Get user email from localStorage
  useEffect(() => {
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
    if (user?.email) setUserEmail(user.email);
  }, []);

  // Fetch appointments
  const fetchAppointments = async () => {
    if (!userEmail) return [];

    const res = await axios.get(
      "https://appointment-manager-node.onrender.com/api/v1/appointments/patient",
      {
        params: { page, limit, status: statusFilter || undefined },
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      }
    );

    return res.data.data;
  };

  const { data: appointments, isLoading, isError, refetch } = useQuery({
    queryKey: ["my-appointments", userEmail, page, statusFilter],
    queryFn: fetchAppointments,
    enabled: !!userEmail,
  });

  // Cancel appointment
  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Cancel this appointment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.patch(
        "https://appointment-manager-node.onrender.com/api/v1/appointments/update-status",
        { appointment_id: id, status: "CANCELLED" },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` } }
      );
      Swal.fire('Cancelled!', 'Your appointment has been cancelled.', 'success');
      refetch();
    } catch {
      Swal.fire('Error', 'Failed to cancel appointment', 'error');
    }
  };

  return (
    <div className="w-10/12 mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">My Appointments</h2>

      {/* Status Filter */}
      <div className="flex justify-center mb-6">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {isLoading && <p className="text-center"><LoadingSpinner /></p>}
      {isError && <p className="text-center">Failed to load appointments</p>}

      {appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {appointments.map((appt) => (
            <div key={appt.id} className="border p-4 rounded-md shadow-md flex justify-between items-center">
              <div>
                <p><strong>Doctor:</strong> {appt.doctor.name}</p>
                <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
                <p><strong>Status:</strong> {appt.status}</p>
              </div>
              {appt.status === "PENDING" && (
                <Button variant="outline" onClick={() => handleCancel(appt.id)}>Cancel</Button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No appointments found</p>
      )}

      {/* Pagination */}
      {appointments && appointments.length > 0 && (
        <div className="flex justify-center items-center gap-x-6 mb-8">
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
          <span className="font-bold text-xl">{page}</span>
          <Button onClick={() => setPage(page + 1)} disabled={appointments.length < limit}>Next</Button>
        </div>
      )}
    </div>
  );
}

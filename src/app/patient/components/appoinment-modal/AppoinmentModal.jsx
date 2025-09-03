"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Swal from "sweetalert2";

const AppointmentModal = ({ doctor }) => {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    // console.log("Booking appointment:", doctor.name, "on", date);
    if (!date) {
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);

    if(selectedDate < today){
      Swal.fire({
        title: "You can't add those dates which is already passed!!",
        icon: "error",
        draggable: true,
      });
      return;
    }

    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;

    if (!user?.email) {
      Swal.fire({
        title: "User not logged in!!",
        icon: "error",
        draggable: true
      });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token")

      const res = await axios.post("https://appointment-manager-node.onrender.com/api/v1/appointments", {
        doctorId: doctor.id,
        date: date
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Appoinment booked", res.data);
      Swal.fire({
        title: "Appoinment booked Successfully!!",
        icon: "success",
        draggable: true
      });
      setDate("");
    }

    catch (error) {
      console.log(error);
      Swal.fire({
        title: "Something went wrong!!",
        icon: "error",
        draggable: true
      });
    }

    finally {
      setLoading(false)
    }
  };

  return (
    <Dialog className='rounded-xl'>
      <DialogTrigger asChild>
        <Button variant="outline">Book Appointment</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="font-medium">{doctor.name}</p>
            <p className="text-sm text-gray-500">{doctor.specialization}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Select Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" disabled={!date || loading} onClick={handleConfirm}>
            {
              loading ? "Booking...." : "Confirm"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
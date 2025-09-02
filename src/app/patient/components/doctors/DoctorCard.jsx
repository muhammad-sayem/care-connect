"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="w-full max-w-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center p-4">

        <img
          src={doctor.photourl || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-400"
        />

        <CardTitle className="text-lg font-semibold text-gray-800 text-center">
          {doctor.name}
        </CardTitle>

        <CardDescription className="text-sm text-gray-500 text-center mt-1">
          {doctor.specialization || "General Practitioner"}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        <p className="text-gray-600 text-sm text-center">
          Available for appointments. Click to view profile.
        </p>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;

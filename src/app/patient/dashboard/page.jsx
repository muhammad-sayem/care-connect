import ClientWrapper from "../../../components/ClinetWrapper";
import LogoutButton from "../../../components/LogoutButton";
import AllDoctors from "../components/doctors/AllDoctors";
import MyAppointments from "../components/my-appointments/MyAppointments";

const PatientDashboard = () => {
  return (
    <div>
      <ClientWrapper>
        <AllDoctors />
        <MyAppointments />
      </ClientWrapper>
    </div>
  );
};

export default PatientDashboard;
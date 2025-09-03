import ClientWrapper from "../../../components/ClinetWrapper";
import LogoutButton from "../../../components/LogoutButton";
import AppointmentList from "../components/appointnment-list/AppointmentList";

const DoctorDashboard = () => {
  return (
    <div>
      <ClientWrapper>
        <AppointmentList />
      </ClientWrapper>
    </div>
  );
};

export default DoctorDashboard;
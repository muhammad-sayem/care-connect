import ClientWrapper from "../../../components/ClinetWrapper";
import AllDoctors from "../components/doctors/AllDoctors";

const PatientDashboard = () => {
  return (
    <div>
      <ClientWrapper>
        <AllDoctors />
      </ClientWrapper>
    </div>
  );
};

export default PatientDashboard;
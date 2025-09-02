import ClientWrapper from "../../../components/ClinetWrapper";
import AllDoctors from "../components/doctors/AllDoctors";

const PatientDashboard = () => {
  return (
    <div>
      <h2> Patient Dashboard </h2>
      <ClientWrapper>
        <AllDoctors />
      </ClientWrapper>
    </div>
  );
};

export default PatientDashboard;
const AppointmentCard = ({ appt }) => {
  return (

    <div>
      <p><strong>Patient:</strong> {appt.patient?.name}</p>
      <p><strong>Email:</strong> {appt.patient?.email}</p>
      <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
      <p><strong>Status:</strong> {appt.status}</p>
    </div>

  );
};

export default AppointmentCard;
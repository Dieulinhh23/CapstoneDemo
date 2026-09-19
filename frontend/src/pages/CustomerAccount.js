import { customerAppointments, loyaltyPoints } from '../data/mockData';

export default function CustomerAccount() {
  return (
    <section className="page">
      <h1>My Account</h1>

      <div className="stat-row">
        <div className="stat-box">
          <span className="stat-value">{loyaltyPoints}</span>
          <span className="stat-label">Loyalty Points</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{customerAppointments.length}</span>
          <span className="stat-label">Total Appointments</span>
        </div>
      </div>

      <h2>Appointment History</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Technician</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customerAppointments.map((a) => (
            <tr key={a.id}>
              <td>{a.service}</td>
              <td>{a.technician}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td><span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

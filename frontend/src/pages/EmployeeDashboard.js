import { employeeSchedule, employeeAppointments } from '../data/mockData';

export default function EmployeeDashboard() {
  return (
    <section className="page">
      <h1>Employee Dashboard</h1>

      <h2>My Schedule</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {employeeSchedule.map((s) => (
            <tr key={s.id}>
              <td>{s.day}</td>
              <td>{s.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Upcoming Appointments</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {employeeAppointments.map((a) => (
            <tr key={a.id}>
              <td>{a.customer}</td>
              <td>{a.service}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

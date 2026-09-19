import { employees, services, inventory, reports } from '../data/mockData';

export default function AdminDashboard() {
  return (
    <section className="page">
      <h1>Admin Dashboard</h1>

      <div className="stat-row">
        <div className="stat-box">
          <span className="stat-value">${reports.weeklyIncome}</span>
          <span className="stat-label">Weekly Income</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{reports.totalAppointments}</span>
          <span className="stat-label">Appointments</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{reports.mostPopularService}</span>
          <span className="stat-label">Top Service</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{reports.busiestDay}</span>
          <span className="stat-label">Busiest Day</span>
        </div>
      </div>

      <h2>Employees</h2>
      <table className="data-table">
        <thead>
          <tr><th>Name</th><th>Role</th><th>Status</th></tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.role}</td>
              <td><span className={`badge ${e.status === 'Active' ? 'upcoming' : 'completed'}`}>{e.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Services & Prices</h2>
      <table className="data-table">
        <thead>
          <tr><th>Service</th><th>Price</th><th>Duration</th></tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>${s.price}</td>
              <td>{s.durationMin} min</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Inventory</h2>
      <table className="data-table">
        <thead>
          <tr><th>Item</th><th>Quantity</th><th>Status</th></tr>
        </thead>
        <tbody>
          {inventory.map((i) => (
            <tr key={i.id}>
              <td>{i.item}</td>
              <td>{i.qty}</td>
              <td>{i.lowStock ? <span className="badge low">Low Stock</span> : <span className="badge upcoming">OK</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

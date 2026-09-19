import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <section className="page">
      <p className="eyebrow">AI-Powered Nail Salon Platform</p>
      <h1>Book faster. Manage smarter.</h1>
      <p className="lead">
        NailFlow brings booking, scheduling, inventory, and business analytics
        into one platform for salon owners, employees, and customers.
      </p>

      <div className="card-grid">
        <Link to="/booking" className="card">
          <h3>Customers</h3>
          <p>Browse services, pick a technician, and book an appointment.</p>
        </Link>
        <Link to="/employee" className="card">
          <h3>Employees</h3>
          <p>View your schedule and upcoming appointments.</p>
        </Link>
        <Link to="/admin" className="card">
          <h3>Salon Owners</h3>
          <p>Manage staff, services, inventory, and view reports.</p>
        </Link>
      </div>
    </section>
  );
}

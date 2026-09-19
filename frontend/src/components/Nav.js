import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/booking', label: 'Book Appointment' },
  { to: '/ai-assistant', label: 'AI Assistant' },
  { to: '/customer', label: 'My Account' },
  { to: '/employee', label: 'Employee' },
  { to: '/admin', label: 'Admin' },
];

export default function Nav() {
  return (
    <header className="topbar">
      <span className="brand">NailFlow</span>
      <nav className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

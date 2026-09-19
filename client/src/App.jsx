import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function App() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price_cents: '',
    duration_minutes: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchServices() {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      if (!response.ok) {
        throw new Error('Unable to load services.');
      }
      const data = await response.json();
      setServices(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch services.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price_cents: Number(form.price_cents),
          duration_minutes: Number(form.duration_minutes),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add service.');
      }

      setForm({
        name: '',
        description: '',
        price_cents: '',
        duration_minutes: '',
      });
      await fetchServices();
    } catch (err) {
      setError(err.message || 'Failed to add service.');
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Nail salon scheduling</p>
          <h1>Services</h1>
        </div>
      </header>

      <section className="panel">
        <h2>Add a service</h2>

        <form className="service-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Gel Manicure"
            />
          </label>

          <label>
            Description
            <input
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Classic gel polish finish"
            />
          </label>

          <div className="two-col">
            <label>
              Price (cents)
              <input
                type="number"
                value={form.price_cents}
                onChange={(event) => setForm({ ...form, price_cents: event.target.value })}
                placeholder="2500"
              />
            </label>

            <label>
              Duration (minutes)
              <input
                type="number"
                value={form.duration_minutes}
                onChange={(event) => setForm({ ...form, duration_minutes: event.target.value })}
                placeholder="30"
              />
            </label>
          </div>

          <button type="submit">Add service</button>
        </form>
      </section>

      <section className="panel">
        <h2>Service menu</h2>

        {loading ? (
          <p>Loading services...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{service.description || '—'}</td>
                  <td>${(service.price_cents / 100).toFixed(2)}</td>
                  <td>{service.duration_minutes} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

import { useState } from 'react';
import { services, technicians, availableSlots } from '../data/mockData';

export default function Booking() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [confirmed, setConfirmed] = useState(null);

  function handleBook(event) {
    event.preventDefault();
    if (!selectedService || !selectedTech || !selectedSlot) return;

    const service = services.find((s) => s.id === selectedService);
    const tech = technicians.find((t) => t.id === selectedTech);
    setConfirmed({ service: service.name, technician: tech.name, slot: selectedSlot });
  }

  return (
    <section className="page">
      <h1>Book an Appointment</h1>

      <form className="booking-form" onSubmit={handleBook}>
        <label>
          Service
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — ${s.price} ({s.durationMin} min)
              </option>
            ))}
          </select>
        </label>

        <label>
          Technician
          <select value={selectedTech} onChange={(e) => setSelectedTech(e.target.value)}>
            <option value="">Any available</option>
            {technicians.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.specialties.join(', ')})
              </option>
            ))}
          </select>
        </label>

        <div className="slot-picker">
          <p className="field-label">Available times</p>
          <div className="slot-grid">
            {availableSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                className={slot === selectedSlot ? 'slot active' : 'slot'}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button type="submit">Confirm Booking</button>
      </form>

      {confirmed && (
        <div className="message-box">
          Booked {confirmed.service} with {confirmed.technician} at {confirmed.slot}.
        </div>
      )}
    </section>
  );
}

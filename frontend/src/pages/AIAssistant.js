import { useState } from 'react';

const CANNED_REPLY =
  "This is a placeholder response. Once connected to the backend, I'll " +
  'search availability and recommend services based on your request.';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hi! Tell me what service and time you want, e.g. "gel manicure this Saturday after 2 PM".' },
  ]);

  function handleSend(event) {
    event.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: input },
      { from: 'ai', text: CANNED_REPLY },
    ]);
    setInput('');
  }

  return (
    <section className="page">
      <h1>AI Booking Assistant</h1>
      <p className="lead">Describe what you want and the assistant will help you book it.</p>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === 'ai' ? 'chat-bubble ai' : 'chat-bubble user'}>
            {msg.text}
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="I want a gel manicure this Saturday after 2 PM..."
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}

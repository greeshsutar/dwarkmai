import { useState } from 'react';
import { PROJECT } from '../data/project';
import './Enquiry.css';

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be handled in later phases
    console.log('Enquiry submitted:', formData);
  };

  return (
    <section className="enquiry section--large" id="enquiry">
      <div className="container">
        <div className="enquiry__layout">
          <div className="enquiry__header">
            <span className="arch-label">ENQUIRY</span>
            <h2 className="enquiry__title text-display">
              COME HOME TO<br />{PROJECT.name}.
            </h2>
          </div>

          <form className="enquiry__form" onSubmit={handleSubmit}>
            <div className="form-field">
              <input
                type="text"
                name="name"
                placeholder="NAME"
                value={formData.name}
                onChange={handleChange}
                required
                id="enquiry-name"
                autoComplete="name"
              />
            </div>

            <div className="form-field">
              <input
                type="tel"
                name="phone"
                placeholder="PHONE"
                value={formData.phone}
                onChange={handleChange}
                required
                id="enquiry-phone"
                autoComplete="tel"
              />
            </div>

            <div className="form-field">
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={handleChange}
                id="enquiry-email"
                autoComplete="email"
              />
            </div>

            <div className="form-field">
              <textarea
                name="message"
                placeholder="MESSAGE"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                id="enquiry-message"
              />
            </div>

            <button type="submit" className="btn-primary enquiry__submit" id="enquiry-submit">
              ENQUIRE NOW <span className="arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

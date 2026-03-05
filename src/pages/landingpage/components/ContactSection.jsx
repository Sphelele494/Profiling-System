import React from 'react';
import { 
  MessageCircle, Phone, Mail, MapPin, Send, CheckCircle,
  Facebook, Twitter, Linkedin, Instagram, Youtube
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactSection = ({
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactMessage,
  setContactMessage,
  contactSubmitted,
  handleContactSubmit
}) => {
  return (
    <section id="contact" className="contact-section" style={{ padding: '6rem 2rem', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#f0fdf4', borderRadius: '50px', marginBottom: '2rem' }}>
            <MessageCircle size={20} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: 600 }}>Get in Touch</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#333', marginBottom: '1rem' }}>
            We're Here to <span style={{ color: '#10b981' }}>Help</span>
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666', fontSize: '1.125rem' }}>
            Have questions? Reach out to us through any of these channels.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          {/* Contact Info */}
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: '#fafafa', borderRadius: '15px', marginBottom: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={24} color="#10b981" />
                </div>
                <div>
                  <h4 style={{ color: '#333', marginBottom: '0.25rem' }}>Phone</h4>
                  <p style={{ color: '#10b981', fontWeight: 600 }}>0800 123 456</p>
                  <span style={{ color: '#999', fontSize: '0.875rem' }}>24/7 Helpline</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: '#fafafa', borderRadius: '15px', marginBottom: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={24} color="#10b981" />
                </div>
                <div>
                  <h4 style={{ color: '#333', marginBottom: '0.25rem' }}>Email</h4>
                  <p style={{ color: '#10b981', fontWeight: 600 }}>support@re-link.co.za</p>
                  <span style={{ color: '#999', fontSize: '0.875rem' }}>Response within 24h</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: '#fafafa', borderRadius: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={24} color="#10b981" />
                </div>
                <div>
                  <h4 style={{ color: '#333', marginBottom: '0.25rem' }}>Head Office</h4>
                  <p style={{ color: '#666' }}>123 Hope Street</p>
                  <p style={{ color: '#666' }}>Johannesburg, 2000</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, index) => (
                <a key={index} href="#" style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#10b981';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.color = '#10b981';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={20} />
                </a>
              ))}
              <a href="#" style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0fdf4';
                  e.currentTarget.style.color = '#10b981';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ padding: '2rem', backgroundColor: '#fafafa', borderRadius: '20px' }}>
            <form onSubmit={handleContactSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e5e5e5',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#10b981'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e5e5e5',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#10b981'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e5e5e5',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#10b981'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(16,185,129,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Send size={18} />
                <span>Send Message</span>
              </button>

              {contactSubmitted && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '10px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={20} />
                  <span>Message sent successfully! Re tla go araba!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
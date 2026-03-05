import React from 'react';
import { Send, CheckCircle } from 'lucide-react';

const NewsletterSection = ({ 
  newsletterEmail, 
  setNewsletterEmail, 
  newsletterSubmitted, 
  handleNewsletterSubmit 
}) => {
  return (
    <section className="newsletter-section" style={{ padding: '4rem 2rem', backgroundColor: '#10b981' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '1rem' }}>Stay Updated</h3>
        <p style={{ color: '#ffffff', opacity: 0.9, marginBottom: '2rem' }}>
          Subscribe for job opportunities, success stories, and community updates.
        </p>

        <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            required
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '1rem 2rem',
              border: '2px solid #ffffff',
              borderRadius: '50px',
              backgroundColor: 'transparent',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#10b981';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            <Send size={18} />
            <span>Subscribe</span>
          </button>
        </form>

        {newsletterSubmitted && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '10px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <CheckCircle size={20} />
            <span>Thank you for subscribing! Ngiyabonga!</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
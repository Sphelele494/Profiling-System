import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ReLinkLogo from '../../../assets/RelinkLOGO.jpeg';
import { slogans } from '../utils/constants';

const Footer = ({ currentSloganIndex, animatedStats, handleSmoothScroll }) => {
  return (
    <footer className="footer" style={{ backgroundColor: '#1a1a1a', color: '#ffffff', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <img src={ReLinkLogo} alt="RE-Link" style={{ width: '50px', height: '50px', borderRadius: '10px', marginBottom: '1rem' }} />
            <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>RE-LINK</h3>
            <p style={{ color: '#999', fontStyle: 'italic', marginBottom: '1rem' }}>{slogans[currentSloganIndex]}</p>
            <p style={{ color: '#999', lineHeight: 1.6 }}>
              Empowering South Africans through employment, mentorship, and community reintegration since 2020.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['home', 'features', 'stats', 'stories', 'contact'].map((item) => (
                <li key={item} style={{ marginBottom: '0.75rem' }}>
                  <a 
                    href={`#${item}`} 
                    onClick={(e) => handleSmoothScroll(e, item)} 
                    style={{ color: '#999', textDecoration: 'none', transition: 'color 0.3s ease' }} 
                    onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} 
                    onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, index) => (
                <a key={index} href="#" style={{ color: '#999', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
                  <Icon size={18} />
                </a>
              ))}
              <a href="#" style={{ color: '#999', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'} onMouseLeave={(e) => e.currentTarget.style.color = '#999'}>
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#999', fontSize: '0.875rem' }}>© 2024 RE-LINK. All rights reserved. Building a better South Africa through second chances.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ color: '#10b981', fontSize: '0.875rem' }}>🇿🇦 Members: {animatedStats.members}+</span>
            <span style={{ color: '#10b981', fontSize: '0.875rem' }}>💼 Jobs: {animatedStats.jobs}+</span>
            <span style={{ color: '#10b981', fontSize: '0.875rem' }}>🏢 Companies: {animatedStats.companies}+</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
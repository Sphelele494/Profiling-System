import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { features } from '../utils/constants';

const FeaturesSection = () => {
  return (
    <section id="features" className="features-section" style={{ padding: '6rem 2rem', backgroundColor: '#fafafa' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#ffffff', borderRadius: '50px', marginBottom: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <Sparkles size={20} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: 600 }}>Comprehensive Support Ecosystem</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#333', marginBottom: '1rem' }}>
            Your Pathway to <span style={{ color: '#10b981' }}>Success</span> in SA
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666', fontSize: '1.125rem' }}>
            Everything you need for successful reintegration and career growth in South Africa.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '2rem',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease',
                border: '1px solid #f0f0f0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(16,185,129,0.1)';
                e.currentTarget.style.borderColor = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = '#f0f0f0';
              }}
            >
              <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '15px', marginBottom: '1.5rem', color: feature.color }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '1rem' }}>{feature.title}</h3>
              <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>{feature.description}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#f0fdf4', borderRadius: '50px', marginBottom: '1.5rem' }}>
                <Check size={16} color={feature.color} />
                <span style={{ color: feature.color, fontWeight: 600 }}>{feature.stats}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {feature.benefits.map((benefit, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#666' }}>
                    <Check size={14} color={feature.color} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
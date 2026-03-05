import React from 'react';
import { 
  TrendingUp, Users, Briefcase, Building, Target, 
  UsersRound, Clock, Handshake, MapPin, Flag
} from 'lucide-react';

const StatsSection = ({ statsRef, statsVisible, animatedStats }) => {
  const statCards = [
    { 
      icon: <Users size={48} />, 
      value: animatedStats.members, 
      label: 'Members', 
      target: 3426,
      suffix: '',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    { 
      icon: <Briefcase size={48} />, 
      value: animatedStats.jobs, 
      label: 'Jobs', 
      target: 1845,
      suffix: '',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #047857)'
    },
    { 
      icon: <Building size={48} />, 
      value: animatedStats.companies, 
      label: 'Companies', 
      target: 247,
      suffix: '',
      color: '#047857',
      gradient: 'linear-gradient(135deg, #047857, #065f46)'
    },
    { 
      icon: <Target size={48} />, 
      value: animatedStats.successRate, 
      label: 'Success Rate', 
      target: 94,
      suffix: '%',
      color: '#065f46',
      gradient: 'linear-gradient(135deg, #065f46, #064e3b)'
    },
    { 
      icon: <UsersRound size={48} />, 
      value: animatedStats.communities, 
      label: 'Communities', 
      target: 65,
      suffix: '',
      color: '#064e3b',
      gradient: 'linear-gradient(135deg, #064e3b, #10b981)'
    },
    { 
      icon: <Clock size={48} />, 
      value: animatedStats.trainingHours, 
      label: 'Training Hours', 
      target: 2850,
      suffix: '',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    { 
      icon: <Handshake size={48} />, 
      value: animatedStats.mentors, 
      label: 'Mentors', 
      target: 234,
      suffix: '',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #047857)'
    },
    { 
      icon: <Handshake size={48} />, 
      value: animatedStats.partners, 
      label: 'Partners', 
      target: 156,
      suffix: '',
      color: '#047857',
      gradient: 'linear-gradient(135deg, #047857, #065f46)'
    },
    { 
      icon: <MapPin size={48} />, 
      value: animatedStats.cities, 
      label: 'Cities', 
      target: 45,
      suffix: '',
      color: '#065f46',
      gradient: 'linear-gradient(135deg, #065f46, #064e3b)'
    },
    { 
      icon: <Flag size={48} />, 
      value: animatedStats.provinces, 
      label: 'Provinces', 
      target: 9,
      suffix: '',
      color: '#064e3b',
      gradient: 'linear-gradient(135deg, #064e3b, #10b981)'
    }
  ];

  return (
    <>
      {/* Stats Preview Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {statCards.slice(0, 5).map((stat, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
                  transition: 'transform 0.3s ease',
                  border: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ color: stat.color, marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, marginBottom: '0.5rem' }}>
                  {statsVisible ? stat.value : '0'}{stat.suffix}
                </div>
                <div style={{ color: '#666', fontSize: '0.875rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section" ref={statsRef} style={{ padding: '6rem 2rem', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#f0fdf4', borderRadius: '50px', marginBottom: '2rem' }}>
              <TrendingUp size={20} color="#10b981" />
              <span style={{ color: '#10b981', fontWeight: 600 }}>Real Impact, Measurable Results</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#333', marginBottom: '1rem' }}>
              Transforming <span style={{ color: '#10b981' }}>Lives</span> Across South Africa
            </h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666', fontSize: '1.125rem' }}>
              Since 2020, we've created pathways to employment and empowerment for thousands of South Africans.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {statCards.map((stat, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  backgroundColor: '#fafafa',
                  borderRadius: '15px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  border: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#10b981';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(16,185,129,0.2)';
                  const elements = e.currentTarget.querySelectorAll('*');
                  elements.forEach(el => {
                    if (el.tagName === 'DIV' && el.style.color) el.style.color = '#ffffff';
                  });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  const elements = e.currentTarget.querySelectorAll('*');
                  elements.forEach(el => {
                    if (el.tagName === 'DIV' && el.style.color) el.style.color = stat.color;
                  });
                }}
              >
                <div style={{ color: stat.color, marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: stat.color, marginBottom: '0.5rem' }}>
                  {statsVisible ? stat.value : '0'}{stat.suffix}
                </div>
                <div style={{ color: '#666', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
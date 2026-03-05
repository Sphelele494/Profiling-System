import React from 'react';
import { Trophy, MapPin, Clock, Check, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { successStories } from '../utils/constants';

const SuccessStories = ({ activeStory, setActiveStory, handleStoryPrev, handleStoryNext }) => {
  return (
    <section id="stories" className="stories-section" style={{ padding: '6rem 2rem', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#f0fdf4', borderRadius: '50px', marginBottom: '2rem' }}>
            <Trophy size={20} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: 600 }}>Real Stories, Real Impact</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#333', marginBottom: '1rem' }}>
            Transforming <span style={{ color: '#10b981' }}>Lives</span> Every Day
          </h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666', fontSize: '1.125rem' }}>
            Hear from South Africans who have successfully rebuilt their lives through RE-Link.
          </p>
        </div>

        <div style={{ position: 'relative', minHeight: '500px' }}>
          <button
            onClick={handleStoryPrev}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2px solid #e5e5e5',
              backgroundColor: '#ffffff',
              color: '#333',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.color = '#10b981';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e5e5';
              e.currentTarget.style.color = '#333';
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            {successStories.map((story, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: index === activeStory ? 1 : 0,
                  transform: `translateX(${(index - activeStory) * 100}%) scale(${index === activeStory ? 1 : 0.8})`,
                  transition: 'all 0.5s ease',
                  pointerEvents: index === activeStory ? 'auto' : 'none'
                }}
              >
                <div style={{
                  backgroundColor: '#fafafa',
                  borderRadius: '20px',
                  padding: '3rem',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 700 }}>{story.avatar}</span>
                    {story.verified && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        border: '3px solid #ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check size={12} color="#ffffff" />
                      </div>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '0.5rem' }}>{story.name}</h3>
                  <p style={{ color: '#10b981', fontWeight: 600, marginBottom: '0.25rem' }}>{story.role}</p>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>{story.company}</p>
                  <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <MapPin size={14} />
                    {story.location}
                  </p>

                  <blockquote style={{
                    fontSize: '1.125rem',
                    color: '#666',
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    marginBottom: '2rem',
                    position: 'relative'
                  }}>
                    <Quote size={30} style={{ position: 'absolute', top: '-20px', left: '-20px', opacity: 0.1, color: '#10b981' }} />
                    {story.story}
                  </blockquote>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} color="#999" />
                      <span style={{ color: '#666', fontSize: '0.875rem' }}>{story.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Trophy size={16} color="#999" />
                      <span style={{ color: '#666', fontSize: '0.875rem' }}>{story.achievement}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleStoryNext}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2px solid #e5e5e5',
              backgroundColor: '#ffffff',
              color: '#333',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.color = '#10b981';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e5e5';
              e.currentTarget.style.color = '#333';
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
          {successStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStory(index)}
              style={{
                width: index === activeStory ? '30px' : '10px',
                height: '10px',
                borderRadius: '50px',
                border: 'none',
                backgroundColor: index === activeStory ? '#10b981' : '#e5e5e5',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
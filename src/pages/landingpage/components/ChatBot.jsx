// components/ChatBot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ChevronDown, ChevronUp, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import ReLinkLogo from '../../../assets/RelinkLOGO.jpeg';
import ReLinkLogo2 from '../../../assets/ReLinkLogo2.jpeg';
import { quickReplies } from '../utils/constants';

const ChatBot = ({ 
  botActive, 
  setBotActive, 
  botMessages, 
  userInput, 
  setUserInput, 
  handleBotMessage 
}) => {
  const [minimized, setMinimized] = useState(false);
  const [cubeRotation, setCubeRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [botMessages]);

  // Continuous subtle spinning animation for the chat button
  useEffect(() => {
    const animateCube = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Elegant rotation speeds
      const speed = isHovering ? 0.015 : 0.025;
      
      const rotX = (elapsed * speed) % 360;
      const rotY = (elapsed * speed * 1.3) % 360;
      
      setCubeRotation({ x: rotX, y: rotY });
      
      animationFrameRef.current = requestAnimationFrame(animateCube);
    };

    animationFrameRef.current = requestAnimationFrame(animateCube);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovering]);

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* 3D Dice Bot Button */}
      {!botActive && (
        <div
          onClick={() => setBotActive(true)}
          className="bot-dice-button"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '70px',
            height: '70px',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'transform 0.3s ease, filter 0.3s ease',
            transform: isHovering ? 'scale(1.1)' : 'scale(1)',
            filter: isHovering ? 'drop-shadow(0 10px 20px rgba(16,185,129,0.4))' : 'drop-shadow(0 5px 15px rgba(16,185,129,0.3))',
          }}
        >
          {/* 3D Cube Container */}
          <div className="bot-cube-container" style={{
            width: '100%',
            height: '100%',
            perspective: '1000px',
            position: 'relative'
          }}>
            {/* The 3D Cube */}
            <div 
              className="bot-cube"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
                transition: 'transform 0.1s linear'
              }}
            >
              {/* Cube Faces - Emerald Green with Logos */}
              <div className="bot-cube-face front" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #10b981, #059669)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2), inset 0 -3px 5px rgba(0, 0, 0, 0.1), inset 0 3px 5px rgba(255, 255, 255, 0.5)',
                backfaceVisibility: 'visible',
                overflow: 'hidden',
                transform: 'translateZ(35px)'
              }}>
                <img src={ReLinkLogo} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              </div>
              
              <div className="bot-cube-face back" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #10b981, #059669)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2), inset 0 -3px 5px rgba(0, 0, 0, 0.1), inset 0 3px 5px rgba(255, 255, 255, 0.5)',
                backfaceVisibility: 'visible',
                overflow: 'hidden',
                transform: 'rotateY(180deg) translateZ(35px)'
              }}>
                <img src={ReLinkLogo2} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              </div>
              
              <div className="bot-cube-face right" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #10b981, #059669)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2), inset 0 -3px 5px rgba(0, 0, 0, 0.1), inset 0 3px 5px rgba(255, 255, 255, 0.5)',
                backfaceVisibility: 'visible',
                overflow: 'hidden',
                transform: 'rotateY(90deg) translateZ(35px)'
              }}>
                <img src={ReLinkLogo} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              </div>
              
              <div className="bot-cube-face left" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #10b981, #059669)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2), inset 0 -3px 5px rgba(0, 0, 0, 0.1), inset 0 3px 5px rgba(255, 255, 255, 0.5)',
                backfaceVisibility: 'visible',
                overflow: 'hidden',
                transform: 'rotateY(-90deg) translateZ(35px)'
              }}>
                <img src={ReLinkLogo2} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              </div>
              
              <div className="bot-cube-face top" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #10b981, #059669)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2), inset 0 -3px 5px rgba(0, 0, 0, 0.1), inset 0 3px 5px rgba(255, 255, 255, 0.5)',
                backfaceVisibility: 'visible',
                overflow: 'hidden',
                transform: 'rotateX(90deg) translateZ(35px)'
              }}>
                <img src={ReLinkLogo} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              </div>
              
              <div className="bot-cube-face bottom" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #10b981, #059669)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2), inset 0 -3px 5px rgba(0, 0, 0, 0.1), inset 0 3px 5px rgba(255, 255, 255, 0.5)',
                backfaceVisibility: 'visible',
                overflow: 'hidden',
                transform: 'rotateX(-90deg) translateZ(35px)'
              }}>
                <img src={ReLinkLogo2} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              </div>
            </div>

            {/* Glow Effect */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
              borderRadius: '20px',
              filter: 'blur(10px)',
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
              zIndex: -1
            }} />

            {/* Shine Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transition: 'left 0.5s ease',
              borderRadius: '12px',
              pointerEvents: 'none',
              zIndex: 2,
              ...(isHovering && { left: '100%' })
            }} />
          </div>

          {/* Online Status Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '5px',
            right: '5px',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            border: '2px solid #ffffff',
            animation: 'pulse 2s infinite',
            zIndex: 3
          }} />

          {/* Tooltip */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: 0,
            padding: '0.5rem 1rem',
            backgroundColor: '#ffffff',
            borderRadius: '50px',
            fontSize: '0.875rem',
            color: '#333',
            whiteSpace: 'nowrap',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: 4
          }}>
            Chat with our AI Assistant
          </div>
        </div>
      )}

      {/* Chat Window */}
      <div className={`chatbot ${botActive ? 'active' : ''}`} style={{
        position: 'fixed',
        bottom: '120px',
        right: '30px',
        width: '350px',
        height: minimized ? 'auto' : '500px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 999,
        transform: botActive ? 'translateY(0)' : 'translateY(20px)',
        opacity: botActive ? 1 : 0,
        visibility: botActive ? 'visible' : 'hidden',
        transition: 'all 0.3s ease'
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '1rem',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: 'pointer'
        }} onClick={() => setBotActive(!botActive)}>
          {/* Small Cube in Header */}
          <div style={{
            width: '32px',
            height: '32px',
            background: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <img src={ReLinkLogo} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>RE-LINK Assistant</h4>
            <div style={{ fontSize: '0.7rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: '#4ade80', borderRadius: '50%' }}></span>
              Online
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setMinimized(!minimized);
              }}
              style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#ffffff', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setBotActive(false);
              }}
              style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#ffffff', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Chat Messages - Only show if not minimized */}
        {!minimized && (
          <>
            <div ref={chatbotRef} style={{ flex: 1, padding: '1rem', overflowY: 'auto', backgroundColor: '#fafafa' }}>
              {botMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    maxWidth: '80%',
                    marginBottom: '1rem',
                    alignSelf: msg.fromBot ? 'flex-start' : 'flex-end',
                    marginLeft: msg.fromBot ? 0 : 'auto'
                  }}
                >
                  {msg.fromBot && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img src={ReLinkLogo} alt="" style={{ width: '60%', height: '60%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: '#666' }}>Assistant</span>
                    </div>
                  )}
                  <div style={{
                    padding: '0.75rem',
                    borderRadius: msg.fromBot ? '15px 15px 15px 0' : '15px 15px 0 15px',
                    backgroundColor: msg.fromBot ? '#ffffff' : '#10b981',
                    color: msg.fromBot ? '#333' : '#ffffff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                  }}>
                    {msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.625rem', color: '#999', marginTop: '0.25rem', textAlign: msg.fromBot ? 'left' : 'right' }}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies & Input */}
            <div style={{ padding: '0.5rem', backgroundColor: '#ffffff', borderTop: '1px solid #e5e5e5' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleBotMessage(reply)}
                    style={{
                      padding: '0.25rem 0.75rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '50px',
                      backgroundColor: '#f5f5f5',
                      fontSize: '0.75rem',
                      color: '#666',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#10b981';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#10b981';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                      e.currentTarget.style.color = '#666';
                      e.currentTarget.style.borderColor = '#e5e5e5';
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleBotMessage(userInput)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #e5e5e5',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => handleBotMessage(userInput)}
                  disabled={!userInput.trim()}
                  style={{
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '10px',
                    backgroundColor: userInput.trim() ? '#10b981' : '#cccccc',
                    color: '#ffffff',
                    cursor: userInput.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (userInput.trim()) {
                      e.currentTarget.style.backgroundColor = '#059669';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (userInput.trim()) {
                      e.currentTarget.style.backgroundColor = '#10b981';
                    }
                  }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
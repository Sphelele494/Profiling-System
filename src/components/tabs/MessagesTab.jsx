import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle, Send, Phone, Archive, MoreVertical,
  Image, FileText, ShieldCheck, X, ChevronRight
} from "lucide-react";

// FIXED: Correct imports with proper paths and file extensions
// Based on your assets folder, these should be .png files
import BuildRightLogo from '../../assets/buildright_thumb.jpg';  // Changed from .jpg to .png
import LogisticsSALogo from '../../assets/logistics_thumb.jpg'; // Changed from .jpg to .png
import CallComLogo from '../../assets/callcom_thumb.jpg';        // Changed from .jpg to .png

function MessagesTab() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [isTyping, setIsTyping] = useState(false);

  const messageEndRef = useRef(null);

  // Conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      employer: "BuildRight Construction",
      logo: BuildRightLogo,
      lastMessage: "Hi there! We'd like to schedule an interview...",
      time: "10:30 AM",
      unread: true,
      verified: true,
      messages: [
        { id: 1, sender: "employer", content: "Hello! We reviewed your profile and were impressed with your construction experience. Would you be available for an interview next week at our Soweto office?", time: "10:30 AM", read: true },
        { id: 2, sender: "user", content: "Yes, I would be very interested! I'm available Monday through Wednesday next week.", time: "10:35 AM", read: true },
        { id: 3, sender: "employer", content: "Great! Let's schedule for Tuesday at 2 PM at our Johannesburg office. The address is 123 Construction Street, Soweto.", time: "10:36 AM", read: true }
      ]
    },
    {
      id: 2,
      employer: "Unitrans Logistics",
      logo: LogisticsSALogo,
      lastMessage: "Thank you for your application...",
      time: "Yesterday",
      unread: false,
      verified: true,
      messages: [
        { id: 1, sender: "employer", content: "Thank you for applying for the Warehouse Manager position. We'll review your application and get back to you within 3 business days.", time: "Yesterday, 3:45 PM", read: true }
      ]
    },
    {
      id: 3,
      employer: "Vodacom South Africa",
      logo: CallComLogo,
      lastMessage: "We have an urgent opening that matches your profile...",
      time: "Just now",
      unread: true,
      verified: true,
      messages: [
        { id: 1, sender: "employer", content: "We have an urgent opening for a Call Center Team Leader that matches your profile. Would you be interested in discussing this opportunity?", time: "Just now", read: false }
      ]
    }
  ]);

  // Filter conversations
  const filteredConversations = conversations.filter(convo => {
    if (filter === "Unread") return convo.unread;
    return true;
  });

  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0]);
      setMessages(conversations[0].messages);
    }
  }, [conversations, selectedConversation]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Update last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: messageInput, time: "Just now", unread: false }
        : conv
    ));
    
    setMessageInput("");
    
    // Simulate reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botReply = {
        id: updatedMessages.length + 1,
        sender: "employer",
        content: "Thank you for your message. Our team will get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      setMessages(prev => [...prev, botReply]);
    }, 1500);
  };

  const handleConversationSelect = (convo) => {
    setSelectedConversation(convo);
    setMessages(convo.messages);
    
    // Mark as read
    setConversations(prev => prev.map(c => 
      c.id === convo.id ? { ...c, unread: false } : c
    ));
  };

  // Handle image error - fallback to initials
  const handleImageError = (e, employer) => {
    e.target.onerror = null;
    e.target.style.display = 'none';
    e.target.parentElement.innerHTML = `
      <div class="avatar-fallback" style="
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #10b981;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 1rem;
      ">${employer.charAt(0)}</div>
    `;
  };

  return (
    <div className="messages-tab">
      <div className="messages-header">
        <h3 className="section-title">
          <MessageCircle size={28} />
          <span>Messages</span>
        </h3>
        <p className="section-subtitle">Communicate with verified South African employers only</p>
      </div>

      <div className="messages-container">
        {/* Conversations List */}
        <div className="conversations-sidebar">
          <div className="conversations-header">
            <h4 className="conversations-title">Employer Conversations</h4>
            <div className="conversation-filters">
              <button 
                className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                onClick={() => setFilter('All')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'Unread' ? 'active' : ''}`}
                onClick={() => setFilter('Unread')}
              >
                Unread
              </button>
            </div>
          </div>
          
          <div className="conversations-list">
            {filteredConversations.map(convo => (
              <div 
                key={convo.id}
                className={`conversation-item ${selectedConversation?.id === convo.id ? 'active' : ''} ${convo.unread ? 'unread' : ''}`}
                onClick={() => handleConversationSelect(convo)}
              >
                <div className="conversation-avatar">
                  <img 
                    src={convo.logo} 
                    alt={convo.employer}
                    onError={(e) => handleImageError(e, convo.employer)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                  {convo.verified && (
                    <div className="verified-indicator">
                      <ShieldCheck size={10} />
                    </div>
                  )}
                </div>
                <div className="conversation-details">
                  <div className="conversation-header">
                    <h5 className="employer-name">{convo.employer}</h5>
                    <span className="conversation-time">{convo.time}</span>
                  </div>
                  <p className="conversation-preview">{convo.lastMessage}</p>
                  {convo.unread && <span className="unread-indicator"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-partner">
                  <div className="partner-avatar">
                    <img 
                      src={selectedConversation.logo} 
                      alt={selectedConversation.employer}
                      onError={(e) => handleImageError(e, selectedConversation.employer)}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </div>
                  <div className="partner-info">
                    <h4 className="partner-name">{selectedConversation.employer}</h4>
                    <div className="partner-status">
                      <div className="status-dot online"></div>
                      <span>Verified South African Employer</span>
                    </div>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="chat-action-btn">
                    <Phone size={18} />
                  </button>
                  <button className="chat-action-btn">
                    <Archive size={18} />
                  </button>
                  <button className="chat-action-btn">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              
              <div className="chat-messages">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p>{message.content}</p>
                      <span className="message-time">{message.time}</span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="typing-indicator">
                    <span>{selectedConversation.employer} is typing...</span>
                  </div>
                )}
                <div ref={messageEndRef} />
              </div>
              
              <div className="chat-input-area">
                <div className="message-input-container">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="message-input"
                  />
                  <button 
                    className="send-message-btn"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-conversation-selected">
              <MessageCircle size={64} />
              <h4>Select a conversation</h4>
              <p>Choose a South African employer from the list to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagesTab;
import { useState, useEffect } from 'react';

export function useMessages({ selectedConversation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.messages || []);
    }
  }, [selectedConversation]);

  const sendMessage = (content, sender) => {
    return {
      id: Date.now(),
      sender,
      content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
  };

  const addReply = (conversationId) => {
    return {
      id: Date.now() + 1,
      sender: 'employer',
      content: "Thank you for your message. Our team will get back to you shortly.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
  };

  return {
    messages,
    setMessages,
    sendMessage,
    addReply
  };
}
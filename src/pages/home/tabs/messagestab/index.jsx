import React, { useState, useEffect } from 'react';
import { ConversationsSidebar } from "./components/Conversations/ConversationsSidebar.jsx";
import { ChatArea } from "./components/Chat/ChatArea.jsx";
import { NoConversationSelected } from './components/EmptyState/NoConversationSelected.jsx';
import { useConversations } from './hooks/useConversations.js';
import { useMessages } from './hooks/useMessages.js';
import { useTyping } from './hooks/useTyping.js';
import './components/styles/messages.css';  // Updated CSS import path

function MessagesTab({ user }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [filter, setFilter] = useState('All');
  const [messageInput, setMessageInput] = useState('');
  
  const { conversations, filteredConversations, markAsRead, updateLastMessage } = useConversations({ filter });
  const { messages, setMessages, sendMessage, addReply } = useMessages({ selectedConversation });
  const { isTyping, startTyping, stopTyping } = useTyping();

  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations, selectedConversation]);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    markAsRead(conversation.id);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    // Send user message
    const newMessage = sendMessage(messageInput, 'user');
    setMessages(prev => [...prev, newMessage]);
    updateLastMessage(selectedConversation.id, messageInput);
    setMessageInput('');

    // Simulate employer reply
    startTyping();
    setTimeout(() => {
      stopTyping();
      const reply = addReply(selectedConversation.id);
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="messages-tab">
      {/* MessagesHeader component removed since it doesn't exist */}
      <div className="messages-header">
        <h2>Messages</h2>
      </div>
      
      <div className="messages-container">
        <ConversationsSidebar
          conversations={filteredConversations}
          selectedConversation={selectedConversation}
          filter={filter}
          onFilterChange={setFilter}
          onConversationSelect={handleConversationSelect}
        />

        {selectedConversation ? (
          <ChatArea
            conversation={selectedConversation}
            messages={messages}
            isTyping={isTyping}
            messageInput={messageInput}
            onMessageChange={setMessageInput}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
          />
        ) : (
          <NoConversationSelected />
        )}
      </div>
    </div>
  );
}

export default MessagesTab;
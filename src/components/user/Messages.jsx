import React from 'react';
import Layout from '../shared/Layout';
import { Search, Send } from 'lucide-react';

const UserMessages = () => {
  const conversations = [
    { id: 1, name: 'John Smith', role: 'Mentor', lastMessage: 'Great progress on your certification!', time: '2h ago', unread: 2 },
    { id: 2, name: 'TechStart Inc.', role: 'Recruiter', lastMessage: 'We would like to schedule an interview', time: '5h ago', unread: 1 },
    { id: 3, name: 'Sarah Johnson', role: 'NGO Director', lastMessage: 'I have submitted your referral', time: '1d ago', unread: 0 },
  ];
  
  return (
    <Layout userType="user" userName="Marcus Johnson" userEmail="marcus.email.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communicate with mentors, recruiters, and your network</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 h-[600px]">
            {/* Conversations List */}
            <div className="col-span-4 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto">
                {conversations.map((conv) => (
                  <div key={conv.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{conv.name}</h3>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{conv.role}</p>
                    <p className="text-sm text-gray-700 truncate">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="inline-block mt-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                        {conv.unread} new
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message View */}
            <div className="col-span-8 flex flex-col">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-bold text-gray-900">Select a conversation</h3>
                <p className="text-sm text-gray-600">Choose a conversation from the list to view messages</p>
              </div>
              
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>No conversation selected</p>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    disabled
                  />
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors" disabled>
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserMessages;

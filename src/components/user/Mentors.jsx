import React, { useState, useEffect } from 'react';
import Layout from '../shared/Layout';
import { GraduationCap, Mail, Calendar, Search, Filter, X, Send } from 'lucide-react';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  const specialties = [
    'IT & Technology',
    'Career Development',
    'Construction & Trades',
    'Healthcare',
    'Business & Entrepreneurship',
    'Education',
    'Arts & Creative',
    'Other'
  ];

  // Load data from localStorage on mount
  useEffect(() => {
    const storedMentors = localStorage.getItem('mentors');
    const storedMessages = localStorage.getItem('mentorMessages');
    
    if (storedMentors) {
      setMentors(JSON.parse(storedMentors));
    } else {
      // Initialize with sample data
      const initialMentors = [
        { 
          id: 1, 
          name: 'John Smith', 
          specialty: 'IT & Technology', 
          experience: '15 years', 
          meetings: 8,
          bio: 'Passionate about helping individuals transition into tech careers. Specialized in web development and software engineering.',
          email: 'john.smith@email.com',
          availability: 'Weekday evenings',
          joinDate: new Date().toISOString(),
          messageRequired: false
        },
        { 
          id: 2, 
          name: 'Lisa Anderson', 
          specialty: 'Career Development', 
          experience: '10 years', 
          meetings: 5,
          bio: 'Specializing in resume building, interview preparation, and career transitions for formerly incarcerated individuals.',
          email: 'lisa.anderson@email.com',
          availability: 'Flexible schedule',
          joinDate: new Date().toISOString(),
          messageRequired: false
        },
        { 
          id: 3, 
          name: 'Robert Williams', 
          specialty: 'Construction & Trades', 
          experience: '20 years', 
          meetings: 3,
          bio: 'Master carpenter helping others learn skilled trades and find apprenticeships in the construction industry.',
          email: 'robert.w@email.com',
          availability: 'Weekend mornings',
          joinDate: new Date().toISOString(),
          messageRequired: false
        },
        { 
          id: 4, 
          name: 'Maria Garcia', 
          specialty: 'Healthcare', 
          experience: '12 years', 
          meetings: 6,
          bio: 'Registered nurse with experience in helping people obtain certifications and navigate healthcare career paths.',
          email: 'maria.g@email.com',
          availability: 'Weekday afternoons',
          joinDate: new Date().toISOString(),
          messageRequired: false
        },
        { 
          id: 5, 
          name: 'David Chen', 
          specialty: 'Business & Entrepreneurship', 
          experience: '18 years', 
          meetings: 10,
          bio: 'Small business owner who mentors on entrepreneurship, financial literacy, and starting your own business.',
          email: 'david.chen@email.com',
          availability: 'Thursday evenings',
          joinDate: new Date().toISOString(),
          messageRequired: false
        },
      ];
      setMentors(initialMentors);
      localStorage.setItem('mentors', JSON.stringify(initialMentors));
    }

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save mentors to localStorage whenever they change
  useEffect(() => {
    if (mentors.length > 0) {
      localStorage.setItem('mentors', JSON.stringify(mentors));
    }
  }, [mentors]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('mentorMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      text: messageText,
      timestamp: new Date().toISOString(),
      from: 'Marcus Johnson'
    };

    setMessages([...messages, newMessage]);
    
    // Mark that message has been sent to this mentor
    const updatedMentors = mentors.map(m => 
      m.id === selectedMentor.id ? { ...m, messageRequired: true } : m
    );
    setMentors(updatedMentors);
    
    setMessageText('');
    setShowMessageModal(false);
    
    // Show success message
    alert(`Message sent to ${selectedMentor.name}! You can now schedule a meeting.`);
  };

  const handleScheduleClick = (mentor) => {
    // Check if message has been sent
    if (!mentor.messageRequired) {
      alert('Please send a message to introduce yourself before scheduling a meeting.');
      openMessageModal(mentor);
      return;
    }
    
    // If message was sent, allow scheduling
    const updatedMentors = mentors.map(m => 
      m.id === mentor.id ? { ...m, meetings: m.meetings + 1 } : m
    );
    setMentors(updatedMentors);
    alert(`Meeting scheduled with ${mentor.name}! They will contact you at marcus.email.com to confirm the time.`);
  };

  const openMessageModal = (mentor) => {
    setSelectedMentor(mentor);
    setShowMessageModal(true);
    setMessageText('');
  };

  // Filter mentors based on search and specialty
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || mentor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <Layout userType="user" userName="Marcus Johnson" userEmail="marcus.email.com">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Mentor</h1>
            <p className="text-gray-600">Connect with mentors who can guide your journey to success</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search mentors by name, specialty, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-emerald-100 text-sm mb-1">Available Mentors</p>
              <p className="text-3xl font-bold">{mentors.length}</p>
            </div>
            <div>
              <p className="text-emerald-100 text-sm mb-1">Specialties</p>
              <p className="text-3xl font-bold">{new Set(mentors.map(m => m.specialty)).size}</p>
            </div>
            <div>
              <p className="text-emerald-100 text-sm mb-1">Total Mentoring Sessions</p>
              <p className="text-3xl font-bold">{mentors.reduce((sum, m) => sum + m.meetings, 0)}</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">How it works</h3>
              <p className="text-sm text-blue-700">
                Send a message to introduce yourself to a mentor. Once you've sent a message, you'll be able to schedule a meeting with them.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                  <p className="text-sm text-emerald-600 font-medium">{mentor.specialty}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{mentor.bio}</p>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Experience:</span> {mentor.experience}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Sessions completed:</span> {mentor.meetings}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Available:</span> {mentor.availability}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => openMessageModal(mentor)}
                  className={`flex-1 ${mentor.messageRequired ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-emerald-600 hover:bg-emerald-700 text-white'} px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2`}
                >
                  <Mail className="w-4 h-4" />
                  {mentor.messageRequired ? 'Message Sent' : 'Send Message'}
                </button>
                <button 
                  onClick={() => handleScheduleClick(mentor)}
                  className={`flex-1 ${mentor.messageRequired ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2`}
                  disabled={!mentor.messageRequired}
                >
                  <Calendar className="w-4 h-4" />
                  Schedule
                </button>
              </div>
              
              {!mentor.messageRequired && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Send a message first to schedule
                </p>
              )}
            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Message Modal */}
        {showMessageModal && selectedMentor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Send Message to {selectedMentor.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">{selectedMentor.specialty}</p>
                  </div>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Introduce yourself and explain why you'd like to connect
                    </label>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Hi, my name is Marcus and I'm interested in learning more about..."
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Tip:</span> Be specific about what you're looking for help with and what your goals are. This helps mentors understand how they can best support you.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowMessageModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        messageText.trim() 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Mentors;
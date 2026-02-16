import React from 'react';
import Layout from '../shared/Layout';
import { Search, Filter, MapPin, Star } from 'lucide-react';

const FindCandidates = () => {
  const candidates = [
    { id: 1, name: 'Robert Garcia', initials: 'RG', score: 92, skills: ['IT Support', 'Networking', 'Hardware'], location: 'New York, NY', experience: '3 years' },
    { id: 2, name: 'Marcus Johnson', initials: 'MJ', score: 78, skills: ['IT Support', 'Hardware Repair', 'Customer Service'], location: 'Newark, NJ', experience: '2 years' },
    { id: 3, name: 'Anthony Brown', initials: 'AB', score: 81, skills: ['Warehouse', 'Logistics', 'Forklift'], location: 'Jersey City, NJ', experience: '5 years' },
    { id: 4, name: 'Jennifer Lee', initials: 'JL', score: 88, skills: ['Data Entry', 'Microsoft Office', 'Administration'], location: 'Remote', experience: '4 years' },
  ];
  
  return (
    <Layout userType="recruiter" userName="Sarah Chen" userEmail="sarah.techcoop.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Candidates</h1>
          <p className="text-gray-600">Search and discover qualified candidates</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by skills, location, or name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-emerald-500 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-blue-700">{candidate.initials}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-900">{candidate.score}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{candidate.location}</span>
                    <span>•</span>
                    <span>{candidate.experience}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {candidate.skills.map((skill, index) => (
                  <span key={index} className="bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  View Profile
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FindCandidates;

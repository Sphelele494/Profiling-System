import React from 'react';
import Layout from '../shared/Layout';
import { Plus, MapPin, DollarSign, Clock, Edit, Trash2 } from 'lucide-react';

const JobPostings = () => {
  const jobs = [
    { id: 1, title: 'IT Support Specialist', location: 'New York, NY', salary: '$45,000 - $55,000', type: 'Full-time', applications: 23, posted: '2 weeks ago', status: 'Active' },
    { id: 2, title: 'Data Entry Clerk', location: 'Remote', salary: '$35,000 - $42,000', type: 'Full-time', applications: 15, posted: '1 week ago', status: 'Active' },
    { id: 3, title: 'Warehouse Associate', location: 'Newark, NJ', salary: '$38,000 - $45,000', type: 'Full-time', applications: 9, posted: '3 days ago', status: 'Active' },
  ];
  
  return (
    <Layout userType="recruiter" userName="Sarah Chen" userEmail="sarah.techcoop.com">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Postings</h1>
            <p className="text-gray-600">Manage your active and past job postings</p>
          </div>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Post New Job
          </button>
        </div>
        
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {job.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-600">Posted {job.posted}</span>
                  <span className="text-sm font-semibold text-emerald-600">{job.applications} applications</span>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Applications
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default JobPostings;

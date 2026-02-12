import React from 'react';
import Layout from '../shared/Layout';
import { MapPin, DollarSign, Clock } from 'lucide-react';

const JobOpportunities = () => {
  const jobs = [
    { id: 1, title: 'IT Support Specialist', company: 'TechStart Inc.', location: 'New York, NY', salary: '$45,000 - $55,000', type: 'Full-time', match: '92%' },
    { id: 2, title: 'Data Entry Clerk', company: 'DataCore Solutions', location: 'Remote', salary: '$35,000 - $42,000', type: 'Full-time', match: '85%' },
    { id: 3, title: 'Warehouse Associate', company: 'LogiShip Co.', location: 'Newark, NJ', salary: '$38,000 - $45,000', type: 'Full-time', match: '78%' },
    { id: 4, title: 'Customer Service Rep', company: 'Support Plus', location: 'Remote', salary: '$32,000 - $40,000', type: 'Full-time', match: '75%' },
    { id: 5, title: 'Maintenance Technician', company: 'BuildRight Corp', location: 'Jersey City, NJ', salary: '$42,000 - $50,000', type: 'Full-time', match: '70%' },
  ];
  
  return (
    <Layout userType="user" userName="Marcus Johnson" userEmail="marcus@email.com">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
            <p className="text-gray-600">Browse jobs matched to your skills and experience</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-6 border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-base text-gray-700 mb-3">{job.company}</p>
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
                  <span className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full">
                    {job.match} match
                  </span>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobOpportunities;

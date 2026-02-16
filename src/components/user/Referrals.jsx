import React from 'react';
import Layout from '../shared/Layout';
import { UserCheck, Clock, CheckCircle2 } from 'lucide-react';

const Referrals = () => {
  const referrals = [
    { id: 1, name: 'John Smith', role: 'Mentor', status: 'verified', date: '2 weeks ago' },
    { id: 2, name: 'Sarah Johnson', role: 'NGO Director', status: 'pending', date: '3 days ago' },
    { id: 3, name: 'Michael Brown', role: 'Program Coordinator', status: 'verified', date: '1 month ago' },
  ];
  
  return (
    <Layout userType="user" userName="Marcus Johnson" userEmail="marcus.email.com">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Referrals</h1>
            <p className="text-gray-600">Manage your verified referrals</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Request New Referral
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referrals.map((referral) => (
            <div key={referral.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900">{referral.name}</h3>
                  <p className="text-sm text-gray-600">{referral.role}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{referral.date}</span>
                {referral.status === 'verified' ? (
                  <span className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-orange-600 font-medium">
                    <Clock className="w-4 h-4" />
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Referrals;

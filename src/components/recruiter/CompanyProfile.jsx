import React from 'react';
import Layout from '../shared/Layout';
import { Building2, MapPin, Users, Calendar, Globe, Edit } from 'lucide-react';

const CompanyProfile = () => {
  return (
    <Layout userType="recruiter" userName="Sarah Chen" userEmail="sarah.techcoop.com">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Profile</h1>
            <p className="text-gray-600">Manage your company information and branding</p>
          </div>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Edit className="w-5 h-5" />
            Edit Profile
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Company Header */}
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 h-32" />
          
          <div className="p-6">
            <div className="flex items-start gap-6 -mt-16 mb-6">
              <div className="w-32 h-32 bg-white rounded-xl shadow-lg flex items-center justify-center border-4 border-white">
                <Building2 className="w-16 h-16 text-emerald-600" />
              </div>
              <div className="mt-16 flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">TechStart Cooperative</h2>
                <p className="text-gray-600 mb-4">Empowering second-chance employment through technology</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-gray-900">New York, NY</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Company Size</p>
                    <p className="text-gray-900">50-200 employees</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Founded</p>
                    <p className="text-gray-900">2018</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Website</p>
                    <a href="#" className="text-emerald-600 hover:text-emerald-700">www.techstart.coop</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">About Us</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                TechStart Cooperative is a social enterprise dedicated to providing second-chance employment opportunities in the technology sector. We believe in the power of rehabilitation and the importance of giving individuals the chance to rebuild their lives through meaningful work.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to bridge the gap between formerly incarcerated individuals and employers by providing comprehensive training, mentorship, and job placement services. We work with companies that share our values of inclusivity and second chances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyProfile;

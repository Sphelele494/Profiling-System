import React from 'react';
import { Plus, Users, ClipboardList, TrendingUp } from 'lucide-react';

const ActionCards = () => {
  const actions = [
    { 
      id: 1, 
      title: 'Post New Job', 
      icon: Plus, 
      path: '/recruiter/jobs/new',
      primary: true 
    },
    { 
      id: 2, 
      title: 'Browse Candidates', 
      icon: Users, 
      path: '/recruiter/candidates',
      primary: false 
    },
    { 
      id: 3, 
      title: 'Review Applications', 
      icon: ClipboardList, 
      path: '/recruiter/applications',
      primary: false 
    },
    { 
      id: 4, 
      title: 'Company Profile', 
      icon: TrendingUp, 
      path: '/recruiter/profile',
      primary: false 
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="action-cards">
      {actions.map((action) => {
        const Icon = action.icon;
        
        return (
          <button
            key={action.id}
            data-testid={`action-${action.title.toLowerCase().replace(/\s+/g, '-')}`}
            className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
              action.primary 
                ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-white border-gray-200 text-gray-900 hover:border-emerald-500'
            }`}
          >
            <Icon className={`w-8 h-8 mx-auto mb-3 ${action.primary ? 'text-white' : 'text-gray-700'}`} />
            <h3 className="text-base font-semibold text-center">{action.title}</h3>
          </button>
        );
      })}
    </div>
  );
};

export default ActionCards;

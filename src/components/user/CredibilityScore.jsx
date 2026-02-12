import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CredibilityScore = ({ score, breakdown }) => {
  const data = [{ value: score }, { value: 100 - score }];
  const COLORS = ['#10b981', '#e5e7eb'];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" data-testid="credibility-score-chart">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Credibility Score</h3>
        <p className="text-sm text-gray-600">Your trust score based on verified referrals</p>
      </div>
      
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                innerRadius={80}
                outerRadius={110}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-900">{score}</span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {breakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className="text-sm font-semibold text-emerald-600">{item.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CredibilityScore;

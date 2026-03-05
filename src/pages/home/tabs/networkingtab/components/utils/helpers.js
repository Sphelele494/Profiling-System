export const formatSalary = (salary) => {
  return salary;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffHours < 24) {
    return diffHours === 0 ? 'Just now' : `${diffHours} hours ago`;
  }
  if (diffHours < 48) return 'Yesterday';
  return `${Math.floor(diffHours / 24)} days ago`;
};

export const calculateMatchPercentage = (userSkills, jobSkills) => {
  // Simple match calculation - can be enhanced
  const matchCount = jobSkills.filter(skill => 
    userSkills?.includes(skill)
  ).length;
  
  return Math.round((matchCount / jobSkills.length) * 100);
};
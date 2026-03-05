export const formatMessageTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatConversationTime = (date) => {
  const now = new Date();
  const messageDate = new Date(date);
  const diffDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return messageDate.toLocaleDateString('en-ZA');
};
import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useNotices() {
  const [communityNotices, setCommunityNotices] = useLocalStorage('relink_notices', [
    {
      id: 1,
      title: "New Skills Training Program Available",
      date: "2024-02-14",
      category: "announcement",
      content: "Free construction skills training starting March 1st",
      important: true,
      expires: "2024-03-01"
    },
    {
      id: 2,
      title: "Employment Opportunity: BuildRight Hiring",
      date: "2024-02-13",
      category: "job",
      content: "10 positions available for construction workers",
      important: true,
      expires: "2024-02-28"
    },
    {
      id: 3,
      title: "RE-Link Platform Maintenance",
      date: "2024-02-15",
      category: "system",
      content: "Scheduled maintenance on Feb 20, 2-4 AM",
      important: false,
      expires: "2024-02-21"
    }
  ]);

  return {
    communityNotices
  };
}
export const mockDocuments = [
  {
    id: 1,
    name: "Police Clearance Certificate.pdf",
    type: "clearance",
    date: "2024-02-10",
    status: "verified",
    points: 30,
    size: "2.5 MB",
    verifiedBy: "SAPS Verification System",
    verifiedDate: "2024-02-11",
    expiryDate: "2025-02-10",
    version: 1,
    hash: "0x7d3a...f2b1"
  },
  {
    id: 2,
    name: "Rehabilitation Certificate.jpg",
    type: "rehab",
    date: "2024-02-05",
    status: "verified",
    points: 20,
    size: "1.8 MB",
    verifiedBy: "DCS Verification",
    verifiedDate: "2024-02-06",
    expiryDate: "2025-02-05",
    version: 1,
    hash: "0x9f4c...e3d2"
  }
];

export const mockEvents = [
  {
    id: 1,
    title: "Job Fair 2024 - Soweto",
    date: "2024-02-15",
    time: "9:00 AM - 4:00 PM",
    location: "Soweto Expo Centre",
    capacity: 500,
    registered: 342,
    points: 15,
    rsvpStatus: "attending"
  },
  {
    id: 2,
    title: "Skills Workshop - Johannesburg",
    date: "2024-02-22",
    time: "2:00 PM - 5:00 PM",
    location: "Johannesburg Career Centre",
    capacity: 100,
    registered: 67,
    points: 10,
    rsvpStatus: "pending"
  }
];

export const mockGrants = [
  {
    id: 1,
    name: "DCS Reintegration Grant",
    amount: "R5,000",
    deadline: "2024-12-31",
    documents: ["Release Certificate", "ID", "Bank Statement"],
    probability: "high",
    description: "Monthly reintegration support for ex-offenders"
  },
  {
    id: 2,
    name: "SASSA Skills Development",
    amount: "R3,500",
    deadline: "2024-06-30",
    documents: ["Training Enrollment", "ID", "Proof of Residence"],
    probability: "medium",
    description: "Training allowance for skill development"
  }
];
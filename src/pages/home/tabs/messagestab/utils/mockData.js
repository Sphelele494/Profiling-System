import BuildRightLogo from "/src/assets/buildright_thumb.jpg";
import LogisticsSALogo from "/src/assets/logistics_thumb.jpg";
import CallComLogo from "/src/assets/callcom_thumb.png";

export const mockConversations = [
  {
    id: 1,
    employer: "BuildRight Construction",
    logo: BuildRightLogo,
    lastMessage: "Hi there! We'd like to schedule an interview...",
    time: "10:30 AM",
    unread: true,
    verified: true,
    messages: [
      { id: 1, sender: "employer", content: "Hello! We reviewed your profile and were impressed with your construction experience. Would you be available for an interview next week at our Soweto office?", time: "10:30 AM", read: true },
      { id: 2, sender: "user", content: "Yes, I would be very interested! I'm available Monday through Wednesday next week.", time: "10:35 AM", read: true },
      { id: 3, sender: "employer", content: "Great! Let's schedule for Tuesday at 2 PM at our Johannesburg office. The address is 123 Construction Street, Soweto.", time: "10:36 AM", read: true }
    ]
  },
  {
    id: 2,
    employer: "Unitrans Logistics",
    logo: LogisticsSALogo,
    lastMessage: "Thank you for your application...",
    time: "Yesterday",
    unread: false,
    verified: true,
    messages: [
      { id: 1, sender: "employer", content: "Thank you for applying for the Warehouse Manager position. We'll review your application and get back to you within 3 business days.", time: "Yesterday, 3:45 PM", read: true }
    ]
  },
  {
    id: 3,
    employer: "Vodacom South Africa",
    logo: CallComLogo,
    lastMessage: "We have an urgent opening that matches your profile...",
    time: "Just now",
    unread: true,
    verified: true,
    messages: [
      { id: 1, sender: "employer", content: "We have an urgent opening for a Call Center Team Leader that matches your profile. Would you be interested in discussing this opportunity?", time: "Just now", read: false }
    ]
  }
];
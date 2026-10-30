export const upcomingEvents = [
  {
    id: "1",
    title: "Community Tree Plantation",
    category: "Environment",
    location: "Dhaka, Bangladesh",
    date: "November 15, 2026",
    time: "09:00 AM",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    description:
      "Join us for a meaningful community tree plantation event. Together, we will plant trees, create awareness about environmental protection, and make our neighborhood greener and healthier.",
    organizer: "Kindora Community",
    participants: 45,
  },
  {
    id: "2",
    title: "Food Distribution Program",
    category: "Food Support",
    location: "Satkhira, Bangladesh",
    date: "November 18, 2026",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
    description:
      "Help us distribute food packages among families who need support. Your participation can bring hope and happiness to people in our community.",
    organizer: "Kindora Volunteers",
    participants: 32,
  },
  {
    id: "3",
    title: "Free Education for Children",
    category: "Education",
    location: "Khulna, Bangladesh",
    date: "November 20, 2026",
    time: "08:30 AM",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    description:
      "Support children's education by joining our free learning initiative. Volunteers will help children with basic lessons and educational activities.",
    organizer: "Education for All",
    participants: 28,
  },
  {
    id: "4",
    title: "Winter Clothes Donation",
    category: "Donation",
    location: "Dhaka, Bangladesh",
    date: "November 25, 2026",
    time: "11:00 AM",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
    description:
      "Donate warm clothes and help underprivileged families stay safe during winter. Every small contribution can make a meaningful difference.",
    organizer: "Kindora Community",
    participants: 56,
  },
  {
    id: "5",
    title: "Neighborhood Cleaning Day",
    category: "Environment",
    location: "Chittagong, Bangladesh",
    date: "November 28, 2026",
    time: "09:30 AM",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    description:
      "Let's work together to clean our neighborhood, reduce waste, and create a healthier environment for everyone.",
    organizer: "Green Community",
    participants: 38,
  },
  {
    id: "6",
    title: "Blood Donation Campaign",
    category: "Healthcare",
    location: "Rajshahi, Bangladesh",
    date: "December 02, 2026",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4",
    description:
      "Be a hero by donating blood. Join our campaign to support patients who urgently need blood and help save lives.",
    organizer: "Kindora Volunteers",
    participants: 64,
  },
];

export const homeEvents = [
  {
    id: "7",
    title: "Community Clean-Up Day",
    category: "Environment",
    location: "Dhaka, Bangladesh",
    date: "November 15, 2026",
    time: "08:00 AM",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800",
    description:
      "Join your neighbors for a community clean-up day. We will clean streets, parks, and public spaces together to create a healthier and more beautiful neighborhood.",
    organizer: "Green Community",
    participants: 40,
  },
  {
    id: "8",
    title: "Food Distribution Program",
    category: "Food Support",
    location: "Khulna, Bangladesh",
    date: "November 18, 2026",
    time: "10:00 AM",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800",
    description:
      "Help us distribute food packages among families who need support. Your participation can bring hope and happiness to people in our community.",
    organizer: "Kindora Volunteers",
    participants: 35,
  },
  {
    id: "9",
    title: "Free Education Campaign",
    category: "Education",
    location: "Satkhira, Bangladesh",
    date: "November 20, 2026",
    time: "09:00 AM",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
    description:
      "Support children's education by joining our free learning campaign. Volunteers will help children with basic lessons and educational activities.",
    organizer: "Education for All",
    participants: 30,
  },
  {
    id: "10",
    title: "Tree Plantation Drive",
    category: "Environment",
    location: "Chittagong, Bangladesh",
    date: "November 23, 2026",
    time: "09:00 AM",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800",
    description:
      "Be part of a tree plantation drive and help make our city greener. We will plant saplings and spread awareness about protecting our environment.",
    organizer: "Green Community",
    participants: 50,
  },
  {
    id: "11",
    title: "Winter Clothes Donation",
    category: "Donation",
    location: "Rajshahi, Bangladesh",
    date: "November 25, 2026",
    time: "11:00 AM",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800",
    description:
      "Donate warm clothes and help underprivileged families stay safe during winter. Every small contribution can make a meaningful difference.",
    organizer: "Kindora Community",
    participants: 55,
  },
  {
    id: "12",
    title: "Community Health Awareness",
    category: "Healthcare",
    location: "Dhaka, Bangladesh",
    date: "November 28, 2026",
    time: "10:00 AM",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800",
    description:
      "Join our community health awareness program to learn about preventive care, healthy habits, and available health services for families.",
    organizer: "Health for All",
    participants: 42,
  },
];

export const events = [...upcomingEvents, ...homeEvents];

export function getEventById(id) {
  return events.find((event) => event.id === String(id));
}

import React from "react";
import EventsTab from "./components/event-tab";
import EventCarousel from "./components/event-carousel";

const MyEventsPage = () => {
  // Updated eventData array with more mock events
  const eventData = [
    {
      id: 1,
      title: "Community Clean-Up",
      date: "2024-07-20",
      location: "Central Park",
      tags: ["environment", "volunteer", "cleanup"],
      imageUrl: "assets/cleanup-event.jpeg",
    },
    {
      id: 2,
      title: "Tech for Good Workshop",
      date: "2024-08-15",
      location: "Innovation Hub",
      tags: ["technology", "workshop", "education"],
      imageUrl: "assets/tech-workshop.jpeg",
    },
    {
      id: 3,
      title: "City Marathon",
      date: "2024-09-05",
      location: "Downtown",
      tags: ["health", "running", "community"],
      imageUrl: "assets/city-marathon.jpeg",
    },
    {
      id: 4,
      title: "Art for Charity",
      date: "2023-10-10",
      location: "Art Gallery",
      tags: ["art", "charity", "auction"],
      imageUrl: "assets/art-charity.jpeg",
    },
    {
      id: 5,
      title: "Local Farmers Market",
      date: "2024-03-15",
      location: "Community Park",
      tags: ["local", "food", "sustainability"],
      imageUrl: "assets/farmers-market.jpeg",
    },
    {
      id: 6,
      title: "Annual Book Fair",
      date: "2024-05-20",
      location: "City Library",
      tags: ["books", "education", "community"],
      imageUrl: "assets/book-fair.jpeg",
    },
    {
      id: 7,
      title: "Eco Living Workshop",
      date: "2024-06-10",
      location: "Eco Center",
      tags: ["sustainability", "workshop", "lifestyle"],
      imageUrl: "assets/eco-workshop.jpeg",
    },
    {
      id: 8,
      title: "Neighborhood Block Party",
      date: "2024-08-30",
      location: "Lincoln Street",
      tags: ["community", "music", "food"],
      imageUrl: "assets/block-party.jpeg",
    },
    // Add more events as needed
  ];

  return (
    <div>
      <div className="navbar mb-2 w-full bg-green-500 p-4 text-center text-white">
        this is a navbar
      </div>
      <EventCarousel events={eventData} />
      <EventsTab events={eventData} />
    </div>
  );
};

export default MyEventsPage;

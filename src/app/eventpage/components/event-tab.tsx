"use client";

import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import EventCard from "./event-card"; // Make sure the import path is correct

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
  // Add more events as needed
];

const isUpcomingEvent = (date: string) => new Date(date) > new Date();

const EventsTab = () => {
  const [tabValue, setTabValue] = useState("all");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // Filter events for the "Upcoming" and "Past" tabs
  const filteredEvents = eventData.filter((event) => {
    if (tabValue === "upcoming") return isUpcomingEvent(event.date);
    if (tabValue === "past") return !isUpcomingEvent(event.date);
    return true; // For the "All" tab, return all events
  });

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tabValue}>
        <AppBar position="static">
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="All" value="all" />
            <Tab label="Upcoming" value="upcoming" />
            <Tab label="Past" value="past" />
          </Tabs>
        </AppBar>
        <TabPanel value="all">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </TabPanel>
        <TabPanel value="upcoming">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </TabPanel>
        <TabPanel value="past">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default EventsTab;

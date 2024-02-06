"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Grid,
  Container,
  useTheme,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import EventCard from "./event-card";
import type { Event } from "prisma/generated/zod";

interface EventsTabProps {
  events: Event[];
}

const EventsTab: React.FC<EventsTabProps> = ({ events }) => {
  const [tabValue, setTabValue] = useState("all");
  const theme = useTheme(); // Using the theme to apply consistent styling

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const isUpcomingEvent = (date: Date) => date > new Date();

  // Filter events for the "Upcoming" and "Past" tabs
  const filteredEvents = events.filter((event) => {
    if (tabValue === "upcoming") return isUpcomingEvent(event.timestamp);
    if (tabValue === "past") return !isUpcomingEvent(event.timestamp);
    return true; // For the "All" tab, return all events
  });

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tabValue}>
        <AppBar
          position="static"
          color="default"
          sx={{ bgcolor: theme.palette.background.paper }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            indicatorColor="secondary" // Changes the color of the indicator beneath the active tab
            textColor="secondary" // Changes the text color for better contrast
            sx={{
              ".Mui-selected": {
                // Styles for the selected tab
                color: theme.palette.secondary.main, // Adjust as needed for your theme
                fontWeight: "bold", // Makes the active tab's label bold
              },
            }}
          >
            <Tab label="All" value="all" />
            <Tab label="Upcoming" value="upcoming" />
            <Tab label="Past" value="past" />
          </Tabs>
        </AppBar>
        {["all", "upcoming", "past"].map((value) => (
          <TabPanel value={value} key={value}>
            <Container>
              <Grid container spacing={2} justifyContent="center">
                {filteredEvents.map((event) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                    <EventCard {...event} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default EventsTab;

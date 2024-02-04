"use client";

import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventCard from "./event-card"; // Adjust the path as needed

// Define an interface for the event object if you haven't already
interface Event {
  title: string;
  imageUrl: string;
}

// Define props for the EventCarousel component
interface EventCarouselProps {
  events: Event[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const eventsPerPage = 5;
  const totalPages: number = Math.ceil(events.length / eventsPerPage);

  const handleNext = (): void => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentEvents = events.slice(
    currentIndex * eventsPerPage,
    currentIndex * eventsPerPage + eventsPerPage,
  );

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center" // This centers the children horizontally
      sx={{
        width: "100%", // Ensure the Box takes the full width
      }}
    >
      <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          flexGrow: 1, // Allows this Box to grow to use available space, aiding in centering
          maxWidth: "calc(100% - 96px)", // Adjust based on IconButton sizes to prevent overflow
        }}
      >
        {currentEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            imageUrl={event.imageUrl}
            minimal={true}
          />
        ))}
      </Box>
      <IconButton
        onClick={handleNext}
        disabled={currentIndex === totalPages - 1}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default EventCarousel;

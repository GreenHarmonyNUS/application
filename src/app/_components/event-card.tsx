import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface EventInterface {
  title: string;
  description: string;
}

export const dummyEvent1: EventInterface = {
  title: "My Event",
  description: "My event has these details",
};

const EventCard: React.FC<EventInterface> = (props) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 300 }}>
      <Box sx={{ whiteSpace: "nowrap", mx: 1 }}>
        <h1 className="text-xl font-bold">{props.title}</h1>
        <p>{props.description}</p>
      </Box>
    </Card>
  );
};

export default EventCard;

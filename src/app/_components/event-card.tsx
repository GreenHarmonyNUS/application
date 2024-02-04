import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import type { Event } from "../_types/event";

const EventCard: React.FC<Event> = (props) => {
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

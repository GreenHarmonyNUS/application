import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import type { EventResponse } from "../_types/event-response";

const EventCard: React.FC<EventResponse> = (props) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 300 }}>
      <Box sx={{ whiteSpace: "nowrap", mx: 1 }}>
        <h1 className="text-xl font-bold">{props.name}</h1>
        <p>{props.details}</p>
      </Box>
    </Card>
  );
};

export default EventCard;

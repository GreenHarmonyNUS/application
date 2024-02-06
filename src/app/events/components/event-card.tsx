import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import type { EventResponse } from "../../_types/event-response";
import dayjs from "dayjs";

interface EventCardProps extends EventResponse {
  minimal?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  timestamp,
  location,
  tags,
  image,
  minimal = false,
}) => {
  // Conditionally render different layouts based on the `minimal` prop
  if (minimal) {
    // Minimal card layout
    return (
      <Card
        sx={{
          maxWidth: 200,
          width: "100%",
          m: 2,
          height: 300, // Fixed height for minimal cards
          position: "relative",
        }}
      >
        <CardActionArea sx={{ height: "100%", position: "relative" }}>
          <CardMedia
            component="img"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            // should account for missing images
            image={image!}
            alt={name}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for better readability
              color: "white",
              padding: "8px",
            }}
          >
            <Typography variant="h6" component="div">
              {name}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    );
  } else {
    // Standard card layout with fixed height for non-minimal cards
    return (
      <Card
        sx={{
          maxWidth: 345,
          width: "100%",
          m: 0.5,
          height: 400, // Standardized height for non-minimal cards
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            // should account for missing images
            image={image!}
            alt={name}
            sx={{
              objectFit: "cover",
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {dayjs(timestamp).format("DD MMM YYYY (ddd)")}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {location.name}
            </Typography>
            {tags && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {tags.map((tag, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    color="primary"
                    component="span"
                  >
                    #{tag.name}
                  </Typography>
                ))}
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
};

export default EventCard;

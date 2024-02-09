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
import Link from "next/link";

interface EventCardProps extends EventResponse {
  minimal?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  timestamp,
  location,
  tags,
  image,
  minimal = false,
}) => {
  const eventDetailsUrl = `/events/${id}`;

  if (minimal) {
    // Original minimal card layout
    return (
      <Link href={eventDetailsUrl} passHref>
        <Card
          sx={{
            minWidth: 180,
            maxWidth: 200,
            width: "100%",
            m: 2,
            height: 300, // Fixed height for minimal cards
            position: "relative",
            cursor: "pointer",
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
              image={image ?? "/default-event-image.jpg"}
              alt={name}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: "rgba(0, 0, 0, 0.5)",
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
      </Link>
    );
  } else {
    // Adjusted non-minimal card layout for responsiveness
    return (
      <Link href={eventDetailsUrl} passHref>
        <Card
          sx={{
            minWidth: 250, // Ensures a minimum width
            width: "100%", // Allows the card to grow
            m: 0.5,
            height: "auto", // Adjusts height based on content
            minHeight: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140" // Maintains a fixed height for consistency
              image={image ?? "/assets/default.jpg"}
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
      </Link>
    );
  }
};

export default EventCard;

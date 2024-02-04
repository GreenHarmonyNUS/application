import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  tags: string[];
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  tags,
  imageUrl,
}) => (
  <Card sx={{ maxWidth: 345, m: 2 }}>
    <CardActionArea>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {date}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {location}
        </Typography>
        <Box>
          {tags.map((tag, index) => (
            <Typography
              key={index}
              variant="body2"
              color="primary"
              component="span"
            >
              #{tag}{" "}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default EventCard;

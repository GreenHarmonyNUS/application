import React from "react";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import {
  Box,
  Typography,
  CardMedia,
  Paper,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import type { EventResponse } from "../../_types/event-response";

const EventDetailsPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { id } = params;
  const event: EventResponse | null = await api.event.getOne.query({
    id: Number(id),
  });
  if (!event) redirect("/events");

  return (
    <Paper
      elevation={3}
      sx={{ p: 3, margin: "auto", maxWidth: 800, flexGrow: 1 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "auto" }}
            image={event.image ?? "/assets/default.jpg"}
            alt={event.name}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            {event.name}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            <strong>Date & Time:</strong>{" "}
            {dayjs(event.timestamp).format("DD MMM YYYY (ddd) HH:mm")}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            <strong>Duration:</strong> {event.duration} minutes
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            <strong>Location:</strong> {event.location.name}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" gutterBottom>
            <strong>Details:</strong> {event.details}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Tags:</strong>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {event.tags?.map((tag, index) => (
                <Chip key={index} label={`#${tag.name}`} color="primary" />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventDetailsPage;
export const dynamic = "force-dynamic";

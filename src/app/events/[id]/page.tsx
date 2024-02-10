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
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import type { EventResponse } from "../../_types/event-response";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

const EventDetailsPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const isRegistered =
    session &&
    (await api.eventRegistrations.isRegistered.query({
      eventId: Number(id),
      userId: session?.user.id,
    }));

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
            sx={{
              height: 400,
              objectFit: "cover",
              marginBottom: 2,
            }}
            src={
              event.image
                ? `https://${process.env.VERCEL_URL}/${event.image}`
                : "/assets/default.jpg"
            }
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

          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Location:</strong> {event.location.name}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                target="_blank"
                href={`https://www.google.com/maps?q=${event.location.latitude},${event.location.longitude}`}
                color="primary"
                size="small"
              >
                View on Google Maps
              </Button>
            </Grid>
          </Grid>

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

          {/* Adjusted layout for register buttons */}
          <Box sx={{ mt: 2 }}>
            {session && !isRegistered && (
              <Button
                variant="contained"
                href={`/events/${id}/register`}
                color="success"
              >
                Register
              </Button>
            )}
            {session && isRegistered && (
              <Button variant="contained" disabled>
                Registered
              </Button>
            )}
            {!session && (
              <Button
                variant="contained"
                href={`/api/auth/signin`}
                color="success"
              >
                Register
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventDetailsPage;
